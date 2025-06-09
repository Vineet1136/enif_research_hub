import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SearchBar = ({ searchQuery, onSearch, onToggleFilter, isFilterActive }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(localQuery);
  };

  const handleInputChange = (e) => {
    setLocalQuery(e.target.value);
    // Real-time search with debouncing could be implemented here
  };

  const handleClear = () => {
    setLocalQuery('');
    onSearch('');
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6">
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            placeholder="Search papers, authors, topics, keywords..."
            value={localQuery}
            onChange={handleInputChange}
            className="w-full pl-12 pr-12 py-3 border border-border rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                     placeholder-text-muted text-text-primary bg-background"
          />
          {localQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-muted 
                       hover:text-text-primary nav-transition"
            >
              <Icon name="X" size={18} />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onToggleFilter}
          className={`flex items-center space-x-2 px-4 py-3 rounded-lg nav-transition ${
            isFilterActive
              ? 'bg-primary text-white hover:bg-primary-700' :'border border-border text-text-primary hover:bg-surface'
          }`}
        >
          <Icon name="Filter" size={18} />
          <span className="hidden sm:inline">Filter</span>
          {isFilterActive && (
            <span className="w-2 h-2 bg-white rounded-full"></span>
          )}
        </button>

        <button
          type="submit"
          className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg 
                   hover:bg-primary-700 nav-transition"
        >
          <Icon name="Search" size={18} />
          <span className="hidden sm:inline">Search</span>
        </button>
      </form>

      {/* Quick Search Suggestions */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-sm text-text-muted">Quick searches:</span>
        {[
          'Machine Learning',
          'Climate Change',
          'Quantum Computing',
          'Blockchain',
          'AI Ethics'
        ].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => {
              setLocalQuery(suggestion);
              onSearch(suggestion);
            }}
            className="text-sm px-3 py-1 bg-secondary-100 text-secondary-600 rounded-full hover:bg-secondary-200 nav-transition"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;