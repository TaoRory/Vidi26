import type { Metadata, Viewport } from "next";
import { Montserrat, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VIDI26 — Next Station: VinUni",
    template: "%s | VIDI26",
  },
  description:
    "VinUni Discovery 2026 — Trạm Kế Tiếp. Hành trình 3N2Đ khám phá VinUniversity cùng LEXCE và 300+ Cohort-7-to-be.",
  keywords: ["VIDI26", "VinUni", "VinUniversity", "Discovery", "Orientation", "2026"],
  openGraph: {
    title: "VIDI26 — Next Station: VinUni",
    description: "VinUni Discovery 2026 — Trạm Kế Tiếp. Where the future begins.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050814",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${montserrat.variable} ${cormorant.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased bg-grid-overlay">
        {children}
      </body>
    </html>
  );
}
