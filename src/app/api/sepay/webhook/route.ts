import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface SepayPayload {
  id: number;
  gateway: string;
  transactionDate: string;
  accountNumber: string;
  transferType: string;
  transferAmount: number;
  description: string;
  referenceCode: string;
  code: string | null;
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  const expectedToken = `Apikey ${process.env.SEPAY_WEBHOOK_TOKEN}`;
  if (authHeader !== expectedToken) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  let body: SepayPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid JSON" }, { status: 400 });
  }

  const { id, transferType, transferAmount, description } = body;

  // Chỉ xử lý tiền vào đủ số tiền
  if (transferType !== "in" || transferAmount < 99000) {
    return NextResponse.json({ success: true });
  }

  // Tìm order_id dạng BRAIN + chữ số/chữ cái trong nội dung chuyển khoản
  const match = description?.match(/BRAIN[A-Z0-9]+/i);
  if (!match) {
    return NextResponse.json({ success: true });
  }

  const orderId = match[0].toUpperCase();

  const { error } = await supabase
    .from("leads")
    .update({
      payment_status: "paid",
      sepay_transaction_id: String(id),
    })
    .eq("order_id", orderId)
    .eq("payment_status", "pending");

  if (error) {
    console.error("Supabase update error:", error);
    // Vẫn trả về success để Sepay không retry liên tục
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: true });
}
