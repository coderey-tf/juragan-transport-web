"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

/* ───────────── Types ───────────── */

// DB-backed GalleryItem (matches Prisma shape + included category)
export interface GalleryItemDB {
  id: string;
  src: string;
  alt: string;
  caption: string | null;
  title: string | null;
  categoryId: string;
  category: { id: string; name: string; slug: string };
  featured: boolean;
  sortOrder: number;
}

// DB-backed Article
export interface ArticleDB {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover: string;
  author: string;
  readTime: string;
  published: boolean;
  publishedAt: string | null;
  categoryId: string;
  category: { id: string; name: string; slug: string };
  tags: { tag: { id: string; name: string; slug: string } }[];
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
}

// Category (for dropdowns)
export interface CategoryDB {
  id: string;
  name: string;
  slug: string;
  type: string;
}

// DB-backed Fleet
export interface FleetDB {
  id: string;
  name: string;
  slug: string;
  badge: string | null;
  image: string;
  flip: boolean;
  imageClass: string;
  sortOrder: number;
  description: string | null;
  seats: number | null;
  transmission: string | null;
  active: boolean;
}

// DB-backed Testimonial
export interface TestimonialDB {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string | null;
  initials: string;
  rating: number;
  featured: boolean;
  sortOrder: number;
}

interface CMSContextType {
  // Gallery
  galleryItems: GalleryItemDB[];
  galleryLoading: boolean;
  addGalleryItem: (data: Record<string, unknown>) => Promise<void>;
  updateGalleryItem: (id: string, data: Record<string, unknown>) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;
  refreshGallery: () => Promise<void>;

  // Articles
  articles: ArticleDB[];
  articlesLoading: boolean;
  addArticle: (data: Record<string, unknown>) => Promise<void>;
  updateArticle: (slug: string, data: Record<string, unknown>) => Promise<void>;
  deleteArticle: (slug: string) => Promise<void>;
  getArticle: (slug: string) => ArticleDB | undefined;
  refreshArticles: () => Promise<void>;

  // Categories (for forms)
  galleryCategories: CategoryDB[];
  articleCategories: CategoryDB[];

  // Fleets
  fleets: FleetDB[];
  fleetsLoading: boolean;
  addFleet: (data: Record<string, unknown>) => Promise<void>;
  updateFleet: (slug: string, data: Record<string, unknown>) => Promise<void>;
  deleteFleet: (slug: string) => Promise<void>;
  refreshFleets: () => Promise<void>;

