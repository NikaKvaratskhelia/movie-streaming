import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  const data = await prisma.producer.findMany();

  if (data.length === 0) {
    return NextResponse.json(
      { message: "There is no data in this table", ok: false },
      { status: 200 },
    );
  }

  return NextResponse.json(
    { message: "Producers fetched successfully", ok: true },
    { status: 200 },
  );
}

export async function POST(req: Request) {
  const data = await req.json();

  const { fullName, nationality, dateOfBirth, debutYear } = data;

  if (!fullName || !nationality || !dateOfBirth || !debutYear) {
    return NextResponse.json(
      { message: "Missing required fields!", ok: false },
      { status: 400 },
    );
  }

  await prisma.producer.create({
    data: {
      fullName,
      nationality,
      dateOfBirth: new Date(dateOfBirth),
      debutYear: Number(debutYear),
    },
  });

  return NextResponse.json(
    { message: "Producer Created successfully!", ok: true },
    { status: 200 },
  );
}
