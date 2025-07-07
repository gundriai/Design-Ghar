// Type definitions for the DesignGhar application

import { UserRole } from "@/common/enums/UserRole";

export interface Category {
  id: string;
  name: string;
  sku: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  sequence: number;
  tags?: string[];
  createdAt: string; // ISO string for Date
  updatedAt: string; // ISO string for Date
}

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

export interface Banner {
  id: string;
  title: string;
  image: string;
  link: string;
  startDate: string;
  endDate: string;
  priority: number;
}

export interface Offer {
  id: string;
  name: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  appliesTo: 'all' | 'category' | 'specific';
  category?: string;
  productIds?: string[];
  startDate: string;
  endDate: string;
}

export interface User {
  sub: string; // backend returns 'sub' as user id
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}