import { Product } from '@/interfaces';

const BASE_URL = import.meta.env.VITE_BASE_URL;
export type CreateProductPayload = Omit<Product, 'id' | 'mediaURLs' | 'created_at' | 'updated_at'> & {
  files: File[];
};

export async function createProduct(
  payload: CreateProductPayload,
  token: string
): Promise<Product> {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (key === 'files' && Array.isArray(value)) {
      value.forEach((file) => formData.append('files', file));
    } else if (key === 'tags' && Array.isArray(value)) {
      value.forEach((tag) => formData.append('tags', tag));
    } else if (value !== undefined && value !== null) {
      formData.append(key, value as any);
    }
  });

  const response = await fetch(`${BASE_URL}products`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
      // 'Content-Type' is NOT set here for FormData
    },
    body: formData,
  });

  if (!response.ok) {
    let errorMessage = 'An error occurred while creating the product';
    try {
      const errorData = await response.json();
      if (errorData && errorData.message) {
        errorMessage = errorData.message;
      }
    } catch (e) {
      // ignore JSON parse errors
    }
    throw new Error(errorMessage);
  }
  return response.json();
}

export interface GetProductsResponse {
  data: Product[];
  page: number;
  limit: number;
  total: number;
}

export async function getProducts(page = 1, limit = 20): Promise<GetProductsResponse> {
  const response = await fetch(`${BASE_URL}products?page=${page}&limit=${limit}`, {
    headers: {
      Accept: '*/*',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}
