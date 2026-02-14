'use client';

import { useState } from 'react';
import BusinessInputForm from '@/components/BusinessInputForm';
import ResultsPage from '@/components/ResultsPage';

export default function Home() {
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysisComplete = (results: any) => {
    setAnalysisResults(results);
  };

  const handleReset = () => {
    setAnalysisResults(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI Workflow Automation Platform
          </h1>
          <p className="text-xl text-gray-600">
            Transform your manual workflows into intelligent automation
          </p>
        </header>

        {!analysisResults ? (
          <BusinessInputForm 
            onAnalysisComplete={handleAnalysisComplete} 
            setIsLoading={setIsLoading}
          />
        ) : (
          <ResultsPage 
            results={analysisResults} 
            onReset={handleReset}
          />
        )}
      </div>
    </main>
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
