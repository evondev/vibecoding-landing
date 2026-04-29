interface Props {
  onOpenModal: () => void;
}

export default function NavBar({ onOpenModal }: Props) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-bold text-gray-900">
          <span className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
            🧠
          </span>
          <span>AI Brain</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Tính năng", href: "#features" },
            { label: "Cách hoạt động", href: "#how-it-works" },
            { label: "Bảng giá", href: "#pricing" },
            { label: "FAQ", href: "#faq" },
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

        <div className="flex items-center gap-3">
          <a
            href="#how-it-works"
            className="hidden sm:block text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Xem demo
          </a>
          <button
            onClick={onOpenModal}
            className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-2 rounded-full transition-colors"
          >
            Dùng miễn phí
          </button>
        </div>
      </div>
    </header>
  );
}
