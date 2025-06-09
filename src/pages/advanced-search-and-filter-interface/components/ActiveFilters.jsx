import React from 'react';
import Icon from 'components/AppIcon';

const ActiveFilters = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  const getActiveFilterTags = () => {
    const tags = [];

    // Keywords
    if (activeFilters.keywords) {
      tags.push({
        type: 'keywords',
        label: `Keywords: "${activeFilters.keywords}"`,
        value: activeFilters.keywords
      });
    }

    // Date Range
    if (activeFilters.dateRange.start || activeFilters.dateRange.end) {
      const start = activeFilters.dateRange.start || 'Any';
      const end = activeFilters.dateRange.end || 'Any';
      tags.push({
        type: 'dateRange',
        label: `Date: ${start} to ${end}`,
        value: null
      });
    }

    // Categories
    activeFilters.categories.forEach(category => {
      tags.push({
        type: 'categories',
        label: `Category: ${category}`,
        value: category
      });
    });

    // Authors
    activeFilters.authors.forEach(author => {
      tags.push({
        type: 'authors',
        label: `Author: ${author}`,
        value: author
      });
    });

    // Institutions
    activeFilters.institutions.forEach(institution => {
      tags.push({
        type: 'institutions',
        label: `Institution: ${institution}`,
        value: institution
      });
    });

    // Publications
    activeFilters.publications.forEach(publication => {
      tags.push({
        type: 'publications',
        label: `Publication: ${publication}`,
        value: publication
      });
    });

    // Citation Range
    if (activeFilters.citationRange.min || activeFilters.citationRange.max) {
      const min = activeFilters.citationRange.min || '0';
      const max = activeFilters.citationRange.max || '∞';
      tags.push({
        type: 'citationRange',
        label: `Citations: ${min} - ${max}`,
        value: null
      });
    }

    // Impact Factor
    if (activeFilters.impactFactor.min || activeFilters.impactFactor.max) {
      const min = activeFilters.impactFactor.min || '0';
      const max = activeFilters.impactFactor.max || '∞';
      tags.push({
        type: 'impactFactor',
        label: `Impact Factor: ${min} - ${max}`,
        value: null
      });
    }

    return tags;
  };

  const activeFilterTags = getActiveFilterTags();

  if (activeFilterTags.length === 0) {
    return null;
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">
          Active Filters ({activeFilterTags.length})
        </h3>
        <button
          onClick={onClearAll}
          className="text-sm text-primary hover:text-primary-700 nav-transition"
        >
          Clear All
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {activeFilterTags.map((tag, index) => (
          <div
            key={`${tag.type}-${tag.value || index}`}
            className="flex items-center space-x-2 bg-primary-100 text-primary px-3 py-1 rounded-full text-sm"
          >
            <span>{tag.label}</span>
            <button
              onClick={() => onRemoveFilter(tag.type, tag.value)}
              className="hover:bg-primary-200 rounded-full p-0.5 nav-transition"
              aria-label={`Remove ${tag.label} filter`}
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveFilters;