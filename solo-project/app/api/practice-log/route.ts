// app/api/practice-log/route.ts

import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// **POST** - Create a new practice log entry
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Ensure required fields are provided
    if (!body.date || !body.duration || body.notes === undefined) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Ensure date is in the correct format (DateTime in Prisma)
    const newLog = await prisma.practiceLog.create({
      data: {
        date: new Date(body.date), // Ensure date is converted to Date object
        duration: body.duration,
        notes: body.notes || null, // Allow notes to be optional
      },
    });

    return NextResponse.json(
      { message: "Practice log created!", log: newLog },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating practice log:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// **GET** - Retrieve all practice log entries
// Fetch all logs
export async function GET() {
  try {
    const logs = await prisma.practiceLog.findMany(); // Fetch all logs
    return NextResponse.json(logs, { status: 200 });
  } catch (error) {
    console.error("Error retrieving practice logs:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// PUT /api/practice-log/[id]
// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const id = parseInt(params.id, 10); // Get the ID from params
//   const body = await req.json();

//   try {
//     const updatedLog = await prisma.practiceLog.update({
//       where: { id: id },
//       data: {
//         duration: body.duration,
//         notes: body.notes,
//       },
//     });
//     return NextResponse.json(updatedLog, { status: 200 });
//   } catch (error) {
//     console.error("Error updating practice log:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

// **DELETE** - Delete a practice log entry by ID
// export async function DELETE(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");

//     if (!id) {
//       return NextResponse.json({ message: "Missing log ID" }, { status: 400 });
//     }

//     const deletedLog = await prisma.practiceLog.delete({
//       where: { id: parseInt(id) },
//     });

//     return NextResponse.json(
//       { message: "Practice log deleted!", log: deletedLog },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error deleting practice log:", error);
//     return NextResponse.json(
//       {
//         message: "Server error",
//         error: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 }
//     );
//   }
// }
