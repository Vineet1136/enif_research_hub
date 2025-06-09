import React from 'react';
import Icon from 'components/AppIcon';

const StatsOverview = ({ totalPapers, filteredCount, isLoading }) => {
  const stats = [
    {
      label: 'Total Papers',
      value: totalPapers.toLocaleString(),
      icon: 'FileText',
      color: 'text-primary'
    },
    {
      label: 'Filtered Results',
      value: isLoading ? '...' : filteredCount.toLocaleString(),
      icon: 'Filter',
      color: 'text-success'
    },
    {
      label: 'Open Access',
      value: '2,847',
      icon: 'Unlock',
      color: 'text-warning'
    },
    {
      label: 'With Code',
      value: '1,523',
      icon: 'Code',
      color: 'text-secondary-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-background ${stat.color}`}>
              <Icon name={stat.icon} size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
              <p className="text-sm text-text-muted">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;