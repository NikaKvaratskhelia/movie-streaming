import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  const data = await prisma.movie.findMany({
    include: {
      producer: true,
      actors: true,
    },
  });

  if (data.length === 0) {
    return NextResponse.json(
      { message: "There is no data in this table" },
      { status: 200 },
    );
  }

  return NextResponse.json(data, { status: 200 });
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
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const movie = await prisma.movie.create({
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
      { movie, message: "Movie added successfully" },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 },
    );
  }
}
