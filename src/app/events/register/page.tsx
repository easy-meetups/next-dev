// SOLUÇÃO DE EMERGÊNCIA: Force o tipo correto
'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { EventRegistrationFormData } from '@/lib/validation';
import { RegistrationForm } from '@/components/events/RegistrationForm';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { useUser } from '@/context/UserContext';

// Definir tipos localmente para evitar conflitos
interface LocalEvent {
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

// Mock data com cast explícito
const EVENT: LocalEvent = {
  id: '1',
  title: 'Web Development Conference 2025',
  description: 'Join us for a full day of talks on the latest web development trends, tools, and techniques.',
  date: new Date('2025-06-15') as Date, // Cast explícito
  location: 'Tech Hub, San Francisco',
  capacity: 200,
  registeredAttendees: 142,
  image: '/images/events/web-dev-conf.jpg',
  category: 'Web Development',
  organizer: 'Tech Events Inc.',
  isFeatured: false,
  tags: ['web', 'development', 'conference', 'frontend', 'backend'],
} as const; // Torna o objeto readonly

// Função helper para formatação segura
const safeFormatDate = (date: Date): string => {
  try {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Date formatting error';
  }
};

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

function EventRegisterContent() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get('id') || '1';
  const { user, isLoading, login } = useUser();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  
  const handleRegister = async (data: EventRegistrationFormData) => {
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (!user) {
        login(data.email, data.name);
      }
      
      setIsRegistered(true);
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
        <Link href="/" className="text-blue-600 hover:underline flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Events
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">{EVENT.title}</h1>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <p className="text-gray-700 mb-4">{EVENT.description}</p>
            
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Event Details</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Date: {safeFormatDate(EVENT.date)}</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Location: {EVENT.location}</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>Capacity: {EVENT.registeredAttendees} / {EVENT.capacity} registered</span>
                </div>
              </div>
            </div>
            
            {!isRegistered ? (
              <>
                <h2 className="text-2xl font-semibold mb-4">Register for this Event</h2>
                <RegistrationForm 
                  eventId={eventId} 
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
                    <h3 className="text-sm font-medium text-green-800">Registration Successful!</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>Thank you for registering for this event. You can now join the event chat to connect with other attendees.</p>
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
              <h3 className="text-xl font-medium text-gray-900 mb-2">Event Chat</h3>
              <p className="text-gray-600 mb-6">Register for this event to join the conversation with other attendees.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<EventRegisterLoading />}>
      <EventRegisterContent />
    </Suspense>
  );
}