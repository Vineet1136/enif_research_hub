import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const HeaderNavigation = ({ onMenuToggle, isSidebarOpen }) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Search query:', searchQuery);
    }
  };

  const handleSearchFocus = () => {
    setIsSearchExpanded(true);
  };

  const handleSearchBlur = () => {
    if (!searchQuery) {
      setIsSearchExpanded(false);
    }
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b border-border z-200 header-height">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left Section - Menu Toggle & Logo */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-surface nav-transition"
            aria-label="Toggle navigation menu"
          >
            <Icon name="Menu" size={20} />
          </button>
          
          <Link to="/research-paper-discovery-dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-white"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xl font-heading font-semibold text-text-primary hidden sm:block">
              Enif.ai
            </span>
          </Link>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-2xl mx-4 lg:mx-8">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className={`relative nav-transition ${
              isSearchExpanded ? 'w-full' : 'w-full lg:w-96'
            }`}>
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
              />
              <input
                type="text"
                placeholder="Search papers, authors, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                         placeholder-text-muted text-sm font-body nav-transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted 
                           hover:text-text-primary nav-transition"
                >
                  <Icon name="X" size={16} />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right Section - User Menu */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-surface nav-transition hidden sm:block">
            <Icon name="Bell" size={20} className="text-text-muted" />
          </button>
          
          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-surface nav-transition"
            >
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary" />
              </div>
              <Icon name="ChevronDown" size={16} className="text-text-muted hidden sm:block" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-border rounded-lg modal-elevation animate-fade-in">
                <div className="py-2">
                  <Link
                    to="/user-profile-and-research-preferences"
                    className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-surface nav-transition"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Icon name="User" size={16} />
                    <span>Profile & Preferences</span>
                  </Link>
                  <Link
                    to="/user-profile-and-research-preferences"
                    className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-surface nav-transition"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </Link>
                  <hr className="my-2 border-border" />
                  <button className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-surface nav-transition w-full text-left">
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderNavigation;