export default function Footer() {
  return (
    <footer
      id="kontak"
      className="bg-surface-container-low pt-16 md:pt-20 pb-8 mt-auto"
      role="contentinfo"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="col-span-1 lg:col-span-1">
          <h2 className="text-2xl font-bold text-[#1A4FB5] mb-4 md:mb-6 font-headline">
            Juragan Rental Surabaya
          </h2>
          <p className="text-on-surface-variant mb-6 md:mb-8 leading-relaxed">
            Penyedia jasa sewa mobil dan driver premium di Surabaya terpercaya.
            Kenyamanan Anda adalah rute utama kami.
          </p>
          {/* <div className="flex gap-4">
            <a
              aria-label="Instagram"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm hover:shadow-md hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1"
              href="#"
            >
              <span className="material-symbols-outlined">
                social_leaderboard
              </span>
            </a>
            <a
              aria-label="Facebook"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm hover:shadow-md hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1"
              href="#"
            >
              <span className="material-symbols-outlined">photo_camera</span>
            </a>
          </div> */}
        </div>
        <div>
          <h3 className="text-lg font-bold font-headline text-primary mb-4 md:mb-6">
            Cari Tahu
          </h3>
          <ul className="space-y-3 font-medium">
            <li>
              <a
                className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2"
                href="#"
              >
                <span className="material-symbols-outlined text-lg">
                  chevron_right
                </span>{" "}
                Beranda
              </a>
            </li>
            <li>
              <a
                className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2"
                href="#armada"
              >
                <span className="material-symbols-outlined text-lg">
                  chevron_right
                </span>{" "}
                Armada Populer
              </a>
            </li>
            <li>
              <a
                className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2"
                href="#layanan"
              >
                <span className="material-symbols-outlined text-lg">
                  chevron_right
                </span>{" "}
                Layanan Kami
              </a>
            </li>
            <li>
              <a
                className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2"
                href="#"
              >
                <span className="material-symbols-outlined text-lg">
                  chevron_right
                </span>{" "}
                Tentang Kami
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold font-headline text-primary mb-4 md:mb-6">
            Titik Kami
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-3 text-gray-600 font-medium items-start">
              <a
                href="https://www.google.com/maps/place/Agen+Sewa+mobil+juragan+rent+car+nusantara/@-7.349288,112.804681,17z/data=!3m1!4b1!4m6!3m5!1s0x2dd7e50036793ff9:0x38c01f6fa48b409f!8m2!3d-7.349288!4d112.804681!16s%2Fg%2F11ysxn972p!5m1!1e1!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDQxMi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center gap-4"
              >
                <span className="material-symbols-outlined text-primary mt-0.5">
                  location_on
                </span>
                <span>
                  Gg. Ikan Hiu I, Kp. Baru, Tambakoso,
                  <br />
                  Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256
                </span>
              </a>
            </li>
            <li className="flex gap-3 text-gray-600 font-medium items-center">
              <span className="material-symbols-outlined text-primary">
                phone
              </span>
              +62 821-3221-3259
            </li>
            <li className="flex gap-3 text-gray-600 font-medium items-center">
              <span className="material-symbols-outlined text-primary">
                mail
              </span>
              halo@juraganrentalsurabaya.com
            </li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold font-headline text-primary mb-4">
            Jam Layanan
          </h3>
          <p className="text-gray-700 font-bold mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">
              schedule
            </span>{" "}
            Setiap Hari: 24 Jam
          </p>
          <div className="bg-secondary/10 p-4 rounded-xl border border-secondary/20">
            <p className="text-xs md:text-sm text-on-surface italic font-medium leading-relaxed">
              Admin sigap melayani Anda kapanpun Anda butuh tumpangan di area
              Surabaya.
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 md:mt-20 pt-8 border-t border-outline-variant text-center md:flex md:justify-between md:items-center">
        <p className="text-gray-500 text-sm font-medium mb-4 md:mb-0">
          © {new Date().getFullYear()} Juragan Rental Surabaya. Hak Cipta
          Dilindungi.
        </p>
        <div className="flex justify-center gap-6 text-sm font-medium text-gray-500">
          <a href="#" className="hover:text-primary transition-colors">
            Syarat &amp; Kebijakan
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Privasi
          </a>
        </div>
      </div>
    </footer>
  );
}
