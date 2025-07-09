import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { CreateComparisonForm } from '../../components/comparisons/CreateComparisonForm';
import { useCreateComparison } from '../../hooks/useComparison';
import { searchProducts, EbaySearchResponse } from '../../services/product/product.service';
import { Product } from '../../interfaces/product/product.dto';
import { useAuthContext } from '../../contexts/AuthContext';

function mapEbayItemToProduct(item: any): Product {
  return {
    id: item.itemId,
    ebayItemId: item.itemId,
    name: item.title,
    condition: item.condition,
    price: item.price,
    currency: item.currency,
    image: item.imageUrl,
    url: item.itemWebUrl,
    location: item.location,
  };
}

export const CreateComparisonPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { create, loading, result } = useCreateComparison();
  const { user } = useAuthContext();

  useEffect(() => {
    // Carga productos para seleccionar
    const fetchProducts = async () => {
      const data: EbaySearchResponse = await searchProducts(''); // Puedes ajustar la query
      const items = data?.ebaySearchResponse?.itemSummaries || [];
      setProducts(items.map(mapEbayItemToProduct));
    };
    fetchProducts();
  }, []);

  const handleCreate = (selected: string[]) => {
    if (!user?.id) return;
    if (selected.length < 2) return; // mínimo 2 productos para comparar
    create({
      id: 0,
      productIds: selected.map(Number), // Usa String si los ids son string
      date: new Date().toISOString(),
      userId: Number(user.id),
    });
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600 dark:from-blue-950 dark:via-blue-900 dark:to-blue-800 px-4">
        <div className="w-full max-w-6xl flex flex-col justify-center bg-white dark:bg-blue-950/90 rounded-2xl shadow-2xl border border-blue-300 dark:border-blue-800 p-8 md:p-16 gap-8">
          <h2 className="text-4xl font-extrabold text-blue-800 dark:text-blue-200 mb-2 text-center md:text-left">Crear nueva comparación</h2>
          <CreateComparisonForm products={products} onCreate={handleCreate} />
          {loading && <div className="text-blue-600 text-center">Guardando comparación...</div>}
          {result && <div className="text-green-600 text-center">¡Comparación creada!</div>}
        </div>
      </div>
    </Layout>
  );
};
