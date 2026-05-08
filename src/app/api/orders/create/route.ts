import { getSupabaseAdmin } from "@/lib/supabase-server";
import { sendWaitlistEmailSequence } from "@/lib/email-sequence";
import { NextRequest, NextResponse } from "next/server";

function generateOrderCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 8; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `BRAIN${suffix}`;
}

export async function POST(req: NextRequest) {
  const { name, phone, email } = await req.json();
  if (!name || !phone || !email) {
    return NextResponse.json({ error: "name, phone, email là bắt buộc" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  // Tìm hoặc tạo customer theo email
  let customerId: number;
  const { data: existing } = await supabase
    .from("customers")
    .select("id")
    .eq("email", email.trim())
    .single();

  if (existing) {
    customerId = existing.id;
  } else {
    const { data: newCustomer, error: customerError } = await supabase
      .from("customers")
      .insert({ name: name.trim(), phone: phone.trim(), zalo: phone.trim(), email: email.trim() })
      .select("id")
      .single();
    if (customerError || !newCustomer) {
      return NextResponse.json({ error: "Không thể tạo khách hàng" }, { status: 500 });
    }
    customerId = newCustomer.id;
    sendWaitlistEmailSequence(email.trim(), name.trim()).catch(console.error);
  }

  // Lấy sản phẩm đầu tiên
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("id, price")
    .order("id", { ascending: true })
    .limit(1)
    .single();

  if (productError || !product) {
    return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 500 });
  }

  // Tạo đơn hàng với status unpaid
  const orderCode = generateOrderCode();
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_id: customerId,
      product_id: product.id,
      amount: product.price,
      status: "unpaid",
      order_code: orderCode,
    })
    .select("id")
    .single();

  if (orderError || !order) {
    return NextResponse.json({ error: "Không thể tạo đơn hàng" }, { status: 500 });
  }

  return NextResponse.json({ order_code: orderCode, amount: product.price });
}
