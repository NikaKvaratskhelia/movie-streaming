import { prisma } from "@/src/lib/prisma";
import { checkJwt } from "@/src/utils/check-auth";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PATCH(req: Request) {
  try {
    const userId = await checkJwt(req);
    if (!userId)
      return NextResponse.json(
        { message: "Unauthorized", ok: false },
        { status: 401 },
      );

    const { oldPass, newPass } = await req.json();

    if (!oldPass || !newPass)
      return NextResponse.json(
        { message: "Missing fields", ok: false },
        { status: 400 },
      );

    if (newPass.length < 8)
      return NextResponse.json(
        { message: "Password must be at least 8 characters", ok: false },
        { status: 400 },
      );

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if (!user)
      return NextResponse.json(
        { message: "User not found", ok: false },
        { status: 404 },
      );

    const isValid = await bcrypt.compare(oldPass, user.password);

    if (!isValid)
      return NextResponse.json(
        { message: "Current password is incorrect", ok: false },
        { status: 401 },
      );

    const hashed = await bcrypt.hash(newPass, 12);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });

    return NextResponse.json({ ok: true, message: "Password updated" });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: "Server error", error },
      { status: 500 },
    );
  }
}
