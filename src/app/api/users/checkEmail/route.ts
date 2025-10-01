import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ exists: false });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  return NextResponse.json({ exists: !!user });
}
