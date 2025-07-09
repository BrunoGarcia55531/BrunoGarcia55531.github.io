import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { ComparisonList } from '../../components/comparisons/ComparisonList';
import { useComparisons, useDeleteComparison } from '../../hooks/useComparison';
import { ConfirmationDialog } from '../../components/ui/ConfirmationDialog';

export const ComparisonsPage: React.FC = () => {
  const { comparisons, loading, fetchComparisons } = useComparisons();
  const { remove } = useDeleteComparison();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    fetchComparisons();
  }, [fetchComparisons]);

  const handleDelete = (id: number) => {
    setSelectedId(id);
    setDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedId !== null) {
      await remove(selectedId);
      fetchComparisons();
      setDialogOpen(false);
      setSelectedId(null);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600 dark:from-blue-950 dark:via-blue-900 dark:to-blue-800 px-4">
        <div className="w-full max-w-6xl flex flex-col justify-center bg-white dark:bg-blue-950/90 rounded-2xl shadow-2xl border border-blue-300 dark:border-blue-800 p-8 md:p-16 gap-8">
          <h2 className="text-4xl font-extrabold text-blue-800 dark:text-blue-200 mb-2 text-center md:text-left">Comparaciones guardadas</h2>
          {loading ? <div className="text-blue-600 text-center">Cargando...</div> : <ComparisonList comparisons={comparisons} onSelect={() => {}} onDelete={handleDelete} />}
          <ConfirmationDialog open={dialogOpen} message="¿Eliminar comparación?" onConfirm={confirmDelete} onCancel={() => setDialogOpen(false)} />
        </div>
      </div>
    </Layout>
  );
};
