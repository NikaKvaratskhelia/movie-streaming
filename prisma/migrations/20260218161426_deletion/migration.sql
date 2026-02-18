-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_producerId_fkey";

-- DropForeignKey
ALTER TABLE "MovieWatchlist" DROP CONSTRAINT "MovieWatchlist_movieId_fkey";

-- DropForeignKey
ALTER TABLE "MovieWatchlist" DROP CONSTRAINT "MovieWatchlist_userId_fkey";

-- DropForeignKey
ALTER TABLE "Series" DROP CONSTRAINT "Series_producerId_fkey";

-- DropForeignKey
ALTER TABLE "SeriesWatchlist" DROP CONSTRAINT "SeriesWatchlist_seriesId_fkey";

-- DropForeignKey
ALTER TABLE "SeriesWatchlist" DROP CONSTRAINT "SeriesWatchlist_userId_fkey";

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_producerId_fkey" FOREIGN KEY ("producerId") REFERENCES "Producer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieWatchlist" ADD CONSTRAINT "MovieWatchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieWatchlist" ADD CONSTRAINT "MovieWatchlist_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesWatchlist" ADD CONSTRAINT "SeriesWatchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesWatchlist" ADD CONSTRAINT "SeriesWatchlist_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_producerId_fkey" FOREIGN KEY ("producerId") REFERENCES "Producer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
