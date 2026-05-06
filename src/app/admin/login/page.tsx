"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const ADMIN_EMAIL = "trananhtuan400@gmail.com";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "denied">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
      setStatus("denied");
      return;
    }

    setStatus("loading");
    const supabase = createClient();
    await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    });
    setStatus("sent");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <span className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white text-xl mx-auto mb-3">🧠</span>
          <h1 className="text-xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-sm text-gray-500 mt-1">Chỉ dành cho quản trị viên</p>
        </div>

        {status === "sent" ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-3">📬</div>
            <p className="font-semibold text-gray-900 mb-1">Kiểm tra email của bạn</p>
            <p className="text-sm text-gray-500">
              Link đăng nhập đã được gửi tới <strong>{email}</strong>. Nhấn vào link trong email để vào trang admin.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setStatus("idle"); }}
                placeholder="your@email.com"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            {status === "denied" && (
              <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">
                Email này không có quyền truy cập admin.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="cursor-pointer w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
            >
              {status === "loading" ? "Đang gửi..." : "Gửi link đăng nhập"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
