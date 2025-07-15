'use client';

import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import type { Movie } from '@/lib/types';

interface MovieGridProps {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  const [movieData, setMovieData] = useState<Movie[]>([]);

  useEffect(() => {
    setMovieData(movies);
  }, [movies]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {movieData.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
