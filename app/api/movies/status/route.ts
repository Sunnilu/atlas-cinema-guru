import { auth } from "@/auth";
import { favoriteExists, watchLaterExists } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/movies/status?userEmail=...&movieId=...
 */
export const GET = auth(async (req: NextRequest) => {
  const url = req.nextUrl;
  const userEmail = url.searchParams.get("userEmail");
  const movieId = url.searchParams.get("movieId");

  if (!userEmail || !movieId) {
    return NextResponse.json(
      { error: "Missing userEmail or movieId" },
      { status: 400 }
    );
  }

  const isFavorite = await favoriteExists(movieId, userEmail);
  const isWatcher = await watchLaterExists(movieId, userEmail);

  return NextResponse.json({ isFavorite, isWatcher });
});
