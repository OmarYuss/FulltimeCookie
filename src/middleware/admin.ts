import { auth } from "../app/api/auth/[...nextauth]/route";

export const requireAdmin = (handler: Function) => async (req: Request) => {
  const session = await auth();
  if (session?.user.role !== 'ADMIN') {
    return new Response('Forbidden', { status: 403 });
  }
  return handler(req);
}; 