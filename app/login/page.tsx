"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#00003c] text-white">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Welcome to Cinema Guru</h1>
        <p className="text-sm">Sign in with GitHub to continue</p>
        <button
          onClick={() => signIn("github")}
          className="rounded bg-white px-4 py-2 text-[#00003c] hover:bg-gray-200"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}
