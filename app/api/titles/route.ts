import { auth } from "@/auth";
import { fetchGenres, fetchTitles } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const session = await auth(); // ✅ manually call auth()

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = session.user.email;

  const params = req.nextUrl.searchParams;
  const page = Number(params.get("page") || "1");
  const minYear = Number(params.get("minYear") || "0");
  const maxYear = Number(params.get("maxYear") || new Date().getFullYear().toString());
  const query = params.get("search") ?? ""; // match the frontend
  const genres = params.get("genres")?.split(",") ?? (await fetchGenres());

  try {
    const results = await fetchTitles(page, minYear, maxYear, query, genres, email);

    return NextResponse.json({
      results,
      totalPages: 1, // Adjust if you implement real pagination
    });
  } catch (err) {
    console.error("Error fetching titles:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
