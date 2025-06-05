'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import Logo from '@/components/ui/Logo';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useUser();
  
  // Close menu when route changes on mobile devices
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  
  // Handle click outside to close the menu on mobile devices
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const toggle = document.getElementById('sidebar-toggle');
      
      if (
        sidebar && 
        toggle && 
        !sidebar.contains(event.target as Node) && 
        !toggle.contains(event.target as Node) && 
        isOpen
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  // Prevent body scrolling when menu is open on mobile devices
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  return (
    <>
      {/* Toggle button for mobile devices */}
      <button
        id="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-blue-600 text-white p-2 rounded-md shadow-lg hover:bg-blue-700 transition-colors"
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      
      {/* Overlay for mobile devices */}
      {isOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar Menu */}
      <aside
        id="sidebar"
        className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-gray-900 to-blue-900 text-white w-64 shadow-xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } lg:sticky lg:top-0 lg:h-screen`}
      >
        {/* Menu Content */}
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="p-4 border-b border-blue-800">
            <div className="flex items-center justify-center mb-4">
              <Logo className="h-20 w-20 mr-2" />
            </div>
            <h2 className="text-xl font-bold text-center">Portal de Eventos</h2>
            <p className="text-blue-300 text-sm text-center mt-1">Gerencie seus eventos</p>
          </div>
          
          {/* Navigation Menu - with flex-grow to push the footer to the bottom */}
          <nav className="py-4 flex-grow">
            <ul className="space-y-1">
              <li>
                <Link 
                  href="/"
                  className={`flex items-center px-4 py-3 text-sm ${
                    pathname === '/' 
                      ? 'bg-blue-700 text-white border-l-4 border-blue-400' 
                      : 'text-gray-300 hover:bg-blue-800 hover:text-white transition-colors'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Página Inicial
                </Link>
              </li>
              <li>
                <Link 
                  href="/events"
                  className={`flex items-center px-4 py-3 text-sm ${
                    pathname === '/events' || pathname.startsWith('/events/') 
                      ? 'bg-blue-700 text-white border-l-4 border-blue-400' 
                      : 'text-gray-300 hover:bg-blue-800 hover:text-white transition-colors'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Eventos
                </Link>
              </li>
              <li>
                <Link 
                  href="/my-events"
                  className={`flex items-center px-4 py-3 text-sm ${
                    pathname === '/my-events' 
                      ? 'bg-blue-700 text-white border-l-4 border-blue-400' 
                      : 'text-gray-300 hover:bg-blue-800 hover:text-white transition-colors'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Meus Eventos
                </Link>
              </li>
            </ul>
            
            {/* Settings Category */}
            <div className="px-4 pt-6 pb-2">
              <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Configurações
              </h5>
            </div>
            <ul className="space-y-1">
              <li>
                <Link 
                  href="/profile"
                  className={`flex items-center px-4 py-3 text-sm ${
                    pathname === '/profile' 
                      ? 'bg-blue-700 text-white border-l-4 border-blue-400' 
                      : 'text-gray-300 hover:bg-blue-800 hover:text-white transition-colors'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Meu Perfil
                </Link>
              </li>
              <li>
                <Link 
                  href="/settings"
                  className={`flex items-center px-4 py-3 text-sm ${
                    pathname === '/settings' 
                      ? 'bg-blue-700 text-white border-l-4 border-blue-400' 
                      : 'text-gray-300 hover:bg-blue-800 hover:text-white transition-colors'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Configurações
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Sidebar footer with user status */}
          <div className="border-t border-blue-800 p-4 mt-auto">
            {user ? (
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 truncate">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-blue-300 truncate">{user.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="ml-2 text-gray-400 hover:text-white"
                  aria-label="Sair"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex justify-between">
                <Link 
                  href="/login" 
                  className="text-sm text-blue-300 hover:text-white flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Entrar
                </Link>
                <Link 
                  href="/register" 
                  className="text-sm text-blue-300 hover:text-white flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Cadastrar
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}