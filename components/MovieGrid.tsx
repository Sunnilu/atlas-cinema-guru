'use client';

import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import type { Movie } from '@/lib/types';

interface MovieGridProps {
  movies: Movie[];
  onActionSuccess?: () => void; // ✅ allow parent to pass callback
}

export default function MovieGrid({ movies, onActionSuccess }: MovieGridProps) {
  const [movieData, setMovieData] = useState<Movie[]>([]);

  useEffect(() => {
    setMovieData(movies);
  }, [movies]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {movieData.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onActionSuccess={onActionSuccess} // ✅ forward the callback
        />
      ))}
    </div>
  );
}
