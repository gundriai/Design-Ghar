import React, { useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import ServiceTable from '@/components/admin/ServiceTable';
import ServiceForm from '@/components/admin/ServiceForm';
import { categoryData } from '@/context/CategoryContext';
import { Category } from '@/types';

export default function Services() {
  const { categories, addCategory, updateCategory, deleteCategory } = categoryData();
  const [view, setView] = useState<'table' | 'add' | 'edit'>('table');
  const [editService, setEditService] = useState<Category | null>(null);

  // Breadcrumb logic
  const renderBreadcrumb = () => (
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
        Services
      </span>
      {view === 'add' && <><span className="mx-1">/</span><span>Add Service</span></>}
      {view === 'edit' && <><span className="mx-1">/</span><span>Edit Service</span></>}
    </nav>
  );

  // Handlers
  const handleAdd = () => {
    setEditService(null);
    setView('add');
  };
  const handleEdit = (service: Category) => {
    setEditService(service);
    setView('edit');
  };
  const handleDelete = (service: Category) => {
    deleteCategory(service.id);
  };
  const handleSave = (formData: FormData) => {
    if (view === 'add') {
      addCategory(formData);
    } else if (view === 'edit' && editService) {
      updateCategory(editService.id, formData);
    }
    setView('table');
  };
  const handleCancel = () => {
    setView('table');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            {renderBreadcrumb()}
            {view === 'table' && (
              <>
                <div className="flex justify-end mb-4">
                  <button
                    className="bg-blue-100 text-blue-800 text-sm inline-flex items-center px-2 py-2 rounded-sm dark:bg-gray-700 dark:text-blue-400 border border-blue-400 hover:bg-blue-200 transition-colors"
                    onClick={handleAdd}
                  >
                    <svg className="w-5 h-5 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                    </svg>
                    Add Service
                  </button>
                </div>
                <ServiceTable
                  services={categories}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </>
            )}
            {(view === 'add' || view === 'edit') && (
              <ServiceForm
                mode={view === 'add' ? 'add' : 'edit'}
                initialData={editService || {}}
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