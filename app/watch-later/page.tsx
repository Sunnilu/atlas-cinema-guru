// app/watch-later/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import MovieCard from "@/components/MovieCard";
import PaginationControls from "@/components/PaginationControls";
import { fetchWatchLaters } from "@/lib/data";
import type { Movie } from "@/lib/types";

interface WatchLaterPageProps {
  searchParams?: {
    page?: string;
  };
}

export default async function WatchLaterPage({ searchParams }: WatchLaterPageProps) {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  const page = parseInt(searchParams?.page || "1", 10);
  const movies: Movie[] = await fetchWatchLaters(page, session.user.email);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Watch Later</h1>

      {movies.length === 0 ? (
        <p className="text-gray-300">No movies saved to Watch Later.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <PaginationControls
            currentPage={page}
            hasNextPage={movies.length >= 8}
          />
        </>
      )}
    </main>
  );
}
