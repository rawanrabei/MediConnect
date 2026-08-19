import { cn } from '../../../utils/cn';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const btnClass =
    'min-h-10 min-w-10 cursor-pointer rounded-md border-[1.5px] border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 font-semibold text-[var(--text-primary)] hover:border-[var(--primary-300)] hover:bg-[var(--primary-50)] disabled:cursor-not-allowed disabled:opacity-45';

  return (
    <nav className="mt-8 flex flex-wrap justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        className={btnClass}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={cn(
            btnClass,
            currentPage === page && 'border-[var(--primary-600)] bg-[var(--primary-600)] text-white hover:bg-[var(--primary-600)]',
          )}
          onClick={() => onPageChange(page)}
          aria-label={`Page ${page}`}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        className={btnClass}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
