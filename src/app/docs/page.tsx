import FooterSection from "@/components/footer-section";

export default function DocsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-bold text-gray-900">
            <span className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
              🧠
            </span>
            <span>AI Brain</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Tính năng", href: "/#features" },
              { label: "Cách hoạt động", href: "/#how-it-works" },
              { label: "Bảng giá", href: "/#pricing" },
              { label: "FAQ", href: "/#faq" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="/"
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-2 rounded-full transition-colors"
          >
            Về trang chủ
          </a>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center bg-white">
        <p className="text-gray-500 text-lg">Nội dung đang được cập nhật</p>
      </main>

      <FooterSection />
    </div>
  );
}
