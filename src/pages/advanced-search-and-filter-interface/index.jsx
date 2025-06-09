import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import SearchFilters from './components/SearchFilters';
import ResultsPreview from './components/ResultsPreview';
import ActiveFilters from './components/ActiveFilters';
import SavedSearches from './components/SavedSearches';

const AdvancedSearchAndFilterInterface = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    keywords: '',
    booleanOperator: 'AND',
    dateRange: { start: '', end: '' },
    categories: [],
    authors: [],
    institutions: [],
    publications: [],
    citationRange: { min: '', max: '' },
    impactFactor: { min: '', max: '' }
  });
  const [searchResults, setSearchResults] = useState([]);
  const [resultCount, setResultCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [savedSearches, setSavedSearches] = useState([]);

  // Mock data for search results
  const mockSearchResults = [
    {
      id: 1,
      title: "Deep Learning Approaches for Natural Language Processing: A Comprehensive Survey",
      authors: ["Dr. Sarah Chen", "Prof. Michael Rodriguez", "Dr. Emily Watson"],
      publication: "Journal of Artificial Intelligence Research",
      date: "2024-01-15",
      category: "Machine Learning",
      citations: 245,
      impactFactor: 4.8,
      summary: "This comprehensive survey examines the latest deep learning methodologies applied to natural language processing tasks, including transformer architectures, attention mechanisms, and their applications in text generation, sentiment analysis, and machine translation."
    },
    {
      id: 2,
      title: "Quantum Computing Applications in Cryptography: Current State and Future Prospects",
      authors: ["Dr. James Liu", "Prof. Anna Kowalski"],
      publication: "Nature Quantum Information",
      date: "2024-02-03",
      category: "Quantum Computing",
      citations: 189,
      impactFactor: 5.2,
      summary: "An analysis of quantum computing\'s impact on modern cryptographic systems, exploring both the threats posed by quantum algorithms and the opportunities for quantum-resistant encryption methods."
    },
    {
      id: 3,
      title: "Sustainable Energy Storage Solutions: Advances in Battery Technology",
      authors: ["Dr. Maria Gonzalez", "Prof. David Kim", "Dr. Robert Thompson"],
      publication: "Energy & Environmental Science",
      date: "2024-01-28",
      category: "Energy Systems",
      citations: 156,
      impactFactor: 6.1,
      summary: "This research presents breakthrough developments in lithium-ion battery technology and alternative energy storage solutions, focusing on sustainability, efficiency, and scalability for renewable energy integration."
    }
  ];

  const mockSavedSearches = [
    {
      id: 1,
      name: "AI & Machine Learning Papers",
      filters: {
        keywords: "artificial intelligence machine learning",
        categories: ["Machine Learning", "Artificial Intelligence"],
        dateRange: { start: "2023-01-01", end: "2024-12-31" }
      },
      resultCount: 1247,
      lastUsed: "2024-01-10"
    },
    {
      id: 2,
      name: "Quantum Computing Research",
      filters: {
        keywords: "quantum computing algorithms",
        categories: ["Quantum Computing", "Computer Science"],
        citationRange: { min: "50", max: "" }
      },
      resultCount: 89,
      lastUsed: "2024-01-08"
    }
  ];

  useEffect(() => {
    setSavedSearches(mockSavedSearches);
  }, []);

  // Simulate search with filters
  useEffect(() => {
    const performSearch = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        let filteredResults = [...mockSearchResults];
        
        // Apply keyword filter
        if (activeFilters.keywords) {
          filteredResults = filteredResults.filter(paper =>
            paper.title.toLowerCase().includes(activeFilters.keywords.toLowerCase()) ||
            paper.summary.toLowerCase().includes(activeFilters.keywords.toLowerCase())
          );
        }
        
        // Apply category filter
        if (activeFilters.categories.length > 0) {
          filteredResults = filteredResults.filter(paper =>
            activeFilters.categories.includes(paper.category)
          );
        }
        
        // Apply date range filter
        if (activeFilters.dateRange.start || activeFilters.dateRange.end) {
          filteredResults = filteredResults.filter(paper => {
            const paperDate = new Date(paper.date);
            const startDate = activeFilters.dateRange.start ? new Date(activeFilters.dateRange.start) : new Date('1900-01-01');
            const endDate = activeFilters.dateRange.end ? new Date(activeFilters.dateRange.end) : new Date();
            return paperDate >= startDate && paperDate <= endDate;
          });
        }
        
        setSearchResults(filteredResults);
        setResultCount(filteredResults.length);
        setIsLoading(false);
      }, 500);
    };
    
    performSearch();
  }, [activeFilters]);

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const removeFilter = (filterType, value = null) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      
      if (filterType === 'categories' && value) {
        newFilters.categories = prev.categories.filter(cat => cat !== value);
      } else if (filterType === 'authors' && value) {
        newFilters.authors = prev.authors.filter(author => author !== value);
      } else if (filterType === 'institutions' && value) {
        newFilters.institutions = prev.institutions.filter(inst => inst !== value);
      } else if (filterType === 'publications' && value) {
        newFilters.publications = prev.publications.filter(pub => pub !== value);
      } else if (filterType === 'dateRange') {
        newFilters.dateRange = { start: '', end: '' };
      } else if (filterType === 'citationRange') {
        newFilters.citationRange = { min: '', max: '' };
      } else if (filterType === 'impactFactor') {
        newFilters.impactFactor = { min: '', max: '' };
      } else {
        newFilters[filterType] = '';
      }
      
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({
      keywords: '',
      booleanOperator: 'AND',
      dateRange: { start: '', end: '' },
      categories: [],
      authors: [],
      institutions: [],
      publications: [],
      citationRange: { min: '', max: '' },
      impactFactor: { min: '', max: '' }
    });
    setSearchQuery('');
  };

  const saveCurrentSearch = () => {
    const searchName = prompt('Enter a name for this search:');
    if (searchName) {
      const newSearch = {
        id: Date.now(),
        name: searchName,
        filters: { ...activeFilters },
        resultCount: resultCount,
        lastUsed: new Date().toISOString().split('T')[0]
      };
      setSavedSearches(prev => [newSearch, ...prev]);
    }
  };

  const loadSavedSearch = (savedSearch) => {
    setActiveFilters(savedSearch.filters);
  };

  const exportResults = () => {
    const csvContent = searchResults.map(paper => 
      `"${paper.title}","${paper.authors.join('; ')}","${paper.publication}","${paper.date}","${paper.category}","${paper.citations}","${paper.impactFactor}"`
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'search-results.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Advanced Search & Filter
              </h1>
              <p className="text-text-secondary">
                Discover research papers using sophisticated search criteria and filtering options
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={saveCurrentSearch}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 nav-transition"
              >
                <Icon name="Save" size={18} />
                <span>Save Search</span>
              </button>
              <button
                onClick={exportResults}
                disabled={resultCount === 0}
                className="flex items-center space-x-2 px-4 py-2 border border-border text-text-primary rounded-lg hover:bg-surface nav-transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="Download" size={18} />
                <span>Export Results</span>
              </button>
            </div>
          </div>

          {/* Main Search Bar */}
          <div className="relative mb-6">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted"
            />
            <input
              type="text"
              placeholder="Enter keywords, paper titles, or research topics..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleFilterChange('keywords', e.target.value);
              }}
              className="w-full pl-12 pr-4 py-4 bg-surface border border-border rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       placeholder-text-muted text-lg font-body"
            />
          </div>

          {/* Active Filters */}
          <ActiveFilters 
            activeFilters={activeFilters}
            onRemoveFilter={removeFilter}
            onClearAll={clearAllFilters}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <SavedSearches 
                savedSearches={savedSearches}
                onLoadSearch={loadSavedSearch}
              />
              <SearchFilters 
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>

          {/* Main Content - Results */}
          <div className="lg:col-span-2">
            <div className="bg-background">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <h2 className="text-xl font-semibold text-text-primary">
                    Search Results
                  </h2>
                  {isLoading ? (
                    <div className="flex items-center space-x-2 text-text-muted">
                      <Icon name="Loader2" size={16} className="animate-spin" />
                      <span>Searching...</span>
                    </div>
                  ) : (
                    <span className="text-text-muted">
                      {resultCount} papers found
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <select className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Sort by Relevance</option>
                    <option>Sort by Date</option>
                    <option>Sort by Citations</option>
                    <option>Sort by Impact Factor</option>
                  </select>
                </div>
              </div>

              {/* Results List */}
              <div className="space-y-6">
                {searchResults.map((paper) => (
                  <div key={paper.id} className="bg-surface border border-border rounded-lg p-6 hover:shadow-md nav-transition">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <Link 
                          to="/detailed-paper-analysis-view"
                          className="text-xl font-semibold text-text-primary hover:text-primary nav-transition mb-2 block"
                        >
                          {paper.title}
                        </Link>
                        <div className="flex items-center space-x-4 text-sm text-text-muted mb-3">
                          <span>{paper.authors.join(', ')}</span>
                          <span>•</span>
                          <span>{paper.publication}</span>
                          <span>•</span>
                          <span>{new Date(paper.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-4 mb-3">
                          <span className="px-2 py-1 bg-primary-100 text-primary text-xs rounded-full">
                            {paper.category}
                          </span>
                          <span className="text-sm text-text-muted">
                            {paper.citations} citations
                          </span>
                          <span className="text-sm text-text-muted">
                            Impact Factor: {paper.impactFactor}
                          </span>
                        </div>
                        <p className="text-text-secondary leading-relaxed">
                          {paper.summary}
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2 ml-4">
                        <button className="p-2 border border-border rounded-lg hover:bg-surface nav-transition">
                          <Icon name="Bookmark" size={16} />
                        </button>
                        <button className="p-2 border border-border rounded-lg hover:bg-surface nav-transition">
                          <Icon name="Share" size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 pt-4 border-t border-border">
                      <Link 
                        to="/detailed-paper-analysis-view"
                        className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg 
                                 hover:bg-primary-700 nav-transition"
                      >
                        <Icon name="FileText" size={16} />
                        <span>View Analysis</span>
                      </Link>
                      <button className="flex items-center space-x-2 px-4 py-2 border border-border text-text-primary rounded-lg hover:bg-surface nav-transition">
                        <Icon name="ExternalLink" size={16} />
                        <span>Read Paper</span>
                      </button>
                      <Link 
                        to="/paper-comparison-and-analysis-tools"
                        className="flex items-center space-x-2 px-4 py-2 border border-border 
                                 text-text-primary rounded-lg hover:bg-surface nav-transition"
                      >
                        <Icon name="GitCompare" size={16} />
                        <span>Compare</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              {resultCount > 0 && (
                <div className="text-center mt-8">
                  <button className="px-6 py-3 border border-border text-text-primary rounded-lg 
                                   hover:bg-surface nav-transition">
                    Load More Results
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Results Preview */}
          <div className="lg:col-span-1">
            <ResultsPreview 
              resultCount={resultCount}
              isLoading={isLoading}
              sampleResults={searchResults.slice(0, 3)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchAndFilterInterface;