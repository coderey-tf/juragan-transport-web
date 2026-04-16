export default function FloatingWhatsApp() {
  return (
    <a
      aria-label="Chat via WhatsApp"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center focus:ring-4 focus:ring-[#25D366]/50 focus:outline-none group"
      href="/api/wa?source=floating_button&text=Halo%20Admin%20Juragan%20Rental%2C%0A%0ASaya%20tertarik%20untuk%20Booking%20Kendaraan%20dengan%20rincian%20berikut%3A%0A%0A%20Nama%20%20%20%20%20%20%20%20%20%20%20%3A%20%0A%20Tgl%20Berangkat%20%20%3A%20%0A%20Tgl%20Kembali%20%20%20%20%3A%20%0A%20Armada%20%20%20%20%20%20%20%20%20%3A%20%0A%20Jenis%20Layanan%20%20%3A%20%0A%0AMohon%20informasi%20ketersediaan%20unit%20dan%20estimasi%20biayanya%20ya.%20Terima%20kasih!"
      target="_blank"
    >
      <span
        className="material-symbols-outlined text-3xl md:text-4xl"
        data-weight="fill"
      >
        chat
      </span>
      <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full animate-pulse border-2 border-white"></div>
      {/* Tooltip on Desktop */}
      <span className="hidden md:block absolute right-full mr-4 bg-white text-black text-sm font-bold py-2 px-4 rounded-xl shadow-lg opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap">
        Hubungi Kami!
      </span>
    </a>
  );
}
