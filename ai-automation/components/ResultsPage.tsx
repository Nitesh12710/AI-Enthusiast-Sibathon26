'use client';

import { useState } from 'react';
import { Download, RotateCcw, TrendingUp, Clock, DollarSign, Zap, AlertTriangle, CheckCircle, ChevronRight, Share2 } from 'lucide-react';
import WorkflowVisualization from './WorkflowVisualization';
import ROICharts from './ROICharts';
import toast from 'react-hot-toast';

interface ResultsPageProps {
  results: any;
  onReset: () => void;
}

export default function ResultsPage({ results, onReset }: ResultsPageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'workflow' | 'roi'>('overview');

  const downloadN8nWorkflow = () => {
    const blob = new Blob([JSON.stringify(results.n8nWorkflow, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'n8n-workflow.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Workflow downloaded!');
  };

  const downloadDocumentation = async () => {
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(results),
      });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'automation-report.txt';
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Report downloaded!');
    } catch (error) {
      toast.error('Download failed');
    }
  };

  const shareResults = async () => {
    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(results),
      });
      const data = await response.json();
      await navigator.clipboard.writeText(window.location.origin + '/share/' + data.id);
      toast.success('Share link copied to clipboard!');
    } catch {
      toast.error('Sharing failed');
    }
  };

  const score = results.analysis?.automation_score || 0;
  const riskColor = results.analysis?.risk_level === 'Low' ? 'text-green-600 dark:text-green-400' :
    results.analysis?.risk_level === 'Medium' ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400';
  const riskBg = results.analysis?.risk_level === 'Low' ? 'bg-green-50/80 dark:bg-green-500/10 border-green-200/50 dark:border-green-500/20' :
    results.analysis?.risk_level === 'Medium' ? 'bg-amber-50/80 dark:bg-amber-500/10 border-amber-200/50 dark:border-amber-500/20' : 'bg-red-50/80 dark:bg-red-500/10 border-red-200/50 dark:border-red-500/20';

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'workflow', label: 'Workflow' },
    { id: 'roi', label: 'ROI Analysis' },
  ] as const;

  return (
    <div className="max-w-5xl mx-auto animate-slide-up">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">Analysis Results</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">{results.businessData?.name} • {results.businessData?.industry}</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={shareResults} className="btn-secondary !py-2.5 !px-4 !text-sm">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button onClick={onReset} className="btn-secondary !py-2.5 !px-4 !text-sm">
            <RotateCcw className="w-4 h-4" /> New Analysis
          </button>
        </div>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 stagger-children">
        <div className="glass-card !p-5">
          <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs font-semibold mb-3 uppercase tracking-wider">
            <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-500/15 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            </div>
            Score
          </div>
          <div className="text-4xl font-extrabold gradient-text">{score}<span className="text-lg text-[var(--text-muted)]">/100</span></div>
        </div>
        <div className="glass-card !p-5">
          <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs font-semibold mb-3 uppercase tracking-wider">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>
            Hours Saved
          </div>
          <div className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">{results.roi?.hours_saved_per_month || 0}<span className="text-lg text-[var(--text-muted)]">h/mo</span></div>
        </div>
        <div className="glass-card !p-5">
          <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs font-semibold mb-3 uppercase tracking-wider">
            <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-500/15 flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            </div>
            Monthly
          </div>
          <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">${(results.roi?.monthly_savings || 0).toLocaleString()}</div>
        </div>
        <div className="glass-card !p-5">
          <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs font-semibold mb-3 uppercase tracking-wider">
            <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-500/15 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            </div>
            Annual
          </div>
          <div className="text-4xl font-extrabold text-purple-600 dark:text-purple-400">${(results.roi?.annual_savings || 0).toLocaleString()}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass-card overflow-hidden">
        <div className="flex border-b border-[var(--border)]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-6 py-4 text-sm font-semibold transition-all duration-300 relative ${
                activeTab === tab.id
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[3px] rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></span>
              )}
            </button>
          ))}
        </div>

        <div className="p-6 md:p-8">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-slide-up">
              {/* Risk Level */}
              <div className={`flex items-center gap-3 p-5 rounded-2xl border ${riskBg}`}>
                {results.analysis?.risk_level === 'Low' ? <CheckCircle className={`w-5 h-5 ${riskColor}`} /> : <AlertTriangle className={`w-5 h-5 ${riskColor}`} />}
                <span className={`font-semibold ${riskColor}`}>Risk Level: {results.analysis?.risk_level}</span>
              </div>

              {/* Triggers */}
              <div>
                <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">Detected Triggers</h3>
                <div className="flex flex-wrap gap-2">
                  {results.analysis?.triggers?.map((trigger: string, i: number) => (
                    <span key={i} className="px-4 py-2 rounded-xl bg-indigo-50/80 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300 text-sm font-medium border border-indigo-100 dark:border-indigo-500/20">
                      {trigger}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div>
                <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">Automation Steps</h3>
                <div className="space-y-3 stagger-children">
                  {results.analysis?.actions?.map((action: string, i: number) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all duration-300">
                      <span className="flex-shrink-0 w-8 h-8 rounded-xl gradient-bg text-white flex items-center justify-center text-xs font-bold">{i + 1}</span>
                      <span className="text-sm text-[var(--text-primary)] font-medium">{action}</span>
                      {i < (results.analysis?.actions?.length || 0) - 1 && <ChevronRight className="w-4 h-4 text-[var(--text-muted)] ml-auto" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Tools */}
              <div>
                <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">Recommended Tools</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 stagger-children">
                  {results.analysis?.recommended_tools?.map((tool: string, i: number) => (
                    <div key={i} className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)] text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all duration-300 text-center">
                      {tool}
                    </div>
                  ))}
                </div>
              </div>

              {/* Implementation Notes */}
              {results.analysis?.implementation_notes && (
                <div>
                  <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">Implementation Notes</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-secondary)] p-5 rounded-2xl border border-[var(--border)]">
                    {results.analysis.implementation_notes}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* WORKFLOW TAB */}
          {activeTab === 'workflow' && (
            <div className="animate-slide-up">
              <WorkflowVisualization workflow={results.n8nWorkflow} />
            </div>
          )}

          {/* ROI TAB */}
          {activeTab === 'roi' && (
            <div className="animate-slide-up">
              <ROICharts roi={results.roi} />
            </div>
          )}
        </div>
      </div>

      {/* Download Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button onClick={downloadN8nWorkflow} className="btn-primary flex-1">
          <Download className="w-4 h-4" /> Download n8n Workflow
        </button>
        <button onClick={downloadDocumentation} className="btn-secondary flex-1">
          <Download className="w-4 h-4" /> Download Report
        </button>
      </div>
    </div>
  );
}
