export interface ComparisonDTO {
  id: number; // Use null for new comparisons
  productIds: number[];
  date: string; // ISO string
  userId: number;
}
