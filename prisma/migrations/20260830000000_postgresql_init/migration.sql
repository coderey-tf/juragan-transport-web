-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "coverImageId" TEXT,
    "author" TEXT NOT NULL DEFAULT 'Admin Juragan',
    "readTime" TEXT NOT NULL DEFAULT '5 menit',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "metaKeywords" TEXT,
    "ogImage" TEXT,
    "canonicalUrl" TEXT,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryItem" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "src" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "caption" TEXT,
    "imageId" TEXT,
    "title" TEXT,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "GalleryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "metaTitle" TEXT,
    "metaDescription" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleTag" (
    "articleId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "ArticleTag_pkey" PRIMARY KEY ("articleId","tagId")
);

-- CreateTable
CREATE TABLE "Fleet" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "badge" TEXT,
    "image" TEXT NOT NULL,
    "imageId" TEXT,
    "flip" BOOLEAN NOT NULL DEFAULT false,
    "imageClass" TEXT NOT NULL DEFAULT '',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "seats" INTEGER,
    "transmission" TEXT,
    "year" INTEGER,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Fleet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "avatar" TEXT,
    "initials" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'text',

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaImage" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "secureUrl" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "format" TEXT,
    "folder" TEXT,
    "alt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaTracker" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" TEXT NOT NULL,
    "message" TEXT,
    "ip" TEXT,
    "userAgent" TEXT,
    "referer" TEXT,

    CONSTRAINT "WaTracker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");
CREATE INDEX "Article_slug_idx" ON "Article"("slug");
CREATE INDEX "Article_published_publishedAt_idx" ON "Article"("published", "publishedAt");
CREATE INDEX "Article_categoryId_idx" ON "Article"("categoryId");

-- CreateIndex
CREATE INDEX "GalleryItem_categoryId_idx" ON "GalleryItem"("categoryId");
CREATE INDEX "GalleryItem_featured_idx" ON "GalleryItem"("featured");
CREATE INDEX "GalleryItem_sortOrder_idx" ON "GalleryItem"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");
CREATE INDEX "Category_type_idx" ON "Category"("type");
CREATE INDEX "Category_slug_idx" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
CREATE UNIQUE INDEX "Tag_slug_key" ON "Tag"("slug");
CREATE INDEX "Tag_slug_idx" ON "Tag"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Fleet_name_key" ON "Fleet"("name");
CREATE UNIQUE INDEX "Fleet_slug_key" ON "Fleet"("slug");
CREATE INDEX "Fleet_slug_idx" ON "Fleet"("slug");
CREATE INDEX "Fleet_active_sortOrder_idx" ON "Fleet"("active", "sortOrder");

-- CreateIndex
CREATE INDEX "Testimonial_featured_idx" ON "Testimonial"("featured");

-- CreateIndex
CREATE UNIQUE INDEX "SiteSetting_key_key" ON "SiteSetting"("key");
CREATE INDEX "SiteSetting_key_idx" ON "SiteSetting"("key");

-- CreateIndex
CREATE UNIQUE INDEX "MediaImage_publicId_key" ON "MediaImage"("publicId");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_coverImageId_fkey" FOREIGN KEY ("coverImageId") REFERENCES "MediaImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Article" ADD CONSTRAINT "Article_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "GalleryItem" ADD CONSTRAINT "GalleryItem_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "MediaImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "GalleryItem" ADD CONSTRAINT "GalleryItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ArticleTag" ADD CONSTRAINT "ArticleTag_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ArticleTag" ADD CONSTRAINT "ArticleTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Fleet" ADD CONSTRAINT "Fleet_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "MediaImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
