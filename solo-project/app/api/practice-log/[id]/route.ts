import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // Initialize Prisma Client

// GET a specific practice log by ID
export async function GET() {
  try {
    const logs = await prisma.practiceLog.findMany(); // Fetch all logs
    return NextResponse.json(logs, { status: 200 });
  } catch (error) {
    console.error("Error retrieving practice logs:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// PUT (update) a specific practice log by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10); // Get the ID from params
  const body = await req.json();

  try {
    const updatedLog = await prisma.practiceLog.update({
      where: { id: id },
      data: {
        duration: body.duration,
        notes: body.notes,
      },
    });
    return NextResponse.json(updatedLog, { status: 200 });
  } catch (error) {
    console.error("Error updating practice log:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// DELETE a specific practice log by ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Missing log ID" }, { status: 400 });
    }

    const deletedLog = await prisma.practiceLog.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(
      { message: "Practice log deleted!", log: deletedLog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting practice log:", error);
    return NextResponse.json(
      {
        message: "Server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
