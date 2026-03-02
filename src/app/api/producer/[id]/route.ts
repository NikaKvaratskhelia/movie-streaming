import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const existingProducer = await prisma.producer.findUnique({
    where: { id: Number(id) },
    include: {
      movies: true,
      series: {
        select: {
          id: true,
          coverPhoto: true,
          title: true,
          genres: true,
          rating: true,
          yearPublished: true,
          _count: { select: { seriesWatchlists: true, seasons: true } },
        },
      },
    },
  });

  if (!existingProducer)
    return NextResponse.json(
      { message: `Producer with id of ${id} does not exist`, ok: false },
      { status: 404 },
    );

  return NextResponse.json(
    {
      message: "Producer fetched successfully",
      ok: true,
      data: existingProducer,
    },
    { status: 200 },
  );
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const body = await req.json();
  const { id } = await params;

  const producerId = Number(id);
  if (!Number.isFinite(producerId)) {
    return NextResponse.json(
      { message: "Invalid id", ok: false },
      { status: 400 },
    );
  }

  const existing = await prisma.producer.findUnique({
    where: { id: producerId },
  });

  if (!existing) {
    return NextResponse.json(
      { message: `Producer with id of ${id} does not exist`, ok: false },
      { status: 404 },
    );
  }

  const b = body as Partial<{
    fullName: unknown;
    nationality: unknown;
    dateOfBirth: unknown;
    debutYear: unknown;
  }>;

  const newData: {
    fullName?: string;
    nationality?: string;
    dateOfBirth?: Date;
    debutYear?: number;
  } = {};

  if (typeof b.fullName === "string") newData.fullName = b.fullName;
  if (typeof b.nationality === "string") newData.nationality = b.nationality;

  if (typeof b.dateOfBirth === "string") {
    const d = new Date(b.dateOfBirth);
    if (Number.isNaN(d.getTime())) {
      return NextResponse.json(
        { message: "Invalid dateOfBirth", ok: false },
        { status: 400 },
      );
    }
    newData.dateOfBirth = d;
  }

  if (typeof b.debutYear === "number" && Number.isFinite(b.debutYear)) {
    newData.debutYear = b.debutYear;
  }

  const updated = await prisma.producer.update({
    where: { id: producerId },
    data: newData,
  });

  return NextResponse.json(
    { message: "Producer updated successfully!", ok: true, data: updated },
    { status: 200 },
  );
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const existingProducer = await prisma.producer.findUnique({
    where: { id: Number(id) },
  });

  if (!existingProducer)
    return NextResponse.json(
      { message: `Producer with id of ${id} does not exist`, ok: false },
      { status: 404 },
    );

  await prisma.producer.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json(
    { message: "Deleted successfully!", ok: true },
    { status: 200 },
  );
}
