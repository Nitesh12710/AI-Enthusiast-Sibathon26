'use client';

import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

interface ROIChartsProps {
  roi: {
    hours_saved_per_month: number;
    monthly_savings: number;
    annual_savings: number;
    productivity_boost_percentage: number;
    automation_maturity_score: number;
    break_even_months: number;
  };
}

export default function ROICharts({ roi }: ROIChartsProps) {
  const savingsData = {
    labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'],
    datasets: [
      {
        label: 'Cumulative Savings ($)',
        data: Array.from({ length: 12 }, (_, i) => roi.monthly_savings * (i + 1)),
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderColor: '#6366f1',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const productivityData = {
    labels: ['Automated', 'Manual'],
    datasets: [
      {
        data: [roi.productivity_boost_percentage, 100 - roi.productivity_boost_percentage],
        backgroundColor: ['#6366f1', '#e2e8f0'],
        borderWidth: 0,
      },
    ],
  };

  const barOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (v: any) => '$' + Number(v).toLocaleString(), color: '#94a3b8' },
        grid: { color: 'rgba(148,163,184,0.1)' },
      },
      x: { ticks: { color: '#94a3b8' }, grid: { display: false } },
    },
  };

  const doughnutOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: { legend: { display: false } },
  };

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="grid grid-cols-3 gap-4 stagger-children">
        <div className="glass-card !p-5 !rounded-2xl !bg-emerald-50/60 dark:!bg-emerald-500/5 !border-emerald-200/50 dark:!border-emerald-500/15">
          <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-wider">Productivity Boost</p>
          <p className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-300">{roi.productivity_boost_percentage}%</p>
        </div>
        <div className="glass-card !p-5 !rounded-2xl !bg-blue-50/60 dark:!bg-blue-500/5 !border-blue-200/50 dark:!border-blue-500/15">
          <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wider">Maturity Score</p>
          <p className="text-3xl font-extrabold text-blue-700 dark:text-blue-300">{roi.automation_maturity_score}/100</p>
        </div>
        <div className="glass-card !p-5 !rounded-2xl !bg-amber-50/60 dark:!bg-amber-500/5 !border-amber-200/50 dark:!border-amber-500/15">
          <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-2 uppercase tracking-wider">Break Even</p>
          <p className="text-3xl font-extrabold text-amber-700 dark:text-amber-300">{roi.break_even_months} mo</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass-card !p-6 !rounded-2xl">
          <h3 className="text-sm font-bold text-[var(--text-primary)] mb-5 uppercase tracking-wider">12-Month Cumulative Savings</h3>
          <div className="h-64"><Bar data={savingsData} options={barOptions} /></div>
        </div>
        <div className="glass-card !p-6 !rounded-2xl">
          <h3 className="text-sm font-bold text-[var(--text-primary)] mb-5 uppercase tracking-wider">Automation Ratio</h3>
          <div className="h-48 flex items-center justify-center">
            <Doughnut data={productivityData} options={doughnutOptions} />
          </div>
          <div className="flex items-center justify-center gap-5 mt-5">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-indigo-500"></span>
              <span className="text-xs font-medium text-[var(--text-muted)]">Automated</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-gray-300 dark:bg-gray-600"></span>
              <span className="text-xs font-medium text-[var(--text-muted)]">Manual</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
