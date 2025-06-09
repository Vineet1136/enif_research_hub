// /home/ubuntu/app/enif_research_hub/src/components/SummaryModal.jsx
import React, { useEffect, useState } from 'react';
import Icon from './AppIcon';
import Image from './AppImage';

const SummaryModal = ({ isOpen, onClose, summaryData, diagrams, isLoading }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  // Map important diagram descriptions to actual diagrams
  const relevantDiagrams = summaryData?.important_diagram_descriptions?.map((desc, index) => {
    // If we have matching diagrams, use them; otherwise use the first available diagrams
    const matchingDiagram = diagrams?.find(d => 
      d.title.toLowerCase().includes(desc.title.toLowerCase()) || 
      desc.title.toLowerCase().includes(d.title.toLowerCase())
    ) || diagrams?.[index % diagrams?.length];
    
    return {
      ...desc,
      imageUrl: matchingDiagram?.imageUrl || '',
      type: matchingDiagram?.type || 'Figure'
    };
  }) || [];
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div 
        className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-primary" />
            </div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">AI-Generated Research Summary</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface nav-transition"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="w-12 h-12 border-t-2 border-primary border-solid rounded-full animate-spin mb-4"></div>
              <p className="text-text-secondary">Generating summary...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Summary column */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-3">Summary</h3>
                  <div className="bg-surface rounded-lg p-4">
                    <p className="text-text-secondary whitespace-pre-line">
                      {summaryData?.summary}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-3">Key Points</h3>
                  <div className="bg-surface rounded-lg p-4">
                    <ul className="space-y-2">
                      {summaryData?.key_points?.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary font-semibold mr-2">{index + 1}.</span>
                          <span className="text-text-secondary">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Images column */}
              <div className="lg:col-span-1">
                {relevantDiagrams.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-3">Important Visuals</h3>
                    
                    {/* Selected image */}
                    <div className="bg-surface rounded-lg p-4 mb-4">
                      <div className="bg-white rounded-lg border border-border overflow-hidden mb-3">
                        <div className="aspect-video relative">
                          <Image
                            src={relevantDiagrams[selectedImageIndex]?.imageUrl || ''}
                            alt={relevantDiagrams[selectedImageIndex]?.title || 'Diagram'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      <h4 className="font-medium text-text-primary">
                        {relevantDiagrams[selectedImageIndex]?.title}
                      </h4>
                      <p className="text-sm text-text-secondary mt-2">
                        {relevantDiagrams[selectedImageIndex]?.description}
                      </p>
                      <p className="text-xs text-primary mt-2">
                        <span className="font-medium">Why it's important: </span>
                        {relevantDiagrams[selectedImageIndex]?.importance}
                      </p>
                    </div>
                    
                    {/* Image selector */}
                    {relevantDiagrams.length > 1 && (
                      <div className="flex space-x-2">
                        {relevantDiagrams.map((diagram, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`flex-1 p-2 text-xs font-medium rounded-lg nav-transition ${selectedImageIndex === index ? 'bg-primary text-white' : 'bg-white border border-border text-text-secondary hover:bg-surface-hover'}`}
                          >
                            Figure {index + 1}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 md:p-6 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">Generated using OpenAI API</p>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-surface hover:bg-surface-hover nav-transition text-text-primary font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryModal;