const PAYMENT_URL = "https://vibecodeeasy.com/";
const APP_URL = "https://app.vibecodeeasy.com/";

const wrap: React.CSSProperties = {
  fontFamily: "Arial, sans-serif",
  maxWidth: 600,
  margin: "0 auto",
  color: "#1a1a1a",
  lineHeight: 1.7,
  fontSize: 15,
};

interface BaseProps {
  name: string;
}

interface OrderConfirmationProps {
  name: string;
  productName: string;
  amount: number;
  orderCode: string;
}

export function Email1Welcome({ name }: BaseProps) {
  return (
    <div style={wrap}>
      <p>Chào {name},</p>
      <p>Cảm ơn bạn đã đăng ký.</p>
      <p>
        Mình là Evondev. Mình không phải startup có team lớn — mình tự build AI
        Brain Tool vì mình cần nó, không phải vì thấy đây là thị trường tiềm
        năng.
      </p>
      <p>
        Mình có thói quen lưu mọi thứ: ý tưởng hay, bài đọc tốt, những gì học
        được từ cuộc họp. Nhưng khi cần tìm lại thì không ra. Không phải vì
        không lưu — mà vì lưu rải rác quá, không công cụ nào giúp mình tìm lại
        được đúng cái mình cần.
      </p>
      <p>
        AI Brain Tool là cái mình đang xây để giải quyết đúng vấn đề đó. Cứ lưu
        vào, AI lo phần tìm lại.
      </p>
      <p>
        Bạn sẽ được dùng thử trước khi mình ra mắt chính thức. Trong thời gian
        chờ, mình sẽ chia sẻ thêm những gì mình đang xây và những điều mình học
        được trong quá trình đó.
      </p>
      <p>
        Mình hi vọng khi sản phẩm ra mắt, nó sẽ giúp được bạn đang gặp đúng vấn
        đề mình từng gặp.
      </p>
    </div>
  );
}

export function Email2Nurture({ name }: BaseProps) {
  return (
    <div style={wrap}>
      <p>Chào {name},</p>
      <p>Mình nhận ra một điều sau nhiều tháng dùng đủ loại công cụ ghi chú.</p>
      <p>
        Vấn đề không phải ở việc lưu ở đâu. Mình lưu đủ chỗ rồi — Notion, Notes,
        Chrome bookmark, Saved messages Telegram. Cái mình thiếu là tìm lại được
        đúng cái mình cần, đúng lúc mình cần.
      </p>
      <p>
        Não người không được thiết kế để nhớ chính xác mình đã lưu thứ gì ở đâu.
        Đó là lý do tại sao hầu hết những người làm việc với kiến thức nhiều đều
        có cùng vấn đề: lưu nhiều nhưng dùng được ít.
      </p>
      <p>
        Mình đã thử giải quyết bằng cách lưu có tổ chức hơn — folder rõ ràng,
        tag đầy đủ, structure cẩn thận. Cách đó hoạt động được một thời gian.
        Nhưng khi chúng ta không có thời gian thì không làm được chuyện đó.
      </p>
      <p>
        Giải pháp không phải là lưu gọn hơn. Giải pháp là để một thứ khác lo
        phần tổ chức đó — còn mình chỉ cần dump vào, cần gì thì hỏi bằng tiếng
        Việt tự nhiên.
      </p>
      <p>Đó là điều mình đang xây trong AI Brain Tool.</p>
    </div>
  );
}

export function Email3Sales({ name }: BaseProps) {
  return (
    <div style={wrap}>
      <p>
        Chào {name},</p>
      <p>
        Hôm nay mình chính thức mở AI Brain Tool cho bạn trong danh sách chờ.
      </p>
      <p>
        Sản phẩm làm được gì? Bạn lưu bất kỳ thứ gì vào — ghi chú tay, link bài
        đọc, ý tưởng gõ nhanh khi đang trên xe — rồi khi cần tìm lại, chỉ cần
        hỏi bằng tiếng Việt tự nhiên. Ứng dụng tìm trong 1 giây. Không cần nhớ
        đã lưu ở đâu, không cần tag thủ công, không cần folder phức tạp.
      </p>
      <p>
        Hiện tại sản phẩm đang bán theo dạng Lifetime Deal:{" "}
        <strong>
          99.000đ, mua một lần, dùng tất cả tính năng hiện tại và tương lai.
        </strong>
      </p>
      <p>
        Mình không khẳng định ứng dụng này sẽ thay đổi hoàn toàn cách bạn làm
        việc. Nhưng mình thử nghiệm thì thấy cũng ổn áp — tìm lại được những thứ
        mình từng nghĩ đã mất.
      </p>
      <p>
        Bạn có thể vào mua tại đây:{" "}
        <a href={PAYMENT_URL} style={{ color: "#ea580c", fontWeight: "bold" }}>
          {PAYMENT_URL}
        </a>
      </p>
      <p>
        Mình hi vọng AI Brain Tool sẽ giúp bạn giải quyết được vấn đề mà bạn
        đang gặp phải như mình.
      </p>
    </div>
  );
}

export function EmailOrderConfirmation({
  name,
  productName,
  amount,
  orderCode,
}: OrderConfirmationProps) {
  const fmt = (n: number) => n.toLocaleString("vi-VN") + "đ";

  return (
    <div style={wrap}>
      <p>{name} ơi, mình xác nhận đã nhận được thanh toán của bạn.</p>

      <table
        width="100%"
        cellPadding={0}
        cellSpacing={0}
        style={{ background: "#fff7ed", borderRadius: 12, margin: "20px 0", fontSize: 14 }}
      >
        <tbody>
          {[
            { label: "Sản phẩm", value: productName, bold: true, color: "#111827" },
            { label: "Số tiền", value: fmt(amount), bold: true, color: "#ea580c" },
            { label: "Mã đơn hàng", value: orderCode, bold: false, color: "#374151" },
          ].map((row, i) => (
            <tr key={i}>
              <td style={{ padding: "10px 20px", color: "#6b7280", width: "40%" }}>{row.label}</td>
              <td style={{ padding: "10px 20px", color: row.color, fontWeight: row.bold ? 700 : 400, textAlign: "right" }}>
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Link truy cập AI Brain Tool sẽ được gửi đến bạn trong vòng vài giờ —
        mình xử lý thủ công nên có thể cần chút thời gian, nhưng chắc chắn bạn
        sẽ nhận được trước cuối ngày hôm nay.
      </p>
      <p>
        Nếu sau 24 giờ vẫn chưa nhận được gì, reply email này để mình kiểm tra
        lại nhé.
      </p>
      <p>
        Trong lúc chờ, bạn có thể vào trang sản phẩm để xem trước một số hướng
        dẫn sử dụng:{" "}
        <a href={APP_URL} style={{ color: "#ea580c" }}>
          {APP_URL}
        </a>
      </p>
      <p>Cảm ơn bạn đã tin tưởng — mình sẽ cố không làm bạn thất vọng.</p>
    </div>
  );
}
