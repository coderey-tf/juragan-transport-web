"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImageUpload from "@/components/ImageUpload";
import type { CategoryDB } from "@/context/CMSContext";

export interface ArticleFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover: string;
  author: string;
  readTime: string;
  published: boolean;
  publishedAt: string;
  categoryId: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

interface ArticleFormProps {
  initialData?: Partial<ArticleFormData>;
  categories: CategoryDB[];
  onSubmit: (data: ArticleFormData) => Promise<void>;
  isEdit?: boolean;
}

export default function ArticleForm({
  initialData,
  categories,
  onSubmit,
  isEdit = false,
}: ArticleFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ArticleFormData>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover: "",
    author: "Admin Juragan",
    readTime: "5 menit",
    published: true,
    publishedAt: new Date().toISOString().split("T")[0],
    categoryId: categories[0]?.id || "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    ...initialData,
  });

  useEffect(() => {
    if (initialData) {
      setForm((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (title: string) => {
    const updates: Partial<ArticleFormData> = { title };
    if (!isEdit) {
      updates.slug = generateSlug(title);
    }
    setForm((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content || !form.slug || !form.categoryId) return;
    setSaving(true);
    try {
      await onSubmit(form);
      router.push("/dashboard/artikel");
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan artikel. Silakan coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Back link */}
      <Link
        href="/dashboard/artikel"
        className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary font-medium text-sm transition-colors"
      >
        <span className="material-symbols-outlined text-lg">arrow_back</span>
        Kembali ke Daftar Artikel
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 space-y-5">
            <h2 className="text-xl font-bold font-headline text-on-surface">
              {isEdit ? "Edit Artikel" : "Tulis Artikel Baru"}
            </h2>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                Judul Artikel
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-lg font-bold"
                placeholder="Masukkan judul artikel..."
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                Slug URL
              </label>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <span className="bg-gray-50 text-on-surface-variant text-sm px-4 py-3 border-r border-gray-200">
                  /artikel/
                </span>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) =>
                    setForm({ ...form, slug: e.target.value })
                  }
                  className="flex-1 px-4 py-3 focus:ring-2 focus:ring-primary transition-all text-sm"
                  placeholder="slug-artikel"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                Ringkasan (Excerpt)
              </label>
              <textarea
                value={form.excerpt}
                onChange={(e) =>
                  setForm({ ...form, excerpt: e.target.value })
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm resize-none"
                rows={3}
                placeholder="Tulis ringkasan singkat artikel..."
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                Konten Artikel
              </label>
              <p className="text-xs text-on-surface-variant mb-2">
                Gunakan format Markdown: ## untuk heading, ### untuk sub-heading,
                - untuk list, **teks** untuk bold, *teks* untuk italic
              </p>
              <textarea
                value={form.content}
                onChange={(e) =>
                  setForm({ ...form, content: e.target.value })
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm font-mono resize-y"
                rows={20}
                placeholder="Tulis konten artikel di sini..."
                required
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h3 className="font-bold font-headline text-on-surface">
              Pengaturan
            </h3>

            <ImageUpload
              label="Cover Image URL"
              value={form.cover}
              onChange={(url) => setForm({ ...form, cover: url })}
            />

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                Kategori
              </label>
              <select
                value={form.categoryId}
                onChange={(e) =>
                  setForm({ ...form, categoryId: e.target.value })
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                  Tanggal
                </label>
                <input
                  type="date"
                  value={form.publishedAt}
                  onChange={(e) =>
                    setForm({ ...form, publishedAt: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                  Waktu Baca
                </label>
                <input
                  type="text"
                  value={form.readTime}
                  onChange={(e) =>
                    setForm({ ...form, readTime: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                  placeholder="5 menit"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                Penulis
              </label>
              <input
                type="text"
                value={form.author}
                onChange={(e) =>
                  setForm({ ...form, author: e.target.value })
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                placeholder="Nama penulis"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="published"
                checked={form.published}
                onChange={(e) =>
                  setForm({ ...form, published: e.target.checked })
                }
                className="w-5 h-5 rounded-md border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="published" className="text-sm font-medium text-on-surface">
                Publikasikan artikel
              </label>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h3 className="font-bold font-headline text-on-surface">
              SEO (Opsional)
            </h3>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                Meta Title
              </label>
              <input
                type="text"
                value={form.metaTitle}
                onChange={(e) =>
                  setForm({ ...form, metaTitle: e.target.value })
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                placeholder="Judul untuk mesin pencari"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                Meta Description
              </label>
              <textarea
                value={form.metaDescription}
                onChange={(e) =>
                  setForm({ ...form, metaDescription: e.target.value })
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm resize-none"
                rows={2}
                placeholder="Deskripsi untuk mesin pencari"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                Meta Keywords
              </label>
              <input
                type="text"
                value={form.metaKeywords}
                onChange={(e) =>
                  setForm({ ...form, metaKeywords: e.target.value })
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-primary text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-container shadow-lg shadow-primary/20 transition-all text-sm disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-xl">
                {isEdit ? "save" : "publish"}
              </span>
              {saving
                ? "Menyimpan..."
                : isEdit
                ? "Simpan Perubahan"
                : "Publikasikan"}
            </button>
            <Link
              href="/dashboard/artikel"
              className="w-full block text-center py-3.5 rounded-xl font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm"
            >
              Batal
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
