import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/fleets
export async function GET() {
  try {
    const fleets = await prisma.fleet.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(fleets);
  } catch (error) {
    console.error("GET /api/fleets error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data armada" },
      { status: 500 }
    );
  }
}

// POST /api/fleets
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      slug,
      badge,
      image,
      flip,
      imageClass,
      seats,
      transmission,
      description,
    } = body;

    if (!name || !slug || !image) {
      return NextResponse.json(
        { error: "name, slug, dan image wajib diisi" },
        { status: 400 }
      );
    }

    const maxSort = await prisma.fleet.aggregate({
      _max: { sortOrder: true },
    });

    const fleet = await prisma.fleet.create({
      data: {
        name,
        slug,
        badge: badge || null,
        image,
        flip: flip || false,
        imageClass: imageClass || "",
        sortOrder: (maxSort._max.sortOrder ?? -1) + 1,
        seats: seats || null,
        transmission: transmission || null,
        description: description || null,
        active: true,
      },
    });

    return NextResponse.json(fleet, { status: 201 });
  } catch (error) {
    console.error("POST /api/fleets error:", error);
    return NextResponse.json(
      { error: "Gagal menambah armada" },
      { status: 500 }
    );
  }
}
