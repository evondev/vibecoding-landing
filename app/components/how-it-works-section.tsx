const steps = [
  {
    number: "01",
    icon: "📥",
    label: "Capture",
    title: "Lưu mọi thứ ngay lập tức",
    desc: "Dùng extension Chrome, app mobile hoặc forward email. Dán link, chụp ảnh, ghi âm hay gõ trực tiếp — mọi định dạng đều được nhận.",
    visual: (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <span className="text-xs text-gray-400 ml-1">Chrome Extension</span>
        </div>
        <div className="bg-orange-50 rounded-lg p-3 flex items-center gap-3">
          <span className="text-xl">🧠</span>
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-900">Lưu trang này</p>
            <p className="text-xs text-gray-500">AI sẽ tóm tắt & phân loại</p>
          </div>
          <span className="bg-orange-500 text-white text-xs px-3 py-1.5 rounded-lg font-medium cursor-pointer">
            Lưu
          </span>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    icon: "🤖",
    label: "Organize",
    title: "AI lo phần còn lại",
    desc: "Không cần tạo thư mục, không cần gán tag thủ công. AI tự đọc, tóm tắt, phân loại và kết nối với kiến thức sẵn có.",
    visual: (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-2">
        {[
          { tag: "Marketing", color: "bg-orange-50 text-orange-600", note: "Chiến lược Q4..." },
          { tag: "Dev", color: "bg-purple-50 text-purple-600", note: "React hooks..." },
          { tag: "Startup", color: "bg-blue-50 text-blue-600", note: "Fundraising..." },
        ].map((item) => (
          <div key={item.tag} className="flex items-center gap-2">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.color}`}>{item.tag}</span>
            <span className="text-xs text-gray-600 flex-1">{item.note}</span>
            <span className="text-green-600 text-xs font-medium">AI ✓</span>
          </div>
        ))}
        <div className="bg-orange-500 rounded-lg p-2 flex items-center gap-2 mt-1">
          <span className="text-white text-xs">🤖</span>
          <span className="text-white text-xs font-medium">Đang phân loại 5 ghi chú mới...</span>
        </div>
      </div>
    ),
  },
  {
    number: "03",
    icon: "⚡",
    label: "Retrieve",
    title: "Tìm lại trong 1 giây",
    desc: 'Hỏi bằng ngôn ngữ tự nhiên: "Note về email marketing tuần trước" — AI trả kết quả chính xác ngay lập tức.',
    visual: (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="bg-gray-100 rounded-lg px-3 py-2.5 flex items-center gap-2 mb-3">
          <span className="text-gray-400 text-sm">🔍</span>
          <span className="text-sm text-gray-600">email marketing tuần trước</span>
        </div>
        <div className="space-y-2">
          <div className="border border-orange-100 bg-orange-50 rounded-lg p-2.5">
            <p className="text-xs font-semibold text-gray-900">Email Marketing Strategy</p>
            <p className="text-xs text-gray-500">15/07 · phù hợp 98%</p>
          </div>
          <div className="border border-gray-100 rounded-lg p-2.5">
            <p className="text-xs font-medium text-gray-700">A/B Test Email Results</p>
            <p className="text-xs text-gray-400">12/07 · phù hợp 87%</p>
          </div>
        </div>
        <p className="text-center text-xs text-orange-500 font-semibold mt-3">⚡ 0.3 giây</p>
      </div>
    ),
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-orange-500 text-xs font-semibold tracking-widest uppercase mb-3">
            Cách hoạt động
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Từ lộn xộn đến có tổ chức — chỉ 3 bước
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Nền tảng giúp bạn tiết kiệm thời gian, giảm sai sót và phát triển nhanh hơn mỗi ngày.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px border-t-2 border-dashed border-gray-200 z-0 -translate-x-4" />
              )}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-3xl">{step.icon}</span>
                  <span className="text-5xl font-bold text-gray-100 leading-none">{step.number}</span>
                </div>
                <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest">{step.label}</span>
                <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{step.desc}</p>
                {step.visual}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
