"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      className={`transition-all duration-300 h-screen relative ${
        expanded ? "w-64 bg-[#84e0cb]" : "w-16 bg-[#62b8a3]"
      } text-[#00003c]`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <nav className="flex flex-col items-start p-4 space-y-4">
        <Link
          href="/"
          className="hover:underline font-medium transition-colors"
        >
          🏠 {expanded && "Home"}
        </Link>
        <Link
          href="/favorites"
          className="hover:underline font-medium transition-colors"
        >
          ❤️ {expanded && "Favorites"}
        </Link>
        <Link
          href="/watch-later"
          className="hover:underline font-medium transition-colors"
        >
          ⏰ {expanded && "Watch Later"}
        </Link>

        <div className="mt-8 text-xs font-semibold text-[#00003c]/70">
          {expanded && "Activity Feed"}
        </div>
        {expanded && (
          <ul className="text-sm mt-2 space-y-1">
            <li>• Logged in</li>
            <li>• Viewed a title</li>
          </ul>
        )}
      </nav>
    </aside>
  );
}
