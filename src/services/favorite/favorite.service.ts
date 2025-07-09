import axios from '../../utils/api';
import { FavoriteDTO } from '../../interfaces/favorite/favorite.dto';
import { Page } from '../../interfaces/common/page.dto';
import { Product } from '../../interfaces/product/product.dto';

export const getFavorites = async (
  userId: string | number, // acepta string o number
  page: number = 0,
  size: number = 10
): Promise<Page<FavoriteDTO>> => {
  const response = await axios.get(`/favorites/user/${userId}`, {
    params: { page, size },
  });
  return response.data;
};

export const addFavorite = async (
  userId: string | number, // vuelve a aceptar string o number
  product: Product
): Promise<FavoriteDTO> => {
  // Mapea el objeto al DTO esperado por el backend
  const dto = {
    userId: Number(userId), // asegura que se envía como número
    productId: product.id,
    ebayItemId: product.ebayItemId || product.id,
    title: product.name || (product as any).name,
    price: product.price,
    image: product.image,
    url: product.url,
    condition: product.condition,
    currency: product.currency,
    primaryCategoryId: product.primaryCategoryId,
  };
  const response = await axios.post('/favorites', dto);
  return response.data;
};

export const removeFavorite = async (id: number): Promise<void> => {
  await axios.delete(`/favorites/${id}`);
};
