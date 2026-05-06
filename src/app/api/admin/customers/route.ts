import { getDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM customers ORDER BY id DESC").all();
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const { name, phone, zalo, email } = await req.json();
  if (!name) {
    return NextResponse.json({ error: "name là bắt buộc" }, { status: 400 });
  }
  const db = getDb();
  const result = db
    .prepare("INSERT INTO customers (name, phone, zalo, email) VALUES (?, ?, ?, ?)")
    .run(name, phone ?? "", zalo ?? "", email ?? "");
  return NextResponse.json({ id: result.lastInsertRowid });
}
