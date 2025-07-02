import { auth } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") return new Response('Forbidden', { status: 403 });

  const { priceOffer } = await req.json();
  const order = await prisma.specialOrder.update({
    where: { id: params.id },
    data: { priceOffer }
  });

  return Response.json(order);
} 