import { getSupabaseAdmin } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const orderCode = req.nextUrl.searchParams.get("orderCode");
  if (!orderCode) {
    return NextResponse.json({ paid: false, error: "Missing orderCode" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("orders")
    .select("status")
    .eq("order_code", orderCode)
    .single();

  if (error || !data) {
    return NextResponse.json({ paid: false });
  }

  return NextResponse.json({ paid: data.status === "paid" });
}
