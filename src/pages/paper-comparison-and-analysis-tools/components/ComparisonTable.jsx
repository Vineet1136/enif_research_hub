import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ComparisonTable = ({ 
  papers, 
  mode, 
  filterFocus, 
  highlightedDifferences, 
  annotations, 
  onToggleHighlight, 
  onAddAnnotation, 
  onRemovePaper 
}) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [annotationInputs, setAnnotationInputs] = useState({});

  const toggleSection = (paperId, section) => {
    const key = `${paperId}-${section}`;
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAnnotationSubmit = (paperId, section) => {
    const key = `${paperId}-${section}`;
    const note = annotationInputs[key];
    if (note && note.trim()) {
      onAddAnnotation(paperId, section, note.trim());
      setAnnotationInputs(prev => ({
        ...prev,
        [key]: ''
      }));
    }
  };

  const renderOverviewMode = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {papers.map(paper => (
        <div key={paper.id} className="bg-background border border-border rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-heading font-semibold text-text-primary text-sm line-clamp-2">
              {paper.title}
            </h3>
            <button
              onClick={() => onRemovePaper(paper.id)}
              className="ml-2 p-1 text-text-muted hover:text-error nav-transition"
            >
              <Icon name="X" size={14} />
            </button>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <p className="text-text-muted mb-1">Authors</p>
              <p className="text-text-primary">{paper.authors[0]} et al.</p>
            </div>

            <div>
              <p className="text-text-muted mb-1">Journal & Year</p>
              <p className="text-text-primary">{paper.journal}, {paper.year}</p>
            </div>

            <div>
              <p className="text-text-muted mb-1">Category</p>
              <span className="inline-block px-2 py-1 bg-primary-100 text-primary text-xs rounded">
                {paper.category}
              </span>
            </div>

            <div>
              <p className="text-text-muted mb-1">Citations</p>
              <p className="text-text-primary font-medium">{paper.citations}</p>
            </div>

            <div>
              <p className="text-text-muted mb-1">Methodology</p>
              <p className="text-text-primary">{paper.methodology}</p>
            </div>

            {/* Annotation Section */}
            <div className="pt-2 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-text-muted text-xs">Notes</p>
                <button
                  onClick={() => toggleSection(paper.id, 'overview')}
                  className="p-1 text-text-muted hover:text-text-primary nav-transition"
                >
                  <Icon name="MessageSquare" size={12} />
                </button>
              </div>
              
              {expandedSections[`${paper.id}-overview`] && (
                <div className="space-y-2">
                  <textarea
                    value={annotationInputs[`${paper.id}-overview`] || ''}
                    onChange={(e) => setAnnotationInputs(prev => ({
                      ...prev,
                      [`${paper.id}-overview`]: e.target.value
                    }))}
                    placeholder="Add your notes..."
                    className="w-full px-2 py-1 text-xs bg-surface border border-border rounded 
                             focus:outline-none focus:ring-1 focus:ring-primary"
                    rows={2}
                  />
                  <button
                    onClick={() => handleAnnotationSubmit(paper.id, 'overview')}
                    className="text-xs px-2 py-1 bg-primary text-white rounded hover:bg-primary-700 nav-transition"
                  >
                    Save Note
                  </button>
                </div>
              )}
              
              {annotations[paper.id]?.overview && (
                <div className="mt-2 p-2 bg-surface rounded text-xs text-text-secondary">
                  {annotations[paper.id].overview}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMethodologyMode = () => (
    <div className="bg-background border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface border-b border-border">
            <tr>
              <th className="text-left p-4 font-heading font-semibold text-text-primary">
                Methodology Aspect
              </th>
              {papers.map(paper => (
                <th key={paper.id} className="text-left p-4 font-heading font-semibold text-text-primary min-w-64">
                  <div className="flex items-center justify-between">
                    <span className="line-clamp-2">{paper.title}</span>
                    <button
                      onClick={() => onRemovePaper(paper.id)}
                      className="ml-2 p-1 text-text-muted hover:text-error nav-transition"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="p-4 font-medium text-text-primary bg-surface">Research Approach</td>
              {papers.map(paper => (
                <td key={paper.id} className="p-4 text-text-secondary">
                  {paper.methodology}
                </td>
              ))}
            </tr>
            <tr className="border-b border-border">
              <td className="p-4 font-medium text-text-primary bg-surface">Sample Size</td>
              {papers.map(paper => (
                <td key={paper.id} className="p-4 text-text-secondary">
                  {paper.sampleSize}
                </td>
              ))}
            </tr>
            <tr className="border-b border-border">
              <td className="p-4 font-medium text-text-primary bg-surface">Data Collection</td>
              {papers.map(paper => (
                <td key={paper.id} className="p-4 text-text-secondary">
                  {paper.category === 'Machine Learning' ? 'Systematic literature review with meta-analysis' :
                   paper.category === 'Quantum Computing'? 'Experimental quantum algorithm testing' : 'Field testing with simulation modeling'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-medium text-text-primary bg-surface">Analysis Method</td>
              {papers.map(paper => (
                <td key={paper.id} className="p-4 text-text-secondary">
                  {paper.category === 'Machine Learning' ? 'Statistical meta-analysis and trend identification' :
                   paper.category === 'Quantum Computing' ? 'Quantum circuit analysis and performance benchmarking' :
                   'Machine learning optimization with real-time data processing'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderResultsMode = () => (
    <div className="space-y-6">
      {/* Performance Metrics Comparison */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Performance Metrics Comparison
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 font-medium text-text-primary">Metric</th>
                {papers.map(paper => (
                  <th key={paper.id} className="text-center p-3 font-medium text-text-primary">
                    {paper.title.split(':')[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {['accuracy', 'precision', 'recall', 'f1Score'].map(metric => (
                <tr key={metric} className="border-b border-border">
                  <td className="p-3 font-medium text-text-primary capitalize">
                    {metric === 'f1Score' ? 'F1 Score' : metric}
                  </td>
                  {papers.map(paper => (
                    <td key={paper.id} className="p-3 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="font-medium text-text-primary">
                          {paper.metrics[metric]}%
                        </span>
                        <div className={`w-2 h-2 rounded-full ${
                          paper.metrics[metric] >= 95 ? 'bg-success' :
                          paper.metrics[metric] >= 90 ? 'bg-warning' : 'bg-error'
                        }`} />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Findings */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Key Findings Comparison
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {papers.map(paper => (
            <div key={paper.id} className="border border-border rounded-lg p-4">
              <h4 className="font-medium text-text-primary mb-3 line-clamp-2">
                {paper.title}
              </h4>
              <ul className="space-y-2">
                {paper.keyFindings.map((finding, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <Icon name="CheckCircle" size={14} className="mt-0.5 text-success flex-shrink-0" />
                    <span className="text-text-secondary">{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderConclusionsMode = () => (
    <div className="space-y-4">
      {papers.map(paper => (
        <div key={paper.id} className="bg-background border border-border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-heading font-semibold text-text-primary line-clamp-2">
              {paper.title}
            </h3>
            <button
              onClick={() => onRemovePaper(paper.id)}
              className="ml-4 p-1 text-text-muted hover:text-error nav-transition"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
          
          <div className="prose prose-sm max-w-none text-text-secondary mb-4">
            <p>{paper.conclusions}</p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-4 text-sm text-text-muted">
              <span>{paper.journal}</span>
              <span>•</span>
              <span>{paper.year}</span>
              <span>•</span>
              <span>{paper.citations} citations</span>
            </div>
            
            <button
              onClick={() => toggleSection(paper.id, 'conclusions')}
              className="flex items-center space-x-2 px-3 py-1 text-sm text-primary hover:bg-primary-50 rounded nav-transition"
            >
              <Icon name="MessageSquare" size={14} />
              <span>Add Note</span>
            </button>
          </div>

          {expandedSections[`${paper.id}-conclusions`] && (
            <div className="mt-4 p-4 bg-surface rounded-lg">
              <textarea
                value={annotationInputs[`${paper.id}-conclusions`] || ''}
                onChange={(e) => setAnnotationInputs(prev => ({
                  ...prev,
                  [`${paper.id}-conclusions`]: e.target.value
                }))}
                placeholder="Add your analysis notes..."
                className="w-full px-3 py-2 bg-background border border-border rounded 
                         focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => handleAnnotationSubmit(paper.id, 'conclusions')}
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-700 nav-transition"
                >
                  Save Note
                </button>
              </div>
            </div>
          )}

          {annotations[paper.id]?.conclusions && (
            <div className="mt-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="StickyNote" size={16} className="text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-primary mb-1">Your Analysis</p>
                  <p className="text-sm text-text-secondary">{annotations[paper.id].conclusions}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (mode) {
      case 'methodology':
        return renderMethodologyMode();
      case 'results':
        return renderResultsMode();
      case 'conclusions':
        return renderConclusionsMode();
      default:
        return renderOverviewMode();
    }
  };

  return (
    <div className="space-y-6">
      {papers.length > 0 && (
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Comparing {papers.length} Paper{papers.length !== 1 ? 's' : ''}
          </h2>
          <div className="flex items-center space-x-2 text-sm text-text-muted">
            <Icon name="Info" size={14} />
            <span>Click on papers to add annotations and highlights</span>
          </div>
        </div>
      )}
      
      {renderContent()}
    </div>
  );
};

export default ComparisonTable;