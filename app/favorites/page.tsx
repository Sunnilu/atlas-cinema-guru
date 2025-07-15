// app/favorites/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import MovieGrid from "@/components/MovieGrid";
import PaginationControls from "@/components/PaginationControls";
import { fetchFavorites } from "@/lib/data";
import { revalidatePath } from "next/cache";
import type { Movie, RawFetchedMovie } from "@/lib/types";

interface FavoritesPageProps {
  searchParams?: {
    page?: string;
  };
}

export default async function FavoritesPage({ searchParams }: FavoritesPageProps) {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  const page = parseInt(searchParams?.page || "1");
  const userEmail = session.user.email;

  // Fetch raw favorite movies
  const rawMovies: RawFetchedMovie[] = await fetchFavorites(page, userEmail);

  // Normalize into Movie[]
  const movies: Movie[] = rawMovies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    synopsis: movie.synopsis ?? "", // ✅ spelling fixed
    released: movie.released,
    genres: movie.genre ? [movie.genre] : [],
    image: movie.image || "/placeholder-movie.jpg",
    isFavorite: movie.favorited ?? true,
    isWatcher: movie.watchLater ?? false,
  }));

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Favorites
      </h1>

      <MovieGrid
        movies={movies}
        onActionSuccess={async () => {
          "use server";
          revalidatePath("/favorites");
        }}
      />

      <PaginationControls
        currentPage={page}
        hasNextPage={rawMovies.length === 6} // Assumes 6 per page
      />
    </main>
  );
}
