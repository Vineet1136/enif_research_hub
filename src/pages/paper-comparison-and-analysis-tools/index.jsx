import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

import ComparisonTable from './components/ComparisonTable';
import PaperSelector from './components/PaperSelector';
import AnalysisChart from './components/AnalysisChart';
import ExportTools from './components/ExportTools';

const PaperComparisonAndAnalysisTools = () => {
  const [selectedPapers, setSelectedPapers] = useState([]);
  const [comparisonMode, setComparisonMode] = useState('overview');
  const [highlightedDifferences, setHighlightedDifferences] = useState([]);
  const [annotations, setAnnotations] = useState({});
  const [filterFocus, setFilterFocus] = useState('all');

  // Mock data for available papers
  const availablePapers = [
    {
      id: "paper_1",
      title: "Deep Learning Approaches for Natural Language Processing: A Comprehensive Survey",
      authors: ["Dr. Sarah Chen", "Prof. Michael Rodriguez", "Dr. Emily Watson"],
      journal: "Nature Machine Intelligence",
      year: 2024,
      citations: 342,
      category: "Machine Learning",
      methodology: "Systematic Literature Review",
      sampleSize: "150 studies analyzed",
      keyFindings: [
        "Transformer architectures show 23% improvement over traditional RNNs",
        "Pre-trained models reduce training time by 67% on average",
        "Multi-modal approaches achieve state-of-the-art results in 8/10 benchmarks"
      ],
      conclusions: `The study demonstrates that modern deep learning approaches, particularly transformer-based architectures, have revolutionized natural language processing tasks. The integration of pre-trained models significantly reduces computational requirements while maintaining high performance across diverse applications.`,
      metrics: {
        accuracy: 94.2,
        precision: 91.8,
        recall: 93.5,
        f1Score: 92.6
      },
      abstract: `This comprehensive survey examines the evolution of deep learning methodologies in natural language processing from 2019 to 2024. We analyze 150 peer-reviewed studies to identify key trends, performance improvements, and emerging challenges in the field.`
    },
    {
      id: "paper_2", 
      title: "Quantum Computing Applications in Cryptography: Security Implications and Future Directions",
      authors: ["Prof. David Kim", "Dr. Lisa Zhang", "Dr. Robert Johnson"],
      journal: "IEEE Transactions on Quantum Engineering",
      year: 2024,
      citations: 189,
      category: "Quantum Computing",
      methodology: "Experimental Analysis",
      sampleSize: "12 quantum algorithms tested",
      keyFindings: [
        "Shor's algorithm implementation reduces RSA-2048 factorization time by 99.8%",
        "Quantum key distribution achieves 99.99% security against eavesdropping",
        "Current quantum computers limited to 100-qubit operations for practical cryptography"
      ],
      conclusions: `Quantum computing presents both unprecedented opportunities and significant threats to current cryptographic systems. While quantum algorithms can break traditional encryption, quantum cryptography offers theoretically unbreakable security protocols.`,
      metrics: {
        accuracy: 99.9,
        precision: 98.7,
        recall: 99.2,
        f1Score: 98.9
      },
      abstract: `This research investigates the practical applications of quantum computing in modern cryptographic systems, analyzing both the vulnerabilities it creates and the new security paradigms it enables through quantum key distribution and post-quantum cryptography.`
    },
    {
      id: "paper_3",
      title: "Sustainable Energy Systems: Machine Learning Optimization for Smart Grid Management",
      authors: ["Dr. Maria Gonzalez", "Prof. James Wilson", "Dr. Aisha Patel"],
      journal: "Energy and Environmental Science",
      year: 2023,
      citations: 267,
      category: "Energy Systems",
      methodology: "Simulation and Field Testing",
      sampleSize: "5 smart grid networks, 10,000 households",
      keyFindings: [
        "ML-optimized grids reduce energy waste by 31% compared to traditional systems",
        "Predictive algorithms improve renewable energy integration by 45%",
        "Real-time optimization decreases peak demand by 22% during high-usage periods"
      ],
      conclusions: `Machine learning algorithms significantly enhance smart grid efficiency and sustainability. The integration of predictive models with real-time optimization creates more resilient and environmentally friendly energy distribution systems.`,
      metrics: {
        accuracy: 87.3,
        precision: 89.1,
        recall: 85.7,
        f1Score: 87.4
      },
      abstract: `This study explores the application of machine learning techniques to optimize smart grid operations, focusing on energy efficiency, renewable integration, and demand response management across diverse urban and rural environments.`
    }
  ];

  const comparisonModes = [
    { id: 'overview', label: 'Overview', icon: 'LayoutGrid' },
    { id: 'methodology', label: 'Methodology', icon: 'Settings' },
    { id: 'results', label: 'Results', icon: 'BarChart3' },
    { id: 'conclusions', label: 'Conclusions', icon: 'CheckCircle' }
  ];

  const filterOptions = [
    { id: 'all', label: 'All Aspects' },
    { id: 'methodology', label: 'Methodology' },
    { id: 'results', label: 'Results & Data' },
    { id: 'conclusions', label: 'Conclusions' },
    { id: 'metrics', label: 'Performance Metrics' }
  ];

  const addPaperToComparison = (paper) => {
    if (selectedPapers.length < 4 && !selectedPapers.find(p => p.id === paper.id)) {
      setSelectedPapers([...selectedPapers, paper]);
    }
  };

  const removePaperFromComparison = (paperId) => {
    setSelectedPapers(selectedPapers.filter(p => p.id !== paperId));
    // Remove annotations for this paper
    const newAnnotations = { ...annotations };
    delete newAnnotations[paperId];
    setAnnotations(newAnnotations);
  };

  const addAnnotation = (paperId, section, note) => {
    setAnnotations(prev => ({
      ...prev,
      [paperId]: {
        ...prev[paperId],
        [section]: note
      }
    }));
  };

  const toggleHighlight = (difference) => {
    setHighlightedDifferences(prev => 
      prev.includes(difference) 
        ? prev.filter(d => d !== difference)
        : [...prev, difference]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                Paper Comparison & Analysis Tools
              </h1>
              <p className="text-text-secondary">
                Compare research papers side-by-side to identify key differences, similarities, and insights
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <ExportTools selectedPapers={selectedPapers} />
              <Link
                to="/advanced-search-and-filter-interface"
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 nav-transition"
              >
                <Icon name="Search" size={18} />
                <span>Find Papers</span>
              </Link>
            </div>
          </div>

          {/* Comparison Mode Tabs */}
          <div className="flex items-center space-x-1 bg-background rounded-lg p-1 border border-border">
            {comparisonModes.map(mode => (
              <button
                key={mode.id}
                onClick={() => setComparisonMode(mode.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md nav-transition ${
                  comparisonMode === mode.id
                    ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
              >
                <Icon name={mode.icon} size={16} />
                <span className="font-medium">{mode.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Paper Selection Sidebar */}
          <div className="lg:col-span-1">
            <PaperSelector
              availablePapers={availablePapers}
              selectedPapers={selectedPapers}
              onAddPaper={addPaperToComparison}
              onRemovePaper={removePaperFromComparison}
            />

            {/* Filter Options */}
            <div className="mt-6 bg-background border border-border rounded-lg p-4">
              <h3 className="font-heading font-semibold text-text-primary mb-3">
                Focus Comparison
              </h3>
              <div className="space-y-2">
                {filterOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => setFilterFocus(option.id)}
                    className={`w-full text-left px-3 py-2 rounded-md nav-transition ${
                      filterFocus === option.id
                        ? 'bg-primary-100 text-primary border border-primary-200' :'text-text-secondary hover:bg-surface'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Comparison Area */}
          <div className="lg:col-span-3">
            {selectedPapers.length === 0 ? (
              <div className="bg-background border border-border rounded-lg p-12 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="GitCompare" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                  Start Your Comparison
                </h3>
                <p className="text-text-secondary mb-6 max-w-md mx-auto">
                  Select papers from the sidebar to begin comparing their methodologies, results, and conclusions side-by-side.
                </p>
                <Link
                  to="/research-paper-discovery-dashboard"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 nav-transition"
                >
                  <Icon name="Search" size={18} />
                  <span>Browse Papers</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Comparison Table */}
                <ComparisonTable
                  papers={selectedPapers}
                  mode={comparisonMode}
                  filterFocus={filterFocus}
                  highlightedDifferences={highlightedDifferences}
                  annotations={annotations}
                  onToggleHighlight={toggleHighlight}
                  onAddAnnotation={addAnnotation}
                  onRemovePaper={removePaperFromComparison}
                />

                {/* Analysis Charts */}
                {selectedPapers.length >= 2 && (
                  <AnalysisChart
                    papers={selectedPapers}
                    mode={comparisonMode}
                  />
                )}

                {/* Key Differences Summary */}
                {selectedPapers.length >= 2 && (
                  <div className="bg-background border border-border rounded-lg p-6">
                    <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                      Key Differences & Insights
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h4 className="font-medium text-text-primary">Methodological Differences</h4>
                        <ul className="space-y-2 text-sm text-text-secondary">
                          <li className="flex items-start space-x-2">
                            <Icon name="ArrowRight" size={14} className="mt-0.5 text-primary" />
                            <span>Sample sizes vary from 12 algorithms to 150 studies</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <Icon name="ArrowRight" size={14} className="mt-0.5 text-primary" />
                            <span>Research approaches range from experimental to systematic review</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <Icon name="ArrowRight" size={14} className="mt-0.5 text-primary" />
                            <span>Different evaluation metrics and benchmarks used</span>
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-medium text-text-primary">Performance Insights</h4>
                        <ul className="space-y-2 text-sm text-text-secondary">
                          <li className="flex items-start space-x-2">
                            <Icon name="TrendingUp" size={14} className="mt-0.5 text-success" />
                            <span>Quantum computing shows highest precision (98.7%)</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <Icon name="TrendingUp" size={14} className="mt-0.5 text-success" />
                            <span>NLP research demonstrates strong overall performance</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <Icon name="AlertCircle" size={14} className="mt-0.5 text-warning" />
                            <span>Energy systems show room for improvement in accuracy</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperComparisonAndAnalysisTools;