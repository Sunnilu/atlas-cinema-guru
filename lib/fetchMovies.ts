import type { Movie } from "@/lib/types";

/**
 * Fetches all movies from the backend API.
 * Works with both relative path (local) and absolute URL (production).
 */
export async function fetchMovies(): Promise<Movie[]> {
  const baseURL = process.env.NEXT_PUBLIC_API_URL || "";
  const url = `${baseURL}/api/movies`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch movies: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data as Movie[];
  } catch (error) {
    console.error("❌ fetchMovies error:", error);
    return [];
  }
}
