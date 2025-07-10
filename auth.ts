// auth.ts

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

const config: NextAuthConfig = {
  theme: {
    brandColor: "#1ED2AF",
    logo: "/logo.png",
    buttonText: "#ffffff",
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login", // optional custom login page
  },
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user; // only allow if user is authenticated
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
