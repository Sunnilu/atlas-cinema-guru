// components/MovieFilters.tsx
'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface MovieFiltersProps {
  genresList: string[];
}

export default function MovieFilters({ genresList }: MovieFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [title, setTitle] = useState(searchParams.get('title') || '');
  const [minYear, setMinYear] = useState(searchParams.get('minYear') || '');
  const [maxYear, setMaxYear] = useState(searchParams.get('maxYear') || '');
  const [selectedGenres, setSelectedGenres] = useState<string[]>(() => {
    const genresParam = searchParams.get('genres');
    return genresParam ? genresParam.split(',') : [];
  });

  useEffect(() => {
    setTitle(searchParams.get('title') || '');
    setMinYear(searchParams.get('minYear') || '');
    setMaxYear(searchParams.get('maxYear') || '');
    setSelectedGenres(() => {
      const genresParam = searchParams.get('genres');
      return genresParam ? genresParam.split(',') : [];
    });
  }, [searchParams]);

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (title) {
      params.set('title', title);
    } else {
      params.delete('title');
    }

    const currentMinYear = parseInt(minYear);
    const defaultMinYear = 1900;
    if (!isNaN(currentMinYear) && currentMinYear !== defaultMinYear) {
      params.set('minYear', minYear);
    } else {
      params.delete('minYear');
    }

    const currentMaxYear = parseInt(maxYear);
    const defaultMaxYear = new Date().getFullYear();
    if (!isNaN(currentMaxYear) && currentMaxYear !== defaultMaxYear) {
      params.set('maxYear', maxYear);
    } else {
      params.delete('maxYear');
    }

    params.delete('genres');
    selectedGenres.forEach((g) => params.append('genres', g));

    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push(pathname);
    setTitle('');
    setMinYear('');
    setMaxYear('');
    setSelectedGenres([]);
  };


  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-5 p-4 rounded-lg shadow-md text-white bg-[#2a3148]">
      {/* Left side: Search and Dates */}
      <div className="flex flex-col gap-4 md:w-1/2 lg:w-2/5">
        <div className="flex flex-col gap-2">
          <label htmlFor="title-search" className="text-sm font-medium">Search Title</label>
          <input
            id="title-search"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 rounded-lg bg-[#1A2038] border border-[#4A637B] text-white focus:outline-none focus:ring-2 focus:ring-[#00C896]"
            placeholder="e.g., The Ghost"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-2 w-1/2">
            <label htmlFor="min-year" className="text-sm font-medium">Min Year</label>
            <input
              id="min-year"
              type="number"
              value={minYear}
              onChange={(e) => setMinYear(e.target.value)}
              className="p-3 rounded-lg bg-[#1A2038] border border-[#4A637B] text-white focus:outline-none focus:ring-2 focus:ring-[#00C896]"
              placeholder="1900"
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <label htmlFor="max-year" className="text-sm font-medium">Max Year</label>
            <input
              id="max-year"
              type="number"
              value={maxYear}
              onChange={(e) => setMaxYear(e.target.value)}
              className="p-3 rounded-lg bg-[#1A2038] border border-[#4A637B] text-white focus:outline-none focus:ring-2 focus:ring-[#00C896]"
              placeholder={new Date().getFullYear().toString()}
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-2">
          <button
            onClick={applyFilters}
            className="flex-grow px-5 py-2 bg-[#00C896] text-[#1A2038] font-bold rounded-lg hover:bg-[#00b380] transition-colors duration-200"
          >
            Apply Filters
          </button>
          <button
            onClick={clearFilters}
            className="flex-grow px-5 py-2 bg-[#4A637B] text-white font-semibold rounded-lg hover:bg-[#5A738B] transition-colors duration-200"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Right side: Genres */}
      <div className="flex flex-col gap-3 md:w-1/2 lg:w-3/5"> {/* Removed md:text-right from here */}
        <h3 className="text-lg font-semibold mb-2">Genres:</h3> {/* Added mb-2 for spacing */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 justify-items-start md:justify-items-end"> {/* Use grid for 5 columns */}
          {genresList.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreToggle(genre)}
              className={`px-4 py-2 rounded-full border border-gray-600 text-sm font-medium whitespace-nowrap transition-colors duration-200 w-full text-center
                ${selectedGenres.includes(genre) ? 'bg-[#00C896] text-[#1A2038] border-[#00C896]' : 'bg-gray-700 hover:bg-gray-600 text-white'}`
              }
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}