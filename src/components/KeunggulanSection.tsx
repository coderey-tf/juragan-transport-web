import Image from "next/image";

export default function KeunggulanSection() {
  return (
    <section
      id="tentang"
      className="relative bg-gradient-to-br from-primary via-blue-900 to-[#0a1930] py-20 lg:py-28 text-white overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full  pointer-events-none">
        <Image
          alt="Tim Juragan Rental Surabaya"
          className="object-cover object-center mix-blend-overlay opacity-20"
          src="/images/team-juragan.jpeg"
          fill
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-4 md:space-y-6 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline leading-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Mengapa Memilih Juragan Rental Surabaya?
          </h2>
          <p className="text-base md:text-lg text-blue-100/80 leading-relaxed font-medium">
            Kami tidak hanya menyewakan mobil, kami memberikan pengalaman
            perjalanan yang berkualitas, aman, dan tanpa beban. Fokus pada
            relaksasi, sisanya biar kami yang urus.
          </p>
          <div className="h-1.5 w-24 bg-gradient-to-r from-secondary to-[#F9A826] mx-auto lg:mx-0 rounded-full shadow-[0_0_15px_rgba(245,197,24,0.5)]"></div>
        </div>
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 ">
          <div
            className="group bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl p-5 lg:p-6 xl:p-8 rounded-[2rem] border border-white/10 border-t-white/20 transform sm:translate-y-4 lg:translate-y-6 transition-all duration-500 hover:-translate-y-2 hover:bg-white/15 hover:shadow-2xl hover:shadow-black/20 hover:border-white/30 outline-none focus:ring focus:ring-secondary"
            tabIndex={0}
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-secondary/20 to-transparent border border-secondary/20 flex items-center justify-center mb-4 lg:mb-5 shadow-inner group-hover:scale-110 group-hover:bg-secondary/30 transition-all duration-300">
              <span className="material-symbols-outlined text-2xl md:text-3xl text-secondary drop-shadow-md">
                verified_user
              </span>
            </div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold font-headline mb-2 md:mb-3 text-white group-hover:text-blue-100 transition-colors">
              Driver Profesional
            </h3>
            <p className="text-blue-100/80 text-xs md:text-sm lg:text-base leading-relaxed">
              Tim driver kami terlatih secara berkala, ramah, dan
              memprioritaskan keselamatan penumpang di jalan.
            </p>
          </div>
          <div
            className="group bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl p-5 lg:p-6 xl:p-8 rounded-[2rem] border border-white/10 border-t-white/20 transition-all duration-500 hover:-translate-y-2 hover:bg-white/15 hover:shadow-2xl hover:shadow-black/20 hover:border-white/30 outline-none focus:ring focus:ring-secondary"
            tabIndex={0}
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-secondary/20 to-transparent border border-secondary/20 flex items-center justify-center mb-4 lg:mb-5 shadow-inner group-hover:scale-110 group-hover:bg-secondary/30 transition-all duration-300">
              <span className="material-symbols-outlined text-2xl md:text-3xl text-secondary drop-shadow-md">
                car_repair
              </span>
            </div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold font-headline mb-2 md:mb-3 text-white group-hover:text-blue-100 transition-colors">
              Armada Premium
            </h3>
            <p className="text-blue-100/80 text-xs md:text-sm lg:text-base leading-relaxed">
              Kendaraan terawat selalu steril bebas debu dan bau, untuk
              kenyamanan maskimal di perjalanan dinas Anda.
            </p>
          </div>
          <div
            className="group bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl p-5 lg:p-6 xl:p-8 rounded-[2rem] border border-white/10 border-t-white/20 transform sm:translate-y-4 lg:translate-y-6 transition-all duration-500 hover:-translate-y-2 hover:bg-white/15 hover:shadow-2xl hover:shadow-black/20 hover:border-white/30 outline-none focus:ring focus:ring-secondary"
            tabIndex={0}
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-secondary/20 to-transparent border border-secondary/20 flex items-center justify-center mb-4 lg:mb-5 shadow-inner group-hover:scale-110 group-hover:bg-secondary/30 transition-all duration-300">
              <span className="material-symbols-outlined text-2xl md:text-3xl text-secondary drop-shadow-md">
                payments
              </span>
            </div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold font-headline mb-2 md:mb-3 text-white group-hover:text-blue-100 transition-colors">
              Harga Jujur
            </h3>
            <p className="text-blue-100/80 text-xs md:text-sm lg:text-base leading-relaxed">
              Sistem transparan tanpa embel-embel biaya *hidden fee* atau tip
              tersembunyi. Tertulis rapi di awal.
            </p>
          </div>
          <div
            className="group bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl p-5 lg:p-6 xl:p-8 rounded-[2rem] border border-white/10 border-t-white/20 transition-all duration-500 hover:-translate-y-2 hover:bg-white/15 hover:shadow-2xl hover:shadow-black/20 hover:border-white/30 outline-none focus:ring focus:ring-secondary"
            tabIndex={0}
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-secondary/20 to-transparent border border-secondary/20 flex items-center justify-center mb-4 lg:mb-5 shadow-inner group-hover:scale-110 group-hover:bg-secondary/30 transition-all duration-300">
              <span className="material-symbols-outlined text-2xl md:text-3xl text-secondary drop-shadow-md">
                support_agent
              </span>
            </div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold font-headline mb-2 md:mb-3 text-white group-hover:text-blue-100 transition-colors">
              Layanan 24/7
            </h3>
            <p className="text-blue-100/80 text-xs md:text-sm lg:text-base leading-relaxed">
              Urusan mendadak tengah malam? Tim admin responsif menjawab sapaan
              Anda kapan pun via chat WA.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
