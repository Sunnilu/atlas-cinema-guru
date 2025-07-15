import type { Movie } from "@/lib/types";

// You can add pagination support later if needed
export async function fetchMovies(): Promise<Movie[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/movies`);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch movies: ${res.statusText}`);
    }

    const data = await res.json();
    return data as Movie[];
  } catch (error) {
    console.error("❌ fetchMovies error:", error);
    return [];
  }
}
