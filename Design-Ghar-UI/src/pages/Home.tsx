import BannerCarousel from '@/components/home/Banner';
import ProductCard from '@/components/home/ProductCard';
import ServiceCard from '@/components/home/ServiceCard';
import Footer from '@/components/layout/Footer';
import TopBar from '@/components/layout/TopBar';
import { Skeleton } from '@/components/ui/skeleton';
import { bannerData } from '@/context/BannerContext';
import { categoryData } from '@/context/CategoryContext';
import { useProduct } from '@/context/ProductContext';
import { Location } from './location';
import Testomonial from '@/components/home/Testimonial';
export default function Home() {
  const {banners, isLoading } = bannerData();
  const {categories} = categoryData();
  const {products} = useProduct();
  
  // Get featured products
  const featuredProducts = products.filter(product => product.isFeatured);
  return (
    <div className="min-h-screen flex flex-col ">
      <TopBar />
      <div className="h-[80px]" />
      {/* Spacer for fixed TopBar (adjust height as needed) */}
      <main className="flex-grow pt-8">
        {/* Banner + Elephant Row */}
        <div className="flex flex-row w-full max-w-[1440px] mx-auto px-4 md:px-12 lg:px-24 mb-8" style={{minHeight: '320px'}}>
          {/* Banner occupies 80% */}
          <div className="w-full">
            {isLoading ? (
              <div className="h-[320px] animate-pulse rounded-xl" />
            ) : (
              <BannerCarousel banners={banners} />
            )}
          </div>
        </div>
        
        {/* Services Section */}
        <section className="px-6 md:px-12 lg:px-24 py-16">
          <h2 className="text-3xl font-semibold text-center mb-4">Our Services</h2>
          <div className="w-20 h-1 bg-rose-500 mx-auto mb-4"></div>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-40 w-40 rounded-full mx-auto" />
                  <Skeleton className="h-6 w-3/4 mx-auto" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-10 w-28 mx-auto" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <ServiceCard key={category.id} {...category} />
              ))}
            </div>
          )}
        </section>
        
        {/* Featured Products Section */}
        <section className="px-6 md:px-12 lg:px-24 py-16">
          <h2 className="text-3xl font-semibold text-center mb-4">Popular Products</h2>
          <div className="w-20 h-1 bg-rose-500 mx-auto mb-4"></div>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex gap-2">
                    <Skeleton className="h-10 flex-1" />
                    <Skeleton className="h-10 flex-1" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      
      
         <Location />

        {/* Testimonials Section */}
        <Testomonial />
      </main>
      
      <Footer />
    </div>
  );
}