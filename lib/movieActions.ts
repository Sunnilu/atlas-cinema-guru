// lib/movieActions.ts

export async function toggleFavorite(userEmail: string, movieId: string, isCurrentlyFavorited: boolean) {
  const res = await fetch("/api/movies/favorite", {
    method: "POST",
    body: JSON.stringify({ userEmail, movieId, isCurrentlyFavorited }),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to toggle favorite");
}

export async function toggleWatchLater(userEmail: string, movieId: string, isCurrentlyInWatchLater: boolean) {
  const res = await fetch("/api/movies/watch-later", {
    method: "POST",
    body: JSON.stringify({ userEmail, movieId, isCurrentlyInWatchLater }),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to toggle watch later");
}

export async function getMovieStatus(userEmail: string, movieId: string) {
  const res = await fetch(`/api/movies/status?userEmail=${userEmail}&movieId=${movieId}`);
  if (!res.ok) throw new Error("Failed to get movie status");
  return await res.json(); // Should return { isFavorite: boolean, isWatcher: boolean }
}
