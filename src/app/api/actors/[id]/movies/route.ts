import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const actor = await prisma.actor.findUnique({
      where: { id: Number(id) },
      include: { movies: true },
    });

    if (!actor) {
      return new NextResponse("Actor not found", { status: 404 });
    }

    return NextResponse.json(actor.movies);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { movieIds } = await req.json();

  if (!Array.isArray(movieIds) || movieIds.length === 0) {
    return NextResponse.json(
      { message: "movieIds must be a non-empty array of numbers" },
      { status: 400 },
    );
  }

  const actor = prisma.actor.findUnique({
    where: { id: Number(id) },
    include: { movies: true },
  });

  if (!actor)
    return NextResponse.json(`No actor with id of ${id}`, { status: 404 });

  const updated = await prisma.actor.update({
    where: { id: Number(id) },
    data: {
      movies: {
        connect: movieIds.map((id) => ({ id })),
      },
    },
    include: { movies: true },
  });

  return NextResponse.json(updated, { status: 200 });
}
