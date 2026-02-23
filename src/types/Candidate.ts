import { Decimal } from "@prisma/client/runtime/client";

export type Candidate = {
  id: number;
  title: string;
  genres: string[];
  rating: Decimal;
  yearPublished: number;
  watchlistsCount?: number;
  type: "movie" | "series";
};
