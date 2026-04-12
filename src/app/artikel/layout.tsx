import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artikel | Juragan Rental Surabaya",
  description:
    "Baca tips perjalanan, destinasi wisata, dan informasi seputar layanan rental mobil di Surabaya dari Juragan Rental.",
};

export default function ArtikelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
