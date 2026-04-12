import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type RouteContext = { params: Promise<{ slug: string }> };

// PUT /api/fleets/[slug]
export async function PUT(req: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  try {
    const body = await req.json();
    const fleet = await prisma.fleet.update({
      where: { slug },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.slug !== undefined && { slug: body.slug }),
        ...(body.badge !== undefined && { badge: body.badge }),
        ...(body.image !== undefined && { image: body.image }),
        ...(body.flip !== undefined && { flip: body.flip }),
        ...(body.imageClass !== undefined && { imageClass: body.imageClass }),
        ...(body.seats !== undefined && { seats: body.seats }),
        ...(body.transmission !== undefined && {
          transmission: body.transmission,
        }),
        ...(body.description !== undefined && {
          description: body.description,
        }),
        ...(body.active !== undefined && { active: body.active }),
        ...(body.sortOrder !== undefined && { sortOrder: body.sortOrder }),
      },
    });
    return NextResponse.json(fleet);
  } catch (error) {
    console.error("PUT /api/fleets/[slug] error:", error);
    return NextResponse.json(
      { error: "Gagal mengupdate armada" },
      { status: 500 }
    );
  }
}

// DELETE /api/fleets/[slug]
export async function DELETE(_req: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  try {
    await prisma.fleet.delete({ where: { slug } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/fleets/[slug] error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus armada" },
      { status: 500 }
    );
  }
}
