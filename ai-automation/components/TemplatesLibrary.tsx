'use client';

import { useState } from 'react';
import { Search, ArrowRight, Zap, ShoppingCart, Heart, GraduationCap, Building, DollarSign, Utensils, Megaphone } from 'lucide-react';

const TEMPLATES = [
  {
    id: 'ecommerce-order',
    title: 'E-commerce Order Processing',
    industry: 'E-commerce',
    icon: ShoppingCart,
    description: 'Automate order intake from website/WhatsApp, update inventory, generate invoice, send confirmation.',
    tools: 'Shopify, Google Sheets, Email, WhatsApp',
    timeSaved: '35 hrs/mo',
    formData: {
      businessName: 'My E-commerce Store',
      industry: 'E-commerce',
      toolsUsed: 'Shopify, Google Sheets, Email, WhatsApp',
      numberOfEmployees: '5',
      dailyTransactions: '50',
      workflowDescription: 'Customer places order on website or sends order via WhatsApp. We manually enter the order into Google Sheets, update inventory in Shopify, generate an invoice in Excel, send confirmation email to customer, and update shipping status.',
      hourlyRate: '40',
    },
  },
  {
    id: 'healthcare-appointment',
    title: 'Patient Appointment Management',
    industry: 'Healthcare',
    icon: Heart,
    description: 'Automate appointment scheduling, reminders, patient intake forms, and follow-up communications.',
    tools: 'Google Calendar, Email, SMS, Forms',
    timeSaved: '28 hrs/mo',
    formData: {
      businessName: 'My Healthcare Clinic',
      industry: 'Healthcare',
      toolsUsed: 'Google Calendar, Email, SMS, Google Forms',
      numberOfEmployees: '8',
      dailyTransactions: '30',
      workflowDescription: 'Patient calls or fills out web form to book appointment. Staff manually checks calendar availability, enters appointment, sends confirmation email, sends reminder SMS 24hrs before, prepares intake forms, and schedules follow-up after visit.',
      hourlyRate: '55',
    },
  },
  {
    id: 'finance-invoicing',
    title: 'Invoice & Payment Tracking',
    industry: 'Finance',
    icon: DollarSign,
    description: 'Automate invoice generation, payment tracking, overdue reminders, and financial reporting.',
    tools: 'QuickBooks, Stripe, Email, Google Sheets',
    timeSaved: '42 hrs/mo',
    formData: {
      businessName: 'My Finance Company',
      industry: 'Finance',
      toolsUsed: 'QuickBooks, Stripe, Email, Google Sheets',
      numberOfEmployees: '10',
      dailyTransactions: '40',
      workflowDescription: 'When project is completed, we manually create invoice in QuickBooks, send via email to client, track payment status in Google Sheets, send overdue reminders manually, reconcile payments with bank statements, and generate monthly financial reports.',
      hourlyRate: '75',
    },
  },
  {
    id: 'education-enrollment',
    title: 'Student Enrollment Pipeline',
    industry: 'Education',
    icon: GraduationCap,
    description: 'Automate student inquiry handling, enrollment processing, document collection, and onboarding.',
    tools: 'Google Forms, Email, Google Sheets, Drive',
    timeSaved: '30 hrs/mo',
    formData: {
      businessName: 'My Educational Institute',
      industry: 'Education',
      toolsUsed: 'Google Forms, Email, Google Sheets, Google Drive',
      numberOfEmployees: '6',
      dailyTransactions: '20',
      workflowDescription: 'Student fills inquiry form on website. Staff manually reviews and replies via email, sends enrollment documents, collects completed forms, enters data into spreadsheet, assigns to class, sends welcome email with schedule and materials.',
      hourlyRate: '35',
    },
  },
  {
    id: 'realestate-leads',
    title: 'Real Estate Lead Management',
    industry: 'Real Estate',
    icon: Building,
    description: 'Automate lead capture, property matching, follow-ups, and showing schedule management.',
    tools: 'CRM, WhatsApp, Email, Google Calendar',
    timeSaved: '38 hrs/mo',
    formData: {
      businessName: 'My Real Estate Agency',
      industry: 'Real Estate',
      toolsUsed: 'CRM, WhatsApp, Email, Google Calendar',
      numberOfEmployees: '7',
      dailyTransactions: '25',
      workflowDescription: 'Leads come from website, WhatsApp, and phone calls. Agent manually enters lead info into CRM, matches with available properties, sends property details via email/WhatsApp, schedules showings on calendar, follows up after showing, tracks deal progress.',
      hourlyRate: '50',
    },
  },
  {
    id: 'restaurant-orders',
    title: 'Restaurant Order Management',
    industry: 'Hospitality',
    icon: Utensils,
    description: 'Automate online order processing, kitchen notifications, delivery tracking, and customer feedback.',
    tools: 'POS, WhatsApp, Google Sheets, Email',
    timeSaved: '32 hrs/mo',
    formData: {
      businessName: 'My Restaurant',
      industry: 'Hospitality',
      toolsUsed: 'POS System, WhatsApp, Google Sheets, Email',
      numberOfEmployees: '12',
      dailyTransactions: '80',
      workflowDescription: 'Customer orders via WhatsApp or website. Staff manually enters order into POS, notifies kitchen, tracks preparation status, coordinates delivery, sends order confirmation to customer, collects feedback after delivery, updates daily sales spreadsheet.',
      hourlyRate: '30',
    },
  },
  {
    id: 'marketing-campaign',
    title: 'Marketing Campaign Automation',
    industry: 'Marketing',
    icon: Megaphone,
    description: 'Automate lead nurturing, email sequences, social posting, and campaign performance tracking.',
    tools: 'Mailchimp, Hootsuite, Google Analytics, CRM',
    timeSaved: '45 hrs/mo',
    formData: {
      businessName: 'My Marketing Agency',
      industry: 'Marketing',
      toolsUsed: 'Mailchimp, Hootsuite, Google Analytics, CRM',
      numberOfEmployees: '8',
      dailyTransactions: '35',
      workflowDescription: 'New lead signs up on landing page. We manually add to Mailchimp, tag based on interest, send welcome email sequence, schedule social media posts promoting content, track campaign metrics in spreadsheet, generate weekly performance reports for clients.',
      hourlyRate: '60',
    },
  },
];

