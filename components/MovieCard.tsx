'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { FaRegStar, FaStar, FaRegClock, FaClock } from 'react-icons/fa';
import type { Movie } from '@/lib/types';
import {
  toggleFavorite,
  toggleWatchLater,
  getMovieStatus,
} from '@/app/api/movies/routes';

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatcher, setIsWatcher] = useState(false);

  // Fetch status from Postgres when user logs in and component mounts
  useEffect(() => {
    const fetchStatus = async () => {
      if (!userEmail) return;
      try {
        const status = await getMovieStatus(userEmail, movie.id.toString());
        setIsFavorite(status.isFavorite);
        setIsWatcher(status.isWatcher);
      } catch (error) {
        console.error('Error fetching movie status:', error);
      }
    };
    fetchStatus();
  }, [userEmail, movie.id]);

  const handleFavorite = async () => {
    if (!userEmail) return;
    try {
      await toggleFavorite(userEmail, movie.id.toString(), isFavorite);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Favorite toggle failed:', error);
    }
  };

  const handleWatchLater = async () => {
    if (!userEmail) return;
    try {
      await toggleWatchLater(userEmail, movie.id.toString(), isWatcher);
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
          <button onClick={handleFavorite} aria-label="Toggle Favorite">
            {isFavorite ? (
              <FaStar className="text-yellow-400" />
            ) : (
              <FaRegStar />
            )}
          </button>
          <button onClick={handleWatchLater} aria-label="Toggle Watch Later">
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
