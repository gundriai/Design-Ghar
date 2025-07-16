import BannerCarousel from '@/components/home/Banner';
import ProductCard from '@/components/home/ProductCard';
import ServiceCard from '@/components/home/ServiceCard';
import Footer from '@/components/layout/Footer';
import TopBar from '@/components/layout/TopBar';
import { Skeleton } from '@/components/ui/skeleton';
import { categoryData } from '@/context/CategoryContext';
import { useData } from '@/context/DataContext';
import { useProduct } from '@/context/ProductContext';
import { Location } from './location';
import { bannerData, BannerProvider } from '@/context/BannerContext';

export default function Home() {
  const {banners, isLoading } = bannerData();
  const {categories} = categoryData();
  const {products} = useProduct();
  
  // Get featured products
  const featuredProducts = products.filter(product => product.isFeatured);

  return (
    <div className="min-h-screen flex flex-col ">
      <TopBar />
      <div className="h-[140px]" />
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
          <h2 className="text-3xl font-semibold text-center mb-12">Our Services</h2>
          
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
          <h2 className="text-3xl font-semibold text-center mb-12">Popular Products</h2>
          
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
        <section className="px-6 md:px-12 lg:px-24 py-16">
          <h2 className="text-3xl font-semibold text-center mb-12">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">
                  A
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Aarav Sharma</h4>
                  <p className="text-gray-500 text-sm">Business Owner</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The team at DesignGhar created amazing corporate t-shirts for our entire staff. 
                The quality is exceptional and the designs were exactly what we wanted."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                  P
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Priya Patel</h4>
                  <p className="text-gray-500 text-sm">Event Organizer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "We needed ID cards for a major conference with a tight deadline. 
                DesignGhar delivered on time with excellent quality. Very professional service!"
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                  R
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Rahul Kapoor</h4>
                  <p className="text-gray-500 text-sm">Photographer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I had my photographs printed on canvas and the results were stunning. 
                The colors are vibrant and the print quality is superb. Highly recommended!"
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}