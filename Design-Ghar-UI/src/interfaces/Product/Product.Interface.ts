export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  features?: string;
  categoryId: string;
  categoryName?: string;
  mediaURLs?: string[];
  basePrice: number;
  discountPercentage?: number;
  finalPrice: number;
  isActive: boolean;
  isFeatured: boolean;
  viewCount: number;
  tags?: string[];
  created_at: string;
  updated_at: string;
}