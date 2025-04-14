'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/lib/types';

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, name: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check for existing user in localStorage (in a real app, use secure cookies or proper auth)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user', e);
        // Load a default user for demonstration purposes
        const defaultUser = {
          id: 'default-user',
          name: 'Usuário Participante',
          email: 'usuario@exemplo.com',
          avatar: 'https://avatars.githubusercontent.com/u/85812823?v=4'
        };
        setUser(defaultUser);
        localStorage.setItem('user', JSON.stringify(defaultUser));
      }
    } else {
      // For demonstration, create a default user
      const defaultUser = {
        id: 'default-user',
        name: 'Usuário Participante',
        email: 'usuario@exemplo.com',
        avatar: 'https://avatars.githubusercontent.com/u/85812823?v=4'
      };
      setUser(defaultUser);
      localStorage.setItem('user', JSON.stringify(defaultUser));
    }
    setIsLoading(false);
  }, []);
  
  const login = (email: string, name: string) => {
    // In a real app, this would be a proper authentication call
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      avatar: "https://avatars.githubusercontent.com/u/85812823?v=4",
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  return (
    <UserContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}