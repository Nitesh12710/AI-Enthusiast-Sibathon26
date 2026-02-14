'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import BusinessInputForm from '@/components/BusinessInputForm';
import ResultsPage from '@/components/ResultsPage';
import TemplatesLibrary from '@/components/TemplatesLibrary';
import ChatAssistant from '@/components/ChatAssistant';
import Dashboard from '@/components/Dashboard';
import { Zap } from 'lucide-react';
import toast from 'react-hot-toast';

function AppContent() {
  const [activeTab, setActiveTab] = useState('analyze');
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prefillData, setPrefillData] = useState<any>(null);

  const handleAnalysisComplete = (results: any) => {
    setAnalysisResults(results);
    toast.success('Analysis complete!');

    // Save to localStorage for dashboard
    try {
      const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
      const saved = JSON.parse(localStorage.getItem('saved_analyses') || '[]');
      saved.unshift({
        id,
        timestamp: new Date().toISOString(),
        businessName: results.businessData?.name || 'Unknown',
        industry: results.businessData?.industry || 'Unknown',
        score: results.analysis?.automation_score || 0,
        hoursSaved: results.roi?.hours_saved_per_month || 0,
        monthlySavings: results.roi?.monthly_savings || 0,
        annualSavings: results.roi?.annual_savings || 0,
      });
      localStorage.setItem('saved_analyses', JSON.stringify(saved.slice(0, 50)));
      localStorage.setItem(`analysis_${id}`, JSON.stringify(results));
    } catch {}
  };

  const handleReset = () => {
    setAnalysisResults(null);
  };

  const handleTemplateSelect = (formData: any) => {
    setPrefillData(formData);
    setActiveTab('analyze');
    toast.success('Template loaded! Click "Analyze" to process.');
  };

  const handleViewResult = (results: any) => {
    setAnalysisResults(results);
    setActiveTab('analyze');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-500 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-indigo-400/20 to-purple-500/20 blur-3xl animate-blob"></div>
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-400/15 to-cyan-500/15 blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 right-1/3 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-purple-400/15 to-pink-500/15 blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: activeTab === 'analyze' && !analysisResults ? 'center' : 'flex-start', padding: '40px 20px', width: '100%' }}>
          <div style={{ width: '100%', maxWidth: 1100 }}>
            {/* Hero - only on analyze tab before results */}
            {activeTab === 'analyze' && !analysisResults && (
              <div style={{ textAlign: 'center', marginBottom: 40 }} className="animate-slide-up">
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 14px',
                    borderRadius: 100,
                    background: 'var(--accent-light)',
                    border: '1px solid var(--border)',
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--accent)',
                    marginBottom: 20,
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }}></span>
                  AI-Powered Automation
                </div>
                <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16, letterSpacing: '-0.03em', lineHeight: 1.15 }}>
                  Automate your workflows
                  <br />
                  <span className="gradient-text">with AI intelligence</span>
                </h1>
                <p style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
                  Describe your manual process and get AI-generated n8n workflows, 
                  ROI analysis, and step-by-step implementation guides.
                </p>
              </div>
            )}

            {/* Tab Content */}
            <div key={activeTab + (analysisResults ? 'results' : 'form')} className="animate-slide-up">
              {activeTab === 'analyze' && (
                !analysisResults ? (
                  <BusinessInputForm
                    onAnalysisComplete={handleAnalysisComplete}
                    setIsLoading={setIsLoading}
                    isLoading={isLoading}
                    prefillData={prefillData}
                    key={prefillData ? JSON.stringify(prefillData) : 'default'}
                  />
                ) : (
                  <ResultsPage results={analysisResults} onReset={handleReset} />
                )
              )}

              {activeTab === 'templates' && (
                <TemplatesLibrary onSelectTemplate={handleTemplateSelect} />
              )}

              {activeTab === 'chat' && (
                <ChatAssistant />
              )}

              {activeTab === 'dashboard' && (
                <Dashboard onViewResult={handleViewResult} />
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid var(--border)', padding: '20px 0', marginTop: 'auto' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}>
              <div style={{ width: 20, height: 20, borderRadius: 5, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap style={{ width: 12, height: 12, color: 'white' }} />
              </div>
              AutoFlow AI
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <a href="https://github.com/Nitesh12710/AI-Enthusiast-Sibathon26" target="_blank" style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }}>GitHub</a>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Built for Sibathon 2026</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
