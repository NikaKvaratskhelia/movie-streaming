/*
  Warnings:

  - Made the column `producerId` on table `Movie` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_producerId_fkey";

-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "producerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_producerId_fkey" FOREIGN KEY ("producerId") REFERENCES "Producer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
