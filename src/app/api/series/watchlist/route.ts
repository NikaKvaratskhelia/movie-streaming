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

    const { seriesId } = await req.json();

    if (!seriesId)
      return NextResponse.json(
        { message: "Missing serie id!", ok: false },
        { status: 400 },
      );

    const existingWatchlist = await prisma.seriesWatchlist.findUnique({
      where: {
        userId_seriesId: {
          userId,
          seriesId,
        },
      },
    });

    if (existingWatchlist) {
      return NextResponse.json(
        { message: "Serie is already in watchlist!", ok: false },
        { status: 409 },
      );
    }

    await prisma.seriesWatchlist.create({
      data: {
        userId,
        seriesId,
      },
    });

    return NextResponse.json(
      { message: "Serie added to watchlist successfully", ok: true },
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

    const { seriesId } = await req.json();

    await prisma.seriesWatchlist.delete({
      where: {
        userId_seriesId: {
          userId,
          seriesId,
        },
      },
    });

    return NextResponse.json(
      { message: "Serie removed from watchlist successfully", ok: true },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error occurred", error, ok: false },
      { status: 500 },
    );
  }
}
