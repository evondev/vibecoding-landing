import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Brain Tool — Bộ Nhớ Thứ Hai Của Bạn, Được Hỗ Trợ Bởi AI",
  description:
    "Lưu mọi ghi chú, bài viết, ý tưởng và tài liệu vào một nơi duy nhất. AI tự động phân loại, kết nối và giúp bạn tìm lại bất cứ thứ gì — chỉ trong 1 giây.",
  openGraph: {
    title: "AI Brain Tool — Bộ Nhớ Thứ Hai Của Bạn, Được Hỗ Trợ Bởi AI",
    description:
      "Lưu mọi ghi chú, bài viết, ý tưởng và tài liệu vào một nơi duy nhất. AI tự động phân loại, kết nối và giúp bạn tìm lại bất cứ thứ gì — chỉ trong 1 giây.",
    images: [
      {
        url: "/ai-brain-tool.png",
        width: 1200,
        height: 630,
        alt: "AI Brain Tool",
      },
    ],
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${spaceGrotesk.variable} ${inter.className} ${spaceGrotesk.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
