import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  const user = await prisma.user.update({
    where: { id },
    data: { name: body.name, email: body.email },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await prisma.user.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Usuário deletado" });
}
