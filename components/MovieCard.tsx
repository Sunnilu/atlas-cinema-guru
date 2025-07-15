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
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const [isFavorite, setIsFavorite] = useState(movie.isFavorite ?? false);
  const [isWatcher, setIsWatcher] = useState(movie.isWatcher ?? false);

  const handleFavorite = async () => {
    if (!userEmail) return;

    try {
      if (isFavorite) {
        await deleteFavorite(userEmail, movie.id.toString());
      } else {
        await insertFavorite(userEmail, movie.id.toString());
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Favorite toggle failed:', error);
    }
  };

  const handleWatchLater = async () => {
    if (!userEmail) return;

    try {
      if (isWatcher) {
        await deleteWatchLater(userEmail, movie.id.toString());
      } else {
        await insertWatchLater(userEmail, movie.id.toString());
      }
      setIsWatcher(!isWatcher);
    } catch (error) {
      console.error('Watch later toggle failed:', error);
    }
  };

  return (
    <div className="relative group overflow-hidden rounded shadow-lg bg-gray-800 text-white">
      <img
        src={movie.image}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />

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
          <button onClick={handleFavorite}>
            {isFavorite ? (
              <FaStar className="text-yellow-400" />
            ) : (
              <FaRegStar />
            )}
          </button>
          <button onClick={handleWatchLater}>
            {isWatcher ? (
              <FaClock className="text-blue-300" />
            ) : (
              <FaRegClock />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