  // Testimonials
  testimonials: TestimonialDB[];
  testimonialsLoading: boolean;
  addTestimonial: (data: Record<string, unknown>) => Promise<void>;
  updateTestimonial: (id: string, data: Record<string, unknown>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  refreshTestimonials: () => Promise<void>;
}

const CMSContext = createContext<CMSContextType | null>(null);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  /* ─── State ─── */
  const [galleryItems, setGalleryItems] = useState<GalleryItemDB[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(true);

  const [articles, setArticles] = useState<ArticleDB[]>([]);
  const [articlesLoading, setArticlesLoading] = useState(true);

  const [galleryCategories, setGalleryCategories] = useState<CategoryDB[]>([]);
  const [articleCategories, setArticleCategories] = useState<CategoryDB[]>([]);

  const [fleets, setFleets] = useState<FleetDB[]>([]);
  const [fleetsLoading, setFleetsLoading] = useState(true);

  const [testimonials, setTestimonials] = useState<TestimonialDB[]>([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);

  /* ─── Fetch helpers ─── */
  const fetchGallery = useCallback(async () => {
    setGalleryLoading(true);
    try {
      const res = await fetch("/api/gallery");
      if (res.ok) setGalleryItems(await res.json());
    } catch (err) {
      console.error("Failed to fetch gallery:", err);
    } finally {
      setGalleryLoading(false);
    }
  }, []);

  const fetchArticles = useCallback(async () => {
    setArticlesLoading(true);
    try {
      const res = await fetch("/api/articles");
      if (res.ok) setArticles(await res.json());
    } catch (err) {
      console.error("Failed to fetch articles:", err);
    } finally {
      setArticlesLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const [galRes, artRes] = await Promise.all([
        fetch("/api/categories?type=gallery"),
        fetch("/api/categories?type=article"),
      ]);
      if (galRes.ok) setGalleryCategories(await galRes.json());
      if (artRes.ok) setArticleCategories(await artRes.json());
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  }, []);

  const fetchFleets = useCallback(async () => {
    setFleetsLoading(true);
    try {
      const res = await fetch("/api/fleets");
      if (res.ok) setFleets(await res.json());
    } catch (err) {
      console.error("Failed to fetch fleets:", err);
    } finally {
      setFleetsLoading(false);
    }
  }, []);

  const fetchTestimonials = useCallback(async () => {
    setTestimonialsLoading(true);
    try {
      const res = await fetch("/api/testimonials");
      if (res.ok) setTestimonials(await res.json());
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
    } finally {
      setTestimonialsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchGallery();
    fetchArticles();
    fetchCategories();
    fetchFleets();
    fetchTestimonials();
  }, [fetchGallery, fetchArticles, fetchCategories, fetchFleets, fetchTestimonials]);

  /* ─── Gallery CRUD ─── */
  const addGalleryItem = useCallback(
    async (data: Record<string, unknown>) => {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Gagal menambah foto galeri");
      await fetchGallery();
    },
    [fetchGallery]
  );

  const updateGalleryItem = useCallback(
    async (id: string, data: Record<string, unknown>) => {
      const res = await fetch(`/api/gallery/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Gagal mengupdate foto");
      await fetchGallery();
    },
    [fetchGallery]
  );

  const deleteGalleryItem = useCallback(
    async (id: string) => {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus foto");
      await fetchGallery();
    },
    [fetchGallery]
  );

  /* ─── Article CRUD ─── */
  const addArticle = useCallback(
    async (data: Record<string, unknown>) => {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Gagal membuat artikel");
      await fetchArticles();
    },
    [fetchArticles]
  );

  const updateArticle = useCallback(
    async (slug: string, data: Record<string, unknown>) => {
      const res = await fetch(`/api/articles/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Gagal mengupdate artikel");
      await fetchArticles();
    },
    [fetchArticles]
  );

  const deleteArticle = useCallback(
    async (slug: string) => {
      const res = await fetch(`/api/articles/${slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus artikel");
      await fetchArticles();
    },
    [fetchArticles]
  );

  const getArticle = useCallback(
    (slug: string) => articles.find((a) => a.slug === slug),
    [articles]
  );

  /* ─── Fleet CRUD ─── */
  const addFleet = useCallback(
    async (data: Record<string, unknown>) => {
      const res = await fetch("/api/fleets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Gagal membuat armada");
      await fetchFleets();
    },
    [fetchFleets]
  );

  const updateFleet = useCallback(
    async (slug: string, data: Record<string, unknown>) => {
      const res = await fetch(`/api/fleets/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Gagal mengupdate armada");
      await fetchFleets();
    },
    [fetchFleets]
  );

  const deleteFleet = useCallback(
    async (slug: string) => {
      const res = await fetch(`/api/fleets/${slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus armada");
      await fetchFleets();
    },
    [fetchFleets]
  );

  /* ─── Testimonial CRUD ─── */
  const addTestimonial = useCallback(
    async (data: Record<string, unknown>) => {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Gagal membuat testimoni");
      await fetchTestimonials();
    },
    [fetchTestimonials]
  );

  const updateTestimonial = useCallback(
    async (id: string, data: Record<string, unknown>) => {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Gagal mengupdate testimoni");
      await fetchTestimonials();
    },
    [fetchTestimonials]
  );

  const deleteTestimonial = useCallback(
    async (id: string) => {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus testimoni");
      await fetchTestimonials();
    },
    [fetchTestimonials]
  );

  return (
    <CMSContext.Provider
      value={{
        galleryItems,
        galleryLoading,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        refreshGallery: fetchGallery,

        articles,
        articlesLoading,
        addArticle,
        updateArticle,
        deleteArticle,
        getArticle,
        refreshArticles: fetchArticles,

        galleryCategories,
        articleCategories,

        fleets,
        fleetsLoading,
        addFleet,
        updateFleet,
        deleteFleet,
        refreshFleets: fetchFleets,

        testimonials,
        testimonialsLoading,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        refreshTestimonials: fetchTestimonials,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) throw new Error("useCMS must be used within CMSProvider");
  return context;
}
