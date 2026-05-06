import { getDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const db = getDb();
  const rows = db.prepare(`
    SELECT o.*, c.name as customer_name, c.phone as customer_phone, p.name as product_name
    FROM orders o
    JOIN customers c ON o.customer_id = c.id
    JOIN products p ON o.product_id = p.id
    ORDER BY o.id DESC
  `).all();
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const { customer_id, product_id, amount, status, order_code } = await req.json();
  if (!customer_id || !product_id || amount == null) {
    return NextResponse.json({ error: "customer_id, product_id, amount là bắt buộc" }, { status: 400 });
  }

  const db = getDb();

  const product = db.prepare("SELECT quantity_left FROM products WHERE id=?").get(product_id) as { quantity_left: number } | undefined;
  if (!product) {
    return NextResponse.json({ error: "Sản phẩm không tồn tại" }, { status: 404 });
  }
  if (product.quantity_left === 0) {
    return NextResponse.json({ error: "Sản phẩm đã hết hàng" }, { status: 400 });
  }

  const insertOrder = db.prepare(
    "INSERT INTO orders (customer_id, product_id, amount, status, order_code) VALUES (?, ?, ?, ?, ?)"
  );
  const decreaseQty = db.prepare(
    "UPDATE products SET quantity_left = quantity_left - 1 WHERE id = ? AND quantity_left > 0"
  );

  const result = db.transaction(() => {
    const r = insertOrder.run(customer_id, product_id, amount, status ?? "pending", order_code ?? "");
    if (product.quantity_left !== -1) {
      decreaseQty.run(product_id);
    }
    return r;
  })();

  return NextResponse.json({ id: result.lastInsertRowid });
}
