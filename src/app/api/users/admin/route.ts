import { prisma } from "@/src/lib/prisma";
import { checkJwt } from "@/src/utils/check-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const userId = await checkJwt(req);

  if (!userId) {
    return NextResponse.json(
      { message: "Unauthorized", ok: false },
      { status: 401 },
    );
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!currentUser?.role || currentUser.role !== "ADMIN")
    return NextResponse.json(
      { message: "Unauthorized", ok: false },
      { status: 403 },
    );
  const users = await prisma.user.findMany({ where: { id: { not: userId } } });

  return NextResponse.json(
    { message: "Uses fetched successfully", data: users, ok: true },
    { status: 200 },
  );
}

export async function DELETE(req: Request) {
  try {
    const userId = await checkJwt(req);

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized", ok: false },
        { status: 401 },
      );
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!currentUser?.role || currentUser.role !== "ADMIN")
      return NextResponse.json(
        { message: "Unauthorized", ok: false },
        { status: 403 },
      );

    const { id } = await req.json();

    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    if (!deletedUser) {
      return NextResponse.json(
        { message: "User not found", ok: false },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "User deleted", ok: true },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting user", error, ok: false },
      { status: 500 },
    );
  }
}
