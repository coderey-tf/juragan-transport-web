"use client";

import Image from "next/image";
import { FLEETS } from "@/data/fleets";
import { FormEvent } from "react";

export default function HeroSection() {
  const handleBookingSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const departure = formData.get("departure") as string;
    const returnDate = formData.get("return") as string;
    const armada = formData.get("armada") as string;
    const service = formData.get("service") as string;

    if (!name.trim()) return;

    const message = `Halo Admin Juragan Rental,\n\nSaya tertarik untuk Booking Kendaraan dengan rincian berikut:\n\n Nama           : ${name}\n Tgl Berangkat  : ${departure || "-"}\n Tgl Kembali    : ${returnDate || "-"}\n Armada         : ${armada || "Belum Menentukan"}\n Jenis Layanan  : ${service || "-"}\n\nMohon informasi ketersediaan unit dan estimasi biayanya ya. Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6282132213259?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };
  return (
    <section className="relative min-h-svh flex items-center pt-28 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          alt="Premium Car Service with Professional Driver"
          className="object-cover"
          src="/images/team-juragan2.jpeg"
          fill
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="text-white space-y-4 md:space-y-6 text-center lg:text-left mt-6 lg:mt-0">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold font-headline leading-[1.2] lg:leading-[1.15] tracking-tight drop-shadow-lg max-w-2xl mx-auto lg:mx-0">
            Perjalanan Nyaman <br className="hidden xl:block" />
            Bersama <span className="text-secondary">Driver Profesional</span>
          </h1>
          <p className="text-base md:text-lg text-white/95 max-w-xl mx-auto lg:mx-0 font-body leading-relaxed drop-shadow-md">
            Layanan Rent Car &amp; Driver terpercaya di Surabaya. Nikmati
            kenyamanan eksklusif untuk kebutuhan bisnis, wisata, maupun
            perjalanan dinas Anda.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-3 justify-center lg:justify-start">
            <a
              href="#armada"
              aria-label="Lihat Armada"
              className="bg-gradient-to-r from-secondary to-[#F9A826] text-black px-6 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#F5C518]/40 shadow-lg shadow-[#F5C518]/20 transition-all duration-300"
            >
              Lihat Armada
              <span className="material-symbols-outlined text-xl">
                arrow_forward
              </span>
            </a>
            <a
              href="https://wa.me/6282132213259?text=Halo%20Admin%20Juragan%20Rental%2C%0A%0ASaya%20tertarik%20untuk%20Booking%20Kendaraan%20dengan%20rincian%20berikut%3A%0A%0A%20Nama%20%20%20%20%20%20%20%20%20%20%20%3A%20%0A%20Tgl%20Berangkat%20%20%3A%20%0A%20Tgl%20Kembali%20%20%20%20%3A%20%0A%20Armada%20%20%20%20%20%20%20%20%20%3A%20%0A%20Jenis%20Layanan%20%20%3A%20%0A%0AMohon%20informasi%20ketersediaan%20unit%20dan%20estimasi%20biayanya%20ya.%20Terima%20kasih!"
              aria-label="Hubungi via WhatsApp"
              target="_blank"
              className="bg-gradient-to-r from-[#25D366] to-[#1DA851] text-white px-6 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:-translate-y-0.5 shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 transition-all duration-300"
            >
              <span
                className="material-symbols-outlined text-xl"
                data-weight="fill"
              >
                chat
              </span>
              Hubungi WhatsApp
            </a>
          </div>
        </div>

        {/*  Quick Booking Form  */}
        <div className="bg-white/10 backdrop-blur-xl p-6 lg:p-8 rounded-3xl shadow-2xl border border-white/20 lg:ml-auto w-full max-w-[400px] xl:max-w-[420px] mx-auto mt-10 lg:mt-0">
          <h2 className="text-2xl font-bold font-headline text-white mb-6">
            Pesan Perjalanan Anda
          </h2>
          <form className="space-y-1" onSubmit={handleBookingSubmit}>
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="text-xs font-bold uppercase tracking-wider text-white/80"
              >
                Nama Lengkap
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full bg-white/90 text-black border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#F5C518] transition-all shadow-inner hover:bg-white"
                placeholder="Masukkan nama Anda"
                type="text"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label
                  htmlFor="departure"
                  className="text-xs font-bold uppercase tracking-wider text-white/80"
                >
                  Tgl Berangkat
                </label>
                <input
                  id="departure"
                  name="departure"
                  className="w-full bg-white/90 text-black border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#F5C518] transition-all shadow-inner hover:bg-white"
                  type="date"
                />
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="return"
                  className="text-xs font-bold uppercase tracking-wider text-white/80"
                >
                  Tgl Kembali
                </label>
                <input
                  id="return"
                  name="return"
                  className="w-full bg-white/90 text-black border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#F5C518] transition-all shadow-inner hover:bg-white"
                  type="date"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label
                htmlFor="armada"
                className="text-xs font-bold uppercase tracking-wider text-white/80"
              >
                Armada Pilihan
              </label>
              <select
                id="sel_armada"
                name="armada"
                className="w-full bg-white/90 text-black border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary transition-all appearance-none shadow-inner hover:bg-white text-sm"
              >
                <option value="">Pilih Armada...</option>
                {FLEETS.map((f) => (
                  <option key={f.name} value={f.name}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label
                htmlFor="service"
                className="text-xs font-bold uppercase tracking-wider text-white/80"
              >
                Jenis Layanan
              </label>
              <select
                id="service"
                name="service"
                className="w-full bg-white/90 text-black border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary transition-all appearance-none shadow-inner hover:bg-white text-sm"
              >
                <option value="Dalam Kota Surabaya">Dalam Kota Surabaya</option>
                <option value="Luar Kota / Drop-off">
                  Luar Kota / Drop-off
                </option>
                <option value="Paket Wisata">Paket Wisata</option>
                <option value="Airport Transfer">Airport Transfer</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#25D366] to-[#1DA851] text-white py-4 rounded-xl font-bold mt-6 flex justify-center items-center gap-2 shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 hover:-translate-y-0.5 hover:brightness-110 transition-all duration-300"
            >
              Kirim via WhatsApp
            </button>
          </form>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden translate-y-[1px] pointer-events-none z-10 leading-[0]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-[60px] md:h-[100px] block"
        >
          <path
            className="fill-surface"
            d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,85.3C672,96,768,96,864,85.3C960,75,1056,53,1152,48C1248,43,1344,53,1392,58.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
