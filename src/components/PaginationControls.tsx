'use client';

import { useRouter, useSearchParams } from 'next/navigation';

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
    <div className="flex justify-center items-center gap-4 mt-6">
      {currentPage > 1 && (
        <button
          onClick={() => router.push(createPageLink(currentPage - 1))}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          Previous
        </button>
      )}
      {hasNextPage && (
        <button
          onClick={() => router.push(createPageLink(currentPage + 1))}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          Next
        </button>
      )}
    </div>
  );
}
