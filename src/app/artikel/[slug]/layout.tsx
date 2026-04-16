import { Metadata } from "next";
import { ARTICLES } from "@/data/articles";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
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
