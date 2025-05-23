import { Suspense } from "react"
import Link from "next/link"
import { fetchEvents } from "@/lib/data"
import { EventCard } from "@/components/events/EventCard"

async function FeaturedEventsList() {
  const events = await fetchEvents()
  const featuredEvents = events.filter((event) => event.isFeatured).slice(0, 3)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {featuredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/events"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          Ver Todos os Eventos
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </>
  )
}

export default function FeaturedEvents() {
  return (
    <Suspense fallback={<FeaturedEventsLoading />}>
      <FeaturedEventsList />
    </Suspense>
  )
}

function FeaturedEventsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map(() => {
        const key = crypto.randomUUID()
        return (
          <div key={key} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="h-48 w-full bg-gray-300 animate-pulse"></div>
            <div className="p-5 space-y-3">
              <div className="h-6 w-3/4 bg-gray-300 animate-pulse rounded"></div>
              <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded"></div>
              <div className="space-y-2">
                <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div className="h-2.5 w-full bg-gray-200 animate-pulse rounded-full"></div>
              <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-10 w-full bg-gray-300 animate-pulse rounded-md"></div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
