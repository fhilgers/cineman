/*
  Warnings:

  - The primary key for the `Seat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `seatNumber` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `theaterId` on the `Ticket` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[number,theaterId]` on the table `Seat` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Seat` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `seatId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_seatNumber_theaterId_fkey";

-- AlterTable
ALTER TABLE "Seat" DROP CONSTRAINT "Seat_pkey",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Seat_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "seatNumber",
DROP COLUMN "theaterId",
ADD COLUMN     "seatId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Seat_number_theaterId_key" ON "Seat"("number", "theaterId");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
