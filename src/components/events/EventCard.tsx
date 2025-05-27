"use client"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { Event } from "@/lib/types"

interface EventCardProps {
  readonly event: Event
}

export function EventCard({ event }: EventCardProps) {
  const isFullyBooked = event.registeredAttendees >= event.capacity
  const availableSpots = event.capacity - event.registeredAttendees
  const percentFilled = (event.registeredAttendees / event.capacity) * 100

  // Data formatada em português
  const formattedDate = format(new Date(event.date), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
    locale: ptBR,
  })

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Imagem do evento com tag de destaque ou esgotado */}
      <div className="relative">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          width={400}
          height={200}
          className="h-48 w-full object-cover"
          priority={false}
        />

        {/* Tags sobrepostas à imagem */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {isFullyBooked && (
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md">ESGOTADO</span>
          )}

          {event.isFeatured && (
            <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-md">DESTAQUE</span>
          )}

          {availableSpots <= 5 && availableSpots > 0 && (
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md">ÚLTIMAS VAGAS</span>
          )}
        </div>

        {/* Categoria */}
        <div className="absolute bottom-3 right-3">
          <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-md">{event.category}</span>
        </div>
      </div>

      {/* Conteúdo do card */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{event.title}</h3>

        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{event.description}</p>

        <div className="space-y-2 mb-4">
          {/* Data */}
          <div className="flex items-center text-sm text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{formattedDate}</span>
          </div>

          {/* Local */}
          <div className="flex items-center text-sm text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{event.location}</span>
          </div>
        </div>

        {/* Barra de progresso de vagas */}
        <div className="mt-3 mb-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${isFullyBooked ? "bg-red-600" : "bg-blue-600"}`}
              style={{ width: `${Math.min(percentFilled, 100)}%` }}
            ></div>
          </div>
          {/*
            Extraímos a lógica do texto de vagas disponíveis para evitar ternários aninhados no JSX.
          */}
          {(() => {
            let spotsText = "";
            if (isFullyBooked) {
              spotsText = "Evento lotado";
            } else {
              spotsText = `${availableSpots} ${availableSpots === 1 ? "vaga disponível" : "vagas disponíveis"} de ${event.capacity}`;
            }
            return (
              <p className="text-xs text-gray-600 mt-1">
                {spotsText}
              </p>
            );
          })()}
        </div>

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {event.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-md">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Botão de inscrição */}
        <Link
          href={`/events/register?id=${event.id}`}
          className={`
            block w-full text-center py-2 px-4 rounded-md font-medium text-sm
            ${
              isFullyBooked
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }
          `}
        >
          {isFullyBooked ? "Evento Esgotado" : "Inscrever-se"}
        </Link>
      </div>
    </div>
  )
}
