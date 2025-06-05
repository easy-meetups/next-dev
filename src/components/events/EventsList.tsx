"use client"

import { useState, useEffect, useRef } from "react"
import { EventCard } from "@/components/events/EventCard"
import { Pagination } from "@/components/ui/Pagination"
import { EventFilters } from "@/components/events/EventFilters"
import { fetchEvents } from "../../lib/data"
import type { Event } from "@/lib/types"

export default function EventsList() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeFilter, setActiveFilter] = useState("all")
  const filtersContainerRef = useRef<HTMLDivElement>(null)
  const eventsContainerRef = useRef<HTMLDivElement>(null)
  const [animate, setAnimate] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false) // 👈 Novo estado
  const [error, setError] = useState<string | null>(null)

  const eventsPerPage = 9

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchEvents()
        setEvents(data)
      } catch (error) {
        console.error("Failed to fetch events:", error)
        setError("Erro ao carregar eventos.")
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  const getFilteredEvents = (): Event[] => {
    const today = new Date()

    switch (activeFilter) {
      case "upcoming":
        return events.filter((event) => new Date(event.date) > today)
      case "featured":
        return events.filter((event) => event.isFeatured)
      case "available":
        return events.filter((event) => event.registeredAttendees < event.capacity)
      default:
        return events
    }
  }

  const filteredEvents = getFilteredEvents()
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage)
  const currentEvents = filteredEvents.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage)

  const handlePageChange = (page: number) => {
    setHasInteracted(true) // 👈 Marca que o usuário interagiu com a paginação
    setCurrentPage(page)
    setAnimate(false)

    setTimeout(() => {
      setAnimate(true)
    }, 100)
  }

  useEffect(() => {
    if (hasInteracted && eventsContainerRef.current) {
      eventsContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }, [currentPage, hasInteracted]) // 👈 Executa o scroll APENAS se for interação do usuário

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    setCurrentPage(1)
    setHasInteracted(false) // 👈 Resetamos o scroll automático ao mudar filtro
  }

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true)
    }, 100)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <span>Carregando eventos...</span>
      </div>
    )
  }

  if (error) {
    return <p className="text-red-600">{error}</p>
  }

  return (
    <>
      {/* Barra de filtros */}
      <div ref={filtersContainerRef}>
        <EventFilters onFilterChange={handleFilterChange} activeFilter={activeFilter} />
      </div>

      {/* Resultados */}
      <div className="mb-6">
        <p className="text-gray-600">
          Mostrando {Math.min(filteredEvents.length, (currentPage - 1) * eventsPerPage + 1)}-
          {Math.min(filteredEvents.length, currentPage * eventsPerPage)} de {filteredEvents.length} eventos
        </p>
      </div>

      {/* Lista de eventos */}
      {filteredEvents.length === 0 ? (
        <div className="bg-blue-50 text-blue-800 p-8 rounded-lg text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto mb-4 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
          <h3 className="text-xl font-semibold mb-2">Nenhum evento encontrado</h3>
          <p>Não encontramos eventos que correspondam aos critérios selecionados.</p>
        </div>
      ) : (
        <div ref={eventsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentEvents.map((event, index) => (
            <div
              key={event.id}
              className={`transform transition-all duration-500 ${
                animate ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </>
  )
}
