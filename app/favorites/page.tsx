// app/favorites/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import MovieGrid from "@/components/MovieGrid"; // ✅ use consistent path
import PaginationControls from "@/components/PaginationControls";
import { Movie, RawFetchedMovie } from "@/lib/types";
import { fetchFavorites } from "@/lib/data";
import { revalidatePath } from "next/cache";

interface SearchParams {
  searchParams?: {
    page?: string;
  };
}

type MovieActionCallback = () => void | Promise<void>;

export default async function FavoritesPage({ searchParams }: SearchParams) {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  const page = parseInt(searchParams?.page || "1");
  const userEmail = session.user.email;

  const rawMovies: RawFetchedMovie[] = await fetchFavorites(page, userEmail);

  const movies: Movie[] = rawMovies.map((rawMovie) => ({
    id: rawMovie.id,
    title: rawMovie.title,
    synopsis: rawMovie.synposis ?? "", // 🛠️ spelling fixed to match RawFetchedMovie
    released: rawMovie.released,
    genres: rawMovie.genre ? [rawMovie.genre] : [],
    image: rawMovie.image || "/placeholder-movie.jpg",
    isFavorite: rawMovie.favorited,
    isWatcher: rawMovie.watchLater,
  }));

  const handleMovieActionSuccess: MovieActionCallback = async () => {
    "use server";
    revalidatePath("/favorites");
  };

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Your Favorite Movies
      </h1>

      <MovieGrid
        movies={movies}
        onActionSuccess={handleMovieActionSuccess} // ✅ ensures updates after actions
      />

      <PaginationControls
        currentPage={page}
        hasNextPage={rawMovies.length === 6}
      />
    </main>
  );
}
