// pages/api/practice-log/update.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { id, date, duration, notes } = req.body;
    try {
      const updatedLog = await prisma.practiceLog.update({
        where: { id: parseInt(id) },
        data: {
          date: new Date(date),
          duration: parseInt(duration),
          notes: notes || "",
        },
      });
      res.status(200).json(updatedLog);
    } catch (error) {
      res.status(500).json({ error: "Error updating practice log" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
