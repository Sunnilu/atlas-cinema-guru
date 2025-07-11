"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      className={`bg-[#000030] text-white transition-all duration-300 ${
        expanded ? "w-64" : "w-16"
      } h-screen relative`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <nav className="flex flex-col items-start p-4 space-y-4">
        <Link href="/" className="hover:underline">
          🏠 {expanded && "Home"}
        </Link>
        <Link href="/favorites" className="hover:underline">
          ❤️ {expanded && "Favorites"}
        </Link>
        <Link href="/watch-later" className="hover:underline">
          ⏰ {expanded && "Watch Later"}
        </Link>

        <div className="mt-8 text-xs text-gray-400">
          {expanded && "Activity Feed"}
        </div>
        {/* Placeholder */}
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
