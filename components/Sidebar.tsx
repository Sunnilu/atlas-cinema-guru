"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "@/lib/firebase"; // ensure this points to your Firestore instance

type Activity = {
  title: string;
  timestamp: {
    seconds: number;
  };
  type: "favorite" | "watch-later";
};

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email ?? null;

  useEffect(() => {
    if (!userEmail) return;

    const fetchActivities = async () => {
      try {
        const q = query(
          collection(db, "activities"),
          where("user", "==", userEmail),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        const data: Activity[] = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data() as Activity);
        });
        setActivities(data);
      } catch (error) {
        console.error("❌ Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, [userEmail]);

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
          📁 {expanded && "Home"}
        </Link>
        <Link href="/favorites" className="hover:underline font-medium transition-colors">
          ⭐ {expanded && "Favorites"}
        </Link>
        <Link href="/watch-later" className="hover:underline font-medium transition-colors">
          🕒 {expanded && "Watch Later"}
        </Link>

        {expanded && (
          <div className="mt-8">
            <h3 className="text-center text-base font-bold">Latest Activities</h3>
            <ul className="text-sm mt-2 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
              {activities.length > 0 ? (
                activities.map((log, index) => (
                  <li key={index}>
                    <div className="text-xs">
                      {new Date(log.timestamp.seconds * 1000).toLocaleString()}
                    </div>
                    <div>
                      {log.type === "watch-later" ? (
                        <>
                          Added <strong>{log.title}</strong> to watch later
                        </>
                      ) : (
                        <>
                          Favorited <strong>{log.title}</strong>
                        </>
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-xs italic text-gray-600">No recent activity</li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </aside>
  );
}
