import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../interfaces/auth/auth.types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Inicializa user desde localStorage si existe
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return null;
    const parsed = JSON.parse(storedUser);
    // Parche: si viene _id o userId, mapea a id
    if (!parsed.id && (parsed._id || parsed.userId)) {
      parsed.id = parsed._id || parsed.userId;
    }
    // Asegura que id sea número
    if (parsed.id) parsed.id = Number(parsed.id);
    return parsed;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (user: User, token: string) => {
    // Asegura que id sea número
    if (user.id) user.id = Number(user.id);
    setUser(user);
    setToken(token);
  };
  const logout = () => {
    setUser(null);
    setToken(null);
  };
  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within AuthProvider');
  return context;
};
