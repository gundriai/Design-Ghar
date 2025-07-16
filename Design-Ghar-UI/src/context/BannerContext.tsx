import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Banner } from '@/types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface BannerContextType {
  banners: Banner[];
  fetchBanners: () => Promise<void>;
  addBanner: (data: FormData) => Promise<void>;
  updateBanner: (id: string, data: FormData) => Promise<void>;
  deleteBanner: (id: string) => Promise<void>;
  isLoading: boolean;
}

const BannerContext = createContext<BannerContextType | undefined>(undefined);

export const BannerProvider = ({ children }: { children: ReactNode }) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchBanners = async () => {
    setIsLoading(true);
    const res = await fetch(`${BASE_URL.replace(/\/$/, '')}/banners`);
    const data = await res.json();
    setBanners(data);
    setIsLoading(false);
  };

  const addBanner = async (formData: FormData) => {
    setIsLoading(true);
    await fetch(`${BASE_URL.replace(/\/$/, '')}/banners`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    });
    await fetchBanners();
    setIsLoading(false);
  };

  const updateBanner = async (id: string, formData: FormData) => {
    setIsLoading(true);
    await fetch(`${BASE_URL.replace(/\/$/, '')}/banners/${id}`, {
      method: 'PATCH',
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    });
    await fetchBanners();
    setIsLoading(false);
  };

  const deleteBanner = async (id: string) => {
    setIsLoading(true);
    await fetch(`${BASE_URL.replace(/\/$/, '')}/banners/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    });
    await fetchBanners();
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <BannerContext.Provider value={{
      banners,
      fetchBanners,
      addBanner,
      updateBanner,
      deleteBanner,
      isLoading
    }}>
      {children}
    </BannerContext.Provider>
  );
};

export function bannerData() {
  const ctx = useContext(BannerContext);
  if (!ctx) throw new Error('useBannerContext must be used within a BannerProvider');
  return ctx;
}
