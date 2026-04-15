export default function CTABanner() {
  return (
    <section className="px-4 md:px-8 mb-16 md:mb-24 relative group max-w-7xl mx-auto w-full">
      <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-primary to-[#25D366] rounded-4xl md:rounded-[3rem] opacity-20 blur-xl md:blur-2xl transition-opacity"></div>
      <div className="bg-primary/95 rounded-4xl md:rounded-[2.5rem] p-8 md:p-16 lg:p-20 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
          <span className="material-symbols-outlined text-[20rem] md:text-[30rem] absolute -top-20 -left-20 md:-top-40 md:-left-40">
            directions_car
          </span>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-headline text-white mb-4 md:mb-6 leading-tight drop-shadow-md">
            Siap Berangkat Sekarang?
          </h2>
          <p className="text-white/90 text-lg md:text-xl xl:text-2xl mb-8 md:mb-12 font-medium">
            Konsultasikan rute perjalanan Anda dan dapatkan penawaran harga
            terbaik. Admin kami siap membalas dalam kedipan mata.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
            <a
              href="#armada"
              aria-label="Lihat dan pesan armada kami"
              className="bg-gradient-to-r from-secondary to-[#F9A826] text-black px-6 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-lg md:text-xl inline-flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-[#F5C518]/20 hover:shadow-2xl hover:shadow-[#F5C518]/40"
            >
              <span className="material-symbols-outlined text-2xl" aria-hidden="true">
                calendar_month
              </span>
              Booking Online
            </a>
            <a
              href="https://wa.me/6282132213259?text=Halo%20Admin%20Juragan%20Rental%2C%0A%0ASaya%20tertarik%20untuk%20Booking%20Kendaraan%20dengan%20rincian%20berikut%3A%0A%0A%20Nama%20%20%20%20%20%20%20%20%20%20%20%3A%20%0A%20Tgl%20Berangkat%20%20%3A%20%0A%20Tgl%20Kembali%20%20%20%20%3A%20%0A%20Armada%20%20%20%20%20%20%20%20%20%3A%20%0A%20Jenis%20Layanan%20%20%3A%20%0A%0AMohon%20informasi%20ketersediaan%20unit%20dan%20estimasi%20biayanya%20ya.%20Terima%20kasih!"
              aria-label="Chat WhatsApp"
              target="_blank"
              className="bg-gradient-to-r from-[#25D366] to-[#1DA851] text-white px-6 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-lg md:text-xl inline-flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-[#25D366]/30 hover:shadow-2xl hover:shadow-[#25D366]/40"
            >
              <span
                className="material-symbols-outlined text-2xl md:text-3xl"
                data-weight="fill"
              >
                chat
              </span>
              Chat WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
