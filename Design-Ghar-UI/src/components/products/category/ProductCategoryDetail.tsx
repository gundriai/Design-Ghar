import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom';
import ProductCard from '@/components/home/ProductCard';
import { useData } from '@/context/DataContext';
import { Category, Product } from '@/types';
import TopBar from '@/components/layout/TopBar';

export default function ProductCategoryDetail() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { products, services } = useData();

  // Find the category details (services is Category[])
  const category = services.find((c: Category) => c.id === categoryId);
  // Filter products by categoryId
  const relatedProducts = products.filter((p: Product) => p.categoryId === categoryId);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <>
      <TopBar />
      <div className="h-[140px]" />
      {/* Spacer for fixed TopBar (adjust height as needed) */}
      <div className="py-12 px-4 md:px-12 lg:px-24">
        {/* Category Detail Section */}
        <div className="mb-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
          {category?.icon && (
            <img src={category.icon} alt={category.name} className="w-40 h-40 object-contain rounded-xl" />
          )}
          <div>
            <h1 className="text-3xl font-bold text-indigo-700 mb-2">{category?.name}</h1>
            <p className="text-gray-600 text-lg mb-4">{category?.description}</p>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Related Products</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={scrollLeft} className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={scrollRight} className="rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto pb-4 scroll-smooth">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((product: Product) => (
              <div key={product.id} className="min-w-[300px] max-w-xs flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="text-gray-500">No products found in this category.</div>
          )}
        </div>
      </div>
    </>
  );
}