// app/api/movies/favorite/route.ts

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { insertFavorite, deleteFavorite, favoriteExists } from "@/lib/data";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title_id } = await req.json();
  const userEmail = session.user.email;

  try {
    const exists = await favoriteExists(title_id, userEmail);
    if (exists) {
      await deleteFavorite(title_id, userEmail);
    } else {
      await insertFavorite(title_id, userEmail);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error in favorite API:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
