// components/MovieGridWrapper.tsx
'use client';

import type { Movie } from "@/lib/types";
import MovieGrid from "@/components/MovieGrid";

interface Props {
  movies: Movie[];
}

export default function MovieGridWrapper({ movies }: Props) {
  return <MovieGrid movies={movies} />;
}