interface TemplatesLibraryProps {
  onSelectTemplate: (formData: any) => void;
}

export default function TemplatesLibrary({ onSelectTemplate }: TemplatesLibraryProps) {
  const [search, setSearch] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');

  const industries = ['All', ...new Set(TEMPLATES.map(t => t.industry))];

  const filtered = TEMPLATES.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchIndustry = selectedIndustry === 'All' || t.industry === selectedIndustry;
    return matchSearch && matchIndustry;
  });

  return (
    <div className="max-w-5xl mx-auto animate-slide-up">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-2 tracking-tight">Workflow Templates</h1>
        <p className="text-sm text-[var(--text-muted)]">Pre-built automation templates by industry. Click to auto-fill and analyze.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates..."
            className="modern-input !pl-11"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                selectedIndustry === ind
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 shadow-sm'
                  : 'text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] border border-transparent hover:border-[var(--border)]'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 stagger-children">
        {filtered.map((template) => {
          const Icon = template.icon;
          return (
            <div
              key={template.id}
              className="glass-card !p-6 cursor-pointer group"
              onClick={() => onSelectTemplate(template.formData)}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 border border-indigo-100 dark:border-indigo-500/20">
                  <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-sm font-bold text-[var(--text-primary)] truncate">{template.title}</h3>
                    <ArrowRight className="w-4 h-4 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mb-4 line-clamp-2 leading-relaxed">{template.description}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] px-3 py-1 rounded-lg bg-indigo-50/80 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 font-semibold border border-indigo-100 dark:border-indigo-500/20">{template.industry}</span>
                    <span className="text-[11px] px-3 py-1 rounded-lg bg-emerald-50/80 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 font-semibold border border-emerald-100 dark:border-emerald-500/20">⏱ {template.timeSaved}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[var(--text-muted)] animate-fade-in">
          <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No templates found. Try a different search.</p>
        </div>
      )}
    </div>
  );
}
