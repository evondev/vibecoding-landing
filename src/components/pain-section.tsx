const pains = [
  {
    icon: "📂",
    title: "Ghi chú nằm khắp nơi",
    desc: "Notion, Google Docs, Obsidian, sticky note — thông tin rải rác khắp 6 nơi khác nhau.",
  },
  {
    icon: "😴",
    title: "Học xong là quên",
    desc: "Đọc sách, xem khóa học cả tiếng — hôm sau không nhớ được gì để dùng.",
  },
  {
    icon: "🔍",
    title: "Tìm mất cả buổi",
    desc: "Biết mình đã lưu ở đâu đó, nhưng phải mất 30 phút tìm trong đống file hỗn độn.",
  },
  {
    icon: "💨",
    title: "Ý tưởng bay mất",
    desc: "Tia chớp cảm hứng lúc 2 giờ sáng — sáng dậy không còn nhớ, mãi mãi mất đi.",
  },
  {
    icon: "🔄",
    title: "Trùng lặp, lộn xộn",
    desc: "Lưu cùng một thông tin ở 3 chỗ khác nhau, mỗi phiên bản lại khác một tí.",
  },
  {
    icon: "🔗",
    title: "Không kết nối được kiến thức",
    desc: "Đọc nhiều nhưng không biết cái này liên quan gì đến cái kia — kiến thức không sinh ra giá trị.",
  },
];

export default function PainSection() {
  return (
    <section className="bg-zinc-950 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-orange-400 text-xs font-semibold tracking-widest uppercase mb-4">
            Vấn đề bạn đang gặp
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Bạn đang chìm trong biển thông tin
            <br />
            mà không tìm được gì?
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: AI interface mock */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div className="relative space-y-3">
              <div className="bg-white/15 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-white/70 text-sm font-medium mb-2">🤖 AI Agent</p>
                <div className="bg-white rounded-xl p-3">
                  <p className="text-sm text-gray-600 mb-2">Tìm cho tôi note về email marketing tuần trước</p>
                  <div className="bg-orange-50 rounded-lg p-2.5">
                    <p className="text-sm font-semibold text-orange-900 mb-1">Đang tìm kiếm trong 2,847 ghi chú...</p>
                    <div className="space-y-1">
                      <div className="h-1.5 bg-orange-200 rounded-full w-4/5" />
                      <div className="h-1.5 bg-orange-200 rounded-full w-3/5" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <p className="text-white/70 text-sm mb-1">Ghi chú đã lưu</p>
                  <p className="text-white text-2xl font-bold">2,847</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <p className="text-white/70 text-sm mb-1">Tốc độ tìm</p>
                  <p className="text-white text-2xl font-bold">0.3s</p>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  <p className="text-white text-sm font-semibold">Tìm thấy 3 kết quả phù hợp</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-white/80 text-sm bg-white/10 rounded-lg px-3 py-2">
                    📄 Email Marketing Strategy — 15/07
                  </p>
                  <p className="text-white/80 text-sm bg-white/10 rounded-lg px-3 py-2">
                    📄 A/B Test Email Results — 12/07
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Pain points */}
          <div className="grid sm:grid-cols-2 gap-6">
            {pains.map((pain) => (
              <div key={pain.title} className="flex items-start gap-3">
                <span className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0 text-lg">
                  {pain.icon}
                </span>
                <div>
                  <p className="text-white font-semibold text-base mb-1">{pain.title}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{pain.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA note */}
        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
          <p className="text-gray-200 text-base leading-relaxed">
            Nếu bạn gật đầu với ít nhất 3 điều trên —{" "}
            <span className="text-orange-400 font-semibold">
              AI Brain Tool được xây dựng chính xác để giải quyết vấn đề đó cho bạn.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
