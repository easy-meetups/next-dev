import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";
import FeaturedEvents from "@/components/events/FeaturedEvents";
import { SiGithub, SiMongodb, SiJavascript, SiReact, SiLinkedin  } from "react-icons/si";

export const metadata: Metadata = {
  title: "TechEventos - Conectando Pessoas e Comunidades Tecnológicas",
  description:
    "Descubra, participe e organize eventos de tecnologia com a maior plataforma de comunidades tech do Brasil.",
};

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
                Conectando Pessoas e{" "}
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Comunidades Tecnológicas
                </span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-xl mx-auto lg:mx-0">
                Descubra, participe e organize eventos de tecnologia com a maior
                plataforma de comunidades tech do Brasil.
              </p>
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
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Estatísticas da plataforma */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-3xl lg:text-4xl font-bold text-white mb-1">
                500+
              </p>
              <p className="text-blue-200">Eventos Ativos</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-3xl lg:text-4xl font-bold text-white mb-1">
                10k+
              </p>
              <p className="text-blue-200">Participantes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-3xl lg:text-4xl font-bold text-white mb-1">
                150+
              </p>
              <p className="text-blue-200">Comunidades</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-3xl lg:text-4xl font-bold text-white mb-1">
                50+
              </p>
              <p className="text-blue-200">Cidades</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Eventos em Destaque
          </h2>
          <p className="text-xl text-gray-600">
            Confira os eventos mais populares da nossa plataforma
          </p>
        </div>

        <FeaturedEvents />
      </section>

      {/* Seção Sobre a Plataforma */}
      <section className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            O que é a{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TechEVentos
            </span>{" "}
              ?
          </h2>
          <p className="text-xl text-gray-600">
            A TechEVentos é uma plataforma completa para conectar profissionais,
            entusiastas e comunidades de tecnologia através de eventos de alta
            qualidade, sejam eles presenciais ou virtuais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
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
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Descubra Eventos
            </h3>
            <p className="text-gray-600">
              Encontre eventos relevantes para o seu interesse em tecnologia,
              filtrando por categoria, localização, formato e data.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Conecte-se
            </h3>
            <p className="text-gray-600">
              Participe de discussões em tempo real, faça networking e construa
              relacionamentos profissionais duradouros.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Compartilhe Conhecimento
            </h3>
            <p className="text-gray-600">
              Organize seus próprios eventos, contribua com palestras ou
              workshops e ajude a fortalecer a comunidade tech.
            </p>
          </div>
        </div>
      </section>

      {/* Seção Para Quem */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-16">
            Para Quem é a Nossa Plataforma?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold  text-black mb-3">Desenvolvedores</h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                Encontre eventos de programação, workshops de código e
                hackathons para aprimorar suas habilidades.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Estudantes</h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                Inicie sua jornada na tecnologia com eventos educacionais e
                oportunidades de mentoria.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Profissionais</h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                Expanda sua rede de contatos e mantenha-se atualizado com as
                últimas tendências do mercado.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Empresas</h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                Promova sua marca, recrute talentos e organize eventos
                corporativos para a comunidade tech.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Recursos */}
      <section className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Recursos da Plataforma
          </h2>
          <p className="text-xl text-gray-600">
            Nossa plataforma oferece todas as ferramentas necessárias para uma
            experiência completa em eventos de tecnologia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-blue-800">
              Gestão de Eventos
            </h3>

            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    Criação Simplificada
                  </h4>
                  <p className="mt-2 text-gray-600">
                    Crie eventos em minutos com nosso assistente intuitivo e
                    personalize todos os detalhes.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    Comunicação Integrada
                  </h4>
                  <p className="mt-2 text-gray-600">
                    Envie comunicados, atualizações e lembretes para todos os
                    participantes registrados.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    Análise e Métricas
                  </h4>
                  <p className="mt-2 text-gray-600">
                    Acompanhe o engajamento, participação e feedback para
                    aprimorar seus próximos eventos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-blue-800">
              Experiência do Participante
            </h3>

            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    Registro Simplificado
                  </h4>
                  <p className="mt-2 text-gray-600">
                    Inscreva-se em eventos com apenas alguns cliques e gerencie
                    todos os seus registros em um só lugar.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    Chat em Tempo Real
                  </h4>
                  <p className="mt-2 text-gray-600">
                    Interaja com palestrantes e outros participantes durante o
                    evento através do nosso sistema de chat.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    Descoberta Personalizada
                  </h4>
                  <p className="mt-2 text-gray-600">
                    Receba recomendações de eventos baseadas em seus interesses
                    e histórico de participação.
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            O Que Dizem Sobre Nós
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center mr-4">
                  <span className="text-lg font-bold">RM</span>
                </div>
                <div>
                  <h4 className="font-bold">Ricardo Mendes</h4>
                  <p className="text-blue-200 text-sm">
                    Desenvolvedor Full Stack
                  </p>
                </div>
              </div>
              <p className="text-blue-100">
                Através da plataforma, consegui me conectar com outros
                desenvolvedores da minha cidade e até encontrei meu atual
                emprego durante um hackathon organizado aqui.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-700 rounded-full flex items-center justify-center mr-4">
                  <span className="text-lg font-bold">CS</span>
                </div>
                <div>
                  <h4 className="font-bold">Camila Santos</h4>
                  <p className="text-blue-200 text-sm">
                    Organizadora de Comunidade
                  </p>
                </div>
              </div>
              <p className="text-blue-100">
                Organizar eventos para nossa comunidade de Python nunca foi tão
                fácil. As ferramentas de gestão e comunicação facilitam todo o
                processo desde a divulgação até o feedback.
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
                Usamos a plataforma para organizar nossos meetups técnicos
                mensais. O sistema de registro e o chat integrado tornaram
                nossas discussões muito mais produtivas.
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Pronto para se Conectar?
              </h2>
              <p className="text-xl text-blue-100">
                Junte-se a milhares de profissionais e entusiastas de
                tecnologia. Comece a explorar eventos hoje mesmo!
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
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center mb-12">
            Comunidades em Destaque
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow cursor-pointer">
            <a href="https://githubbrasil.com/" target="_blank" rel="noopener noreferrer">  
              <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <SiGithub className="w-8 h-8 text-purple-600"/>
              </div>
              <h3 className="font-medium text-gray-900">GitHub Brasil</h3>
              <p className="text-sm text-gray-500">5M+ Pessoas Desenvolvedoras do Brasil</p>
            </a>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow cursor-pointer">
              <a href="https://www.mongodb.com/pt-br/events/mongodb-local/sao-paulo" target="_blank" rel="noopener noreferrer">
              <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <SiMongodb className="w-8 h-8 text-green-600"/>
              </div>
              <h3 className="font-medium text-gray-900">MongoDB SP</h3>
              <p className="text-sm text-gray-500">3.8k membros</p>
              </a>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow cursor-pointer">
              <a href="https://thejs.dev/" target="_blank" rel="noopener noreferrer">
              <div className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <SiJavascript className="w-8 h-8 text-yellow-600"/>
              </div>
              <h3 className="font-medium text-gray-900">JS Community</h3>
              <p className="text-sm text-gray-500">12.4k membros</p>
              </a>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow cursor-pointer">
              <a href="https://medium.com/reactbrasil" target="_blank" rel="noopener noreferrer">
              <div className="w-16 h-16 bg-cyan-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <SiReact className="w-8 h-8 text-cyan-600"/>       
              </div>
              <h3 className="font-medium text-gray-900">React Brasil</h3>
              <p className="text-sm text-gray-500">5.3k membros</p>
              </a>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow cursor-pointer">
              <a href="https://www.linkedin.com/jobs/tech-recruiter-vagas/?currentJobId=4233785720&originalSubdomain=br" target="_blank" rel="noopener noreferrer">
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <SiLinkedin className="w-8 h-8 text-blue-600"/>
              </div>
              <h3 className="font-medium text-gray-900">Tech Recrutadores</h3>
              <p className="text-sm text-gray-500">4.3k membros</p>
              </a>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow cursor-pointer">
              <a href="https://brasil.pyladies.com/" target="_blank" rel="noopener noreferrer">
              <div className="w-16 h-16 bg-red-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.042 23.648c-7.813 0-12.042-4.876-12.042-11.171 0-6.727 4.762-12.125 13.276-12.125 6.214 0 10.724 4.038 10.724 9.601 0 8.712-10.33 11.012-9.812 6.042-.71 1.108-1.854 2.354-4.053 2.354-2.516 0-4.08-1.842-4.08-4.807 0-4.444 2.921-8.199 6.379-8.199 1.659 0 2.8.876 3.277 2.221l.464-1.632h2.338c-.244.832-2.321 8.527-2.321 8.527-.648 2.666 1.35 2.713 3.122 1.297 3.329-2.58 3.501-9.327-.998-12.141-4.821-2.891-15.795-1.102-15.795 8.693 0 5.611 3.95 9.381 9.829 9.381 3.436 0 5.542-.93 7.295-1.948l1.177 1.698c-1.711.966-4.461 2.209-8.78 2.209zm-2.344-14.305c-.715 1.34-1.177 3.076-1.177 4.424 0 3.61 3.522 3.633 5.252.239.712-1.394 1.171-3.171 1.171-4.529 0-2.917-3.495-3.434-5.246-.134z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">PyLadies Brasil</h3>
              <p className="text-sm text-gray-500">6.7k membros</p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
