export type Movie = {
  id: string; // Firebase uses string IDs
  title: string;
  synopsis: string;
  released: number;
  genres: string[];
  image: string;
  isFavorite?: boolean;
  isWatcher?: boolean;
};
