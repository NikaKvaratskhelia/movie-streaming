import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const actors = await prisma.actor.findMany();

  return NextResponse.json(actors, { status: 200 });
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

  const newActor = await prisma.actor.create({
    data: {
      fullName,
      nationality,
      dateOfBirth: new Date(dateOfBirth),
      debutYear: Number(debutYear),
    },
  });

  return NextResponse.json({ newActor, ok: true }, { status: 200 });
}
