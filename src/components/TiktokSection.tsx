"use client";

import { useEffect, useState } from "react";

export default function TiktokSection() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Inject the TikTok official embed script safely
    if (!document.getElementById("tiktok-embed-script")) {
      const script = document.createElement("script");
      script.id = "tiktok-embed-script";
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section
      id="kontak"
      className="relative py-20 lg:py-28 bg-gradient-to-b from-white via-blue-50/40 to-[#f4f7fc] overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-[100px] opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[80px] pointer-events-none"></div>

      <div className="relative z-10 px-4 md:px-8 mx-auto w-full max-w-7xl flex flex-col items-center justify-center">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <div className="inline-block px-5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-primary font-bold text-sm tracking-widest uppercase shadow-sm">
            TETAP TERHUBUNG
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-headline text-gray-900 tracking-tight">
            Temukan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
              Kami
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Kunjungi kantor kami untuk layanan langsung atau ikuti keseruan perjalanan kami melalui media sosial.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch justify-center">
          
          {/* TikTok Column */}
          <div className="w-full flex flex-col bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transform transition duration-500 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
            <div className="bg-gradient-to-r from-gray-900 to-black p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg
                  className="w-7 h-7 text-white drop-shadow-md"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 006.34 16c0 3.5 2.83 6.33 6.33 6.33A6.33 6.33 0 0019 16v-6.02a8.55 8.55 0 004.85 1.54v-3.46a4.8 4.8 0 01-4.26-1.37z" />
                </svg>
                <h3 className="text-white font-bold text-lg tracking-wide">
                  TikTok Official
                </h3>
              </div>
              <div className="flex space-x-1.5 opacity-50">
                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
              </div>
            </div>
            <div className="p-4 md:p-6 flex-grow flex items-center justify-center bg-gray-50/50 relative">
              {isClient ? (
                <div
                  className="w-full flex justify-center min-h-[400px]"
                  dangerouslySetInnerHTML={{
                    __html: `
                    <blockquote
                      class="tiktok-embed"
                      cite="https://www.tiktok.com/@juraganrentcarsurabaya"
                      data-unique-id="juraganrentcarsurabaya"
                      data-embed-type="creator"
                      style="max-width: 780px; min-width: 288px;"
                    >
                      <section>
                        <a target="_blank" href="https://www.tiktok.com/@juraganrentcarsurabaya?refer=creator_embed">@juraganrentcarsurabaya</a>
                      </section>
                    </blockquote>
                  `,
                  }}
                />
              ) : (
                <div className="h-[400px] w-full flex items-center justify-center text-gray-400 font-medium animate-pulse">
                  Memuat TikTok...
                </div>
              )}
            </div>
          </div>

          {/* Google Maps Column */}
          <div className="w-full flex flex-col bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transform transition duration-500 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
            <div className="bg-gradient-to-r from-primary to-blue-700 p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg
                  className="w-7 h-7 text-white drop-shadow-md"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <h3 className="text-white font-bold text-lg tracking-wide">
                  Lokasi Garasi
                </h3>
              </div>
              <div className="flex space-x-1.5 opacity-50">
                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
              </div>
            </div>
            <div className="flex-grow w-full h-[400px] lg:h-auto min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d349.7563227656891!2d112.80460306575263!3d-7.3492838429417615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e50036793ff9%3A0x38c01f6fa48b409f!2sAgen%20Sewa%20mobil%20juragan%20rent%20car%20nusantara!5e0!3m2!1sid!2sid!4v1775988493807!5m2!1sid!2sid"
                className="w-full h-full border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
