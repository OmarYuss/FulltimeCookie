export const resend = {
  emails: {
    send: async ({ to, subject, html }: { to: string, subject: string, html: string }) => {
      // TODO: Integrate with Resend SDK
      console.log(`Email to ${to}: ${subject}`);
      return { success: true };
    }
  }
}; 