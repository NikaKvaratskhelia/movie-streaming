import { prisma } from "@/src/lib/prisma";
import { checkJwt } from "@/src/utils/check-auth";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function DELETE(req: Request) {
  const userId = await checkJwt(req);

  if (!userId) {
    return NextResponse.json(
      { message: "Unathorized", ok: false },
      { status: 401 },
    );
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return NextResponse.json(
      { message: "User not found", ok: false },
      { status: 404 },
    );
  }

  const { pass } = await req.json();

  const isValid = bcrypt.compare(pass, user.password);

  if (!isValid) {
    return NextResponse.json(
      { message: "Password is incorrect!", ok: false },
      { status: 404 },
    );
  }

  await prisma.user.delete({ where: { id: userId } });
  return NextResponse.json(
    { message: "User deleted successfully" },
    { status: 200 },
  );
}
