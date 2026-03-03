import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { checkJwt } from "@/src/utils/check-auth";

export async function GET() {
  const data = await prisma.producer.findMany();

  if (data.length === 0) {
    return NextResponse.json(
      { message: "There is no data in this table", ok: false },
      { status: 200 },
    );
  }

  return NextResponse.json(
    { message: "Producers fetched successfully", ok: true, data },
    { status: 200 },
  );
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
    return NextResponse.json(
      { message: "Missing required fields!", ok: false },
      { status: 400 },
    );
  }

  const created = await prisma.producer.create({
    data: {
      fullName,
      nationality,
      dateOfBirth: new Date(dateOfBirth),
      debutYear: Number(debutYear),
    },
  });

  return NextResponse.json(
    { message: "Producer created successfully!", ok: true, data: created },
    { status: 201 },
  );
}
