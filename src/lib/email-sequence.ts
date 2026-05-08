import {
  Email1Welcome,
  Email2Nurture,
  Email3Sales,
  EmailOrderConfirmation,
} from "@/components/email-template";
import { render } from "@react-email/render";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = "Vibecodeeasy <evondev@vibecodeeasy.com>";

function addDays(date: Date, days: number): string {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

export async function sendWaitlistEmailSequence(email: string, name: string) {
  const isTest = email.includes("+test");
  const now = new Date();

  const [html1, html2, html3] = await Promise.all([
    render(Email1Welcome({ name })),
    render(Email2Nurture({ name })),
    render(Email3Sales({ name })),
  ]);

  const jobs = [
    {
      subject: "Cảm ơn bạn — mình là Evondev, người đang build AI Brain Tool",
      html: html1,
      extra: {},
    },
    {
      subject: "Vấn đề không phải là bạn không lưu đủ nhiều",
      html: html2,
      extra: isTest ? {} : { scheduledAt: addDays(now, 2) },
    },
    {
      subject: "AI Brain Tool đang mở — 99.000đ, mua một lần, dùng mãi",
      html: html3,
      extra: isTest ? {} : { scheduledAt: addDays(now, 3) },
    },
  ];

  for (let i = 0; i < jobs.length; i++) {
    if (i > 0) await new Promise((r) => setTimeout(r, 1000));
    const { subject, html, extra } = jobs[i];
    const result = await resend.emails.send({
      from: FROM,
      to: [email],
      subject,
      html,
      ...extra,
    });
    if (result.error)
      console.error(`[email-sequence] Email ${i + 1} lỗi:`, result.error);
    else
      console.log(`[email-sequence] Email ${i + 1} OK, id:`, result.data?.id);
  }
}

export async function sendOrderConfirmationEmail(opts: {
  email: string;
  name: string;
  productName: string;
  amount: number;
  orderCode: string;
}) {
  const { email, name, productName, amount, orderCode } = opts;
  const html = await render(
    EmailOrderConfirmation({ name, productName, amount, orderCode }),
  );
  const result = await resend.emails.send({
    from: FROM,
    to: [email],
    subject: `Xác nhận đơn hàng ${orderCode} — AI Brain Tool`,
    html,
  });
  if (result.error) console.error("[order-confirmation] Lỗi:", result.error);
  else console.log("[order-confirmation] OK, id:", result.data?.id);
}
