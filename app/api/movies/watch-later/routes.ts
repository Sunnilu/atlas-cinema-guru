// app/api/movies/watch-later/routes.ts
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const { userEmail, movieId, isCurrentlyInWatchLater } = await req.json();

  if (!userEmail || !movieId) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  try {
    if (isCurrentlyInWatchLater) {
      await sql`DELETE FROM watchlater WHERE user_id = ${userEmail} AND title_id = ${movieId}`;
    } else {
      await sql`INSERT INTO watchlater (user_id, title_id) VALUES (${userEmail}, ${movieId})`;
    }
    revalidatePath("/watch-later");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to toggle watch later" }, { status: 500 });
  }
}
