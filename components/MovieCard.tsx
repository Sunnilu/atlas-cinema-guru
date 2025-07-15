// components/MovieCard.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image'; // Import next/image for optimized images
import { useSession } from 'next-auth/react';
import { FaRegStar, FaStar, FaRegClock, FaClock } from 'react-icons/fa'; // Ensure react-icons is installed: npm install react-icons
import { useRouter } from 'next/navigation'; // Import useRouter for router.refresh()

import type { Movie } from '@/lib/types';
import {
  toggleFavorite,
  toggleWatchLater,
  getMovieStatus,
} from '@/app/api/movies/routes';

interface Props {
  movie: Movie;
  // This callback is crucial for parent components (like FavoritesPage)
  // to re-fetch their data after an action.
  onActionSuccess?: () => void;
}

export default function MovieCard({ movie, onActionSuccess }: Props) {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const router = useRouter(); // Initialize router

  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatcher, setIsWatcher] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // To prevent multiple rapid clicks

  // Fetch status from Postgres when user logs in and component mounts/movie.id changes
  useEffect(() => {
    const fetchStatus = async () => {
      if (!userEmail) {
        setIsFavorite(false); // Reset if no user
        setIsWatcher(false);
        return;
      }
      try {
        const status = await getMovieStatus(userEmail, movie.id.toString());
        setIsFavorite(status.isFavorite);
        setIsWatcher(status.isWatcher);
      } catch (error) {
        console.error('Error fetching movie status:', error);
        // Fallback to default if error
        setIsFavorite(false);
        setIsWatcher(false);
      }
    };
    fetchStatus();
  }, [userEmail, movie.id]); // Dependency on userEmail and movie.id

  const handleFavorite = async () => {
    if (!userEmail || isLoading) return; // Prevent action if not logged in or already loading
    setIsLoading(true); // Start loading

    try {
      // Optimistic UI update: Toggle state immediately
      setIsFavorite((prev) => !prev);
      await toggleFavorite(userEmail, movie.id.toString(), isFavorite); // isFavorite here is the *old* state

      // After successful toggle, revalidate the current path to update movie lists
      router.refresh();
      // Call optional success callback for parent components
      onActionSuccess?.();
    } catch (error) {
      console.error('Favorite toggle failed:', error);
      // Revert optimistic update on error
      setIsFavorite((prev) => !prev);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const handleWatchLater = async () => {
    if (!userEmail || isLoading) return; // Prevent action if not logged in or already loading
    setIsLoading(true); // Start loading

    try {
      // Optimistic UI update: Toggle state immediately
      setIsWatcher((prev) => !prev);
      await toggleWatchLater(userEmail, movie.id.toString(), isWatcher); // isWatcher here is the *old* state

      // After successful toggle, revalidate the current path to update movie lists
      router.refresh();
      // Call optional success callback for parent components
      onActionSuccess?.();
    } catch (error) {
      console.error('Watch later toggle failed:', error);
      // Revert optimistic update on error
      setIsWatcher((prev) => !prev);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="relative group overflow-hidden rounded-xl shadow-lg bg-[#2a3148] border border-[#4A637B]">
      {/* Movie Image */}
      <Image
        src={movie.image}
        alt={movie.title}
        width={300} // Estimated width based on common grid layouts, adjust as needed
        height={450} // Estimated height for a typical movie poster aspect ratio
        className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
        priority={false} // Set to true if this card is above the fold for LCP. False otherwise.
        // If image is often missing, consider adding `fill` and `sizes` or a fallback.
      />

      {/* Hover Overlay */}
      <div className="
        absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4
        flex flex-col justify-between opacity-0 group-hover:opacity-100
        transition-opacity duration-300 ease-in-out
      ">
        {/* Top section for buttons, visible on hover */}
        <div className="flex justify-end gap-x-2"> {/* Align buttons to top-right */}
            <button
              onClick={handleFavorite}
              disabled={isLoading || !userEmail} // Disable if loading or no user
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
              disabled={isLoading || !userEmail} // Disable if loading or no user
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

        {/* Movie Info at the bottom of the overlay */}
        <div>
          <h3 className="text-white text-lg font-bold mb-1">{movie.title} ({movie.released})</h3>
          <p className="text-gray-300 text-sm mb-2 line-clamp-3">{movie.synopsis}</p>
          <p className="text-gray-400 text-xs italic">
            {movie.genres && movie.genres.length > 0 ? movie.genres.join(', ') : 'N/A Genre'}
          </p>
        </div>
      </div>
    </div>
  );
}
