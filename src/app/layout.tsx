import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Juragan Rental Surabaya | Sewa Mobil & Driver Premium",
  description:
    "Layanan sewa mobil dan driver profesional terpercaya di Surabaya. Nikmati kenyamanan eksklusif untuk kebutuhan bisnis, wisata, dan perjalanan dinas Anda.",
  keywords:
    "sewa mobil surabaya, rent car surabaya, sewa innova zenix surabaya, sewa alphard surabaya, sewa mobil driver surabaya, rental mobil terpercaya",
  openGraph: {
    title: "Juragan Rental Surabaya",
    description: "Perjalanan Nyaman Bersama Driver Profesional di Surabaya.",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${beVietnamPro.variable} h-full antialiased`}
    >
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body text-on-surface bg-surface min-h-screen flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
