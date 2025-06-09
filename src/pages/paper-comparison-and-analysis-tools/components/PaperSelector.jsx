import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const PaperSelector = ({ availablePapers, selectedPapers, onAddPaper, onRemovePaper }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = ['all', 'Machine Learning', 'Quantum Computing', 'Energy Systems'];

  const filteredPapers = availablePapers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         paper.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || paper.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const isSelected = (paperId) => selectedPapers.some(p => p.id === paperId);
  const canAddMore = selectedPapers.length < 4;

  return (
    <div className="bg-background border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-text-primary">
          Select Papers
        </h3>
        <span className="text-sm text-text-muted">
          {selectedPapers.length}/4
        </span>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          placeholder="Search papers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                   text-sm placeholder-text-muted"
        />
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full px-3 py-2 bg-surface border border-border rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                   text-sm"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      {/* Selected Papers */}
      {selectedPapers.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-text-primary mb-2">Selected for Comparison</h4>
          <div className="space-y-2">
            {selectedPapers.map(paper => (
              <div key={paper.id} className="flex items-center justify-between p-2 bg-primary-50 border border-primary-200 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {paper.title}
                  </p>
                  <p className="text-xs text-text-muted">
                    {paper.year} • {paper.category}
                  </p>
                </div>
                <button
                  onClick={() => onRemovePaper(paper.id)}
                  className="ml-2 p-1 text-text-muted hover:text-error nav-transition"
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Papers */}
      <div>
        <h4 className="text-sm font-medium text-text-primary mb-2">Available Papers</h4>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredPapers.map(paper => {
            const selected = isSelected(paper.id);
            return (
              <div
                key={paper.id}
                className={`p-3 border rounded-lg nav-transition ${
                  selected 
                    ? 'border-primary-200 bg-primary-50' :'border-border bg-background hover:bg-surface'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-medium text-text-primary mb-1 line-clamp-2">
                      {paper.title}
                    </h5>
                    <p className="text-xs text-text-muted mb-2">
                      {paper.authors[0]} et al. • {paper.year}
                    </p>
                    <div className="flex items-center space-x-3 text-xs text-text-muted">
                      <span className="flex items-center space-x-1">
                        <Icon name="Quote" size={12} />
                        <span>{paper.citations}</span>
                      </span>
                      <span className="px-2 py-1 bg-secondary-100 text-secondary-600 rounded">
                        {paper.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => selected ? onRemovePaper(paper.id) : onAddPaper(paper)}
                    disabled={!selected && !canAddMore}
                    className={`ml-2 p-1.5 rounded-md nav-transition ${
                      selected
                        ? 'bg-error text-white hover:bg-red-700'
                        : canAddMore
                        ? 'bg-primary text-white hover:bg-primary-700' :'bg-secondary-200 text-secondary-400 cursor-not-allowed'
                    }`}
                  >
                    <Icon name={selected ? "Minus" : "Plus"} size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {!canAddMore && (
        <div className="mt-3 p-2 bg-warning-light border border-amber-200 rounded-lg">
          <p className="text-xs text-amber-700">
            Maximum 4 papers can be compared at once. Remove a paper to add another.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaperSelector;