import { prisma } from "@/src/lib/prisma";
import { checkJwt } from "@/src/utils/check-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const series = await prisma.series.findMany();

    if (series.length === 0) {
      return NextResponse.json(
        { message: "There are no series", ok: true },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        message: "Series fetched successfully",
        data: series,
        ok: true,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message, ok: false },
        { status: 400 },
      );
    } else {
      return NextResponse.json(
        { message: "Failed to fetch", ok: false },
        { status: 400 },
      );
    }
  }
}

export async function POST(req: Request) {
  try {
    const userId = await checkJwt(req);

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized", ok: false },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user?.role !== "ADMIN") {
      return NextResponse.json(
        {
          message: "You do not have permission to add movies or series",
          ok: false,
        },
        { status: 403 },
      );
    }

    const body = await req.json();

    const {
      title,
      description,
      coverPhoto,
      yearPublished,
      genres,
      actorIds,
      producerId,
    } = body;

    if (!title || !description || !coverPhoto || !yearPublished) {
      return NextResponse.json(
        { message: "Missing required fields", ok: false },
        { status: 400 },
      );
    }

    await prisma.series.create({
      data: {
        title,
        description,
        coverPhoto,
        yearPublished,
        genres,
        producerId,
        actors: actorIds?.length
          ? {
              connect: actorIds.map((id: number) => ({ id })),
            }
          : undefined,
      },
    });

    return NextResponse.json(
      { message: "Series added successfully", ok: true },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message, ok: false },
        { status: 400 },
      );
    } else {
      return NextResponse.json(
        { message: "Failed to fetch", ok: false },
        { status: 400 },
      );
    }
  }
}
