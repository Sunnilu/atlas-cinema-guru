import { auth } from "@/auth";
import { insertWatchLater, deleteWatchLater, watchLaterExists } from "@/lib/data";
import { NextResponse } from "next/server";

// POST /api/movies/watchlater
export const POST = auth(async (req) => {
  const session = req.auth;

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title_id } = await req.json();
    const userEmail = session.user.email;

    const exists = await watchLaterExists(title_id, userEmail);

    if (exists) {
      await deleteWatchLater(title_id, userEmail);
      return NextResponse.json({ message: "Removed from watch later" });
    } else {
      await insertWatchLater(title_id, userEmail);
      return NextResponse.json({ message: "Added to watch later" });
    }
  } catch (error) {
    console.error("❌ Error toggling watch later:", error);
    return NextResponse.json(
      { error: "Failed to toggle watch later status" },
      { status: 500 }
    );
  }
});
