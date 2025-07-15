// components/PaginationControls.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

interface PaginationControlsProps {
  currentPage: number;
  hasNextPage: boolean;
}

export default function PaginationControls({ currentPage, hasNextPage }: PaginationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageLink = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    return `/?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center gap-x-5 gap-y-3 mt-10 flex-wrap">
      {/* Previous Button */}
      {/* Show "Previous" button only if currentPage > 1 */}
      <button
        onClick={() => router.push(createPageLink(currentPage - 1))}
        disabled={currentPage === 1} // Disabled prop to control visual state
        className={`
          w-[292px] h-[83px]
          rounded-lg
          text-xl font-bold
          transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00C896] focus:ring-offset-[#1A2038]
          ${currentPage === 1
            ? 'bg-gray-700 text-gray-400 border border-gray-600 cursor-not-allowed' // Disabled style
            : 'bg-[#00C896] text-[#1A2038] border border-[#00C896] hover:bg-[#00b380]' // Active style
          }
        `}
      >
        Previous
      </button>

      {/* Page Number Indicator */}
      <span className="text-[#E0E0E0] text-xl font-bold">Page {currentPage}</span>

      {/* Next Button */}
      {/* Show "Next" button only if hasNextPage is true */}
      <button
        onClick={() => router.push(createPageLink(currentPage + 1))}
        disabled={!hasNextPage} // Disabled prop to control visual state
        className={`
          w-[292px] h-[83px]
          rounded-lg
          text-xl font-bold
          transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00C896] focus:ring-offset-[#1A2038]
          ${!hasNextPage
            ? 'bg-gray-700 text-gray-400 border border-gray-600 cursor-not-allowed' // Disabled style
            : 'bg-[#00C896] text-[#1A2038] border border-[#00C896] hover:bg-[#00b380]' // Active style
          }
        `}
      >
        Next
      </button>
    </div>
  );
}