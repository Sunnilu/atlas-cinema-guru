// components/MovieCard.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { FaRegStar, FaStar, FaRegClock, FaClock } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

import type { Movie } from '@/lib/types';
import {
  toggleFavorite,
  toggleWatchLater,
  getMovieStatus,
} from '@/app/api/movies/routes';

interface Props {
  movie: Movie;
  onActionSuccess?: () => void | Promise<void>; // Properly typed optional callback
}

export default function MovieCard({ movie, onActionSuccess }: Props) {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const router = useRouter();

  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatcher, setIsWatcher] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!userEmail) {
        setIsFavorite(false);
        setIsWatcher(false);
        return;
      }
      try {
        const status = await getMovieStatus(userEmail, movie.id.toString());
        setIsFavorite(status.isFavorite);
        setIsWatcher(status.isWatcher);
      } catch (error) {
        console.error('Error fetching movie status:', error);
        setIsFavorite(false);
        setIsWatcher(false);
      }
    };
    fetchStatus();
  }, [userEmail, movie.id]);

  const handleFavorite = async () => {
    if (!userEmail || isLoading) return;
    setIsLoading(true);
    try {
      setIsFavorite((prev) => !prev);
      await toggleFavorite(userEmail, movie.id.toString(), isFavorite);
      router.refresh();
      await onActionSuccess?.();
    } catch (error) {
      console.error('Favorite toggle failed:', error);
      setIsFavorite((prev) => !prev);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWatchLater = async () => {
    if (!userEmail || isLoading) return;
    setIsLoading(true);
    try {
      setIsWatcher((prev) => !prev);
      await toggleWatchLater(userEmail, movie.id.toString(), isWatcher);
      router.refresh();
      await onActionSuccess?.();
    } catch (error) {
      console.error('Watch later toggle failed:', error);
      setIsWatcher((prev) => !prev);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative group overflow-hidden rounded-xl shadow-lg bg-[#2a3148] border border-[#4A637B]">
      <Image
        src={movie.image}
        alt={movie.title}
        width={300}
        height={450}
        className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
        priority={false}
      />

      <div className="
        absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4
        flex flex-col justify-between opacity-0 group-hover:opacity-100
        transition-opacity duration-300 ease-in-out
      ">
        <div className="flex justify-end gap-x-2">
          <button
            onClick={handleFavorite}
            disabled={isLoading || !userEmail}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <FaStar size={20} className="text-yellow-400" />
            ) : (
              <FaRegStar size={20} />
            )}
          </button>
          <button
            onClick={handleWatchLater}
            disabled={isLoading || !userEmail}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200"
            aria-label={isWatcher ? "Remove from watch later" : "Add to watch later"}
          >
            {isWatcher ? (
              <FaClock size={20} className="text-blue-400" />
            ) : (
              <FaRegClock size={20} />
            )}
          </button>
        </div>

        <div>
          <h3 className="text-white text-lg font-bold mb-1">{movie.title} ({movie.released})</h3>
          <p className="text-gray-300 text-sm mb-2 line-clamp-3">{movie.synopsis}</p>
          <p className="text-gray-400 text-xs italic">
            {movie.genres?.length ? movie.genres.join(', ') : 'N/A Genre'}
          </p>
        </div>
      </div>
    </div>
  );
}
