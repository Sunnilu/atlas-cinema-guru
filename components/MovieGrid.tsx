'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { FaRegStar, FaStar, FaRegClock, FaClock } from 'react-icons/fa';
import type { Movie } from '@/lib/types';
import {
  insertFavorite,
  deleteFavorite,
  insertWatchLater,
  deleteWatchLater,
} from '@/lib/data/firebaseData';

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
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const [isFavorite, setIsFavorite] = useState(movie.isFavorite ?? false);
  const [isWatcher, setIsWatcher] = useState(movie.isWatcher ?? false);

  const toggleFavorite = async () => {
    if (!userEmail) return;
    try {
      if (isFavorite) {
        await deleteFavorite(movie.id.toString(), userEmail);
      } else {
        await insertFavorite(movie.id.toString(), userEmail);
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    }
  };

  const toggleWatchLater = async () => {
    if (!userEmail) return;
    try {
      if (isWatcher) {
        await deleteWatchLater(movie.id.toString(), userEmail);
      } else {
        await insertWatchLater(movie.id.toString(), userEmail);
      }
      setIsWatcher(!isWatcher);
    } catch (err) {
      console.error('Failed to toggle watch later:', err);
    }
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
          <button onClick={toggleFavorite} aria-label="Toggle Favorite">
            {isFavorite ? <FaStar className="text-yellow-400" /> : <FaRegStar />}
          </button>
          <button onClick={toggleWatchLater} aria-label="Toggle Watch Later">
            {isWatcher ? <FaClock className="text-blue-300" /> : <FaRegClock />}
          </button>
        </div>
      </div>
    </div>
  );
}
