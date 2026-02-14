'use client';

import { useState, useEffect } from 'react';
import { Clock, DollarSign, TrendingUp, Trash2, Eye, Zap, BarChart3 } from 'lucide-react';

interface SavedAnalysis {
  id: string;
  timestamp: string;
  businessName: string;
  industry: string;
  score: number;
  hoursSaved: number;
  monthlySavings: number;
  annualSavings: number;
}

interface DashboardProps {
  onViewResult: (results: any) => void;
}

export default function Dashboard({ onViewResult }: DashboardProps) {
  const [analyses, setAnalyses] = useState<SavedAnalysis[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('saved_analyses') || '[]');
    setAnalyses(saved);
  }, []);

  const deleteAnalysis = (id: string) => {
    const updated = analyses.filter(a => a.id !== id);
    setAnalyses(updated);
    localStorage.setItem('saved_analyses', JSON.stringify(updated));
  };

  const viewAnalysis = (id: string) => {
    const fullResults = JSON.parse(localStorage.getItem(`analysis_${id}`) || '{}');
    if (fullResults.analysis) {
      onViewResult(fullResults);
    }
  };

  // Aggregate stats
  const totalHoursSaved = analyses.reduce((s, a) => s + a.hoursSaved, 0);
  const totalMonthlySavings = analyses.reduce((s, a) => s + a.monthlySavings, 0);
  const totalAnnualSavings = analyses.reduce((s, a) => s + a.annualSavings, 0);
  const avgScore = analyses.length > 0 ? Math.round(analyses.reduce((s, a) => s + a.score, 0) / analyses.length) : 0;

  return (
    <div className="max-w-5xl mx-auto animate-slide-up">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-2 tracking-tight flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl gradient-bg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          Dashboard
        </h1>
        <p className="text-sm text-[var(--text-muted)] ml-[52px]">Track your automation analyses and ROI metrics</p>
      </div>

      {/* Aggregate Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 stagger-children">
        <div className="glass-card !p-5">
          <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs font-semibold mb-3 uppercase tracking-wider">
            <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-500/15 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            </div>
            Avg Score
          </div>
          <p className="text-4xl font-extrabold gradient-text">{avgScore}</p>
        </div>
        <div className="glass-card !p-5">
          <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs font-semibold mb-3 uppercase tracking-wider">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>
            Hours Saved
          </div>
          <p className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">{totalHoursSaved}h</p>
        </div>
        <div className="glass-card !p-5">
          <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs font-semibold mb-3 uppercase tracking-wider">
            <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-500/15 flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            </div>
            Monthly
          </div>
          <p className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">${totalMonthlySavings.toLocaleString()}</p>
        </div>
        <div className="glass-card !p-5">
          <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs font-semibold mb-3 uppercase tracking-wider">
            <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-500/15 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            </div>
            Annual
          </div>
          <p className="text-4xl font-extrabold text-purple-600 dark:text-purple-400">${totalAnnualSavings.toLocaleString()}</p>
        </div>
      </div>

      {/* Analyses List */}
      <div className="glass-card overflow-hidden">
        <div className="px-7 py-5 border-b border-[var(--border)]">
          <h2 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">Saved Analyses ({analyses.length})</h2>
        </div>

        {analyses.length === 0 ? (
          <div className="p-16 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-[var(--text-muted)] opacity-30" />
            </div>
            <p className="text-sm text-[var(--text-muted)]">No analyses yet. Run your first analysis to see it here!</p>
          </div>
        ) : (
          <div className="divide-y divide-[var(--border)]">
            {analyses.map((analysis, i) => (
              <div key={analysis.id} className="px-7 py-5 flex items-center justify-between hover:bg-[var(--bg-secondary)] transition-all duration-300 animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center border border-indigo-100 dark:border-indigo-500/20">
                    <span className="text-sm font-extrabold gradient-text">{analysis.score}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{analysis.businessName}</p>
                    <p className="text-xs text-[var(--text-muted)]">{analysis.industry} • {new Date(analysis.timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">${analysis.monthlySavings.toLocaleString()}/mo</p>
                    <p className="text-xs text-[var(--text-muted)]">{analysis.hoursSaved}h saved</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => viewAnalysis(analysis.id)}
                      className="p-2.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-[var(--text-muted)] hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteAnalysis(analysis.id)}
                      className="p-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-[var(--text-muted)] hover:text-red-600 dark:hover:text-red-400 transition-all duration-300"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
