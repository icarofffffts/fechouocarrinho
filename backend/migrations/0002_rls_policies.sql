-- ============================================================================
-- Fechou o Carrinho — Migration 0002: Row Level Security & Policies
-- Schema: fechouocarrinho
-- Target: PostgreSQL 15.8 (Supabase self-hosted, VPS 185.111.156.178)
--
-- Antes desta migration:
--   * NENHUMA tabela tinha RLS habilitado (relrowsecurity = false);
--   * existiam 0 policies;
--   * anon/authenticated tinham INSERT+SELECT+UPDATE em TODAS as tabelas,
--     ou seja, o schema exposto via PostgREST estava totalmente aberto.
--
-- Depois desta migration:
--   * RLS habilitado em todas as tabelas do schema;
--   * leitura pública apenas para catálogo (supermarkets, products, prices,
--     releases) — preços e mercados são dados abertos/comunitários;
--   * escrita anônima (role `anon`, sem login) limitada a INSERT de
--     supermarkets / products / prices com validação de integridade;
--   * listas e itens de compra são privados por usuário (auth.uid());
--   * `releases` é somente leitura para o público (só service_role escreve);
--   * `list_totals` passa a respeitar RLS (security_invoker);
--   * grants reescritos de forma explícita (default-deny).
--
-- Idempotente: pode ser aplicada mais de uma vez sem erro.
-- ============================================================================

BEGIN;

CREATE TABLE IF NOT EXISTS fechouocarrinho.schema_migrations (
  version    TEXT PRIMARY KEY,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  applied_by TEXT DEFAULT current_user
);

-- ---------------------------------------------------------------------------
-- 0. Helpers
-- ---------------------------------------------------------------------------

-- Mantém updated_at coerente em UPDATEs feitos por qualquer role.
CREATE OR REPLACE FUNCTION fechouocarrinho.touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

-- Lista canônica das 27 UFs brasileiras (usada em validação de RLS/CHECK).
CREATE OR REPLACE FUNCTION fechouocarrinho.br_ufs()
RETURNS text[]
LANGUAGE sql
IMMUTABLE
PARALLEL SAFE
AS $$
  SELECT ARRAY[
    'AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA',
    'PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO'
  ]::text[];
$$;

-- TRUE quando o texto é NULL (campo opcional) ou uma UF válida.
CREATE OR REPLACE FUNCTION fechouocarrinho.is_br_uf(uf text)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
PARALLEL SAFE
AS $$
  SELECT uf IS NULL OR upper(uf) = ANY (fechouocarrinho.br_ufs());
$$;

-- Validação de EAN/GTIN por formato + dígito verificador (mod 10 GS1).
-- Aceita EAN-8, UPC-12, EAN-13 e GTIN-14. NULL é permitido (campo opcional).
CREATE OR REPLACE FUNCTION fechouocarrinho.is_ean(code text)
RETURNS boolean
LANGUAGE plpgsql
IMMUTABLE
PARALLEL SAFE
AS $$
DECLARE
  digits text;
  i      int;
  d      int;
  sum    int := 0;
  check_ int;
  len    int;
BEGIN
  IF code IS NULL OR code = '' THEN
    RETURN true;
  END IF;

  digits := regexp_replace(code, '\s', '', 'g');
  IF digits !~ '^[0-9]+$' THEN
    RETURN false;
  END IF;

  len := length(digits);
  IF len NOT IN (8, 12, 13, 14) THEN
    RETURN false;
  END IF;

  -- GS1 mod-10: pesos 3,1,3,1... da direita para a esquerda, exceto o DV.
  FOR i IN 1..(len - 1) LOOP
    d := substr(digits, len - i, 1)::int;
    sum := sum + CASE WHEN (i % 2) = 1 THEN d * 3 ELSE d END;
  END LOOP;

  check_ := (10 - (sum % 10)) % 10;
  RETURN check_ = substr(digits, len, 1)::int;
END;
$$;

-- ---------------------------------------------------------------------------
-- 1. Habilitar RLS em todas as tabelas do schema
-- ---------------------------------------------------------------------------
ALTER TABLE fechouocarrinho.supermarkets   ENABLE ROW LEVEL SECURITY;
ALTER TABLE fechouocarrinho.products       ENABLE ROW LEVEL SECURITY;
ALTER TABLE fechouocarrinho.prices         ENABLE ROW LEVEL SECURITY;
ALTER TABLE fechouocarrinho.shopping_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE fechouocarrinho.list_items     ENABLE ROW LEVEL SECURITY;
ALTER TABLE fechouocarrinho.releases       ENABLE ROW LEVEL SECURITY;

-- Não usamos FORCE ROW LEVEL SECURITY de propósito: o owner (postgres) e o
-- service_role (rolbypassrls = true) precisam continuar escrevendo em jobs,
-- scrapers e migrations. O gate de segurança para anon/authenticated é o RLS.

-- ---------------------------------------------------------------------------
-- 2. supermarkets — catálogo público, contribuição comunitária não verificada
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS supermarkets_select_public ON fechouocarrinho.supermarkets;
CREATE POLICY supermarkets_select_public ON fechouocarrinho.supermarkets
  FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS supermarkets_insert_community ON fechouocarrinho.supermarkets;
CREATE POLICY supermarkets_insert_community ON fechouocarrinho.supermarkets
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    COALESCE(is_verified, false) = false                    -- nunca auto-verificar
    AND (added_by IS NULL OR added_by = auth.uid())         -- não forjar autoria
    AND slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'                   -- slug canônico
    AND char_length(name) BETWEEN 2 AND 120
    AND states IS NOT NULL
    AND array_length(states, 1) >= 1
    AND states <@ fechouocarrinho.br_ufs()
    AND fechouocarrinho.is_br_uf(state)
  );

-- Só o autor atualiza, e apenas registros ainda não verificados pela curadoria.
DROP POLICY IF EXISTS supermarkets_update_own ON fechouocarrinho.supermarkets;
CREATE POLICY supermarkets_update_own ON fechouocarrinho.supermarkets
  FOR UPDATE TO authenticated
  USING (added_by = auth.uid() AND COALESCE(is_verified, false) = false)
  WITH CHECK (
    added_by = auth.uid()
    AND COALESCE(is_verified, false) = false
    AND slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'
    AND char_length(name) BETWEEN 2 AND 120
    AND states <@ fechouocarrinho.br_ufs()
    AND fechouocarrinho.is_br_uf(state)
  );

DROP POLICY IF EXISTS supermarkets_delete_own ON fechouocarrinho.supermarkets;
CREATE POLICY supermarkets_delete_own ON fechouocarrinho.supermarkets
  FOR DELETE TO authenticated
  USING (added_by = auth.uid() AND COALESCE(is_verified, false) = false);

-- ---------------------------------------------------------------------------
-- 3. prices — leitura pública, INSERT validado, UPDATE/DELETE só do autor
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS prices_select_public ON fechouocarrinho.prices;
CREATE POLICY prices_select_public ON fechouocarrinho.prices
  FOR SELECT TO anon, authenticated
  USING (true);

-- Fast path do app (OCR offline / digitação) com a anon key.
-- `scraped` é reservado ao service_role (Edge Function de scraping).
DROP POLICY IF EXISTS prices_insert_community ON fechouocarrinho.prices;
CREATE POLICY prices_insert_community ON fechouocarrinho.prices
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    price > 0
    AND price <= 99999.99
    AND COALESCE(is_verified, false) = false
    AND (user_id IS NULL OR user_id = auth.uid())
    AND COALESCE(source, 'manual') IN ('ocr_scan', 'manual', 'community')
    AND fechouocarrinho.is_ean(ean)
    AND fechouocarrinho.is_br_uf(state)
    AND (product_name IS NULL OR char_length(product_name) BETWEEN 1 AND 200)
    AND (scan_image_hash IS NULL OR char_length(scan_image_hash) <= 128)
  );

DROP POLICY IF EXISTS prices_update_own ON fechouocarrinho.prices;
CREATE POLICY prices_update_own ON fechouocarrinho.prices
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (
    user_id = auth.uid()
    AND COALESCE(is_verified, false) = false
    AND price > 0
    AND price <= 99999.99
    AND fechouocarrinho.is_ean(ean)
    AND fechouocarrinho.is_br_uf(state)
  );

DROP POLICY IF EXISTS prices_delete_own ON fechouocarrinho.prices;
CREATE POLICY prices_delete_own ON fechouocarrinho.prices
  FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- 4. products — catálogo público; escrita comunitária validada, sem edição
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS products_select_public ON fechouocarrinho.products;
CREATE POLICY products_select_public ON fechouocarrinho.products
  FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS products_insert_community ON fechouocarrinho.products;
CREATE POLICY products_insert_community ON fechouocarrinho.products
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL
    AND char_length(name) BETWEEN 2 AND 200
    AND fechouocarrinho.is_ean(ean)
  );
-- Sem policy de UPDATE/DELETE => negado por padrão (só service_role/curadoria).

-- ---------------------------------------------------------------------------
-- 5. releases — leitura pública (check de update do APK); escrita privilegiada
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS releases_select_public ON fechouocarrinho.releases;
CREATE POLICY releases_select_public ON fechouocarrinho.releases
  FOR SELECT TO anon, authenticated
  USING (true);

-- ---------------------------------------------------------------------------
-- 6. shopping_lists / list_items — dados privados por usuário
--    Requerem JWT (inclui Supabase Anonymous Sign-In: vira role `authenticated`
--    com um auth.uid() próprio e estável).
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS shopping_lists_select_own ON fechouocarrinho.shopping_lists;
CREATE POLICY shopping_lists_select_own ON fechouocarrinho.shopping_lists
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS shopping_lists_insert_own ON fechouocarrinho.shopping_lists;
CREATE POLICY shopping_lists_insert_own ON fechouocarrinho.shopping_lists
  FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND char_length(name) BETWEEN 1 AND 120
    AND fechouocarrinho.is_br_uf(state)
  );

DROP POLICY IF EXISTS shopping_lists_update_own ON fechouocarrinho.shopping_lists;
CREATE POLICY shopping_lists_update_own ON fechouocarrinho.shopping_lists
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (
    user_id = auth.uid()
    AND char_length(name) BETWEEN 1 AND 120
    AND fechouocarrinho.is_br_uf(state)
  );

DROP POLICY IF EXISTS shopping_lists_delete_own ON fechouocarrinho.shopping_lists;
CREATE POLICY shopping_lists_delete_own ON fechouocarrinho.shopping_lists
  FOR DELETE TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS list_items_select_own ON fechouocarrinho.list_items;
CREATE POLICY list_items_select_own ON fechouocarrinho.list_items
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM fechouocarrinho.shopping_lists l
      WHERE l.id = list_items.list_id
        AND l.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS list_items_insert_own ON fechouocarrinho.list_items;
CREATE POLICY list_items_insert_own ON fechouocarrinho.list_items
  FOR INSERT TO authenticated
  WITH CHECK (
    quantity >= 1
    AND price >= 0
    AND fechouocarrinho.is_ean(ean)
    AND EXISTS (
      SELECT 1 FROM fechouocarrinho.shopping_lists l
      WHERE l.id = list_id
        AND l.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS list_items_update_own ON fechouocarrinho.list_items;
CREATE POLICY list_items_update_own ON fechouocarrinho.list_items
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM fechouocarrinho.shopping_lists l
      WHERE l.id = list_items.list_id
        AND l.user_id = auth.uid()
    )
  )
  WITH CHECK (
    quantity >= 1
    AND price >= 0
    AND fechouocarrinho.is_ean(ean)
    AND EXISTS (
      SELECT 1 FROM fechouocarrinho.shopping_lists l
      WHERE l.id = list_id
        AND l.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS list_items_delete_own ON fechouocarrinho.list_items;
CREATE POLICY list_items_delete_own ON fechouocarrinho.list_items
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM fechouocarrinho.shopping_lists l
      WHERE l.id = list_items.list_id
        AND l.user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- 7. View list_totals — passa a respeitar o RLS das tabelas base
-- ---------------------------------------------------------------------------
ALTER VIEW fechouocarrinho.list_totals SET (security_invoker = true);

-- ---------------------------------------------------------------------------
-- 8. Triggers de updated_at
-- ---------------------------------------------------------------------------
DROP TRIGGER IF EXISTS trg_supermarkets_updated_at ON fechouocarrinho.supermarkets;
CREATE TRIGGER trg_supermarkets_updated_at
  BEFORE UPDATE ON fechouocarrinho.supermarkets
  FOR EACH ROW EXECUTE FUNCTION fechouocarrinho.touch_updated_at();

DROP TRIGGER IF EXISTS trg_shopping_lists_updated_at ON fechouocarrinho.shopping_lists;
CREATE TRIGGER trg_shopping_lists_updated_at
  BEFORE UPDATE ON fechouocarrinho.shopping_lists
  FOR EACH ROW EXECUTE FUNCTION fechouocarrinho.touch_updated_at();

-- ---------------------------------------------------------------------------
-- 9. Grants — modelo default-deny, com exceções explícitas
-- ---------------------------------------------------------------------------
REVOKE ALL ON ALL TABLES IN SCHEMA fechouocarrinho FROM anon, authenticated;

GRANT USAGE ON SCHEMA fechouocarrinho TO anon, authenticated, service_role;

-- Catálogo / dados abertos: leitura para todos.
GRANT SELECT ON fechouocarrinho.supermarkets   TO anon, authenticated;
GRANT SELECT ON fechouocarrinho.products       TO anon, authenticated;
GRANT SELECT ON fechouocarrinho.prices         TO anon, authenticated;
GRANT SELECT ON fechouocarrinho.releases       TO anon, authenticated;
GRANT SELECT ON fechouocarrinho.list_totals    TO anon, authenticated;
GRANT SELECT ON fechouocarrinho.shopping_lists TO anon;
GRANT SELECT ON fechouocarrinho.list_items     TO anon;

-- Contribuição comunitária (o RLS decide quais linhas).
GRANT INSERT ON fechouocarrinho.supermarkets TO anon, authenticated;
GRANT UPDATE, DELETE ON fechouocarrinho.supermarkets TO authenticated;

GRANT INSERT ON fechouocarrinho.products TO anon, authenticated;

GRANT INSERT ON fechouocarrinho.prices TO anon, authenticated;
GRANT UPDATE, DELETE ON fechouocarrinho.prices TO authenticated;

-- Listas privadas (exigem JWT).
GRANT SELECT, INSERT, UPDATE, DELETE ON fechouocarrinho.shopping_lists TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON fechouocarrinho.list_items     TO authenticated;

-- service_role (Edge Functions / scrapers / admin) — sem RLS.
GRANT ALL ON ALL TABLES IN SCHEMA fechouocarrinho TO service_role;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA fechouocarrinho TO anon, authenticated, service_role;

-- Tabelas criadas no futuro já nascem no mesmo modelo.
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA fechouocarrinho
  GRANT SELECT ON TABLES TO anon, authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA fechouocarrinho
  GRANT ALL ON TABLES TO service_role;

INSERT INTO fechouocarrinho.schema_migrations (version)
VALUES ('0002_rls_policies')
ON CONFLICT (version) DO NOTHING;

COMMIT;

-- Recarrega o cache de schema do PostgREST.
NOTIFY pgrst, 'reload schema';
