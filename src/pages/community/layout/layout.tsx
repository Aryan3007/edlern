import { useMediaQuery } from '@/hooks/useMediaQuery';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import SearchModal from '../modals/SearchModal';
import CreateCommunityModal from '../modals/CreateCommunityModal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [createCommunityModalOpen, setCreateCommunityModalOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar on the left */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        position="left"
      />

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          onToggleSidebar={toggleSidebar}
          onOpenSearch={() => setSearchModalOpen(true)}
          onCreateCommunity={() => setCreateCommunityModalOpen(true)}
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Main content area */}
          <main className="flex-1 overflow-y-auto p-4">
            {children}
          </main>
        </div>
      </div>

      {/* Modals */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />

      <CreateCommunityModal
        isOpen={createCommunityModalOpen}
        onClose={() => setCreateCommunityModalOpen(false)}
      />
    </div>
  );
};

export default Layout;
