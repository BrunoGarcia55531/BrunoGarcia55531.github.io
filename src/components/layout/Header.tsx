import React from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { useLocation, useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  return (
    <header className="backdrop-blur bg-white/80 dark:bg-blue-950/80 border-b border-blue-200 dark:border-blue-900 shadow-lg mx-2 mt-2 flex items-center justify-between min-h-[72px] h-20 px-8">
      <h1 className="!text-3xl font-extrabold tracking-tight text-blue-700 dark:text-blue-200 font-sans select-none flex items-center h-full">
        Smart<span className="text-blue-500 dark:text-blue-400">Compare</span>
      </h1>
      {isAuthenticated && (
        <nav className="flex items-center gap-4 h-full">
          {!isHome && (
            <Button
              onClick={() => navigate('/')}
              className="!bg-gradient-to-r !from-blue-400 !via-blue-500 !to-blue-600 !text-white !font-bold !rounded-full !shadow-lg !border-none !outline-none !focus:ring-2 !focus:ring-blue-400/60 !hover:from-blue-500 !hover:to-blue-700 !transition-all !duration-150 !text-base !px-6 !py-2 !scale-100 !hover:scale-105 !active:scale-95"
            >
              Volver al dashboard
            </Button>
          )}
          <Button
            onClick={logout}
            className="!bg-gradient-to-r !from-red-400 !via-red-500 !to-red-600 !text-white !font-bold !rounded-full !shadow-lg !border-none !outline-none !focus:ring-2 !focus:ring-red-400/60 !hover:from-red-500 !hover:to-red-700 !transition-all !duration-150 !text-base !px-6 !py-2 !scale-100 !hover:scale-105 !active:scale-95"
          >
            Cerrar sesión
          </Button>
        </nav>
      )}
    </header>
  );
};
