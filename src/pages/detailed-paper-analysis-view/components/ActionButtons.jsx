import React from 'react';
import Icon from 'components/AppIcon';

const ActionButtons = ({ paperUrl, githubUrl, pdfUrl }) => {
  const handleReadPaper = () => {
    window.open(paperUrl, '_blank', 'noopener,noreferrer');
  };

  const handleViewCode = () => {
    window.open(githubUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadPDF = () => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-wrap gap-4">
      {/* Primary Actions */}
      <button
        onClick={handleReadPaper}
        className="flex items-center space-x-3 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 nav-transition font-medium"
      >
        <Icon name="ExternalLink" size={20} />
        <span>Read the Full Paper</span>
      </button>

      <button
        onClick={handleViewCode}
        className="flex items-center space-x-3 px-6 py-3 bg-secondary-700 text-white rounded-lg hover:bg-secondary-600 nav-transition font-medium"
      >
        <Icon name="Github" size={20} />
        <span>View Code on GitHub</span>
      </button>

      {/* Secondary Actions */}
      <button
        onClick={handleDownloadPDF}
        className="flex items-center space-x-3 px-6 py-3 border border-border text-text-primary rounded-lg hover:bg-surface nav-transition font-medium"
      >
        <Icon name="Download" size={20} />
        <span>Download PDF</span>
      </button>

      <button className="flex items-center space-x-3 px-6 py-3 border border-border text-text-primary rounded-lg hover:bg-surface nav-transition font-medium">
        <Icon name="MessageSquare" size={20} />
        <span>Discuss</span>
      </button>
    </div>
  );
};

export default ActionButtons;