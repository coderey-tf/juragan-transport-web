import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeri | Juragan Rental Surabaya",
  description:
    "Lihat koleksi foto armada, tim, dan momen layanan terbaik dari Juragan Rental Surabaya.",
};

export default function GaleriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
