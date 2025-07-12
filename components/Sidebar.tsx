"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { db } from "@/lib/firebase"; // adjust path as needed
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";

interface Activity {
  id: string;
  user: string;
  title: string;
  timestamp: any;
}

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const userEmail = session?.user?.email ?? null;
    if (!userEmail) return;

    const fetchActivities = async () => {
      const q = query(
        collection(db, "activities"),
        where("user", "==", userEmail),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      const items: Activity[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Activity, "id">),
      }));
      setActivities(items);
    };

    fetchActivities();
  }, [session]);

  return (
    <aside
      className={`transition-all duration-300 h-screen relative ${
        expanded ? "w-64 bg-[#84e0cb]" : "w-16 bg-[#62b8a3]"
      } text-[#00003c]`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <nav className="flex flex-col items-start p-4 space-y-4">
        <Link href="/" className="hover:underline font-medium transition-colors">
          🏠 {expanded && "Home"}
        </Link>
        <Link href="/favorites" className="hover:underline font-medium transition-colors">
          ❤️ {expanded && "Favorites"}
        </Link>
        <Link href="/watch-later" className="hover:underline font-medium transition-colors">
          ⏰ {expanded && "Watch Later"}
        </Link>

        <div className="mt-8 text-xs font-semibold text-[#00003c]/70">
          {expanded && "Activity Feed"}
        </div>

        {expanded && activities.length > 0 && (
          <ul className="text-sm mt-2 space-y-1">
            {activities.map((log) => (
              <li key={log.id}>• {log.title}</li>
            ))}
          </ul>
        )}
      </nav>
    </aside>
  );
}
