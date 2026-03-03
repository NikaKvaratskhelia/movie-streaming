/*
  Warnings:

  - You are about to alter the column `rating` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,1)` to `DoublePrecision`.
  - You are about to alter the column `rating` on the `Series` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,1)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Series" ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;
