import { prisma } from "@/src/lib/prisma";
import { checkJwt } from "@/src/utils/check-auth";

export async function GET(req: Request) {
  const userId = await checkJwt(req);

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const movies = await prisma.movieWatchlist.findMany({
    where: { userId },
    include: {
      movie: true,
    },
  });

  const series = await prisma.seriesWatchlist.findMany({
    where: { userId },
    include: {
      series: {
        include: {
          seasons: {
            include: {
              episodes: true,
            },
          },
        },
      },
    },
  });

  const movieRuntimeSeconds = movies.reduce((acc, item) => {
    return acc + (item.movie.duration ?? 0);
  }, 0);

  const movieRatings = movies.map((m) => Number(m.movie.rating ?? 0));

  let seriesRuntimeSeconds = 0;
  const seriesRatings: number[] = [];

  series.forEach((item) => {
    seriesRatings.push(Number(item.series.rating ?? 0));

    item.series.seasons.forEach((season) => {
      season.episodes.forEach((episode) => {
        seriesRuntimeSeconds += episode.duration ?? 0;
      });
    });
  });

  const totalRuntimeSeconds = movieRuntimeSeconds + seriesRuntimeSeconds;

  const hours = Math.floor(totalRuntimeSeconds / 3600);
  const minutes = Math.floor((totalRuntimeSeconds % 3600) / 60);

  const formattedRuntime = `${hours}h ${minutes}m`;

  const allRatings = [...movieRatings, ...seriesRatings];

  const avgRating =
    allRatings.length > 0
      ? (allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1)
      : "0";

  return Response.json({
    avgRating,
    totalRuntime: formattedRuntime,
  });
}
