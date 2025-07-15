// app/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import MovieGrid from "@/components/MovieGrid";
import MovieFilters from '@components/MovieFilters';
import PaginationControls from '@/components/PaginationControls';

import { fetchTitles, fetchGenres } from "@/lib/data";

interface SearchParams {
  searchParams?: {
    title?: string;
    minYear?: string;
    maxYear?: string;
    genres?: string | string[];
    page?: string;
  };
}

export default async function Page({ searchParams }: SearchParams) {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const query = searchParams?.title || "";
  const minYear = parseInt(searchParams?.minYear || "1900");
  const maxYear = parseInt(searchParams?.maxYear || "2025");
  const page = parseInt(searchParams?.page || "1");
  const rawGenres = searchParams?.genres;
  const genres = Array.isArray(rawGenres)
    ? rawGenres
    : rawGenres
    ? [rawGenres]
    : [];

  const [movies, genresList] = await Promise.all([
    fetchTitles(page, minYear, maxYear, query, genres, session.user.email),
    fetchGenres(),
  ]);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Welcome, {session.user.name}!</h1>

      <MovieFilters genresList={genresList} />

      <MovieGrid
        movies={movies.map((movie) => ({
          ...movie,
          synopsis: movie.synposis ?? "",
          genres: movie.genre ? [movie.genre] : [],
          image: movie.image ?? "",
        }))}
      />

      <PaginationControls currentPage={page} hasNextPage={movies.length > 0} />
    </main>
  );
}
