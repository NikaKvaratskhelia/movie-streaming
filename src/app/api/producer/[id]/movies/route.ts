import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const producer = await prisma.producer.findUnique({
      where: { id: Number(id) },
      include: { movies: true },
    });

    if (!producer) {
      return new NextResponse("Producer not found", { status: 404 });
    }

    return NextResponse.json(producer.movies);
  } catch (error) {
    return NextResponse.json(error);
  }
}