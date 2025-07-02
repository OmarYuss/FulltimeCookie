import { resend } from "./resend"; // Placeholder, implement or import actual resend instance
import { socketServer } from "./socket"; // Placeholder, implement or import actual socket.io server
import { prisma } from "./prisma";

export const notifyUser = async (userId: string, event: string) => {
  // Fetch user email from DB
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;

  switch(event) {
    case 'OFFER_UPDATED':
      if (user.email) {
        await resend.emails.send({
          to: user.email,
          subject: 'Price offer updated',
          html: `<p>Your special order has new offer!</p>`
        });
      }
      socketServer.emit(`user:${userId}`, event);
      break;
    // Add more cases as needed
  }
}; 