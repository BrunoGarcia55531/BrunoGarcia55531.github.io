import React, { useEffect, useState } from 'react';
import { RecommendationDTO } from '../../interfaces/recommendation/recommendation.dto';
import { Product } from '../../interfaces/product/product.dto';
import { ProductList } from '../product/ProductList';
import * as productService from '../../services/product/product.service';

interface RecommendationListProps {
  recommendations: RecommendationDTO[];
  /** callback que recibe el id de producto al clicar */
  onProductClick?: (id: string) => void;
}

export const RecommendationList: React.FC<RecommendationListProps> = ({
  recommendations,
  onProductClick
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadDetails() {
      setLoading(true);
      try {
        const prods = await Promise.all(
          recommendations.map(async (rec) => {
            const res = await productService.getProductById(
              rec.suggestedProductId.toString()
            );
            return res.data;
          })
        );
        setProducts(prods);
      } catch (err) {
        console.error('Error cargando detalles de recomendación', err);
      } finally {
        setLoading(false);
      }
    }

    if (recommendations.length > 0) {
      loadDetails();
    } else {
      setProducts([]);
    }
  }, [recommendations]);

  if (loading) {
    return <div className="text-center py-8">Cargando recomendaciones…</div>;
  }

  if (products.length === 0) {
    return <div className="text-center text-blue-400 py-8">No hay recomendaciones.</div>;
  }

  return (
    <ProductList
      products={products}
      onProductClick={onProductClick}
    />
  );
};

