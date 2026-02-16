import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  const { firstName, lastName, email, password } = data;

  if (!firstName || !lastName || !email || !password)
    return NextResponse.json("Missing reuqired fields!", { status: 400 });

  const exsistingUser = await prisma.user.findUnique({
    where: { email: email },
  });

  if (exsistingUser)
    return NextResponse.json("User with this email already exists!", {
      status: 400,
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json(createdUser, { status: 200 });
}
