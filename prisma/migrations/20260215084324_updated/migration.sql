-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_producerId_fkey";

-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "producerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_producerId_fkey" FOREIGN KEY ("producerId") REFERENCES "Producer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
