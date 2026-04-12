import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type RouteContext = { params: Promise<{ id: string }> };

// PUT /api/testimonials/[id]
export async function PUT(req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  try {
    const body = await req.json();
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.role !== undefined && { role: body.role }),
        ...(body.content !== undefined && { content: body.content }),
        ...(body.initials !== undefined && { initials: body.initials }),
        ...(body.rating !== undefined && { rating: body.rating }),
        ...(body.featured !== undefined && { featured: body.featured }),
        ...(body.sortOrder !== undefined && { sortOrder: body.sortOrder }),
      },
    });
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("PUT /api/testimonials/[id] error:", error);
    return NextResponse.json(
      { error: "Gagal mengupdate testimoni" },
      { status: 500 }
    );
  }
}

// DELETE /api/testimonials/[id]
export async function DELETE(_req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  try {
    await prisma.testimonial.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/testimonials/[id] error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus testimoni" },
      { status: 500 }
    );
  }
}
