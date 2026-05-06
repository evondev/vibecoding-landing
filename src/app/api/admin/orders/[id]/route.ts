import { getSupabaseAdmin } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { customer_id, product_id, amount, status, order_code } = await req.json();
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("orders")
    .update({ customer_id, product_id, amount, status, order_code })
    .eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();

  const { data: order } = await supabase.from("orders").select("product_id").eq("id", id).single();

  if (order) {
    await supabase.from("orders").delete().eq("id", id);

    const { data: product } = await supabase
      .from("products")
      .select("quantity_left")
      .eq("id", order.product_id)
      .single();

    if (product && product.quantity_left !== -1) {
      await supabase
        .from("products")
        .update({ quantity_left: product.quantity_left + 1 })
        .eq("id", order.product_id);
    }
  }

  return NextResponse.json({ ok: true });
}
