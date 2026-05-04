"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  onOpenModal: () => void;
}

type Message = {
  role: "bot" | "user";
  lines: string[];
  cta?: "buy" | "form";
};

type QuickReply = {
  label: string;
  key: string;
};

const SCRIPT: Record<string, { lines: string[]; cta?: "buy" | "form" }> = {
  q1: {
    lines: [
      "Thật ra đơn giản lắm — đây là chỗ bạn lưu tất cả mọi thứ vào: ghi chú, link, ý tưởng, bài đọc, ghi chép cuộc họp. AI tự tổ chức, tự phân loại, tự kết nối chúng lại với nhau.",
      "Khi bạn cần tìm lại — cứ hỏi bằng tiếng Việt bình thường như hỏi người, tìm ra trong khoảng 0.3 giây. Không cần nhớ lưu ở đâu, không cần tạo thư mục hay gán thẻ gì cả.",
    ],
  },
  q2: {
    lines: [
      "Notion với Obsidian tốt để viết và tổ chức — nhưng bạn phải tự tạo cấu trúc, tự gán thẻ, tự duy trì liên tục. Nhiều người dùng được vài tháng rồi bỏ giữa chừng vì quá mệt.",
      "AI Brain Tool thì ngược lại — bạn không cần làm gì cả ngoài việc lưu vào. AI lo phần còn lại.",
      "Câu hỏi thật ra là: trong số tất cả ghi chú bạn đã lưu vào Notion 1 năm qua, bao nhiêu phần trăm bạn đã thực sự tìm lại và dùng được? Nếu câu trả lời là ít — đó chính là vấn đề mình đang giải.",
      "À và bạn có thể chuyển dữ liệu thẳng từ Notion hoặc Obsidian vào, không mất gì hết.",
    ],
  },
  q3: {
    lines: [
      "99k bằng một bữa ăn tối. Nhưng nếu mỗi ngày bạn tiết kiệm được 45 phút không phải tìm kiếm thủ công — thì 1 tháng bạn lấy lại hơn 22 tiếng.",
      "Và đây là gói mua một lần, dùng mãi mãi. Không có phí tháng, không phí năm, không tính thêm gì nữa. Tất cả tính năng mới ra sau này cũng miễn phí cho Founding Member.",
      "So sánh: Notion Pro tốn khoảng 2.4 triệu/năm. Evernote tốn khoảng 3 triệu/năm. AI Brain Tool: 99k — hết.",
    ],
    cta: "buy",
  },
  q4: {
    lines: [
      "Mình hiểu lo ngại này hoàn toàn hợp lý.",
      "Toàn bộ dữ liệu được mã hóa — giống iMessage hay Signal. Máy chủ chỉ thấy dữ liệu đã mã hóa, ngay cả đội ngũ mình cũng không đọc được ghi chú của bạn.",
      "Và dữ liệu không bao giờ được dùng để huấn luyện AI chung — AI chỉ hoạt động trên kho kiến thức riêng của bạn.",
      "Bạn cũng có thể xuất toàn bộ dữ liệu về dạng Markdown, JSON hoặc PDF, xóa tài khoản bất cứ lúc nào. Không bao giờ bị ràng buộc.",
    ],
  },
  q5: {
    lines: [
      "Có ứng dụng cho cả iOS lẫn Android. Ghi chú được khi không có mạng, khi có mạng trở lại thì tự đồng bộ và AI xử lý phần phân loại.",
      "Extension Chrome thì lưu trang web 1 click. Hoặc bạn chuyển tiếp email thẳng vào — AI tóm tắt và phân loại tự động.",
    ],
  },
  q6: {
    lines: [
      "Một lần duy nhất, dùng mãi mãi — không có phí tháng, không phí năm, không có gì thêm. Đây là cam kết rõ ràng với Founding Member.",
      "Tất cả tính năng mới ra mắt sau này — Knowledge Graph nâng cao, tích hợp mới — bạn đều được dùng miễn phí.",
      "Giá 99k này chỉ còn cho khoảng 200 người đầu tiên. Sau đó về giá thường hoặc chuyển sang gói phí hàng tháng.",
    ],
    cta: "buy",
  },
  q7: {
    lines: [
      "Dùng được, thật ra không có gì để học.",
      "Không cần tạo không gian riêng, không cần cài mẫu có sẵn, không cần tổ chức thư mục. Tạo tài khoản xong là lưu ghi chú đầu tiên ngay — AI lo phần còn lại.",
      "Nếu bạn biết dùng Google tìm kiếm và nhắn tin Zalo — bạn dùng được AI Brain Tool trong 5 phút đầu tiên.",
    ],
  },
  q8: {
    lines: [
      "Được. Hỗ trợ chuyển dữ liệu trực tiếp từ Notion (file JSON export), Obsidian (thư mục vault), Evernote, và bất kỳ file Markdown nào.",
      "Sau khi chuyển vào, AI tự đọc lại toàn bộ và phân loại, kết nối — bạn không phải làm gì thêm. Dữ liệu cũ không bị mất, chỉ được tổ chức lại tốt hơn.",
    ],
  },
  q9: {
    lines: [
      "Có. Hoàn tiền 100% trong 14 ngày, không hỏi lý do. Chỉ cần nhắn vào email hỗ trợ, hoàn trong 3-5 ngày làm việc.",
      "Thật ra đây là lý do mình thoải mái nói: cứ thử. Rủi ro duy nhất là 99k trong 14 ngày — và bạn biết ngay có hợp không.",
    ],
    cta: "buy",
  },
  q10: {
    lines: [
      "Knowledge Graph là tính năng trực quan hóa toàn bộ kho kiến thức của bạn thành một mạng lưới — bạn thấy được mối liên hệ giữa các ý tưởng, chủ đề, dự án.",
      "Không bắt buộc phải dùng — nhưng nhiều người thấy đây là phần thú vị nhất. Lần đầu nhìn vào mạng lưới đó, họ thấy được quy luật và kết nối mà trước giờ không nhận ra dù đã lưu cùng một lúc.",
      "Nếu bạn đọc nhiều, nghiên cứu nhiều, hay làm việc với nhiều dự án song song — cái này có ích thật.",
    ],
  },
  buy: {
    lines: [
      "Thật ra thông tin mình đã chia sẻ đủ để bạn quyết định rồi. Câu hỏi thật ra là: bạn có đang gặp vấn đề này không — ghi chú rải rác, kiến thức học xong là quên, tìm lại tốn thời gian?",
      "Nếu có — thì 99k với 14 ngày hoàn tiền là đủ an toàn để thử. Không cần chắc chắn 100%, cứ thử rồi biết.",
    ],
    cta: "buy",
  },
  later: {
    lines: [
      "Không sao, mình không thúc bạn đâu.",
      "Nếu bạn muốn nhận thêm thông tin — cách người thật dùng sản phẩm, kết quả cụ thể sau 1 tuần, và thông báo khi giá thay đổi — điền email vào form bên dưới là được.",
      "Mình sẽ gửi thẳng vào hộp thư, không gửi thư rác.",
    ],
    cta: "form",
  },
};

