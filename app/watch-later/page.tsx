// app/watch-later/page.tsx

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PaginationControls from "@/components/PaginationControls";
import { fetchWatchLaters } from "@/lib/data";
import type { Movie } from "@/lib/types";
import MovieGridWrapper from "@/components/MovieGridWrapper";

interface WatchLaterPageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function WatchLaterPage({ searchParams }: WatchLaterPageProps) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const pageParam = Array.isArray(searchParams?.page)
    ? searchParams?.page[0]
    : searchParams?.page;

  const page = parseInt(pageParam || "1", 10);

  const movies: Movie[] = await fetchWatchLaters(page, session.user.email);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Watch Later</h1>

      {movies.length === 0 ? (
        <p className="text-gray-300">No movies saved to Watch Later.</p>
      ) : (
        <>
          <MovieGridWrapper movies={movies} />

          <PaginationControls
            currentPage={page}
            hasNextPage={movies.length >= 8}
          />
        </>
      )}
    </main>
  );
}
