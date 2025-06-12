import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import BannerTable from '@/components/admin/BannerTable';
import OfferTable from '@/components/admin/OfferTable';

export default function Offers() {
  const [activeTab, setActiveTab] = useState('banners');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <Tabs 
              defaultValue="banners" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Manage Offers & Banners</h1>
                <TabsList>
                  <TabsTrigger value="banners">Banners</TabsTrigger>
                  <TabsTrigger value="offers">Offers</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="banners" className="space-y-4">
                <BannerTable />
              </TabsContent>
              
              <TabsContent value="offers" className="space-y-4">
                <OfferTable />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}