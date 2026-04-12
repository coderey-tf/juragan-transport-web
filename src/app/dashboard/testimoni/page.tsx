"use client";

import { useState } from "react";
import { useCMS } from "@/context/CMSContext";
import type { TestimonialDB } from "@/context/CMSContext";

export default function DashboardTestimoniPage() {
  const { testimonials, testimonialsLoading, addTestimonial, updateTestimonial, deleteTestimonial } = useCMS();

  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<TestimonialDB | null>(null);
  const [form, setForm] = useState({
    name: "",
    role: "",
    content: "",
    initials: "",
    rating: "5",
    featured: true,
  });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const openAdd = () => {
    setForm({
      name: "",
      role: "",
      content: "",
      initials: "",
      rating: "5",
      featured: true,
    });
    setEditItem(null);
    setShowForm(true);
  };

  const openEdit = (item: TestimonialDB) => {
    setForm({
      name: item.name,
      role: item.role,
      content: item.content,
      initials: item.initials,
      rating: item.rating.toString(),
      featured: item.featured,
    });
    setEditItem(item);
    setShowForm(true);
  };

  const autoGenerateInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.role || !form.content) return;
    setSaving(true);

    const payload = {
      name: form.name,
      role: form.role,
      content: form.content,
      initials: form.initials || autoGenerateInitials(form.name),
      rating: parseInt(form.rating, 10),
      featured: form.featured,
    };

    try {
      if (editItem) {
        await updateTestimonial(editItem.id, payload);
      } else {
        await addTestimonial(payload);
      }
      setShowForm(false);
      setEditItem(null);
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan testimoni. Silakan coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    try {
      await deleteTestimonial(id);
      setDeleteConfirm(null);
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus testimoni.");
    } finally {
      setSaving(false);
    }
  };

  if (testimonialsLoading) {
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-headline text-on-surface">
            Kelola Testimoni
          </h2>
          <p className="text-on-surface-variant mt-1">
            {testimonials.length} testimoni tersedia
          </p>
        </div>
        <button
          onClick={openAdd}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-container transition-colors shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined">reviews</span>
          Tambah Testimoni
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((testi) => (
          <div
            key={testi.id}
            className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-1 text-secondary">
                {Array.from({ length: testi.rating }).map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-sm" data-weight="fill">
                    star
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(testi)}
                  className="text-gray-400 hover:text-primary transition-colors"
                  title="Edit"
                >
                  <span className="material-symbols-outlined text-lg">edit</span>
                </button>
                <button
                  onClick={() => setDeleteConfirm(testi.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Hapus"
                >
                  <span className="material-symbols-outlined text-lg">
                    delete
                  </span>
                </button>
              </div>
            </div>

            <p className="text-on-surface italic text-sm mb-6 flex-1 line-clamp-4">
              &quot;{testi.content}&quot;
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm shrink-0">
                {testi.initials}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm text-on-surface truncate">
                  {testi.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                  <span className="truncate">{testi.role}</span>
                  {testi.featured && (
                    <>
                      <span className="w-1 h-1 bg-gray-300 rounded-full shrink-0"></span>
                      <span className="text-primary font-bold whitespace-nowrap">Ditampilkan</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-16 text-on-surface-variant">
          <span className="material-symbols-outlined text-5xl mb-3 block opacity-30">
            reviews
          </span>
          <p className="font-medium">Belum ada testimoni pelanggan.</p>
        </div>
      )}

      {/* Add / Edit Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-6 md:p-8 my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold font-headline text-on-surface">
                {editItem ? "Edit Testimoni" : "Tambah Testimoni Baru"}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                    Nama Pelanggan
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setForm({
                        ...form,
                        name,
                        initials: form.initials ? form.initials : autoGenerateInitials(name)
                      });
                    }}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                    Profesi / Jabatan
                  </label>
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                    placeholder="Misal: Direktur PT Maju Mundur"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                  Isi Testimoni
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm min-h-[120px]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                    Inisial Avatar
                  </label>
                  <input
                    type="text"
                    value={form.initials}
                    onChange={(e) => setForm({ ...form, initials: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm uppercase"
                    maxLength={2}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                    Rating
                  </label>
                  <select
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                    <option value="4">⭐⭐⭐⭐ (4)</option>
                    <option value="3">⭐⭐⭐ (3)</option>
                  </select>
                </div>
              </div>

              <div className="border border-gray-200 p-4 rounded-xl bg-gray-50/50">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="w-5 h-5 rounded text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium">Tampilkan di Beranda (Featured)</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
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
                  {saving ? "Menyimpan..." : editItem ? "Simpan Perubahan" : "Simpan Testimoni"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 md:p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-red-500 text-3xl">
                delete
              </span>
            </div>
            <h3 className="text-lg font-bold text-on-surface">
              Hapus Testimoni Ini?
            </h3>
            <p className="text-sm text-on-surface-variant">
              Testimoni ini akan dihapus permanen dari database.
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
