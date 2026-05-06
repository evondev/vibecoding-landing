import { getSupabaseAdmin } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("orders")
    .select("*, customers(name, phone), products(name)")
    .order("id", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const rows = (data ?? []).map((o: Record<string, unknown> & { customers: { name: string; phone: string } | null; products: { name: string } | null }) => ({
    ...o,
    customer_name: o.customers?.name ?? "",
    customer_phone: o.customers?.phone ?? "",
    product_name: o.products?.name ?? "",
    customers: undefined,
    products: undefined,
  }));
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const { customer_id, product_id, amount, status, order_code } = await req.json();
  if (!customer_id || !product_id || amount == null) {
    return NextResponse.json({ error: "customer_id, product_id, amount là bắt buộc" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  const { data: product, error: productError } = await supabase
    .from("products")
    .select("quantity_left")
    .eq("id", product_id)
    .single();

  if (productError || !product) return NextResponse.json({ error: "Sản phẩm không tồn tại" }, { status: 404 });
  if (product.quantity_left === 0) return NextResponse.json({ error: "Sản phẩm đã hết hàng" }, { status: 400 });

  const { data, error } = await supabase
    .from("orders")
    .insert({ customer_id, product_id, amount, status: status ?? "pending", order_code: order_code ?? "" })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (product.quantity_left !== -1) {
    await supabase
      .from("products")
      .update({ quantity_left: product.quantity_left - 1 })
      .eq("id", product_id);
  }

  return NextResponse.json({ id: data.id });
}
