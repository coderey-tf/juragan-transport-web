import Image from "next/image";
import prisma from "@/lib/prisma";

export default async function ArmadaSection() {
  const fleets = await prisma.fleet.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <section className="py-16 md:py-24 bg-surface-container-low" id="armada">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-6 text-center md:text-left">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-4">
              Armada Populer
            </h2>
            <p className="text-on-surface-variant max-w-xl md:text-lg">
              Katalog unit idaman klien eksklusif untuk pendamping jadwal
              padatmu setiap hari.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {fleets.map((car) => (
            <article
              key={car.slug}
              className="group relative bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-row items-center p-4 min-h-[140px] cursor-pointer overflow-hidden"
            >
              {car.badge && (
                <div className="absolute top-0 left-0 bg-secondary text-black font-extrabold px-3 py-1.5 text-[11px] md:text-xs z-20 shadow-sm">
                  {car.badge}
                </div>
              )}
              <div className="w-1/2 pr-2 md:pr-4 flex items-center h-full z-10 relative">
                <h3 className="text-[17px] md:text-xl font-bold tracking-tight text-black leading-tight">
                  {car.name}
                </h3>
              </div>
              <div className="w-1/2 relative h-24 md:h-32 shrink-0 flex items-center justify-center z-0">
                <div
                  className={`relative w-full h-full drop-shadow-sm transition-transform duration-500 ${car.flip ? "-scale-x-100" : ""}`}
                >
                  <Image
                    alt={car.name}
                    src={car.image}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className={`object-contain p-2 group-hover:scale-110 transition-transform duration-500 ${car.imageClass || ""}`}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
