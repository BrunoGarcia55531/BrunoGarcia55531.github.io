import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { FavoriteList } from '../../components/favorites/FavoriteList';
import { Pagination } from '../../components/ui/Pagination';
import { EmptyState } from '../../components/ui/EmptyState';
import { getFavorites, removeFavorite } from '../../services/favorite/favorite.service';
import { FavoriteDTO } from '../../interfaces/favorite/favorite.dto';
import { useAuthContext } from '../../contexts/AuthContext';

export const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useAuthContext();

  const fetchFavorites = async (userId: number, page: number) => {
    setLoading(true);
    try {
      const res = await getFavorites(String(userId), page, 10); // userId convertido a string para el servicio
      setFavorites(res.content || []);
      setTotalPages(res.totalPages || 1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.id) {
      setFavorites([]);
      setTotalPages(1);
      return;
    }
    fetchFavorites(Number(user.id), page);
  }, [page, user]);

  const handleRemoveFavorite = async (favoriteId: number) => {
    if (!user?.id) {
      alert('Debes iniciar sesión para gestionar favoritos.');
      return;
    }
    await removeFavorite(favoriteId);
    fetchFavorites(Number(user.id), page);
  };

  return (
    <Layout>
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600 dark:from-blue-950 dark:via-blue-900 dark:to-blue-800 px-4">
        <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl flex flex-col justify-center bg-white dark:bg-blue-950/90 rounded-2xl shadow-2xl border border-blue-300 dark:border-blue-800 p-8 md:p-12 gap-8">
          <h2 className="text-4xl font-extrabold text-blue-800 dark:text-blue-200 mb-2 text-center md:text-left">Tus favoritos</h2>
          {loading ? <div className="text-blue-600 text-center">Cargando...</div> : favorites.length === 0 ? (
            <EmptyState message="No tienes productos favoritos." />
          ) : (
            <FavoriteList 
              favorites={favorites} 
              onRemoveFavorite={handleRemoveFavorite}
              showEbayButton={false}
            />
          )}
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </Layout>
  );
};
