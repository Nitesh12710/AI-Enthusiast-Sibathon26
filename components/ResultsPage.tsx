'use client';

import { useState } from 'react';
import WorkflowVisualization from './WorkflowVisualization';

interface ResultsPageProps {
  results: any;
  onReset: () => void;
}

export default function ResultsPage({ results, onReset }: ResultsPageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'workflow' | 'roi'>('overview');

  const downloadN8nWorkflow = () => {
    const blob = new Blob([JSON.stringify(results.n8nWorkflow, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'n8n-workflow.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadDocumentation = async () => {
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(results),
      });

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'automation-documentation.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF generation failed:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Score */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Analysis Results</h2>
          <button
            onClick={onReset}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
          >
            New Analysis
          </button>
        </div>

        {/* Automation Score */}
        <div className="text-center mb-8">
          <div className="inline-block">
            <div className="relative w-48 h-48">
              <svg className="transform -rotate-90 w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${(results.analysis.automation_score / 100) * 553} 553`}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {results.analysis.automation_score}
                </span>
                <span className="text-gray-600 mt-2">Automation Score</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'overview'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('workflow')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'workflow'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Workflow
          </button>
          <button
            onClick={() => setActiveTab('roi')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'roi'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            ROI Analysis
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Triggers */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Detected Triggers</h3>
              <div className="flex flex-wrap gap-2">
                {results.analysis.triggers.map((trigger: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {trigger}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Automation Actions</h3>
              <div className="space-y-2">
                {results.analysis.actions.map((action: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Tools */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Recommended Tools</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {results.analysis.recommended_tools.map((tool: string, index: number) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200"
                  >
                    <span className="font-medium text-gray-800">{tool}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Level */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Risk Assessment</h3>
              <div className={`p-4 rounded-lg ${
                results.analysis.risk_level === 'Low' ? 'bg-green-50 border border-green-200' :
                results.analysis.risk_level === 'Medium' ? 'bg-yellow-50 border border-yellow-200' :
                'bg-red-50 border border-red-200'
              }`}>
                <span className={`font-semibold ${
                  results.analysis.risk_level === 'Low' ? 'text-green-800' :
                  results.analysis.risk_level === 'Medium' ? 'text-yellow-800' :
                  'text-red-800'
                }`}>
                  Risk Level: {results.analysis.risk_level}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'workflow' && (
          <div>
            <WorkflowVisualization workflow={results.n8nWorkflow} />
          </div>
        )}

        {activeTab === 'roi' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Hours Saved/Month</h4>
                <p className="text-3xl font-bold text-green-600">
                  {results.roi.hours_saved_per_month}h
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Monthly Savings</h4>
                <p className="text-3xl font-bold text-blue-600">
                  ${results.roi.monthly_savings.toLocaleString()}
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Annual Savings</h4>
                <p className="text-3xl font-bold text-purple-600">
                  ${results.roi.annual_savings.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Productivity Boost</h4>
              <p className="text-4xl font-bold text-orange-600">
                {results.roi.productivity_boost_percentage}%
              </p>
              <p className="text-gray-600 mt-2">increase in team efficiency</p>
            </div>
          </div>
        )}
      </div>

      {/* Download Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={downloadN8nWorkflow}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg"
        >
          Download n8n Workflow
        </button>
        <button
          onClick={downloadDocumentation}
          className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-4 px-6 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-105 shadow-lg"
        >
          Download Documentation
        </button>
      </div>
    </div>
  );
}
