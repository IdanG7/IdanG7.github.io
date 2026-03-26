-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('LIKE', 'CLAP');

-- CreateTable
CREATE TABLE "Reaction" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "voterId" TEXT NOT NULL,
    "type" "ReactionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorAvatar" TEXT,
    "authorGithub" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "View" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "View_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_slug_voterId_type_key" ON "Reaction"("slug", "voterId", "type");

-- CreateIndex
CREATE INDEX "Reaction_slug_idx" ON "Reaction"("slug");

-- CreateIndex
CREATE INDEX "Comment_slug_idx" ON "Comment"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "View_slug_key" ON "View"("slug");
