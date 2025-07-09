import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/layout/Layout';
import { SearchForm } from '../../components/product/SearchForm';
import { ProductList } from '../../components/product/ProductList';
import { Loader } from '../../components/ui/Loader';
import { useSaveSearchHistory } from '../../hooks/useSearchHistory';
import { searchProducts } from '../../services/product/product.service';
import { Product } from '../../interfaces/product/product.dto';
import { useNavigate, useLocation } from 'react-router-dom';

interface LocationState {
  products?: Product[];
}

function mapEbayItemToProduct(item: any): Product {
  return {
    id: item.itemId,
    ebayItemId: item.itemId,
    name: item.name,
    condition: item.condition,
    price: item.price,
    currency: item.currency,
    image: item.imageUrl,
    url: item.itemWebUrl,
    location: item.location
  };
}

export const SearchPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { save } = useSaveSearchHistory();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = (location.state ?? {}) as LocationState;

  useEffect(() => {
    if (locationState.products) {
      setProducts(locationState.products);
    }
  }, [locationState.products]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const data: any = await searchProducts(query);
      const items = data?.ebaySearchResponse?.itemSummaries || [];
      setProducts(items.map(mapEbayItemToProduct));
      save(query);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`, { state: { from: 'search', products } });
  };

  return (
    <Layout>
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600 dark:from-blue-950 dark:via-blue-900 dark:to-blue-800 px-4">
        <div className="w-full max-w-6xl flex flex-col justify-center bg-white dark:bg-blue-950/90 rounded-2xl shadow-2xl border border-blue-300 dark:border-blue-800 p-8 md:p-16 gap-8">
          <h2 className="text-4xl font-extrabold text-blue-800 dark:text-blue-200 mb-2 text-center md:text-left">
            Buscar productos en eBay
          </h2>
          <SearchForm onSearch={handleSearch} />
          {loading ? (
            <Loader />
          ) : (
            <ProductList products={products} onProductClick={handleProductClick} />
          )}
        </div>
      </div>
    </Layout>
  );
};
