export type Candidate = {
  id: number;
  title: string;
  genres: string[];
  rating: number;
  yearPublished: number;
  watchlistsCount?: number;
  type: "movie" | "series";
};
