'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Tipos
interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  category: string;
  organizer: string;
  image: string;
  capacity: number;
  registeredAttendees: number;
  isFeatured: boolean;
  tags: string[];
}

// Componente de Card de Evento
const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const isFullyBooked = event.registeredAttendees >= event.capacity;
  const availableSpots = event.capacity - event.registeredAttendees;
  const percentFilled = (event.registeredAttendees / event.capacity) * 100;
  
  // Data formatada em português
  const formattedDate = format(event.date, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
    locale: ptBR,
  });
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Imagem do evento com tag de destaque ou esgotado */}
      <div className="relative">
        <Image 
          src={event.image} 
          alt={event.title}
          width={400}
          height={200}
          className="h-48 w-full object-cover"
        />
        
        {/* Tags sobrepostas à imagem */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {isFullyBooked && (
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md">
              ESGOTADO
            </span>
          )}
          
          {event.isFeatured && (
            <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-md">
              DESTAQUE
            </span>
          )}
          
          {availableSpots <= 5 && availableSpots > 0 && (
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md">
              ÚLTIMAS VAGAS
            </span>
          )}
        </div>
        
        {/* Categoria */}
        <div className="absolute bottom-3 right-3">
          <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-md">
            {event.category}
          </span>
        </div>
      </div>
      
      {/* Conteúdo do card */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{event.title}</h3>
        
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{event.description}</p>
        
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
            <span>{event.location}</span>
          </div>
          
          {/* Organizador */}
          <div className="flex items-center text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{event.organizer}</span>
          </div>
        </div>
        
        {/* Barra de progresso de vagas */}
        <div className="mt-3 mb-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${isFullyBooked ? 'bg-red-600' : 'bg-blue-600'}`}
              style={{ width: `${Math.min(percentFilled, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            {isFullyBooked 
              ? 'Evento lotado' 
              : `${availableSpots} ${availableSpots === 1 ? 'vaga disponível' : 'vagas disponíveis'} de ${event.capacity}`
            }
          </p>
        </div>
        
        {/* Tags */}
        {event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {event.tags.map((tag, index) => (
              <span 
                key={index}
                className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-md"
              >
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
            ${isFullyBooked 
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
            }
          `}
        >
          {isFullyBooked ? 'Evento Esgotado' : 'Inscrever-se'}
        </Link>
      </div>
    </div>
  );
};

// Componente de Paginação
const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  // Cria um array com os números das páginas a serem exibidos
  const getPageNumbers = () => {
    const pages = [];
    
    // Sempre mostra a primeira página
    pages.push(1);
    
    // Adiciona páginas ao redor da página atual
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    
    // Sempre mostra a última página se houver mais de uma página
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    // Adiciona elipses se necessário
    const result = [];
    let prev = 0;
    
    for (const page of pages) {
      if (page - prev > 1) {
        result.push(-prev); // Usa número negativo para representar elipses
      }
      result.push(page);
      prev = page;
    }
    
    return result;
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <div className="flex justify-center mt-8">
      <nav className="flex items-center space-x-1">
        {/* Botão Anterior */}
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
            px-3 py-2 rounded-md text-sm font-medium
            ${currentPage === 1 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-gray-700 hover:bg-gray-100'
            }
          `}
          aria-label="Página anterior"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Números das Páginas */}
        {pageNumbers.map((pageNumber, index) => {
          if (pageNumber < 0) {
            // Renderiza elipses
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                ...
              </span>
            );
          }
          
          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`
                px-3 py-2 rounded-md text-sm font-medium
                ${currentPage === pageNumber
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
              aria-label={`Página ${pageNumber}`}
              aria-current={currentPage === pageNumber ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          );
        })}
        
        {/* Botão Próximo */}
        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`
            px-3 py-2 rounded-md text-sm font-medium
            ${currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
            }
          `}
          aria-label="Próxima página"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </nav>
    </div>
  );
};

