import React from 'react';
import Icon from 'components/AppIcon';

const KeyFindings = ({ findings }) => {
  return (
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-success-light rounded-lg flex items-center justify-center">
          <Icon name="CheckCircle" size={20} className="text-success" />
        </div>
        <div>
          <h3 className="text-xl font-heading font-semibold text-text-primary">Key Findings</h3>
          <p className="text-sm text-text-muted">Main contributions and discoveries</p>
        </div>
      </div>

      <div className="space-y-4">
        {findings.map((finding, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-4 bg-surface rounded-lg hover:bg-surface-hover nav-transition"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-semibold">{index + 1}</span>
            </div>
            <div className="flex-1">
              <p className="text-text-secondary leading-relaxed">{finding}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyFindings;