import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 400 });
  }

  const hashedPassword = await hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name: name || null,
      email,
      hashedPassword,
    },
  });

  return NextResponse.json({ ok: true, user: { id: user.id, email: user.email } });
}