import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  const data = await prisma.producer.findMany();

  if (data.length === 0) {
    return NextResponse.json(
      { message: "There is no data in this table" },
      { status: 200 },
    );
  }

  return NextResponse.json(data, { status: 200 });
}

export async function POST(req: Request) {
  const data = await req.json();

  const { fullName, nationality, dateOfBirth, debutYear } = data;

  if (!fullName || !nationality || !dateOfBirth || !debutYear) {
    return new NextResponse("Missing required fields", { status: 400 });
  }

  const newProducer = await prisma.producer.create({
    data: {
      fullName,
      nationality,
      dateOfBirth: new Date(dateOfBirth),
      debutYear: Number(debutYear),
    },
  });

  return NextResponse.json(
    { message: "Producer Created successfully!", newProducer },
    { status: 200 },
  );
}
