import { PaginationProps } from "./types";

/* Implementa a páginação da seção 'Comunidades em Destaque' */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center mt-8 space-x-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md ${
          currentPage === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-[var(--pagination-bttn-bg)] duration-250 ease-in-out text-white hover:bg-[#102890]"
        }`}
      >
        Anterior
      </button>
      <span className="text-gray-400">
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-[var(--pagination-bttn-bg)] duration-250 ease-in-out text-white hover:bg-[#102890]"
        }`}
      >
        Próximo
      </button>
    </div>
  );
}
