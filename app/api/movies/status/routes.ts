import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userEmail = req.nextUrl.searchParams.get("userEmail");
  const movieId = req.nextUrl.searchParams.get("movieId");

  if (!userEmail || !movieId) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const [favoriteResult, watchLaterResult] = await Promise.all([
      sql`SELECT 1 FROM favorites WHERE user_id = ${userEmail} AND title_id = ${movieId} LIMIT 1`,
      sql`SELECT 1 FROM watchlater WHERE user_id = ${userEmail} AND title_id = ${movieId} LIMIT 1`,
    ]);

    return NextResponse.json({
      isFavorite: (favoriteResult?.rowCount ?? 0) > 0,
      isWatcher: (watchLaterResult?.rowCount ?? 0) > 0,
    });
  } catch (error) {
    console.error("Error checking movie status:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
