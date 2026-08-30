import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as fs from "fs";
import * as path from "path";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("📥 Importing data from MariaDB export...");

  // Load exported data
  const exportPath = path.join(__dirname, "../data-import.json");
  if (!fs.existsSync(exportPath)) {
    console.log("⚠️  No data-import.json found, running default seed...");
    return;
  }

  const raw = JSON.parse(fs.readFileSync(exportPath, "utf-8"));

  // Helper to clean relations from nested data
  function cleanDates(obj: any) {
    const cleaned: any = {};
    for (const [k, v] of Object.entries(obj)) {
      if (k === "category" || k === "tags" || k === "tag" || k === "coverImage" || k === "mediaImage") continue;
      if (v !== null && v !== undefined) {
        // Handle dates
        if (typeof v === "string" && v.match(/^\d{4}-\d{2}-\d{2}T/)) {
          cleaned[k] = new Date(v);
        } else {
          cleaned[k] = v;
        }
      } else {
        cleaned[k] = v;
      }
    }
    return cleaned;
  }

  // 1. Categories
  console.log(`  📂 Categories: ${raw.categories?.length || 0} rows...`);
  for (const c of (raw.categories || [])) {
    const data = cleanDates(c);
    await prisma.category.upsert({
      where: { id: data.id },
      update: {},
      create: data,
    });
  }

  // 2. Tags
  console.log(`  🏷️  Tags: ${raw.tags?.length || 0} rows...`);
  for (const t of (raw.tags || [])) {
    const data = cleanDates(t);
    await prisma.tag.upsert({
      where: { id: data.id },
      update: {},
      create: data,
    });
  }

  // 3. Articles (without relations)
  console.log(`  📝 Articles: ${raw.articles?.length || 0} rows...`);
  for (const a of (raw.articles || [])) {
    const data = cleanDates(a);
    // Remove coverImageId if MediaImage doesn't exist
    if (data.coverImageId && !data.coverImageId.trim()) delete data.coverImageId;

    await prisma.article.upsert({
      where: { id: data.id },
      update: {},
      create: data,
    });
  }

  // 4. ArticleTags
  console.log(`  🔗 ArticleTags: ${raw.articleTags?.length || 0} rows...`);
  for (const at of (raw.articleTags || [])) {
    try {
      await prisma.articleTag.upsert({
        where: { articleId_tagId: { articleId: at.articleId, tagId: at.tagId } },
        update: {},
        create: { articleId: at.articleId, tagId: at.tagId },
      });
    } catch (e) {
      console.log(`    ⚠️  Skipping ArticleTag ${at.articleId}/${at.tagId}: ${e}`);
    }
  }

  // 5. GalleryItems
  console.log(`  🖼️  GalleryItems: ${raw.galleryItems?.length || 0} rows...`);
  for (const g of (raw.galleryItems || [])) {
    const data = cleanDates(g);
    if (!data.imageId || !data.imageId.trim()) delete data.imageId;
    await prisma.galleryItem.upsert({
      where: { id: data.id },
      update: {},
      create: data,
    });
  }

  // 6. Fleets
  console.log(`  🚗 Fleets: ${raw.fleets?.length || 0} rows...`);
  for (const f of (raw.fleets || [])) {
    const data = cleanDates(f);
    if (!data.imageId || !data.imageId.trim()) delete data.imageId;
    await prisma.fleet.upsert({
      where: { id: data.id },
      update: {},
      create: data,
    });
  }

  // 7. Testimonials
  console.log(`  ⭐ Testimonials: ${raw.testimonials?.length || 0} rows...`);
  for (const t of (raw.testimonials || [])) {
    const data = cleanDates(t);
    await prisma.testimonial.upsert({
      where: { id: data.id },
      update: {},
      create: data,
    });
  }

  // 8. SiteSettings
  console.log(`  ⚙️  SiteSettings: ${raw.siteSettings?.length || 0} rows...`);
  for (const s of (raw.siteSettings || [])) {
    await prisma.siteSetting.upsert({
      where: { id: s.id },
      update: { value: s.value },
      create: { id: s.id, key: s.key, value: s.value, type: s.type || "text" },
    });
  }

  // 9. WaTrackers
  console.log(`  📱 WaTrackers: ${raw.waTrackers?.length || 0} rows...`);
  let waCount = 0;
  for (const w of (raw.waTrackers || [])) {
    const data = cleanDates(w);
    try {
      await prisma.waTracker.upsert({
        where: { id: data.id },
        update: {},
        create: data,
      });
      waCount++;
      if (waCount % 500 === 0) console.log(`    ... ${waCount}/${raw.waTrackers.length}`);
    } catch (e) {
      console.log(`    ⚠️  Skipping WaTracker ${data.id}: ${e}`);
    }
  }

  console.log("\n🎉 Data imported successfully!");
  console.log(`  Categories: ${raw.categories?.length || 0}`);
  console.log(`  Tags: ${raw.tags?.length || 0}`);
  console.log(`  Articles: ${raw.articles?.length || 0}`);
  console.log(`  GalleryItems: ${raw.galleryItems?.length || 0}`);
  console.log(`  Fleets: ${raw.fleets?.length || 0}`);
  console.log(`  Testimonials: ${raw.testimonials?.length || 0}`);
  console.log(`  SiteSettings: ${raw.siteSettings?.length || 0}`);
  console.log(`  WaTrackers: ${waCount}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("IMPORT ERROR:");
    console.error(e);
    if ((e as any).cause) console.error("CAUSE:", (e as any).cause);
    await prisma.$disconnect();
    process.exit(1);
  });
