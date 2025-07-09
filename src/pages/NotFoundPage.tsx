import React from 'react';
import { EmptyState } from '../components/ui/EmptyState';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600 dark:from-blue-950 dark:via-blue-900 dark:to-blue-800 px-4">
      <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl flex flex-col justify-center bg-white dark:bg-blue-950/90 rounded-2xl shadow-2xl border border-blue-300 dark:border-blue-800 p-8 md:p-12 gap-8">
        <div className="flex flex-col items-center justify-center gap-6">
          <EmptyState message="Página no encontrada (404)" />
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-3 rounded-full bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition-colors text-lg"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
