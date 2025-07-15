'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const defaultGenres = [
  'Action',
  'Comedy',
  'Drama',
  'Horror',
  'Romance',
  'Sci-Fi',
  'Thriller',
];

export default function MovieFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [title, setTitle] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');
  const [genres, setGenres] = useState<string[]>([]);

  // Initialize filters from URL on mount
  useEffect(() => {
    setTitle(searchParams.get('title') || '');
    setMinYear(searchParams.get('minYear') || '');
    setMaxYear(searchParams.get('maxYear') || '');
    setGenres(searchParams.getAll('genres') || []);
  }, [searchParams]);

  const handleGenreToggle = (genre: string) => {
    setGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (title.trim()) params.set('title', title.trim());
    if (minYear) params.set('minYear', minYear);
    if (maxYear) params.set('maxYear', maxYear);
    genres.forEach((g) => params.append('genres', g));

    params.set('page', '1'); // Reset pagination when filters change
    router.push(`/?${params.toString()}`);
  };

  const clearFilters = () => {
    setTitle('');
    setMinYear('');
    setMaxYear('');
    setGenres([]);
    router.push('/?page=1');
  };

  return (
    <div className="space-y-4 bg-gray-900 p-4 rounded-lg shadow-md text-white">
      <div className="flex flex-col gap-2">
        <label htmlFor="title">Search Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter movie title..."
          className="p-2 rounded bg-gray-700"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col">
          <label htmlFor="minYear">Min Year</label>
          <input
            id="minYear"
            type="number"
            value={minYear}
            onChange={(e) => setMinYear(e.target.value)}
            className="p-2 rounded bg-gray-700"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="maxYear">Max Year</label>
          <input
            id="maxYear"
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
          {defaultGenres.map((genre) => (
            <button
              key={genre}
              type="button"
              onClick={() => handleGenreToggle(genre)}
              className={`px-3 py-1 rounded border text-sm ${
                genres.includes(genre)
                  ? 'bg-blue-500 border-blue-300'
                  : 'bg-gray-700 border-gray-500'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={applyFilters}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
        >
          Apply Filters
        </button>
        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
