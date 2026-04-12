export default function StatsBar() {
  return (
    <section className="bg-surface py-12 md:py-16 relative z-10 -mt-1">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <div className="flex flex-col items-center text-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <span className="text-4xl md:text-5xl font-extrabold font-headline text-primary">
            500+
          </span>
          <p className="text-on-surface-variant font-medium mt-2">
            Pelanggan Puas
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <span className="text-4xl md:text-5xl font-extrabold font-headline text-primary">
            20+
          </span>
          <p className="text-on-surface-variant font-medium mt-2">
            Unit Armada
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <span className="text-4xl md:text-5xl font-extrabold font-headline text-primary">
            100%
          </span>
          <p className="text-on-surface-variant font-medium mt-2">
            Sopir Profesional
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <span className="text-4xl md:text-5xl font-extrabold font-headline text-primary">
            24 Jam
          </span>
          <p className="text-on-surface-variant font-medium mt-2">
            Layanan Siap
          </p>
        </div>
      </div>
    </section>
  );
}
