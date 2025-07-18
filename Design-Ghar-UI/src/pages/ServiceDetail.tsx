import Footer from '@/components/layout/Footer';
import TopBar from '@/components/layout/TopBar';
import Breadcrumb from '@/components/products/Breadcrumb';
import RelatedProducts from '@/components/products/RelatedProducts';
import { Skeleton } from '@/components/ui/skeleton';
import { categoryData } from '@/context/CategoryContext';
import { useProduct } from '@/context/ProductContext';
import { Category } from '@/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ServiceDetail() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { products } = useProduct();
    const {categories} = categoryData();
    const [service, setService] = useState<Category>();

  useEffect(() => {
    const foundService = categories.find(category=> category.id === categoryId);
    if (foundService) {
      setService(foundService);
    }
    console.log('Service Detail:', foundService);
  }, [categoryId, products]);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <div className="h-[140px]" />
      {/* Spacer for fixed TopBar (adjust height as needed) */}
      <main className="flex-grow pt-8 pb-16 px-6 md:px-12 lg:px-24">
        {!service ? (
          <div className="space-y-8">
            <Skeleton className="h-6 w-64" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Skeleton className="aspect-square w-full" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-6 w-32" />
              </div>
            </div>
          </div>
        ) : (
          <>
            <Breadcrumb 
              items={[
                { label: 'Services', href: '/services' },
                { label: service.name || '', href: `/services/${service.id}` },
                { label: service.name }
              ]} 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Service Image */}
              <div className="rounded-lg overflow-hidden bg-white shadow-md">
                <img 
                  src={service.imageUrl || '/placeholder.png'} // Fallback image
                  alt={service.name}
                  className="w-full h-full object-cover aspect-square"
                />
              </div>
              {/* Service Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{service.name}</h1>
                  <p className="text-indigo-600 mt-1">{service.name}</p>
                </div>
                <p className="text-gray-600">{service.description}</p>
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold mb-2">Service Details</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>High-quality service</li>
                    <li>Customizable options</li>
                    <li>Fast delivery</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Related Products */}
            <RelatedProducts 
              products={products} 
              currentProductId={service.id} 
              productType={service.name}
            />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
