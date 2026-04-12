"use client";

import { useState } from "react";
import Image from "next/image";
import ImageUpload from "@/components/ImageUpload";
import { useCMS } from "@/context/CMSContext";
import type { GalleryItemDB } from "@/context/CMSContext";

export default function DashboardGaleriPage() {
  const {
    galleryItems,
    galleryLoading,
    galleryCategories,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
  } = useCMS();

  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<GalleryItemDB | null>(null);
  const [form, setForm] = useState({ src: "", alt: "", categoryId: "" });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [filterCat, setFilterCat] = useState("Semua");
  const [saving, setSaving] = useState(false);

  const filtered =
    filterCat === "Semua"
      ? galleryItems
      : galleryItems.filter((g) => g.category.name === filterCat);

  const categoryNames = galleryCategories.map((c) => c.name);

  const openAdd = () => {
    setForm({
      src: "",
      alt: "",
      categoryId: galleryCategories[0]?.id || "",
    });
    setEditItem(null);
    setShowForm(true);
  };

  const openEdit = (item: GalleryItemDB) => {
    setForm({ src: item.src, alt: item.alt, categoryId: item.categoryId });
    setEditItem(item);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.src || !form.alt || !form.categoryId) return;
    setSaving(true);
    try {
      if (editItem) {
        await updateGalleryItem(editItem.id, form);
      } else {
        await addGalleryItem(form);
      }
      setShowForm(false);
      setEditItem(null);
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan. Silakan coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    try {
      await deleteGalleryItem(id);
      setDeleteConfirm(null);
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus.");
    } finally {
      setSaving(false);
    }
  };

  if (galleryLoading) {
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
            Kelola Galeri
          </h2>
          <p className="text-on-surface-variant mt-1">
            {galleryItems.length} foto dalam galeri
          </p>
        </div>
        <button
          onClick={openAdd}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-container transition-colors shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined">add_photo_alternate</span>
          Tambah Foto
        </button>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {["Semua", ...categoryNames].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              filterCat === cat
                ? "bg-primary text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-200 hover:border-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => openEdit(item)}
                  className="bg-white text-primary p-2.5 rounded-xl shadow-lg hover:scale-110 transition-transform"
                  title="Edit"
                >
                  <span className="material-symbols-outlined text-xl">
                    edit
                  </span>
                </button>
                <button
                  onClick={() => setDeleteConfirm(item.id)}
                  className="bg-white text-red-500 p-2.5 rounded-xl shadow-lg hover:scale-110 transition-transform"
                  title="Hapus"
                >
                  <span className="material-symbols-outlined text-xl">
                    delete
                  </span>
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm font-bold text-on-surface truncate">
                {item.alt}
              </p>
              <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-1 inline-block">
                {item.category.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-on-surface-variant">
          <span className="material-symbols-outlined text-5xl mb-3 block opacity-30">
            photo_library
          </span>
          <p className="font-medium">Tidak ada foto untuk kategori ini.</p>
        </div>
      )}

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 md:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold font-headline text-on-surface">
                {editItem ? "Edit Foto" : "Tambah Foto Baru"}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <ImageUpload
                label="URL Gambar"
                value={form.src}
                onChange={(url) => setForm({ ...form, src: url })}
                placeholder="Pilih file gambar untuk galeri"
              />
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                  Deskripsi (Alt Text)
                </label>
                <input
                  type="text"
                  value={form.alt}
                  onChange={(e) => setForm({ ...form, alt: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                  placeholder="Deskripsi singkat foto"
                  required
                />
              </div>
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
                  {galleryCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-6 py-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-colors text-sm"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-container transition-colors shadow-lg text-sm disabled:opacity-50"
                >
                  {saving
                    ? "Menyimpan..."
                    : editItem
                    ? "Simpan Perubahan"
                    : "Tambah Foto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 md:p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-red-500 text-3xl">
                delete
              </span>
            </div>
            <h3 className="text-lg font-bold text-on-surface">
              Hapus Foto Ini?
            </h3>
            <p className="text-sm text-on-surface-variant">
              Foto ini akan dihapus secara permanen dari database.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-6 py-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-colors text-sm"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={saving}
                className="flex-1 px-6 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors shadow-lg text-sm disabled:opacity-50"
              >
                {saving ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
