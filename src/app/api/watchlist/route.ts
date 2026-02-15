import { prisma } from "@/src/lib/prisma";
import { checkJwt } from "@/src/utils/check-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const userId = await checkJwt(req);

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      watchlists: {
        include:{
          movie:true
        }
      },
    },
  });

  return NextResponse.json(user?.watchlists, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const userId = await checkJwt(req);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { movieId } = await req.json();

    if (!movieId)
      return NextResponse.json("Missing movie id!", { status: 400 });

    const updatedWatchlist = await prisma.watchlist.create({
      data: {
        userId,
        movieId,
      },
    });

    return NextResponse.json(updatedWatchlist, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error occured", error },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const userId = await checkJwt(req);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { movieId } = await req.json();

    await prisma.watchlist.delete({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    });

    return NextResponse.json(
      { message: "Movie removed from watchlist successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error occurred", error },
      { status: 500 },
    );
  }
}
