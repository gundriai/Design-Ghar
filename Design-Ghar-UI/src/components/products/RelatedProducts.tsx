import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types';
import ProductCard from '@/components/home/ProductCard';
import { Button } from '@/components/ui/button';

interface RelatedProductsProps {
  products: Product[];
  currentProductId: string;
  productType?: string;
}

export default function RelatedProducts({ products, currentProductId, productType }: RelatedProductsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter out current product and get products of the same type
  const filteredProducts = products
    .filter(product => product.id !== currentProductId)
    .filter(product => !productType || product.categoryName === productType)
    .slice(0, 6); // Limit to 6 products

  if (filteredProducts.length === 0) return null;

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
    <div className="py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Related Products</h2>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={scrollLeft}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={scrollRight}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex space-x-6 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory"
      >
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            className="w-[280px] flex-shrink-0 snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}