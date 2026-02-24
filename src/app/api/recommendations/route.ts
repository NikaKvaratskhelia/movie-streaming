import { Movie } from "@/generated/prisma/browser";
import { prisma } from "@/src/lib/prisma";
import { Candidate } from "@/src/types/Candidate";
import { SeriesWithCount } from "@/src/types/SeriesWithCount";
import { checkJwt } from "@/src/utils/check-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const userId = await checkJwt(req);

  const fallback = await prisma.movie.findMany({
    orderBy: [{ rating: "desc" }, { yearPublished: "desc" }],
    take: 20,
  });

  const fallbackData = [
    ...fallback.map((m) => ({
      id: m.id,
      title: m.title,
      description: m.description,
      coverPhoto: m.coverPhoto,
      yearPublished: m.yearPublished,
      duration: m.duration,
      rating: m.rating,
      genres: m.genres,
      producerId: m.producerId,
      type: "movie" as const,
    })),
  ];

  if (!userId) {
    return NextResponse.json({ ok: true, data: fallbackData });
  }

  const [movieWL, seriesWL] = await Promise.all([
    prisma.movieWatchlist.findMany({
      where: { userId },
      select: {
        movie: {
          select: {
            id: true,
            genres: true,
            producerId: true,
            actors: { select: { id: true } },
          },
        },
      },
    }),

    prisma.seriesWatchlist.findMany({
      where: { userId },
      select: {
        series: {
          select: {
            id: true,
            genres: true,
            producerId: true,
            actors: { select: { id: true } },
          },
        },
      },
    }),
  ]);

  const watchedMovieIds = new Set<number>();
  const watchedSeriesIds = new Set<number>();
  const genres = new Set<string>();
  const producers = new Set<number>();
  const actors = new Set<number>();

  movieWL.forEach((m) => {
    watchedMovieIds.add(m.movie.id);
    m.movie.genres.forEach((g) => genres.add(g));
    producers.add(m.movie.producerId);
    m.movie.actors.forEach((a) => actors.add(a.id));
  });

  seriesWL.forEach((s) => {
    watchedSeriesIds.add(s.series.id);
    s.series.genres.forEach((g) => genres.add(g));
    producers.add(s.series.producerId);
    s.series.actors.forEach((a) => actors.add(a.id));
  });

  const userGenres = [...genres];
  const favProducers = [...producers];
  const favActors = [...actors];

  if (userGenres.length === 0) {
    return NextResponse.json({ ok: true, data: fallbackData });
  }

  const [movies, series] = await Promise.all([
    prisma.movie.findMany({
      where: {
        OR: [
          { genres: { hasSome: userGenres } },
          { producerId: { in: favProducers } },
          { actors: { some: { id: { in: favActors } } } },
        ],
        id: { notIn: [...watchedMovieIds] },
      },
      select: {
        id: true,
        title: true,
        genres: true,
        rating: true,
        yearPublished: true,
        _count: { select: { watchlists: true } },
      },
      take: 500,
    }),

    prisma.series.findMany({
      where: {
        OR: [
          { genres: { hasSome: userGenres } },
          { producerId: { in: favProducers } },
          { actors: { some: { id: { in: favActors } } } },
        ],
        id: { notIn: [...watchedSeriesIds] },
      },
      select: {
        id: true,
        title: true,
        genres: true,
        rating: true,
        yearPublished: true,
      },
      take: 500,
    }),
  ]);

  const candidates: Candidate[] = [
    ...movies.map((m) => ({
      id: m.id,
      title: m.title,
      genres: m.genres,
      rating: m.rating,
      yearPublished: m.yearPublished,
      watchlistsCount: m._count.watchlists,
      type: "movie" as const,
    })),

    ...series.map((s) => ({
      id: s.id,
      title: s.title,
      genres: s.genres,
      rating: s.rating,
      yearPublished: s.yearPublished,
      type: "series" as const,
    })),
  ];

  const now = new Date().getFullYear();

  function score(item: Candidate) {
    const genreScore =
      item.genres.filter((g) => userGenres.includes(g)).length /
      item.genres.length;

    const ratingScore = Number(item.rating) / 10;

    const popularity =
      item.watchlistsCount != null
        ? Math.min(item.watchlistsCount / 1000, 1)
        : 0.3;

    const recency = 1 - Math.min((now - item.yearPublished) / 20, 1);

    return (
      genreScore * 0.4 + ratingScore * 0.25 + popularity * 0.2 + recency * 0.15
    );
  }

  const ranked = candidates
    .map((c) => ({ item: c, score: score(c) }))
    .sort((a, b) => b.score - a.score);

  const topResults = ranked.slice(0, 20);

  const movieIds = topResults
    .filter((r) => r.item.type === "movie")
    .map((r) => r.item.id);

  const seriesIds = topResults
    .filter((r) => r.item.type === "series")
    .map((r) => r.item.id);

  const [moviesInResult, seriesInResult] = await Promise.all([
    prisma.movie.findMany({
      where: { id: { in: movieIds } },
      include: {
        actors: true,
        producer: true,
        _count: { select: { watchlists: true } },
      },
    }),
    prisma.series.findMany({
      where: { id: { in: seriesIds } },
      include: {
        actors: true,
        producer: true,
        _count: { select: { seriesWatchlists: true, seasons: true } },
      },
    }),
  ]);

  const results: (
    | (Movie & { type: "movie" })
    | (SeriesWithCount & { type: "series" })
  )[] = [];

  for (const r of topResults) {
    if (r.item.type === "movie") {
      const movie = moviesInResult.find((m) => m.id === r.item.id);
      if (movie) results.push({ ...movie, type: "movie" });
    } else {
      const serie = seriesInResult.find((s) => s.id === r.item.id);
      if (serie) results.push({ ...serie, type: "series" });
    }
  }

  return NextResponse.json({
    ok: true,
    count: results.length,
    data: results,
  });
}
