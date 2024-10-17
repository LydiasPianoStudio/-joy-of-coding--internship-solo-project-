import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const logs = await prisma.practiceLog.findMany();
    return NextResponse.json(logs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch practice logs" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const newLog = await prisma.practiceLog.create({ data });
    return NextResponse.json(newLog, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create practice log" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    await prisma.practiceLog.delete({ where: { id: parseInt(id) } });
    return NextResponse.json(
      { message: "Practice log deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete practice log" },
      { status: 500 }
    );
  }
}
