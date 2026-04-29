const features = [
  "Lưu trữ không giới hạn ghi chú, link, file",
  "AI tìm kiếm thông minh — kết quả trong 1 giây",
  "Tự động phân loại & tóm tắt bằng AI",
  "Knowledge Graph — trực quan hóa kết nối kiến thức",
  "Extension Chrome + App mobile (iOS & Android)",
  "Đồng bộ tất cả thiết bị theo thời gian thực",
  "Export toàn bộ dữ liệu (Markdown, JSON, PDF)",
  "Tất cả tính năng mới trong tương lai — miễn phí mãi",
];

interface Props {
  onOpenModal: () => void;
}

export default function PricingSection({ onOpenModal }: Props) {
  return (
    <section id="pricing" className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-orange-500 text-xs font-semibold tracking-widest uppercase mb-3">
            Bảng giá
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Đầu tư một lần, dùng mãi mãi</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-4xl mx-auto">
          {/* Stats left */}
          <div className="space-y-8">
            <div>
              <p className="text-6xl font-bold text-gray-900">100+</p>
              <p className="text-gray-500 mt-2">người dùng đang dùng AI Brain Tool mỗi ngày</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "2M+", label: "Ghi chú đã lưu" },
                { value: "47 phút", label: "Tiết kiệm mỗi ngày" },
                { value: "0.3s", label: "Tốc độ tìm kiếm" },
                { value: "14 ngày", label: "Hoàn tiền miễn phí" },
              ].map((stat) => (
                <div key={stat.label} className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-2xl font-bold text-orange-500">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Hơn 500 knowledge worker đã tin dùng AI Brain Tool để tổ chức kiến thức, tiết kiệm thời gian và làm việc
              thông minh hơn mỗi ngày.
            </p>
          </div>

          {/* Pricing card right */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-orange-500 text-white text-center py-4 px-6">
              <span className="text-sm font-semibold">🔥 Early Access — Giá Founding Member</span>
            </div>
            <div className="p-8">
              <div className="text-center mb-8">
                <p className="text-gray-400 text-sm line-through mb-1">1.990.000đ</p>
                <p className="text-5xl font-bold text-gray-900 mb-2">99.000đ</p>
                <p className="text-gray-500 text-sm">Một lần · Trọn đời · Không tốn thêm xu nào</p>
              </div>

              <ul className="space-y-3 mb-8">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 text-xs flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={onOpenModal}
                className="cursor-pointer w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-2xl transition-colors"
              >
                🧠 Sở hữu AI Brain Tool ngay
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                🛡️ Hoàn tiền 100% trong 14 ngày nếu không hài lòng — không hỏi lý do.
              </p>

              <div className="mt-3 bg-orange-50 rounded-xl p-3 text-center">
                <p className="text-xs text-orange-600 font-medium">
                  ⚠️ Hơn 500 người đã đăng ký. Giá Founding Member chỉ áp dụng cho 200 người đầu tiên.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
