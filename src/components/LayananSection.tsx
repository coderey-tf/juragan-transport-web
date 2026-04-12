import Image from "next/image";

export default function LayananSection() {
  return (
    <section className="py-16 md:py-24 overflow-hidden bg-white" id="layanan">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline text-primary mb-4">
            Layanan Utama Kami
          </h2>
          <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full"></div>
          <p className="mt-6 text-on-surface-variant max-w-2xl mx-auto md:text-lg">
            Solusi transportasi menyeluruh yang disesuaikan dengan kebutuhan
            mobilitas Anda, dari dalam kota hingga penjelajahan antar pulau.
          </p>
        </div>

        <div className="space-y-20 md:space-y-24">
          {/*  Service 1  */}
          <article className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-full h-full border-4 border-secondary/20 rounded-3xl z-0 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-xl aspect-[4/3] w-full">
                <Image
                  alt="Transportasi Dalam Kota Surabaya"
                  src="/images/with-driver2.jpeg"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 text-primary rounded-full font-bold text-xs md:text-sm uppercase tracking-widest">
                <span className="material-symbols-outlined text-lg">
                  location_city
                </span>
                Efisiensi Mobilitas
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-headline text-on-surface">
                Transportasi Dalam Kota
              </h3>
              <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
                Navigasi jalanan Surabaya dengan tenang bersama driver handal
                kami yang sangat menguasai rute tercepat dan ternyaman. Cocok
                untuk meeting bisnis maupun belanja keluarga.
              </p>
              <ul className="space-y-3 pt-2">
                <li className="flex items-center gap-3 font-medium text-on-surface border-b pb-2">
                  <span className="material-symbols-outlined text-primary shadow-sm bg-primary/5 rounded-full p-1">
                    check_circle
                  </span>{" "}
                  Driver standby sesuai jadwal
                </li>
                <li className="flex items-center gap-3 font-medium text-on-surface border-b pb-2">
                  <span className="material-symbols-outlined text-primary shadow-sm bg-primary/5 rounded-full p-1">
                    check_circle
                  </span>{" "}
                  Unit bersih &amp; terawat prima
                </li>
              </ul>
            </div>
          </article>

          {/*  Service 2  */}
          <article className="flex flex-col lg:flex-row-reverse items-center gap-8 md:gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-full h-full border-4 border-secondary/20 rounded-3xl z-0 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2"></div>
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-xl aspect-[4/3] w-full">
                <Image
                  alt="Perjalanan Ke Luar Kota"
                  src="/images/mobil-banyak.jpeg"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 text-primary rounded-full font-bold text-xs md:text-sm uppercase tracking-widest">
                <span className="material-symbols-outlined text-lg">
                  distance
                </span>
                Antar Kota Terpercaya
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-headline text-on-surface">
                Perjalanan Luar Kota
              </h3>
              <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
                Butuh perjalanan keluar kota seperti Malang, Semarang, atau
                Bali? Nikmati perjalanan jarak jauh tanpa lelah. Driver kami
                berpengalaman menempuh rute antar kota dengan aman.
              </p>
              <ul className="space-y-3 pt-2">
                <li className="flex items-center gap-3 font-medium text-on-surface border-b pb-2">
                  <span className="material-symbols-outlined text-primary shadow-sm bg-primary/5 rounded-full p-1">
                    check_circle
                  </span>{" "}
                  Pilihan drop-off atau paket harian
                </li>
                <li className="flex items-center gap-3 font-medium text-on-surface border-b pb-2">
                  <span className="material-symbols-outlined text-primary shadow-sm bg-primary/5 rounded-full p-1">
                    check_circle
                  </span>{" "}
                  Termasuk BBM &amp; Driver fee
                </li>
              </ul>
            </div>
          </article>

          {/*  Service 3  */}
          <article className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-full h-full border-4 border-secondary/20 rounded-3xl z-0 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-xl aspect-[4/3] w-full">
                <Image
                  alt="Paket Wisata Keluarga"
                  src="/images/pengantin.jpeg"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 text-primary rounded-full font-bold text-xs md:text-sm uppercase tracking-widest">
                <span className="material-symbols-outlined text-lg">
                  travel_explore
                </span>
                Paket Wisata Eksklusif
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-headline text-on-surface">
                Wisata &amp; Liburan
              </h3>
              <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
                Ciptakan momen tak terlupakan bersama keluarga di destinasi
                wisata terbaik Jawa Timur. Kami menyediakan paket khusus untuk
                Bromo, Batu, dan kawah Ijen.
              </p>
              <button className="text-primary font-bold flex items-center gap-2 group mt-4 hover:bg-primary/5 px-4 py-3 rounded-xl transition-colors">
                Lihat Katalog Wisata{" "}
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  arrow_right_alt
                </span>
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
