import { getDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { customer_id, product_id, amount, status, order_code } = await req.json();
  const db = getDb();
  db.prepare("UPDATE orders SET customer_id=?, product_id=?, amount=?, status=?, order_code=? WHERE id=?")
    .run(customer_id, product_id, amount, status, order_code, id);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();

  // Hoàn lại số lượng khi xóa đơn hàng
  const order = db.prepare("SELECT product_id FROM orders WHERE id=?").get(id) as { product_id: number } | undefined;
  if (order) {
    db.transaction(() => {
      db.prepare("DELETE FROM orders WHERE id=?").run(id);
      db.prepare("UPDATE products SET quantity_left = quantity_left + 1 WHERE id=? AND quantity_left != -1")
        .run(order.product_id);
    })();
  }

  return NextResponse.json({ ok: true });
}
