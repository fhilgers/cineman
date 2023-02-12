/*
  Warnings:

  - You are about to drop the `TheaterFeature` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TheaterToTheaterFeature` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TheaterToTheaterFeature" DROP CONSTRAINT "_TheaterToTheaterFeature_A_fkey";

-- DropForeignKey
ALTER TABLE "_TheaterToTheaterFeature" DROP CONSTRAINT "_TheaterToTheaterFeature_B_fkey";

-- DropTable
DROP TABLE "TheaterFeature";

-- DropTable
DROP TABLE "_TheaterToTheaterFeature";

-- CreateTable
CREATE TABLE "Feature" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FeatureToTheater" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Feature_name_key" ON "Feature"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_FeatureToTheater_AB_unique" ON "_FeatureToTheater"("A", "B");

-- CreateIndex
CREATE INDEX "_FeatureToTheater_B_index" ON "_FeatureToTheater"("B");

-- AddForeignKey
ALTER TABLE "_FeatureToTheater" ADD CONSTRAINT "_FeatureToTheater_A_fkey" FOREIGN KEY ("A") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeatureToTheater" ADD CONSTRAINT "_FeatureToTheater_B_fkey" FOREIGN KEY ("B") REFERENCES "Theater"("id") ON DELETE CASCADE ON UPDATE CASCADE;
