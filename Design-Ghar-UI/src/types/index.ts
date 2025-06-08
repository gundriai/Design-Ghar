// Type definitions for the DesignGhar application

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
  id: string;
  name: string;
  email: string;
}