import { auth } from "@/auth";
import { fetchActivities } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import type { Session } from "next-auth";

// GET /api/activities
export const GET = auth(async (req: NextRequest & { auth: Session | null }) => {
  const params = req.nextUrl.searchParams;
  const page = params.get("page") ? Number(params.get("page")) : 1;

  const session = req.auth;

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized - Not logged in" },
      { status: 401 }
    );
  }

  try {
    const activities = await fetchActivities(page, session.user.email);

    // ✅ Return array directly for frontend compatibility
    return NextResponse.json(activities);
  } catch (error) {
    console.error("❌ Failed to fetch activities:", error);
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 }
    );
  }
});
