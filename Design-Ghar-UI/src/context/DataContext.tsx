import React, { createContext, useContext, useState, useEffect } from 'react';
import { Category, Product, Banner, Offer } from '@/types';

interface DataContextType {
  services: Category[];
  products: Product[];
  banners: Banner[];
  offers: Offer[];
  isLoading: boolean;
  error: string | null;
  
  // CRUD operations
  addService: (service: Omit<Category, 'id'>) => void;
  updateService: (service: Category) => void;
  deleteService: (id: string) => void;
  
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  
  addBanner: (banner: Omit<Banner, 'id'>) => void;
  updateBanner: (banner: Banner) => void;
  deleteBanner: (id: string) => void;
  
  addOffer: (offer: Omit<Offer, 'id'>) => void;
  updateOffer: (offer: Offer) => void;
  deleteOffer: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Fetch all data in parallel
      const [servicesRes, productsRes, bannersRes, offersRes] = await Promise.all([
        fetch('/data/categories.json'),
        fetch('/data/products.json'),
        fetch('/data/banners.json'),
        fetch('/data/offers.json')
      ]);

      // Parse responses
      const servicesData = await servicesRes.json();
      const productsData = await productsRes.json();
      const bannersData = await bannersRes.json();
      const offersData = await offersRes.json();

      // Update state
      setServices(servicesData);
      setProducts(productsData);
      setBanners(bannersData);
      setOffers(offersData);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // CRUD operations for services
  const addService = (service: Omit<Category, 'id'>) => {
    const newService = { ...service, id: Date.now().toString() };
    setServices([...services, newService]);
  };

  const updateService = (updatedService: Category) => {
    setServices(services.map(service => 
      service.id === updatedService.id ? updatedService : service
    ));
  };

  const deleteService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
  };

  // CRUD operations for products
  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Date.now().toString() };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  // CRUD operations for banners
  const addBanner = (banner: Omit<Banner, 'id'>) => {
    const newBanner = { ...banner, id: Date.now().toString() };
    setBanners([...banners, newBanner]);
  };

  const updateBanner = (updatedBanner: Banner) => {
    setBanners(banners.map(banner => 
      banner.id === updatedBanner.id ? updatedBanner : banner
    ));
  };

  const deleteBanner = (id: string) => {
    setBanners(banners.filter(banner => banner.id !== id));
  };

  // CRUD operations for offers
  const addOffer = (offer: Omit<Offer, 'id'>) => {
    const newOffer = { ...offer, id: Date.now().toString() };
    setOffers([...offers, newOffer]);
  };

  const updateOffer = (updatedOffer: Offer) => {
    setOffers(offers.map(offer => 
      offer.id === updatedOffer.id ? updatedOffer : offer
    ));
  };

  const deleteOffer = (id: string) => {
    setOffers(offers.filter(offer => offer.id !== id));
  };

  return (
    <DataContext.Provider value={{
      services,
      products,
      banners,
      offers,
      isLoading,
      error,
      addService,
      updateService,
      deleteService,
      addProduct,
      updateProduct,
      deleteProduct,
      addBanner,
      updateBanner,
      deleteBanner,
      addOffer,
      updateOffer,
      deleteOffer
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}