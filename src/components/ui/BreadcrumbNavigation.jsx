import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = () => {
  const location = useLocation();

  const routeMap = {
    '/research-paper-discovery-dashboard': {
      label: 'Dashboard',
      parent: null
    },
    '/advanced-search-and-filter-interface': {
      label: 'Advanced Search',
      parent: '/research-paper-discovery-dashboard'
    },
    '/detailed-paper-analysis-view': {
      label: 'Paper Analysis',
      parent: '/research-paper-discovery-dashboard'
    },
    '/paper-comparison-and-analysis-tools': {
      label: 'Comparison Tools',
      parent: '/research-paper-discovery-dashboard'
    },
    '/user-profile-and-research-preferences': {
      label: 'Profile & Preferences',
      parent: null
    }
  };

  const generateBreadcrumbs = () => {
    const currentPath = location.pathname;
    const breadcrumbs = [];
    
    const buildPath = (path) => {
      const route = routeMap[path];
      if (!route) return;
      
      if (route.parent) {
        buildPath(route.parent);
      }
      
      breadcrumbs.push({
        label: route.label,
        path: path,
        isActive: path === currentPath
      });
    };

    buildPath(currentPath);
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6" aria-label="Breadcrumb">
      <Link 
        to="/research-paper-discovery-dashboard"
        className="flex items-center hover:text-text-primary nav-transition"
      >
        <Icon name="Home" size={16} className="mr-1" />
        <span>Home</span>
      </Link>
      
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          <Icon name="ChevronRight" size={14} className="text-text-muted" />
          {crumb.isActive ? (
            <span className="text-text-primary font-medium" aria-current="page">
              {crumb.label}
            </span>
          ) : (
            <Link 
              to={crumb.path}
              className="hover:text-text-primary nav-transition"
            >
              {crumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadcrumbNavigation;