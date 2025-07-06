// Type definitions for the DesignGhar application

import { UserRole } from "@/common/enums/UserRole";

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  categoryId: string;
  description: string;
  price: number;
  discountedPrice?: number;
  discount?: number;
  featured: boolean;
  image: string;
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