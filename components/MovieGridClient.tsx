// components/MovieGridClient.tsx
'use client';

import { useRouter } from 'next/navigation';
import MovieCard from './MovieCard';
import type { Movie } from '@/lib/types';

export default function MovieGridClient({ movies }: { movies: Movie[] }) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onActionSuccess={() => router.refresh()}
        />
      ))}
    </div>
  );
}
