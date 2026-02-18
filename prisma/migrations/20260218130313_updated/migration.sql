/*
  Warnings:

  - You are about to alter the column `rating` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(3,1)`.
  - You are about to drop the `Watchlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Watchlist" DROP CONSTRAINT "Watchlist_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Watchlist" DROP CONSTRAINT "Watchlist_userId_fkey";

-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "rating" SET DEFAULT 0,
ALTER COLUMN "rating" SET DATA TYPE DECIMAL(3,1);

-- DropTable
DROP TABLE "Watchlist";

-- CreateTable
CREATE TABLE "MovieWatchlist" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "movieId" INTEGER NOT NULL,

    CONSTRAINT "MovieWatchlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeriesWatchlist" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "seriesId" INTEGER NOT NULL,

    CONSTRAINT "SeriesWatchlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Series" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coverPhoto" TEXT NOT NULL,
    "yearPublished" INTEGER NOT NULL,
    "rating" DECIMAL(3,1) NOT NULL DEFAULT 0,
    "genres" TEXT[],
    "producerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Season" (
    "id" SERIAL NOT NULL,
    "countInSerie" INTEGER NOT NULL,
    "seriesId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "countInSeason" INTEGER NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ActorToSeries" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ActorToSeries_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "MovieWatchlist_userId_movieId_key" ON "MovieWatchlist"("userId", "movieId");

-- CreateIndex
CREATE UNIQUE INDEX "SeriesWatchlist_userId_seriesId_key" ON "SeriesWatchlist"("userId", "seriesId");

-- CreateIndex
CREATE UNIQUE INDEX "Season_seriesId_countInSerie_key" ON "Season"("seriesId", "countInSerie");

-- CreateIndex
CREATE UNIQUE INDEX "Episode_seasonId_countInSeason_key" ON "Episode"("seasonId", "countInSeason");

-- CreateIndex
CREATE INDEX "_ActorToSeries_B_index" ON "_ActorToSeries"("B");

-- AddForeignKey
ALTER TABLE "MovieWatchlist" ADD CONSTRAINT "MovieWatchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieWatchlist" ADD CONSTRAINT "MovieWatchlist_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesWatchlist" ADD CONSTRAINT "SeriesWatchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesWatchlist" ADD CONSTRAINT "SeriesWatchlist_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_producerId_fkey" FOREIGN KEY ("producerId") REFERENCES "Producer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActorToSeries" ADD CONSTRAINT "_ActorToSeries_A_fkey" FOREIGN KEY ("A") REFERENCES "Actor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActorToSeries" ADD CONSTRAINT "_ActorToSeries_B_fkey" FOREIGN KEY ("B") REFERENCES "Series"("id") ON DELETE CASCADE ON UPDATE CASCADE;
