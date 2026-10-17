-- Fechou o Carrinho Schema - MVP
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Supermercados por estado
CREATE TABLE IF NOT EXISTS fechouocarrinho.supermarkets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  states TEXT[] NOT NULL DEFAULT '{}',
  state TEXT,
  city TEXT,
  website TEXT,
  logo_url TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_open_source BOOLEAN DEFAULT true,
  added_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS fechouocarrinho.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ean TEXT UNIQUE,
  name TEXT NOT NULL,
  category TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS fechouocarrinho.prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES fechouocarrinho.products(id) ON DELETE SET NULL,
  supermarket_id UUID REFERENCES fechouocarrinho.supermarkets(id) ON DELETE CASCADE,
  ean TEXT,
  product_name TEXT,
  price NUMERIC(10,2) NOT NULL,
  state CHAR(2),
  city TEXT,
  source TEXT NOT NULL DEFAULT 'manual' CHECK (source IN ('ocr_scan','manual','scraped','community')),
  user_id UUID,
  scan_image_hash TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_prices_supermarket_state ON fechouocarrinho.prices(supermarket_id, state);
CREATE INDEX IF NOT EXISTS idx_prices_ean ON fechouocarrinho.prices(ean);

CREATE TABLE IF NOT EXISTS fechouocarrinho.shopping_lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  name TEXT NOT NULL DEFAULT 'Minha Lista',
  supermarket_id UUID REFERENCES fechouocarrinho.supermarkets(id) ON DELETE SET NULL,
  state CHAR(2),
  total NUMERIC(12,2) DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active','completed','archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS fechouocarrinho.list_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  list_id UUID NOT NULL REFERENCES fechouocarrinho.shopping_lists(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  ean TEXT,
  price NUMERIC(10,2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  subtotal NUMERIC(10,2) GENERATED ALWAYS AS (price * quantity) STORED,
  source TEXT DEFAULT 'manual',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_list_items_list ON fechouocarrinho.list_items(list_id);

CREATE TABLE IF NOT EXISTS fechouocarrinho.releases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version_code INTEGER NOT NULL,
  version_name TEXT NOT NULL,
  apk_url TEXT NOT NULL,
  sha256 TEXT,
  changelog TEXT,
  is_latest BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE VIEW fechouocarrinho.list_totals AS
SELECT l.id, l.name, SUM(i.price * i.quantity) as total, COUNT(i.id) as items_count
FROM fechouocarrinho.shopping_lists l
LEFT JOIN fechouocarrinho.list_items i ON i.list_id = l.id
GROUP BY l.id;

INSERT INTO fechouocarrinho.supermarkets (slug, name, states, state, city, is_verified) VALUES
('epa-mg', 'EPA Supermercados', ARRAY['MG'], 'MG', 'Belo Horizonte', true),
('mart-minas-mg', 'Mart Minas', ARRAY['MG'], 'MG', 'Contagem', true),
('bh-supermercados-mg', 'BH Supermercados', ARRAY['MG'], 'MG', 'Belo Horizonte', true),
('supernosso-mg', 'Supernosso', ARRAY['MG'], 'MG', 'Belo Horizonte', true),
('verdemar-mg', 'Verdemar', ARRAY['MG'], 'MG', 'Belo Horizonte', true),
('carrefour-mg', 'Carrefour', ARRAY['MG','SP','RJ'], 'MG', 'Uberlandia', true),
('apoio-mineiro-mg', 'Apoio Mineiro', ARRAY['MG'], 'MG', 'Belo Horizonte', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO fechouocarrinho.releases (version_code, version_name, apk_url, changelog, is_latest) VALUES
(1, '1.0.0', '/downloads/fechouocarrinho.apk', 'Lancamento MVP - OCR offline + lista inteligente', true)
ON CONFLICT DO NOTHING;

GRANT USAGE ON SCHEMA fechouocarrinho TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA fechouocarrinho TO postgres, service_role;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA fechouocarrinho TO anon, authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA fechouocarrinho TO anon, authenticated, service_role;
