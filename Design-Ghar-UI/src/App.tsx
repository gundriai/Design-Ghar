import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { DataProvider } from '@/context/DataContext';
import { Toaster } from '@/components/ui/toaster';

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
import ProductsCategory from './components/products/category/ProductsCategory';
import ProductCategoryDetail from './components/products/category/ProductCategoryDetail';

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:categoryId/:id" element={<ProductDetail />} />
      <Route path = "/products/:categoryId" element={<ProductCategoryDetail />} />
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

function App() {
  return (
    <Router>
      {/* Global gradient background for all screens */}
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #0ea4e9f8 0%, #1f9bdde0 2%, #e0f4ff 20%, #f6fbff 30%, #ffffff 100%)'
        }}
      />
      <AuthProvider>
        <DataProvider>
          <div className="relative z-10">
            <AppRoutes />
            <Toaster />
          </div>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;