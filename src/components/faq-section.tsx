const faqs = [
  {
    q: "AI Brain Tool khác gì so với Notion hay Obsidian?",
    a: "Notion và Obsidian là công cụ viết và tổ chức — bạn phải tự tạo cấu trúc, tự gán tag, tự tìm kiếm. AI Brain Tool ngược lại: AI lo tất cả phần tổ chức, còn bạn chỉ cần capture và hỏi. Đặc biệt là tính năng tìm kiếm bằng ngôn ngữ tự nhiên — Notion và Obsidian không có điều này.",
  },
  {
    q: "Tôi có thể import dữ liệu từ Notion / Obsidian không?",
    a: "Có. AI Brain Tool hỗ trợ import trực tiếp từ Notion (export JSON), Obsidian (vault folder), Evernote và bất kỳ file Markdown nào. Dữ liệu cũ của bạn sẽ được AI phân loại và kết nối tự động sau khi import.",
  },
  {
    q: "Dữ liệu của tôi có an toàn không?",
    a: "Có. Toàn bộ dữ liệu được mã hóa end-to-end — ngay cả chúng tôi cũng không đọc được ghi chú của bạn. Bạn có thể export toàn bộ và xóa tài khoản bất cứ lúc nào.",
  },
  {
    q: "Lifetime Deal nghĩa là gì? Có bị tính thêm phí sau này không?",
    a: "Thanh toán một lần duy nhất, dùng mãi mãi — không có phí tháng, không có phí năm, không bao giờ bị tính thêm. Tất cả tính năng mới ra mắt trong tương lai cũng miễn phí cho Founding Member.",
  },
  {
    q: "App có chạy được offline không?",
    a: "Có. Bạn có thể xem và tạo ghi chú offline. Khi có kết nối mạng trở lại, dữ liệu tự đồng bộ và AI xử lý các ghi chú mới.",
  },
  {
    q: "Tôi không phải dân kỹ thuật, có dùng được không?",
    a: "Hoàn toàn được. Giao diện được thiết kế đơn giản nhất có thể — nếu bạn biết dùng Google hay nhắn tin Zalo, bạn sẽ dùng được AI Brain Tool trong vòng 5 phút. Không cần cài đặt gì phức tạp.",
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
                <span className="text-orange-500 flex-shrink-0 text-xs transition-transform group-open:rotate-180 inline-block">
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
