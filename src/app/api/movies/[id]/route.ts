import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id)
    return new NextResponse(`Id is required`, {
      status: 400,
    });

  const movie = await prisma.movie.findUnique({
    where: { id: Number(id) },
  });

  if (!movie)
    return new NextResponse(`There is not a movie with id of ${id}`, {
      status: 404,
    });

  return new NextResponse(JSON.stringify(movie), { status: 200 });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id)
      return new NextResponse(`Id is required`, {
        status: 400,
      });

    const body = await request.json();
    const { title, description, coverPhoto, yearPublished } = body;

    const updateData: any = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (coverPhoto !== undefined) updateData.coverPhoto = coverPhoto;
    if (yearPublished !== undefined) updateData.yearPublished = yearPublished;

    const existingMovie = await prisma.movie.findUnique({
      where: { id: Number(id) },
    });

    if (!existingMovie) {
      return new NextResponse(`There is not a movie with id of ${id}`, {
        status: 404,
      });
    }

    const updatedMovie = await prisma.movie.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return NextResponse.json(
      { updatedMovie, message: "Movie update successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Update failed", error: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id)
    return new NextResponse(`Id is required`, {
      status: 400,
    });

  const exsistingMovie = await prisma.movie.findUnique({ where: { id: Number(id) } });

  if (!exsistingMovie)
    return new NextResponse(`Movie with id of ${id} does not exsist`, {
      status: 404,
    });

  await prisma.movie.delete({
    where: { id: Number(id) },
  });

  return new NextResponse("Movie deleted successfully!", {status:200})
}
