-- ============================================================================
-- Fechou o Carrinho — Migration 0003: Integridade de dados & índices de leitura
-- Schema: fechouocarrinho
--
-- O RLS (0002) protege o caminho anon/authenticated. As constraints abaixo
-- protegem TODOS os caminhos de escrita, inclusive service_role e Edge
-- Functions (validação de última milha no banco, não só na aplicação).
--
-- Idempotente: cada constraint é criada dentro de um guard de catálogo.
-- ============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- 1. Constraints de integridade
-- ---------------------------------------------------------------------------

-- prices: faixa de preço + formato de EAN.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'prices_price_range'
                   AND conrelid = 'fechouocarrinho.prices'::regclass) THEN
    ALTER TABLE fechouocarrinho.prices
      ADD CONSTRAINT prices_price_range CHECK (price > 0 AND price <= 99999.99);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'prices_ean_format'
                   AND conrelid = 'fechouocarrinho.prices'::regclass) THEN
    ALTER TABLE fechouocarrinho.prices
      ADD CONSTRAINT prices_ean_format
      CHECK (ean IS NULL OR ean ~ '^[0-9]{8,14}$');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'prices_state_format'
                   AND conrelid = 'fechouocarrinho.prices'::regclass) THEN
    ALTER TABLE fechouocarrinho.prices
      ADD CONSTRAINT prices_state_format
      CHECK (state IS NULL OR state = ANY (fechouocarrinho.br_ufs()));
  END IF;
END $$;

-- supermarkets: slug, nome e UFs.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'supermarkets_slug_format'
                   AND conrelid = 'fechouocarrinho.supermarkets'::regclass) THEN
    ALTER TABLE fechouocarrinho.supermarkets
      ADD CONSTRAINT supermarkets_slug_format
      CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'supermarkets_name_len'
                   AND conrelid = 'fechouocarrinho.supermarkets'::regclass) THEN
    ALTER TABLE fechouocarrinho.supermarkets
      ADD CONSTRAINT supermarkets_name_len CHECK (char_length(name) BETWEEN 2 AND 120);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'supermarkets_states_valid'
                   AND conrelid = 'fechouocarrinho.supermarkets'::regclass) THEN
    ALTER TABLE fechouocarrinho.supermarkets
      ADD CONSTRAINT supermarkets_states_valid
      CHECK (array_length(states, 1) >= 1 AND states <@ fechouocarrinho.br_ufs());
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'supermarkets_state_format'
                   AND conrelid = 'fechouocarrinho.supermarkets'::regclass) THEN
    ALTER TABLE fechouocarrinho.supermarkets
      ADD CONSTRAINT supermarkets_state_format
      CHECK (state IS NULL OR state = ANY (fechouocarrinho.br_ufs()));
  END IF;
END $$;

-- products: nome e EAN.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'products_name_len'
                   AND conrelid = 'fechouocarrinho.products'::regclass) THEN
    ALTER TABLE fechouocarrinho.products
      ADD CONSTRAINT products_name_len CHECK (char_length(name) BETWEEN 2 AND 200);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'products_ean_format'
                   AND conrelid = 'fechouocarrinho.products'::regclass) THEN
    ALTER TABLE fechouocarrinho.products
      ADD CONSTRAINT products_ean_format
      CHECK (ean IS NULL OR ean ~ '^[0-9]{8,14}$');
  END IF;
END $$;

-- shopping_lists / list_items: sanidade da lista.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'shopping_lists_name_len'
                   AND conrelid = 'fechouocarrinho.shopping_lists'::regclass) THEN
    ALTER TABLE fechouocarrinho.shopping_lists
      ADD CONSTRAINT shopping_lists_name_len CHECK (char_length(name) BETWEEN 1 AND 120);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'list_items_quantity_positive'
                   AND conrelid = 'fechouocarrinho.list_items'::regclass) THEN
    ALTER TABLE fechouocarrinho.list_items
      ADD CONSTRAINT list_items_quantity_positive CHECK (quantity >= 1);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'list_items_price_positive'
                   AND conrelid = 'fechouocarrinho.list_items'::regclass) THEN
    ALTER TABLE fechouocarrinho.list_items
      ADD CONSTRAINT list_items_price_positive CHECK (price >= 0);
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 2. Índices de leitura (queries do app: catálogo por UF, últimos preços, listas)
-- ---------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_supermarkets_states_gin
  ON fechouocarrinho.supermarkets USING GIN (states);

CREATE INDEX IF NOT EXISTS idx_prices_ean_created_at
  ON fechouocarrinho.prices (ean, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_prices_supermarket_created_at
  ON fechouocarrinho.prices (supermarket_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_prices_state_created_at
  ON fechouocarrinho.prices (state, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_prices_user_id
  ON fechouocarrinho.prices (user_id) WHERE user_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_shopping_lists_user_updated
  ON fechouocarrinho.shopping_lists (user_id, updated_at DESC);

-- Antiduplicidade "mesma foto escaneada duas vezes" (base do dedupe do OCR).
CREATE INDEX IF NOT EXISTS idx_prices_scan_hash
  ON fechouocarrinho.prices (scan_image_hash) WHERE scan_image_hash IS NOT NULL;

-- ---------------------------------------------------------------------------
-- 3. View de consulta rápida: último preço conhecido por EAN/supermercado
-- ---------------------------------------------------------------------------
CREATE OR REPLACE VIEW fechouocarrinho.latest_prices AS
SELECT DISTINCT ON (p.ean, p.supermarket_id)
       p.ean,
       p.supermarket_id,
       s.slug AS supermarket_slug,
       s.name AS supermarket_name,
       p.product_name,
       p.price,
       p.state,
       p.source,
       p.created_at,
       p.is_verified
FROM fechouocarrinho.prices p
LEFT JOIN fechouocarrinho.supermarkets s ON s.id = p.supermarket_id
WHERE p.ean IS NOT NULL
ORDER BY p.ean, p.supermarket_id, p.created_at DESC;

ALTER VIEW fechouocarrinho.latest_prices SET (security_invoker = true);
GRANT SELECT ON fechouocarrinho.latest_prices TO anon, authenticated, service_role;

INSERT INTO fechouocarrinho.schema_migrations (version)
VALUES ('0003_integrity')
ON CONFLICT (version) DO NOTHING;

COMMIT;

NOTIFY pgrst, 'reload schema';
