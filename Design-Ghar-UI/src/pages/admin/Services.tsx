import Sidebar from '@/components/admin/Sidebar';
import ServiceTable from '@/components/admin/ServiceTable';

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-6 lg:p-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <ServiceTable />
          </div>
        </main>
      </div>
    </div>
  );
}