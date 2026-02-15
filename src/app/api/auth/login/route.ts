import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const body = await req.json();

  if (body.email === undefined || body.password === undefined)
    return NextResponse.json("Missing required fields", { status: 400 });

  const existingUser = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (!existingUser)
    return NextResponse.json("Email or password is incorrect!", {
      status: 401,
    });

  const isValid = await bcrypt.compare(body.password, existingUser.password);

  if (!isValid)
    return NextResponse.json("Email or password is incorrect!", {
      status: 401,
    });

  const jwtToken = jwt.sign(
    { userId: existingUser.id },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    },
  );

  return NextResponse.json({ token: jwtToken }, { status: 200 });
}
