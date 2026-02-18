import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

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

    const { actorIds } = await request.json();

    const existingSeries = await prisma.series.findUnique({
      where: { id: Number(id) },
    });

    if (!existingSeries) {
      return NextResponse.json(
        { message: `There is not a series with id of ${id}`, ok: false },
        { status: 404 },
      );
    }

    if (!actorIds || !Array.isArray(actorIds) || actorIds.length === 0) {
      return NextResponse.json(
        { message: "actorIds array is required", ok: false },
        { status: 400 },
      );
    }

    await prisma.series.update({
      where: { id: Number(id) },
      data: {
        actors: {
          connect: actorIds.map((actorId: number) => ({
            id: actorId,
          })),
        },
      },
    });

    return NextResponse.json(
      { message: "Actors added successfully", ok: true },
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
