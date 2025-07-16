// app/api/movies/status/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get('userEmail');
  const movieId = searchParams.get('movieId');

  if (!userEmail || !movieId) {
    return NextResponse.json({ error: 'Missing userEmail or movieId' }, { status: 400 });
  }

  try {
    const [favoriteResult, watchLaterResult] = await Promise.all([
      sql`SELECT 1 FROM favorites WHERE user_id = ${userEmail} AND title_id = ${movieId} LIMIT 1`,
      sql`SELECT 1 FROM watchlater WHERE user_id = ${userEmail} AND title_id = ${movieId} LIMIT 1`,
    ]);

    return NextResponse.json({
      isFavorite: favoriteResult.rows.length > 0,
      isWatcher: watchLaterResult.rows.length > 0,
    });
  } catch (error) {
    console.error('❌ Error fetching movie status:', error);
    return NextResponse.json({ error: 'Failed to fetch movie status' }, { status: 500 });
  }
}
