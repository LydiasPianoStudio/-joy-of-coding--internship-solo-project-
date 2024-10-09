// pages/api/practice-log/create.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { date, duration, notes } = req.body;
    try {
      const newLog = await prisma.practiceLog.create({
        data: {
          date: new Date(date),
          duration: parseInt(duration),
          notes: notes || "",
        },
      });
      res.status(200).json(newLog);
    } catch (error) {
      res.status(500).json({ error: "Error creating practice log" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
