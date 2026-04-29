"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

const STORAGE_OPTIONS = [
  "Ghi chú điện thoại / máy tính",
  "Nhóm chat (Zalo, Messenger, Telegram)",
  "Google Drive / Notion / Obsidian",
  "Viết tay vào sổ",
  "Không lưu — thường bị quên mất",
];

const PROBLEM_OPTIONS = [
  "Lưu nhiều nơi, tìm không ra",
  "Quên mất ý tưởng hay sau vài ngày",
  "Tài liệu lộn xộn, không phân loại được",
  "Mất quá nhiều thời gian tìm lại thứ cũ",
  "Khác",
];

const PRICE_OPTIONS = [
  "Dưới 50.000đ",
  "50.000 – 100.000đ",
  "100.000 – 200.000đ",
  "Trên 200.000đ nếu thực sự hữu ích",
];

type Status = "idle" | "loading" | "success" | "error";

export default function SurveySection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [storageMethods, setStorageMethods] = useState<string[]>([]);
  const [mainProblems, setMainProblems] = useState<string[]>([]);
  const [otherProblem, setOtherProblem] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function toggleStorage(option: string) {
    setStorageMethods((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  }

  function toggleProblem(option: string) {
    setMainProblems((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  }

  const isValid =
    name.trim() &&
    phone.trim() &&
    storageMethods.length > 0 &&
    mainProblems.length > 0 &&
    (!mainProblems.includes("Khác") || otherProblem.trim()) &&
    priceRange;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValid) return;

    const problems = mainProblems.map((p) =>
      p === "Khác" && otherProblem.trim() ? `Khác: ${otherProblem.trim()}` : p
    );

    setStatus("loading");
    const { error } = await supabase.from("survey_responses").insert({
      name: name.trim(),
      phone: phone.trim(),
      storage_methods: storageMethods,
      main_problem: problems.join(", "),
      price_range: priceRange,
    });

    setStatus(error ? "error" : "success");
  }

  if (status === "success") {
    return (
      <section className="bg-orange-50 py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6">
            🎉
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Cảm ơn bạn đã tham gia khảo sát!</h2>
          <p className="text-gray-600 leading-relaxed">
            Phản hồi của bạn rất có giá trị. Chúng tôi sẽ liên hệ qua Zalo sớm nhất có thể.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-orange-50 py-20">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-orange-500 text-xs font-semibold tracking-widest uppercase mb-3">
            Khảo sát nhanh
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Giúp chúng tôi hiểu bạn hơn
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            5 câu hỏi · Chỉ mất 1 phút · Nhận ưu đãi sớm nhất
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-sm space-y-8">
          {/* Q1: Tên */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              1. Tên bạn là gì? <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nguyễn Văn A"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow"
            />
          </div>

          {/* Q2: SĐT/Zalo */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              2. Số điện thoại / Zalo của bạn? <span className="text-orange-500">*</span>
            </label>
            <p className="text-xs text-gray-400 mb-2">Để chúng tôi gửi kết quả khảo sát và ưu đãi sớm nhất</p>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0901 234 567"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow"
            />
          </div>

          {/* Q3: Lưu ở đâu — checkbox */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              3. Bạn đang lưu ghi chú, tài liệu, ý tưởng ở đâu hiện tại?{" "}
              <span className="text-orange-500">*</span>
            </label>
            <div className="space-y-2.5">
              {STORAGE_OPTIONS.map((option) => {
                const checked = storageMethods.includes(option);
                return (
                  <label
                    key={option}
                    className={`flex items-center gap-3 cursor-pointer rounded-xl border px-4 py-3 text-sm transition-colors ${
                      checked
                        ? "border-orange-400 bg-orange-50 text-gray-900"
                        : "border-gray-200 bg-white text-gray-700 hover:border-orange-200 hover:bg-orange-50/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleStorage(option)}
                      className="sr-only"
                    />
                    <span className={`w-4 h-4 flex-shrink-0 rounded border-2 flex items-center justify-center transition-colors ${checked ? "bg-orange-500 border-orange-500" : "border-gray-300 bg-white"}`}>
                      {checked && (
                        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    {option}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Q4: Vấn đề lớn nhất — radio + other */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              4. Vấn đề lớn nhất của bạn khi quản lý thông tin là gì?{" "}
              <span className="text-orange-500">*</span>
            </label>
            <div className="space-y-2.5">
              {PROBLEM_OPTIONS.map((option) => {
                const checked = mainProblems.includes(option);
                return (
                  <label
                    key={option}
                    className={`flex items-center gap-3 cursor-pointer rounded-xl border px-4 py-3 text-sm transition-colors ${
                      checked
                        ? "border-orange-400 bg-orange-50 text-gray-900"
                        : "border-gray-200 bg-white text-gray-700 hover:border-orange-200 hover:bg-orange-50/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleProblem(option)}
                      className="sr-only"
                    />
                    <span className={`w-4 h-4 flex-shrink-0 rounded border-2 flex items-center justify-center transition-colors ${checked ? "bg-orange-500 border-orange-500" : "border-gray-300 bg-white"}`}>
                      {checked && (
                        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    {option}
                  </label>
                );
              })}
            </div>
            {mainProblems.includes("Khác") && (
              <input
                type="text"
                value={otherProblem}
                onChange={(e) => setOtherProblem(e.target.value)}
                placeholder="Mô tả vấn đề của bạn..."
                className="mt-3 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow"
              />
            )}
          </div>

          {/* Q5: Sẵn sàng trả bao nhiêu — radio */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              5. Nếu có một công cụ giúp bạn lưu mọi thứ vào 1 nơi và tìm lại trong 1 giây, bạn sẵn
              sàng trả bao nhiêu/tháng? <span className="text-orange-500">*</span>
            </label>
            <div className="space-y-2.5">
              {PRICE_OPTIONS.map((option) => {
                const checked = priceRange === option;
                return (
                  <label
                    key={option}
                    className={`flex items-center gap-3 cursor-pointer rounded-xl border px-4 py-3 text-sm transition-colors ${
                      checked
                        ? "border-orange-400 bg-orange-50 text-gray-900"
                        : "border-gray-200 bg-white text-gray-700 hover:border-orange-200 hover:bg-orange-50/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="priceRange"
                      checked={checked}
                      onChange={() => setPriceRange(option)}
                      className="accent-orange-500 w-4 h-4 flex-shrink-0"
                    />
                    {option}
                  </label>
                );
              })}
            </div>
          </div>

          {status === "error" && (
            <p className="text-red-500 text-sm text-center">
              Có lỗi xảy ra, vui lòng thử lại.
            </p>
          )}

          <button
            type="submit"
            disabled={!isValid || status === "loading"}
            className="cursor-pointer w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors text-sm"
          >
            {status === "loading" ? "Đang gửi..." : "Gửi khảo sát →"}
          </button>

          <p className="text-center text-xs text-gray-400">🔒 Thông tin của bạn được bảo mật tuyệt đối</p>
        </form>
      </div>
    </section>
  );
}
