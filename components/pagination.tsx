import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  onPageChange?: (newPage: number) => void;
}

export function Pagination({
  page,
  totalPages,
  total,
  onPageChange,
}: PaginationProps) {
  const handlePrev = () => {
    if (page > 1 && onPageChange) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages && onPageChange) {
      onPageChange(page + 1);
    }
  };

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  return (
    <div
      className="flex items-center border-t border-gray-200 bg-white px-4 py-3"
      role="navigation"
      aria-label="Table pagination"
    >
      <div className="flex items-center gap-2 text-sm text-gray-600">
        {canGoPrev ? (
          <button
            type="button"
            onClick={handlePrev}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
        ) : (
          <span
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
            aria-disabled="true"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </span>
        )}
        <span>
          {page} of {totalPages}
        </span>
        {canGoNext ? (
          <button
            type="button"
            onClick={handleNext}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        ) : (
          <span
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
            aria-disabled="true"
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </span>
        )}
        <span className="ml-2">{total} rows</span>
      </div>
    </div>
  );
}
