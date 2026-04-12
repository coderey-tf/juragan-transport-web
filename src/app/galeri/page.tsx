import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import GalleryClient from "@/components/GalleryClient";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function GaleriPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { sortOrder: "asc" },
    include: { category: { select: { name: true } } },
  });

  const categoryNames = [...new Set(items.map((g) => g.category.name))];

  const clientItems = items.map((i) => ({
    id: i.id,
    src: i.src,
    alt: i.alt,
    category: i.category.name,
  }));

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />

      {/* Page Header */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-br from-primary via-[#1A4FB5] to-[#0e3a8c] overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-10 w-72 h-72 bg-secondary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
          <nav className="flex items-center justify-center gap-2 text-white/60 text-sm mb-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <span className="material-symbols-outlined text-base">
              chevron_right
            </span>
            <span className="text-white">Galeri</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline text-white mb-4 drop-shadow-lg">
            Galeri Kami
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-base md:text-lg">
            Lihat koleksi foto perjalanan, armada, dan momen terbaik bersama
            pelanggan setia Juragan Rental Surabaya.
          </p>
        </div>
      </section>

      <GalleryClient items={clientItems} categories={categoryNames} />

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
