import { getSupabaseAdmin } from "@/lib/supabase-server";
import { sendOrderConfirmationEmail } from "@/lib/email-sequence";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { customer_id, product_id, amount, status, order_code } = await req.json();
  const supabase = getSupabaseAdmin();

  // Lấy status hiện tại để tránh gửi email trùng
  const { data: existing } = await supabase
    .from("orders")
    .select("status")
    .eq("id", id)
    .single();

  const { error } = await supabase
    .from("orders")
    .update({ customer_id, product_id, amount, status, order_code })
    .eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Gửi email xác nhận khi lần đầu chuyển sang paid
  if (status === "paid" && existing?.status !== "paid") {
    const [{ data: customer }, { data: prod }] = await Promise.all([
      supabase.from("customers").select("name, email").eq("id", customer_id).single(),
      supabase.from("products").select("name").eq("id", product_id).single(),
    ]);
    if (customer?.email) {
      sendOrderConfirmationEmail({
        email: customer.email,
        name: customer.name,
        productName: prod?.name ?? "AI Brain Tool",
        amount,
        orderCode: order_code ?? "",
      }).catch(console.error);
    }
  }

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
