import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Layout, 
  Palette, 
  ShoppingBag, 
  Tag, 
  Settings, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const menuItems = [
  { 
    label: 'Services', 
    icon: <Palette className="h-5 w-5" />, 
    href: '/admin/services' 
  },
  { 
    label: 'Products', 
    icon: <ShoppingBag className="h-5 w-5" />, 
    href: '/admin/products' 
  },
  { 
    label: 'Offers & Banners', 
    icon: <Tag className="h-5 w-5" />, 
    href: '/admin/offers' 
  },
  { 
    label: 'Account Settings', 
    icon: <Settings className="h-5 w-5" />, 
    href: '/admin/account' 
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div 
      className={cn(
        "bg-white border-r border-gray-200 h-screen transition-all duration-300 sticky top-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <Link to="/admin\" className="text-lg font-semibold text-indigo-600">
            Admin Panel
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      <nav className="p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md transition-colors",
                  collapsed ? "justify-center" : "justify-start space-x-3",
                  location.pathname === item.href
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <span>{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
        <Link to="/" className="flex items-center">
          {collapsed ? (
            <Layout className="h-5 w-5 text-indigo-600" />
          ) : (
            <>
              <Layout className="h-5 w-5 text-indigo-600 mr-2" />
              <span className="text-sm font-medium">View Website</span>
            </>
          )}
        </Link>
      </div>
    </div>
  );
}