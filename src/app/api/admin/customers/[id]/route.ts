import { getDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { name, phone, zalo, email } = await req.json();
  const db = getDb();
  db.prepare("UPDATE customers SET name=?, phone=?, zalo=?, email=? WHERE id=?")
    .run(name, phone, zalo, email, id);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  db.prepare("DELETE FROM customers WHERE id=?").run(id);
  return NextResponse.json({ ok: true });
}
