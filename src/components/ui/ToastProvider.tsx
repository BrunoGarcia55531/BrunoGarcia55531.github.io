import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ToastContextType {
  success: (msg: string) => void;
  error: (msg: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<'success' | 'error' | null>(null);

  const show = (msg: string, t: 'success' | 'error') => {
    setMessage(msg);
    setType(t);
    setTimeout(() => {
      setMessage(null);
      setType(null);
    }, 3500);
  };

  const success = (msg: string) => show(msg, 'success');
  const error = (msg: string) => show(msg, 'error');

  return (
    <ToastContext.Provider value={{ success, error }}>
      {children}
      {message && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg text-white ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast debe usarse dentro de ToastProvider');
  return ctx;
};
