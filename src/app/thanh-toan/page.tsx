"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import FooterSection from "@/components/footer-section";

type Step = "form" | "payment" | "confirmed" | "error";

const bankAccount = process.env.NEXT_PUBLIC_SEPAY_BANK_ACCOUNT!;
const bankName = process.env.NEXT_PUBLIC_SEPAY_BANK_NAME!;

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow";

export default function ThanhToanPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<Step>("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCode, setOrderCode] = useState("");
  const [amount, setAmount] = useState(99000);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (step !== "payment" || !orderCode) return;

    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/sepay/check-payment?orderCode=${orderCode}`);
        const data = await res.json();
        if (data.paid) {
          clearInterval(pollRef.current!);
          setStep("confirmed");
        }
      } catch {
        // ignore polling errors
      }
    }, 5000);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [step, orderCode]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) return;

    setIsSubmitting(true);

    const res = await fetch("/api/orders/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), phone: phone.trim(), email: email.trim() }),
    });

    const data = await res.json();
    setIsSubmitting(false);

    if (!res.ok) {
      setStep("error");
      return;
    }

    setOrderCode(data.order_code);
    setAmount(data.amount);
    setStep("payment");
  }

  const qrUrl = `https://qr.sepay.vn/img?acc=${bankAccount}&bank=${bankName}&amount=${amount}&des=${orderCode}`;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-bold text-gray-900">
            <span className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
              🧠
            </span>
            <span>AI Brain</span>
          </a>
          <a href="/" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
            ← Quay lại trang chủ
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 bg-gray-50">
        {step === "form" && (
          <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left — summary */}
              <div>
                <span className="inline-block text-orange-500 text-xs font-semibold tracking-widest uppercase mb-4">
                  Thanh toán
                </span>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  Sở hữu AI Brain Tool
                  <br />
                  <span className="text-orange-500">trọn đời — một lần duy nhất</span>
                </h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Đầu tư một lần, dùng mãi mãi. Không phí thuê bao hàng tháng, không lo mất dữ liệu.
                </p>

                <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-xl">
                        🧠
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">AI Brain Tool</p>
                        <p className="text-xs text-gray-500">Lifetime Deal — Founding Member</p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-900">99.000đ</p>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      "Lưu trữ không giới hạn ghi chú, link, file",
                      "AI tìm kiếm thông minh trong 1 giây",
                      "Tất cả tính năng mới trong tương lai — miễn phí",
                      "Hoàn tiền 100% trong 14 ngày",
                    ].map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-4 h-4 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 text-[10px] shrink-0">
                          ✓
                        </span>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span>🔒</span>
                  <span>Thanh toán qua chuyển khoản ngân hàng — an toàn tuyệt đối</span>
                </div>
              </div>

              {/* Right — form */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Thông tin của bạn</h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">Họ và tên</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className={inputClass}
                      autoFocus
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">Số điện thoại / Zalo</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0901 234 567"
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-3 text-sm">
                      <span className="text-gray-500">AI Brain Tool Lifetime</span>
                      <span className="font-semibold text-gray-900">99.000đ</span>
                    </div>
                    <div className="flex items-center justify-between mb-5 text-sm">
                      <span className="text-gray-400 line-through">Giá gốc</span>
                      <span className="text-gray-400 line-through">1.990.000đ</span>
                    </div>

                    <button
                      type="submit"
                      disabled={!name.trim() || !phone.trim() || !email.trim() || isSubmitting}
                      className="cursor-pointer w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors text-base"
                    >
                      {isSubmitting ? "Đang xử lý..." : "Tiếp tục thanh toán →"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {step === "payment" && (
          <div className="max-w-2xl mx-auto px-6 py-16 lg:py-24">
            <div className="text-center mb-10">
              <span className="inline-block text-orange-500 text-xs font-semibold tracking-widest uppercase mb-4">
                Bước cuối cùng
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">Quét QR để thanh toán</h1>
              <p className="text-gray-500">
                Mở app ngân hàng, quét mã bên dưới — thông tin sẽ tự điền sẵn.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <div className="flex justify-center mb-8">
                <div className="bg-gray-50 rounded-2xl p-5 inline-block">
                  <Image
                    src={qrUrl}
                    alt="QR thanh toán"
                    width={240}
                    height={240}
                    className="rounded-xl"
                    unoptimized
                  />
                </div>
              </div>

              <div className="bg-orange-50 rounded-2xl p-5 space-y-3 mb-6">
                {[
                  { label: "Ngân hàng", value: bankName },
                  { label: "Số tài khoản", value: bankAccount },
                  { label: "Số tiền", value: `${amount.toLocaleString("vi-VN")}đ`, highlight: true },
                  { label: "Nội dung chuyển khoản", value: orderCode, mono: true },
                ].map(({ label, value, highlight, mono }) => (
                  <div key={label} className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{label}</span>
                    <span className={`font-semibold ${highlight ? "text-orange-500 text-base" : "text-gray-900"} ${mono ? "font-mono" : ""}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-3">
                <svg className="animate-spin h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Đang chờ xác nhận thanh toán tự động...
              </div>
              <p className="text-center text-xs text-gray-400">
                Nhập đúng nội dung <strong className="font-mono">{orderCode}</strong> để hệ thống tự xác nhận.
              </p>
            </div>
          </div>
        )}

        {step === "confirmed" && (
          <div className="max-w-lg mx-auto px-6 py-24 text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Thanh toán thành công!</h1>
            <p className="text-gray-500 leading-relaxed mb-8">
              Chúng tôi đã nhận được thanh toán của bạn. Link truy cập AI Brain Tool sẽ được gửi qua
              Zalo / email trong vài phút.
            </p>
            <a
              href="/"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-4 rounded-full transition-colors"
            >
              Về trang chủ
            </a>
          </div>
        )}

        {step === "error" && (
          <div className="max-w-lg mx-auto px-6 py-24 text-center">
            <div className="text-5xl mb-5">😕</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Có lỗi xảy ra</h1>
            <p className="text-gray-500 mb-8">Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
            <button
              onClick={() => setStep("form")}
              className="cursor-pointer border border-gray-200 text-gray-700 font-medium px-8 py-3.5 rounded-full hover:bg-gray-50 transition-colors"
            >
              Thử lại
            </button>
          </div>
        )}
      </main>

      <FooterSection />
    </div>
  );
}
