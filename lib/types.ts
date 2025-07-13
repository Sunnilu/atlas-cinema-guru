export type Movie = {
  id: number;
  title: string;
  description: string;
  releaseYear: number;
  genres: string[];
  image: string;
  isFavorite?: boolean;
  isWatcher?: boolean;
};
