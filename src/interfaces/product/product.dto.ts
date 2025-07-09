export interface Product {
  id: string;
  ebayItemId: string;
  name: string;
  condition: string;
  price: number;
  currency: string;
  image: string;
  url: string;
  location: string;
  primaryCategoryId?: string;
}
