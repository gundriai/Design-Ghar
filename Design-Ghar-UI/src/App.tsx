import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { DataProvider } from '@/context/DataContext';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/layout/ScrollToTop';

// Pages
import Home from '@/pages/Home';
import ProductDetail from '@/pages/ProductDetail';
import Login from '@/pages/Login';

// Admin Pages
import Dashboard from '@/pages/admin/Dashboard';
import Services from '@/pages/admin/Services';
import Products from '@/pages/admin/Products';
import Offers from '@/pages/admin/Offers';
import Account from '@/pages/admin/Account';
import ProductCategoryDetail from './components/products/category/ProductCategoryDetail';
import { GradientBackground } from './components/layout/GradientBackground';
import { CategoryProvider } from './context/CategoryContext';



// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

// All app routes
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:categoryId/:id" element={<ProductDetail />} />
      <Route path="/products/:categoryId" element={<ProductCategoryDetail />} />
      <Route path="/login" element={<Login />} />

      {/* Admin routes */}
      <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/admin/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
      <Route path="/admin/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
      <Route path="/admin/offers" element={<ProtectedRoute><Offers /></ProtectedRoute>} />
      <Route path="/admin/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

// Main app entry
function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen overflow-x-hidden">
        <GradientBackground />
        <AuthProvider>
          <CategoryProvider>
          <DataProvider>
            <div className="relative z-10">
              <AppRoutes />
                <Toaster />
              </div>
            </DataProvider>
          </CategoryProvider>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
