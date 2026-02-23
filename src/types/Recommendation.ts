import { Movie } from "@/generated/prisma/browser";
import { SeriesWithCount } from "./SeriesWithCount";

export type Recommendation =
  | (Movie & { type: "movie" })
  | (SeriesWithCount & { type: "series" });
