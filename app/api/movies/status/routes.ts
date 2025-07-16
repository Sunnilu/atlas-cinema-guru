//app/api/movies/status/routes.ts
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get('userEmail');
  const movieId = searchParams.get('movieId');

  if (!userEmail || !movieId) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    const [favoriteResult, watchLaterResult] = await Promise.all([
      sql`SELECT 1 FROM favorites WHERE user_id = ${userEmail} AND title_id = ${movieId} LIMIT 1`,
      sql`SELECT 1 FROM watchlater WHERE user_id = ${userEmail} AND title_id = ${movieId} LIMIT 1`,
    ]);

    const isFavorite =
      !!(favoriteResult && favoriteResult.rows && favoriteResult.rows.length > 0);

    const isWatcher =
      !!(watchLaterResult && watchLaterResult.rows && watchLaterResult.rows.length > 0);

    return NextResponse.json({ isFavorite, isWatcher });
  } catch (error) {
    console.error("❌ Error in movie status API route:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
