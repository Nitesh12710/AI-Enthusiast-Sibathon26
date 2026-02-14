'use client';

import { useTheme } from './ThemeProvider';
import { Sun, Moon, Zap, BarChart3, Layout, MessageSquare, ClipboardList } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const { theme, toggleTheme } = useTheme();

  const tabs = [
    { id: 'analyze', label: 'Analyze', Icon: Zap },
    { id: 'templates', label: 'Templates', Icon: ClipboardList },
    { id: 'chat', label: 'AI Chat', Icon: MessageSquare },
    { id: 'dashboard', label: 'Dashboard', Icon: BarChart3 },
  ];

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 64,
          }}
        >
          {/* Logo */}
          <button
            onClick={() => setActiveTab('analyze')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
            aria-label="Home"
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(99,102,241,0.3)',
              }}
            >
              <Zap style={{ width: 18, height: 18, color: 'white' }} />
            </div>
            <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              AutoFlow<span className="gradient-text">AI</span>
            </span>
          </button>

          {/* Center Tabs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              background: 'var(--bg-secondary)',
              borderRadius: 14,
              padding: 4,
              border: '1px solid var(--border)',
            }}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const TabIcon = tab.Icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 7,
                    height: 40,
                    padding: '0 18px',
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 500,
                    whiteSpace: 'nowrap' as const,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: isActive ? 'var(--bg-card)' : 'transparent',
                    color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                    boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  }}
                >
                  <TabIcon style={{ width: 15, height: 15 }} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              transition: 'all 0.2s ease',
            }}
          >
            {theme === 'light' ? <Moon style={{ width: 16, height: 16 }} /> : <Sun style={{ width: 16, height: 16 }} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
