import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const RelatedPapers = ({ currentPaperId }) => {
  const relatedPapers = [
    {
      id: "2",
      title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
      authors: ["Jacob Devlin", "Ming-Wei Chang", "Kenton Lee"],
      year: 2018,
      citations: 67891,
      similarity: 0.89,
      category: "Natural Language Processing"
    },
    {
      id: "3",
      title: "GPT-3: Language Models are Few-Shot Learners",
      authors: ["Tom B. Brown", "Benjamin Mann", "Nick Ryder"],
      year: 2020,
      citations: 45234,
      similarity: 0.85,
      category: "Machine Learning"
    },
    {
      id: "4",
      title: "Neural Machine Translation by Jointly Learning to Align and Translate",
      authors: ["Dzmitry Bahdanau", "Kyunghyun Cho", "Yoshua Bengio"],
      year: 2014,
      citations: 23456,
      similarity: 0.78,
      category: "Machine Translation"
    },
    {
      id: "5",
      title: "Sequence to Sequence Learning with Neural Networks",
      authors: ["Ilya Sutskever", "Oriol Vinyals", "Quoc V. Le"],
      year: 2014,
      citations: 19876,
      similarity: 0.75,
      category: "Deep Learning"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Related Papers */}
      <div className="bg-white border border-border rounded-lg p-6 card-elevation">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Related Papers</h3>
            <p className="text-sm text-text-muted">Similar research papers</p>
          </div>
        </div>

        <div className="space-y-4">
          {relatedPapers.map((paper) => (
            <Link
              key={paper.id}
              to={`/detailed-paper-analysis-view?id=${paper.id}`}
              className="block p-4 border border-border rounded-lg hover:bg-surface nav-transition"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-medium text-text-primary line-clamp-2 flex-1">
                  {paper.title}
                </h4>
                <div className="ml-2 flex items-center space-x-1 text-xs text-success">
                  <Icon name="TrendingUp" size={12} />
                  <span>{Math.round(paper.similarity * 100)}%</span>
                </div>
              </div>
              
              <p className="text-xs text-text-muted mb-2">
                {paper.authors.slice(0, 2).join(', ')}
                {paper.authors.length > 2 && ' et al.'}
              </p>
              
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span>{paper.year}</span>
                <div className="flex items-center space-x-1">
                  <Icon name="Quote" size={12} />
                  <span>{paper.citations.toLocaleString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link
          to="/advanced-search-and-filter-interface"
          className="block mt-4 text-center py-2 text-sm text-primary hover:text-primary-700 nav-transition"
        >
          View more related papers
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-border rounded-lg p-6 card-elevation">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
        
        <div className="space-y-3">
          <Link
            to="/paper-comparison-and-analysis-tools"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-surface nav-transition"
          >
            <Icon name="GitCompare" size={18} className="text-primary" />
            <div>
              <div className="text-sm font-medium text-text-primary">Compare Papers</div>
              <div className="text-xs text-text-muted">Side-by-side analysis</div>
            </div>
          </Link>

          <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-surface nav-transition w-full text-left">
            <Icon name="Bell" size={18} className="text-primary" />
            <div>
              <div className="text-sm font-medium text-text-primary">Set Alert</div>
              <div className="text-xs text-text-muted">Get notified of citations</div>
            </div>
          </button>

          <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-surface nav-transition w-full text-left">
            <Icon name="Share2" size={18} className="text-primary" />
            <div>
              <div className="text-sm font-medium text-text-primary">Share Paper</div>
              <div className="text-xs text-text-muted">Send to colleagues</div>
            </div>
          </button>
        </div>
      </div>

      {/* Research Metrics */}
      <div className="bg-white border border-border rounded-lg p-6 card-elevation">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Research Impact</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-muted">Citation Velocity</span>
            <div className="flex items-center space-x-1 text-success">
              <Icon name="TrendingUp" size={14} />
              <span className="text-sm font-medium">+12.5%</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-text-muted">H-Index Impact</span>
            <span className="text-sm font-medium text-text-primary">High</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-text-muted">Field Influence</span>
            <div className="flex items-center space-x-1">
              <div className="w-16 h-2 bg-border rounded-full overflow-hidden">
                <div className="w-4/5 h-full bg-primary rounded-full"></div>
              </div>
              <span className="text-sm font-medium text-text-primary">80%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedPapers;