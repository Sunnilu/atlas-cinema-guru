// components/PaginationControls.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
// No need to import 'usePathname' explicitly, as createPageLink handles the path directly.
import React from 'react'; // React is implicitly used by JSX, but good practice to import.

interface PaginationControlsProps {
  currentPage: number;
  hasNextPage: boolean;
}

export default function PaginationControls({ currentPage, hasNextPage }: PaginationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Your existing logic for creating the page link
  const createPageLink = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    // Assuming the base path is always '/' for pagination on the main page
    return `/?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center gap-x-5 gap-y-3 mt-10 flex-wrap"> {/* Adjusted gap and added flex-wrap */}
      {/* Previous Button */}
      {/* Show "Previous" button only if currentPage > 1 */}
      {currentPage > 1 && (
        <button
          onClick={() => router.push(createPageLink(currentPage - 1))}
          className="
            w-[292px] h-[83px]
            bg-[#2C3E50] text-[#E0E0E0]
            border border-[#4A637B]
            rounded-lg
            text-xl font-bold
            hover:bg-[#34495E] hover:border-[#5A738B]
            transition-colors duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-[#00C896]
          "
        >
          Previous
        </button>
      )}

      {/* Page Number Indicator (optional, but useful for user context) */}
      <span className="text-[#E0E0E0] text-xl font-bold">Page {currentPage}</span>

      {/* Next Button */}
      {/* Show "Next" button only if hasNextPage is true */}
      {hasNextPage && (
        <button
          onClick={() => router.push(createPageLink(currentPage + 1))}
          className="
            w-[292px] h-[83px]
            bg-[#2C3E50] text-[#E0E0E0]
            border border-[#4A637B]
            rounded-lg
            text-xl font-bold
            hover:bg-[#34495E] hover:border-[#5A738B]
            transition-colors duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-[#00C896]
          "
        >
          Next
        </button>
      )}
    </div>
  );
}