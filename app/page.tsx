// app/page.tsx

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import MovieGrid from "@/components/MovieGrid";
import MovieFilters from "@/src/components/MovieFilters";
import PaginationControls from "@/components/PaginationControls";
import { fetchTitles, fetchGenres } from "@/lib/data";
import type { Movie } from "@/lib/types";

interface PageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function Page({ searchParams = {} }: PageProps) {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  const title = typeof searchParams.title === "string" ? searchParams.title : "";
  const minYear = parseInt(
    typeof searchParams.minYear === "string" ? searchParams.minYear : "1900"
  );
  const maxYear = parseInt(
    typeof searchParams.maxYear === "string" ? searchParams.maxYear : "2025"
  );
  const page = parseInt(
    typeof searchParams.page === "string" ? searchParams.page : "1"
  );

  const rawGenres = searchParams.genres;
  const genres =
    typeof rawGenres === "string"
      ? [rawGenres]
      : Array.isArray(rawGenres)
      ? rawGenres
      : [];

  const [movies, genresList] = await Promise.all([
    fetchTitles(page, minYear, maxYear, title, genres, session.user.email),
    fetchGenres(),
  ]);

  const normalizedMovies: Movie[] = movies.map((movie) => ({
    ...movie,
    synopsis: movie.synopsis ?? "",
    genres: movie.genres ?? [],
    image: movie.image ?? `/images/${movie.id}.webp`,
  }));

  return (
    <main className="p-4">
      <h1 className="text-2xl font-semibold mb-4">
        Welcome, {session.user.name}!
      </h1>

      <MovieFilters genresList={genresList} />

      <MovieGrid movies={normalizedMovies} />

      <PaginationControls
        currentPage={page}
        hasNextPage={movies.length > 0}
      />
    </main>
  );
}
