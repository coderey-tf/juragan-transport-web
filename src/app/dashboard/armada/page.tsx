"use client";

import { useState } from "react";
import Image from "next/image";
import ImageUpload from "@/components/ImageUpload";
import { useCMS } from "@/context/CMSContext";
import type { FleetDB } from "@/context/CMSContext";

export default function DashboardArmadaPage() {
  const { fleets, fleetsLoading, addFleet, updateFleet, deleteFleet } =
    useCMS();

  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<FleetDB | null>(null);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    badge: "",
    image: "",
    flip: false,
    imageClass: "",
    description: "",
    seats: "",
    transmission: "",
    active: true,
  });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const openAdd = () => {
    setForm({
      name: "",
      slug: "",
      badge: "",
      image: "",
      flip: false,
      imageClass: "",
      description: "",
      seats: "",
      transmission: "",
      active: true,
    });
    setEditItem(null);
    setShowForm(true);
  };

  const openEdit = (item: FleetDB) => {
    setForm({
      name: item.name,
      slug: item.slug,
      badge: item.badge || "",
      image: item.image,
      flip: item.flip,
      imageClass: item.imageClass || "",
      description: item.description || "",
      seats: item.seats ? item.seats.toString() : "",
      transmission: item.transmission || "",
      active: item.active,
    });
    setEditItem(item);
    setShowForm(true);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.image || !form.slug) return;
    setSaving(true);

    const payload = {
      name: form.name,
      slug: form.slug,
      badge: form.badge || null,
      image: form.image,
      flip: form.flip,
      imageClass: form.imageClass,
      description: form.description || null,
      seats: form.seats ? parseInt(form.seats, 10) : null,
      transmission: form.transmission || null,
      active: form.active,
    };

    try {
      if (editItem) {
        await updateFleet(editItem.slug, payload);
      } else {
        await addFleet(payload);
      }
      setShowForm(false);
      setEditItem(null);
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan armada. Silakan coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    setSaving(true);
    try {
      await deleteFleet(slug);
      setDeleteConfirm(null);
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus armada.");
    } finally {
      setSaving(false);
    }
  };

  if (fleetsLoading) {
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
            Kelola Armada
          </h2>
          <p className="text-on-surface-variant mt-1">
            {fleets.length} armada tersedia
          </p>
        </div>
        <button
          onClick={openAdd}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-container transition-colors shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined">directions_car</span>
          Tambah Armada
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fleets.map((car) => (
          <div
            key={car.slug}
            className="group relative bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col p-5"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-on-surface">{car.name}</h3>
                {car.badge && (
                  <span className="inline-block mt-1 bg-secondary text-black font-extrabold px-2 py-1 text-[10px] rounded uppercase">
                    {car.badge}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(car)}
                  className="text-gray-400 hover:text-primary transition-colors"
                  title="Edit"
                >
                  <span className="material-symbols-outlined text-lg">edit</span>
                </button>
                <button
                  onClick={() => setDeleteConfirm(car.slug)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Hapus"
                >
                  <span className="material-symbols-outlined text-lg">
                    delete
                  </span>
                </button>
              </div>
            </div>

            <div className="relative h-32 w-full mb-4 flex items-center justify-center bg-gray-50 rounded-lg">
              <div
                className={`relative w-full h-full drop-shadow-sm ${
                  car.flip ? "-scale-x-100" : ""
                }`}
              >
                <Image
                  alt={car.name}
                  src={car.image}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={`object-contain p-2 ${car.imageClass || ""}`}
                />
              </div>
            </div>

            <div className="flex gap-4 text-xs text-on-surface-variant font-medium mt-auto border-t border-gray-100 pt-3">
              {car.seats && (
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    airline_seat_recline_normal
                  </span>
                  {car.seats} Kursi
                </div>
              )}
              {car.transmission && (
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    settings
                  </span>
                  {car.transmission}
                </div>
              )}
              <div className="flex items-center gap-1 ml-auto">
                <span
                  className={`material-symbols-outlined text-sm ${
                    car.active ? "text-emerald-500" : "text-gray-400"
                  }`}
                >
                  {car.active ? "check_circle" : "cancel"}
                </span>
                {car.active ? "Aktif" : "Nonaktif"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {fleets.length === 0 && (
        <div className="text-center py-16 text-on-surface-variant">
          <span className="material-symbols-outlined text-5xl mb-3 block opacity-30">
            directions_car
          </span>
          <p className="font-medium">Belum ada armada.</p>
        </div>
      )}

      {/* Add / Edit Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 md:p-8 my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold font-headline text-on-surface">
                {editItem ? "Edit Armada" : "Tambah Armada Baru"}
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
                    Nama Armada
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setForm({
                        ...form,
                        name,
                        slug: editItem ? form.slug : generateSlug(name),
                      });
                    }}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                    required
                    disabled={!!editItem}
                  />
                </div>
              </div>

              <ImageUpload
                label="URL Gambar"
                value={form.image}
                onChange={(url) => setForm({ ...form, image: url })}
                placeholder="Pilih file gambar untuk armada"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                    Badge (Opsional)
                  </label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) =>
                      setForm({ ...form, badge: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                    placeholder="Contoh: Terlaris"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                    Kapasitas Kursi
                  </label>
                  <input
                    type="number"
                    value={form.seats}
                    onChange={(e) =>
                      setForm({ ...form, seats: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                    Transmisi
                  </label>
                  <select
                    value={form.transmission}
                    onChange={(e) =>
                      setForm({ ...form, transmission: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                  >
                    <option value="">Status Transmisi</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border border-gray-200 p-4 rounded-xl bg-gray-50/50">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.flip}
                    onChange={(e) => setForm({ ...form, flip: e.target.checked })}
                    className="w-5 h-5 rounded text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium">Balik Gambar (Flip Horizontal)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) =>
                      setForm({ ...form, active: e.target.checked })
                    }
                    className="w-5 h-5 rounded text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium">Status Aktif</span>
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
                  {saving ? "Menyimpan..." : editItem ? "Simpan Perubahan" : "Simpan Armada"}
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
              Hapus Armada Ini?
            </h3>
            <p className="text-sm text-on-surface-variant">
              Armada ini akan dihapus permanen dari database.
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
