"use client"

interface PaginationProps {
  readonly currentPage: number
  readonly totalPages: number
  readonly onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Cria um array com os números das páginas a serem exibidos
  const getPageNumbers = () => {
    const pages = []

    // Sempre mostra a primeira página
    pages.push(1)

    // Adiciona páginas ao redor da página atual
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i)
    }

    // Sempre mostra a última página se houver mais de uma página
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    // Adiciona elipses se necessário
    const result = []
    let prev = 0

    for (const page of pages) {
      if (page - prev > 1) {
        result.push(-prev) // Usa número negativo para representar elipses
      }
      result.push(page)
      prev = page
    }

    return result
  }

  const pageNumbers = getPageNumbers()

  // Função para lidar com a mudança de página e rolar para a seção de categorias
  const handlePageClick = (page: number) => {
    // Chama a função onPageChange passada como prop
    onPageChange(page)
  }

  return (
    <div className="flex justify-center mt-8">
      <nav className="flex items-center space-x-1" aria-label="Pagination">
        {/* Botão Anterior */}
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
            px-3 py-2 rounded-md text-sm font-medium
            ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}
          `}
          aria-label="Página anterior"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Números das Páginas */}
        {pageNumbers.map((pageNumber, index) => {
          if (pageNumber < 0) {
            // Renderiza elipses
            // Use a unique key based on the negative value and the next page number
            const nextPage = pageNumbers[index + 1];
            return (
              <span key={`ellipsis-${pageNumber}-${nextPage}`} className="px-3 py-2 text-gray-500">
                ...
              </span>
            )
          }

          return (
            <button
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              className={`
                px-3 py-2 rounded-md text-sm font-medium
                ${currentPage === pageNumber ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}
              `}
              aria-label={`Página ${pageNumber}`}
              aria-current={currentPage === pageNumber ? "page" : undefined}
            >
              {pageNumber}
            </button>
          )
        })}

        {/* Botão Próximo */}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`
            px-3 py-2 rounded-md text-sm font-medium
            ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}
          `}
          aria-label="Próxima página"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </div>
  )
}
