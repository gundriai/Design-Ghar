import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Category } from '@/types';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000/';

interface CategoryContextType {
    categories: Category[];
    fetchCategories: () => Promise<void>;
    addCategory: (data: FormData) => Promise<void>;
    updateCategory: (id: string, data: FormData) => Promise<void>;
    deleteCategory: (id: string) => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);



export const CategoryProvider = ({ children }: { children: ReactNode }) => {
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchCategories = async () => {
        const res = await fetch(`${BASE_URL.replace(/\/$/, '')}/categories`);
        const data = await res.json();
        setCategories(data);
    };

    const addCategory = async (formData: FormData) => {
        await fetch(`${BASE_URL.replace(/\/$/, '')}/categories`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },
        });
        await fetchCategories();
    };

    const updateCategory = async (id: string, formData: FormData) => {
        console.log('Data for update',formData);
        await fetch(`${BASE_URL.replace(/\/$/, '')}/categories/${id}`, {
            method: 'PATCH',
            body: formData,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },
        });
        await fetchCategories();
    };

    const deleteCategory = async (id: string) => {
        await fetch(`${BASE_URL.replace(/\/$/, '')}/categories/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },
        });
        await fetchCategories();
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{
            categories,
            fetchCategories,
            addCategory,
            updateCategory,
            deleteCategory
        }}>
            {children}
        </CategoryContext.Provider>
    );
};


export function categoryData() {
    const ctx = useContext(CategoryContext);
    if (!ctx) throw new Error('useCategoryContext must be used within a CategoryProvider');
    return ctx;
}
