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

    const seasonsCount = await prisma.season.count({
      where: { seriesId: +id },
    });

    return NextResponse.json(
      { data: { seasonsCount }, ok: true },
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
        { message: "Failed to fetch seasons count", ok: false },
        { status: 400 },
      );
    }
  }
}
