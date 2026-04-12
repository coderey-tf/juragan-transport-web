import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type RouteContext = { params: Promise<{ slug: string }> };

// GET /api/articles/[slug]
export async function GET(_req: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  try {
    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        tags: { include: { tag: true } },
      },
    });
    if (!article) {
      return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json(article);
  } catch (error) {
    console.error("GET /api/articles/[slug] error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT /api/articles/[slug] — update an article
export async function PUT(req: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  try {
    const body = await req.json();
    const {
      title,
      slug: newSlug,
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

    // If tagIds provided, delete existing and re-create
    if (tagIds !== undefined) {
      const existingArticle = await prisma.article.findUnique({
        where: { slug },
        select: { id: true },
      });
      if (existingArticle) {
        await prisma.articleTag.deleteMany({
          where: { articleId: existingArticle.id },
        });
      }
    }

    const article = await prisma.article.update({
      where: { slug },
      data: {
        ...(title !== undefined && { title }),
        ...(newSlug !== undefined && { slug: newSlug }),
        ...(excerpt !== undefined && { excerpt }),
        ...(content !== undefined && { content }),
        ...(cover !== undefined && { cover }),
        ...(author !== undefined && { author }),
        ...(readTime !== undefined && { readTime }),
        ...(published !== undefined && { published }),
        ...(publishedAt !== undefined && {
          publishedAt: new Date(publishedAt),
        }),
        ...(categoryId !== undefined && { categoryId }),
        ...(metaTitle !== undefined && { metaTitle }),
        ...(metaDescription !== undefined && { metaDescription }),
        ...(metaKeywords !== undefined && { metaKeywords }),
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

    return NextResponse.json(article);
  } catch (error) {
    console.error("PUT /api/articles/[slug] error:", error);
    return NextResponse.json(
      { error: "Gagal mengupdate artikel" },
      { status: 500 }
    );
  }
}

// DELETE /api/articles/[slug]
export async function DELETE(_req: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  try {
    await prisma.article.delete({ where: { slug } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/articles/[slug] error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus artikel" },
      { status: 500 }
    );
  }
}
