export interface FavoriteDTO {
  id: number;
  productId: number;
  userId: number;
  savedDate: string;
  ebayItemId?: string;
  title?: string;
  price?: number;
  image?: string;
  url?: string;
  condition?: string;
  currency?: string;
  primaryCategoryId?: string;
}
