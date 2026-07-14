import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="
          h-11 w-11
          rounded-xl
          bg-white/10
          backdrop-blur-xl
          border border-white/20
          flex items-center justify-center
          text-white
          transition
          hover:bg-white/20
          disabled:opacity-40
          disabled:cursor-not-allowed
        "
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`
            h-11
            w-11
            rounded-xl
            transition-all
            duration-300
            backdrop-blur-xl
            border

            ${
              currentPage === page
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 border-transparent text-white shadow-lg"
                : "bg-white/10 border-white/20 text-white hover:bg-white/20"
            }
          `}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="
          h-11 w-11
          rounded-xl
          bg-white/10
          backdrop-blur-xl
          border border-white/20
          flex items-center justify-center
          text-white
          transition
          hover:bg-white/20
          disabled:opacity-40
          disabled:cursor-not-allowed
        "
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
