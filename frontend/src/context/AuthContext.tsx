import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api.js';

interface UserType {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatar?: string;
}

interface AuthContextType {
  user: UserType | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role?: string) => Promise<void>;
  loginWithGoogle: (googleId: string, email: string, name: string, avatar?: string) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: Partial<UserType>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('cuvasol_token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await api.get('/auth/me');
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          logout();
        }
      } catch (err) {
        console.error('Error fetching current user', err);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, [token]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token: receivedToken, user: loggedUser } = response.data;
      
      localStorage.setItem('cuvasol_token', receivedToken);
      setToken(receivedToken);
      setUser(loggedUser);
    } catch (err: any) {
      setIsLoading(false);
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  };

  const register = async (name: string, email: string, password: string, role?: string) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/register', { name, email, password, role });
      const { token: receivedToken, user: registeredUser } = response.data;
      
      localStorage.setItem('cuvasol_token', receivedToken);
      setToken(receivedToken);
      setUser(registeredUser);
    } catch (err: any) {
      setIsLoading(false);
      throw new Error(err.response?.data?.message || 'Registration failed');
    }
  };

  const loginWithGoogle = async (googleId: string, email: string, name: string, avatar?: string) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/google', { googleId, email, name, avatar });
      const { token: receivedToken, user: loggedUser } = response.data;
      
      localStorage.setItem('cuvasol_token', receivedToken);
      setToken(receivedToken);
      setUser(loggedUser);
    } catch (err: any) {
      setIsLoading(false);
      throw new Error(err.response?.data?.message || 'Google OAuth failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('cuvasol_token');
    setToken(null);
    setUser(null);
    setIsLoading(false);
  };

  const updateUser = (updatedUser: Partial<UserType>) => {
    if (user) {
      setUser({ ...user, ...updatedUser } as UserType);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        register,
        loginWithGoogle,
        logout,
        updateUser
      }}
    >
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
