import Sidebar from '@/components/admin/Sidebar';
import AccountSettings from '@/components/admin/AccountSettings';

export default function Account() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-6 lg:p-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
            <AccountSettings />
          </div>
        </main>
      </div>
    </div>
  );
}