import { ChevronLeft, ChevronRight } from "lucide-react";
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
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
      className="flex items-center bg-white px-3 py-2 shadow-[0_-2px_6px_rgba(0,0,0,0.08)]"
      role="navigation"
      aria-label="Table pagination"
    >
      <div className="flex items-center gap-2 text-sm text-gray-600">
        {canGoPrev ? (
          <button
            type="button"
            onClick={handlePrev}
            className="flex items-center justify-center rounded-md py-1 px-3 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            aria-label="Previous page"
          >
            <KeyboardBackspaceOutlinedIcon style={{ height: 16, width: 16 }} aria-hidden />
          </button>
        ) : (
          <span
            className="flex items-center justify-center rounded-md py-1 px-3 border border-gray-200 text-gray-400 cursor-not-allowed"
            aria-disabled="true"
            aria-label="Previous page"
          >
            <KeyboardBackspaceOutlinedIcon style={{ height: 16, width: 16 }} aria-hidden />
          </span>
        )}
        <span>
          {page} of {totalPages}
        </span>
        {canGoNext ? (
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center justify-center rounded-md py-1 px-3 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            aria-label="Next page"
          >
            <EastOutlinedIcon style={{ height: 16, width: 16 }} aria-hidden />
          </button>
        ) : (
          <span
            className="flex items-center justify-center rounded-md py-1 px-3 border border-gray-200 text-gray-400 cursor-not-allowed"
            aria-disabled="true"
            aria-label="Next page"
          >
            <EastOutlinedIcon style={{ height: 16, width: 16 }} aria-hidden />
          </span>
        )}
        <span className="ml-1">{total} rows</span>
      </div>
    </div>
  );
}
