import { Series } from "@/generated/prisma/browser";

export type SeriesWithCount = Series & {
  _count: {
    seasons: number;
  };
};
