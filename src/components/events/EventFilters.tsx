"use client"

interface EventFiltersProps {
  onFilterChange: (filter: string) => void
  activeFilter: string
}

export function EventFilters({ onFilterChange, activeFilter }: Readonly<EventFiltersProps>) {
  const filters = [
    { id: "all", label: "Todos" },
    { id: "upcoming", label: "Próximos" },
    { id: "featured", label: "Destaques" },
    { id: "available", label: "Com vagas" },
  ]

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${activeFilter === filter.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
            `}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  )
}
