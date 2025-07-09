import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { ComparisonTable } from '../../components/comparisons/ComparisonTable';
import { getComparisonById } from '../../services/comparison/comparison.service';
import { getProduct } from '../../services/product/product.service';
import { Product } from '../../interfaces/product/product.dto';
import { useParams } from 'react-router-dom';

export const ComparisonDetailPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchComparison = async () => {
      setLoading(true);
      try {
        if (!id) return;
        const comparison = await getComparisonById(Number(id));
        // Suponiendo que comparison.productIds es un array de IDs
        const productPromises = (comparison.productIds || []).map((pid: number) => getProduct(String(pid)));
        const productsData = await Promise.all(productPromises);
        setProducts(productsData);
      } finally {
        setLoading(false);
      }
    };
    fetchComparison();
  }, [id]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600 dark:from-blue-950 dark:via-blue-900 dark:to-blue-800 px-4">
        <div className="w-full max-w-6xl flex flex-col justify-center bg-white dark:bg-blue-950/90 rounded-2xl shadow-2xl border border-blue-300 dark:border-blue-800 p-8 md:p-16 gap-8">
          <h2 className="text-4xl font-extrabold text-blue-800 dark:text-blue-200 mb-2 text-center md:text-left">Detalle de comparación</h2>
          {loading ? <div className="text-blue-600 text-center">Cargando...</div> : <ComparisonTable products={products} />}
        </div>
      </div>
    </Layout>
  );
};
