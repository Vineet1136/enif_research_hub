import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SavedSearches = ({ savedSearches, onLoadSearch }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (savedSearches.length === 0) {
    return null;
  }

  return (
    <div className="bg-surface border border-border rounded-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-hover nav-transition"
      >
        <div className="flex items-center space-x-2">
          <Icon name="Save" size={18} className="text-primary" />
          <h3 className="font-semibold text-text-primary">Saved Searches</h3>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={18} 
          className="text-text-muted"
        />
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-border">
          <div className="space-y-3 mt-4">
            {savedSearches.map((search) => (
              <div
                key={search.id}
                className="border border-border rounded-lg p-3 hover:bg-background nav-transition"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-text-primary text-sm">{search.name}</h4>
                  <button
                    onClick={() => onLoadSearch(search)}
                    className="text-primary hover:text-primary-700 nav-transition"
                    title="Load this search"
                  >
                    <Icon name="Play" size={14} />
                  </button>
                </div>
                
                <div className="text-xs text-text-muted space-y-1">
                  <div className="flex items-center justify-between">
                    <span>{search.resultCount} results</span>
                    <span>Last used: {new Date(search.lastUsed).toLocaleDateString()}</span>
                  </div>
                  
                  {/* Filter Preview */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {search.filters.keywords && (
                      <span className="px-2 py-0.5 bg-primary-100 text-primary rounded-full text-xs">
                        "{search.filters.keywords}"
                      </span>
                    )}
                    {search.filters.categories && search.filters.categories.length > 0 && (
                      <span className="px-2 py-0.5 bg-secondary-100 text-secondary rounded-full text-xs">
                        {search.filters.categories.length} categories
                      </span>
                    )}
                    {(search.filters.dateRange?.start || search.filters.dateRange?.end) && (
                      <span className="px-2 py-0.5 bg-accent-100 text-accent rounded-full text-xs">
                        Date range
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedSearches;