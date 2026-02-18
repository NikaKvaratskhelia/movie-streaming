import { prisma } from "@/src/lib/prisma";
import { checkJwt } from "@/src/utils/check-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const userId = await checkJwt(req);

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized", ok: false },
        { status: 401 },
      );
    }

    const { movieId } = await req.json();

    if (!movieId)
      return NextResponse.json(
        { message: "Missing movie id!", ok: false },
        { status: 400 },
      );

    const existingWatchlist = await prisma.movieWatchlist.findUnique({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    });

    if (existingWatchlist) {
      return NextResponse.json(
        { message: "Movie is already in watchlist!", ok: false },
        { status: 409 },
      );
    }

    await prisma.movieWatchlist.create({
      data: {
        userId,
        movieId,
      },
    });

    return NextResponse.json(
      { message: "Movie added to watchlist successfully", ok: true },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error occurred", error, ok: false },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const userId = await checkJwt(req);

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized", ok: false },
        { status: 401 },
      );
    }

    const { movieId } = await req.json();

    await prisma.movieWatchlist.delete({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    });

    return NextResponse.json(
      { message: "Movie removed from watchlist successfully", ok: true },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error occurred", error, ok: false },
      { status: 500 },
    );
  }
}
