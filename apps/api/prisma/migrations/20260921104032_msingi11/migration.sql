-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('CONSTITUTION', 'ACT', 'REGULATION', 'OFFICIAL_GUIDANCE', 'CASE');

-- CreateEnum
CREATE TYPE "SourceStatus" AS ENUM ('ACTIVE', 'UNDER_REVIEW', 'OUTDATED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('en', 'sw');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('DRAFT', 'AI_GENERATED', 'HUMAN_REVIEWED', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('LEGAL_AID', 'GOVERNMENT', 'NGO', 'HOTLINE', 'COURT');

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Situation" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "searchKeywords" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Situation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LegalSource" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sourceType" "SourceType" NOT NULL,
    "officialUrl" TEXT NOT NULL,
    "version" TEXT,
    "effectiveDate" TIMESTAMP(3),
    "lastVerified" TIMESTAMP(3) NOT NULL,
    "status" "SourceStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LegalSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LegalSection" (
    "id" TEXT NOT NULL,
    "legalSourceId" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "legalText" TEXT NOT NULL,
    "parentSectionId" TEXT,
    "keywords" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LegalSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SituationLegalSection" (
    "id" TEXT NOT NULL,
    "situationId" TEXT NOT NULL,
    "legalSectionId" TEXT NOT NULL,
    "relevance" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SituationLegalSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Explanation" (
    "id" TEXT NOT NULL,
    "situationId" TEXT NOT NULL,
    "language" "Language" NOT NULL,
    "summary" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "whatThisMeans" TEXT NOT NULL,
    "limitations" TEXT NOT NULL,
    "generatedBy" TEXT NOT NULL,
    "reviewStatus" "ReviewStatus" NOT NULL DEFAULT 'DRAFT',
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Explanation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL,
    "situationId" TEXT NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "warning" TEXT,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ResourceType" NOT NULL,
    "description" TEXT NOT NULL,
    "website" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "sourceUrl" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedItem" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "situationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Situation_slug_key" ON "Situation"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SituationLegalSection_situationId_legalSectionId_key" ON "SituationLegalSection"("situationId", "legalSectionId");

-- CreateIndex
CREATE UNIQUE INDEX "Explanation_situationId_language_key" ON "Explanation"("situationId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "SavedItem_deviceId_situationId_key" ON "SavedItem"("deviceId", "situationId");

-- AddForeignKey
ALTER TABLE "Situation" ADD CONSTRAINT "Situation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LegalSection" ADD CONSTRAINT "LegalSection_legalSourceId_fkey" FOREIGN KEY ("legalSourceId") REFERENCES "LegalSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LegalSection" ADD CONSTRAINT "LegalSection_parentSectionId_fkey" FOREIGN KEY ("parentSectionId") REFERENCES "LegalSection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SituationLegalSection" ADD CONSTRAINT "SituationLegalSection_situationId_fkey" FOREIGN KEY ("situationId") REFERENCES "Situation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SituationLegalSection" ADD CONSTRAINT "SituationLegalSection_legalSectionId_fkey" FOREIGN KEY ("legalSectionId") REFERENCES "LegalSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Explanation" ADD CONSTRAINT "Explanation_situationId_fkey" FOREIGN KEY ("situationId") REFERENCES "Situation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_situationId_fkey" FOREIGN KEY ("situationId") REFERENCES "Situation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedItem" ADD CONSTRAINT "SavedItem_situationId_fkey" FOREIGN KEY ("situationId") REFERENCES "Situation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
