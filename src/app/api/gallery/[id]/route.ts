import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type RouteContext = { params: Promise<{ id: string }> };

// GET /api/gallery/[id]
export async function GET(_req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  try {
    const item = await prisma.galleryItem.findUnique({
      where: { id },
      include: { category: { select: { id: true, name: true, slug: true } } },
    });
    if (!item) {
      return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    console.error("GET /api/gallery/[id] error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT /api/gallery/[id] — update a gallery item
export async function PUT(req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  try {
    const body = await req.json();
    const { src, alt, caption, title, categoryId, featured, sortOrder } = body;

    const item = await prisma.galleryItem.update({
      where: { id },
      data: {
        ...(src !== undefined && { src }),
        ...(alt !== undefined && { alt }),
        ...(caption !== undefined && { caption }),
        ...(title !== undefined && { title }),
        ...(categoryId !== undefined && { categoryId }),
        ...(featured !== undefined && { featured }),
        ...(sortOrder !== undefined && { sortOrder }),
      },
      include: { category: { select: { id: true, name: true, slug: true } } },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("PUT /api/gallery/[id] error:", error);
    return NextResponse.json(
      { error: "Gagal mengupdate foto" },
      { status: 500 }
    );
  }
}

// DELETE /api/gallery/[id]
export async function DELETE(_req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  try {
    await prisma.galleryItem.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/gallery/[id] error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus foto" },
      { status: 500 }
    );
  }
}
