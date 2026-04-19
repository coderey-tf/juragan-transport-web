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
  metadataBase: new URL("https://juraganrentalsurabaya.com"),
  title: "Rental Mobil Surabaya dengan Sopir | Juragan Rental Surabaya",
  description:
    "Sewa mobil Surabaya dengan sopir untuk perjalanan dinas, wisata, drop-off luar kota, dan antar jemput Juanda. Layanan 24 jam, armada lengkap, admin responsif.",
  keywords:
    "sewa mobil surabaya, rent car surabaya, sewa innova zenix surabaya, sewa alphard surabaya, sewa mobil driver surabaya, rental mobil terpercaya",
  openGraph: {
    title: "Rental Mobil Surabaya dengan Sopir | Juragan Rental Surabaya",
    description:
      "Sewa mobil Surabaya dengan sopir untuk perjalanan dinas, wisata, drop-off luar kota, dan antar jemput Juanda. Layanan 24 jam, armada lengkap, admin responsif.",
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
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="PIwrS0owkpYy9nbNzrW93w"
          async
        ></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
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
