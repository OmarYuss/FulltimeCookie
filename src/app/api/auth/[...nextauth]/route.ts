import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

// TODO: Replace with actual values or env variables
const clientId = process.env.GOOGLE_CLIENT_ID || "GOOGLE_CLIENT_ID";
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "GOOGLE_CLIENT_SECRET";

// TODO: Implement phone verification logic
async function verifyPhone(phone: string) {
  // Placeholder: Accept any phone for now
  return { id: phone, name: phone, role: "USER" };
}

// TODO: Implement role fetching logic
async function getRole(userId: string) {
  // Placeholder: Always return USER
  return "USER";
}

export const { handlers, auth } = NextAuth({
  providers: [
    Google({ clientId, clientSecret }),
    // Apple({ ... }), // Add Apple provider here
    // Facebook({ ... }), // Add Facebook provider here
    Credentials({
      // Phone auth
      async authorize(credentials) {
        return verifyPhone(credentials.phone);
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.role = await getRole(token.sub);
      return session;
    }
  }
}); 