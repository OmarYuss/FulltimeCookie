import { requireAdmin } from "../../../../middleware/admin";
import { prisma } from "../../../../lib/prisma";

export const GET = requireAdmin(async (req: Request) => {
  const data = await prisma.$queryRaw`SELECT DATE(createdAt) AS date, SUM(total) FROM "Order" GROUP BY date`;
  return Response.json(data);
}); 