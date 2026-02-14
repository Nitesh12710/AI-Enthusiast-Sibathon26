'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, MessageCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI Automation Consultant. Ask me anything about workflow automation, n8n, or how to optimize your business processes. For example:\n\n• "How can I automate my email marketing?"\n• "What\'s the best way to connect WhatsApp to Google Sheets?"\n• "Suggest automation for my restaurant"\n• "How does n8n compare to Zapier?"',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
        }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || 'Sorry, I couldn\'t process that. Please try again.' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please check your API key in .env.local and try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    'How to automate invoice processing?',
    'Best n8n workflows for e-commerce',
    'Connect WhatsApp to Google Sheets',
    'Automate customer onboarding',
  ];

  return (
    <div className="max-w-3xl mx-auto animate-slide-up">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-2 flex items-center gap-3 tracking-tight">
          <div className="w-10 h-10 rounded-2xl gradient-bg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          AI Chat Assistant
        </h1>
        <p className="text-sm text-[var(--text-muted)] ml-[52px]">Ask anything about workflow automation</p>
      </div>

      <div className="glass-card overflow-hidden flex flex-col animate-glow" style={{ height: '65vh' }}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 chat-scroll">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''} animate-slide-up`} style={{ animationDelay: `${i * 0.05}s` }}>
              {msg.role === 'assistant' && (
                <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0 shadow-md">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`max-w-[80%] px-5 py-3.5 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'rounded-2xl rounded-br-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'rounded-2xl rounded-bl-md bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border)]'
              }`}>
                <pre className="whitespace-pre-wrap font-sans">{msg.content}</pre>
              </div>
              {msg.role === 'user' && (
                <div className="w-9 h-9 rounded-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0 shadow-md">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border)] px-5 py-3.5 rounded-2xl rounded-bl-md">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                  <span className="text-xs text-[var(--text-muted)]">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="px-6 pb-4 flex flex-wrap gap-2 animate-slide-up delay-300">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => { setInput(q); }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400 border border-[var(--border)] hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all duration-300"
              >
                <MessageCircle className="w-3 h-3 inline mr-1.5" />
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-5 border-t border-[var(--border)] bg-[var(--bg-glass)] backdrop-blur-sm">
          <div className="flex items-end gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Ask about workflow automation..."
              className="modern-input !rounded-xl !py-3 flex-1"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="btn-primary !p-3 !rounded-xl flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
