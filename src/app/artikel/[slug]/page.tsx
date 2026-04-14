import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ArtikelDetailPage({ params }: Props) {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: { slug },
    include: {
      category: { select: { id: true, name: true } },
    },
  });

  if (!article) {
    notFound();
  }

  // Find related articles (same category, exclude current)
  const related = await prisma.article.findMany({
    where: {
      published: true,
      categoryId: article.categoryId,
      slug: { not: article.slug },
    },
    take: 2,
    orderBy: { publishedAt: "desc" },
    include: { category: { select: { name: true } } },
  });

  // Fallback: if no related in same category, just pick others
  const relatedArticles =
    related.length > 0
      ? related
      : await prisma.article.findMany({
          where: { published: true, slug: { not: article.slug } },
          take: 2,
          orderBy: { publishedAt: "desc" },
          include: { category: { select: { name: true } } },
        });

  // Simple markdown-like rendering for content
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={i} />;
      if (trimmed.startsWith("### "))
        return (
          <h3
            key={i}
            className="text-xl md:text-2xl font-bold font-headline text-on-surface mt-10 mb-4"
          >
            {trimmed.slice(4)}
          </h3>
        );
      if (trimmed.startsWith("## "))
        return (
          <h2
            key={i}
            className="text-2xl md:text-3xl font-bold font-headline text-primary mt-12 mb-5"
          >
            {trimmed.slice(3)}
          </h2>
        );
      if (trimmed.startsWith("---"))
        return <hr key={i} className="my-10 border-gray-200" />;
      if (trimmed.startsWith("- "))
        return (
          <li
            key={i}
            className="text-on-surface-variant leading-relaxed ml-4 list-disc"
          >
            {trimmed.slice(2)}
          </li>
        );
      if (trimmed.startsWith("**") && trimmed.endsWith("**"))
        return (
          <p key={i} className="font-bold text-on-surface mt-6 mb-2">
            {trimmed.slice(2, -2)}
          </p>
        );
      if (trimmed.startsWith("*") && trimmed.endsWith("*"))
        return (
          <p
            key={i}
            className="italic text-on-surface-variant mt-4 bg-primary/5 p-4 rounded-xl border-l-4 border-primary"
          >
            {trimmed.slice(1, -1)}
          </p>
        );
      return (
        <p
          key={i}
          className="text-on-surface-variant leading-relaxed text-base md:text-lg"
        >
          {trimmed}
        </p>
      );
    });
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />

      {/* Article Header */}
      <section className="relative pt-24 md:pt-28">
        <div className="relative w-full aspect-[21/9] md:aspect-[21/7] max-h-[480px]">
          <Image
            src={article.cover}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-secondary text-black font-extrabold text-xs px-4 py-2 rounded-full shadow-md">
                {article.category.name}
              </span>
              <span className="text-white/70 text-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">
                  schedule
                </span>
                {article.readTime} baca
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline text-white leading-tight drop-shadow-lg">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-10 md:py-16 bg-surface">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          {/* Author & Date */}
          <div className="flex items-center gap-4 pb-8 mb-8 border-b border-gray-200">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">
                person
              </span>
            </div>
            <div>
              <p className="font-bold text-on-surface">{article.author}</p>
              <p className="text-sm text-on-surface-variant">
                {article.publishedAt
                  ? new Date(article.publishedAt).toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : ""}
              </p>
            </div>
            <div className="ml-auto flex gap-2">
              <button
                className="p-2.5 rounded-xl bg-white border border-gray-200 hover:bg-primary hover:text-white hover:border-primary transition-all"
                aria-label="Bagikan"
              >
                <span className="material-symbols-outlined text-xl">share</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <article className="prose-custom space-y-1">
            {renderContent(article.content)}
          </article>

          {/* Share CTA */}
          <div className="mt-12 p-8 bg-primary/5 rounded-2xl border border-primary/10 text-center">
            <h3 className="text-xl font-bold font-headline text-primary mb-3">
              Tertarik dengan layanan kami?
            </h3>
            <p className="text-on-surface-variant mb-6 max-w-md mx-auto">
              Hubungi Juragan Rental Surabaya sekarang dan dapatkan penawaran
              terbaik untuk perjalanan Anda.
            </p>
            <a
              href="https://wa.me/6282132213259"
              target="_blank"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3.5 rounded-xl font-bold hover:brightness-110 shadow-lg transition-all"
            >
              <span className="material-symbols-outlined" data-weight="fill">
                chat
              </span>
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary mb-8">
              Artikel Terkait
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/artikel/${rel.slug}`}
                  className="group"
                >
                  <article className="bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col sm:flex-row border border-gray-100 h-full">
                    <div className="relative w-full sm:w-48 md:w-56 aspect-[16/10] sm:aspect-auto shrink-0">
                      <Image
                        src={rel.cover}
                        alt={rel.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 224px"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-5 md:p-6 flex flex-col justify-center flex-1">
                      <span className="text-xs text-on-surface-variant mb-2">
                        {rel.publishedAt
                          ? new Date(rel.publishedAt).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )
                          : ""}{" "}
                        · {rel.readTime}
                      </span>
                      <h3 className="text-lg font-bold font-headline text-on-surface group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {rel.title}
                      </h3>
                      <p className="text-sm text-on-surface-variant mt-2 line-clamp-2">
                        {rel.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/artikel"
                className="inline-flex items-center gap-2 text-primary font-bold hover:bg-primary/5 px-6 py-3 rounded-xl transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Kembali ke Semua Artikel
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
