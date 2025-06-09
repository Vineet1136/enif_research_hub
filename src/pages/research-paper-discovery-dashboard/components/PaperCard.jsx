import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const PaperCard = ({ paper, viewMode = 'grid' }) => {
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const toggleAnalysis = () => {
    setShowFullAnalysis(!showFullAnalysis);
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-background border border-border rounded-lg p-6 hover:shadow-md nav-transition">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary">
                {paper.category}
              </span>
              {paper.isOpenAccess && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-light text-success">
                  Open Access
                </span>
              )}
              {paper.hasCode && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-600">
                  <Icon name="Code" size={12} />
                  <span>Code</span>
                </span>
              )}
            </div>

            <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2">
              <Link 
                to="/detailed-paper-analysis-view" 
                className="hover:text-primary nav-transition"
              >
                {paper.title}
              </Link>
            </h3>

            <div className="flex items-center space-x-4 text-sm text-text-muted mb-3">
              <span>{paper.authors.join(', ')}</span>
              <span>•</span>
              <span>{paper.source}</span>
              <span>•</span>
              <span>{formatDate(paper.publishedDate)}</span>
            </div>

            <p className="text-text-secondary text-sm mb-4 line-clamp-2">
              {showFullAnalysis ? paper.summary : paper.quickSummary}
            </p>

            <div className="flex items-center space-x-4 text-sm text-text-muted">
              <div className="flex items-center space-x-1">
                <Icon name="Quote" size={14} />
                <span>{paper.citationCount} citations</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Download" size={14} />
                <span>{paper.downloadCount.toLocaleString()} downloads</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-yellow-500" />
                <span>{paper.rating}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2 ml-6">
            <button
              onClick={toggleAnalysis}
              className={`px-4 py-2 text-sm rounded-lg nav-transition ${
                !showFullAnalysis
                  ? 'bg-primary text-white hover:bg-primary-700' :'border border-border text-text-primary hover:bg-surface'
              }`}
            >
              {!showFullAnalysis ? 'Quick Summary' : 'Full Analysis'}
            </button>
            
            <Link
              to="/detailed-paper-analysis-view"
              className="px-4 py-2 text-sm border border-border text-text-primary rounded-lg 
                       hover:bg-surface nav-transition text-center"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-md nav-transition">
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary">
              {paper.category}
            </span>
            {paper.isOpenAccess && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-light text-success">
                Open Access
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1 text-sm text-text-muted">
            <Icon name="Star" size={14} className="text-yellow-500" />
            <span>{paper.rating}</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-text-primary mb-3 line-clamp-2">
          <Link 
            to="/detailed-paper-analysis-view" 
            className="hover:text-primary nav-transition"
          >
            {paper.title}
          </Link>
        </h3>

        <div className="text-sm text-text-muted mb-3">
          <p className="line-clamp-1">{paper.authors.join(', ')}</p>
          <div className="flex items-center space-x-2 mt-1">
            <span>{paper.source}</span>
            <span>•</span>
            <span>{formatDate(paper.publishedDate)}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-text-secondary text-sm line-clamp-3">
            {showFullAnalysis ? paper.summary : paper.quickSummary}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm text-text-muted mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Quote" size={14} />
              <span>{paper.citationCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Download" size={14} />
              <span>{paper.downloadCount > 1000 ? `${(paper.downloadCount / 1000).toFixed(1)}k` : paper.downloadCount}</span>
            </div>
          </div>
          {paper.hasCode && (
            <div className="flex items-center space-x-1 text-primary">
              <Icon name="Code" size={14} />
              <span>Code Available</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleAnalysis}
            className={`flex-1 px-4 py-2 text-sm rounded-lg nav-transition ${
              !showFullAnalysis
                ? 'bg-primary text-white hover:bg-primary-700' :'border border-border text-text-primary hover:bg-surface'
            }`}
          >
            {!showFullAnalysis ? 'Quick Summary' : 'Full Analysis'}
          </button>
          
          <Link
            to="/detailed-paper-analysis-view"
            className="px-4 py-2 text-sm border border-border text-text-primary rounded-lg 
                     hover:bg-surface nav-transition"
          >
            <Icon name="ExternalLink" size={14} />
          </Link>
        </div>
      </div>

      {/* Tags */}
      <div className="px-6 py-3 bg-surface border-t border-border">
        <div className="flex flex-wrap gap-2">
          {paper.tags.slice(0, 4).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded text-xs bg-secondary-100 text-secondary-600"
            >
              {tag}
            </span>
          ))}
          {paper.tags.length > 4 && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs text-text-muted">
              +{paper.tags.length - 4} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaperCard;