// lib/types.ts

// Defines the structure of a Movie object used throughout the application.
export type Movie = {
  id: string; // Unique identifier for the movie
  title: string;
  synopsis: string; // Corrected spelling and type (should be non-null for UI)
  released: number; // Release year
  genres: string[]; // An array of genre names (MovieCard expects this)
  image: string; // URL to the movie poster image (consistent with your previous type)

  // These properties reflect the user's status for the movie
  isFavorite?: boolean; // Indicates if the current user has favorited this movie
  isWatcher?: boolean; // Indicates if the current user has added this to watch later
};

// You might also define a type for the raw data returned directly from your database queries
// before it's transformed into the 'Movie' type for the UI.
// This helps clarify the mapping process.
export type RawFetchedMovie = {
  synopsis: string;
  id: string;
  title: string;
  // This is the property name from your database query results (e.g., from db.selectFrom("titles").selectAll("titles"))
  synposis?: string | null; // Note the 'pos' typo, making it optional/nullable
  released: number;
  // This is the property name from your database query results
  genre?: string | null; // Singular, making it optional/nullable
  image?: string | null; // Image path/URL, making it optional/nullable

  // These come from your favorites/watchlater joins in lib/data.ts
  // They are typically present if the movie is in the list, otherwise undefined.
  // The `lib/data.ts` functions already map to `favorited` and `watchLater`.
  // We need to ensure these are mapped to `isFavorite` and `isWatcher` for the Movie type.
  favorited?: boolean;
  watchLater?: boolean;
};