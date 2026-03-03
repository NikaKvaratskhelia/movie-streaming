import { prisma } from "@/src/lib/prisma";
import { checkJwt } from "@/src/utils/check-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const actors = await prisma.actor.findMany();

  return NextResponse.json(actors, { status: 200 });
}

export async function POST(req: Request) {
  const data = await req.json();
  const userId = await checkJwt(req);
  if (!userId) {
    return NextResponse.json(
      { message: "token invalid!", ok: false },
      { status: 401 },
    );
  }

  const existingUser = await prisma.user.findUnique({ where: { id: userId } });
  if (existingUser?.role !== "ADMIN") {
    return NextResponse.json(
      { message: "U do not have permission!", ok: false },
      { status: 401 },
    );
  }

  const { fullName, nationality, dateOfBirth, debutYear } = data;

  if (!fullName || !nationality || !dateOfBirth || !debutYear) {
    return new NextResponse("Missing required fields", { status: 400 });
  }

  const newActor = await prisma.actor.create({
    data: {
      fullName,
      nationality,
      dateOfBirth: new Date(dateOfBirth),
      debutYear: Number(debutYear),
    },
  });

  return NextResponse.json(newActor, { status: 200 });
}
