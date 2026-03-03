import { Actor } from "@/generated/prisma/browser";
import { prisma } from "@/src/lib/prisma";
import { checkJwt } from "@/src/utils/check-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const wantedActor = await prisma.actor.findUnique({
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

  if (!wantedActor)
    return NextResponse.json(
      { message: `No actor with id of ${id}`, ok: false },
      { status: 404 },
    );

  return NextResponse.json(wantedActor, { status: 200 });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

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

  const wantedActor = await prisma.actor.findUnique({
    where: { id: Number(id) },
  });

  if (!wantedActor)
    return NextResponse.json(
      { message: `No actor with id of ${id}`, ok: false },
      { status: 404 },
    );

  const newData: Partial<Actor> = {};

  const { fullName, nationality, dateOfBirth, debutYear } = await req.json();

  if (fullName !== null) newData.fullName = fullName;
  if (nationality !== null) newData.nationality = nationality;
  if (dateOfBirth !== null) newData.dateOfBirth = dateOfBirth;
  if (debutYear !== null) newData.debutYear = debutYear;

  const updatedActor = await prisma.actor.update({
    where: { id: Number(id) },
    data: newData,
  });

  return NextResponse.json(
    {
      updatedActor,
      message: "Actor updated successfully!",
      ok: true,
    },
    { status: 200 },
  );
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

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

  const wantedActor = await prisma.actor.findUnique({
    where: { id: Number(id) },
  });

  if (!wantedActor)
    return NextResponse.json(
      { message: `No actor with id of ${id}`, ok: false },
      { status: 404 },
    );

  await prisma.actor.delete({ where: { id: Number(id) } });

  return NextResponse.json(
    {
      message: "Actor updated successfully! jajaja",
      ok: true,
    },
    { status: 200 },
  );
}