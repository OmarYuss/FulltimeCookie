import { auth } from "../../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return new Response('Unauthorized', { status: 401 });

  const { status } = await req.json();
  const order = await prisma.specialOrder.update({
    where: { id: params.id },
    data: { status }
  });

  return Response.json(order);
} 