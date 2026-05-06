import { getSupabaseAdmin } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("products").select("*").order("id", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { name, price, description, quantity_left } = await req.json();
  if (!name || price == null) {
    return NextResponse.json({ error: "name và price là bắt buộc" }, { status: 400 });
  }
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("products")
    .insert({ name, price, description: description ?? "", quantity_left: quantity_left ?? -1 })
    .select("id")
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ id: data.id });
}
