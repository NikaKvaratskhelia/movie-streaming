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

  const data = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      movieWatchlists: {
        include: {
          movie: true,
        },
      },
      seriesWatchlists: {
        include: {
          series: true,
        },
      },
    },
  });

  return NextResponse.json(
    { message: "Watchlist fetched successfully", data, ok: true },
    { status: 200 },
  );
}
