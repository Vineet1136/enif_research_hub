// /home/ubuntu/app/enif_research_hub/src/pages/detailed-paper-analysis-view/index.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Icon from 'components/AppIcon';

import PaperMetadata from './components/PaperMetadata';
import TLDRSection from './components/TLDRSection';
import KeyFindings from './components/KeyFindings';
import VisualDiagrams from './components/VisualDiagrams';
import ActionButtons from './components/ActionButtons';
import RelatedPapers from './components/RelatedPapers';

const DetailedPaperAnalysisView = () => {
  const [searchParams] = useSearchParams();
  const paperId = searchParams.get('id') || '1';
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('analysis');

  // Mock paper data
  const paperData = {
    id: paperId,
    title: "Attention Is All You Need: Transformer Architecture for Natural Language Processing",
    authors: ["Ashish Vaswani", "Noam Shazeer", "Niki Parmar", "Jakob Uszkoreit", "Llion Jones", "Aidan N. Gomez", "Łukasz Kaiser", "Illia Polosukhin"],
    journal: "Advances in Neural Information Processing Systems",
    year: 2017,
    doi: "10.48550/arXiv.1706.03762",
    citations: 89247,
    category: "Machine Learning",
    tags: ["Neural Networks", "Attention Mechanism", "NLP", "Deep Learning"],
    abstract: `The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.

Experiments on two machine translation tasks show that these models are superior in quality while being more parallelizable and requiring significantly less time to train. Our model achieves 28.4 BLEU on the WMT 2014 English-to-German translation task, improving over the existing best results, including ensembles, by over 2 BLEU.`,
    tldr: "This paper introduces the Transformer architecture, a novel neural network model that relies entirely on attention mechanisms without recurrent or convolutional layers, achieving state-of-the-art performance in machine translation tasks while being more efficient to train.",
    keyFindings: [
      "Transformer architecture eliminates the need for recurrent and convolutional layers in sequence-to-sequence models",
      "Self-attention mechanism allows for better parallelization during training, reducing computational time significantly",
      "Achieved 28.4 BLEU score on WMT 2014 English-to-German translation, surpassing previous state-of-the-art by 2+ BLEU points",
      "Multi-head attention enables the model to focus on different representation subspaces simultaneously",
      "Positional encoding successfully replaces recurrence for handling sequence order information",
      "The model demonstrates superior performance on English-to-French translation with 41.8 BLEU score"
    ],
    methodology: `The Transformer model consists of an encoder-decoder architecture where both components are composed of stacks of identical layers. The encoder contains six identical layers, each with two sub-layers: a multi-head self-attention mechanism and a position-wise fully connected feed-forward network.

The decoder also contains six identical layers with an additional third sub-layer that performs multi-head attention over the output of the encoder stack. Residual connections are employed around each sub-layer, followed by layer normalization.`,
    results: "The model was evaluated on WMT 2014 English-to-German and English-to-French translation tasks. On English-to-German translation, the model achieved 28.4 BLEU, establishing a new state-of-the-art. On English-to-French translation, the model achieved 41.8 BLEU, again surpassing previous best results.",
    paperUrl: "https://arxiv.org/abs/1706.03762",
    githubUrl: "https://github.com/tensorflow/tensor2tensor",
    pdfUrl: "https://arxiv.org/pdf/1706.03762.pdf"
  };

  // Diagram data from VisualDiagrams component
  const diagrams = [
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

  const tabs = [
    { id: 'analysis', label: 'Analysis', icon: 'FileText' },
    { id: 'methodology', label: 'Methodology', icon: 'Settings' },
    { id: 'results', label: 'Results', icon: 'BarChart3' },
    { id: 'citations', label: 'Citations', icon: 'Quote' }
  ];

  useEffect(() => {
    // Simulate bookmark status check
    const bookmarked = localStorage.getItem(`bookmark_${paperId}`) === 'true';
    setIsBookmarked(bookmarked);
  }, [paperId]);

  const handleBookmark = () => {
    const newBookmarkStatus = !isBookmarked;
    setIsBookmarked(newBookmarkStatus);
    localStorage.setItem(`bookmark_${paperId}`, newBookmarkStatus.toString());
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white border border-border rounded-lg p-6 mb-6 card-elevation">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-heading font-bold text-text-primary mb-4 leading-tight">
                {paperData.title}
              </h1>
              <PaperMetadata paper={paperData} />
            </div>
            <div className="flex items-center space-x-3 ml-6">
              <button
                onClick={handleBookmark}
                className={`p-3 rounded-lg border nav-transition ${
                  isBookmarked 
                    ? 'bg-primary text-white border-primary' :'bg-white text-text-muted border-border hover:bg-surface'
                }`}
                title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
              >
                <Icon name={isBookmarked ? 'Bookmark' : 'BookmarkPlus'} size={20} />
              </button>
              <button className="p-3 rounded-lg border border-border bg-white text-text-muted hover:bg-surface nav-transition">
                <Icon name="Share2" size={20} />
              </button>
              <button className="p-3 rounded-lg border border-border bg-white text-text-muted hover:bg-surface nav-transition">
                <Icon name="Download" size={20} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <ActionButtons 
            paperUrl={paperData.paperUrl}
            githubUrl={paperData.githubUrl}
            pdfUrl={paperData.pdfUrl}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* TLDR Section */}
            <TLDRSection 
              tldr={paperData.tldr} 
              paperData={paperData} 
              diagrams={diagrams} 
            />

            {/* Navigation Tabs */}
            <div className="bg-white border border-border rounded-lg card-elevation">
              <div className="border-b border-border">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 border-b-2 nav-transition ${
                        activeTab === tab.id
                          ? 'border-primary text-primary' :'border-transparent text-text-muted hover:text-text-primary'
                      }`}
                    >
                      <Icon name={tab.icon} size={18} />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'analysis' && (
                  <div className="space-y-8">
                    <KeyFindings findings={paperData.keyFindings} />
                    <VisualDiagrams diagrams={diagrams} />
                  </div>
                )}

                {activeTab === 'methodology' && (
                  <div className="prose prose-lg max-w-none">
                    <h3 className="text-xl font-semibold text-text-primary mb-4">Research Methodology</h3>
                    <p className="text-text-secondary leading-relaxed mb-6">
                      {paperData.methodology}
                    </p>
                    <div className="bg-surface rounded-lg p-6">
                      <h4 className="font-semibold text-text-primary mb-3">Key Components</h4>
                      <ul className="space-y-2 text-text-secondary">
                        <li className="flex items-start space-x-2">
                          <Icon name="ArrowRight" size={16} className="text-primary mt-1 flex-shrink-0" />
                          <span>Encoder-Decoder Architecture with 6 identical layers each</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Icon name="ArrowRight" size={16} className="text-primary mt-1 flex-shrink-0" />
                          <span>Multi-head Self-attention Mechanism</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Icon name="ArrowRight" size={16} className="text-primary mt-1 flex-shrink-0" />
                          <span>Position-wise Feed-forward Networks</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Icon name="ArrowRight" size={16} className="text-primary mt-1 flex-shrink-0" />
                          <span>Residual Connections and Layer Normalization</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'results' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-text-primary">Experimental Results</h3>
                    <p className="text-text-secondary leading-relaxed">
                      {paperData.results}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-surface rounded-lg p-6">
                        <h4 className="font-semibold text-text-primary mb-2">English-to-German</h4>
                        <div className="text-3xl font-bold text-primary mb-1">28.4</div>
                        <div className="text-sm text-text-muted">BLEU Score</div>
                      </div>
                      <div className="bg-surface rounded-lg p-6">
                        <h4 className="font-semibold text-text-primary mb-2">English-to-French</h4>
                        <div className="text-3xl font-bold text-primary mb-1">41.8</div>
                        <div className="text-sm text-text-muted">BLEU Score</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'citations' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-text-primary">Citation Information</h3>
                      <div className="text-2xl font-bold text-primary">{paperData.citations.toLocaleString()}</div>
                    </div>
                    <div className="bg-surface rounded-lg p-6">
                      <h4 className="font-semibold text-text-primary mb-3">BibTeX Citation</h4>
                      <div className="bg-white border border-border rounded p-4 font-mono text-sm text-text-secondary overflow-x-auto">
                        {`@article{vaswani2017attention,
  title={Attention is all you need},
  author={Vaswani, Ashish and Shazeer, Noam and Parmar, Niki and Uszkoreit, Jakob and Jones, Llion and Gomez, Aidan N and Kaiser, Lukasz and Polosukhin, Illia},
  journal={Advances in neural information processing systems},
  volume={30},
  year={2017}
}`}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <RelatedPapers currentPaperId={paperId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedPaperAnalysisView;