import { Metadata } from "next";
import prisma from "@/lib/prisma";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const data = await prisma.article.findMany({
      where: {
        published: true,
      },
    });
    return data.map((article) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.warn("Skipping static params generation for articles due to database error:", error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug },
    include: {
      category: { select: { name: true } },
    },
  });
  if (!article) {
    return { title: "Artikel Tidak Ditemukan" };
  }
  return {
    title: `${article.title} | Juragan Rental Surabaya`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://juraganrentalsurabaya.com/artikel/${slug}`,
      images: [article.cover],
      type: "article",
    },
  };
}

export default async function ArtikelDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
