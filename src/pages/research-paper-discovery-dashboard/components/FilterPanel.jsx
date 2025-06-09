import React from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({ isOpen, filters, onFilterChange, onClearAll, papers }) => {
  if (!isOpen) return null;

  // Extract unique categories and sources from papers
  const categories = [...new Set(papers.map(paper => paper.category))];
  const sources = [...new Set(papers.map(paper => paper.source))];

  const handleCategoryChange = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onFilterChange({
      ...filters,
      categories: newCategories
    });
  };

  const handleSourceChange = (source) => {
    const newSources = filters.sources.includes(source)
      ? filters.sources.filter(s => s !== source)
      : [...filters.sources, source];
    
    onFilterChange({
      ...filters,
      sources: newSources
    });
  };

  const handleDateRangeChange = (dateRange) => {
    onFilterChange({
      ...filters,
      dateRange
    });
  };

  const activeFiltersCount = 
    filters.categories.length + 
    filters.sources.length + 
    (filters.dateRange !== 'all' ? 1 : 0);

  return (
    <div className="bg-surface border border-border rounded-lg p-6 mt-4 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Advanced Filters</h3>
          {activeFiltersCount > 0 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary">
              {activeFiltersCount} active
            </span>
          )}
        </div>
        <button
          onClick={onClearAll}
          className="text-sm text-primary hover:text-primary-700 nav-transition"
          disabled={activeFiltersCount === 0}
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Categories Filter */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3">Categories</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-secondary">{category}</span>
                <span className="text-xs text-text-muted">
                  ({papers.filter(p => p.category === category).length})
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Date Range Filter */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3">Publication Date</h4>
          <div className="space-y-2">
            {[
              { value: 'all', label: 'All time' },
              { value: 'week', label: 'Past week' },
              { value: 'month', label: 'Past month' },
              { value: 'year', label: 'Past year' }
            ].map((option) => (
              <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="dateRange"
                  value={option.value}
                  checked={filters.dateRange === option.value}
                  onChange={() => handleDateRangeChange(option.value)}
                  className="border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-secondary">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sources Filter */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3">Sources</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {sources.map((source) => (
              <label key={source} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.sources.includes(source)}
                  onChange={() => handleSourceChange(source)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-secondary line-clamp-1" title={source}>
                  {source}
                </span>
                <span className="text-xs text-text-muted">
                  ({papers.filter(p => p.source === source).length})
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Filters */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Access Type */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Access Type</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-secondary">Open Access Only</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-secondary">Code Available</span>
              </label>
            </div>
          </div>

          {/* Citation Range */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Citation Count</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="citations"
                  className="border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-secondary">Any</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="citations"
                  className="border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-secondary">50+ citations</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="citations"
                  className="border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-secondary">100+ citations</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;