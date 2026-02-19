import { prisma } from "@/src/lib/prisma";
import { Movie } from "@/generated/prisma/browser";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id)
    return NextResponse.json(
      { message: "Id is required", ok: false },
      { status: 400 },
    );

  const movie = await prisma.movie.findUnique({
    where: { id: Number(id) },
    include: {
      producer: true,
      actors: true,
    },
  });

  if (!movie)
    return NextResponse.json(
      { message: `There is not a movie with id of ${id}`, ok: false },
      { status: 404 },
    );

  return NextResponse.json(
    { message: "Movie fetched successfully", data: movie, ok: true },
    { status: 200 },
  );
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id)
      return NextResponse.json(
        { message: "Id is required", ok: false },
        { status: 400 },
      );

    const body = await request.json();
    const { title, description, coverPhoto, yearPublished } = body;

    const updateData: Partial<Movie> = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (coverPhoto !== undefined) updateData.coverPhoto = coverPhoto;
    if (yearPublished !== undefined) updateData.yearPublished = yearPublished;

    const existingMovie = await prisma.movie.findUnique({
      where: { id: Number(id) },
    });

    if (!existingMovie) {
      return NextResponse.json(
        { message: `There is not a movie with id of ${id}`, ok: false },
        { status: 404 },
      );
    }

    await prisma.movie.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return NextResponse.json(
      { message: "Movie update successfully", ok: true },
      { status: 200 },
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

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id)
    return NextResponse.json(
      { message: "Id is required", ok: false },
      { status: 400 },
    );

  const exsistingMovie = await prisma.movie.findUnique({
    where: { id: Number(id) },
  });

  if (!exsistingMovie)
    return NextResponse.json(
      { message: `Movie with id of ${id} does not exsist`, ok: false },
      { status: 404 },
    );

  await prisma.movie.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json(
    { message: "Movie deleted successfully!", ok: true },
    { status: 200 },
  );
}
