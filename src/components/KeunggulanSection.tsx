import Image from "next/image";

export default function KeunggulanSection() {
  return (
    <section
      id="tentang"
      className="relative bg-[#1A4FB5] py-16 md:py-24 text-white overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <Image
          alt="Tim Juragan Rental Surabaya"
          className="object-cover mix-blend-overlay opacity-20"
          src="/images/team-juragan.jpeg"
          fill
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-6 md:space-y-8 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline leading-tight">
            Mengapa Memilih Juragan Rental Surabaya?
          </h2>
          <p className="text-base md:text-lg text-white/80">
            Kami tidak hanya menyewakan mobil, kami memberikan pengalaman
            perjalanan yang berkualitas, aman, dan tanpa beban. Fokus pada
            relaksasi, sisanya biar kami yang urus.
          </p>
          <div className="h-1.5 w-24 bg-secondary mx-auto lg:mx-0 rounded-full"></div>
        </div>
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:-mr-10">
          <div
            className="bg-white/10 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/20 transform sm:translate-y-6 md:translate-y-12 transition-transform hover:-translate-y-2 hover:bg-white/15 outline-none focus:ring focus:ring-secondary"
            tabIndex={0}
          >
            <span className="material-symbols-outlined text-4xl md:text-5xl text-secondary mb-4 md:mb-6 block drop-shadow-md">
              verified_user
            </span>
            <h3 className="text-xl md:text-2xl font-bold font-headline mb-3 md:mb-4">
              Sopir Profesional
            </h3>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Tim driver kami terlatih secara berkala, ramah, dan
              memprioritaskan keselamatan penumpang di jalan.
            </p>
          </div>
          <div
            className="bg-white/10 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/20 transition-transform hover:-translate-y-2 hover:bg-white/15 outline-none focus:ring focus:ring-secondary"
            tabIndex={0}
          >
            <span className="material-symbols-outlined text-4xl md:text-5xl text-secondary mb-4 md:mb-6 block drop-shadow-md">
              car_repair
            </span>
            <h3 className="text-xl md:text-2xl font-bold font-headline mb-3 md:mb-4">
              Armada Premium
            </h3>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Kendaraan terawat selalu steril bebas debu dan bau, untuk
              kenyamanan maskimal di perjalanan dinas Anda.
            </p>
          </div>
          <div
            className="bg-white/10 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/20 transform sm:translate-y-6 md:translate-y-12 transition-transform hover:-translate-y-2 hover:bg-white/15 outline-none focus:ring focus:ring-secondary"
            tabIndex={0}
          >
            <span className="material-symbols-outlined text-4xl md:text-5xl text-secondary mb-4 md:mb-6 block drop-shadow-md">
              payments
            </span>
            <h3 className="text-xl md:text-2xl font-bold font-headline mb-3 md:mb-4">
              Harga Jujur
            </h3>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Sistem tagihan kami transparan tanpa embel-embel biaya *hidden
              fee* atau tip tersembunyi. Semua tertulis rapi di awal.
            </p>
          </div>
          <div
            className="bg-white/10 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/20 transition-transform hover:-translate-y-2 hover:bg-white/15 outline-none focus:ring focus:ring-secondary"
            tabIndex={0}
          >
            <span className="material-symbols-outlined text-4xl md:text-5xl text-secondary mb-4 md:mb-6 block drop-shadow-md">
              support_agent
            </span>
            <h3 className="text-xl md:text-2xl font-bold font-headline mb-3 md:mb-4">
              Layanan 24/7
            </h3>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Urusan mendadak tengah malam? Tim admin kami responsif menjawab
              sapaan Anda lewat chat WA.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
