import { getSupabaseAdmin } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

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
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  let body: SepayPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON" },
      { status: 400 },
    );
  }

  const { id, transferType, transferAmount, description } = body;

  if (transferType !== "in" || transferAmount < 99000) {
    return NextResponse.json({ success: true });
  }

  const match = description?.match(/BRAIN[A-Z0-9]+/i);
  if (!match) {
    return NextResponse.json({ success: true });
  }

  const orderCode = match[0].toUpperCase();
  const supabase = getSupabaseAdmin();

  // Cập nhật order: status = paid, ghi sepay_transaction_id
  const { error } = await supabase
    .from("orders")
    .update({
      status: "paid",
      sepay_transaction_id: String(id),
    })
    .eq("order_code", orderCode)
    .eq("status", "unpaid");

  if (error) {
    console.error("Supabase orders update error:", error);
  }

  return NextResponse.json({ success: true });
}
