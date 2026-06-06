import React, { ReactNode } from 'react';
import { Route } from '../types';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import FAQSection from './FAQSection';

interface FAQItem {
  question: string;
  answer: string;
}

interface CalculatorLayoutProps {
  title: string;
  description: string;
  onNavigate: (path: Route) => void;
  faqs: FAQItem[];
  children: ReactNode;
}

export default function CalculatorLayout({
  title,
  description,
  onNavigate,
  faqs,
  children,
}: CalculatorLayoutProps) {
  return (
    <div className="min-h-screen bg-brand-bg pb-16 font-sans text-white">
      {/* Top Breadcrumb & Back Action */}
      <div className="bg-brand-panel border-b border-brand-border py-4.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <nav className="flex items-center text-xs font-bold font-mono text-brand-text-secondary space-x-2 overflow-x-auto whitespace-nowrap py-1">
              <button 
                onClick={() => onNavigate('/')}
                className="hover:text-brand-accent transition-colors cursor-pointer py-1 min-h-[36px]"
              >
                HOME
              </button>
              <ChevronRight className="h-3 w-3 text-brand-text-muted" />
              <button
                onClick={() => onNavigate('/')}
                className="hover:text-brand-accent transition-colors cursor-pointer py-1 min-h-[36px]"
              >
                CALCULATORS
              </button>
              <ChevronRight className="h-3 w-3 text-brand-text-muted" />
              <span className="text-white font-extrabold">{title.toUpperCase()}</span>
            </nav>
            
            <button
              id="back-home-btn"
              onClick={() => onNavigate('/')}
              className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-brand-text-secondary hover:text-brand-accent cursor-pointer px-4.5 py-2.5 min-h-[44px] bg-white/5 hover:bg-white/10 rounded-2xl border border-brand-border transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-12 text-left border-l-4 border-brand-accent pl-5 py-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
            {title}
          </h1>
          <p className="text-base text-brand-text-secondary mt-2 max-w-4xl leading-relaxed">
            {description}
          </p>
        </div>

        {/* Content Panel (Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {children}
        </div>

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <div className="mt-20 text-left">
            <FAQSection faqs={faqs} />
          </div>
        )}
      </div>
    </div>
  );
}
