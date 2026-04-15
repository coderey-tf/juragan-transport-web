//seed.ts
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const url = new URL(process.env.DATABASE_URL!);
const adapt = {
  host: url.hostname,
  port: Number(url.port || 3306),
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  database: url.pathname.replace(/^\//, ""),
  connectionLimit: 5,
  connectTimeout: 5_000,
  acquireTimeout: 10_000,
  idleTimeout: 300,
};
const adapter = new PrismaMariaDb({
  host: url.hostname,
  port: Number(url.port || 3306),
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  database: url.pathname.replace(/^\//, ""),
  connectionLimit: 5,
  connectTimeout: 5_000,
  acquireTimeout: 10_000,
  idleTimeout: 300,
});
console.log("ADAPTER", adapter);
console.log("URL", url);
console.log("Ada", adapt);

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

  const catEvent = await prisma.category.upsert({
    where: { slug: "event" },
    update: {},
    create: { name: "Event", slug: "event", type: "gallery" },
  });

  console.log("  ✅ Categories seeded");

  // ─── Tags ─────────────────────────────────────────────
  const tagSurabaya = await prisma.tag.upsert({
    where: { slug: "surabaya" },
    update: {},
    create: { name: "Surabaya", slug: "surabaya" },
  });
  const tagRentalMobil = await prisma.tag.upsert({
    where: { slug: "rental-mobil" },
    update: {},
    create: { name: "Rental Mobil", slug: "rental-mobil" },
  });
  const tagJawaTimur = await prisma.tag.upsert({
    where: { slug: "jawa-timur" },
    update: {},
    create: { name: "Jawa Timur", slug: "jawa-timur" },
  });
  const tagDriver = await prisma.tag.upsert({
    where: { slug: "driver-profesional" },
    update: {},
    create: { name: "Driver Profesional", slug: "driver-profesional" },
  });
  const tagAirport = await prisma.tag.upsert({
    where: { slug: "airport-transfer" },
    update: {},
    create: { name: "Airport Transfer", slug: "airport-transfer" },
  });

  console.log("  ✅ Tags seeded");

  // ─── Articles ─────────────────────────────────────────
  await prisma.article.upsert({
    where: { slug: "tips-sewa-mobil-surabaya" },
    update: {},
    create: {
      title: "7 Tips Sewa Mobil di Surabaya Agar Perjalanan Aman & Nyaman",
      slug: "tips-sewa-mobil-surabaya",
      excerpt:
        "Menyewa mobil di Surabaya bisa jadi pengalaman yang menyenangkan jika Anda tahu cara memilih layanan yang tepat. Berikut tips lengkapnya.",
      content: `## Mengapa Sewa Mobil di Surabaya?\n\nSurabaya sebagai kota metropolitan terbesar kedua di Indonesia memiliki mobilitas tinggi. Baik untuk keperluan bisnis maupun wisata, menyewa mobil dengan driver profesional adalah pilihan cerdas.\n\n### 1. Pilih Penyedia Terpercaya\n\nPastikan Anda memilih rental mobil yang sudah memiliki reputasi baik. Cek ulasan pelanggan di Google atau media sosial.\n\n### 2. Periksa Kondisi Armada\n\nSebelum berangkat, pastikan kendaraan dalam kondisi prima.\n\n### 3. Konfirmasi Rute dan Jadwal\n\nKomunikasikan rute perjalanan Anda dengan jelas kepada driver.\n\n### 4. Pahami Sistem Pembayaran\n\nPastikan Anda memahami struktur biaya termasuk BBM, tol, dan parkir.\n\n### 5. Siapkan Dokumen Perjalanan\n\nUntuk perjalanan luar kota, pastikan membawa identitas diri.\n\n### 6. Manfaatkan Layanan 24/7\n\nJangan ragu menghubungi admin kapan saja.\n\n### 7. Booking Jauh Hari\n\nUntuk mendapatkan unit terbaik, disarankan melakukan pemesanan minimal 1-2 hari sebelum keberangkatan.`,
      cover: "/images/mobil-banyak.jpeg",
      author: "Admin Juragan",
      readTime: "5 menit",
      published: true,
      publishedAt: new Date("2026-04-08"),
      categoryId: catTips.id,
      metaTitle:
        "7 Tips Sewa Mobil Surabaya - Panduan Lengkap | Juragan Rental",
      metaDescription:
        "Pelajari 7 tips penting sewa mobil di Surabaya agar perjalanan Anda aman dan nyaman. Panduan lengkap dari Juragan Rental Surabaya.",
      metaKeywords:
        "tips sewa mobil surabaya, rental mobil surabaya, panduan sewa mobil",
      tags: {
        create: [{ tagId: tagSurabaya.id }, { tagId: tagRentalMobil.id }],
      },
    },
  });

  await prisma.article.upsert({
    where: { slug: "destinasi-wisata-jawa-timur" },
    update: {},
    create: {
      title: "5 Destinasi Wisata Terbaik di Jawa Timur yang Wajib Dikunjungi",
      slug: "destinasi-wisata-jawa-timur",
      excerpt:
        "Jawa Timur menyimpan pesona alam yang luar biasa. Dari Gunung Bromo hingga Kawah Ijen, berikut destinasi yang bisa Anda jelajahi.",
      content: `## Jelajahi Keindahan Jawa Timur\n\nJawa Timur adalah surganya wisata alam dan budaya di Indonesia.\n\n### 1. Gunung Bromo\n\nSunrise di Gunung Bromo adalah pengalaman yang tak terlupakan.\n\n### 2. Kawah Ijen\n\nFenomena blue fire yang hanya ada di dua tempat di dunia.\n\n### 3. Kota Batu & Jatim Park\n\nCocok untuk wisata keluarga!\n\n### 4. Pantai Papuma, Jember\n\nPantai eksotis dengan formasi batu karang yang menakjubkan.\n\n### 5. Air Terjun Madakaripura\n\nAir terjun tertinggi di Pulau Jawa.`,
      cover: "/images/pengantin.jpeg",
      author: "Admin Juragan",
      readTime: "7 menit",
      published: true,
      publishedAt: new Date("2026-04-05"),
      categoryId: catWisata.id,
      metaTitle:
        "5 Destinasi Wisata Jawa Timur Terbaik | Juragan Rental Surabaya",
      metaDescription:
        "Temukan 5 destinasi wisata terbaik di Jawa Timur. Dari Gunung Bromo hingga Kawah Ijen, jelajahi dengan layanan sewa mobil terpercaya.",
      metaKeywords:
        "wisata jawa timur, bromo, kawah ijen, batu malang, rental wisata",
      tags: {
        create: [{ tagId: tagJawaTimur.id }, { tagId: tagSurabaya.id }],
      },
    },
  });

  await prisma.article.upsert({
    where: { slug: "keuntungan-sewa-mobil-dengan-driver" },
    update: {},
    create: {
      title: "Keuntungan Sewa Mobil dengan Driver vs Self-Drive di Surabaya",
      slug: "keuntungan-sewa-mobil-dengan-driver",
      excerpt:
        "Bingung memilih antara sewa mobil dengan driver atau menyetir sendiri? Simak perbandingan lengkapnya.",
      content: `## Sewa dengan Driver atau Self-Drive?\n\nKetika merencanakan perjalanan di Surabaya, salah satu pertimbangan penting adalah apakah Anda akan menyetir sendiri atau menggunakan jasa driver.\n\n### Keuntungan Sewa dengan Driver\n\n**1. Bebas Stres di Jalan**\nAnda tidak perlu pusing dengan navigasi dan kemacetan.\n\n**2. Lebih Aman**\nDriver kami terlatih untuk berkendara secara aman dan defensif.\n\n**3. Fleksibilitas Tinggi**\nPerlu berhenti mendadak atau mengubah rute? Tidak masalah!\n\n### Kesimpulan\n\nUntuk mayoritas kebutuhan bisnis dan wisata, sewa mobil dengan driver adalah pilihan terbaik.`,
      cover: "/images/with-driver2.jpeg",
      author: "Admin Juragan",
      readTime: "4 menit",
      published: true,
      publishedAt: new Date("2026-04-01"),
      categoryId: catInfo.id,
      metaKeywords:
        "sewa mobil driver surabaya, keuntungan rental dengan driver",
      tags: {
        create: [{ tagId: tagDriver.id }, { tagId: tagRentalMobil.id }],
      },
    },
  });

  await prisma.article.upsert({
    where: { slug: "panduan-airport-transfer-surabaya" },
    update: {},
    create: {
      title: "Panduan Lengkap Airport Transfer Bandara Juanda Surabaya",
      slug: "panduan-airport-transfer-surabaya",
      excerpt:
        "Tak perlu repot mencari transportasi dari bandara. Ini panduan airport transfer yang nyaman dan terpercaya.",
      content: `## Airport Transfer Bandara Juanda\n\nBandara Internasional Juanda adalah pintu gerbang utama menuju Surabaya dan Jawa Timur.\n\n### Mengapa Memilih Airport Transfer?\n\n**Kepastian Harga**: Harga tetap yang sudah disepakati di awal.\n\n**Driver Menunggu di Terminal**: Driver kami akan standby di area kedatangan.\n\n### Area Layanan\n\n- Surabaya Pusat — 30-45 menit\n- Surabaya Barat/Timur — 40-60 menit\n- Sidoarjo — 15-25 menit\n- Malang — 2-3 jam\n\n### Cara Booking\n\n1. Hubungi admin kami via WhatsApp\n2. Informasikan nomor penerbangan dan jam kedatangan\n3. Tentukan tujuan drop-off\n4. Konfirmasi pembayaran`,
      cover: "/images/with-driver3.jpeg",
      author: "Admin Juragan",
      readTime: "4 menit",
      published: true,
      publishedAt: new Date("2026-03-28"),
      categoryId: catPanduan.id,
      metaTitle: "Airport Transfer Bandara Juanda Surabaya | Juragan Rental",
      metaDescription:
        "Layanan airport transfer profesional dari Bandara Juanda ke seluruh area Surabaya dan sekitarnya. Harga pasti, driver standby.",
      metaKeywords:
        "airport transfer surabaya, bandara juanda, antar jemput bandara",
      tags: {
        create: [{ tagId: tagAirport.id }, { tagId: tagSurabaya.id }],
      },
    },
  });

  console.log("  ✅ Articles seeded");

  // ─── Gallery Items ────────────────────────────────────
  const galleryData = [
    {
      src: "/images/team-juragan.jpeg",
      alt: "Tim Juragan Rental Surabaya",
      catId: catTim.id,
      title: "Foto Bersama Tim Juragan Rental Surabaya",
    },
    {
      src: "/images/team-juragan2.jpeg",
      alt: "Kebersamaan Tim Juragan",
      catId: catTim.id,
      title: "Momen Kebersamaan Tim Juragan Rental",
    },
    {
      src: "/images/with-driver.jpeg",
      alt: "Layanan Dengan Driver Premium",
      catId: catLayanan.id,
      title: "Driver Premium Siap Melayani",
    },
    {
      src: "/images/with-driver2.jpeg",
      alt: "Driver Profesional Juragan Rental",
      catId: catLayanan.id,
      title: "Driver Profesional Juragan Rental Surabaya",
    },
    {
      src: "/images/with-driver3.jpeg",
      alt: "Antar Jemput Pelanggan VIP",
      catId: catLayanan.id,
      title: "Layanan VIP Antar Jemput",
    },
    {
      src: "/images/with-driver4.jpeg",
      alt: "Perjalanan Bisnis Eksekutif",
      catId: catLayanan.id,
      title: "Layanan Bisnis Eksekutif",
    },
    {
      src: "/images/with-driver5.jpeg",
      alt: "Driver Ramah dan Berpengalaman",
      catId: catLayanan.id,
      title: "Driver Ramah dan Berpengalaman",
    },
    {
      src: "/images/with-driver6.jpeg",
      alt: "Pelayanan Prima Juragan Rental",
      catId: catLayanan.id,
      title: "Pelayanan Prima untuk Pelanggan",
    },
    {
      src: "/images/mobil-banyak.jpeg",
      alt: "Koleksi Armada Juragan Rental",
      catId: catArmada.id,
      title: "Koleksi Unit Armada Kami",
      featured: true,
    },
    {
      src: "/images/mobil-banyak2.jpeg",
      alt: "Deretan Unit Siap Pakai",
      catId: catArmada.id,
      title: "Armada Siap Pakai Kapan Saja",
    },
    {
      src: "/images/pengantin.jpeg",
      alt: "Layanan Mobil Pengantin",
      catId: catEvent.id,
      title: "Mobil Pengantin Mewah Juragan Rental",
      featured: true,
    },
    {
      src: "/images/with-coach-nova.jpeg",
      alt: "Kerjasama dengan Coach Nova",
      catId: catEvent.id,
      title: "Kerjasama Event dengan Coach Nova",
    },
    {
      src: "/images/juragan1.jpeg",
      alt: "Kantor Juragan Rental Surabaya",
      catId: catTim.id,
      title: "Kantor Pusat Juragan Rental di Surabaya",
    },
  ];

  for (let i = 0; i < galleryData.length; i++) {
    const g = galleryData[i];
    await prisma.galleryItem.upsert({
      where: { id: `gallery-${i}` },
      update: {},
      create: {
        id: `gallery-${i}`,
        src: g.src,
        alt: g.alt,
        title: g.title,
        categoryId: g.catId,
        sortOrder: i,
        featured: (g as { featured?: boolean }).featured || false,
      },
    });
  }

  console.log("  ✅ Gallery items seeded");

  // ─── Fleets ───────────────────────────────────────────
  const fleets = [
    {
      name: "Toyota Avanza",
      slug: "toyota-avanza",
      badge: "Terjangkau!",
      image: "/images/mobil/avanza.png",
      flip: true,
      imageClass: "scale-110 translate-x-2 -translate-y-1 object-bottom",
      seats: 7,
      transmission: "Manual",
    },
    {
      name: "Toyota Innova Reborn",
      slug: "toyota-innova-reborn",
      badge: "Recommended",
      image: "/images/mobil/innova.png",
      flip: true,
      imageClass: "scale-125 translate-x-2 translate-y-4 object-bottom",
      seats: 8,
      transmission: "Automatic",
    },
    {
      name: "Daihatsu Xenia",
      slug: "daihatsu-xenia",
      badge: null,
      image: "/images/mobil/xenia.webp",
      seats: 7,
      transmission: "Manual",
    },
    {
      name: "Hiace Commuter",
      slug: "hiace-commuter",
      badge: "Terlaris!",
      image: "/images/mobil/hiace-commuter.png",
      seats: 16,
      transmission: "Manual",
    },
    {
      name: "Hiace Premio",
      slug: "hiace-premio",
      badge: null,
      image: "/images/mobil/hiace-premio.png",
      seats: 16,
      transmission: "Manual",
    },
    {
      name: "Hiace Premio Luxury",
      slug: "hiace-premio-luxury",
      badge: null,
      image: "/images/mobil/hiace-premio-lucury.png",
      seats: 12,
      transmission: "Automatic",
    },
    {
      name: "Mitsubishi Pajero",
      slug: "mitsubishi-pajero",
      badge: null,
      image: "/images/mobil/pajero.webp",
      seats: 7,
      transmission: "Automatic",
    },
    {
      name: "Toyota Fortuner",
      slug: "toyota-fortuner",
      badge: "Premium",
      image: "/images/mobil/fortuner.png",
      seats: 7,
      transmission: "Automatic",
    },
    {
      name: "Toyota Alphard",
      slug: "toyota-alphard",
      badge: "Wedding Car",
      image: "/images/mobil/alphard.png",
      seats: 7,
      transmission: "Automatic",
    },
  ];

  for (let i = 0; i < fleets.length; i++) {
    const f = fleets[i];
    await prisma.fleet.upsert({
      where: { slug: f.slug },
      update: {},
      create: {
        name: f.name,
        slug: f.slug,
        badge: f.badge,
        image: f.image,
        flip: f.flip || false,
        imageClass: f.imageClass || "",
        sortOrder: i,
        seats: f.seats,
        transmission: f.transmission,
        active: true,
      },
    });
  }

  console.log("  ✅ Fleets seeded");

  // ─── Testimonials ─────────────────────────────────────
  const testimonials = [
    {
      name: "Bambang Pamungkas",
      role: "Direktur Bisnis",
      initials: "BP",
      content:
        "Drivernya sangat sopan dan hafal jalan pintas di Surabaya. Mobilnya bersih sekali, perjalanan bisnis saya jadi sangat lancar. Sangat direkomendasikan!",
      rating: 5,
      featured: true,
    },
    {
      name: "Rina Larasati",
      role: "Ibu Rumah Tangga",
      initials: "RL",
      content:
        "Sewa mobil untuk wisata keluarga ke Bromo. Pelayanan mantap, driver ramah dan sabar nungguin kita foto-foto. Harga sangat worth it!",
      rating: 5,
      featured: true,
    },
    {
      name: "Andi Wijaya",
      role: "General Manager",
      initials: "AW",
      content:
        "Langganan tetap kalau ada tamu kantor dari Jakarta. Airport transfernya selalu on-time. Tidak pernah mengecewakan selama 2 tahun ini.",
      rating: 5,
      featured: true,
    },
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
    {
      key: "address",
      value: "Jl. Raya Surabaya No. 123, Jawa Timur, Indonesia",
    },
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
    if (e.cause) console.error("CAUSE:", e.cause);
    await prisma.$disconnect();
    process.exit(1);
  });
