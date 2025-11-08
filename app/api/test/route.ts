import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ ok: true, users });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error: String(error) });
  }
}
