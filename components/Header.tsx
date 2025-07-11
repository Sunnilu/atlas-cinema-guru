"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#00003c] py-3">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Logo and App Title */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Cinema Guru Logo"
            width={36}
            height={36}
            className="rounded"
          />
          <span className="text-lg font-semibold text-white">
            Cinema Guru
          </span>
        </Link>

        {/* User Info */}
        {session?.user ? (
          <div className="flex items-center gap-4">
            <p className="text-sm text-white">{session.user.email}</p>
            <button
              onClick={() => signOut()}
              className="rounded bg-white px-3 py-1 text-sm font-medium text-[#00003c] hover:bg-gray-200"
            >
              Log out
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
