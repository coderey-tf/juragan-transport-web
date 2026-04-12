import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/gallery — list all gallery items (with category name)
export async function GET() {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { sortOrder: "asc" },
      include: { category: { select: { id: true, name: true, slug: true } } },
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error("GET /api/gallery error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data galeri" },
      { status: 500 }
    );
  }
}

// POST /api/gallery — create a new gallery item
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { src, alt, caption, title, categoryId, featured } = body;

    if (!src || !alt || !categoryId) {
      return NextResponse.json(
        { error: "src, alt, dan categoryId wajib diisi" },
        { status: 400 }
      );
    }

    // Determine next sortOrder
    const maxSort = await prisma.galleryItem.aggregate({
      _max: { sortOrder: true },
    });

    const item = await prisma.galleryItem.create({
      data: {
        src,
        alt,
        caption: caption || null,
        title: title || null,
        categoryId,
        featured: featured || false,
        sortOrder: (maxSort._max.sortOrder ?? -1) + 1,
      },
      include: { category: { select: { id: true, name: true, slug: true } } },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("POST /api/gallery error:", error);
    return NextResponse.json(
      { error: "Gagal menambah foto galeri" },
      { status: 500 }
    );
  }
}
