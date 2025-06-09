import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const SidebarNavigation = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/research-paper-discovery-dashboard',
      icon: 'LayoutDashboard',
      description: 'Research paper discovery and overview'
    },
    {
      label: 'Search & Discovery',
      path: '/advanced-search-and-filter-interface',
      icon: 'Search',
      description: 'Advanced search and filtering tools'
    },
    {
      label: 'Analysis Tools',
      icon: 'BarChart3',
      isSection: true,
      children: [
        {
          label: 'Detailed Analysis',
          path: '/detailed-paper-analysis-view',
          icon: 'FileText',
          description: 'In-depth paper analysis and insights'
        },
        {
          label: 'Comparison Tools',
          path: '/paper-comparison-and-analysis-tools',
          icon: 'GitCompare',
          description: 'Compare and analyze multiple papers'
        }
      ]
    },
    {
      label: 'Profile',
      path: '/user-profile-and-research-preferences',
      icon: 'User',
      description: 'User preferences and account settings'
    }
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const renderNavigationItem = (item, isChild = false) => {
    if (item.isSection) {
      return (
        <div key={item.label} className="mb-6">
          <div className="flex items-center space-x-2 px-3 py-2 text-xs font-medium text-text-muted uppercase tracking-wider">
            <Icon name={item.icon} size={14} />
            <span>{item.label}</span>
          </div>
          <div className="mt-2 space-y-1">
            {item.children.map(child => renderNavigationItem(child, true))}
          </div>
        </div>
      );
    }

    const isActive = isActiveRoute(item.path);
    
    return (
      <Link
        key={item.path}
        to={item.path}
        onClick={onClose}
        className={`
          group flex items-center space-x-3 px-3 py-2 rounded-lg nav-transition
          ${isChild ? 'ml-4' : ''}
          ${isActive 
            ? 'bg-primary text-white' :'text-text-secondary hover:bg-surface hover:text-text-primary'
          }
        `}
        title={item.description}
      >
        <Icon 
          name={item.icon} 
          size={18} 
          className={isActive ? 'text-white' : 'text-text-muted group-hover:text-text-primary'}
        />
        <span className="font-medium">{item.label}</span>
        {isActive && (
          <div className="ml-auto w-1 h-1 bg-white rounded-full"></div>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-300 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-background border-r border-border z-300
        sidebar-width nav-transition
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:z-100
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-xl font-heading font-semibold text-text-primary">
                Enif.ai
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-surface nav-transition"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-2">
              {navigationItems.map(item => renderNavigationItem(item))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="text-xs text-text-muted">
              <p className="font-medium">Academic Research Platform</p>
              <p className="mt-1">Version 2.1.0</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarNavigation;