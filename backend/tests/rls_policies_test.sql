-- ============================================================================
-- Fechou o Carrinho — testes de RLS/policies (executados como roles reais)
--
-- Uso:
--   docker exec -i supabase-db psql -U postgres -d postgres \
--     -v ON_ERROR_STOP=1 -f /path/to/rls_policies_test.sql
--
-- Roda tudo dentro de um BEGIN ... ROLLBACK: nenhum dado de teste é persistido.
-- Cada verificação imprime PASS ou lança exceção com FAIL.
-- ============================================================================

\set ON_ERROR_STOP on
\pset pager off

BEGIN;

CREATE OR REPLACE FUNCTION pg_temp.ok(cond boolean, label text)
RETURNS void LANGUAGE plpgsql AS $$
BEGIN
  IF cond THEN RAISE NOTICE 'PASS  %', label;
  ELSE RAISE EXCEPTION 'FAIL  %', label; END IF;
END $$;

-- Espera que `stmt` falhe (violação de RLS, grant ou constraint).
-- O bloco interno isola o erro: se não houver erro, o FAIL é lançado fora
-- do alcance do handler (senão ele mesmo seria capturado).
CREATE OR REPLACE FUNCTION pg_temp.expect_error(label text, stmt text)
RETURNS void LANGUAGE plpgsql AS $$
DECLARE
  failed boolean := false;
  state  text;
BEGIN
  BEGIN
    EXECUTE stmt;
  EXCEPTION WHEN others THEN
    failed := true;
    state  := SQLSTATE;
  END;

  IF failed THEN
    RAISE NOTICE 'PASS  % (sqlstate %)', label, state;
  ELSE
    RAISE EXCEPTION 'FAIL  % (esperava erro/permissão negada)', label;
  END IF;
END $$;

\echo '--- 0. sanidade: RLS ligado e policies presentes ---'
SELECT pg_temp.ok(
  (SELECT bool_and(relrowsecurity) FROM pg_class c
     JOIN pg_namespace n ON n.oid = c.relnamespace
   WHERE n.nspname = 'fechouocarrinho' AND c.relkind = 'r'),
  'RLS habilitado em todas as tabelas');

SELECT pg_temp.ok(
  (SELECT count(*) FROM pg_policies WHERE schemaname = 'fechouocarrinho') >= 16,
  'policies de fechouocarrinho criadas (>=16)');

SELECT pg_temp.ok(
  (SELECT count(*) FROM pg_tables WHERE schemaname = 'fechouocarrinho') >= 6,
  'tabelas de negócio no schema (6 + schema_migrations)');

-- ---------------------------------------------------------------------------
\echo '--- 1. role anon: leitura pública ---'
SET LOCAL ROLE anon;

SELECT pg_temp.ok((SELECT count(*) FROM fechouocarrinho.supermarkets) = 7,
  'anon lê os 7 mercados de MG');
SELECT pg_temp.ok((SELECT count(*) FROM fechouocarrinho.supermarkets
                    WHERE states @> ARRAY['MG']) = 7,
  'anon filtra mercados por states=cs.{MG}');
SELECT pg_temp.ok((SELECT count(*) FROM fechouocarrinho.releases) >= 1,
  'anon lê releases (check de update do APK)');
SELECT pg_temp.ok((SELECT count(*) FROM fechouocarrinho.shopping_lists) = 0,
  'anon NÃO vê listas de compra (RLS filtra tudo)');

\echo '--- 2. role anon: INSERT de price válido passa ---'
INSERT INTO fechouocarrinho.prices
  (ean, product_name, price, state, city, source, supermarket_id, scan_image_hash)
VALUES ('7891000315507', 'Leite Integral 1L', 5.49, 'MG', 'Belo Horizonte',
        'ocr_scan', (SELECT id FROM fechouocarrinho.supermarkets WHERE slug='epa-mg'),
        'hash-teste-001');
SELECT pg_temp.ok(
  (SELECT count(*) FROM fechouocarrinho.prices WHERE scan_image_hash = 'hash-teste-001') = 1,
  'anon insere preço válido (EAN com DV correto)');

\echo '--- 3. role anon: INSERTs inválidos são rejeitados ---'
SELECT pg_temp.expect_error('anon não insere preço zero/negativo',
  $sql$INSERT INTO fechouocarrinho.prices (price, source) VALUES (0, 'manual')$sql$);
SELECT pg_temp.expect_error('anon não auto-verifica preço',
  $sql$INSERT INTO fechouocarrinho.prices (price, source, is_verified) VALUES (5, 'manual', true)$sql$);
