import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, User as NextAuthUser } from "next-auth";
import bcrypt from "bcryptjs";
import { logUserActivity } from "@/lib/user-activity";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user) return null;
        const ok = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!ok) return null;
        return { id: user.id, email: user.email, name: user.name, role: user.role } as any;
      },
    }),
  ],
  
  session: { strategy: "jwt" },

  pages: { signIn: "/sign-in" },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Log successful login
      if (user?.email) {
        await logUserActivity({
          userId: user.id || "unknown",
          userEmail: user.email,
          userName: user.name || undefined,
          action: "login",
          sessionId: account?.providerAccountId,
        }).catch(console.error);
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = (user as any).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
};
