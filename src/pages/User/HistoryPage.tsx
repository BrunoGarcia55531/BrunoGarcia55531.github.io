import React, { useEffect } from 'react';
import { Layout } from '../../components/layout/Layout';
import { HistoryList } from '../../components/history/HistoryList';
import { useUserSearchHistory } from '../../hooks/useSearchHistory';
import { useAuthContext } from '../../contexts/AuthContext';

export const HistoryPage: React.FC = () => {
  const { user } = useAuthContext();
  const userId = user?.id;
  const { history, loading, fetchHistory } = useUserSearchHistory(userId);

  useEffect(() => {
    if (userId) fetchHistory();
  }, [fetchHistory, userId]);

  return (
    <Layout>
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600 dark:from-blue-950 dark:via-blue-900 dark:to-blue-800 px-4">
        <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl flex flex-col justify-center bg-white dark:bg-blue-950/90 rounded-2xl shadow-2xl border border-blue-300 dark:border-blue-800 p-8 md:p-12 gap-8">
          <h2 className="text-4xl font-extrabold text-blue-800 dark:text-blue-200 mb-2 text-center md:text-left">Historial de búsquedas</h2>
          {loading ? <div className="text-blue-600 text-center">Cargando...</div> : <HistoryList history={history} onRepeat={() => {}} />}
        </div>
      </div>
    </Layout>
  );
};
