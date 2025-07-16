"use client";
import { useEffect, useState } from "react";

type Activity = {
  id: string;
  title: string;
  timestamp: string;
  activity: "FAVORITED" | "WATCH_LATER";
};

export default function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch("/api/activities");
        if (!res.ok) throw new Error("Failed to fetch activities");
        const data = await res.json();
        setActivities(data);
      } catch (err) {
        console.error("Error loading activities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="mt-4 p-2 text-sm text-white">
      <h2 className="font-bold mb-2 text-lg">Latest Activities</h2>

      {loading ? (
        <p className="italic text-gray-400">Loading...</p>
      ) : activities.length === 0 ? (
        <p className="italic text-gray-500">No recent activity.</p>
      ) : (
        <ul className="space-y-2">
          {activities.map((activity) => (
            <li key={activity.id} className="text-white/90">
              <div className="text-xs text-gray-400">
                {new Date(activity.timestamp).toLocaleString()}
              </div>
              <div>
                {activity.activity === "WATCH_LATER" ? (
                  <>Added <strong>{activity.title}</strong> to Watch Later</>
                ) : (
                  <>Favorited <strong>{activity.title}</strong></>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
