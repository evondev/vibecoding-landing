const productLinks = [
  { label: "Tính năng", href: "#features" },
  { label: "Cách hoạt động", href: "#how-it-works" },
  { label: "Bảng giá", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                🧠
              </span>
              <span className="font-bold text-white text-lg">AI Brain</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Bộ nhớ thứ hai của bạn — được hỗ trợ bởi AI. Lưu mọi kiến thức, tìm lại trong 1 giây.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Sản phẩm</h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="cursor-pointer text-gray-500 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <p className="text-gray-600 text-sm text-center">
            © {year} AI Brain Tool, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
