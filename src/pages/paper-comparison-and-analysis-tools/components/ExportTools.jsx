import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ExportTools = ({ selectedPapers }) => {
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportSections, setExportSections] = useState({
    overview: true,
    methodology: true,
    results: true,
    conclusions: true,
    charts: true,
    annotations: false
  });

  const exportFormats = [
    { id: 'pdf', label: 'PDF Report', icon: 'FileText', description: 'Comprehensive comparison report' },
    { id: 'csv', label: 'CSV Data', icon: 'Table', description: 'Raw data for further analysis' },
    { id: 'json', label: 'JSON Export', icon: 'Code', description: 'Structured data format' },
    { id: 'citation', label: 'Citations', icon: 'Quote', description: 'Bibliography format' }
  ];

  const handleExport = (format) => {
    if (selectedPapers.length === 0) {
      alert('Please select papers to compare before exporting.');
      return;
    }

    // Mock export functionality
    const exportData = {
      timestamp: new Date().toISOString(),
      papers: selectedPapers,
      sections: exportSections,
      format: format
    };

    switch (format) {
      case 'pdf': console.log('Generating PDF report...', exportData);
        // Mock PDF generation
        setTimeout(() => {
          alert('PDF report generated successfully! (This is a mock implementation)');
        }, 1000);
        break;
      
      case 'csv': console.log('Generating CSV export...', exportData);
        // Mock CSV generation
        const csvContent = generateCSVContent(selectedPapers);
        downloadFile(csvContent, 'paper-comparison.csv', 'text/csv');
        break;
      
      case 'json': console.log('Generating JSON export...', exportData);
        // Mock JSON export
        const jsonContent = JSON.stringify(exportData, null, 2);
        downloadFile(jsonContent, 'paper-comparison.json', 'application/json');
        break;
      
      case 'citation': console.log('Generating citations...', exportData);
        // Mock citation generation
        const citations = generateCitations(selectedPapers);
        downloadFile(citations, 'paper-citations.txt', 'text/plain');
        break;
      
      default:
        console.log('Unknown export format:', format);
    }

    setIsExportMenuOpen(false);
  };

  const generateCSVContent = (papers) => {
    const headers = ['Title', 'Authors', 'Journal', 'Year', 'Citations', 'Category', 'Accuracy', 'Precision', 'Recall', 'F1 Score'];
    const rows = papers.map(paper => [
      `"${paper.title}"`,
      `"${paper.authors.join(', ')}"`,
      `"${paper.journal}"`,
      paper.year,
      paper.citations,
      `"${paper.category}"`,
      paper.metrics.accuracy,
      paper.metrics.precision,
      paper.metrics.recall,
      paper.metrics.f1Score
    ]);
    
    return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  };

  const generateCitations = (papers) => {
    return papers.map(paper => {
      const authors = paper.authors.join(', ');
      return `${authors}. (${paper.year}). ${paper.title}. ${paper.journal}.`;
    }).join('\n\n');
  };

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const toggleSection = (section) => {
    setExportSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
        disabled={selectedPapers.length === 0}
        className={`flex items-center space-x-2 px-4 py-2 border rounded-lg nav-transition ${
          selectedPapers.length === 0
            ? 'border-border text-text-muted cursor-not-allowed' :'border-border text-text-primary hover:bg-surface'
        }`}
      >
        <Icon name="Download" size={18} />
        <span>Export</span>
        <Icon name="ChevronDown" size={14} />
      </button>

      {isExportMenuOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-background border border-border rounded-lg modal-elevation z-50">
          <div className="p-4">
            <h3 className="font-heading font-semibold text-text-primary mb-4">
              Export Comparison Report
            </h3>

            {/* Export Format Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Export Format
              </label>
              <div className="space-y-2">
                {exportFormats.map(format => (
                  <button
                    key={format.id}
                    onClick={() => setExportFormat(format.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg border nav-transition ${
                      exportFormat === format.id
                        ? 'border-primary bg-primary-50' :'border-border hover:bg-surface'
                    }`}
                  >
                    <Icon name={format.icon} size={18} className={
                      exportFormat === format.id ? 'text-primary' : 'text-text-muted'
                    } />
                    <div className="flex-1 text-left">
                      <p className="font-medium text-text-primary">{format.label}</p>
                      <p className="text-xs text-text-muted">{format.description}</p>
                    </div>
                    {exportFormat === format.id && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Section Selection (for PDF export) */}
            {exportFormat === 'pdf' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Include Sections
                </label>
                <div className="space-y-2">
                  {Object.entries(exportSections).map(([section, included]) => (
                    <label key={section} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={included}
                        onChange={() => toggleSection(section)}
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                      />
                      <span className="text-sm text-text-secondary capitalize">
                        {section === 'annotations' ? 'My Annotations' : section}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Export Summary */}
            <div className="mb-4 p-3 bg-surface rounded-lg">
              <div className="flex items-center space-x-2 text-sm text-text-muted">
                <Icon name="Info" size={14} />
                <span>
                  Exporting {selectedPapers.length} paper{selectedPapers.length !== 1 ? 's' : ''} 
                  {exportFormat === 'pdf' && ` with ${Object.values(exportSections).filter(Boolean).length} sections`}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleExport(exportFormat)}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 nav-transition"
              >
                <Icon name="Download" size={16} />
                <span>Export {exportFormat.toUpperCase()}</span>
              </button>
              <button
                onClick={() => setIsExportMenuOpen(false)}
                className="px-4 py-2 border border-border text-text-secondary rounded-lg hover:bg-surface nav-transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay */}
      {isExportMenuOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsExportMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default ExportTools;