import React, { Suspense } from 'react';
import EventsList from '@/components/events/EventsList';
import EventsLoading from '@/components/events/EventsLoading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eventos de Tecnologia | TechEventos',
  description: 'Descubra os melhores eventos de tecnologia e comunidades disponíveis para você.',
};

export default function EventsPage() {
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
        <Suspense fallback={<EventsLoading />}>
          <EventsList />
        </Suspense>
      </div>
    </div>
  );
}