const ALL_QUICK_REPLIES: QuickReply[] = [
  { label: "AI Brain Tool là gì?", key: "q1" },
  { label: "Khác gì Notion/Obsidian?", key: "q2" },
  { label: "99.000đ có đắt không?", key: "q3" },
  { label: "Dữ liệu có an toàn không?", key: "q4" },
  { label: "Dùng offline được không?", key: "q5" },
  { label: "Lifetime Deal là gì?", key: "q6" },
  { label: "Không phải dân kỹ thuật?", key: "q7" },
  { label: "Chuyển từ Notion được không?", key: "q8" },
  { label: "Có hoàn tiền không?", key: "q9" },
  { label: "Knowledge Graph là gì?", key: "q10" },
];

export default function ChatWidget({ onOpenModal }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([]);
  const [answered, setAnswered] = useState<Set<string>>(new Set());
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, quickReplies]);

  useEffect(() => {
    if (!isOpen || messages.length > 0) return;
    const t1 = setTimeout(() => setIsTyping(true), 0);
    const t2 = setTimeout(() => {
      setHasOpened(true);
      setIsTyping(false);
      setMessages([
        {
          role: "bot",
          lines: [
            "Xin chào, mình là AI của AI Brain Tool — bộ nhớ thứ hai được hỗ trợ bởi AI.",
            "Bạn đang tìm hiểu về sản phẩm, hay có câu hỏi gì cụ thể muốn hỏi thẳng? Mình ở đây, cứ hỏi tự nhiên.",
          ],
        },
      ]);
      setQuickReplies(ALL_QUICK_REPLIES);
    }, 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isOpen, messages.length]);

  function handleQuickReply(key: string) {
    if (key === "more") {
      const remaining = ALL_QUICK_REPLIES.filter((q) => !answered.has(q.key));
      setQuickReplies(remaining.length > 0 ? remaining : ALL_QUICK_REPLIES);
      return;
    }

    const script = SCRIPT[key];
    if (!script) return;

    const userLabel =
      ALL_QUICK_REPLIES.find((q) => q.key === key)?.label ??
      (key === "buy" ? "Mình muốn mua ngay" : "Mình chưa vội, để lại thông tin");

    const newAnswered = new Set(answered).add(key);
    setAnswered(newAnswered);
    setMessages((prev) => [...prev, { role: "user", lines: [userLabel] }]);
    setQuickReplies([]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "bot", lines: script.lines, cta: script.cta }]);

      const remaining = ALL_QUICK_REPLIES.filter((q) => !newAnswered.has(q.key));
      if (newAnswered.size >= 2) {
        const next: QuickReply[] = [
          { label: "🧠 Mua ngay — 99.000đ", key: "buy" },
          { label: "Để lại thông tin, mình chưa vội", key: "later" },
        ];
        if (remaining.length > 0) next.push({ label: "Hỏi thêm câu khác", key: "more" });
        setQuickReplies(next);
      } else {
        setQuickReplies(remaining);
      }
    }, 900);
  }

  function handleCta() {
    setIsOpen(false);
    onOpenModal();
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Đóng chat" : "Mở chat hỗ trợ"}
        className="cursor-pointer fixed bottom-6 right-6 z-50 w-14 h-14 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
        {!hasOpened && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            1
          </span>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-90 max-w-[calc(100vw-1.5rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden" style={{ height: "520px" }}>

          {/* Header */}
          <div className="bg-orange-500 px-4 py-3 flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-lg shrink-0">
              🧠
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm leading-tight">AI Brain Tool</p>
              <p className="text-orange-100 text-xs flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 bg-green-300 rounded-full inline-block" />
                Đang hoạt động
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="cursor-pointer w-7 h-7 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition-colors shrink-0"
              aria-label="Đóng"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "bot" && (
                  <div className="w-7 h-7 bg-orange-100 rounded-lg flex items-center justify-center text-sm mr-2 shrink-0 mt-0.5">
                    🧠
                  </div>
                )}
                <div className={`max-w-[82%] flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  {msg.lines.map((line, j) => (
                    <div
                      key={j}
                      className={`px-3.5 py-2.5 text-sm leading-relaxed ${
                        msg.role === "bot"
                          ? "bg-gray-100 text-gray-800 rounded-2xl rounded-tl-sm"
                          : "bg-orange-500 text-white rounded-2xl rounded-tr-sm"
                      }`}
                    >
                      {line}
                    </div>
                  ))}
                  {msg.cta === "buy" && (
                    <button
                      onClick={() => handleCta()}
                      className="cursor-pointer mt-1 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
                    >
                      🧠 Sở hữu AI Brain Tool — 99.000đ
                    </button>
                  )}
                  {msg.cta === "form" && (
                    <button
                      onClick={() => handleCta()}
                      className="cursor-pointer mt-1 border border-orange-400 text-orange-500 hover:bg-orange-50 active:scale-95 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
                    >
                      Để lại thông tin nhận thêm nội dung
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-end gap-2">
                <div className="w-7 h-7 bg-orange-100 rounded-lg flex items-center justify-center text-sm shrink-0">
                  🧠
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1 items-center h-3">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "160ms" }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "320ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies */}
          {quickReplies.length > 0 && (
            <div className="shrink-0 border-t border-gray-100 bg-gray-50/80 px-3 py-2.5 max-h-36 overflow-y-auto">
              <div className="flex flex-wrap gap-1.5">
                {quickReplies.map((qr) => (
                  <button
                    key={qr.key}
                    onClick={() => handleQuickReply(qr.key)}
                    className={`cursor-pointer text-xs px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap ${
                      qr.key === "buy"
                        ? "bg-orange-500 border-orange-500 text-white hover:bg-orange-600"
                        : "bg-white border-gray-200 text-gray-700 hover:border-orange-400 hover:text-orange-600"
                    }`}
                  >
                    {qr.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
