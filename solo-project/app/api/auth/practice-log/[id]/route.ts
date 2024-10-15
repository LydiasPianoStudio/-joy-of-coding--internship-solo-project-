import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const practiceLog = await prisma.practiceLog.findUnique({
      where: { id },
    });

    if (!practiceLog) {
      return NextResponse.json(
        { error: "Practice log not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(practiceLog, { status: 200 });
  } catch (error) {
    console.error("Error fetching practice log:", error);
    return NextResponse.json(
      { error: "Error fetching practice log" },
      { status: 500 }
    );
  }
}
