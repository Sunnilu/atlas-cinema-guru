'use client';

import type { Movie } from '@/lib/types';
import { insertFavorite, deleteFavorite } from '@/lib/data/firebaseData';

import { useState } from 'react';
import { FaRegStar, FaStar, FaRegClock, FaClock } from 'react-icons/fa';

interface Props {
  movies: Movie[];
}

export default function MovieGrid({ movies }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

function MovieCard({ movie }: { movie: Movie }) {
  const [isFavorite, setIsFavorite] = useState(movie.isFavorite);
  const [isWatcher, setIsWatcher] = useState(movie.isWatcher);

  const toggleFavorite = async () => {
    const method = isFavorite ? 'DELETE' : 'POST';
    await fetch(`/api/favorites/${movie.id}`, { method });
    setIsFavorite(!isFavorite);
  };

  const toggleWatchLater = async () => {
    const method = isWatcher ? 'DELETE' : 'POST';
    await fetch(`/api/watch-later/${movie.id}`, { method });
    setIsWatcher(!isWatcher);
  };

  return (
    <div className="relative group overflow-hidden rounded shadow-lg bg-gray-800 text-white">
      <img src={movie.image} alt={movie.title} className="w-full h-64 object-cover" />

      <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold">{movie.title}</h3>
          <p className="text-sm">{movie.synopsis}</p>
          <p className="text-sm mt-1">
            <strong>Year:</strong> {movie.released}
          </p>
          <p className="text-sm">
            <strong>Genres:</strong> {movie.genres.join(', ')}
          </p>
        </div>

        <div className="flex gap-4 mt-2">
          <button onClick={toggleFavorite}>
            {isFavorite ? <FaStar className="text-yellow-400" /> : <FaRegStar />}
          </button>
          <button onClick={toggleWatchLater}>
            {isWatcher ? <FaClock className="text-blue-300" /> : <FaRegClock />}
          </button>
        </div>
      </div>
    </div>
  );
}
