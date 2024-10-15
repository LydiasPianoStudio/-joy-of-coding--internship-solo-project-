// app/api/auth/session/route.ts
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const sessions = await prisma.session.findMany();
    return NextResponse.json(sessions, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
