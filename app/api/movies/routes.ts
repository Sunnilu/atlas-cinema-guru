'use server';

import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

// Schema for movie data
const movieSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  image: z.string().url(),
  synopsis: z.string().min(1),
  released: z.string(),
  genres: z.array(z.string())
});

// Schema for movie status
const movieStatusSchema = z.object({
  isFavorite: z.boolean(),
  isWatcher: z.boolean()
});

/**
 * Get whether a movie is favorited or in watch later for a user
 */
export async function getMovieStatus(userEmail: string, movieId: string) {
  try {
    const [favoriteResult, watchLaterResult] = await Promise.all([
      sql`SELECT 1 FROM favorites WHERE user_id = ${userEmail} AND title_id = ${movieId} LIMIT 1`,
      sql`SELECT 1 FROM watchlater WHERE user_id = ${userEmail} AND title_id = ${movieId} LIMIT 1`
    ]);

    return {
      isFavorite: (favoriteResult.rowCount ?? 0) > 0,
      isWatcher: (watchLaterResult.rowCount ?? 0) > 0
    };
  } catch (error) {
    console.error('Error getting movie status:', error);
    throw new Error('Failed to get movie status');
  }
}

/**
 * Toggle a movie as favorite
 */
export async function toggleFavorite(userEmail: string, movieId: string, isFavorite: boolean) {
  try {
    if (isFavorite) {
      await sql`DELETE FROM favorites WHERE user_id = ${userEmail} AND title_id = ${movieId}`;
    } else {
      await sql`INSERT INTO favorites (user_id, title_id) VALUES (${userEmail}, ${movieId}) ON CONFLICT DO NOTHING`;
    }
    revalidatePath('/api/movies/status');
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw new Error('Failed to toggle favorite');
  }
}

/**
 * Toggle a movie in watch later
 */
export async function toggleWatchLater(userEmail: string, movieId: string, isWatcher: boolean) {
  try {
    if (isWatcher) {
      await sql`DELETE FROM watchlater WHERE user_id = ${userEmail} AND title_id = ${movieId}`;
    } else {
      await sql`INSERT INTO watchlater (user_id, title_id) VALUES (${userEmail}, ${movieId}) ON CONFLICT DO NOTHING`;
    }
    revalidatePath('/api/movies/status');
  } catch (error) {
    console.error('Error toggling watch later:', error);
    throw new Error('Failed to toggle watch later');
  }
}
