"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "form" | "success" | "error";

export default function LeadModal({ isOpen, onClose }: Props) {
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<Step>("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string; email?: string }>({});

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

  function handleClose() {
    onClose();
    setTimeout(() => {
      setStep("form");
      setName("");
      setPhone("");
      setEmail("");
      setErrors({});
    }, 300);
  }

  function validate() {
    const newErrors: { phone?: string; email?: string } = {};
    if (phone.trim()) {
      const phoneDigits = phone.replace(/\s/g, "");
      if (!/^(0[3-9]\d{8})$/.test(phoneDigits)) {
        newErrors.phone = "Số điện thoại không hợp lệ (VD: 0901234567)";
      }
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Email không đúng định dạng";
    }
    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    setIsSubmitting(true);

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), phone: phone.trim(), email: email.trim() }),
    });

    setIsSubmitting(false);

    if (!res.ok) {
      setStep("error");
      return;
    }

    setStep("success");
  }

  if (!isOpen) return null;

  const inputClass = (hasError?: boolean) =>
    `w-full border rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-shadow ${
      hasError
        ? "border-red-400 focus:ring-red-400"
        : "border-gray-200 focus:ring-orange-500"
    }`;

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
              <h3 className="text-xl font-bold text-gray-900">Đăng ký danh sách chờ</h3>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                Để lại thông tin — bạn sẽ được thông báo đầu tiên khi AI Brain Tool ra mắt.
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
                  className={inputClass()}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">
                  Số điện thoại / Zalo{" "}
                  <span className="text-gray-400 font-normal">(không bắt buộc)</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  placeholder="0901 234 567"
                  className={inputClass(!!errors.phone)}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="email@example.com"
                  className={inputClass(!!errors.email)}
                  required
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <button
                type="submit"
                disabled={!name.trim() || !email.trim() || isSubmitting || Object.keys(errors).length > 0}
                className="cursor-pointer w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors mt-2"
              >
                {isSubmitting ? "Đang xử lý..." : "Đăng ký danh sách chờ →"}
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-5">
              🔒 Thông tin của bạn được bảo mật tuyệt đối
            </p>
          </>
        )}

        {step === "success" && (
          <div className="text-center py-4">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Đã đăng ký thành công!</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Cảm ơn bạn. Mình sẽ gửi email thông báo ngay khi AI Brain Tool sẵn sàng.
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
