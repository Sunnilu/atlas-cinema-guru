"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="group-hover:w-64 w-16 h-screen bg-[#000030] text-white transition-all duration-300 flex flex-col items-start p-4 space-y-4">
      {/* Nav Links */}
      <Link href="/" className="flex items-center gap-2">
        <span>🏠</span>
        <span className="hidden group-hover:inline text-sm">Home</span>
      </Link>
      <Link href="/favorites" className="flex items-center gap-2">
        <span>❤️</span>
        <span className="hidden group-hover:inline text-sm">Favorites</span>
      </Link>
      <Link href="/watch-later" className="flex items-center gap-2">
        <span>⏰</span>
        <span className="hidden group-hover:inline text-sm">Watch Later</span>
      </Link>

      {/* Activity Feed */}
      <div className="mt-8 w-full hidden group-hover:block">
        <h2 className="text-xs font-semibold text-gray-300 mb-2">Latest Activities</h2>
        <ul className="text-sm space-y-1">
          <li>10/2/2024, 5:11 PM – Added <strong>Before the Dawn</strong></li>
          <li>10/1/2024, 4:00 PM – Favorited <strong>Beyond the Veil</strong></li>
          <li>10/1/2024, 4:00 PM – Favorited <strong>Beneath the Surface</strong></li>
        </ul>
      </div>
    </aside>
  );
}
