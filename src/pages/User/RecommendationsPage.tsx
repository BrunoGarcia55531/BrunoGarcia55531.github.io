import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/layout/Layout';
import { RecommendationList } from '../../components/recommendations/RecommendationList';
import { useUserRecommendations } from '../../hooks/useRecommendation';

export const RecommendationsPage: React.FC = () => {
  const { recommendations, loading, fetchRecommendations } = useUserRecommendations();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return (
    <Layout>
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600 dark:from-blue-950 dark:via-blue-900 dark:to-blue-800 px-4">
        <div className="w-full max-w-4xl flex flex-col bg-white dark:bg-blue-950/90 rounded-2xl shadow-2xl border border-blue-300 dark:border-blue-800 p-8 gap-8">
          <h2 className="text-4xl font-extrabold text-blue-800 dark:text-blue-200 text-center">
            Tus recomendaciones
          </h2>
          {loading ? (
            <div className="text-blue-600 text-center">Cargando recomendaciones…</div>
          ) : (
            <RecommendationList
              recommendations={recommendations}
              onProductClick={(id: string) =>
                navigate(`/product/${id}`, { state: { from: 'recommendations' } })
              }
            />
          )}
        </div>
      </div>
    </Layout>
  );
};
