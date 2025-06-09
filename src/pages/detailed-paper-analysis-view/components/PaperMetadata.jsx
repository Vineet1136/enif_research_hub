import React from 'react';
import Icon from 'components/AppIcon';

const PaperMetadata = ({ paper }) => {
  return (
    <div className="space-y-3">
      {/* Authors */}
      <div className="flex items-start space-x-2">
        <Icon name="Users" size={16} className="text-text-muted mt-1 flex-shrink-0" />
        <div>
          <div className="text-sm text-text-muted mb-1">Authors</div>
          <div className="text-text-secondary">
            {paper.authors.slice(0, 3).join(', ')}
            {paper.authors.length > 3 && (
              <span className="text-text-muted"> +{paper.authors.length - 3} more</span>
            )}
          </div>
        </div>
      </div>

      {/* Publication Info */}
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center space-x-2">
          <Icon name="BookOpen" size={16} className="text-text-muted" />
          <div>
            <div className="text-sm text-text-muted">Journal</div>
            <div className="text-text-secondary font-medium">{paper.journal}</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} className="text-text-muted" />
          <div>
            <div className="text-sm text-text-muted">Year</div>
            <div className="text-text-secondary font-medium">{paper.year}</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Icon name="Quote" size={16} className="text-text-muted" />
          <div>
            <div className="text-sm text-text-muted">Citations</div>
            <div className="text-text-secondary font-medium">{paper.citations.toLocaleString()}</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Icon name="Tag" size={16} className="text-text-muted" />
          <div>
            <div className="text-sm text-text-muted">Category</div>
            <div className="text-text-secondary font-medium">{paper.category}</div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex items-start space-x-2">
        <Icon name="Hash" size={16} className="text-text-muted mt-1 flex-shrink-0" />
        <div>
          <div className="text-sm text-text-muted mb-2">Tags</div>
          <div className="flex flex-wrap gap-2">
            {paper.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-100 text-primary text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* DOI */}
      <div className="flex items-center space-x-2">
        <Icon name="ExternalLink" size={16} className="text-text-muted" />
        <div>
          <div className="text-sm text-text-muted">DOI</div>
          <a
            href={`https://doi.org/${paper.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-700 font-medium nav-transition"
          >
            {paper.doi}
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaperMetadata;