// lib/types.ts
export type Movie = {
  id: number;
  title: string;
  synopsis: string; // changed from description
  released: number; // changed from releaseYear
  genres: string[];
  image: string;
  isFavorite?: boolean;
  isWatcher?: boolean;
};
