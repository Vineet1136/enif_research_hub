import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NavigationContext = createContext();

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationStateManager');
  }
  return context;
};

const NavigationStateManager = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [navigationPreferences, setNavigationPreferences] = useState({
    sidebarCollapsed: false,
    searchHistory: [],
    recentRoutes: []
  });
  const location = useLocation();

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('navigation-preferences');
    if (savedPreferences) {
      try {
        setNavigationPreferences(JSON.parse(savedPreferences));
      } catch (error) {
        console.error('Failed to parse navigation preferences:', error);
      }
    }
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('navigation-preferences', JSON.stringify(navigationPreferences));
  }, [navigationPreferences]);

  // Track recent routes
  useEffect(() => {
    const currentRoute = location.pathname;
    setNavigationPreferences(prev => ({
      ...prev,
      recentRoutes: [
        currentRoute,
        ...prev.recentRoutes.filter(route => route !== currentRoute)
      ].slice(0, 5) // Keep only last 5 routes
    }));
  }, [location.pathname]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const updateSearchHistory = (query) => {
    if (!query.trim()) return;
    
    setNavigationPreferences(prev => ({
      ...prev,
      searchHistory: [
        query,
        ...prev.searchHistory.filter(item => item !== query)
      ].slice(0, 10) // Keep only last 10 searches
    }));
  };

  const clearSearchHistory = () => {
    setNavigationPreferences(prev => ({
      ...prev,
      searchHistory: []
    }));
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const getRouteTitle = (path) => {
    const routeTitles = {
      '/research-paper-discovery-dashboard': 'Research Paper Discovery Dashboard',
      '/advanced-search-and-filter-interface': 'Advanced Search & Filter Interface',
      '/detailed-paper-analysis-view': 'Detailed Paper Analysis View',
      '/paper-comparison-and-analysis-tools': 'Paper Comparison & Analysis Tools',
      '/user-profile-and-research-preferences': 'User Profile & Research Preferences'
    };
    return routeTitles[path] || 'Academic Research Platform';
  };

  const contextValue = {
    // Sidebar state
    isSidebarOpen,
    toggleSidebar,
    closeSidebar,
    
    // Navigation preferences
    navigationPreferences,
    setNavigationPreferences,
    
    // Search functionality
    updateSearchHistory,
    clearSearchHistory,
    
    // Route utilities
    isActiveRoute,
    getRouteTitle,
    currentRoute: location.pathname,
    
    // Recent routes
    recentRoutes: navigationPreferences.recentRoutes
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationStateManager;