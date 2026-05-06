import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get("orderId");
  if (!orderId) {
    return NextResponse.json({ paid: false, error: "Missing orderId" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("leads")
    .select("payment_status")
    .eq("order_id", orderId)
    .single();

  if (error || !data) {
    return NextResponse.json({ paid: false });
  }

  return NextResponse.json({ paid: data.payment_status === "paid" });
}
