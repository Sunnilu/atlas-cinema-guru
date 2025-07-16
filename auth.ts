// auth.ts

import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

export const config: NextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET, // ✅ Required for secure sessions

  theme: {
    brandColor: "#1ED2AF",
    logo: "/logo.png",
    buttonText: "#ffffff",
  },

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    jwt({ token, trigger, session, account }) {
      if (trigger === "update" && session?.user?.name) {
        token.name = session.user.name;
      }
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);

// TypeScript module augmentation
declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
