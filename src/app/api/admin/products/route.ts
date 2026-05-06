import { getDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM products ORDER BY id DESC").all();
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const { name, price, description, quantity_left } = await req.json();
  if (!name || price == null) {
    return NextResponse.json({ error: "name và price là bắt buộc" }, { status: 400 });
  }
  const db = getDb();
  const result = db
    .prepare("INSERT INTO products (name, price, description, quantity_left) VALUES (?, ?, ?, ?)")
    .run(name, price, description ?? "", quantity_left ?? -1);
  return NextResponse.json({ id: result.lastInsertRowid });
}
