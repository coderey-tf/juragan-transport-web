import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Categories ───────────────────────────────────────
  const catTips = await prisma.category.upsert({
    where: { slug: "tips-trik" },
    update: {},
    create: {
      name: "Tips & Trik",
      slug: "tips-trik",
      type: "article",
      description: "Tips dan trik seputar rental mobil dan perjalanan.",
      metaTitle: "Tips & Trik Rental Mobil | Juragan Rental Surabaya",
      metaDescription:
        "Kumpulan tips dan trik seputar sewa mobil, perjalanan, dan wisata di Surabaya dan Jawa Timur.",
    },
  });

  const catWisata = await prisma.category.upsert({
    where: { slug: "wisata" },
    update: {},
    create: {
      name: "Wisata",
      slug: "wisata",
      type: "article",
      description: "Destinasi wisata terbaik di Jawa Timur.",
      metaTitle: "Destinasi Wisata Jawa Timur | Juragan Rental Surabaya",
      metaDescription:
        "Jelajahi destinasi wisata terbaik di Jawa Timur dengan layanan rental mobil profesional.",
    },
  });

  const catInfo = await prisma.category.upsert({
    where: { slug: "informasi" },
    update: {},
    create: {
      name: "Informasi",
      slug: "informasi",
      type: "article",
      description: "Informasi seputar layanan rental mobil.",
    },
  });

  const catPanduan = await prisma.category.upsert({
    where: { slug: "panduan" },
    update: {},
    create: {
      name: "Panduan",
      slug: "panduan",
      type: "article",
      description: "Panduan lengkap penggunaan layanan rental.",
    },
  });

  const catTim = await prisma.category.upsert({
    where: { slug: "tim" },
    update: {},
    create: { name: "Tim", slug: "tim", type: "gallery" },
  });

  const catLayanan = await prisma.category.upsert({
    where: { slug: "layanan" },
    update: {},
    create: { name: "Layanan", slug: "layanan", type: "gallery" },
  });

  const catArmada = await prisma.category.upsert({
    where: { slug: "armada" },
    update: {},
    create: { name: "Armada", slug: "armada", type: "gallery" },
  });

  const catEvents = await prisma.category.upsert({
    where: { slug: "events" },
    update: {},
    create: { name: "Events", slug: "events", type: "gallery" },
  });

  console.log("  ✅ Categories seeded");

  // ─── Tags ─────────────────────────────────────────────
  const tags = [
    { name: "Rental Mobil", slug: "rental-mobil" },
    { name: "Surabaya", slug: "surabaya" },
    { name: "Wisata Jatim", slug: "wisata-jatim" },
    { name: "Bromo", slug: "bromo" },
    { name: "Airport Transfer", slug: "airport-transfer" },
  ];

  for (const t of tags) {
    await prisma.tag.upsert({
      where: { slug: t.slug },
      update: {},
      create: t,
    });
  }

  console.log("  ✅ Tags seeded");

  // ─── Articles ─────────────────────────────────────────
  const articles = [
    {
      title: "5 Tips Sewa Mobil untuk Wisata Bromo",
      slug: "tips-sewa-mobil-bromo",
      excerpt:
        "Panduan lengkap menyewa mobil untuk perjalanan ke Gunung Bromo agar perjalanan lancar dan nyaman.",
      content:
        "Bromo merupakan salah satu destinasi wisata paling populer di Jawa Timur. Berikut tips yang perlu Anda perhatikan...",
      cover: "https://res.cloudinary.com/djc1d25py/image/upload/v1714000000/bromo.jpg",
      author: "Admin Juragan",
      readTime: "5 menit",
      published: true,
      publishedAt: new Date("2026-04-15"),
      categoryId: catTips.id,
    },
    {
      title: "Wisata Surabaya: 7 Tempat Wajib Dikunjungi",
      slug: "wisata-surabaya-7-tempat",
      excerpt:
        "Jelajahi destinasi wisata terbaik di Surabaya mulai dari sejarah hingga kuliner.",
      content:
        "Surabaya, kota pahlawan, menawarkan berbagai destinasi menarik. Berikut 7 tempat wajib dikunjungi...",
      cover: "https://res.cloudinary.com/djc1d25py/image/upload/v1714000000/surabaya.jpg",
      author: "Admin Juragan",
      readTime: "6 menit",
      published: true,
      publishedAt: new Date("2026-04-10"),
      categoryId: catWisata.id,
    },
    {
      title: "Cara Booking Mobil Online dengan Mudah",
      slug: "cara-booking-mobil-online",
      excerpt:
        "Tutorial langkah demi langkah cara memesan mobil rental secara online melalui WhatsApp.",
      content:
        "Memesan mobil rental kini semakin mudah. Anda bisa booking hanya melalui WhatsApp...",
      cover: "https://res.cloudinary.com/djc1d25py/image/upload/v1714000000/booking.jpg",
      author: "Admin Juragan",
      readTime: "3 menit",
      published: true,
      publishedAt: new Date("2026-04-08"),
      categoryId: catInfo.id,
    },
    {
      title: "Panduan Perjalanan Surabaya–Bromo dalam Sehari",
      slug: "panduan-surabaya-bromo-sehari",
      excerpt:
        "Rencana perjalanan lengkap dari Surabaya ke Bromo dan kembali dalam satu hari.",
      content:
        "Perjalanan dari Surabaya ke Bromo bisa ditempuh dalam 3-4 jam dengan mobil. Berikut panduan lengkapnya...",
      cover: "https://res.cloudinary.com/djc1d25py/image/upload/v1714000000/bromo-trip.jpg",
      author: "Admin Juragan",
      readTime: "7 menit",
      published: true,
      publishedAt: new Date("2026-04-05"),
      categoryId: catPanduan.id,
    },
  ];

  for (const a of articles) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: {},
      create: a,
    });
  }

  console.log("  ✅ Articles seeded");

  // ─── Fleets ───────────────────────────────────────────
  const fleets = [
    { name: "Toyota Avanza", slug: "toyota-avanza", badge: "Terlaris!", image: "https://res.cloudinary.com/djc1d25py/image/upload/v1714000000/avanza.jpg", sortOrder: 0, seats: 7, transmission: "Automatic", active: true },
    { name: "Toyota Innova Reborn", slug: "toyota-innova-reborn", badge: "Premium", image: "https://res.cloudinary.com/djc1d25py/image/upload/v1714000000/innova.jpg", sortOrder: 1, seats: 7, transmission: "Automatic", active: true },
    { name: "Toyota HiAce", slug: "toyota-hiace", badge: "Big Capacity", image: "https://res.cloudinary.com/djc1d25py/image/upload/v1714000000/hiace.jpg", sortOrder: 2, seats: 16, transmission: "Manual", active: true },
    { name: "Toyota Fortuner", slug: "toyota-fortuner", badge: "VIP", image: "https://res.cloudinary.com/djc1d25py/image/upload/v1714000000/fortuner.jpg", sortOrder: 3, seats: 7, transmission: "Automatic", active: true },
    { name: "Toyota Alphard", slug: "toyota-alphard", badge: "Luxury", image: "https://res.cloudinary.com/djc1d25py/image/upload/v1714000000/alphard.jpg", sortOrder: 4, seats: 7, transmission: "Automatic", active: true },
    { name: "Honda Brio", slug: "honda-brio", badge: null, image: "https://res.cloudinary.com/djc1d25py/image/upload/v1714000000/brio.jpg", sortOrder: 5, seats: 5, transmission: "Automatic", active: true },
    { name: "Toyota Rush", slug: "toyota-rush", badge: null, image: "https://res.cloudinary.com/djc1d25py/image/upload/v1714000000/rush.jpg", sortOrder: 6, seats: 7, transmission: "Automatic", active: true },
    { name: "Daihatsu Xenia", slug: "daihatsu-xenia", badge: "Hemat", image: "https://res.cloudinary.com/djc1d25py/image/upload/v1714000000/xenia.jpg", sortOrder: 7, seats: 7, transmission: "Manual", active: true },
    { name: "Toyota Calya", slug: "toyota-calya", badge: null, image: "https://res.cloudinary.com/djc1d25py/image/upload/v1714000000/calya.jpg", sortOrder: 8, seats: 7, transmission: "Manual", active: true },
  ];

  for (const f of fleets) {
    await prisma.fleet.upsert({
      where: { slug: f.slug },
      update: {},
      create: f,
    });
  }

  console.log("  ✅ Fleets seeded");

  // ─── Testimonials ─────────────────────────────────────
  const testimonials = [
    { name: "Bambang Pamungkas", role: "Direktur Bisnis", initials: "BP", content: "Drivernya sangat sopan dan hafal jalan pintas di Surabaya. Mobilnya bersih sekali, perjalanan bisnis saya jadi sangat lancar. Sangat direkomendasikan!", rating: 5, featured: true },
    { name: "Rina Larasati", role: "Ibu Rumah Tangga", initials: "RL", content: "Sewa mobil untuk wisata keluarga ke Bromo. Pelayanan mantap, driver ramah dan sabar nungguin kita foto-foto. Harga sangat worth it!", rating: 5, featured: true },
    { name: "Andi Wijaya", role: "General Manager", initials: "AW", content: "Langganan tetap kalau ada tamu kantor dari Jakarta. Airport transfernya selalu on-time. Tidak pernah mengecewakan selama 2 tahun ini.", rating: 5, featured: true },
  ];

  for (let i = 0; i < testimonials.length; i++) {
    const t = testimonials[i];
    await prisma.testimonial.upsert({
      where: { id: `testimonial-${i}` },
      update: {},
      create: {
        id: `testimonial-${i}`,
        name: t.name,
        role: t.role,
        initials: t.initials,
        content: t.content,
        rating: t.rating,
        featured: t.featured,
        sortOrder: i,
      },
    });
  }

  console.log("  ✅ Testimonials seeded");

  // ─── Site Settings ────────────────────────────────────
  const settings = [
    { key: "site_name", value: "Juragan Rental Surabaya" },
    { key: "site_tagline", value: "Sewa Mobil & Driver Premium" },
    { key: "whatsapp_number", value: "6282132213259" },
    { key: "phone_number", value: "+62 812-3456-7890" },
    { key: "email", value: "halo@juragantransport.com" },
    { key: "address", value: "Jl. Raya Surabaya No. 123, Jawa Timur, Indonesia" },
    { key: "instagram_url", value: "#" },
    { key: "facebook_url", value: "#" },
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { key: s.key, value: s.value },
    });
  }

  console.log("  ✅ Site settings seeded");

  console.log("\n🎉 Database seeded successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("SEED ERROR:");
    console.error(e);
    if ((e as any).cause) console.error("CAUSE:", (e as any).cause);
    await prisma.$disconnect();
    process.exit(1);
  });
