'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Tipos para os dados da página de perfil
interface UserStats {
  eventsAttended: number;
  upcomingEvents: number;
  certificatesEarned: number;
  communitiesJoined: number;
}

interface UserInterest {
  id: string;
  name: string;
  color: string;
}

interface PastEvent {
  id: string;
  title: string;
  date: Date;
  image: string;
  category: string;
  hasCertificate: boolean;
}

interface AccountSetting {
  id: string;
  name: string;
  value: boolean;
}

// Componente para exibir as estatísticas do usuário
const StatCard: React.FC<{ title: string; value: number; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl shadow-sm p-5 flex items-center">
    <div className="rounded-full bg-blue-100 p-3 mr-4 text-blue-600">
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

// Componente para exibir eventos passados
const PastEventCard: React.FC<{ event: PastEvent }> = ({ event }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    <div className="relative h-32">
      <Image 
        src={event.image} 
        alt={event.title}
        fill
        className="object-cover"
      />
      {event.hasCertificate && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs py-1 px-2 rounded-md">
          Certificado Disponível
        </div>
      )}
    </div>
    <div className="p-3">
      <h3 className="font-semibold text-gray-900 mb-1 truncate">{event.title}</h3>
      <p className="text-xs text-gray-500 mb-2">
        {format(event.date, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
          {event.category}
        </span>
        {event.hasCertificate && (
          <Link 
            href={`/certificates/${event.id}`}
            className="text-xs text-green-600 hover:text-green-800"
          >
            Ver certificado
          </Link>
        )}
      </div>
    </div>
  </div>
);

export default function ProfilePage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'preferences' | 'account'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState({
    name: user?.name || '',
    bio: 'Entusiasta de tecnologia e desenvolvimento web. Sempre em busca de novos conhecimentos e conexões na comunidade tech.',
    company: 'TechDev Solutions',
    position: 'Desenvolvedor Full Stack',
    location: 'São Paulo, SP',
    website: 'https://exemplo.com',
    github: 'github.com/usuario-dev',
    linkedin: 'linkedin.com/in/usuario-dev',
  });
  
  // Estatísticas do usuário
  const userStats: UserStats = {
    eventsAttended: 12,
    upcomingEvents: 3,
    certificatesEarned: 5,
    communitiesJoined: 4
  };
  
  // Interesses do usuário
  const userInterests: UserInterest[] = [
    { id: '1', name: 'JavaScript', color: 'bg-yellow-500' },
    { id: '2', name: 'React', color: 'bg-blue-500' },
    { id: '3', name: 'UX/UI', color: 'bg-purple-500' },
    { id: '4', name: 'Cloud Computing', color: 'bg-sky-500' },
    { id: '5', name: 'DevOps', color: 'bg-green-500' },
    { id: '6', name: 'Data Science', color: 'bg-red-500' },
  ];
  
  // Eventos passados
  const pastEvents: PastEvent[] = [
    {
      id: '1',
      title: 'React Summit Brasil 2024',
      date: new Date(2024, 5, 15),
      image: '/images/events/react-summit.jpg',
      category: 'Frontend',
      hasCertificate: true
    },
    {
      id: '2',
      title: 'Data Science Week',
      date: new Date(2024, 3, 10),
      image: '/images/events/data-science.jpg',
      category: 'Data',
      hasCertificate: true
    },
    {
      id: '3',
      title: 'UX/UI Design Conference',
      date: new Date(2024, 2, 22),
      image: '/images/events/ux-conf.jpg',
      category: 'Design',
      hasCertificate: false
    },
    {
      id: '4',
      title: 'DevOps Summit',
      date: new Date(2024, 1, 5),
      image: '/images/events/devops-summit.jpg',
      category: 'DevOps',
      hasCertificate: true
    }
  ];
  
  // Configurações da conta
  const accountSettings: AccountSetting[] = [
    { id: 'email_notifications', name: 'Receber notificações por e-mail', value: true },
    { id: 'event_reminders', name: 'Lembretes de eventos', value: true },
    { id: 'new_events', name: 'Novos eventos de interesse', value: true },
    { id: 'community_messages', name: 'Mensagens da comunidade', value: false },
    { id: 'marketing_emails', name: 'Comunicações de marketing', value: false },
    { id: 'two_factor', name: 'Autenticação de dois fatores', value: true },
  ];
  
  // Função para salvar as alterações do perfil
  const handleSaveProfile = () => {
    // Aqui você implementaria a lógica para salvar as alterações no backend
    setIsEditing(false);
  };
  
  // Função para alternar configurações
  const toggleSetting = (id: string) => {
    const updatedSettings = accountSettings.map(setting => 
      setting.id === id ? { ...setting, value: !setting.value } : setting
    );
    // Aqui você implementaria a lógica para salvar as configurações no backend
    console.log('Configurações atualizadas:', updatedSettings);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg">Carregando perfil...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pb-16">
      {/* Cabeçalho do perfil */}
      <div className="relative">
        {/* Banner de fundo */}
        <div className="h-48 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-700"></div>
        
        {/* Informações do perfil */}
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-md p-6 -mt-24 relative z-10">
            <div className="md:flex items-end">
              <div className="md:flex-shrink-0 mx-auto md:mx-0 -mt-20 mb-4 md:mb-0 md:-mt-24">
                <div className="relative h-40 w-40 border-4 border-white rounded-full overflow-hidden shadow-lg">
                  {user.avatar ? (
                    <Image 
                      src={user.avatar} 
                      alt={user.name} 
                      fill 
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-blue-500 flex items-center justify-center text-5xl font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="md:ml-6 flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                    <p className="text-gray-600">{editableUser.position} @ {editableUser.company}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {editableUser.location}
                    </p>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <button 
                      onClick={() => setIsEditing(!isEditing)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md inline-flex items-center transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      {isEditing ? 'Cancelar' : 'Editar Perfil'}
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
                  {userInterests.map(interest => (
                    <span 
                      key={interest.id}
                      className={`${interest.color} text-white text-xs font-medium px-2.5 py-1 rounded-full`}
                    >
                      {interest.name}
                    </span>
                  ))}
                </div>
                
                <div className="mt-4 flex justify-center md:justify-start space-x-4">
                  <a href={`https://${editableUser.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href={`https://${editableUser.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href={`https://${editableUser.website}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Formulário de edição do perfil */}
            {isEditing && (
              <div className="mt-8 border-t pt-6">
                <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <input 
                      type="text" 
                      value={editableUser.name}
                      onChange={(e) => setEditableUser({...editableUser, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                    <input 
                      type="text" 
                      value={editableUser.position}
                      onChange={(e) => setEditableUser({...editableUser, position: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                    <input 
                      type="text" 
                      value={editableUser.company}
                      onChange={(e) => setEditableUser({...editableUser, company: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Localização</label>
                    <input 
                      type="text" 
                      value={editableUser.location}
                      onChange={(e) => setEditableUser({...editableUser, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                    <input 
                      type="text" 
                      value={editableUser.github}
                      onChange={(e) => setEditableUser({...editableUser, github: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                    <input 
                      type="text" 
                      value={editableUser.linkedin}
                      onChange={(e) => setEditableUser({...editableUser, linkedin: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input 
                      type="text" 
                      value={editableUser.website}
                      onChange={(e) => setEditableUser({...editableUser, website: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea 
                      rows={3}
                      value={editableUser.bio}
                      onChange={(e) => setEditableUser({...editableUser, bio: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-medium mb-2">Interesses</h3>
                    <div className="flex flex-wrap gap-2">
                      {userInterests.map(interest => (
                        <div 
                          key={interest.id}
                          className={`${interest.color} text-white text-xs font-medium px-2.5 py-1 rounded-full cursor-pointer flex items-center`}
                        >
                          {interest.name}
                          <button className="ml-1.5 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                      <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Adicionar
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={handleSaveProfile}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md flex items-center transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Salvar Alterações
                  </button>
                </div>
              </div>
            )}
            
            {/* Bio */}
            {!isEditing && (
              <div className="mt-6 border-t pt-4">
                <p className="text-gray-700">{editableUser.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Navegação em abas */}
      <div className="container mx-auto px-4 mt-8">
        <div className="border-b">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Visão Geral
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'events'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Meus Eventos
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'preferences'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Preferências
            </button>
            <button
              onClick={() => setActiveTab('account')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'account'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Conta
            </button>
          </nav>
        </div>
        
        {/* Conteúdo das abas */}
        <div className="mt-8">
          {/* Aba: Visão Geral */}
          {activeTab === 'overview' && (
            <div>
              {/* Estatísticas */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Suas Estatísticas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard 
                    title="Eventos Participados" 
                    value={userStats.eventsAttended}
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    }
                  />
                  <StatCard 
                    title="Próximos Eventos" 
                    value={userStats.upcomingEvents}
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    }
                  />
                  <StatCard 
                    title="Certificados" 
                    value={userStats.certificatesEarned}
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    }
                  />
                  <StatCard 
                    title="Comunidades" 
                    value={userStats.communitiesJoined}
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    }
                  />
                </div>
              </div>
              
              {/* Próximos Eventos */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Próximos Eventos</h2>
                  <Link 
                    href="/my-events" 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    Ver todos
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-lg font-semibold mb-1">TechData Summit 2025</h3>
                  <p className="text-gray-600 mb-3">Em 28 de maio de 2025 • São Paulo, SP</p>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Confirmado
                  </div>
                </div>
              </div>
              
              {/* Eventos Recentes */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Eventos Recentes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {pastEvents.slice(0, 4).map(event => (
                    <PastEventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Aba: Meus Eventos */}
          {activeTab === 'events' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Histórico de Eventos</h2>
                <div>
                  <select 
                    className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>Todos os eventos</option>
                    <option>Com certificado</option>
                    <option>Sem certificado</option>
                    <option>Últimos 3 meses</option>
                    <option>Últimos 6 meses</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {pastEvents.map(event => (
                  <PastEventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}
          
          {/* Aba: Preferências */}
          {activeTab === 'preferences' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Preferências de Eventos</h2>
              
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Categorias de Interesse</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { name: 'Frontend', selected: true },
                    { name: 'Backend', selected: true },
                    { name: 'Data Science', selected: true },
                    { name: 'DevOps', selected: true },
                    { name: 'UX/UI Design', selected: true },
                    { name: 'Mobile', selected: false },
                    { name: 'Blockchain', selected: false },
                    { name: 'Cloud Computing', selected: true },
                    { name: 'Segurança', selected: false },
                    { name: 'Inteligência Artificial', selected: true },
                    { name: 'Internet das Coisas', selected: false },
                    { name: 'Metodologias Ágeis', selected: false },
                  ].map((category, index) => (
                    <div key={index} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`category-${index}`} 
                        checked={category.selected}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`category-${index}`} className="ml-2 text-gray-700">
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Formatos Preferidos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { name: 'Presencial', selected: true },
                    { name: 'Online', selected: true },
                    { name: 'Híbrido', selected: true },
                    { name: 'Workshop', selected: true },
                    { name: 'Conferência', selected: true },
                    { name: 'Hackathon', selected: false },
                  ].map((format, index) => (
                    <div key={index} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`format-${index}`} 
                        checked={format.selected}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`format-${index}`} className="ml-2 text-gray-700">
                        {format.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Localização e Disponibilidade</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Localização Preferida
                  </label>
                  <select className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>São Paulo, SP</option>
                    <option>Rio de Janeiro, RJ</option>
                    <option>Belo Horizonte, MG</option>
                    <option>Brasília, DF</option>
                    <option>Recife, PE</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Distância Máxima para Eventos Presenciais
                  </label>
                  <select className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Até 5 km</option>
                    <option>Até 10 km</option>
                    <option>Até 25 km</option>
                    <option selected>Até 50 km</option>
                    <option>Qualquer distância</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {/* Aba: Conta */}
          {activeTab === 'account' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Configurações da Conta</h2>
              
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Dados Pessoais</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E-mail
                    </label>
                    <input 
                      type="email" 
                      value={user.email}
                      disabled
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Este é o seu e-mail principal e não pode ser alterado.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E-mail Secundário
                    </label>
                    <input 
                      type="email" 
                      placeholder="Digite um e-mail secundário"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone
                    </label>
                    <input 
                      type="tel" 
                      placeholder="(00) 00000-0000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data de Nascimento
                    </label>
                    <input 
                      type="date" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md">
                    Atualizar Dados
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Notificações</h3>
                
                <div className="space-y-4">
                  {accountSettings.map(setting => (
                    <div key={setting.id} className="flex items-center justify-between">
                      <span className="text-gray-700">{setting.name}</span>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input 
                          type="checkbox" 
                          id={setting.id} 
                          checked={setting.value}
                          onChange={() => toggleSetting(setting.id)}
                          className="sr-only"
                        />
                        <label 
                          htmlFor={setting.id}
                          className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                            setting.value ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span 
                            className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${
                              setting.value ? 'transform translate-x-4' : ''
                            }`}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-red-600 mb-4">Zona de Perigo</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Alterar Senha</h4>
                    <p className="text-sm text-gray-500 mb-2">
                      Altere sua senha de acesso à plataforma.
                    </p>
                    <button className="text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium py-2 px-4 rounded-md">
                      Alterar Senha
                    </button>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-gray-900 mb-1">Excluir Conta</h4>
                    <p className="text-sm text-gray-500 mb-2">
                      Ao excluir sua conta, todos os seus dados serão permanentemente removidos da plataforma.
                    </p>
                    <button className="text-white bg-red-600 hover:bg-red-700 font-medium py-2 px-4 rounded-md">
                      Excluir Conta
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}