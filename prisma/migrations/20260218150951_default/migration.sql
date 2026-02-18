-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "genres" SET DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Series" ALTER COLUMN "genres" SET DEFAULT ARRAY[]::TEXT[];
