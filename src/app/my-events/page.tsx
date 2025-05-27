'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format, differenceInDays, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Tipos
interface RegisteredEvent {
  id: string;
  eventId: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  category: string;
  organizer: string;
  image: string;
  registrationDate: Date;
  attendees: number;
}

// Modal de Confirmação para remover evento
const ConfirmationModal: React.FC<{
  isOpen: boolean;
  event: RegisteredEvent | null;
  onClose: () => void;
  onConfirm: () => void;
}> = ({ isOpen, event, onClose, onConfirm }) => {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <button
          type="button"
          className="fixed inset-0 transition-opacity"
          onClick={onClose}
          aria-label="Fechar modal"
          style={{ outline: 'none', border: 'none', background: 'transparent', padding: 0, margin: 0 }}
        >
          <span className="absolute inset-0 bg-gray-500 opacity-75"></span>
        </button>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Cancelar inscrição
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Tem certeza que deseja cancelar sua inscrição no evento <span className="font-semibold">{event.title}</span>? Esta ação não poderá ser desfeita.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onConfirm}
            >
              Cancelar inscrição
            </button>
            <button 
              type="button" 
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal de Detalhes do Evento
const EventDetailsModal: React.FC<{
  isOpen: boolean;
  event: RegisteredEvent | null;
  onClose: () => void;
}> = ({ isOpen, event, onClose }) => {
  if (!isOpen || !event) return null;

  const eventDate = format(event.date, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
    locale: ptBR,
  });
  
  const registrationDate = format(event.registrationDate, "dd 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  });
  
  const daysUntilEvent = differenceInDays(event.date, new Date());
  const eventPassed = isBefore(event.date, new Date());

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <button
          type="button"
          className="fixed inset-0 transition-opacity"
          style={{ background: 'transparent', border: 'solid', padding: 0, margin: 0 }}
          aria-label="Fechar modal"
          tabIndex={0}
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClose();
            }
          }}
        >
          <span className="absolute inset-0 bg-gray-500 opacity-75"></span>
        </button>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <button 
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="bg-white p-6">
            <div className="relative h-48 w-full mb-4">
              <Image 
                src={event.image} 
                alt={event.title} 
                fill
                className="object-cover rounded-lg"
              />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
            
            <div className="flex items-center mb-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${eventPassed ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'}`}>
                {eventPassed ? 'Evento Passado' : 'Evento Futuro'}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 ml-2">
                {event.category}
              </span>
            </div>
            
            <p className="text-gray-700 mb-6">{event.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Detalhes do Evento</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mt-0.5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <span className="block font-medium text-gray-900">Data e Hora</span>
                      <span className="block text-gray-600">{eventDate}</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mt-0.5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <span className="block font-medium text-gray-900">Local</span>
                      <span className="block text-gray-600">{event.location}</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mt-0.5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <div>
                      <span className="block font-medium text-gray-900">Organizador</span>
                      <span className="block text-gray-600">{event.organizer}</span>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Detalhes da Inscrição</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mt-0.5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <div>
                      <span className="block font-medium text-gray-900">Inscrição realizada em</span>
                      <span className="block text-gray-600">{registrationDate}</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mt-0.5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div>
                      <span className="block font-medium text-gray-900">Participantes</span>
                      <span className="block text-gray-600">{event.attendees} {event.attendees === 1 ? 'inscrição' : 'inscrições'}</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mt-0.5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <span className="block font-medium text-gray-900">Status</span>
                      <span className="block text-gray-600">
                        {(() => {
                          if (eventPassed) {
                            return 'Este evento já aconteceu';
                          }
                          const dayLabel = daysUntilEvent === 1 ? 'dia' : 'dias';
                          return `Faltam ${daysUntilEvent} ${dayLabel}`;
                        })()}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200 flex justify-between">
              <a 
                href={`https://maps.google.com/?q=${encodeURIComponent(event.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Ver local no mapa
              </a>
              
              <Link
                href={`/events/chat?id=${event.eventId}`} 
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Acessar chat do evento
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de Card de Evento
const EventCard: React.FC<{
  event: RegisteredEvent;
  onRemove: (event: RegisteredEvent) => void;
  onViewDetails: (event: RegisteredEvent) => void;
}> = ({ event, onRemove, onViewDetails }) => {
  const daysUntilEvent = differenceInDays(event.date, new Date());
  const isPastEvent = daysUntilEvent < 0;
  
  // Data formatada em português
  const formattedDate = format(event.date, "dd 'de' MMMM", {
    locale: ptBR,
  });
  
  // Extract background color for days remaining
  let daysBgColor = 'bg-green-600';
  if (daysUntilEvent <= 3) {
    daysBgColor = 'bg-red-600';
  } else if (daysUntilEvent <= 7) {
    daysBgColor = 'bg-orange-500';
  }

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all ${isPastEvent ? 'opacity-70' : 'hover:shadow-lg'}`}>
      <div className="relative">
        <Image 
          src={event.image} 
          alt={event.title}
          width={400}
          height={200}
          className="h-40 w-full object-cover"
        />
        
        {/* Dias restantes */}
        <div className="absolute top-3 right-3">
          {isPastEvent ? (
            <span className="bg-gray-700 text-white text-xs font-bold px-2 py-1 rounded-md">
              FINALIZADO
            </span>
          ) : (
            <span className={`text-white text-xs font-bold px-2 py-1 rounded-md ${daysBgColor}`}>
              {(() => {
                if (daysUntilEvent === 0) return 'HOJE';
                if (daysUntilEvent === 1) return 'AMANHÃ';
                return `FALTAM ${daysUntilEvent} DIAS`;
              })()}
            </span>
          )}
        </div>
        
        {/* Categoria */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-md">
            {event.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">{event.title}</h3>
        
        <div className="space-y-2 mb-4">
          {/* Data */}
          <div className="flex items-center text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formattedDate}</span>
          </div>
          
          {/* Local */}
          <div className="flex items-center text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{event.location}</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onViewDetails(event)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors"
          >
            Detalhes
          </button>
          
          <button
            onClick={() => onRemove(event)}
            className="flex items-center justify-center bg-white hover:bg-red-50 text-red-600 border border-red-300 py-2 px-3 rounded-md text-sm font-medium transition-colors"
            disabled={isPastEvent}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente de Filtros
const EventFilters: React.FC<{
  onFilterChange: (filter: string) => void;
  activeFilter: string;
  eventCount: { upcoming: number; past: number; all: number };
}> = ({ onFilterChange, activeFilter, eventCount }) => {
  const filters = [
    { id: 'all', label: `Todos (${eventCount.all})` },
    { id: 'upcoming', label: `Próximos (${eventCount.upcoming})` },
    { id: 'past', label: `Passados (${eventCount.past})` },
  ];
  
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${activeFilter === filter.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Página Meus Eventos
export default function MyEventsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [modalEvent, setModalEvent] = useState<RegisteredEvent | null>(null);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
  // Dados simulados de eventos inscritos
  const [myEvents, setMyEvents] = useState<RegisteredEvent[]>([
    {
      id: 'registration-1',
      eventId: '1',
      title: 'React Summit Brasil 2025',
      description: 'O maior evento de React da América Latina, reunindo especialistas nacionais e internacionais para compartilhar conhecimento sobre React, React Native e todo o ecossistema.',
      date: new Date('2025-03-15T09:00:00'),
      location: 'São Paulo, SP - Centro de Convenções',
      category: 'Frontend',
      organizer: 'TechConf Brasil',
      image: '/images/events/react-summit.png',
      registrationDate: new Date('2024-12-10'),
      attendees: 478
    },
    {
      id: 'registration-2',
      eventId: '8',
      title: 'Data Science Week',
      description: 'Semana inteira dedicada à ciência de dados, inteligência artificial, machine learning e analytics.',
      date: new Date('2025-04-07T08:00:00'),
      location: 'Florianópolis, SC - Tech Hub',
      category: 'Data',
      organizer: 'Data Science Academy',
      image: '/images/events/data-science.jpg',
      registrationDate: new Date('2024-12-05'),
      attendees: 380
    },
    {
      id: 'registration-3',
      eventId: '13',
      title: 'TechLeaders Summit',
      description: 'Evento exclusivo para CTOs, gerentes de tecnologia e líderes técnicos discutirem tendências e desafios.',
      date: new Date('2025-04-18T08:30:00'),
      location: 'Rio de Janeiro, RJ - Hotel Copacabana Palace',
      category: 'Liderança',
      organizer: 'Tech Leadership Network',
      image: '/images/events/techleaders.jpg',
      registrationDate: new Date('2024-11-20'),
      attendees: 185
    },
    {
      id: 'registration-4',
      eventId: '21',
      title: 'Java Developer Conference',
      description: 'Conferência dedicada ao ecossistema Java, com foco em Spring, Micronaut, Quarkus e tendências futuras.',
      date: new Date('2025-09-10T09:00:00'),
      location: 'Recife, PE - CESAR',
      category: 'Backend',
      organizer: 'Java User Group Brasil',
      image: '/images/events/java-conf.jpg',
      registrationDate: new Date('2024-12-15'),
      attendees: 245
    },
    {
      id: 'registration-5',
      eventId: '17',
      title: 'AI in Healthcare Symposium',
      description: 'Simpósio sobre aplicações de inteligência artificial na saúde, reunindo profissionais de tecnologia e medicina.',
      date: new Date('2025-12-08T10:00:00'), // Evento no passado para demonstração
      location: 'São Paulo, SP - Hospital Sírio-Libanês',
      category: 'HealthTech',
      organizer: 'Health Innovation Hub',
      image: '/images/events/ai-health.jpg',
      registrationDate: new Date('2024-10-05'),
      attendees: 200
    }
  ]);
  
  // Filtra os eventos de acordo com o filtro ativo
  const getFilteredEvents = () => {
    const today = new Date();
    
    switch (activeFilter) {
      case 'upcoming':
        return myEvents.filter(event => event.date > today);
      case 'past':
        return myEvents.filter(event => event.date <= today);
      default:
        return myEvents;
    }
  };
  
  const filteredEvents = getFilteredEvents();
  
  // Contagem de eventos para os filtros
  const eventCount = {
    all: myEvents.length,
    upcoming: myEvents.filter(event => event.date > new Date()).length,
    past: myEvents.filter(event => event.date <= new Date()).length
  };
  
  // Abrir modal de remoção
  const handleRemoveClick = (event: RegisteredEvent) => {
    setModalEvent(event);
    setIsRemoveModalOpen(true);
  };
  
  // Abrir modal de detalhes
  const handleViewDetailsClick = (event: RegisteredEvent) => {
    setModalEvent(event);
    setIsDetailsModalOpen(true);
  };
  
  // Remover evento
  const handleConfirmRemove = () => {
    if (modalEvent) {
      setMyEvents(myEvents.filter(event => event.id !== modalEvent.id));
      setIsRemoveModalOpen(false);
      setModalEvent(null);
    }
  };
  
  // Função para mudar o filtro
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };
  
  return (
    <div>
      <div className="bg-blue-900 text-white py-12 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Meus Eventos</h1>
          <p className="text-xl text-blue-100">
            Gerencie os eventos em que você se inscreveu e acompanhe as datas.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Barra de filtros */}
        <EventFilters 
          onFilterChange={handleFilterChange}
          activeFilter={activeFilter}
          eventCount={eventCount}
        />
        
        {/* Lista de eventos */}
        {filteredEvents.length === 0 ? (
          (() => {
            let filterLabel = '';
            if (activeFilter === 'upcoming') {
              filterLabel = 'futuro';
            } else if (activeFilter === 'past') {
              filterLabel = 'passado';
            }
            return (
              <div className="bg-blue-50 text-blue-800 p-8 rounded-lg text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">Nenhum evento encontrado</h3>
                <p className="mb-6">Você ainda não se inscreveu em nenhum evento {filterLabel}.</p>
                
                <Link 
                  href="/events" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Explorar eventos disponíveis
                </Link>
              </div>
            );
          })()
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard 
                key={event.id} 
                event={event} 
                onRemove={handleRemoveClick} 
                onViewDetails={handleViewDetailsClick} 
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Modal de Confirmação para remover */}
      <ConfirmationModal 
        isOpen={isRemoveModalOpen}
        event={modalEvent}
        onClose={() => setIsRemoveModalOpen(false)}
        onConfirm={handleConfirmRemove}
      />
      
      {/* Modal de Detalhes */}
      <EventDetailsModal 
        isOpen={isDetailsModalOpen}
        event={modalEvent}
        onClose={() => setIsDetailsModalOpen(false)}
      />
    </div>
  );
}