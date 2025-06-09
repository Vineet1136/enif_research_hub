import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const ResultsPreview = ({ resultCount, isLoading, sampleResults }) => {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Results Preview</h3>
        {isLoading && (
          <Icon name="Loader2" size={16} className="text-text-muted animate-spin" />
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="FileText" size={18} className="text-primary" />
          <span className="text-2xl font-bold text-text-primary">{resultCount}</span>
        </div>
        <p className="text-sm text-text-secondary">
          {resultCount === 1 ? 'paper found' : 'papers found'}
        </p>
      </div>

      {/* Sample Results */}
      {sampleResults.length > 0 && (
        <div className="space-y-4 mb-6">
          <h4 className="text-sm font-medium text-text-secondary uppercase tracking-wider">
            Top Results
          </h4>
          {sampleResults.map((paper) => (
            <div key={paper.id} className="border border-border rounded-lg p-3 hover:bg-background nav-transition">
              <Link 
                to="/detailed-paper-analysis-view"
                className="text-sm font-medium text-text-primary hover:text-primary nav-transition line-clamp-2 mb-2 block"
              >
                {paper.title}
              </Link>
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span>{paper.category}</span>
                <span>{paper.citations} citations</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-secondary uppercase tracking-wider">
          Quick Actions
        </h4>
        <div className="space-y-2">
          <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary 
                           hover:bg-background hover:text-text-primary rounded-lg nav-transition">
            <Icon name="Save" size={14} />
            <span>Save Search</span>
          </button>
          <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:bg-background hover:text-text-primary rounded-lg nav-transition">
            <Icon name="Bell" size={14} />
            <span>Set Alert</span>
          </button>
          <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:bg-background hover:text-text-primary rounded-lg nav-transition">
            <Icon name="Download" size={14} />
            <span>Export Results</span>
          </button>
        </div>
      </div>

      {/* Search Tips */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-text-secondary mb-3">Search Tips</h4>
        <div className="space-y-2 text-xs text-text-muted">
          <div className="flex items-start space-x-2">
            <Icon name="Lightbulb" size={12} className="mt-0.5 flex-shrink-0" />
            <span>Use quotes for exact phrases: "machine learning"</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Lightbulb" size={12} className="mt-0.5 flex-shrink-0" />
            <span>Combine terms with AND, OR, NOT operators</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Lightbulb" size={12} className="mt-0.5 flex-shrink-0" />
            <span>Filter by date range for recent research</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPreview;