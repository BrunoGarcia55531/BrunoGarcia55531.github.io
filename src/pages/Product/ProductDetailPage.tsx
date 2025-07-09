import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { ProductDetail } from '../../components/product/ProductDetail';
import { Loader } from '../../components/ui/Loader';
import { getProduct } from '../../services/product/product.service';
import { addFavorite, getFavorites, removeFavorite } from '../../services/favorite/favorite.service';
import { Product } from '../../interfaces/product/product.dto';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

interface LocationState {
  from?: 'search' | 'favorites' | 'recommendations';
  products?: Product[];
}

export const ProductDetailPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState<number | null>(null);
  const [favMessage, setFavMessage] = useState<{ text: string; type: 'success' | 'error' | null }>({ text: '', type: null });
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = (location.state ?? {}) as LocationState;
  const origin = locationState.from;
  const userId = user?.id;

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (error: any) {
        setProduct(null);
        let msg = 'No se pudo cargar el producto.';
        if (error?.response?.data?.error?.includes('Producto no encontrado')) {
          msg = 'El producto no existe o no está disponible.';
        }
        alert(msg);
        console.error('Error al obtener producto:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!userId || !id) return;
    const checkFavorite = async () => {
      try {
        const favs = await getFavorites(String(userId), 0, 100);
        const found = favs.content?.find(f => f.ebayItemId === id || f.productId?.toString() === id);
        setIsFavorite(!!found);
        setFavoriteId(found?.id || null);
      } catch (error) {
        setIsFavorite(false);
        setFavoriteId(null);
        console.error('Error al obtener favoritos:', error);
      }
    };
    checkFavorite();
  }, [userId, id]);

  const handleFavorite = async () => {
    if (!userId || !product) {
      setFavMessage({ text: 'Debes iniciar sesión para gestionar favoritos.', type: 'error' });
      return;
    }
    try {
      if (isFavorite && favoriteId) {
        await removeFavorite(favoriteId);
        setIsFavorite(false);
        setFavoriteId(null);
        setFavMessage({ text: 'Producto quitado de favoritos.', type: 'error' });
      } else {
        const fav = await addFavorite(userId, product);
        setIsFavorite(true);
        setFavoriteId(fav.id);
        setFavMessage({ text: 'Producto agregado a favoritos correctamente.', type: 'success' });
      }
    } catch (err) {
      setFavMessage({ text: 'No se pudo agregar o quitar de favoritos. Contacta al administrador.', type: 'error' });
      console.error('Error al agregar/quitar favorito:', err);
    }
  };

  return (
    <Layout>
      <main className="flex-1 w-full max-w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600 dark:from-blue-950 dark:via-blue-900 dark:to-blue-800 px-0">
        <section className="w-full max-w-6xl flex flex-col justify-center bg-white dark:bg-blue-950/90 rounded-2xl shadow-2xl border border-blue-300 dark:border-blue-800 p-4 md:p-16 gap-8 mx-auto">
          <button
            className="mb-4 self-start bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold hover:bg-blue-200 transition-colors"
            onClick={() => {
              if (origin === 'search' && locationState.products) {
                navigate('/search', { state: { products: locationState.products } });
              } else if (origin === 'recommendations') {
                navigate('/recommendations');
              } else {
                navigate('/favorites');
              }
            }}
          >
            ← Volver
          </button>
          <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-blue-950 dark:via-blue-900 dark:to-blue-800 rounded-2xl p-6 md:p-10 shadow-lg mb-8 flex flex-col items-center w-full">
            {loading ? (
              <Loader />
            ) : !product ? (
              <div className="text-center text-blue-900 dark:text-blue-200 text-xl font-bold py-12">
                El producto no existe o no está disponible.<br />
                <span className="text-blue-600 text-base font-normal">
                  Verifica el enlace o busca otro producto.
                </span>
              </div>
            ) : (
              <ProductDetail
                product={product}
                onFavorite={handleFavorite}
                isFavorite={isFavorite}
                isAuthenticated={!!user}
                showRemoveButton
                favMessage={favMessage}
              />
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
};
