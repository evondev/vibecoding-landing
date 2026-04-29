"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type Status = "idle" | "loading" | "success" | "error";

export default function LeadModal({ isOpen, onClose }: Props) {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

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
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) return;

    setStatus("loading");
    const { error } = await supabase.from("leads").insert({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
    });
    setStatus(error ? "error" : "success");
  }

  if (!isOpen) return null;

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors text-sm"
          aria-label="Đóng"
        >
          ✕
        </button>

        <div className="text-center mb-7">
          <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
            🧠
          </div>
          <h3 className="text-xl font-bold text-gray-900">Dùng AI Brain Tool Miễn Phí</h3>
          <p className="text-gray-500 text-sm mt-2 leading-relaxed">
            Để lại thông tin — chúng tôi sẽ gửi link truy cập sớm qua Zalo và email.
          </p>
        </div>

        {status === "success" ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-3">🎉</div>
            <p className="font-semibold text-gray-900 mb-1">Đã nhận thông tin!</p>
            <p className="text-sm text-gray-500">Chúng tôi sẽ liên hệ bạn sớm nhất qua Zalo.</p>
          </div>
        ) : (
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

            {status === "error" && (
              <p className="text-red-500 text-xs text-center">Có lỗi xảy ra, vui lòng thử lại.</p>
            )}

            <button
              type="submit"
              disabled={!name.trim() || !phone.trim() || !email.trim() || status === "loading"}
              className="cursor-pointer w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors mt-2"
            >
              {status === "loading" ? "Đang gửi..." : "Nhận tư vấn qua Zalo"}
            </button>
          </form>
        )}

        <p className="text-center text-xs text-gray-400 mt-5">🔒 Thông tin của bạn được bảo mật tuyệt đối</p>
      </div>
    </div>
  );
}
