"use client";

import Link from "next/link";
import { useCMS } from "@/context/CMSContext";

export default function DashboardPage() {
  const { 
    galleryItems, galleryLoading, 
    articles, articlesLoading, 
    galleryCategories, articleCategories,
    fleets, fleetsLoading,
    testimonials, testimonialsLoading
  } = useCMS();

  const stats = [
    {
      label: "Total Galeri",
      value: galleryLoading ? "…" : galleryItems.length,
      icon: "photo_library",
      color: "bg-blue-500",
      href: "/dashboard/galeri",
    },
    {
      label: "Total Artikel",
      value: articlesLoading ? "…" : articles.length,
      icon: "article",
      color: "bg-emerald-500",
      href: "/dashboard/artikel",
    },
    {
      label: "Kategori Galeri",
      value: galleryCategories.length,
      icon: "category",
      color: "bg-amber-500",
      href: "/dashboard/galeri",
    },
    {
      label: "Kategori Artikel",
      value: articleCategories.length,
      icon: "label",
      color: "bg-purple-500",
      href: "/dashboard/artikel",
    },
    {
      label: "Total Armada",
      value: fleetsLoading ? "…" : fleets.length,
      icon: "directions_car",
      color: "bg-indigo-500",
      href: "/dashboard/armada",
    },
    {
      label: "Total Testimoni",
      value: testimonialsLoading ? "…" : testimonials.length,
      icon: "reviews",
      color: "bg-pink-500",
      href: "/dashboard/testimoni",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold font-headline text-on-surface">
          Dashboard
        </h2>
        <p className="text-on-surface-variant mt-1">
          Ringkasan konten website Juragan Rental Surabaya.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center shadow-lg`}
              >
                <span className="material-symbols-outlined text-white text-2xl">
                  {stat.icon}
                </span>
              </div>
              <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">
                arrow_forward
              </span>
            </div>
            <p className="text-3xl font-extrabold font-headline text-on-surface">
              {stat.value}
            </p>
            <p className="text-sm text-on-surface-variant font-medium mt-1">
              {stat.label}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
        <h3 className="text-lg font-bold font-headline text-on-surface mb-6">
          Aksi Cepat
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/dashboard/galeri?action=add"
            className="flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
          >
            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary text-2xl">
              add_photo_alternate
            </span>
            <span className="font-medium text-sm text-gray-600 group-hover:text-primary">
              Tambah Foto Galeri
            </span>
          </Link>
          <Link
            href="/dashboard/artikel/buat"
            className="flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all group"
          >
            <span className="material-symbols-outlined text-gray-400 group-hover:text-emerald-500 text-2xl">
              edit_note
            </span>
            <span className="font-medium text-sm text-gray-600 group-hover:text-emerald-500">
              Tulis Artikel Baru
            </span>
          </Link>
          <Link
            href="/galeri"
            target="_blank"
            className="flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-amber-500 hover:bg-amber-50 transition-all group"
          >
            <span className="material-symbols-outlined text-gray-400 group-hover:text-amber-500 text-2xl">
              visibility
            </span>
            <span className="font-medium text-sm text-gray-600 group-hover:text-amber-500">
              Lihat Halaman Galeri
            </span>
          </Link>
          <Link
            href="/artikel"
            target="_blank"
            className="flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all group"
          >
            <span className="material-symbols-outlined text-gray-400 group-hover:text-purple-500 text-2xl">
              open_in_new
            </span>
            <span className="font-medium text-sm text-gray-600 group-hover:text-purple-500">
              Lihat Halaman Artikel
            </span>
          </Link>
        </div>
      </div>

      {/* Recent Articles */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold font-headline text-on-surface">
            Artikel Terbaru
          </h3>
          <Link
            href="/dashboard/artikel"
            className="text-sm text-primary font-bold hover:underline"
          >
            Lihat Semua
          </Link>
        </div>
        {articlesLoading ? (
          <div className="text-center py-8 text-on-surface-variant">
            <span className="material-symbols-outlined animate-spin text-3xl mb-2 block">progress_activity</span>
            <p className="text-sm">Memuat artikel...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {articles.slice(0, 5).map((article) => (
              <div
                key={article.slug}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">
                    article
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-on-surface truncate">
                    {article.title}
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    {article.category.name} ·{" "}
                    {article.publishedAt
                      ? new Date(article.publishedAt).toLocaleDateString("id-ID")
                      : "Draft"}
                  </p>
                </div>
                <Link
                  href={`/dashboard/artikel/edit/${article.slug}`}
                  className="text-gray-400 hover:text-primary transition-colors shrink-0"
                >
                  <span className="material-symbols-outlined">edit</span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
