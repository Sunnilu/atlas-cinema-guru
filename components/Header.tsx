"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";

interface HeaderProps {
  user: {
    email?: string | null;
  };
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-[#00002a] shadow-md">
      <div className="flex items-center space-x-2">
        <Image src="/logo.png" alt="Logo" width={32} height={32} />
        <span className="text-xl font-bold">Cinema Guru</span>
      </div>
      <div className="flex items-center space-x-4">
        {user?.email && <span className="text-sm">{user.email}</span>}
        <button
          onClick={() => signOut()}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
