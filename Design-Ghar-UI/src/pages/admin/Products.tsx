import { useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import ProductTable from '@/components/admin/ProductTable';
import ProductForm from '@/components/admin/ProductForm';
import { useProduct } from '@/context/ProductContext';

export default function Products() {
  const [showForm, setShowForm] = useState(false);
  const {products, updateProduct, deleteProduct} = useProduct();
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 h-0">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8 bg-gray-50 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
              <span
                className={showForm ? 'cursor-pointer hover:underline' : ''}
                onClick={() => setShowForm(false)}
              >
                Admin
              </span>
              <span className="mx-1">/</span>
              <span
                className={showForm ? 'cursor-pointer hover:underline' : ''}
                onClick={() => setShowForm(false)}
              >
                Products
              </span>
              {showForm && <><span className="mx-1">/</span><span>Add Product</span></>}
            </nav>
            {/* Toggle between Product Table and Product Form */}
            {showForm ? (
              <ProductForm />
            ) : (
              <>
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setShowForm(true)}
                  >
                    <span className="bg-blue-100 text-blue-800 text-sm inline-flex items-center px-2 py-2 rounded-sm dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                      <svg className="w-5 h-5 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                      </svg>
                      Add Product
                    </span>
                  </button>
                </div>
                <ProductTable 
                products = {products}
                onEdit = {()=>{}}
                onDelete = {()=>{}}
                 />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}