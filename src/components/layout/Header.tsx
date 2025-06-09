"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Determinar se a página atual deve exibir a barra de pesquisa
  const shouldShowSearch =
    pathname === "/events" ||
    pathname === "/my-events" ||
    pathname.startsWith("/events/") ||
    pathname === "/communities";

  // Lidar com a submissão do formulário de pesquisa
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navegar para a página de eventos com o parâmetro de pesquisa
      router.push(`/events?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Limpar a pesquisa ao navegar para uma nova página
  useEffect(() => {
    setSearchQuery("");
  }, [pathname]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Espaço reservado para a margem lateral do menu em telas grandes */}
        <div className="w-64 lg:hidden"></div>

        {/* Área de pesquisa - visível apenas em páginas específicas */}
        <div className="flex-1 flex justify-start">
          {shouldShowSearch ? (
            <form onSubmit={handleSearch} className="w-full max-w-lg">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pesquisar eventos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-black border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400 hover:text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </form>
          ) : (
            <div className="hidden md:block text-center text-xl font-bold text-gray-800">
              {pathname === "/" && "Descubra Eventos Incríveis"}
              {pathname === "/profile" && "Meu Perfil"}
              {pathname === "/settings" && "Configurações"}
              {/* Adicione outros títulos para diferentes rotas conforme necessário */}
            </div>
          )}
        </div>

        {/* Logo do site */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Logo className="h-10 w-10 mr-2" />
            <span className="text-lg font-bold text-gray-900 hidden md:block">
              TechEVentos
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
