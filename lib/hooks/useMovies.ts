// hooks/useMovies.ts
import { useEffect, useState } from "react";

export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseYear: number;
  genres: string[];
  image: string;
}

interface UseMoviesOptions {
  search?: string;
  minYear?: number;
  maxYear?: number;
  genres?: string[];
  page?: number;
}

export function useMovies({
  search = "",
  minYear,
  maxYear,
  genres = [],
  page = 1,
}: UseMoviesOptions) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (minYear) params.append("minYear", minYear.toString());
    if (maxYear) params.append("maxYear", maxYear.toString());
    if (genres.length > 0) params.append("genres", genres.join(","));
    params.append("page", page.toString());

    const url = `/api/titles?${params.toString()}`;

    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch movies");
        return res.json();
      })
      .then((data) => {
        setMovies(data.results || []);
        setTotalPages(data.totalPages || 1);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching movies");
        setLoading(false);
      });
  }, [search, minYear, maxYear, genres, page]);

  return { movies, totalPages, loading, error };
}
