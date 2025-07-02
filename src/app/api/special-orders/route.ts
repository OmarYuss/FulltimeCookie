import { auth } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// Placeholder notification
function notifyAdmin(message: string) {
  // TODO: Implement admin notification
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return new Response('Unauthorized', { status: 401 });

  const data = await req.json();
  const order = await prisma.specialOrder.create({
    data: { ...data, userId: session.user.id }
  });

  notifyAdmin(`New special order: ${order.id}`);
  return Response.json(order, { status: 201 });
} 