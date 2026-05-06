-- ============================================================
-- Chạy script này trong Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================================

-- 1. Khách hàng
CREATE TABLE IF NOT EXISTS customers (
  id           BIGSERIAL PRIMARY KEY,
  name         TEXT NOT NULL,
  phone        TEXT NOT NULL DEFAULT '',
  zalo         TEXT NOT NULL DEFAULT '',
  email        TEXT NOT NULL DEFAULT '',
  registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Sản phẩm
CREATE TABLE IF NOT EXISTS products (
  id            BIGSERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  price         INTEGER NOT NULL DEFAULT 0,
  description   TEXT NOT NULL DEFAULT '',
  quantity_left INTEGER NOT NULL DEFAULT -1,  -- -1 = không giới hạn
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Đơn hàng
CREATE TABLE IF NOT EXISTS orders (
  id          BIGSERIAL PRIMARY KEY,
  customer_id BIGINT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  product_id  BIGINT NOT NULL REFERENCES products(id)  ON DELETE CASCADE,
  amount      INTEGER NOT NULL,
  status      TEXT NOT NULL DEFAULT 'pending',  -- pending | paid | cancelled
  order_code  TEXT NOT NULL DEFAULT '',
  ordered_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes để tăng tốc query
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_product  ON orders(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_status   ON orders(status);

-- Row Level Security — service_role key tự bypass, không cần policy
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products  ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders    ENABLE ROW LEVEL SECURITY;
