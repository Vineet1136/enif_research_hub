import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import Icon from 'components/AppIcon';

const AnalysisChart = ({ papers, mode }) => {
  // Prepare data for performance metrics comparison
  const performanceData = papers.map(paper => ({
    name: paper.title.split(':')[0].substring(0, 20) + '...',
    fullTitle: paper.title,
    accuracy: paper.metrics.accuracy,
    precision: paper.metrics.precision,
    recall: paper.metrics.recall,
    f1Score: paper.metrics.f1Score,
    citations: paper.citations,
    year: paper.year
  }));

  // Prepare radar chart data
  const radarData = papers.map(paper => ({
    paper: paper.title.split(':')[0].substring(0, 15) + '...',
    fullTitle: paper.title,
    accuracy: paper.metrics.accuracy,
    precision: paper.metrics.precision,
    recall: paper.metrics.recall,
    f1Score: paper.metrics.f1Score
  }));

  // Citation comparison data
  const citationData = papers.map(paper => ({
    name: paper.title.split(':')[0].substring(0, 20) + '...',
    fullTitle: paper.title,
    citations: paper.citations,
    year: paper.year,
    citationsPerYear: Math.round(paper.citations / (2024 - paper.year + 1))
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-text-primary mb-2">{data.fullTitle}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}${entry.dataKey.includes('citations') ? '' : '%'}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const colors = ['#2563EB', '#059669', '#D97706', '#DC2626'];

  return (
    <div className="bg-background border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Comparative Analysis Charts
        </h3>
        <div className="flex items-center space-x-2 text-sm text-text-muted">
          <Icon name="BarChart3" size={16} />
          <span>Visual comparison of key metrics</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics Bar Chart */}
        <div className="space-y-4">
          <h4 className="font-medium text-text-primary">Performance Metrics Comparison</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: '#64748B' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#64748B' }}
                  domain={[80, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="accuracy" fill="#2563EB" name="Accuracy" />
                <Bar dataKey="precision" fill="#059669" name="Precision" />
                <Bar dataKey="recall" fill="#D97706" name="Recall" />
                <Bar dataKey="f1Score" fill="#DC2626" name="F1 Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Chart for Overall Performance */}
        <div className="space-y-4">
          <h4 className="font-medium text-text-primary">Overall Performance Profile</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={[
                { metric: 'Accuracy', ...Object.fromEntries(papers.map((paper, i) => [paper.title.split(':')[0].substring(0, 10), paper.metrics.accuracy])) },
                { metric: 'Precision', ...Object.fromEntries(papers.map((paper, i) => [paper.title.split(':')[0].substring(0, 10), paper.metrics.precision])) },
                { metric: 'Recall', ...Object.fromEntries(papers.map((paper, i) => [paper.title.split(':')[0].substring(0, 10), paper.metrics.recall])) },
                { metric: 'F1 Score', ...Object.fromEntries(papers.map((paper, i) => [paper.title.split(':')[0].substring(0, 10), paper.metrics.f1Score])) }
              ]}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis 
                  dataKey="metric" 
                  tick={{ fontSize: 12, fill: '#64748B' }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[80, 100]} 
                  tick={{ fontSize: 10, fill: '#64748B' }}
                />
                {papers.map((paper, index) => (
                  <Radar
                    key={paper.id}
                    name={paper.title.split(':')[0].substring(0, 15)}
                    dataKey={paper.title.split(':')[0].substring(0, 10)}
                    stroke={colors[index % colors.length]}
                    fill={colors[index % colors.length]}
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                ))}
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Citation Impact Analysis */}
        <div className="space-y-4">
          <h4 className="font-medium text-text-primary">Citation Impact Analysis</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={citationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: '#64748B' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="citations" fill="#2563EB" name="Total Citations" />
                <Bar dataKey="citationsPerYear" fill="#059669" name="Citations/Year" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Research Timeline */}
        <div className="space-y-4">
          <h4 className="font-medium text-text-primary">Research Timeline & Impact</h4>
          <div className="space-y-3">
            {papers.sort((a, b) => a.year - b.year).map((paper, index) => (
              <div key={paper.id} className="flex items-center space-x-4 p-3 bg-surface rounded-lg">
                <div className="flex-shrink-0">
                  <div className={`w-3 h-3 rounded-full ${
                    index === 0 ? 'bg-primary' : 
                    index === 1 ? 'bg-success' : 
                    index === 2 ? 'bg-warning' : 'bg-error'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary line-clamp-1">
                    {paper.title}
                  </p>
                  <p className="text-xs text-text-muted">
                    {paper.year} • {paper.citations} citations • {paper.category}
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-sm font-medium text-text-primary">
                    {Math.round(paper.citations / (2024 - paper.year + 1))}
                  </p>
                  <p className="text-xs text-text-muted">cites/year</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistical Summary */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-medium text-text-primary mb-4">Statistical Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-surface rounded-lg">
            <p className="text-2xl font-bold text-primary">
              {Math.round(papers.reduce((sum, p) => sum + p.metrics.accuracy, 0) / papers.length)}%
            </p>
            <p className="text-sm text-text-muted">Avg Accuracy</p>
          </div>
          <div className="text-center p-3 bg-surface rounded-lg">
            <p className="text-2xl font-bold text-success">
              {Math.round(papers.reduce((sum, p) => sum + p.citations, 0) / papers.length)}
            </p>
            <p className="text-sm text-text-muted">Avg Citations</p>
          </div>
          <div className="text-center p-3 bg-surface rounded-lg">
            <p className="text-2xl font-bold text-warning">
              {Math.round(papers.reduce((sum, p) => sum + p.year, 0) / papers.length)}
            </p>
            <p className="text-sm text-text-muted">Avg Year</p>
          </div>
          <div className="text-center p-3 bg-surface rounded-lg">
            <p className="text-2xl font-bold text-error">
              {Math.round(papers.reduce((sum, p) => sum + p.metrics.f1Score, 0) / papers.length)}%
            </p>
            <p className="text-sm text-text-muted">Avg F1 Score</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisChart;