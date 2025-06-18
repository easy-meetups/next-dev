"use client";
import CommunitiesGrid from "@/components/communities/CommunitiesGrid";
import Pagination from "@/components/communities/Pagination";
import { CommunityData } from "@/components/communities/types";
import Head from "next/head";
import { useState } from "react";

/* 
  Esse componente implementa toda a 
  lógica necessária para a renderização da 
  página 'Comunidades em Destaque' 
*/

// Dados fakes: lista completa de até 20 comunidades
const allCommunities: CommunityData[] = [
  {
    id: "github-brasil",
    iconSrc: "/icons/placeholder.svg",
    name: "GitHub Brasil",
    members: "5M+ members",
    description: "Desenvolvedores do Brasil",
  },
  {
    id: "mongodb-sp",
    iconSrc: "/icons/placeholder.svg",
    name: "MongoDB SP",
    members: "3.8k members",
    description: "MongoDB São Paulo",
  },
  {
    id: "js-community",
    iconSrc: "/icons/placeholder.svg",
    name: "JS Community",
    members: "12.4k members",
    description: "JavaScript Enthusiasts",
  },
  {
    id: "react-brasil",
    iconSrc: "/icons/placeholder.svg",
    name: "React Brasil",
    members: "5.3k members",
    description: "React Developers BR",
  },
  {
    id: "tech-recruiters",
    iconSrc: "/icons/placeholder.svg",
    name: "Tech Recruiters",
    members: "4.3k members",
    description: "Recruiters in Tech",
  },
  {
    id: "pyladies-brasil",
    iconSrc: "/icons/placeholder.svg",
    name: "PyLadies Brasil",
    members: "6.7k members",
    description: "Python Women in Brazil",
  },
  {
    id: "nodejs-sp",
    iconSrc: "/icons/placeholder.svg",
    name: "Node.js SP",
    members: "8.2k members",
    description: "Node.js Developers São Paulo",
  },
  {
    id: "docker-brazil",
    iconSrc: "/icons/placeholder.svg",
    name: "Docker Brazil",
    members: "4.9k members",
    description: "Docker Enthusiasts Brasil",
  },
  {
    id: "python-rj",
    iconSrc: "/icons/placeholder.svg",
    name: "Python RJ",
    members: "3.5k members",
    description: "Pythonistas do Rio",
  },
  {
    id: "kubernetes-br",
    iconSrc: "/icons/placeholder.svg",
    name: "Kubernetes BR",
    members: "2.8k members",
    description: "Kubernetes Users Brazil",
  },
  {
    id: "aws-sp",
    iconSrc: "/icons/placeholder.svg",
    name: "AWS SP",
    members: "2.1k members",
    description: "AWS Developers São Paulo",
  },
  {
    id: "security-br",
    iconSrc: "/icons/placeholder.svg",
    name: "Security BR",
    members: "1.7k members",
    description: "Segurança Digital Brasil",
  },
  {
    id: "frontend-br",
    iconSrc: "/icons/placeholder.svg",
    name: "Frontend BR",
    members: "10.2k members",
    description: "Frontend Developers Brasil",
  },
  {
    id: "backend-br",
    iconSrc: "/icons/placeholder.svg",
    name: "Backend BR",
    members: "9.4k members",
    description: "Backend Developers Brasil",
  },
  {
    id: "devops-br",
    iconSrc: "/icons/placeholder.svg",
    name: "DevOps BR",
    members: "7.1k members",
    description: "DevOps Engineers Brasil",
  },
  {
    id: "vuejs-br",
    iconSrc: "/icons/placeholder.svg",
    name: "Vue.js BR",
    members: "4.4k members",
    description: "Vue.js Developers Brazil",
  },
  {
    id: "angular-br",
    iconSrc: "/icons/placeholder.svg",
    name: "Angular BR",
    members: "3.3k members",
    description: "Angular Enthusiasts Brazil",
  },
  {
    id: "typescript-br",
    iconSrc: "/icons/placeholder.svg",
    name: "TypeScript BR",
    members: "5.8k members",
    description: "TypeScript Developers Brazil",
  },
  {
    id: "java-br",
    iconSrc: "/icons/placeholder.svg",
    name: "Java BR",
    members: "6.2k members",
    description: "Java Developers Brasil",
  },
  {
    id: "go-br",
    iconSrc: "/icons/placeholder.svg",
    name: "Go BR",
    members: "2.9k members",
    description: "Golang Developers Brasil",
  },
  {
    id: "ruby-br",
    iconSrc: "/icons/placeholder.svg",
    name: "Ruby BR",
    members: "1.5k members",
    description: "Ruby Developers Brasil",
  },
];

export default function CommunitiesPage() {
  const [currentPage, setCurrentPage] = useState(1);

  // Definir quantas comunidades exibir por página
  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(allCommunities.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const visibleCommunities = allCommunities.slice(startIndex, endIndex);

  const componentPlainText = {
    mainTitle: "Comunidades em Destaque",
    description:
      "Acompanhe onde engenheiros, desenvolvedores e entusiastas estão colaborando, criando e resolvendo problemas juntos.",
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
      <Head>
        <title>Featured Communities • MeuApp</title>
        <meta
          name="description"
          content="Discover featured developer communities in Brazil."
        />
      </Head>
      <section
        className="
        container
        flex 
        flex-col 
        gap-6 
        p-12
        mx-auto
        "
      >
        <header
          className=" 
          bg-linear-to-r
          from-[#3B4A8A]
          to-[#0F1324] 
          p-12 
          rounded-2xl
          
          "
        >
          <h1
            className="
            text-2xl
            text-center
            font-semibold 
            text-white
            text-shadow-md
            text-shadow-white/25
            mb-4
            
            md:text-left
            md:text-3xl
            lg:text-5xl 
            "
          >
            {componentPlainText["mainTitle"]}
          </h1>
          <h2
            className="
            text-center
            text-sm
            text-white

            md:text-base
            md:text-left
            lg:text-lg
            "
          >
            {componentPlainText["description"]}
          </h2>
        </header>

        {/* Grade de comunidades visíveis na página atual */}
        <CommunitiesGrid communities={visibleCommunities} />

        {/* Componente de paginação */}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </>
  );
}
