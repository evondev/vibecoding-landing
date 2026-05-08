import { sendWaitlistEmailSequence } from "@/lib/email-sequence";

export async function POST(request: Request) {
  const { to, name } = await request.json();

  if (!to || !name) {
    return Response.json({ error: "to và name là bắt buộc" }, { status: 400 });
  }

  await sendWaitlistEmailSequence(to, name);

  return Response.json({ success: true });
}
