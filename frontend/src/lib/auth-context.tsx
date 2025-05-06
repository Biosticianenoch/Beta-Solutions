import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole } from './roles';
import { authAPI } from './api';

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
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user on mount if token exists
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const { data } = await authAPI.getCurrentUser();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err: any) {
        setUser(null);
        setError(err?.response?.data?.error || err.message || 'Failed to fetch user');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await authAPI.login(email, password);
      if (data?.token) {
        localStorage.setItem('token', data.token);
      }
      const userRes = await authAPI.getCurrentUser();
      setUser(userRes.data);
    } catch (err: any) {
      setError(err?.response?.data?.error || err.message || 'Login failed');
      setUser(null);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      await authAPI.register(userData);
      // Optionally auto-login after registration
      await login(userData.email, userData.password);
    } catch (err: any) {
      setError(err?.response?.data?.error || err.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await authAPI.logout();
    } finally {
      setUser(null);
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user: user as User,
      isAuthenticated: !!user,
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
};const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);from flask_cors import CORS

# After you create your app:
app = Flask(__name__)
CORS(app, origins=["https://data-quest-solutions.vercel.app"]) 