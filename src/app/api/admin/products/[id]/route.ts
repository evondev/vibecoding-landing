import { getDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { name, price, description, quantity_left } = await req.json();
  const db = getDb();
  db.prepare("UPDATE products SET name=?, price=?, description=?, quantity_left=? WHERE id=?")
    .run(name, price, description, quantity_left, id);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  db.transaction(() => {
    db.prepare("DELETE FROM orders WHERE product_id=?").run(id);
    db.prepare("DELETE FROM products WHERE id=?").run(id);
  })();
  return NextResponse.json({ ok: true });
}
