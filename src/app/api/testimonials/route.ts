import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/testimonials
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("GET /api/testimonials error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil testimoni" },
      { status: 500 }
    );
  }
}

// POST /api/testimonials
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, role, content, initials, rating, featured } = body;

    if (!name || !role || !content || !initials) {
      return NextResponse.json(
        { error: "name, role, content, dan initials wajib diisi" },
        { status: 400 }
      );
    }

    const maxSort = await prisma.testimonial.aggregate({
      _max: { sortOrder: true },
    });

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        role,
        content,
        initials,
        rating: rating ?? 5,
        featured: featured ?? false,
        sortOrder: (maxSort._max.sortOrder ?? -1) + 1,
      },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("POST /api/testimonials error:", error);
    return NextResponse.json(
      { error: "Gagal menambah testimoni" },
      { status: 500 }
    );
  }
}
