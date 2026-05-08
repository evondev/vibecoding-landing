const faqs = [
  {
    q: "AI Brain Tool khác gì so với Notion hay Obsidian?",
    a: "Notion và Obsidian là công cụ viết và tổ chức — bạn phải tự tạo cấu trúc, tự gán tag, tự tìm kiếm. AI Brain Tool ngược lại: AI lo tất cả phần tổ chức, còn bạn chỉ cần capture và hỏi. Đặc biệt là tính năng tìm kiếm bằng ngôn ngữ tự nhiên — Notion và Obsidian không có điều này.",
  },
  {
    q: "Tôi cần chuẩn bị gì để bắt đầu?",
    a: "Bạn cần một OpenAI API key (tạo tại platform.openai.com, có gói miễn phí để thử). Key được lưu trên trình duyệt của bạn — chúng tôi không lưu vào server. Bạn chỉ trả tiền cho OpenAI theo lượng bạn thực sự dùng, thường rất nhỏ (vài nghìn đồng mỗi tháng với mức dùng bình thường).",
  },
  {
    q: "Tôi có thể lưu những loại nội dung nào?",
    a: "Ghi chú văn bản, link URL, đoạn trích bài viết, ý tưởng nhanh. AI sẽ tự động tóm tắt và phân loại sau khi bạn lưu. Tính năng import từ Notion/Obsidian đang trong roadmap và sẽ được cập nhật sau.",
  },
  {
    q: "Dữ liệu của tôi có an toàn không?",
    a: "Có. Dữ liệu của bạn được lưu trữ an toàn trên server — bạn có thể export toàn bộ và xóa tài khoản bất cứ lúc nào. API key OpenAI của bạn chỉ lưu trên trình duyệt, không bao giờ gửi đến server của chúng tôi.",
  },
  {
    q: "Thanh toán một lần có nghĩa là gì?",
    a: "Thanh toán 99.000đ một lần duy nhất để truy cập AI Brain Tool lâu dài — không có phí tháng, không có phí năm cho nền tảng. Chi phí AI duy nhất là token bạn dùng với API key OpenAI của bạn, và bạn hoàn toàn kiểm soát điều đó.",
  },
  {
    q: "Tôi không phải dân kỹ thuật, có dùng được không?",
    a: "Hoàn toàn được. Giao diện được thiết kế đơn giản nhất có thể — nếu bạn biết dùng Google hay nhắn tin Zalo, bạn sẽ dùng được AI Brain Tool trong vòng 5 phút. Phần thiết lập API key cũng có hướng dẫn từng bước chi tiết.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="bg-gray-50 py-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-orange-500 text-xs font-semibold tracking-widest uppercase mb-3">
            Câu hỏi thường gặp
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Giải đáp thắc mắc</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <summary className="cursor-pointer flex items-center justify-between p-6 select-none list-none [&::-webkit-details-marker]:hidden">
                <span className="font-medium text-gray-900 pr-6 text-sm leading-relaxed">{faq.q}</span>
                <span className="text-orange-500 shrink-0 text-xs transition-transform group-open:rotate-180 inline-block">
                  ▼
                </span>
              </summary>
              <div className="px-6 pb-6 border-t border-gray-50 pt-4">
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
