// app/api/movies/status/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getMovieStatus } from "@/lib/movieActions";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get("userEmail");
  const movieId = searchParams.get("movieId");

  if (!userEmail || !movieId) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const status = await getMovieStatus(userEmail, movieId);
    return NextResponse.json(status);
  } catch (error) {
    console.error("❌ Failed to fetch movie status:", error);
    return NextResponse.json({ error: "Failed to fetch movie status" }, { status: 500 });
  }
}
