import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole } from './roles';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  register: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const defaultUser: User = {
  id: '1',
  name: 'Demo User',
  email: 'demo@dataquest.com',
  role: UserRole.ADMIN,
  avatar: 'https://ui-avatars.com/api/?name=Demo+User'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user] = useState<User>(defaultUser);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const login = async () => {
    // No-op
  };

  const register = async () => {
    // No-op
  };

  const logout = () => {
    // No-op
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: true, 
      login, 
      register, 
      logout, 
      isLoading, 
      error 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 