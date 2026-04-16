"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const path = usePathname();

  useEffect(() => {
    const sections = ["armada", "layanan", "tentang", "testimoni", "kontak"];
    const handleScroll = () => {
      // Get all sections we want to track

      // Calculate active section
      // If we're at the very top, "Beranda" is active
      if (window.scrollY < 100) {
        setActiveSection("");
        return;
      }

      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section top is within the upper half of screen
          // and bottom is below navbar, mark it as active
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= 100) {
            current = section;
          }
        }
      }

      setActiveSection(current);
    };

    if (path === "/artikel") {
      const current = "artikel";
      setActiveSection(current);
    } else if (path === "/galeri") {
      const current = "galeri";
      setActiveSection(current);
    } else {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll(); // initial check

      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const navLinks = [
    { name: "Beranda", id: "", href: "/" },
    { name: "Layanan", id: "layanan", href: "/#layanan" },
    { name: "Tentang Kami", id: "tentang", href: "/#tentang" },
    { name: "Armada", id: "armada", href: "/#armada" },
    { name: "Galeri", id: "galeri", href: "/galeri" },
    { name: "Artikel", id: "artikel", href: "/artikel" },
    { name: "Kontak", id: "kontak", href: "/#kontak" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-sm">
      <div className="flex justify-between items-center px-4 md:px-8 py-4 max-w-7xl mx-auto w-full bg-white/50 backdrop-blur-md relative z-20">
        <Link
          href="/"
          className="flex items-center gap-3 md:gap-4 group cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-11 h-11 md:w-12 md:h-12 bg-gradient-to-br from-[#1A4FB5] via-blue-600 to-blue-400 rounded-xl shadow-lg shadow-blue-500/30 group-active:scale-95 transition-all border border-blue-200">
            <Image
              src="/images/logo-removebg-preview.png"
              alt="Juragan Rental Surabaya"
              fill
              sizes="48px"
              className="object-contain p-2 drop-shadow-sm"
            />
          </div>
          <div className="hidden sm:flex flex-col justify-center">
            <span className="text-xl md:text-2xl font-black tracking-tight bg-gradient-to-r from-[#1A4FB5] to-blue-800 bg-clip-text text-transparent font-headline leading-none pb-0.5">
              Juragan Rental
            </span>
            <span className="text-[0.65rem] md:text-xs font-bold tracking-widest text-[#F9A826] uppercase leading-none mt-1">
              Surabaya
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-medium transition-all duration-300 ${
                activeSection === link.id
                  ? "text-[#1A4FB5] border-b-2 border-secondary pb-1"
                  : "text-gray-600 hover:text-[#1A4FB5]"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="/api/wa?source=navbar_desktop&text=Halo%20Admin%20Juragan%20Rental%2C%0A%0ASaya%20tertarik%20untuk%20Booking%20Kendaraan%20dengan%20rincian%20berikut%3A%0A%0A%20Nama%20%20%20%20%20%20%20%20%20%20%20%3A%20%0A%20Tgl%20Berangkat%20%20%3A%20%0A%20Tgl%20Kembali%20%20%20%20%3A%20%0A%20Armada%20%20%20%20%20%20%20%20%20%3A%20%0A%20Jenis%20Layanan%20%20%3A%20%0A%0AMohon%20informasi%20ketersediaan%20unit%20dan%20estimasi%20biayanya%20ya.%20Terima%20kasih!"
            target="_blank"
            aria-label="Pesan Sekarang via WhatsApp"
            className="bg-gradient-to-r from-primary to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 active:scale-95 hover:-translate-y-0.5"
          >
            Pesan Sekarang
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden flex items-center p-2 text-[#1A4FB5]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <span className="material-symbols-outlined text-3xl">
            {isOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Menu Dropdown View */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 flex flex-col p-6 gap-4 z-10 animate-fade-in-down">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              onClick={() => setIsOpen(false)}
              href={link.href}
              className={`font-medium text-lg border-b pb-2 transition-all ${
                activeSection === link.id
                  ? "text-[#1A4FB5] font-bold border-secondary"
                  : "text-gray-600 hover:text-[#1A4FB5]"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="/api/wa?source=navbar_mobile&text=Halo%20Admin%20Juragan%20Rental%2C%0A%0ASaya%20tertarik%20untuk%20Booking%20Kendaraan%20dengan%20rincian%20berikut%3A%0A%0A%20Nama%20%20%20%20%20%20%20%20%20%20%20%3A%20%0A%20Tgl%20Berangkat%20%20%3A%20%0A%20Tgl%20Kembali%20%20%20%20%3A%20%0A%20Armada%20%20%20%20%20%20%20%20%20%3A%20%0A%20Jenis%20Layanan%20%20%3A%20%0A%0AMohon%20informasi%20ketersediaan%20unit%20dan%20estimasi%20biayanya%20ya.%20Terima%20kasih!"
            target="_blank"
            aria-label="Pesan Sekarang via WhatsApp"
            className="bg-gradient-to-r from-primary to-blue-500 text-center text-white w-full py-4 mt-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 active:scale-95 transition-transform"
          >
            Pesan Sekarang
          </a>
        </div>
      )}
    </nav>
  );
}
