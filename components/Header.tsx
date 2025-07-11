"use client";

import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#00003c] py-3">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Cinema Guru Logo"
            width={36}
            height={36}
            className="rounded"
          />
          <span className="text-lg font-bold tracking-tight text-white">
            Cinema Guru
          </span>
        </Link>

        {/* User Info (only when logged in) */}
        {session?.user && (
          <div className="flex items-center gap-4">
            <p className="hidden text-sm text-white sm:inline">
              {session.user.email}
            </p>
            <button
              onClick={() => signOut()}
              className="rounded-md bg-white px-4 py-1.5 text-sm font-semibold text-[#00003c] transition hover:bg-gray-200"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
