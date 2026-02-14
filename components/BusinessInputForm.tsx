'use client';

import { useState } from 'react';

interface BusinessInputFormProps {
  onAnalysisComplete: (results: any) => void;
  setIsLoading: (loading: boolean) => void;
}

export default function BusinessInputForm({ onAnalysisComplete, setIsLoading }: BusinessInputFormProps) {
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    toolsUsed: '',
    numberOfEmployees: '',
    dailyTransactions: '',
    workflowDescription: '',
    hourlyRate: '50',
  });

  const industries = [
    'E-commerce',
    'Healthcare',
    'Finance',
    'Education',
    'Real Estate',
    'Manufacturing',
    'Retail',
    'Hospitality',
    'Marketing',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const results = await response.json();
      onAnalysisComplete(results);
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Tell Us About Your Business</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Name *
          </label>
          <input
            type="text"
            name="businessName"
            required
            value={formData.businessName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your business name"
          />
        </div>

        {/* Industry */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry *
          </label>
          <select
            name="industry"
            required
            value={formData.industry}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select your industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        {/* Tools Used */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tools Currently Used *
          </label>
          <input
            type="text"
            name="toolsUsed"
            required
            value={formData.toolsUsed}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., WhatsApp, Google Sheets, Email, Shopify"
          />
        </div>

        {/* Number of Employees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Employees *
            </label>
            <input
              type="number"
              name="numberOfEmployees"
              required
              value={formData.numberOfEmployees}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Daily Transactions *
            </label>
            <input
              type="number"
              name="dailyTransactions"
              required
              value={formData.dailyTransactions}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="50"
            />
          </div>
        </div>

        {/* Hourly Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Average Employee Hourly Rate (USD) *
          </label>
          <input
            type="number"
            name="hourlyRate"
            required
            value={formData.hourlyRate}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="50"
          />
        </div>

        {/* Workflow Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe Your Manual Workflow *
          </label>
          <textarea
            name="workflowDescription"
            required
            value={formData.workflowDescription}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Example: Customer sends order via WhatsApp → We manually enter into Google Sheets → Create invoice in Excel → Send confirmation email → Update inventory..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
        >
          Analyze Workflow & Generate Automation
        </button>
      </form>
    </div>
  );
}
