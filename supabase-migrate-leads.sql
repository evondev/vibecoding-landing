-- ============================================================
-- Chạy script này trong Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================================

-- Bước 1: Thêm unique constraint trên email để tránh duplicate customer
-- (bỏ qua nếu đã có)
ALTER TABLE customers ADD CONSTRAINT customers_email_unique UNIQUE (email);

-- Bước 2: Tạo sản phẩm AI Brain Tool nếu chưa có
INSERT INTO products (name, price, description, quantity_left)
VALUES ('AI Brain Tool', 99000, 'Trọn đời', -1)
ON CONFLICT DO NOTHING;

-- Bước 3: Migrate paid leads → customers (upsert theo email)
INSERT INTO customers (name, phone, zalo, email, registered_at)
SELECT
  name,
  phone,
  phone AS zalo,
  email,
  created_at
FROM leads
WHERE payment_status = 'paid'
ON CONFLICT (email) DO NOTHING;

-- Bước 4: Migrate paid leads → orders
-- Chỉ insert order nếu order_code (order_id) chưa tồn tại trong orders
INSERT INTO orders (customer_id, product_id, amount, status, order_code, ordered_at)
SELECT
  c.id                                              AS customer_id,
  (SELECT id FROM products ORDER BY id LIMIT 1)    AS product_id,
  99000                                             AS amount,
  'paid'                                            AS status,
  l.order_id                                        AS order_code,
  l.created_at                                      AS ordered_at
FROM leads l
JOIN customers c ON c.email = l.email
WHERE l.payment_status = 'paid'
  AND NOT EXISTS (
    SELECT 1 FROM orders WHERE order_code = l.order_id
  );

-- Kiểm tra kết quả
SELECT 'customers' AS tbl, COUNT(*) FROM customers
UNION ALL
SELECT 'orders',           COUNT(*) FROM orders;
