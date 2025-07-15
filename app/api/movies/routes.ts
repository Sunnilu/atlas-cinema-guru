'use server';

import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

// ✅ Schema for movie data (not currently used but useful for validation later)
const movieSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  image: z.string().url(),
  synopsis: z.string().min(1),
  released: z.string(),
  genres: z.array(z.string())
});

// ✅ Schema for movie status return
const movieStatusSchema = z.object({
  isFavorite: z.boolean(),
  isWatcher: z.boolean()
});

/**
 * ✅ Check whether a movie is favorited or in watch later for a user
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
 * ✅ Toggle favorite status for a user and movie
 */
export async function toggleFavorite(userEmail: string, movieId: string, isCurrentlyFavorited: boolean) {
  try {
    if (isCurrentlyFavorited) {
      await sql`DELETE FROM favorites WHERE user_id = ${userEmail} AND title_id = ${movieId}`;
    } else {
      await sql`INSERT INTO favorites (user_id, title_id) VALUES (${userEmail}, ${movieId})`;
    }

    revalidatePath('/');
    revalidatePath('/favorites');
  } catch (error) {
    console.error('Error toggling favorite status:', error);
    throw new Error('Failed to toggle favorite');
  }
}

/**
 * ✅ Toggle watch later status for a user and movie
 */
export async function toggleWatchLater(userEmail: string, movieId: string, isCurrentlyInWatchLater: boolean) {
  try {
    if (isCurrentlyInWatchLater) {
      await sql`DELETE FROM watchlater WHERE user_id = ${userEmail} AND title_id = ${movieId}`;
    } else {
      await sql`INSERT INTO watchlater (user_id, title_id) VALUES (${userEmail}, ${movieId})`;
    }

    revalidatePath('/');
    revalidatePath('/watch-later');
  } catch (error) {
    console.error('Error toggling watch later status:', error);
    throw new Error('Failed to toggle watch later');
  }
}
