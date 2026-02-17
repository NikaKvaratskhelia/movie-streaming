import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  const data = await prisma.movie.findMany({
    include: {
      producer: true,
      actors: true,
    },
    orderBy: {
      rating: 'desc',
    },
  });

  if (data.length === 0) {
    return NextResponse.json(
      { message: "There is no data in this table", ok: false },
      { status: 200 },
    );
  }

  return NextResponse.json(
    { message: "Movies fetched successfully", ok: true },
    { status: 200 },
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      description,
      coverPhoto,
      yearPublished,
      actorIds,
      producerId,
    } = body;

    if (!title || !description || !coverPhoto || !yearPublished) {
      return NextResponse.json(
        { message: "Missing required fields", ok: false },
        { status: 400 },
      );
    }

    await prisma.movie.create({
      data: {
        title,
        description,
        coverPhoto,
        yearPublished,
        producerId,
        actors: actorIds?.length
          ? {
              connect: actorIds.map((id: number) => ({ id })),
            }
          : undefined,
      },
      include: {
        producer: true,
        actors: true,
      },
    });

    return NextResponse.json(
      { message: "Movie added successfully", ok: true },
      { status: 201 },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Something went wrong", ok: false },
        { status: 500 },
      );
    }
  }
}
