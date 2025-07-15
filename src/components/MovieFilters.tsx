'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface MovieFiltersProps {
  genresList: string[];
}

export default function MovieFilters({ genresList }: MovieFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [title, setTitle] = useState(searchParams.get('title') || '');
  const [minYear, setMinYear] = useState(searchParams.get('minYear') || '');
  const [maxYear, setMaxYear] = useState(searchParams.get('maxYear') || '');
  const [genres, setGenres] = useState<string[]>(
    searchParams.getAll('genres') || []
  );

  const handleGenreToggle = (genre: string) => {
    setGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (title) params.set('title', title);
    if (minYear) params.set('minYear', minYear);
    if (maxYear) params.set('maxYear', maxYear);
    genres.forEach((g) => params.append('genres', g));
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="space-y-4 bg-gray-900 p-4 rounded-lg shadow-md text-white">
      <div className="flex flex-col gap-2">
        <label>Search Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 rounded bg-gray-700"
        />
      </div>

      <div className="flex gap-4">
        <div>
          <label>Min Year</label>
          <input
            type="number"
            value={minYear}
            onChange={(e) => setMinYear(e.target.value)}
            className="p-2 rounded bg-gray-700"
          />
        </div>
        <div>
          <label>Max Year</label>
          <input
            type="number"
            value={maxYear}
            onChange={(e) => setMaxYear(e.target.value)}
            className="p-2 rounded bg-gray-700"
          />
        </div>
      </div>

      <div>
        <label>Genres</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {genresList.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreToggle(genre)}
              className={`px-3 py-1 rounded border ${
                genres.includes(genre) ? 'bg-blue-500' : 'bg-gray-700'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
      >
        Apply Filters
      </button>
    </div>
  );
}
