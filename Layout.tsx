// components/Layout.tsx - Main Layout Component
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Header isAdmin={isAdmin} onAdminToggle={setIsAdmin} />
      <main className="p-6 md:p-12">
        {children || <Outlet context={{ isAdmin }} />}
      </main>
    </div>
  );
};

export default Layout;