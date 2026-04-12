"use client";

import { useCMS } from "@/context/CMSContext";
import ArticleForm from "@/components/ArticleForm";
import type { ArticleFormData } from "@/components/ArticleForm";

export default function BuatArtikelPage() {
  const { addArticle, articleCategories } = useCMS();

  const handleSubmit = async (data: ArticleFormData) => {
    await addArticle(data as unknown as Record<string, unknown>);
  };

  if (articleCategories.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="material-symbols-outlined animate-spin text-4xl text-primary">
          progress_activity
        </span>
      </div>
    );
  }

  return (
    <ArticleForm
      categories={articleCategories}
      onSubmit={handleSubmit}
    />
  );
}
