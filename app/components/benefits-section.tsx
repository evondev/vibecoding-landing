const benefits = [
  {
    icon: "⚡",
    title: "Tiết kiệm 45+ phút mỗi ngày",
    desc: "Không còn tìm kiếm thủ công qua hàng trăm ghi chú lộn xộn — tìm là thấy ngay.",
  },
  {
    icon: "🧠",
    title: "Không bao giờ quên nữa",
    desc: "Mọi ý tưởng, học hỏi, insight đều được lưu và kết nối — bộ nhớ ngoài luôn sẵn sàng.",
  },
  {
    icon: "📈",
    title: "Kiến thức sinh ra giá trị",
    desc: "Thấy được mối liên hệ giữa các ý tưởng, bạn tạo ra nhiều hơn — bài viết, dự án, quyết định tốt hơn.",
  },
  {
    icon: "🎯",
    title: "Tập trung cao hơn",
    desc: "Không bị phân tâm bởi 'nhớ phải lưu thứ này' — capture xong, AI xử lý hết.",
  },
  {
    icon: "🔒",
    title: "Dữ liệu thuộc về bạn",
    desc: "Mã hóa end-to-end, export toàn bộ bất cứ lúc nào. Kiến thức của bạn, mãi là của bạn.",
  },
  {
    icon: "🚀",
    title: "Bắt đầu trong 5 phút",
    desc: "Không cần cài đặt phức tạp. Tạo tài khoản, bắt đầu lưu ngay lập tức.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-orange-500 text-xs font-semibold tracking-widest uppercase mb-3">
            Lợi ích cốt lõi
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Sau 1 tuần dùng AI Brain Tool</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-2xl mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
