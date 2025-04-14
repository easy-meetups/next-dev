'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="space-y-20 pb-16">
      {/* Seção Hero */}
      <section className="relative -mt-16 lg:-mt-4 pt-24 pb-20 overflow-hidden">
        {/* Fundo com gradiente e padrão */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-indigo-900 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Conectando Pessoas e <span className="text-blue-400">Comunidades Tecnológicas</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-xl mx-auto lg:mx-0">
                Descubra, participe e organize eventos de tecnologia com a maior plataforma de comunidades tech do Brasil.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700"
                  variant="primary"
                >
                  Explorar Eventos
                </Button>
                <Button 
                  className="px-8 py-3 text-lg"
                  variant="outline"
                >
                  Criar Evento
                </Button>
              </div>
            </div>
            <div className="relative h-80 lg:h-96 hidden lg:block">
              <div className="absolute top-0 right-0 h-full w-full bg-blue-700 rounded-3xl transform rotate-3 opacity-20"></div>
              <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl overflow-hidden">
                <div className="h-full w-full opacity-20 bg-[url('/tech-pattern.svg')]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/images/events/tech-event-hero.jpg" 
                    alt="Evento de tecnologia"
                    width={500}
                    height={400}
                    className="object-cover rounded-2xl w-[90%] h-[90%]"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Estatísticas da plataforma */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-3xl lg:text-4xl font-bold text-white mb-1">500+</p>
              <p className="text-blue-200">Eventos Ativos</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-3xl lg:text-4xl font-bold text-white mb-1">10k+</p>
              <p className="text-blue-200">Participantes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-3xl lg:text-4xl font-bold text-white mb-1">150+</p>
              <p className="text-blue-200">Comunidades</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-3xl lg:text-4xl font-bold text-white mb-1">50+</p>
              <p className="text-blue-200">Cidades</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Seção Sobre a Plataforma */}
      <section className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">O que é a <span className="text-blue-600">TechEventos</span>?</h2>
          <p className="text-xl text-gray-600">
            A TechEventos é uma plataforma completa para conectar profissionais, entusiastas e comunidades de tecnologia através de eventos de alta qualidade, sejam eles presenciais ou virtuais.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Descubra Eventos</h3>
            <p className="text-gray-600">
              Encontre eventos relevantes para o seu interesse em tecnologia, filtrando por categoria, localização, formato e data.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Conecte-se</h3>
            <p className="text-gray-600">
              Participe de discussões em tempo real, faça networking e construa relacionamentos profissionais duradouros.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Compartilhe Conhecimento</h3>
            <p className="text-gray-600">
              Organize seus próprios eventos, contribua com palestras ou workshops e ajude a fortalecer a comunidade tech.
            </p>
          </div>
        </div>
      </section>
      
      {/* Seção Para Quem */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Para Quem é a Nossa Plataforma?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Desenvolvedores</h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                Encontre eventos de programação, workshops de código e hackathons para aprimorar suas habilidades.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Estudantes</h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                Inicie sua jornada na tecnologia com eventos educacionais e oportunidades de mentoria.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Profissionais</h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                Expanda sua rede de contatos e mantenha-se atualizado com as últimas tendências do mercado.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Empresas</h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                Promova sua marca, recrute talentos e organize eventos corporativos para a comunidade tech.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Seção de Recursos */}
      <section className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Recursos da Plataforma</h2>
          <p className="text-xl text-gray-600">
            Nossa plataforma oferece todas as ferramentas necessárias para uma experiência completa em eventos de tecnologia.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-blue-800">Gestão de Eventos</h3>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Criação Simplificada</h4>
                  <p className="mt-2 text-gray-600">
                    Crie eventos em minutos com nosso assistente intuitivo e personalize todos os detalhes.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Comunicação Integrada</h4>
                  <p className="mt-2 text-gray-600">
                    Envie comunicados, atualizações e lembretes para todos os participantes registrados.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Análise e Métricas</h4>
                  <p className="mt-2 text-gray-600">
                    Acompanhe o engajamento, participação e feedback para aprimorar seus próximos eventos.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-blue-800">Experiência do Participante</h3>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Registro Simplificado</h4>
                  <p className="mt-2 text-gray-600">
                    Inscreva-se em eventos com apenas alguns cliques e gerencie todos os seus registros em um só lugar.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Chat em Tempo Real</h4>
                  <p className="mt-2 text-gray-600">
                    Interaja com palestrantes e outros participantes durante o evento através do nosso sistema de chat.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Descoberta Personalizada</h4>
                  <p className="mt-2 text-gray-600">
                    Receba recomendações de eventos baseadas em seus interesses e histórico de participação.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Seção Depoimentos */}
      <section className="bg-blue-900 py-16 text-white relative overflow-hidden">
        {/* Padrão de fundo */}
        <div className="absolute inset-0 bg-[url('/wave-pattern.svg')] bg-center opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">O Que Dizem Sobre Nós</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center mr-4">
                  <span className="text-lg font-bold">RM</span>
                </div>
                <div>
                  <h4 className="font-bold">Ricardo Mendes</h4>
                  <p className="text-blue-200 text-sm">Desenvolvedor Full Stack</p>
                </div>
              </div>
              <p className="text-blue-100">
                "Através da plataforma, consegui me conectar com outros desenvolvedores da minha cidade e até encontrei meu atual emprego durante um hackathon organizado aqui."
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-700 rounded-full flex items-center justify-center mr-4">
                  <span className="text-lg font-bold">CS</span>
                </div>
                <div>
                  <h4 className="font-bold">Camila Santos</h4>
                  <p className="text-blue-200 text-sm">Organizadora de Comunidade</p>
                </div>
              </div>
              <p className="text-blue-100">
                "Organizar eventos para nossa comunidade de Python nunca foi tão fácil. As ferramentas de gestão e comunicação facilitam todo o processo desde a divulgação até o feedback."
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center mr-4">
                  <span className="text-lg font-bold">AT</span>
                </div>
                <div>
                  <h4 className="font-bold">André Torres</h4>
                  <p className="text-blue-200 text-sm">CTO de Startup</p>
                </div>
              </div>
              <p className="text-blue-100">
                "Usamos a plataforma para organizar nossos meetups técnicos mensais. O sistema de registro e o chat integrado tornaram nossas discussões muito mais produtivas."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Seção CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex md:items-center md:justify-between p-8 md:p-12">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Pronto para se Conectar?</h2>
              <p className="text-xl text-blue-100">
                Junte-se a milhares de profissionais e entusiastas de tecnologia. Comece a explorar eventos hoje mesmo!
              </p>
            </div>
            <div className="md:w-1/3 text-center md:text-right">
              <Button 
                className="px-8 py-4 text-lg bg-white text-blue-700 hover:bg-blue-50 shadow-lg"
                variant="outline"
              >
                Criar Conta Gratuita
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Seção Comunidades em Destaque */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Comunidades em Destaque</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1.8c-5.7 0-10.2 4.6-10.2 10.2 0 4.5 2.9 8.4 7 9.8.5.1.7-.2.7-.5v-1.7c-2.9.6-3.5-1.4-3.5-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.3-.3-4.7-1.1-4.7-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1 .8-.2 1.7-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.7 5 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.7.5 4.1-1.4 7-5.2 7-9.8 0-5.6-4.5-10.2-10.2-10.2z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">GitHub Brasil</h3>
              <p className="text-sm text-gray-500">5.2k membros</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">MongoDB SP</h3>
              <p className="text-sm text-gray-500">3.8k membros</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3077-6.6017 2.1463-8.624 4.9728C.8381 7.9351.019 10.5087 0 13.0608c.005 4.0573 1.5789 7.8198 4.6117 10.6562 5.7961 5.1947 14.7291 5.1947 20.5252 0 4.9673-5.4881 6.0585-13.5364 2.754-20.0415-2.8543-5.6301-8.7637-8.9433-14.7897-8.6654-.4517.0002-.8753.0791-1.25.0767-.0233-.0106.3524.0088.2447.0002m.1431 1.1909c.0328.0001.0656.0011.0984.0011.8693-.0014 1.7404.0798 2.5697.269 7.3839 1.7026 11.9666 9.1205 10.2644 16.5044-1.7022 7.3839-9.1203 11.9664-16.5043 10.2642-7.3839-1.7022-11.9664-9.1203-10.2643-16.5043 1.4932-6.4734 7.2568-11.0017 13.8361-10.5354z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">JS Community</h3>
              <p className="text-sm text-gray-500">12.4k membros</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.23 12.004a2.236 2.236 0 01-2.235 2.236 2.236 2.236 0 01-2.236-2.236 2.236 2.236 0 012.235-2.236 2.236 2.236 0 012.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">React Brasil</h3>
              <p className="text-sm text-gray-500">8.6k membros</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">Tech Recrutadores</h3>
              <p className="text-sm text-gray-500">4.3k membros</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.042 23.648c-7.813 0-12.042-4.876-12.042-11.171 0-6.727 4.762-12.125 13.276-12.125 6.214 0 10.724 4.038 10.724 9.601 0 8.712-10.33 11.012-9.812 6.042-.71 1.108-1.854 2.354-4.053 2.354-2.516 0-4.08-1.842-4.08-4.807 0-4.444 2.921-8.199 6.379-8.199 1.659 0 2.8.876 3.277 2.221l.464-1.632h2.338c-.244.832-2.321 8.527-2.321 8.527-.648 2.666 1.35 2.713 3.122 1.297 3.329-2.58 3.501-9.327-.998-12.141-4.821-2.891-15.795-1.102-15.795 8.693 0 5.611 3.95 9.381 9.829 9.381 3.436 0 5.542-.93 7.295-1.948l1.177 1.698c-1.711.966-4.461 2.209-8.78 2.209zm-2.344-14.305c-.715 1.34-1.177 3.076-1.177 4.424 0 3.61 3.522 3.633 5.252.239.712-1.394 1.171-3.171 1.171-4.529 0-2.917-3.495-3.434-5.246-.134z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">PyLadies Brasil</h3>
              <p className="text-sm text-gray-500">6.7k membros</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}