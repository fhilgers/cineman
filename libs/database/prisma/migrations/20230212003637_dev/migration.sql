CREATE EXTENSION btree_gist;

-- CreateEnum
CREATE TYPE "SeatType" AS ENUM ('NORMAL', 'DELUXE', 'REMOVABLE');

-- CreateTable
CREATE TABLE "Ticket" (
    "id" UUID NOT NULL,
    "price" INTEGER NOT NULL,
    "ownerId" UUID NOT NULL,
    "theaterId" UUID NOT NULL,
    "seatNumber" INTEGER NOT NULL,
    "showId" UUID NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "stars" DOUBLE PRECISION NOT NULL,
    "review" TEXT NOT NULL,
    "customerId" UUID NOT NULL,
    "movieId" UUID NOT NULL,
    "id" UUID NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Show" (
    "theaterId" UUID NOT NULL,
    "movieId" UUID NOT NULL,
    "id" UUID NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Show_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Theater" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Theater_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seat" (
    "number" INTEGER NOT NULL,
    "row" INTEGER NOT NULL,
    "type" "SeatType" NOT NULL DEFAULT 'NORMAL',
    "theaterId" UUID NOT NULL,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("number","theaterId")
);

-- CreateTable
CREATE TABLE "TheaterFeature" (
    "name" TEXT NOT NULL,

    CONSTRAINT "TheaterFeature_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "_TheaterToTheaterFeature" (
    "A" UUID NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Rating_customerId_movieId_key" ON "Rating"("customerId", "movieId");

-- CreateIndex
CREATE UNIQUE INDEX "_TheaterToTheaterFeature_AB_unique" ON "_TheaterToTheaterFeature"("A", "B");

-- CreateIndex
CREATE INDEX "_TheaterToTheaterFeature_B_index" ON "_TheaterToTheaterFeature"("B");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_seatNumber_theaterId_fkey" FOREIGN KEY ("seatNumber", "theaterId") REFERENCES "Seat"("number", "theaterId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Show"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Show" ADD CONSTRAINT "Show_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Show" ADD CONSTRAINT "Show_theaterId_fkey" FOREIGN KEY ("theaterId") REFERENCES "Theater"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_theaterId_fkey" FOREIGN KEY ("theaterId") REFERENCES "Theater"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TheaterToTheaterFeature" ADD CONSTRAINT "_TheaterToTheaterFeature_A_fkey" FOREIGN KEY ("A") REFERENCES "Theater"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TheaterToTheaterFeature" ADD CONSTRAINT "_TheaterToTheaterFeature_B_fkey" FOREIGN KEY ("B") REFERENCES "TheaterFeature"("name") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Show" ADD EXCLUDE USING GIST ("theaterId" WITH =, tsrange("start", "end", '[)') WITH &&);