// Componente de Filtros
const EventFilters: React.FC<{
  onFilterChange: (filter: string) => void;
  activeFilter: string;
}> = ({ onFilterChange, activeFilter }) => {
  const filters = [
    { id: 'all', label: 'Todos' },
    { id: 'upcoming', label: 'Próximos' },
    { id: 'featured', label: 'Destaques' },
    { id: 'available', label: 'Com vagas' },
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

// Página de Eventos
export default function EventsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const eventsPerPage = 10;
  
  // Dados simulados de eventos
  const allEvents: Event[] = [
    {
      id: '1',
      title: 'React Summit Brasil 2025',
      description: 'O maior evento de React da América Latina, reunindo especialistas nacionais e internacionais para compartilhar conhecimento sobre React, React Native e todo o ecossistema.',
      date: new Date('2025-03-15T09:00:00'),
      location: 'São Paulo, SP - Centro de Convenções',
      category: 'Frontend',
      organizer: 'TechConf Brasil',
      image: '/images/events/react-summit.jpg',
      capacity: 500,
      registeredAttendees: 478,
      isFeatured: true,
      tags: ['React', 'JavaScript', 'Frontend']
    },
    {
      id: '2',
      title: 'Python Conference 2025',
      description: 'Três dias de palestras, tutoriais e networking com a comunidade Python do Brasil. Para iniciantes e especialistas.',
      date: new Date('2025-04-22T10:00:00'),
      location: 'Rio de Janeiro, RJ - Hotel Windsor',
      category: 'Backend',
      organizer: 'Python Brasil',
      image: '/images/events/python-conf.jpg',
      capacity: 350,
      registeredAttendees: 187,
      isFeatured: false,
      tags: ['Python', 'Data Science', 'Backend']
    },
    {
      id: '3',
      title: 'DevOps Summit',
      description: 'Aprenda as melhores práticas de DevOps, CI/CD, containers e muito mais com especialistas da área.',
      date: new Date('2025-02-12T08:30:00'),
      location: 'Online',
      category: 'DevOps',
      organizer: 'Cloud Native Group',
      image: '/images/events/devops-summit.jpg',
      capacity: 1000,
      registeredAttendees: 456,
      isFeatured: true,
      tags: ['DevOps', 'Kubernetes', 'Docker', 'CI/CD']
    },
    {
      id: '4',
      title: 'UX/UI Design Conference',
      description: 'Evento focado em design de interfaces e experiência do usuário, com workshops práticos e palestras inspiradoras.',
      date: new Date('2025-05-05T09:00:00'),
      location: 'Curitiba, PR - Expo Barigui',
      category: 'Design',
      organizer: 'Design Brasil',
      image: '/images/events/ux-conf.jpg',
      capacity: 250,
      registeredAttendees: 250,
      isFeatured: false,
      tags: ['UX', 'UI', 'Design']
    },
    {
      id: '5',
      title: 'AWS Community Day',
      description: 'Um dia inteiro dedicado à AWS, com foco em serviços de nuvem, arquitetura serverless e boas práticas.',
      date: new Date('2025-02-28T10:00:00'),
      location: 'Brasília, DF - Centro de Eventos',
      category: 'Cloud',
      organizer: 'AWS User Group',
      image: '/images/events/aws-day.jpg',
      capacity: 400,
      registeredAttendees: 210,
      isFeatured: false,
      tags: ['AWS', 'Cloud', 'Serverless']
    },
    {
      id: '6',
      title: 'Women in Tech Conference',
      description: 'Conferência que celebra e incentiva a participação feminina na tecnologia, com palestras inspiradoras e networking.',
      date: new Date('2025-03-08T13:00:00'),
      location: 'Recife, PE - Porto Digital',
      category: 'Diversidade',
      organizer: 'WomenTech Brasil',
      image: '/images/events/women-tech.jpg',
      capacity: 300,
      registeredAttendees: 285,
      isFeatured: true,
      tags: ['Diversidade', 'Inclusão', 'Carreira']
    },
    {
      id: '7',
      title: 'Mobile Dev Summit',
      description: 'Evento dedicado ao desenvolvimento mobile, abordando iOS, Android, Flutter, React Native e mais.',
      date: new Date('2025-06-10T09:00:00'),
      location: 'Belo Horizonte, MG - BH Plaza',
      category: 'Mobile',
      organizer: 'Mobile Devs Brasil',
      image: '/images/events/mobile-summit.jpg',
      capacity: 350,
      registeredAttendees: 124,
      isFeatured: false,
      tags: ['Mobile', 'Android', 'iOS', 'Flutter']
    },
    {
      id: '8',
      title: 'Data Science Week',
      description: 'Semana inteira dedicada à ciência de dados, inteligência artificial, machine learning e analytics.',
      date: new Date('2025-04-07T08:00:00'),
      location: 'Florianópolis, SC - Tech Hub',
      category: 'Data',
      organizer: 'Data Science Academy',
      image: '/images/events/data-science.jpg',
      capacity: 450,
      registeredAttendees: 380,
      isFeatured: true,
      tags: ['Data Science', 'AI', 'Machine Learning']
    },
    {
      id: '9',
      title: 'Cybersecurity Conference',
      description: 'Conferência sobre segurança da informação, com tópicos sobre privacidade, ethical hacking e defesa cibernética.',
      date: new Date('2025-05-20T10:00:00'),
      location: 'Porto Alegre, RS - Centro de Convenções',
      category: 'Segurança',
      organizer: 'Secure Labs',
      image: '/images/events/cybersecurity.jpg',
      capacity: 300,
      registeredAttendees: 175,
      isFeatured: false,
      tags: ['Segurança', 'Ethical Hacking', 'Privacidade']
    },
    {
      id: '10',
      title: 'Hackathon de Inovação Social',
      description: 'Hackathon focado no desenvolvimento de soluções tecnológicas para problemas sociais e ambientais.',
      date: new Date('2025-03-28T14:00:00'),
      location: 'Salvador, BA - Parque Tecnológico',
      category: 'Hackathon',
      organizer: 'Social Tech Hub',
      image: '/images/events/hackathon.jpg',
      capacity: 150,
      registeredAttendees: 150,
      isFeatured: false,
      tags: ['Hackathon', 'Impacto Social', 'Inovação']
    },
    {
      id: '11',
      title: 'Blockchain & Web3 Summit',
      description: 'Evento focado em blockchain, criptomoedas, NFTs e aplicações descentralizadas.',
      date: new Date('2025-07-15T09:00:00'),
      location: 'São Paulo, SP - WTC',
      category: 'Web3',
      organizer: 'Blockchain Brasil',
      image: '/images/events/blockchain.jpg',
      capacity: 400,
      registeredAttendees: 187,
      isFeatured: true,
      tags: ['Blockchain', 'Web3', 'NFT', 'DeFi']
    },
    {
      id: '12',
      title: 'Game Dev Experience',
      description: 'Conferência para desenvolvedores de jogos, abordando design, programação, arte e monetização.',
      date: new Date('2025-08-05T10:00:00'),
      location: 'Campinas, SP - Expo Dom Pedro',
      category: 'Games',
      organizer: 'Game Devs Brasil',
      image: '/images/events/gamedev.jpg',
      capacity: 250,
      registeredAttendees: 98,
      isFeatured: false,
      tags: ['Games', 'Unity', 'Unreal', 'Game Design']
    },
    {
      id: '13',
      title: 'TechLeaders Summit',
      description: 'Evento exclusivo para CTOs, gerentes de tecnologia e líderes técnicos discutirem tendências e desafios.',
      date: new Date('2025-04-18T08:30:00'),
      location: 'Rio de Janeiro, RJ - Hotel Copacabana Palace',
      category: 'Liderança',
      organizer: 'Tech Leadership Network',
      image: '/images/events/techleaders.jpg',
      capacity: 200,
      registeredAttendees: 185,
      isFeatured: true,
      tags: ['Liderança', 'Gestão', 'Estratégia']
    },
    {
      id: '14',
      title: 'IoT & Smart Cities Forum',
      description: 'Fórum sobre Internet das Coisas e aplicações para cidades inteligentes, com casos reais e discussões técnicas.',
      date: new Date('2025-06-25T09:00:00'),
      location: 'Brasília, DF - Centro de Convenções Ulysses',
      category: 'IoT',
      organizer: 'Smart Brasil',
      image: '/images/events/iot-forum.jpg',
      capacity: 300,
      registeredAttendees: 145,
      isFeatured: false,
      tags: ['IoT', 'Smart Cities', 'Sensores', 'Automação']
    },
    {
      id: '15',
      title: 'Agile Brazil Conference',
      description: 'A maior conferência sobre métodos ágeis do Brasil, com foco em Scrum, Kanban, XP e cultura ágil.',
      date: new Date('2025-05-12T08:00:00'),
      location: 'Fortaleza, CE - Centro de Eventos do Ceará',
      category: 'Agilidade',
      organizer: 'Agile Alliance Brasil',
      image: '/images/events/agile-conf.jpg',
      capacity: 450,
      registeredAttendees: 302,
      isFeatured: false,
      tags: ['Agile', 'Scrum', 'Kanban', 'Liderança']
    },
    {
      id: '16',
      title: 'PHP Community Conference',
      description: 'Conferência da comunidade PHP brasileira, com palestras sobre Laravel, Symfony, WordPress e mais.',
      date: new Date('2025-04-30T09:30:00'),
      location: 'Curitiba, PR - Positivo Campus',
      category: 'Backend',
      organizer: 'PHP Brasil',
      image: '/images/events/php-conf.jpg',
      capacity: 250,
      registeredAttendees: 98,
      isFeatured: false,
      tags: ['PHP', 'Laravel', 'Symfony', 'Backend']
    },
    {
      id: '17',
      title: 'AI in Healthcare Symposium',
      description: 'Simpósio sobre aplicações de inteligência artificial na saúde, reunindo profissionais de tecnologia e medicina.',
      date: new Date('2025-07-08T10:00:00'),
      location: 'São Paulo, SP - Hospital Sírio-Libanês',
      category: 'HealthTech',
      organizer: 'Health Innovation Hub',
      image: '/images/events/ai-health.jpg',
      capacity: 200,
      registeredAttendees: 200,
      isFeatured: true,
      tags: ['IA', 'Saúde', 'HealthTech', 'Inovação']
    },
    {
      id: '18',
      title: 'E-commerce & Digital Marketing Summit',
      description: 'Evento focado em tecnologias e estratégias para e-commerce e marketing digital.',
      date: new Date('2025-03-25T09:00:00'),
      location: 'Online',
      category: 'E-commerce',
      organizer: 'Digital Business Association',
      image: '/images/events/ecommerce.jpg',
      capacity: 800,
      registeredAttendees: 456,
      isFeatured: false,
      tags: ['E-commerce', 'Marketing Digital', 'SEO', 'Analytics']
    },
    {
      id: '19',
      title: 'Open Source Community Day',
      description: 'Evento dedicado a projetos e comunidades open source, com contribuições ao vivo e workshops.',
      date: new Date('2025-06-18T13:00:00'),
      location: 'Porto Alegre, RS - UFRGS Campus Central',
      category: 'Open Source',
      organizer: 'Open Source Initiative Brasil',
      image: '/images/events/opensource.jpg',
      capacity: 300,
      registeredAttendees: 123,
      isFeatured: false,
      tags: ['Open Source', 'Comunidade', 'Software Livre']
    },
    {
      id: '20',
      title: 'Startup Summit Brasil',
      description: 'O maior evento para startups do Brasil, com pitches, mentorias, investidores e networking.',
      date: new Date('2025-05-28T08:00:00'),
      location: 'Belo Horizonte, MG - BH Station',
      category: 'Startups',
      organizer: 'Startup Brasil',
      image: '/images/events/startup-summit.jpg',
      capacity: 500,
      registeredAttendees: 487,
      isFeatured: true,
      tags: ['Startups', 'Empreendedorismo', 'Inovação', 'Investimentos']
    },
    {
      id: '21',
      title: 'Java Developer Conference',
      description: 'Conferência dedicada ao ecossistema Java, com foco em Spring, Micronaut, Quarkus e tendências futuras.',
      date: new Date('2025-09-10T09:00:00'),
      location: 'Recife, PE - CESAR',
      category: 'Backend',
      organizer: 'Java User Group Brasil',
      image: '/images/events/java-conf.jpg',
      capacity: 350,
      registeredAttendees: 245,
      isFeatured: false,
      tags: ['Java', 'Spring', 'JVM', 'Backend']
    },
    {
      id: '22',
      title: 'Low-Code No-Code Conference',
      description: 'Evento sobre plataformas e ferramentas low-code e no-code para desenvolvimento ágil de aplicações.',
      date: new Date('2025-06-05T10:00:00'),
      location: 'São Paulo, SP - Expo Center Norte',
      category: 'Low-Code',
      organizer: 'Code Revolution',
      image: '/images/events/lowcode.jpg',
      capacity: 250,
      registeredAttendees: 137,
      isFeatured: false,
      tags: ['Low-Code', 'No-Code', 'Produtividade', 'Desenvolvimento Rápido']
    },
    {
      id: '23',
      title: 'Robótica & IA Expo',
      description: 'Exposição de robótica, inteligência artificial e automação, com demonstrações ao vivo e competições.',
      date: new Date('2025-08-22T09:00:00'),
      location: 'Campinas, SP - Unicamp',
      category: 'Robótica',
      organizer: 'Brazilian Robotics Association',
      image: '/images/events/robotics.jpg',
      capacity: 400,
      registeredAttendees: 267,
      isFeatured: true,
      tags: ['Robótica', 'IA', 'Automação', 'Hardware']
    },
    {
      id: '24',
      title: 'Acessibilidade na Web Meetup',
      description: 'Encontro sobre práticas de acessibilidade digital, WCAG, design inclusivo e tecnologias assistivas.',
      date: new Date('2025-04-15T18:30:00'),
      location: 'Online',
      category: 'Acessibilidade',
      organizer: 'Web para Todos',
      image: '/images/events/accessibility.jpg',
      capacity: 200,
      registeredAttendees: 86,
      isFeatured: false,
      tags: ['Acessibilidade', 'Inclusão', 'Design', 'Web']
    },
    {
      id: '25',
      title: 'NextJS & React Framework Day',
      description: 'Evento dedicado ao NextJS e outros frameworks React, com palestras e casos de uso reais.',
      date: new Date('2025-07-25T09:00:00'),
      location: 'Florianópolis, SC - Link Coworking',
      category: 'Frontend',
      organizer: 'Frontend Masters Brasil',
      image: '/images/events/nextjs-day.jpg',
      capacity: 150,
      registeredAttendees: 150,
      isFeatured: false,
      tags: ['NextJS', 'React', 'Frontend', 'JavaScript']
    }
  ];
  
  // Filtra os eventos de acordo com o filtro ativo
  const getFilteredEvents = () => {
    const today = new Date();
    
    switch (activeFilter) {
      case 'upcoming':
        return allEvents.filter(event => event.date > today);
      case 'featured':
        return allEvents.filter(event => event.isFeatured);
      case 'available':
        return allEvents.filter(event => event.registeredAttendees < event.capacity);
      default:
        return allEvents;
    }
  };
  
  const filteredEvents = getFilteredEvents();
  
  // Calcula o total de páginas
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  
  // Obtém os eventos da página atual
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );
  
  // Função para mudar de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Rola para o topo da página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Função para mudar o filtro
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1); // Volta para a primeira página ao mudar o filtro
  };
  
  return (
    <div>
      <div className="bg-blue-900 text-white py-12 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Eventos de Tecnologia</h1>
          <p className="text-xl text-blue-100">
            Descubra os melhores eventos de tecnologia e comunidades disponíveis para você.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Barra de filtros */}
        <EventFilters 
          onFilterChange={handleFilterChange}
          activeFilter={activeFilter}
        />
        
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Nenhum evento encontrado</h3>
            <p>Não encontramos eventos que correspondam aos critérios selecionados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
        
        {/* Paginação */}
        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}