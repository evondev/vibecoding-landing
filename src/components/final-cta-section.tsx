interface Props {
  onOpenModal: () => void;
}

export default function FinalCtaSection({ onOpenModal }: Props) {
  return (
    <section className="bg-orange-500 py-20">
      <div className="max-w-3xl mx-auto px-6 text-center flex flex-col items-center">
        <span className="bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">
          Sẵn sàng chưa?
        </span>

        <div className="bg-orange-600/60 text-white text-sm font-medium px-5 py-2.5 rounded-full mb-8">
          ⚠️ Giá Founding Member chỉ còn cho 200 người đầu tiên
        </div>

        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Bộ nhớ thứ hai của bạn
          <br />
          <span className="text-orange-200">đang chờ được kích hoạt</span>
        </h2>

        <p className="text-orange-100 text-lg mb-10 leading-relaxed max-w-xl">
          Đừng để thêm một ý tưởng quan trọng nào bị mất đi.
          Hàng nghìn knowledge worker đã dùng AI Brain Tool để nhớ mọi thứ, kết nối mọi ý tưởng và làm việc thông
          minh hơn mỗi ngày.
        </p>

        <button
          onClick={onOpenModal}
          className="cursor-pointer bg-white text-orange-600 hover:bg-orange-50 font-bold px-10 py-4 rounded-full transition-colors text-lg shadow-lg shadow-orange-700/30"
        >
          🧠 Bắt đầu ngay — miễn phí
        </button>

        <p className="text-orange-200 text-sm mt-6">
          🛡️ Hoàn tiền 100% trong 14 ngày · Không cần thẻ tín dụng
        </p>
      </div>
    </section>
  );
}
