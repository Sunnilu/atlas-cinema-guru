"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

/**
 * Get whether a movie is favorited or in watch later for a user
 */
export async function getMovieStatus(userEmail: string, movieId: string) {
  try {
    const [favoriteResult, watchLaterResult] = await Promise.all([
      sql`SELECT 1 FROM favorites WHERE user_id = ${userEmail} AND title_id = ${movieId} LIMIT 1`,
      sql`SELECT 1 FROM watchlater WHERE user_id = ${userEmail} AND title_id = ${movieId} LIMIT 1`,
    ]);

    return {
      isFavorite: !!favoriteResult?.rows?.length,
      isWatcher: !!watchLaterResult?.rows?.length,
    };
  } catch (error) {
    console.error("❌ Error fetching movie status:", error);
    throw new Error("Failed to get movie status");
  }
}

/**
 * Toggle favorite status
 */
export async function toggleFavorite(
  userEmail: string,
  movieId: string,
  isCurrentlyFavorited: boolean
) {
  try {
    if (isCurrentlyFavorited) {
      await sql`DELETE FROM favorites WHERE user_id = ${userEmail} AND title_id = ${movieId}`;
    } else {
      await sql`INSERT INTO favorites (user_id, title_id) VALUES (${userEmail}, ${movieId})`;
    }

    revalidatePath("/");
    revalidatePath("/favorites");
  } catch (error) {
    console.error("❌ Error toggling favorite:", error);
    throw new Error("Failed to toggle favorite");
  }
}

/**
 * Toggle watch later status
 */
export async function toggleWatchLater(
  userEmail: string,
  movieId: string,
  isCurrentlyInWatchLater: boolean
) {
  try {
    if (isCurrentlyInWatchLater) {
      await sql`DELETE FROM watchlater WHERE user_id = ${userEmail} AND title_id = ${movieId}`;
    } else {
      await sql`INSERT INTO watchlater (user_id, title_id) VALUES (${userEmail}, ${movieId})`;
    }

    revalidatePath("/");
    revalidatePath("/watch-later");
  } catch (error) {
    console.error("❌ Error toggling watch later:", error);
    throw new Error("Failed to toggle watch later");
  }
}
