"use client";

import { use } from "react";
import { useCMS } from "@/context/CMSContext";
import ArticleForm from "@/components/ArticleForm";
import type { ArticleFormData } from "@/components/ArticleForm";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function EditArtikelPage({ params }: Props) {
  const { slug } = use(params);
  const { getArticle, updateArticle, articleCategories } = useCMS();

  const article = getArticle(slug);

  if (articleCategories.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="material-symbols-outlined animate-spin text-4xl text-primary">
          progress_activity
        </span>
      </div>
    );
  }

  if (!article) {
    notFound();
  }

  const handleSubmit = async (data: ArticleFormData) => {
    await updateArticle(slug, data as unknown as Record<string, unknown>);
  };

  // Map DB article to form shape
  const initialData = {
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    content: article.content,
    cover: article.cover,
    author: article.author,
    readTime: article.readTime,
    published: article.published,
    publishedAt: article.publishedAt
      ? new Date(article.publishedAt).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    categoryId: article.categoryId,
    metaTitle: article.metaTitle || "",
    metaDescription: article.metaDescription || "",
    metaKeywords: article.metaKeywords || "",
  };

  return (
    <ArticleForm
      initialData={initialData}
      categories={articleCategories}
      onSubmit={handleSubmit}
      isEdit={true}
    />
  );
}
