import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="FileQuestion" size={48} className="text-primary" />
          </div>
          <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Page Not Found</h2>
          <p className="text-text-secondary mb-8">
            The research paper or page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/research-paper-discovery-dashboard"
            className="inline-flex items-center justify-center space-x-2 w-full px-6 py-3 
                     bg-primary text-white rounded-lg hover:bg-primary-700 nav-transition"
          >
            <Icon name="Home" size={20} />
            <span>Back to Dashboard</span>
          </Link>
          
          <Link
            to="/advanced-search-and-filter-interface"
            className="inline-flex items-center justify-center space-x-2 w-full px-6 py-3 
                     border border-border text-text-primary rounded-lg hover:bg-surface nav-transition"
          >
            <Icon name="Search" size={20} />
            <span>Search Papers</span>
          </Link>
        </div>
        
        <div className="mt-8 text-sm text-text-muted">
          <p>Need help? Contact our research support team.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;