SELECT pg_temp.expect_error('anon não usa source=scraped (reservado)',
  $sql$INSERT INTO fechouocarrinho.prices (price, source) VALUES (5, 'scraped')$sql$);
SELECT pg_temp.expect_error('anon não grava UF inválida',
  $sql$INSERT INTO fechouocarrinho.prices (price, source, state) VALUES (5, 'manual', 'XX')$sql$);
SELECT pg_temp.expect_error('anon não forja user_id',
  $sql$INSERT INTO fechouocarrinho.prices (price, source, user_id) VALUES (5, 'manual', gen_random_uuid())$sql$);
SELECT pg_temp.expect_error('anon não grava EAN com DV inválido',
  $sql$INSERT INTO fechouocarrinho.prices (price, source, ean) VALUES (5, 'manual', '7891000315500')$sql$);
SELECT pg_temp.expect_error('anon não atualiza preços',
  $sql$UPDATE fechouocarrinho.prices SET price = 1 WHERE true$sql$);
SELECT pg_temp.expect_error('anon não escreve em releases',
  $sql$INSERT INTO fechouocarrinho.releases (version_code, version_name, apk_url) VALUES (99,'x','/x.apk')$sql$);
SELECT pg_temp.expect_error('anon não cria lista de compras',
  $sql$INSERT INTO fechouocarrinho.shopping_lists (name) VALUES ('lista anonima')$sql$);

\echo '--- 4. role authenticated (u1): preços com autoria ---'
RESET ROLE;
SET LOCAL ROLE authenticated;
SET LOCAL request.jwt.claims = '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

INSERT INTO fechouocarrinho.prices (ean, price, source, user_id)
VALUES ('7891000315507', 6.20, 'manual', auth.uid());
SELECT pg_temp.ok(
  (SELECT count(*) FROM fechouocarrinho.prices WHERE user_id = auth.uid()) = 1,
  'u1 insere preço com user_id = auth.uid()');

SELECT pg_temp.expect_error('u1 não insere preço em nome de outro usuário',
  $sql$INSERT INTO fechouocarrinho.prices (price, source, user_id)
      VALUES (6.2, 'manual', '22222222-2222-2222-2222-222222222222')$sql$);

INSERT INTO fechouocarrinho.shopping_lists (name, user_id, state)
VALUES ('Compras da semana', auth.uid(), 'MG');
INSERT INTO fechouocarrinho.list_items (list_id, product_name, price, quantity)
VALUES ((SELECT id FROM fechouocarrinho.shopping_lists WHERE user_id = auth.uid() LIMIT 1),
        'Leite Integral 1L', 5.49, 2);

SELECT pg_temp.ok((SELECT count(*) FROM fechouocarrinho.shopping_lists) = 1,
  'u1 vê a própria lista');
SELECT pg_temp.ok((SELECT count(*) FROM fechouocarrinho.list_items) = 1,
  'u1 vê os próprios itens');
SELECT pg_temp.ok((SELECT sum(total) FROM fechouocarrinho.list_totals) = 10.98,
  'list_totals respeita RLS e soma 2 x 5,49');

-- ---------------------------------------------------------------------------
\echo '--- 5. isolamento entre usuários (u2) ---'
SET LOCAL request.jwt.claims = '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

SELECT pg_temp.ok((SELECT count(*) FROM fechouocarrinho.shopping_lists) = 0,
  'u2 não vê a lista de u1');
SELECT pg_temp.ok((SELECT count(*) FROM fechouocarrinho.list_items) = 0,
  'u2 não vê os itens de u1');
SELECT pg_temp.expect_error('u2 não insere item na lista de u1',
  $sql$INSERT INTO fechouocarrinho.list_items (list_id, product_name, price, quantity)
      VALUES ((SELECT id FROM fechouocarrinho.shopping_lists LIMIT 1), 'x', 1, 1)$sql$);

-- UPDATE/DELETE em preço alheio: RLS torna o alvo invisível -> 0 linhas afetadas.
SET LOCAL ROLE authenticated;
UPDATE fechouocarrinho.prices SET price = 0.01 WHERE user_id IS NOT NULL;
SELECT pg_temp.ok((SELECT count(*) FROM fechouocarrinho.prices WHERE price = 0.01) = 0,
  'u2 não consegue alterar o preço de u1');

\echo '--- 6. evento de updated_at ---'
RESET ROLE;
SELECT pg_temp.ok(
  (SELECT tgname FROM pg_trigger
    WHERE tgrelid = 'fechouocarrinho.supermarkets'::regclass AND NOT tgisinternal) IS NOT NULL,
  'trigger de updated_at em supermarkets');

ROLLBACK;

\echo '=== TODOS OS TESTES DE RLS PASSARAM ==='
