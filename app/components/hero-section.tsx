interface Props {
  onOpenModal: () => void;
}

export default function HeroSection({ onOpenModal }: Props) {
  return (
    <section className="bg-white pt-20 pb-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 text-xs font-semibold px-4 py-2 rounded-full mb-6">
              🧠 Bộ nhớ thứ hai của bạn — được hỗ trợ bởi AI
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Đừng để mất đi
              <br />
              <span className="text-orange-500">bất kỳ kiến thức nào nữa</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Lưu mọi ghi chú, bài viết, ý tưởng và tài liệu vào một nơi duy nhất.
              AI tự động phân loại, kết nối và giúp bạn tìm lại bất cứ thứ gì — chỉ trong 1 giây.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                onClick={onOpenModal}
                className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3.5 rounded-full transition-colors whitespace-nowrap text-sm sm:text-base"
              >
                Bắt đầu miễn phí
              </button>
              <a
                href="#how-it-works"
                className="cursor-pointer inline-flex items-center justify-center gap-2 text-gray-700 font-medium px-6 py-3.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors whitespace-nowrap text-sm sm:text-base"
              >
                Xem cách hoạt động →
              </a>
            </div>
          </div>

          {/* Right: UI Mockup */}
          <div className="relative hidden lg:flex justify-center">
            <div className="relative">
              {/* Main card */}
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 w-80">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center text-white text-xs">
                      🧠
                    </span>
                    <span className="text-sm font-bold text-gray-900">AI Brain</span>
                  </div>
                  <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                    ● Đang hoạt động
                  </span>
                </div>

                <div className="bg-gray-50 rounded-lg px-3 py-2.5 flex items-center gap-2 mb-4">
                  <span className="text-gray-400 text-sm">🔍</span>
                  <span className="text-gray-400 text-sm">Tìm kiếm bất kỳ kiến thức nào...</span>
                </div>

                <div className="space-y-3">
                  <div className="border border-gray-100 rounded-xl p-3">
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-900">Chiến lược marketing Q3</span>
                      <span className="text-xs text-gray-400">2 phút trước</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2 leading-relaxed">
                      Tập trung vào content marketing và SEO dài hạn...
                    </p>
                    <div className="flex gap-1.5">
                      <span className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full">Marketing</span>
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">Q3</span>
                    </div>
                  </div>

                  <div className="border border-gray-100 rounded-xl p-3">
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-900">Học React Hooks</span>
                      <span className="text-xs text-gray-400">hôm qua</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2 leading-relaxed">
                      useEffect chạy sau mỗi render, cleanup function...
                    </p>
                    <div className="flex gap-1.5">
                      <span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">Dev</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">React</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 bg-orange-50 rounded-xl p-3 flex items-center gap-2">
                  <span className="text-orange-500 text-base">🤖</span>
                  <div>
                    <p className="text-xs font-semibold text-orange-900">AI đang tổ chức...</p>
                    <p className="text-xs text-orange-600">3 ghi chú mới đã được phân loại tự động</p>
                  </div>
                </div>
              </div>

              {/* Floating stat — top right */}
              <div className="absolute -top-5 -right-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
                <p className="text-xs text-gray-400 mb-0.5">Tiết kiệm mỗi ngày</p>
                <p className="text-2xl font-bold text-gray-900">47 phút</p>
              </div>

              {/* Floating stat — bottom left */}
              <div className="absolute -bottom-5 -left-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
                <p className="text-xs text-gray-400 mb-0.5">Ghi chú đã lưu</p>
                <p className="text-2xl font-bold text-orange-500">2M+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
