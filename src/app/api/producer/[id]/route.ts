import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { Producer } from "@/generated/prisma/browser";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const existingProducer = await prisma.producer.findUnique({
    where: { id: Number(id) },
    include: { movies: true },
  });

  if (!existingProducer)
    return new NextResponse(`Producer with id of ${id} does not exist`, {
      status: 404,
    });

  return NextResponse.json(existingProducer, { status: 200 });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const body = await req.json();
  const { id } = await params;

  const existingProducer = await prisma.producer.findUnique({
    where: { id: Number(id) },
  });

  if (!existingProducer)
    return new NextResponse(`Producer with id of ${id} does not exist`, {
      status: 404,
    });

  const newData: Partial<Producer> = {};

  if (body.fullName !== null) newData.fullName = body.fullName;
  if (body.nationality !== null) newData.nationality = body.nationality;
  if (body.dateOfBirth !== null) newData.dateOfBirth = body.dateOfBirth;
  if (body.debutYear !== null) newData.debutYear = body.debutYear;

  const updatedProducer = await prisma.producer.update({
    where: { id: Number(id) },
    data: newData,
  });

  return NextResponse.json({
    updatedProducer,
    message: "Producer updated successfully!",
  });
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
    return new NextResponse(`Producer with id of ${id} does not exist`, {
      status: 404,
    });

  const deletedProducer = await prisma.producer.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json(
    { deletedProducer, message: "Deleted successfully!" },
    { status: 200 },
  );
}
