import { getSupabaseAdmin } from "@/lib/supabase-server";
import { sendWaitlistEmailSequence } from "@/lib/email-sequence";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, phone, email } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ error: "name và email là bắt buộc" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  const { error } = await supabase.from("leads").insert({
    name: name.trim(),
    phone: (phone ?? "").trim(),
    email: email.trim(),
    payment_status: "waitlist",
  });

  if (error) {
    // Nếu email đã tồn tại (duplicate) thì vẫn coi là thành công
    if (!error.message.includes("duplicate") && !error.message.includes("unique")) {
      return NextResponse.json({ error: "Không thể lưu thông tin" }, { status: 500 });
    }
  }

  sendWaitlistEmailSequence(email.trim(), name.trim()).catch(console.error);

  return NextResponse.json({ success: true });
}
