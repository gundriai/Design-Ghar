import { Link } from 'react-router-dom';
import { ChevronRight, ShoppingBag, Users, ShoppingCart, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Sidebar from '@/components/admin/Sidebar';
import { useData } from '@/context/DataContext';

export default function Dashboard() {
  const { products, services } = useData();

  // Calculate stats
  const totalProducts = products.length;
  const totalServices = services.length;
  const featuredProducts = products.filter(p => p.isFeatured).length;
  
  // Mock data for the dashboard
  const stats = [
    {
      title: 'Total Products',
      value: totalProducts,
      icon: <ShoppingBag className="h-8 w-8 text-indigo-600" />,
      change: '+5%',
      trend: 'up',
    },
    {
      title: 'Featured Products',
      value: featuredProducts,
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      change: '+12%',
      trend: 'up',
    },
    {
      title: 'Total Services',
      value: totalServices,
      icon: <Users className="h-8 w-8 text-blue-600" />,
      change: '0%',
      trend: 'neutral',
    },
    {
      title: 'Recent Orders',
      value: 24,
      icon: <ShoppingCart className="h-8 w-8 text-orange-600" />,
      change: '+18%',
      trend: 'up',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-6 lg:p-8 bg-gray-50">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-gray-500">Welcome back, Admin</p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </CardTitle>
                    {stat.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className={`text-xs ${
                      stat.trend === 'up' 
                        ? 'text-green-600' 
                        : stat.trend === 'down' 
                          ? 'text-red-600' 
                          : 'text-gray-600'
                    }`}>
                      {stat.change} from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link 
                    to="/admin/products" 
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span className="font-medium">Manage Products</span>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </Link>
                  <Link 
                    to="/admin/services" 
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span className="font-medium">Manage Services</span>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </Link>
                  <Link 
                    to="/admin/offers" 
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span className="font-medium">Manage Offers & Banners</span>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </Link>
                  <Link 
                    to="/admin/account" 
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span className="font-medium">Account Settings</span>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last Backup</span>
                      <span className="font-medium">Today, 09:30 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">System Version</span>
                      <span className="font-medium">v1.2.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Storage Used</span>
                      <span className="font-medium">12.5 GB / 50 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Server Status</span>
                      <span className="font-medium text-green-600">Operational</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}