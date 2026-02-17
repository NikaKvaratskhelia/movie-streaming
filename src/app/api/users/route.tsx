import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User } from "@/generated/prisma/browser";
import { checkJwt } from "@/src/utils/check-auth";

export async function GET(req: Request) {
  try {
    const userId = await checkJwt(req);

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized", ok: false },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json(
      { message: "User fetched successfully", user, ok: true },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user", error, ok: false },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const userId = await checkJwt(req);

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized", ok: false },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user)
      return NextResponse.json(
        { message: "User not found", ok: false },
        { status: 404 },
      );

    const body = await req.json();

    const updateData: Partial<User> = {};

    if (body.firstName) updateData.firstName = body.firstName;
    if (body.lastName) updateData.lastName = body.lastName;
    if (body.email) updateData.email = body.email;
    if (body.password)
      updateData.password = await bcrypt.hash(body.password, 10);

    await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json(
      { message: "User updated successfully", ok: true },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user", error, ok: false },
      { status: 500 },
    );
  }
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
