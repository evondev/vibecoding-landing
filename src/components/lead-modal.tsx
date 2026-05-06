"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "form" | "payment" | "confirmed" | "error";

export default function LeadModal({ isOpen, onClose }: Props) {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<Step>("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCode, setOrderCode] = useState("");
  const [amount, setAmount] = useState(99000);

  const bankAccount = process.env.NEXT_PUBLIC_SEPAY_BANK_ACCOUNT!;
  const bankName = process.env.NEXT_PUBLIC_SEPAY_BANK_NAME!;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      firstInputRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Polling kiểm tra thanh toán
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

  function handleClose() {
    if (pollRef.current) clearInterval(pollRef.current);
    onClose();
    setTimeout(() => {
      setStep("form");
      setName("");
      setPhone("");
      setEmail("");
      setOrderCode("");
    }, 300);
  }

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

  if (!isOpen) return null;

  const qrUrl = `https://qr.sepay.vn/img?acc=${bankAccount}&bank=${bankName}&amount=${amount}&des=${orderCode}`;

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <button
          onClick={handleClose}
          className="cursor-pointer absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors text-sm"
          aria-label="Đóng"
        >
          ✕
        </button>

        {step === "form" && (
          <>
            <div className="text-center mb-7">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                🧠
              </div>
              <h3 className="text-xl font-bold text-gray-900">Sở hữu AI Brain Tool</h3>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                Điền thông tin để tiếp tục thanh toán — chỉ 99.000đ, trọn đời.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Họ và tên</label>
                <input
                  ref={firstInputRef}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className={inputClass}
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
                />
              </div>

              <button
                type="submit"
                disabled={!name.trim() || !phone.trim() || !email.trim() || isSubmitting}
                className="cursor-pointer w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors mt-2"
              >
                {isSubmitting ? "Đang xử lý..." : "Tiếp tục thanh toán →"}
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-5">🔒 Thông tin của bạn được bảo mật tuyệt đối</p>
          </>
        )}

        {step === "payment" && (
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Quét QR để thanh toán</h3>
            <p className="text-gray-500 text-sm mb-5">
              Mở app ngân hàng, quét mã bên dưới — thông tin sẽ tự điền sẵn.
            </p>

            <div className="bg-gray-50 rounded-2xl p-4 inline-block mb-5">
              <Image
                src={qrUrl}
                alt="QR thanh toán"
                width={220}
                height={220}
                className="rounded-lg"
                unoptimized
              />
            </div>

            <div className="bg-orange-50 rounded-xl p-4 text-left space-y-1.5 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Ngân hàng</span>
                <span className="font-semibold text-gray-900">{bankName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Số tài khoản</span>
                <span className="font-semibold text-gray-900">{bankAccount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Số tiền</span>
                <span className="font-bold text-orange-500">{amount.toLocaleString("vi-VN")}đ</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Nội dung</span>
                <span className="font-semibold text-gray-900 font-mono">{orderCode}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <svg className="animate-spin h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Đang chờ xác nhận thanh toán...
            </div>

            <p className="text-xs text-gray-400 mt-3">
              Nhập đúng nội dung <strong className="font-mono">{orderCode}</strong> để hệ thống tự xác nhận.
            </p>
          </div>
        )}

        {step === "confirmed" && (
          <div className="text-center py-4">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Thanh toán thành công!</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Chúng tôi đã nhận được thanh toán của bạn. Link truy cập AI Brain Tool sẽ được gửi qua Zalo / email trong
              vài phút.
            </p>
            <button
              onClick={handleClose}
              className="cursor-pointer mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-xl transition-colors"
            >
              Đóng
            </button>
          </div>
        )}

        {step === "error" && (
          <div className="text-center py-4">
            <div className="text-4xl mb-3">😕</div>
            <p className="font-semibold text-gray-900 mb-1">Có lỗi xảy ra</p>
            <p className="text-sm text-gray-500 mb-4">Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
            <button
              onClick={() => setStep("form")}
              className="cursor-pointer w-full border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Thử lại
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
