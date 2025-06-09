// /home/ubuntu/app/enif_research_hub/src/pages/detailed-paper-analysis-view/components/VisualDiagrams.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const VisualDiagrams = ({ diagrams }) => {
  const [selectedDiagram, setSelectedDiagram] = useState(0);

  // If diagrams are not provided, use default mock data
  const diagramData = diagrams || [
    {
      id: 0,
      title: "Transformer Architecture Overview",
      description: "Complete architecture showing encoder-decoder structure with attention mechanisms",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      type: "Architecture"
    },
    {
      id: 1,
      title: "Multi-Head Attention Mechanism",
      description: "Detailed view of how multi-head attention processes input sequences",
      imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=600&fit=crop",
      type: "Mechanism"
    },
    {
      id: 2,
      title: "Performance Comparison",
      description: "BLEU score comparisons across different translation tasks",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      type: "Results"
    }
  ];

  return (
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
          <Icon name="BarChart3" size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-xl font-heading font-semibold text-text-primary">Visual Analysis</h3>
          <p className="text-sm text-text-muted">Interactive diagrams and flowcharts</p>
        </div>
      </div>

      {/* Diagram Selector */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {diagramData.map((diagram) => (
          <button
            key={diagram.id}
            onClick={() => setSelectedDiagram(diagram.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap nav-transition ${
              selectedDiagram === diagram.id
                ? 'bg-primary text-white' :'bg-surface text-text-secondary hover:bg-surface-hover'
            }`}
          >
            <Icon name="Image" size={16} />
            <span className="text-sm font-medium">{diagram.type}</span>
          </button>
        ))}
      </div>

      {/* Selected Diagram */}
      <div className="bg-surface rounded-lg p-6">
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-text-primary mb-2">
            {diagramData[selectedDiagram].title}
          </h4>
          <p className="text-text-muted text-sm">
            {diagramData[selectedDiagram].description}
          </p>
        </div>

        <div className="relative bg-white rounded-lg border border-border overflow-hidden">
          <div className="aspect-video">
            <Image
              src={diagramData[selectedDiagram].imageUrl}
              alt={diagramData[selectedDiagram].title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Overlay Controls */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button className="p-2 bg-white bg-opacity-90 rounded-lg hover:bg-opacity-100 nav-transition">
              <Icon name="ZoomIn" size={16} className="text-text-muted" />
            </button>
            <button className="p-2 bg-white bg-opacity-90 rounded-lg hover:bg-opacity-100 nav-transition">
              <Icon name="Download" size={16} className="text-text-muted" />
            </button>
          </div>
        </div>

        {/* Diagram Navigation */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setSelectedDiagram(Math.max(0, selectedDiagram - 1))}
            disabled={selectedDiagram === 0}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-text-muted hover:text-text-primary nav-transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="ChevronLeft" size={16} />
            <span>Previous</span>
          </button>

          <div className="flex space-x-2">
            {diagramData.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedDiagram(index)}
                className={`w-2 h-2 rounded-full nav-transition ${
                  selectedDiagram === index ? 'bg-primary' : 'bg-border'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setSelectedDiagram(Math.min(diagramData.length - 1, selectedDiagram + 1))}
            disabled={selectedDiagram === diagramData.length - 1}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-text-muted hover:text-text-primary nav-transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisualDiagrams;