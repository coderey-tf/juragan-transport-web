"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCMS } from "@/context/CMSContext";

export default function DashboardArtikelPage() {
  const { articles, articlesLoading, deleteArticle } = useCMS();
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(false);

  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (slug: string) => {
    setDeleting(true);
    try {
      await deleteArticle(slug);
      setDeleteSlug(null);
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus artikel.");
    } finally {
      setDeleting(false);
    }
  };

  if (articlesLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="material-symbols-outlined animate-spin text-4xl text-primary">
          progress_activity
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-headline text-on-surface">
            Kelola Artikel
          </h2>
          <p className="text-on-surface-variant mt-1">
            {articles.length} artikel tersedia
          </p>
        </div>
        <Link
          href="/dashboard/artikel/buat"
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-container transition-colors shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined">edit_note</span>
          Tulis Artikel
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          search
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari artikel berdasarkan judul atau kategori..."
          className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
        />
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Artikel
                </th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant hidden md:table-cell">
                  Kategori
                </th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant hidden lg:table-cell">
                  Tanggal
                </th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant hidden lg:table-cell">
                  Status
                </th>
                <th className="text-right px-6 py-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((article) => (
                <tr
                  key={article.slug}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                        <Image
                          src={article.cover}
                          alt={article.title}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-on-surface truncate max-w-xs">
                          {article.title}
                        </p>
                        <p className="text-xs text-on-surface-variant truncate max-w-xs md:hidden">
                          {article.category.name} ·{" "}
                          {article.publishedAt
                            ? new Date(article.publishedAt).toLocaleDateString("id-ID")
                            : "Draft"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="bg-primary/10 text-primary font-bold text-xs px-3 py-1.5 rounded-full">
                      {article.category.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="text-sm text-on-surface-variant">
                      {article.publishedAt
                        ? new Date(article.publishedAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span
                      className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                        article.published
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {article.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/artikel/${article.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all"
                        title="Lihat"
                      >
                        <span className="material-symbols-outlined text-xl">
                          visibility
                        </span>
                      </Link>
                      <Link
                        href={`/dashboard/artikel/edit/${article.slug}`}
                        className="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-all"
                        title="Edit"
                      >
                        <span className="material-symbols-outlined text-xl">
                          edit
                        </span>
                      </Link>
                      <button
                        onClick={() => setDeleteSlug(article.slug)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                        title="Hapus"
                      >
                        <span className="material-symbols-outlined text-xl">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl mb-3 block opacity-30">
              article
            </span>
            <p className="font-medium">
              {search
                ? "Tidak ditemukan artikel yang cocok."
                : "Belum ada artikel."}
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      {deleteSlug && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 md:p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-red-500 text-3xl">
                delete
              </span>
            </div>
            <h3 className="text-lg font-bold text-on-surface">
              Hapus Artikel Ini?
            </h3>
            <p className="text-sm text-on-surface-variant">
              Artikel ini akan dihapus secara permanen dari database.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteSlug(null)}
                className="flex-1 px-6 py-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-colors text-sm"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteSlug)}
                disabled={deleting}
                className="flex-1 px-6 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors shadow-lg text-sm disabled:opacity-50"
              >
                {deleting ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
