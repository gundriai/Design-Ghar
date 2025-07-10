import { useEffect, useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import ProductTable from '@/components/admin/ProductTable';
import ProductForm from '@/components/admin/ProductForm';
import { useProduct } from '@/context/ProductContext';
import { Product } from '@/types';

export default function Products() {
  const [view, setView] = useState<'table' | 'add' | 'edit'>('table');
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const { products, updateProduct, deleteProduct, addProduct } = useProduct();
  const [productList, setProductList] = useState(products);

  const handleAdd = () => {
    setEditProduct(null);
    setView('add');
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setView('edit');
  };

  const handleDelete = (product: Product) => {
    deleteProduct(product.id);
  };

  const handleSave = (formData: FormData) => {
    if (view === 'add') {
      addProduct(formData);
    } else if (view === 'edit' && editProduct) {
      // Populate FormData with only changed fields
      // const updatedFormData = new FormData();
      // formData.forEach((value, key) => {
      //   if (key === 'images') {
      //     // Handle new images separately
      //     const existingMediaURLs = editProduct.mediaURLs || [];
      //     const newImages = formData.getAll('images') as File[];
      //     newImages.forEach((image) => {
      //       if (!existingMediaURLs.includes((image as File).name)) {
      //         updatedFormData.append('images', image);
      //       }
      //     });
      //   } else if (editProduct[key as keyof Product] !== value) {
      //     updatedFormData.append(key, value);
      //   }
      // });
      // console.log('Updating product with updatedFormData:', updatedFormData);
      // Call API to update product
      updateProduct(editProduct.id, formData);
    }
    setView('table');
  };

  const handleCancel = () => {
    setView('table');
  };

  const handleProductStatus = (updatedProduct: Product) => {
    // updatedProduct.isActive = !updatedProduct.isActive; // Toggle active status
    const updatedProducts = productList.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProductList(updatedProducts);
  };

  useEffect(() => {
    setProductList(products);
  }, [products]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 h-0">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8 bg-gray-50 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
              <span
                className={view !== 'table' ? 'cursor-pointer hover:underline' : ''}
                onClick={() => setView('table')}
              >
                Admin
              </span>
              <span className="mx-1">/</span>
              <span
                className={view !== 'table' ? 'cursor-pointer hover:underline' : ''}
                onClick={() => setView('table')}
              >
                Products
              </span>
              {view === 'add' && <><span className="mx-1">/</span><span>Add Product</span></>}
              {view === 'edit' && <><span className="mx-1">/</span><span>Edit Product</span></>}
            </nav>
            {/* Toggle between Product Table and Product Form */}
            {view === 'table' ? (
              <>
                <div className="flex justify-end mb-4">
                  <button
                    onClick={handleAdd}
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
                  products={productList}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onProductUpdate={handleProductStatus} // Pass the method here
                />
              </>
            ) : (
              <ProductForm
                mode={view === 'add' ? 'add' : 'edit'}
                initialData={editProduct || {}}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}