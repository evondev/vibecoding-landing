interface Props {
  onOpenModal: () => void;
}

export default function FeaturesSection({ onOpenModal }: Props) {
  return (
    <section id="features" className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-orange-500 text-xs font-semibold tracking-widest uppercase mb-3">
            Tính năng nổi bật
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Mọi thứ bạn cần để quản lý kiến thức{" "}
            <span className="text-orange-500">thông minh hơn</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Không chỉ là nơi lưu trữ — AI Brain Tool là người trợ lý tri thức làm việc 24/7 cho bạn.
          </p>
        </div>

        <div className="space-y-24">
          {/* Feature 1: Capture */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest">
                Capture mọi lúc mọi nơi
              </span>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-2 mb-4">
                Lưu mọi thứ <span className="text-orange-500">ngay lập tức</span>
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Dùng extension Chrome, app mobile hoặc chỉ cần forward email. Dán link, chụp ảnh, ghi âm hay gõ trực
                tiếp — mọi định dạng đều được nhận.
              </p>
              <ul className="space-y-2.5 mb-8">
                {["Extension Chrome 1 click", "App iOS & Android", "Email-to-brain forwarding", "Paste link, text, file, ảnh"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                      <span className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 text-xs flex-shrink-0">
                        ✓
                      </span>
                      {item}
                    </li>
                  )
                )}
              </ul>
              <button
                onClick={onOpenModal}
                className="cursor-pointer text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors"
              >
                Thử ngay miễn phí →
              </button>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <span className="text-xs text-gray-400 ml-1">ai-brain.app — Chrome Extension</span>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 flex items-center gap-3">
                  <span className="text-2xl">🧠</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Lưu trang này vào AI Brain</p>
                    <p className="text-xs text-gray-500 mt-0.5">AI sẽ tóm tắt và phân loại tự động</p>
                  </div>
                  <button className="cursor-pointer bg-orange-500 text-white text-xs px-3 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors">
                    Lưu ngay
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: "📱", label: "Mobile App" },
                  { icon: "📧", label: "Email Forward" },
                  { icon: "🔗", label: "Paste Link" },
                ].map((src) => (
                  <div
                    key={src.label}
                    className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100"
                  >
                    <span className="text-xl">{src.icon}</span>
                    <p className="text-xs text-gray-500 mt-1">{src.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature 2: AI Organize */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="space-y-2.5">
                {[
                  { tag: "Marketing", color: "bg-orange-50 text-orange-600", note: "Chiến lược Q4 2024..." },
                  { tag: "Dev", color: "bg-purple-50 text-purple-600", note: "React performance tips..." },
                  { tag: "Startup", color: "bg-blue-50 text-blue-600", note: "Fundraising checklist..." },
                  { tag: "Design", color: "bg-green-50 text-green-600", note: "UI/UX best practices..." },
                ].map((item) => (
                  <div
                    key={item.tag}
                    className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm border border-gray-100"
                  >
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${item.color}`}>
                      {item.tag}
                    </span>
                    <span className="text-xs text-gray-600 flex-1">{item.note}</span>
                    <span className="text-green-600 text-xs font-semibold">AI ✓</span>
                  </div>
                ))}
                <div className="bg-orange-500 rounded-xl p-3 flex items-center gap-2">
                  <span className="text-white">🤖</span>
                  <span className="text-white text-xs font-medium">AI đang phân loại 5 ghi chú mới...</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest">
                AI tự động hóa
              </span>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-2 mb-4">
                AI tự phân loại &{" "}
                <span className="text-orange-500">kết nối kiến thức</span>
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Không cần tạo thư mục, không cần gán tag thủ công. AI tự đọc nội dung, tóm tắt, phân loại và kết nối
                với những gì bạn đã có sẵn trong kho kiến thức.
              </p>
              <ul className="space-y-2.5 mb-8">
                {[
                  "Tự động gán tag thông minh",
                  "Tóm tắt nội dung bằng AI",
                  "Kết nối kiến thức liên quan",
                  "Không cần làm gì thủ công",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <span className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 text-xs flex-shrink-0">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={onOpenModal}
                className="cursor-pointer text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors"
              >
                Khám phá tính năng →
              </button>
            </div>
          </div>

          {/* Feature 3: Retrieve */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest">
                Tìm lại trong 1 giây
              </span>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-2 mb-4">
                Hỏi như hỏi người,{" "}
                <span className="text-orange-500">tìm như tìm Google</span>
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Gõ bất kỳ từ khóa, ý tưởng hay câu hỏi — AI ngay lập tức tìm và hiển thị đúng thứ bạn cần, kể cả khi
                bạn không nhớ chính xác đã lưu như thế nào.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-2xl">
                {[
                  { value: "47 phút", label: "tiết kiệm/ngày" },
                  { value: "0.3s", label: "tốc độ tìm" },
                  { value: "500+", label: "người dùng" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-xl font-bold text-orange-500">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={onOpenModal}
                className="cursor-pointer text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors"
              >
                Tìm thử ngay →
              </button>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="bg-white rounded-xl shadow-sm p-5">
                <div className="bg-gray-100 rounded-xl px-4 py-3 flex items-center gap-2 mb-4">
                  <span className="text-gray-400">🔍</span>
                  <span className="text-sm text-gray-600">email marketing tuần trước</span>
                </div>
                <div className="space-y-3">
                  {[
                    { title: "Email Marketing Strategy", date: "15/07", match: "98%" },
                    { title: "A/B Test Email Results", date: "12/07", match: "87%" },
                    { title: "Newsletter Open Rate Study", date: "10/07", match: "74%" },
                  ].map((result) => (
                    <div key={result.title} className="border border-gray-100 rounded-xl p-3 flex items-center gap-3">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{result.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{result.date}</p>
                      </div>
                      <span className="text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full font-medium">
                        {result.match}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-center text-xs text-orange-500 font-semibold mt-4">⚡ Tìm trong 0.3 giây</p>
              </div>
            </div>
          </div>

          {/* Feature 4: Knowledge Graph */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 bg-zinc-950 rounded-2xl p-6 relative overflow-hidden min-h-64">
              <div className="relative h-52">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold z-20 shadow-lg shadow-orange-500/30">
                  🧠
                </div>
                {[
                  { x1: "50%", y1: "50%", x2: "15%", y2: "20%" },
                  { x1: "50%", y1: "50%", x2: "82%", y2: "18%" },
                  { x1: "50%", y1: "50%", x2: "85%", y2: "75%" },
                  { x1: "50%", y1: "50%", x2: "12%", y2: "78%" },
                  { x1: "50%", y1: "50%", x2: "50%", y2: "90%" },
                ].map((line, i) => (
                  <svg key={i} className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
                    <line
                      x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                      stroke="rgba(249,115,22,0.3)" strokeWidth="1.5" strokeDasharray="4 4"
                    />
                  </svg>
                ))}
                {[
                  { style: { left: "8%", top: "12%" }, label: "Marketing", color: "bg-orange-500/20 border-orange-500/40" },
                  { style: { right: "5%", top: "10%" }, label: "Dev", color: "bg-blue-500/20 border-blue-500/40" },
                  { style: { right: "2%", bottom: "18%" }, label: "Startup", color: "bg-purple-500/20 border-purple-500/40" },
                  { style: { left: "5%", bottom: "15%" }, label: "Design", color: "bg-green-500/20 border-green-500/40" },
                  { style: { left: "50%", bottom: "2%", transform: "translateX(-50%)" }, label: "Finance", color: "bg-pink-500/20 border-pink-500/40" },
                ].map((node) => (
                  <div
                    key={node.label}
                    className={`absolute border rounded-xl px-3 py-1.5 text-white text-xs font-medium ${node.color}`}
                    style={node.style}
                  >
                    {node.label}
                  </div>
                ))}
              </div>
              <p className="text-center text-white/40 text-xs mt-2">Mạng lưới kiến thức của bạn</p>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest">
                Knowledge graph
              </span>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-2 mb-4">
                Thấy bức tranh{" "}
                <span className="text-orange-500">toàn cảnh kiến thức</span>
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Trực quan hóa mọi kiến thức của bạn thành một mạng lưới có kết nối — phát hiện những mối liên hệ giữa
                các ý tưởng mà bạn chưa bao giờ nhận ra.
              </p>
              <ul className="space-y-2.5 mb-8">
                {[
                  "Bản đồ kiến thức trực quan",
                  "Khám phá kết nối ẩn",
                  "Bùng nổ ý tưởng sáng tạo",
                  "Xuất graph dạng PDF",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <span className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 text-xs flex-shrink-0">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={onOpenModal}
                className="cursor-pointer text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors"
              >
                Xem demo →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
