'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Event } from '@/lib/types';
import { EventRegistrationFormData } from '@/lib/validation';
import { RegistrationForm } from '@/components/events/RegistrationForm';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { useUser } from '@/context/UserContext';

// Mock data - in a real app, you'd fetch this from an API based on the ID
const EVENT: Event = {
  id: '1',
  title: 'Web Development Conference 2025',
  description: 'Junte-se a nós para um dia inteiro de palestras sobre as últimas tendências, ferramentas e técnicas de desenvolvimento web.',
  date: new Date('2025-06-15'),
  location: 'Tech Hub, San Francisco',
  capacity: 200,
  registeredAttendees: 142,
  image: '/images/events/web-dev-conf.jpg',
  category: 'Technology',
  organizer: 'Web Dev Org',
  isFeatured: true,
  tags: ['web', 'development', 'conference', '2025'],
};

// Loading fallback component
function EventRegisterLoading() {
  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-lg">Carregando informações do evento...</p>
      </div>
    </div>
  );
}

// Component that uses useSearchParams
function EventRegisterContent() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get('id') ?? '1';
  const { user, isLoading, login } = useUser();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async (data: EventRegistrationFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // If user is not logged in, create a user
      if (!user) {
        login(data.email, data.name);
      }

      // Set registration status to true
      setIsRegistered(true);

      // In a real app, you would send this data to your backend
      console.log('Registration data:', { ...data, eventId });
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href="/"
          className="w-1/6 bg-blue-600 text-white hover:bg-blue-500 flex items-center gap-2 px-4 py-2 rounded transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Voltar para Eventos
        </Link>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">{EVENT.title}</h1>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <p className="text-gray-700 mb-4">{EVENT.description}</p>

            <div className="mb-4">
              <h3 className="font-semibold mb-2 text-black">Detalhes do Evento</h3>
              <div className="space-y-2">
                <div className="flex items-center text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Data: {EVENT.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Localização: {EVENT.location}</span>
                </div>
                <div className="flex items-center text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>Capacity: {EVENT.registeredAttendees} / {EVENT.capacity} registered</span>
                </div>
              </div>
            </div>

            {!isRegistered ? (
              <>
                <h2 className="text-2xl font-bold mb-4 text-black">Inscreva-se neste evento</h2>
                <RegistrationForm
                  onSubmit={handleRegister}
                  isSubmitting={isSubmitting}
                />
              </>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Cadastro realizado com sucesso!</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>Obrigado por se inscrever neste evento. Agora você pode entrar no chat do evento para se conectar com outros participantes.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="h-[600px]">
          {(user || isRegistered) ? (
            <ChatInterface
              eventId={eventId}
              currentUser={user || { id: 'temp-user', name: 'Guest User', email: 'guest@example.com' }}
            />
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 h-full flex flex-col items-center justify-center text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Bate-papo do evento</h3>
              <p className="text-gray-600 mb-6">Registre-se neste evento para participar da conversa com outros participantes.</p>
            </div>
          )}
        </div>
      </div>
    </div >
  );
}

// Main page component with Suspense
export default function RegisterPage() {
  return (
    <Suspense fallback={<EventRegisterLoading />}>
      <EventRegisterContent />
    </Suspense>
  );
}
