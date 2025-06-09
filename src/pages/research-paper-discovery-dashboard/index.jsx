import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

import PaperCard from './components/PaperCard';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import StatsOverview from './components/StatsOverview';

const ResearchPaperDiscoveryDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    dateRange: 'all',
    sources: [],
    sortBy: 'relevance'
  });
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock research papers data
  const mockPapers = [
    {
      id: 1,
      title: "Transformer Architecture for Natural Language Processing: A Comprehensive Analysis",
      authors: ["Dr. Sarah Chen", "Prof. Michael Rodriguez", "Dr. Emily Watson"],
      source: "Nature Machine Intelligence",
      publishedDate: "2024-01-15",
      category: "Machine Learning",
      tags: ["NLP", "Transformers", "Deep Learning", "Neural Networks"],
      summary: `This paper presents a comprehensive analysis of transformer architectures in natural language processing, examining their effectiveness across various tasks including text classification, machine translation, and sentiment analysis.

The research demonstrates significant improvements in performance metrics compared to traditional RNN-based approaches, with particular emphasis on attention mechanisms and their role in capturing long-range dependencies in textual data.`,
      citationCount: 127,
      downloadCount: 2340,
      rating: 4.8,
      isOpenAccess: true,
      hasCode: true,
      githubUrl: "https://github.com/research/transformer-nlp",
      pdfUrl: "https://example.com/paper1.pdf",
      quickSummary: "Comprehensive analysis of transformer architectures showing 23% improvement over RNN models in NLP tasks.",
      keyFindings: [
        "Transformer models outperform RNNs by 23% on average",
        "Attention mechanisms crucial for long-range dependencies",
        "Computational efficiency improved by 40%"
      ]
    },
    {
      id: 2,
      title: "Quantum Computing Applications in Cryptography: Security Implications and Future Directions",
      authors: ["Dr. James Liu", "Prof. Anna Kowalski"],
      source: "IEEE Quantum Engineering",
      publishedDate: "2024-01-10",
      category: "Quantum Computing",
      tags: ["Quantum", "Cryptography", "Security", "Algorithms"],
      summary: `An in-depth exploration of quantum computing's impact on modern cryptographic systems, analyzing both threats and opportunities presented by quantum algorithms.

The study evaluates post-quantum cryptographic methods and their implementation challenges, providing a roadmap for transitioning to quantum-resistant security protocols.`,
      citationCount: 89,
      downloadCount: 1876,
      rating: 4.6,
      isOpenAccess: false,
      hasCode: false,
      githubUrl: null,
      pdfUrl: "https://example.com/paper2.pdf",
      quickSummary: "Analysis of quantum computing threats to cryptography with proposed quantum-resistant solutions.",
      keyFindings: [
        "Current RSA encryption vulnerable to quantum attacks",
        "Post-quantum algorithms show 15% performance overhead",
        "Implementation timeline critical for security transition"
      ]
    },
    {
      id: 3,
      title: "Climate Change Impact on Marine Ecosystems: A Machine Learning Approach",
      authors: ["Dr. Maria Santos", "Prof. David Thompson", "Dr. Lisa Park"],
      source: "Environmental Science & Technology",
      publishedDate: "2024-01-08",
      category: "Environmental Science",
      tags: ["Climate Change", "Marine Biology", "Machine Learning", "Ecosystems"],
      summary: `This research applies advanced machine learning techniques to analyze climate change impacts on marine ecosystems, utilizing satellite data and oceanographic measurements spanning two decades.

The study reveals concerning trends in marine biodiversity and proposes predictive models for ecosystem management and conservation strategies.`,
      citationCount: 156,
      downloadCount: 3210,
      rating: 4.9,
      isOpenAccess: true,
      hasCode: true,
      githubUrl: "https://github.com/marine-research/climate-ml",
      pdfUrl: "https://example.com/paper3.pdf",
      quickSummary: "ML analysis reveals 30% decline in marine biodiversity with predictive conservation models.",
      keyFindings: [
        "30% decline in marine species diversity over 20 years",
        "Temperature rise correlates with ecosystem disruption",
        "ML models achieve 85% accuracy in biodiversity prediction"
      ]
    },
    {
      id: 4,
      title: "Blockchain Technology in Healthcare: Privacy, Security, and Interoperability",
      authors: ["Dr. Robert Kim", "Prof. Jennifer Adams"],
      source: "Journal of Medical Internet Research",
      publishedDate: "2024-01-05",
      category: "Healthcare Technology",
      tags: ["Blockchain", "Healthcare", "Privacy", "Interoperability"],
      summary: `A comprehensive study examining blockchain implementation in healthcare systems, focusing on patient data privacy, security protocols, and system interoperability challenges.

The research presents a novel framework for secure health data exchange while maintaining patient privacy and regulatory compliance across different healthcare providers.`,
      citationCount: 73,
      downloadCount: 1654,
      rating: 4.4,
      isOpenAccess: true,
      hasCode: false,
      githubUrl: null,
      pdfUrl: "https://example.com/paper4.pdf",
      quickSummary: "Blockchain framework for healthcare data exchange with enhanced privacy and security.",
      keyFindings: [
        "99.7% data integrity maintained across systems",
        "50% reduction in data breach incidents",
        "Interoperability improved by 60%"
      ]
    },
    {
      id: 5,
      title: "Renewable Energy Grid Integration: Smart Grid Technologies and Optimization",
      authors: ["Dr. Ahmed Hassan", "Prof. Catherine Miller", "Dr. Yuki Tanaka"],
      source: "IEEE Transactions on Smart Grid",
      publishedDate: "2024-01-03",
      category: "Energy Systems",
      tags: ["Renewable Energy", "Smart Grid", "Optimization", "Sustainability"],
      summary: `This paper investigates advanced smart grid technologies for optimal integration of renewable energy sources, addressing challenges in grid stability, energy storage, and demand management.

The study proposes innovative algorithms for real-time grid optimization and demonstrates significant improvements in energy efficiency and system reliability.`,
      citationCount: 94,
      downloadCount: 2187,
      rating: 4.7,
      isOpenAccess: false,
      hasCode: true,
      githubUrl: "https://github.com/smart-grid/optimization",
      pdfUrl: "https://example.com/paper5.pdf",
      quickSummary: "Smart grid optimization algorithms improve renewable energy integration by 35%.",
      keyFindings: [
        "35% improvement in renewable energy integration",
        "Grid stability maintained with 90% renewable sources",
        "Energy storage efficiency increased by 25%"
      ]
    },
    {
      id: 6,
      title: "Artificial Intelligence in Drug Discovery: Accelerating Pharmaceutical Research",
      authors: ["Dr. Priya Sharma", "Prof. Mark Johnson", "Dr. Elena Volkov"],
      source: "Nature Drug Discovery",
      publishedDate: "2023-12-28",
      category: "Pharmaceutical Research",
      tags: ["AI", "Drug Discovery", "Pharmaceuticals", "Molecular Biology"],
      summary: `An extensive analysis of AI applications in pharmaceutical research, examining machine learning models for drug target identification, molecular design, and clinical trial optimization.

The research demonstrates how AI technologies can significantly reduce drug development timelines while improving success rates in clinical trials.`,
      citationCount: 201,
      downloadCount: 4532,
      rating: 4.9,
      isOpenAccess: true,
      hasCode: true,
      githubUrl: "https://github.com/pharma-ai/drug-discovery",
      pdfUrl: "https://example.com/paper6.pdf",
      quickSummary: "AI reduces drug discovery timeline by 40% with 60% higher success rates in trials.",
      keyFindings: [
        "40% reduction in drug discovery timeline",
        "60% higher success rates in clinical trials",
        "AI models identify novel drug targets with 78% accuracy"
      ]
    }
  ];

  // Filter papers based on search query and selected filters
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      let filtered = mockPapers;

      // Apply search query filter
      if (searchQuery.trim()) {
        filtered = filtered.filter(paper =>
          paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          paper.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
          paper.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
          paper.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply category filter
      if (selectedFilters.categories.length > 0) {
        filtered = filtered.filter(paper =>
          selectedFilters.categories.includes(paper.category)
        );
      }

      // Apply date range filter
      if (selectedFilters.dateRange !== 'all') {
        const now = new Date();
        const filterDate = new Date();
        
        switch (selectedFilters.dateRange) {
          case 'week':
            filterDate.setDate(now.getDate() - 7);
            break;
          case 'month':
            filterDate.setMonth(now.getMonth() - 1);
            break;
          case 'year':
            filterDate.setFullYear(now.getFullYear() - 1);
            break;
        }
        
        filtered = filtered.filter(paper =>
          new Date(paper.publishedDate) >= filterDate
        );
      }

      // Apply sorting
      switch (selectedFilters.sortBy) {
        case 'date':
          filtered.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
          break;
        case 'citations':
          filtered.sort((a, b) => b.citationCount - a.citationCount);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        default: // relevance
          // Keep original order for relevance
          break;
      }

      setFilteredPapers(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedFilters]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters) => {
    setSelectedFilters(newFilters);
  };

  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      categories: [],
      dateRange: 'all',
      sources: [],
      sortBy: 'relevance'
    });
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Research Paper Discovery
            </h1>
            <p className="text-text-secondary">
              Discover and analyze the latest academic research papers across various fields
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 rounded-lg border border-border hover:bg-surface nav-transition"
              title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
            >
              <Icon name={viewMode === 'grid' ? 'List' : 'Grid3X3'} size={20} />
            </button>
            <Link
              to="/advanced-search-and-filter-interface"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white 
                       rounded-lg hover:bg-primary-700 nav-transition"
            >
              <Icon name="Search" size={18} />
              <span>Advanced Search</span>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <StatsOverview 
          totalPapers={mockPapers.length}
          filteredCount={filteredPapers.length}
          isLoading={isLoading}
        />
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8">
        <SearchBar
          searchQuery={searchQuery}
          onSearch={handleSearch}
          onToggleFilter={toggleFilterPanel}
          isFilterActive={Object.values(selectedFilters).some(filter => 
            Array.isArray(filter) ? filter.length > 0 : filter !== 'all' && filter !== 'relevance'
          )}
        />

        {/* Filter Panel */}
        <FilterPanel
          isOpen={isFilterPanelOpen}
          filters={selectedFilters}
          onFilterChange={handleFilterChange}
          onClearAll={clearAllFilters}
          papers={mockPapers}
        />
      </div>

      {/* Results Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-text-primary">
              {isLoading ? 'Searching...' : `${filteredPapers.length} Papers Found`}
            </h2>
            {(searchQuery || Object.values(selectedFilters).some(filter => 
              Array.isArray(filter) ? filter.length > 0 : filter !== 'all' && filter !== 'relevance'
            )) && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-primary hover:text-primary-700 nav-transition"
              >
                Clear all filters
              </button>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-muted">Sort by:</span>
            <select
              value={selectedFilters.sortBy}
              onChange={(e) => handleFilterChange({
                ...selectedFilters,
                sortBy: e.target.value
              })}
              className="text-sm border border-border rounded-lg px-3 py-1 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="relevance">Relevance</option>
              <option value="date">Publication Date</option>
              <option value="citations">Citations</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span className="text-text-muted">Searching papers...</span>
            </div>
          </div>
        )}

        {/* No Results */}
        {!isLoading && filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="FileSearch" size={32} className="text-secondary-500" />
            </div>
            <h3 className="text-lg font-medium text-text-primary mb-2">No papers found</h3>
            <p className="text-text-muted mb-4">
              Try adjusting your search terms or filters to find relevant papers.
            </p>
            <button
              onClick={clearAllFilters}
              className="text-primary hover:text-primary-700 nav-transition"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Papers Grid/List */}
        {!isLoading && filteredPapers.length > 0 && (
          <div className={`
            ${viewMode === 'grid' ?'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' :'space-y-4'
            }
          `}>
            {filteredPapers.map((paper) => (
              <PaperCard
                key={paper.id}
                paper={paper}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && filteredPapers.length > 0 && (
        <div className="flex items-center justify-center space-x-2 py-8">
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-surface nav-transition disabled:opacity-50 disabled:cursor-not-allowed">
            <Icon name="ChevronLeft" size={16} />
          </button>
          <span className="px-4 py-2 bg-primary text-white rounded-lg">1</span>
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-surface nav-transition">2</button>
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-surface nav-transition">3</button>
          <span className="px-2 text-text-muted">...</span>
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-surface nav-transition">10</button>
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-surface nav-transition">
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ResearchPaperDiscoveryDashboard;