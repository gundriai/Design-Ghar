import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, Image } from 'lucide-react';
import { Product } from '@/types';
import TopBar from '@/components/layout/TopBar';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/products/Breadcrumb';
import RelatedProducts from '@/components/products/RelatedProducts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useProduct } from '@/context/ProductContext';

export default function ProductDetail() {
  const {categoryId, id } = useParams<{categoryId:string, id: string }>();
  const {products} = useProduct();
  const [product, setProduct] = useState<Product>();
  
  useEffect(() => {
      const foundProduct = products.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
      }
  }, [id, products]);


  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <div className="h-[140px]" />
      {/* Spacer for fixed TopBar (adjust height as needed) */}
      <main className="flex-grow pt-8 pb-16 px-6 md:px-12 lg:px-24">
        {!product ? (
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
                <div className="flex gap-4 pt-4">
                  <Skeleton className="h-12 flex-1" />
                  <Skeleton className="h-12 flex-1" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Breadcrumb 
              items={[
                { label: 'Products', href: '/products' },
                { label: product.categoryName || '', href: `/products/${product.categoryId}` },
                { label: product.name }
              ]} 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Product Image */}
              <div className="rounded-lg overflow-hidden bg-white shadow-md">
                <img 
                  src={product.mediaURLs?.[0] || '/placeholder.png'} // Fallback image
                  alt={product.name}
                  className="w-full h-full object-cover aspect-square"
                />
              </div>
              
              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                  <p className="text-indigo-600 mt-1">{product.categoryName}</p>
                </div>
                
                <p className="text-gray-600">{product.description}</p>
                
                <div className="flex items-baseline">
                  {product.finalPrice && (
                    <span className="text-green-600 font-bold text-2xl">
                      Rs. {product.finalPrice}
                    </span>
                  )}
                  <span className={`${product.basePrice ? 'ml-2 text-gray-500 line-through text-lg' : 'text-green-600 font-bold text-2xl'}`}>
                    Rs. {product.basePrice}
                  </span>
                  
                  {product.basePrice && product.finalPrice && (
                    <Badge className="ml-3 bg-red-500 hover:bg-red-600">
                      {Math.ceil(((product.basePrice - product.finalPrice) / product.basePrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>
                
                <div className="pt-6 space-y-4">
                  <Button 
                    size="lg"
                    className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call to Buy
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full md:w-auto border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                  >
                    <Image className="mr-2 h-5 w-5" />
                    More Photos
                  </Button>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold mb-2">Product Details</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>High-quality materials</li>
                    <li>Available in multiple sizes and colors</li>
                    <li>Custom designs available</li>
                    <li>Fast production time</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Related Products */}
            <RelatedProducts 
              products={products} 
              currentProductId={product.id} 
              productType={product.categoryName}
            />
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
}