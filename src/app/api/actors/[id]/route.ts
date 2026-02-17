import { Actor } from "@/generated/prisma/browser";
import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const wantedActor = await prisma.actor.findUnique({
    where: { id: Number(id) },
    include: {
      movies: true,
    },
  });

  if (!wantedActor)
    return NextResponse.json(
      { message: `No actor with id of ${id}`, ok: false },
      { status: 404 },
    );

  return NextResponse.json({ wantedActor, ok: true }, { status: 200 });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const wantedActor = await prisma.actor.findUnique({
    where: { id: Number(id) },
  });

  if (!wantedActor)
    return NextResponse.json(
      { message: `No actor with id of ${id}`, ok: false },
      { status: 404 },
    );

  const newData: Partial<Actor> = {};

  const { fullName, nationality, dateOfBirth, debutYear } = await req.json();

  if (fullName !== null) newData.fullName = fullName;
  if (nationality !== null) newData.nationality = nationality;
  if (dateOfBirth !== null) newData.dateOfBirth = dateOfBirth;
  if (debutYear !== null) newData.debutYear = debutYear;

  const updatedActor = await prisma.actor.update({
    where: { id: Number(id) },
    data: newData,
  });

  return NextResponse.json(
    {
      updatedActor,
      message: "Actor updated successfully!",
      ok: true,
    },
    { status: 200 },
  );
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const wantedActor = await prisma.actor.findUnique({
    where: { id: Number(id) },
  });

  if (!wantedActor)
    return NextResponse.json(
      { message: `No actor with id of ${id}`, ok: false },
      { status: 404 },
    );

  const deletedActor = prisma.actor.delete({ where: { id: Number(id) } });

  return NextResponse.json(
    {
      deletedActor,
      message: "Actor updated successfully!",
      ok: true,
    },
    { status: 200 },
  );
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { movieIds } = await req.json();

  if (!Array.isArray(movieIds) || movieIds.length === 0) {
    return NextResponse.json(
      { message: "movieIds must be a non-empty array of numbers", ok: false },
      { status: 400 },
    );
  }

  const numericMovieIds = movieIds.map((id) => Number(id));

  const existingMovies = await prisma.movie.findMany({
    where: {
      id: { in: numericMovieIds },
    },
    select: { id: true },
  });

  if (existingMovies.length !== numericMovieIds.length) {
    return NextResponse.json(
      { message: "Some movies do not exist", ok: false },
      { status: 400 },
    );
  }

  const actor = await prisma.actor.findUnique({
    where: { id: Number(id) },
    include: { movies: true },
  });

  if (!actor)
    return NextResponse.json(
      { message: `No actor with id of ${id}`, ok: false },
      { status: 404 },
    );

  const updated = await prisma.actor.update({
    where: { id: Number(id) },
    data: {
      movies: {
        connect: movieIds.map((id) => ({ id })),
      },
    },
    include: { movies: true },
  });

  return NextResponse.json({ updated, ok: true }, { status: 200 });
}
