/*
  Warnings:

  - The primary key for the `TheaterFeature` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[name]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Theater` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `TheaterFeature` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[seatId,showId]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `duration` on the `Movie` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - The required column `id` was added to the `TheaterFeature` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Changed the type of `B` on the `_TheaterToTheaterFeature` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_TheaterToTheaterFeature" DROP CONSTRAINT "_TheaterToTheaterFeature_B_fkey";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "duration",
ADD COLUMN     "duration" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "TheaterFeature" DROP CONSTRAINT "TheaterFeature_pkey",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "TheaterFeature_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_TheaterToTheaterFeature" DROP COLUMN "B",
ADD COLUMN     "B" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Movie_name_key" ON "Movie"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Theater_name_key" ON "Theater"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TheaterFeature_name_key" ON "TheaterFeature"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_seatId_showId_key" ON "Ticket"("seatId", "showId");

-- CreateIndex
CREATE UNIQUE INDEX "_TheaterToTheaterFeature_AB_unique" ON "_TheaterToTheaterFeature"("A", "B");

-- CreateIndex
CREATE INDEX "_TheaterToTheaterFeature_B_index" ON "_TheaterToTheaterFeature"("B");

-- AddForeignKey
ALTER TABLE "_TheaterToTheaterFeature" ADD CONSTRAINT "_TheaterToTheaterFeature_B_fkey" FOREIGN KEY ("B") REFERENCES "TheaterFeature"("id") ON DELETE CASCADE ON UPDATE CASCADE;
