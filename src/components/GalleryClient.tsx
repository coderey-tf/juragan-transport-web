"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryClientItem {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export default function GalleryClient({
  items,
  categories,
}: {
  items: GalleryClientItem[];
  categories: string[];
}) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered =
    activeCategory === "Semua"
      ? items
      : items.filter((g) => g.category === activeCategory);

  return (
    <>
      <section className="py-12 md:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 md:mb-14">
            {["Semua", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {filtered.map((item, i) => (
              <div
                key={item.id}
                className="break-inside-avoid group cursor-pointer relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                onClick={() => setLightbox(i)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
                  <span className="text-xs font-bold text-secondary uppercase tracking-widest mb-1">
                    {item.category}
                  </span>
                  <p className="text-white font-bold text-lg leading-tight">
                    {item.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-on-surface-variant">
              <span className="material-symbols-outlined text-6xl mb-4 block opacity-30">
                photo_library
              </span>
              <p className="text-lg font-medium">
                Belum ada foto untuk kategori ini.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white transition-colors z-10"
            onClick={() => setLightbox(null)}
            aria-label="Tutup"
          >
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>

          <button
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10 p-2"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(lightbox === 0 ? filtered.length - 1 : lightbox - 1);
            }}
            aria-label="Foto sebelumnya"
          >
            <span className="material-symbols-outlined text-4xl md:text-5xl">
              chevron_left
            </span>
          </button>

          <div
            className="relative max-w-5xl w-full max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              width={1200}
              height={800}
              className="max-h-[85vh] w-auto mx-auto object-contain rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <p className="text-white font-bold text-lg">
                {filtered[lightbox].alt}
              </p>
              <span className="text-secondary text-sm font-bold uppercase tracking-wider">
                {filtered[lightbox].category}
              </span>
            </div>
          </div>

          <button
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10 p-2"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(lightbox === filtered.length - 1 ? 0 : lightbox + 1);
            }}
            aria-label="Foto selanjutnya"
          >
            <span className="material-symbols-outlined text-4xl md:text-5xl">
              chevron_right
            </span>
          </button>
        </div>
      )}
    </>
  );
}
