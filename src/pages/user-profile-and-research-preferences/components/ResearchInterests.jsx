import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ResearchInterests = () => {
  const [selectedCategories, setSelectedCategories] = useState([
    'Machine Learning',
    'Natural Language Processing',
    'Computer Vision'
  ]);
  
  const [selectedKeywords, setSelectedKeywords] = useState([
    'deep learning',
    'neural networks',
    'transformers',
    'computer vision',
    'nlp'
  ]);
  
  const [followedAuthors, setFollowedAuthors] = useState([
    { id: 1, name: 'Geoffrey Hinton', institution: 'University of Toronto', papers: 245 },
    { id: 2, name: 'Yann LeCun', institution: 'NYU & Meta', papers: 189 },
    { id: 3, name: 'Yoshua Bengio', institution: 'University of Montreal', papers: 312 }
  ]);

  const [preferences, setPreferences] = useState({
    dashboardLayout: 'grid',
    paperCardDensity: 'comfortable',
    defaultAnalysisView: 'summary',
    autoSaveSearches: true,
    showRecommendations: true,
    paperLanguages: ['English'],
    publicationYears: { min: 2020, max: new Date().getFullYear() }
  });

  const [newKeyword, setNewKeyword] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  const availableCategories = [
    'Machine Learning', 'Natural Language Processing', 'Computer Vision',
    'Robotics', 'Data Science', 'Artificial Intelligence', 'Deep Learning',
    'Reinforcement Learning', 'Computer Graphics', 'Human-Computer Interaction',
    'Software Engineering', 'Cybersecurity', 'Blockchain', 'Quantum Computing',
    'Bioinformatics', 'Computational Biology', 'Medical Informatics'
  ];

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !selectedKeywords.includes(newKeyword.trim().toLowerCase())) {
      setSelectedKeywords(prev => [...prev, newKeyword.trim().toLowerCase()]);
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (keyword) => {
    setSelectedKeywords(prev => prev.filter(k => k !== keyword));
  };

  const handleAddAuthor = () => {
    if (newAuthor.trim()) {
      const newAuthorObj = {
        id: Date.now(),
        name: newAuthor.trim(),
        institution: 'Unknown Institution',
        papers: 0
      };
      setFollowedAuthors(prev => [...prev, newAuthorObj]);
      setNewAuthor('');
    }
  };

  const handleRemoveAuthor = (authorId) => {
    setFollowedAuthors(prev => prev.filter(a => a.id !== authorId));
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-8">
      {/* Research Categories */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Research Categories</h3>
        <p className="text-text-secondary text-sm mb-6">
          Select the research areas you're most interested in to personalize your paper recommendations.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {availableCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryToggle(category)}
              className={`p-3 rounded-lg border text-sm font-medium nav-transition ${
                selectedCategories.includes(category)
                  ? 'bg-primary text-white border-primary' :'bg-background text-text-secondary border-border hover:bg-surface hover:text-text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="mt-4 text-sm text-text-muted">
          Selected: {selectedCategories.length} categories
        </div>
      </div>

      {/* Keywords */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Research Keywords</h3>
        <p className="text-text-secondary text-sm mb-6">
          Add specific keywords to refine your research interests and improve paper discovery.
        </p>
        
        <div className="flex space-x-3 mb-4">
          <input
            type="text"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
            placeholder="Add a keyword..."
            className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none 
                     focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            onClick={handleAddKeyword}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 nav-transition"
          >
            Add
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {selectedKeywords.map((keyword) => (
            <span
              key={keyword}
              className="inline-flex items-center space-x-2 px-3 py-1 bg-primary-100 text-primary rounded-full text-sm"
            >
              <span>{keyword}</span>
              <button
                onClick={() => handleRemoveKeyword(keyword)}
                className="hover:text-primary-700 nav-transition"
              >
                <Icon name="X" size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Followed Authors */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Followed Authors</h3>
        <p className="text-text-secondary text-sm mb-6">
          Follow researchers whose work you want to stay updated on.
        </p>
        
        <div className="flex space-x-3 mb-6">
          <input
            type="text"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddAuthor()}
            placeholder="Add author name..."
            className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none 
                     focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            onClick={handleAddAuthor}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 nav-transition"
          >
            Follow
          </button>
        </div>
        
        <div className="space-y-3">
          {followedAuthors.map((author) => (
            <div
              key={author.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-text-primary">{author.name}</h4>
                  <p className="text-text-secondary text-sm">{author.institution}</p>
                  <p className="text-text-muted text-xs">{author.papers} papers</p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveAuthor(author.id)}
                className="p-2 text-text-muted hover:text-error hover:bg-error-light rounded-lg nav-transition"
              >
                <Icon name="UserMinus" size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Preferences */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Display Preferences</h3>
        <p className="text-text-secondary text-sm mb-6">
          Customize how research papers and information are displayed.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dashboard Layout */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Dashboard Layout
            </label>
            <div className="space-y-2">
              {['grid', 'list', 'compact'].map((layout) => (
                <label key={layout} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="dashboardLayout"
                    value={layout}
                    checked={preferences.dashboardLayout === layout}
                    onChange={(e) => handlePreferenceChange('dashboardLayout', e.target.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-text-secondary capitalize">{layout} View</span>
                </label>
              ))}
            </div>
          </div>

          {/* Paper Card Density */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Paper Card Information
            </label>
            <div className="space-y-2">
              {['compact', 'comfortable', 'spacious'].map((density) => (
                <label key={density} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paperCardDensity"
                    value={density}
                    checked={preferences.paperCardDensity === density}
                    onChange={(e) => handlePreferenceChange('paperCardDensity', e.target.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-text-secondary capitalize">{density}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Default Analysis View */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Default Analysis View
            </label>
            <div className="space-y-2">
              {['summary', 'detailed', 'visual'].map((view) => (
                <label key={view} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="defaultAnalysisView"
                    value={view}
                    checked={preferences.defaultAnalysisView === view}
                    onChange={(e) => handlePreferenceChange('defaultAnalysisView', e.target.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-text-secondary capitalize">{view} Analysis</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Preferences */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Additional Options
            </label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.autoSaveSearches}
                  onChange={(e) => handlePreferenceChange('autoSaveSearches', e.target.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-text-secondary">Auto-save search queries</span>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.showRecommendations}
                  onChange={(e) => handlePreferenceChange('showRecommendations', e.target.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-text-secondary">Show personalized recommendations</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Publication Filters */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Publication Filters</h3>
        <p className="text-text-secondary text-sm mb-6">
          Set default filters for paper discovery and recommendations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Publication Years */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Publication Year Range
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-xs text-text-muted mb-1">From</label>
                <input
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={preferences.publicationYears.min}
                  onChange={(e) => handlePreferenceChange('publicationYears', {
                    ...preferences.publicationYears,
                    min: parseInt(e.target.value)
                  })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-text-muted mb-1">To</label>
                <input
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={preferences.publicationYears.max}
                  onChange={(e) => handlePreferenceChange('publicationYears', {
                    ...preferences.publicationYears,
                    max: parseInt(e.target.value)
                  })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Preferred Languages
            </label>
            <div className="space-y-2">
              {['English', 'Spanish', 'French', 'German', 'Chinese'].map((language) => (
                <label key={language} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.paperLanguages.includes(language)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handlePreferenceChange('paperLanguages', [...preferences.paperLanguages, language]);
                      } else {
                        handlePreferenceChange('paperLanguages', 
                          preferences.paperLanguages.filter(l => l !== language)
                        );
                      }
                    }}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <span className="text-text-secondary">{language}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchInterests;