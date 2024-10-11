import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    try {
      const user = await prisma.user.create({
        data: { email, password },
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "User creation failed" });
    }
  }
}
