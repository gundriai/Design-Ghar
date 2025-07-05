import { useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import ProductTable from '@/components/admin/ProductTable';
import ProductForm from '@/components/admin/ProductForm';

export default function Products() {
  const [showForm, setShowForm] = useState(false);

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
                  className="inline-flex items-center px-4 py-2 bg-primary text-white rounded"
                  onClick={() => setShowForm(true)}
                  >
                  <span className="mr-2">+</span> Add Product
                  </button>
                </div>
                <ProductTable />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}