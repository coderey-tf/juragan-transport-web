import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/categories — list all categories (optionally filter by type)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // "article" | "gallery"

    const categories = await prisma.category.findMany({
      where: type ? { type } : {},
      orderBy: { name: "asc" },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("GET /api/categories error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil kategori" },
      { status: 500 }
    );
  }
}
