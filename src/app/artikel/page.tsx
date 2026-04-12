import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ArtikelPage() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    include: {
      category: { select: { name: true } },
    },
  });

  if (articles.length === 0) {
    return (
      <main className="flex flex-col min-h-screen">
        <Navbar />
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-br from-primary via-[#1A4FB5] to-[#0e3a8c] overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-white mb-4">
              Artikel &amp; Blog
            </h1>
          </div>
        </section>
        <section className="py-20 bg-surface text-center">
          <p className="text-on-surface-variant text-lg">Belum ada artikel.</p>
        </section>
        <Footer />
      </main>
    );
  }

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />

      {/* Page Header */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-br from-primary via-[#1A4FB5] to-[#0e3a8c] overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
          <nav className="flex items-center justify-center gap-2 text-white/60 text-sm mb-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <span className="material-symbols-outlined text-base">
              chevron_right
            </span>
            <span className="text-white">Artikel</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline text-white mb-4 drop-shadow-lg">
            Artikel &amp; Blog
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-base md:text-lg">
            Tips perjalanan, panduan wisata, dan informasi terbaru seputar
            layanan rental mobil profesional di Surabaya.
          </p>
        </div>
      </section>

      {/* Articles Content */}
      <section className="py-12 md:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Featured Article */}
          <Link
            href={`/artikel/${featured.slug}`}
            className="group block mb-12 md:mb-16"
          >
            <article className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[400px]">
                  <Image
                    src={featured.cover}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-secondary text-black font-extrabold text-xs px-4 py-2 rounded-full shadow-md uppercase tracking-wider">
                      Terbaru
                    </span>
                  </div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-primary/10 text-primary font-bold text-xs px-3 py-1.5 rounded-full">
                      {featured.category.name}
                    </span>
                    <span className="text-on-surface-variant text-sm">
                      {featured.readTime} baca
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold font-headline text-on-surface mb-4 group-hover:text-primary transition-colors leading-tight">
                    {featured.title}
                  </h2>
                  <p className="text-on-surface-variant leading-relaxed mb-6">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-lg">
                        person
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-on-surface">
                        {featured.author}
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        {featured.publishedAt
                          ? new Date(featured.publishedAt).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Link>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {rest.map((article) => (
              <Link
                key={article.slug}
                href={`/artikel/${article.slug}`}
                className="group"
              >
                <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col border border-gray-100">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={article.cover}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm text-primary font-bold text-xs px-3 py-1.5 rounded-full shadow-sm">
                        {article.category.name}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-3">
                      <span className="material-symbols-outlined text-sm">
                        calendar_today
                      </span>
                      {article.publishedAt
                        ? new Date(article.publishedAt).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : ""}
                      <span className="mx-1">·</span>
                      <span className="material-symbols-outlined text-sm">
                        schedule
                      </span>
                      {article.readTime}
                    </div>
                    <h3 className="text-lg font-bold font-headline text-on-surface mb-3 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-3 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-5 text-primary font-bold text-sm">
                      Baca Selengkapnya
                      <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
