import { Series } from "@/generated/prisma/browser";
import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id || isNaN(+id)) {
      return NextResponse.json(
        { message: "Valid id is required", ok: false },
        { status: 400 },
      );
    }

    const series = await prisma.series.findUnique({
      where: { id: +id },
      include: {
        producer: true,
        actors: true,
        seasons: {
          include: {
            episodes: true,
          },
        },
      },
    });

    if (!series) {
      return NextResponse.json(
        { message: "Series not found", ok: false },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: series, ok: true }, { status: 200 });
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

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id || isNaN(+id)) {
      return NextResponse.json(
        { message: "Valid id is required", ok: false },
        { status: 400 },
      );
    }

    const series = await prisma.series.findUnique({
      where: { id: +id },
    });

    if (!series) {
      return NextResponse.json(
        { message: "Series not found", ok: false },
        { status: 404 },
      );
    }

    await prisma.series.delete({ where: { id: +id } });

    return NextResponse.json(
      { message: "Series deleted successfully", ok: true },
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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id || isNaN(+id)) {
      return NextResponse.json(
        { message: "Id is required", ok: false },
        { status: 400 },
      );
    }

    const body = await request.json();

    const {
      title,
      description,
      coverPhoto,
      yearPublished,
      rating,
      genres,
      producerId,
    } = body;

    const updateData: Partial<Series> = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (coverPhoto !== undefined) updateData.coverPhoto = coverPhoto;
    if (yearPublished !== undefined) updateData.yearPublished = yearPublished;
    if (rating !== undefined) updateData.rating = rating;
    if (genres !== undefined) updateData.genres = genres;
    if (producerId !== undefined) updateData.producerId = producerId;

    const existingSeries = await prisma.series.findUnique({
      where: { id: Number(id) },
    });

    if (!existingSeries) {
      return NextResponse.json(
        { message: `There is not a series with id of ${id}`, ok: false },
        { status: 404 },
      );
    }

    await prisma.series.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return NextResponse.json(
      { message: "Series updated successfully", ok: true },
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
