import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/articles — list all articles with category & tags
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const published = searchParams.get("published");

    const where = published === "true" ? { published: true } : {};

    const articles = await prisma.article.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        tags: { include: { tag: true } },
      },
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error("GET /api/articles error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data artikel" },
      { status: 500 }
    );
  }
}

// POST /api/articles — create a new article
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      slug,
      excerpt,
      content,
      cover,
      author,
      readTime,
      published,
      publishedAt,
      categoryId,
      tagIds,
      metaTitle,
      metaDescription,
      metaKeywords,
    } = body;

    if (!title || !slug || !excerpt || !content || !cover || !categoryId) {
      return NextResponse.json(
        { error: "Field wajib belum diisi" },
        { status: 400 }
      );
    }

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        cover,
        author: author || "Admin Juragan",
        readTime: readTime || "5 menit",
        published: published ?? true,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
        categoryId,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        metaKeywords: metaKeywords || null,
        ...(tagIds && tagIds.length > 0
          ? {
              tags: {
                create: tagIds.map((tagId: string) => ({ tagId })),
              },
            }
          : {}),
      },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        tags: { include: { tag: true } },
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("POST /api/articles error:", error);
    return NextResponse.json(
      { error: "Gagal membuat artikel" },
      { status: 500 }
    );
  }
}
