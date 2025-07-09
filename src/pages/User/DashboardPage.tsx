import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { Card } from '../../components/ui/Card';
import { useAuthContext } from '../../contexts/AuthContext';

export const DashboardPage: React.FC = () => {
  const { user } = useAuthContext();
  return (
    <Layout>
      <main className="flex-1 w-full max-w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600 dark:from-blue-950 dark:via-blue-900 dark:to-blue-800 px-0">
        <section className="w-full max-w-4xl flex flex-col justify-center bg-white dark:bg-blue-950/90 rounded-2xl shadow-2xl border border-blue-300 dark:border-blue-800 p-4 md:p-12 gap-8 mx-auto">
          <h2 className="text-4xl font-extrabold text-blue-800 dark:text-blue-200 mb-2 text-center">
            Bienvenido{user?.name ? `, ${user.name}` : ''} a SmartCompare
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card as="a" href="/search">
              <span className="block text-center font-bold text-blue-600 w-full h-full">Buscar productos</span>
            </Card>
            <Card as="a" href="/favorites">
              <span className="block text-center font-bold text-blue-600 w-full h-full">Ver favoritos</span>
            </Card>
            <Card as="a" href="/history">
              <span className="block text-center font-bold text-blue-600 w-full h-full">Historial de búsquedas</span>
            </Card>
            <Card as="a" href="/recommendations">
              <span className="block text-center font-bold text-blue-600 w-full h-full">Recomendaciones</span>
            </Card>
          </div>
        </section>
      </main>
    </Layout>
  );
};
