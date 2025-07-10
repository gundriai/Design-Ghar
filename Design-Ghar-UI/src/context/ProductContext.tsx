import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Product } from '@/interfaces';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface ProductContextType {
  products: Product[];
  fetchProducts: () => Promise<void>;
  addProduct: (data: FormData) => Promise<void>;
  updateProduct: (id: string, data: FormData) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const res = await fetch(`${BASE_URL}products`);
    const data = await res.json();
    setProducts(data.data || []);
  };

  const addProduct = async (formData: FormData) => {
    await fetch(`${BASE_URL}products`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    });
    await fetchProducts();
  };

  const updateProduct = async (id: string, formData: FormData) => {
    await fetch(`${BASE_URL}products/${id}`, {
      method: 'PATCH',
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    });
    await fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    await fetch(`${BASE_URL}products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    });
    await fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{
      products,
      fetchProducts,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProduct must be used within a ProductProvider');
  return ctx;
}
