// app/api/movies/status/route.ts
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userEmail, movieId } = await req.json();

    if (!userEmail || !movieId) {
      return NextResponse.json(
        { error: "Missing userEmail or movieId" },
        { status: 400 }
      );
    }

    const [favoriteResult, watchLaterResult] = await Promise.all([
      sql`SELECT 1 FROM favorites WHERE user_id = ${userEmail} AND title_id = ${movieId} LIMIT 1`,
      sql`SELECT 1 FROM watchlater WHERE user_id = ${userEmail} AND title_id = ${movieId} LIMIT 1`,
    ]);

    const status = {
      isFavorite: favoriteResult.rows.length > 0,
      isWatcher: watchLaterResult.rows.length > 0,
    };

    return NextResponse.json(status);
  } catch (err) {
    console.error("❌ Error checking movie status:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
