import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const { userEmail, movieId, isCurrentlyFavorited } = await req.json();

  if (!userEmail || !movieId) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  try {
    if (isCurrentlyFavorited) {
      await sql`DELETE FROM favorites WHERE user_id = ${userEmail} AND title_id = ${movieId}`;
    } else {
      await sql`INSERT INTO favorites (user_id, title_id) VALUES (${userEmail}, ${movieId})`;
    }
    revalidatePath("/favorites");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to toggle favorite" }, { status: 500 });
  }
}
