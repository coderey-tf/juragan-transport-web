"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CMSProvider } from "@/context/CMSContext";

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { name: "Galeri", href: "/dashboard/galeri", icon: "photo_library" },
  { name: "Artikel", href: "/dashboard/artikel", icon: "article" },
  { name: "Armada", href: "/dashboard/armada", icon: "directions_car" },
  { name: "Testimoni", href: "/dashboard/testimoni", icon: "reviews" },
];

function DashboardSidebar() {
  const path = usePathname();

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-[#0e1c36] text-white flex flex-col">
      {/* Brand */}
      <div className="p-6 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Juragan Rental"
            width={36}
            height={36}
            className="w-9 h-9 object-contain"
          />
          <div>
            <p className="font-bold font-headline text-sm leading-tight">
              Juragan Rental
            </p>
            <p className="text-[11px] text-white/50 font-medium">
              CMS Dashboard
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-3 px-3">
          Menu
        </p>
        {sidebarLinks.map((link) => {
          const isActive =
            path === link.href ||
            (link.href !== "/dashboard" && path.startsWith(link.href));
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined text-xl">
                {link.icon}
              </span>
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all"
        >
          <span className="material-symbols-outlined text-xl">
            arrow_back
          </span>
          Kembali ke Website
        </Link>
      </div>
    </aside>
  );
}

function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 md:px-8 py-4 flex items-center justify-between">
      <div>
        <p className="text-sm text-on-surface-variant">
          Selamat datang kembali 👋
        </p>
        <h1 className="text-lg font-bold font-headline text-on-surface">
          Admin Juragan Rental
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary">
            person
          </span>
        </div>
      </div>
    </header>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CMSProvider>
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar />
        <div className="flex-1 ml-64 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 md:p-8">{children}</main>
        </div>
      </div>
    </CMSProvider>
  );
}
