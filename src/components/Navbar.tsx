"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const path = usePathname();
  console.log("path", path);
  console.log("activeSection", activeSection);

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
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/logo.png"
            alt="Juragan Rental Surabaya"
            width={40}
            height={40}
            className="w-10 h-10 object-contain group-active:scale-95 transition-transform"
          />
          <span className="text-xl md:text-2xl font-bold tracking-tight text-[#1A4FB5] font-headline hidden sm:block">
            Juragan Rental
          </span>
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
            href="https://wa.me/6281234567890"
            className="bg-primary hover:bg-[#154091] text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 active:scale-95"
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
            href="https://wa.me/6281234567890"
            className="bg-primary text-center text-white w-full py-4 mt-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform"
          >
            Pesan Sekarang
          </a>
        </div>
      )}
    </nav>
  );
}
