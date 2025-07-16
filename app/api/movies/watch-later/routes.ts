// app/api/movies/watch-later/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const { userEmail, movieId, isCurrentlyInWatchLater } = await req.json();

    // Validate input
    if (!userEmail || !movieId) {
      return NextResponse.json({ error: "Missing userEmail or movieId" }, { status: 400 });
    }

    // Toggle logic
    if (isCurrentlyInWatchLater) {
      await sql`DELETE FROM watchlater WHERE user_id = ${userEmail} AND title_id = ${movieId}`;
    } else {
      await sql`INSERT INTO watchlater (user_id, title_id) VALUES (${userEmail}, ${movieId})`;
    }

    // Revalidate client paths
    revalidatePath("/");
    revalidatePath("/watch-later");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Toggle Watch Later Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
