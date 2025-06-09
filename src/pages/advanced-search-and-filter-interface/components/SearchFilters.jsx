import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SearchFilters = ({ activeFilters, onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    keywords: true,
    dateRange: true,
    categories: true,
    authors: false,
    institutions: false,
    publications: false,
    metrics: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const categories = [
    "Machine Learning",
    "Artificial Intelligence", 
    "Computer Science",
    "Quantum Computing",
    "Energy Systems",
    "Biotechnology",
    "Materials Science",
    "Environmental Science",
    "Physics",
    "Chemistry",
    "Mathematics",
    "Engineering"
  ];

  const authors = [
    "Dr. Sarah Chen",
    "Prof. Michael Rodriguez", 
    "Dr. Emily Watson",
    "Dr. James Liu",
    "Prof. Anna Kowalski",
    "Dr. Maria Gonzalez",
    "Prof. David Kim",
    "Dr. Robert Thompson"
  ];

  const institutions = [
    "MIT",
    "Stanford University",
    "Harvard University",
    "UC Berkeley",
    "Carnegie Mellon University",
    "Oxford University",
    "Cambridge University",
    "ETH Zurich"
  ];

  const publications = [
    "Nature",
    "Science",
    "Cell",
    "Journal of Artificial Intelligence Research",
    "Nature Quantum Information",
    "Energy & Environmental Science",
    "Physical Review Letters",
    "IEEE Transactions"
  ];

  const handleCategoryChange = (category) => {
    const newCategories = activeFilters.categories.includes(category)
      ? activeFilters.categories.filter(c => c !== category)
      : [...activeFilters.categories, category];
    onFilterChange('categories', newCategories);
  };

  const handleAuthorChange = (author) => {
    const newAuthors = activeFilters.authors.includes(author)
      ? activeFilters.authors.filter(a => a !== author)
      : [...activeFilters.authors, author];
    onFilterChange('authors', newAuthors);
  };

  const handleInstitutionChange = (institution) => {
    const newInstitutions = activeFilters.institutions.includes(institution)
      ? activeFilters.institutions.filter(i => i !== institution)
      : [...activeFilters.institutions, institution];
    onFilterChange('institutions', newInstitutions);
  };

  const handlePublicationChange = (publication) => {
    const newPublications = activeFilters.publications.includes(publication)
      ? activeFilters.publications.filter(p => p !== publication)
      : [...activeFilters.publications, publication];
    onFilterChange('publications', newPublications);
  };

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="bg-surface border border-border rounded-lg">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-hover nav-transition"
      >
        <h3 className="font-semibold text-text-primary">{title}</h3>
        <Icon 
          name={expandedSections[sectionKey] ? "ChevronUp" : "ChevronDown"} 
          size={18} 
          className="text-text-muted"
        />
      </button>
      {expandedSections[sectionKey] && (
        <div className="px-4 pb-4 border-t border-border">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
        <button 
          onClick={() => {
            onFilterChange('keywords', '');
            onFilterChange('categories', []);
            onFilterChange('authors', []);
            onFilterChange('institutions', []);
            onFilterChange('publications', []);
            onFilterChange('dateRange', { start: '', end: '' });
            onFilterChange('citationRange', { min: '', max: '' });
            onFilterChange('impactFactor', { min: '', max: '' });
          }}
          className="text-sm text-primary hover:text-primary-700 nav-transition"
        >
          Clear All
        </button>
      </div>

      {/* Boolean Operators */}
      <FilterSection title="Search Logic" sectionKey="keywords">
        <div className="space-y-3 mt-4">
          <div className="flex space-x-2">
            {['AND', 'OR', 'NOT'].map((operator) => (
              <button
                key={operator}
                onClick={() => onFilterChange('booleanOperator', operator)}
                className={`px-3 py-1 text-sm rounded-full nav-transition ${
                  activeFilters.booleanOperator === operator
                    ? 'bg-primary text-white' :'bg-background border border-border text-text-secondary hover:bg-surface'
                }`}
              >
                {operator}
              </button>
            ))}
          </div>
        </div>
      </FilterSection>

      {/* Date Range */}
      <FilterSection title="Publication Date" sectionKey="dateRange">
        <div className="space-y-3 mt-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">From</label>
            <input
              type="date"
              value={activeFilters.dateRange.start}
              onChange={(e) => onFilterChange('dateRange', { 
                ...activeFilters.dateRange, 
                start: e.target.value 
              })}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">To</label>
            <input
              type="date"
              value={activeFilters.dateRange.end}
              onChange={(e) => onFilterChange('dateRange', { 
                ...activeFilters.dateRange, 
                end: e.target.value 
              })}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </FilterSection>

      {/* Categories */}
      <FilterSection title="Research Categories" sectionKey="categories">
        <div className="space-y-2 mt-4 max-h-48 overflow-y-auto">
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <span className="text-sm text-text-secondary">{category}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Authors */}
      <FilterSection title="Authors" sectionKey="authors">
        <div className="space-y-2 mt-4 max-h-48 overflow-y-auto">
          {authors.map((author) => (
            <label key={author} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters.authors.includes(author)}
                onChange={() => handleAuthorChange(author)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <span className="text-sm text-text-secondary">{author}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Institutions */}
      <FilterSection title="Institutions" sectionKey="institutions">
        <div className="space-y-2 mt-4 max-h-48 overflow-y-auto">
          {institutions.map((institution) => (
            <label key={institution} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters.institutions.includes(institution)}
                onChange={() => handleInstitutionChange(institution)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <span className="text-sm text-text-secondary">{institution}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Publications */}
      <FilterSection title="Publications" sectionKey="publications">
        <div className="space-y-2 mt-4 max-h-48 overflow-y-auto">
          {publications.map((publication) => (
            <label key={publication} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters.publications.includes(publication)}
                onChange={() => handlePublicationChange(publication)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <span className="text-sm text-text-secondary">{publication}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Metrics */}
      <FilterSection title="Research Metrics" sectionKey="metrics">
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Citation Count</label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={activeFilters.citationRange.min}
                onChange={(e) => onFilterChange('citationRange', { 
                  ...activeFilters.citationRange, 
                  min: e.target.value 
                })}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Max"
                value={activeFilters.citationRange.max}
                onChange={(e) => onFilterChange('citationRange', { 
                  ...activeFilters.citationRange, 
                  max: e.target.value 
                })}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Impact Factor</label>
            <div className="flex space-x-2">
              <input
                type="number"
                step="0.1"
                placeholder="Min"
                value={activeFilters.impactFactor.min}
                onChange={(e) => onFilterChange('impactFactor', { 
                  ...activeFilters.impactFactor, 
                  min: e.target.value 
                })}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <input
                type="number"
                step="0.1"
                placeholder="Max"
                value={activeFilters.impactFactor.max}
                onChange={(e) => onFilterChange('impactFactor', { 
                  ...activeFilters.impactFactor, 
                  max: e.target.value 
                })}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </FilterSection>
    </div>
  );
};

export default SearchFilters;