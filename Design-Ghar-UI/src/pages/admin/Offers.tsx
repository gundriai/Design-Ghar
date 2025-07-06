import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Sidebar from '@/components/admin/Sidebar';
import BannerTable from '@/components/admin/BannerTable';
import OfferTable from '@/components/admin/OfferTable';

export default function Offers() {
  const [activeTab, setActiveTab] = useState('banners');

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <Tabs 
              defaultValue="banners" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex justify-between items-center">
                  <TabsList>
                    <TabsTrigger value="banners">Banners</TabsTrigger>
                    <TabsTrigger value="offers">Offers</TabsTrigger>
                  </TabsList>
                </div>
              </div>
              
              <TabsContent value="banners" className="space-y-4">
                {/* Only render BannerTable, let it manage its own view state */}
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