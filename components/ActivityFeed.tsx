// components/ActivityFeed.tsx
"use client";
import { useEffect, useState } from "react";

export default function ActivityFeed() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch("/api/activities") // replace with your actual API route
      .then((res) => res.json())
      .then(setActivities);
  }, []);

  return (
    <div className="mt-4 p-2 text-sm">
      <h2 className="font-bold mb-2">Latest Activities</h2>
      <ul className="space-y-1">
        {activities.map((activity: any, idx) => (
          <li key={idx} className="text-white/80">
            {activity.timestamp} <br />
            {activity.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
