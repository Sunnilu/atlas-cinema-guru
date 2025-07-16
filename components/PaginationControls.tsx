'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

interface PaginationControlsProps {
  currentPage: number;
  hasNextPage: boolean;
  basePath?: string; // ✅ Optional basePath for dynamic routing
}

export default function PaginationControls({
  currentPage,
  hasNextPage,
  basePath = '/', // ✅ Defaults to root if not provided
}: PaginationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageLink = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    return `${basePath}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center gap-x-5 gap-y-3 mt-10 flex-wrap">
      {/* Previous Button */}
      <button
        onClick={() => router.push(createPageLink(currentPage - 1))}
        disabled={currentPage === 1}
        className={`
          w-[292px] h-[83px]
          rounded-lg
          text-xl font-bold
          transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00C896] focus:ring-offset-[#1A2038]
          ${currentPage === 1
            ? 'bg-gray-700 text-gray-400 border border-gray-600 cursor-not-allowed'
            : 'bg-[#00C896] text-[#1A2038] border border-[#00C896] hover:bg-[#00b380]'
          }
        `}
      >
        Previous
      </button>

      {/* Page Number */}
      <span className="text-[#E0E0E0] text-xl font-bold">Page {currentPage}</span>

      {/* Next Button */}
      <button
        onClick={() => router.push(createPageLink(currentPage + 1))}
        disabled={!hasNextPage}
        className={`
          w-[292px] h-[83px]
          rounded-lg
          text-xl font-bold
          transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00C896] focus:ring-offset-[#1A2038]
          ${!hasNextPage
            ? 'bg-gray-700 text-gray-400 border border-gray-600 cursor-not-allowed'
            : 'bg-[#00C896] text-[#1A2038] border border-[#00C896] hover:bg-[#00b380]'
          }
        `}
      >
        Next
      </button>
    </div>
  );
}
