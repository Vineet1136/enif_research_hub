// /home/ubuntu/app/enif_research_hub/src/pages/detailed-paper-analysis-view/components/TLDRSection.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import SummaryModal from 'components/SummaryModal';
import { generatePaperSummary } from 'services/openai';

const TLDRSection = ({ tldr, paperData, diagrams }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateSummary = async () => {
    setIsModalOpen(true);
    setIsLoading(true);
    
    try {
      const summary = await generatePaperSummary(paperData);
      setSummaryData(summary);
    } catch (error) {
      console.error('Failed to generate summary:', error);
      // Set fallback summary data with error message
      setSummaryData({
        summary: 'We encountered an error while generating the summary. Please try again later.',
        key_points: ['Error generating summary'],
        important_diagram_descriptions: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white border border-border rounded-lg p-6 card-elevation">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-semibold text-text-primary">TL;DR</h2>
              <p className="text-sm text-text-muted">Quick summary for busy researchers</p>
            </div>
          </div>
          
          <button 
            onClick={handleGenerateSummary}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-600 nav-transition"
          >
            <Icon name="RefreshCw" size={16} />
            <span className="font-medium text-sm">Generate AI Summary</span>
          </button>
        </div>
        
        <div className="bg-surface rounded-lg p-6">
          <p className="text-text-secondary leading-relaxed text-lg">
            {tldr}
          </p>
        </div>
      </div>
      
      <SummaryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        summaryData={summaryData}
        diagrams={diagrams}
        isLoading={isLoading}
      />
    </>
  );
};

export default TLDRSection;