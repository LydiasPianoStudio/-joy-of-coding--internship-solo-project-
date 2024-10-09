// pages/api/practice-log/delete.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { id } = req.body;
    try {
      await prisma.practiceLog.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({ message: "Practice log deleted" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting practice log" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
