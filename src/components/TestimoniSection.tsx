import prisma from "@/lib/prisma";

export default async function TestimoniSection() {
  const testimonials = await prisma.testimonial.findMany({
    where: { featured: true },
    orderBy: { sortOrder: "asc" },
    take: 3,
  });

  if (testimonials.length === 0) return null;

  return (
    <section
      id="testimoni"
      className="py-16 md:py-24 bg-white overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2
            id="testimonials-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline text-primary mb-4"
          >
            Ulasan Pelanggan
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto md:text-lg">
            Apa kata mereka yang telah merasakan layanan premium dari Juragan
            Rental Surabaya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={t.id}
              className={`bg-surface p-8 rounded-4xl shadow-sm border border-surface-container-high relative hover:-translate-y-1 transition-transform ${
                idx === testimonials.length - 1 && testimonials.length === 3
                  ? "sm:col-span-2 md:col-span-1 lg:col-span-1"
                  : ""
              }`}
            >
              <span
                aria-hidden="true"
                className="material-symbols-outlined text-5xl md:text-6xl text-primary/10 absolute top-6 right-6"
              >
                format_quote
              </span>
              <div className="flex gap-1 text-secondary mb-6">
                {Array.from({ length: t.rating }, (_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined"
                    data-weight="fill"
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-on-surface italic mb-8 leading-relaxed">
                &quot;{t.content}&quot;
              </p>
              <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
                <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center font-bold text-primary text-xl shadow-inner">
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold font-headline text-lg text-primary">
                    {t.name}
                  </p>
                  <p className="text-sm text-on-surface-variant">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
