'use client';

import { useState } from 'react';
import { Building2, Factory, Wrench, Users, BarChart3, DollarSign, FileText, ArrowRight, ArrowLeft, Loader2, Sparkles } from 'lucide-react';

interface BusinessInputFormProps {
  onAnalysisComplete: (results: any) => void;
  setIsLoading: (loading: boolean) => void;
  isLoading: boolean;
  prefillData?: any;
}

export default function BusinessInputForm({ onAnalysisComplete, setIsLoading, isLoading, prefillData }: BusinessInputFormProps) {
  const [formData, setFormData] = useState({
    businessName: prefillData?.businessName || '',
    industry: prefillData?.industry || '',
    toolsUsed: prefillData?.toolsUsed || '',
    numberOfEmployees: prefillData?.numberOfEmployees || '',
    dailyTransactions: prefillData?.dailyTransactions || '',
    workflowDescription: prefillData?.workflowDescription || '',
    hourlyRate: prefillData?.hourlyRate || '50',
  });

  const [step, setStep] = useState(1);

  const industries = [
    'E-commerce', 'Healthcare', 'Finance', 'Education', 'Real Estate',
    'Manufacturing', 'Retail', 'Hospitality', 'Marketing', 'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const results = await response.json();
      if (results.error) {
        alert(results.error);
      } else {
        onAnalysisComplete(results);
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const canGoNext = step === 1
    ? formData.businessName && formData.industry && formData.toolsUsed
    : formData.numberOfEmployees && formData.dailyTransactions && formData.workflowDescription;

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 12,
    border: '1.5px solid var(--border)',
    background: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: 14,
    lineHeight: 1.5,
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: 'inherit',
  };

  const labelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--text-secondary)',
    marginBottom: 8,
  };

  const iconStyle: React.CSSProperties = { width: 15, height: 15, flexShrink: 0 };

  return (
    <div style={{ width: '100%', maxWidth: 580, margin: '0 auto' }} className="animate-slide-up">
      {/* Progress Steps */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            height: 40,
            padding: '0 16px',
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 600,
            background: step === 1 ? 'var(--accent-light)' : '#d1fae5',
            color: step === 1 ? 'var(--accent)' : '#059669',
            border: `1px solid ${step === 1 ? 'var(--border-hover)' : '#a7f3d0'}`,
          }}
        >
          <span style={{
            width: 24, height: 24, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700,
            background: step > 1 ? '#059669' : 'var(--accent)', color: 'white',
          }}>
            {step > 1 ? '✓' : '1'}
          </span>
          Business Info
        </div>
        <div style={{ width: 32, height: 1, background: 'var(--border)' }} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            height: 40,
            padding: '0 16px',
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 600,
            background: step === 2 ? 'var(--accent-light)' : 'transparent',
            color: step === 2 ? 'var(--accent)' : 'var(--text-muted)',
            border: step === 2 ? '1px solid var(--border-hover)' : '1px solid transparent',
          }}
        >
          <span style={{
            width: 24, height: 24, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700,
            background: step === 2 ? 'var(--accent)' : 'var(--bg-secondary)',
            color: step === 2 ? 'white' : 'var(--text-muted)',
            border: step === 2 ? 'none' : '1px solid var(--border)',
          }}>
            2
          </span>
          Workflow Details
        </div>
      </div>

      {/* Card */}
      <div
        style={{
          background: 'var(--bg-card)',
          borderRadius: 20,
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: 32 }}>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div>
                <div style={{ marginBottom: 28 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Tell us about your business</h2>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>We&apos;ll use this to tailor your automation recommendations</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {/* Business Name */}
                  <div>
                    <label htmlFor="businessName" style={labelStyle}>
                      <Building2 style={iconStyle} />
                      Business Name
                    </label>
                    <input
                      id="businessName"
                      type="text"
                      name="businessName"
                      required
                      value={formData.businessName}
                      onChange={handleChange}
                      style={inputStyle}
                      placeholder="e.g., TechCorp Solutions"
                      onFocus={(e) => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>

                  {/* Industry */}
                  <div>
                    <label htmlFor="industry" style={labelStyle}>
                      <Factory style={iconStyle} />
                      Industry
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      required
                      value={formData.industry}
                      onChange={handleChange}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      onFocus={(e) => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                    >
                      <option value="">Select your industry</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>

                  {/* Tools Used */}
                  <div>
                    <label htmlFor="toolsUsed" style={labelStyle}>
                      <Wrench style={iconStyle} />
                      Tools Currently Used
                    </label>
                    <input
                      id="toolsUsed"
                      type="text"
                      name="toolsUsed"
                      required
                      value={formData.toolsUsed}
                      onChange={handleChange}
                      style={inputStyle}
                      placeholder="e.g., WhatsApp, Google Sheets, Email, Shopify"
                      onFocus={(e) => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!canGoNext}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      height: 48,
                      borderRadius: 12,
                      background: canGoNext ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : '#cbd5e1',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: 14,
                      border: 'none',
                      cursor: canGoNext ? 'pointer' : 'not-allowed',
                      marginTop: 8,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span>Continue</span>
                    <ArrowRight style={{ width: 16, height: 16 }} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 28 }}>
                  <div>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Workflow details</h2>
                    <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>Describe what you want to automate</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      height: 36,
                      padding: '0 12px',
                      borderRadius: 8,
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      fontWeight: 500,
                      fontSize: 13,
                      border: '1.5px solid var(--border)',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  >
                    <ArrowLeft style={{ width: 14, height: 14 }} />
                    <span>Back</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {/* Two Column */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label htmlFor="numberOfEmployees" style={labelStyle}>
                        <Users style={iconStyle} />
                        Employees
                      </label>
                      <input
                        id="numberOfEmployees"
                        type="number"
                        name="numberOfEmployees"
                        required
                        value={formData.numberOfEmployees}
                        onChange={handleChange}
                        style={inputStyle}
                        placeholder="10"
                        onFocus={(e) => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>
                    <div>
                      <label htmlFor="dailyTransactions" style={labelStyle}>
                        <BarChart3 style={iconStyle} />
                        Daily Transactions
                      </label>
                      <input
                        id="dailyTransactions"
                        type="number"
                        name="dailyTransactions"
                        required
                        value={formData.dailyTransactions}
                        onChange={handleChange}
                        style={inputStyle}
                        placeholder="50"
                        onFocus={(e) => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>
                  </div>

                  {/* Hourly Rate */}
                  <div>
                    <label htmlFor="hourlyRate" style={labelStyle}>
                      <DollarSign style={iconStyle} />
                      Average Hourly Rate (USD)
                    </label>
                    <input
                      id="hourlyRate"
                      type="number"
                      name="hourlyRate"
                      required
                      value={formData.hourlyRate}
                      onChange={handleChange}
                      style={inputStyle}
                      placeholder="50"
                      onFocus={(e) => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>

                  {/* Workflow Description */}
                  <div>
                    <label htmlFor="workflowDescription" style={labelStyle}>
                      <FileText style={iconStyle} />
                      Describe Your Manual Workflow
                    </label>
                    <textarea
                      id="workflowDescription"
                      name="workflowDescription"
                      required
                      value={formData.workflowDescription}
                      onChange={handleChange}
                      rows={4}
                      style={{ ...inputStyle, resize: 'none' as const }}
                      placeholder="e.g., Customer sends order via WhatsApp → We manually enter into Google Sheets → Create invoice → Send confirmation email → Update inventory..."
                      onFocus={(e) => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading || !canGoNext}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      height: 48,
                      borderRadius: 12,
                      background: (!isLoading && canGoNext) ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : '#cbd5e1',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: 14,
                      border: 'none',
                      cursor: (!isLoading && canGoNext) ? 'pointer' : 'not-allowed',
                      marginTop: 8,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} />
                        <span>Analyzing with AI...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles style={{ width: 16, height: 16 }} />
                        <span>Analyze &amp; Generate Automation</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
