"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

export default function ImageUpload({
  value,
  onChange,
  label = "Unggah Gambar",
  placeholder = "Pilih atau letakkan gambar di sini",
  className = "",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Optional: Validate file type & size
    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran gambar maksimal 5MB");
      return;
    }

    setUploading(true);
    setError(null);

    // Show preview immediately using local blob object wrapper
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal mengunggah gambar");
      }

      setPreview(data.url);
      onChange(data.url);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Terjadi kesalahan saat mengunggah");
      setPreview(value || null); // revert preview on error
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block">
        {label}
      </label>

      {/* Manual Input Fallback */}
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setPreview(e.target.value);
        }}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm mb-2"
        placeholder="Atau masukkan URL gambar..."
      />

      {/* Upload Box */}
      <div className="relative group cursor-pointer border-2 border-dashed border-gray-300 rounded-2xl hover:border-primary hover:bg-primary/5 transition-all outline-none overflow-hidden aspect-video flex items-center justify-center p-4">
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={handleFileChange}
          disabled={uploading}
        />
        
        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            fill
            className={`object-cover ${uploading ? "opacity-50 blur-sm" : ""}`}
            onError={() => {
              setPreview(null);
            }}
          />
        ) : (
          <div className="text-center">
            <span className="material-symbols-outlined text-4xl text-gray-400 group-hover:text-primary mb-2">
              cloud_upload
            </span>
            <p className="font-medium text-sm text-gray-600 group-hover:text-primary">
              {placeholder}
            </p>
            <p className="text-xs text-on-surface-variant mt-1">Maks. 5MB</p>
          </div>
        )}

        {/* Loading Overlay */}
        {uploading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm text-white">
            <span className="material-symbols-outlined animate-spin text-4xl mb-2">
              progress_activity
            </span>
            <p className="text-sm font-bold shadow-sm">Mengunggah...</p>
          </div>
        )}

        {/* Change Image Hover Hint */}
        {preview && !uploading && (
          <div className="absolute inset-0 z-20 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined text-2xl mr-2">
              edit
            </span>
            <span className="font-bold text-sm">Ubah Gambar</span>
          </div>
        )}
      </div>
      
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}
