import React, { useState } from 'react';
import { Route } from '../types';
import CalculatorCard from '../components/CalculatorCard';
import ArticleCard from '../components/ArticleCard';
import { LEARN_ARTICLES } from '../data/articles';
import {
  TrendingUp,
  Percent,
  Wallet,
  Coins,
  Receipt,
  FileSpreadsheet,
  ArrowRight,
  BookOpen,
  Briefcase,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface HomeProps {
  onNavigate: (path: Route) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const calculators = [
    {
      title: 'SIP Calculator',
      description: 'Find out how much your monthly mutual fund investments will accumulate over time with compound returns.',
      path: '/calculators/sip' as Route,
      icon: TrendingUp,
      colorClass: 'bg-emerald-600 shadow-emerald-500/10',
    },
    {
      title: 'EMI Calculator',
      description: 'Plan your home, car, or personal loan monthly repayments and preview full amortization interest details.',
      path: '/calculators/emi' as Route,
      icon: Wallet,
      colorClass: 'bg-amber-600 shadow-amber-500/10',
    },
    {
      title: 'Income Tax Calculator',
      description: 'Compare old vs. new tax regimes revised for FY 2024-25 (Budget 2024) with simple salary & investment inputs.',
      path: '/calculators/income-tax' as Route,
      icon: Receipt,
      colorClass: 'bg-indigo-650 bg-indigo-600 shadow-indigo-500/10',
    },
    {
      title: 'Fixed Deposit Calculator',
      description: 'Calculate maturity values and quarterly compound growth of traditional fixed deposits.',
      path: '/calculators/fd' as Route,
      icon: Coins,
      colorClass: 'bg-rose-600 shadow-rose-500/10',
    },
    {
      title: 'CAGR Calculator',
      description: 'Determine the Compound Annual Growth Rate of your long-term equity or mutual fund investments.',
      path: '/calculators/cagr' as Route,
      icon: FileSpreadsheet,
      colorClass: 'bg-sky-605 bg-sky-600 shadow-sky-500/10',
    },
  ];

  return (
    <div className="font-sans min-h-screen bg-brand-bg text-white">
      {/* Hero Header Area */}
      <section className="relative overflow-hidden bg-brand-bg border-b border-brand-border/60 pt-20 sm:pt-28 pb-20">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-brand-accent/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-brand-accent/3 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2.5 bg-brand-accent/10 px-4.5 py-2 rounded-full mb-8 border border-brand-accent/20 text-brand-accent">
            <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
            <span className="text-xs font-bold font-mono tracking-wider uppercase">Advanced Planning Algorithms</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans max-w-4xl mx-auto">
            Democratizing Compound Calculations for Indian Investors
          </h1>
          <p className="text-lg text-brand-text-secondary mt-6 max-w-2xl mx-auto leading-relaxed font-sans">
            Verify investment returns with absolute numerical precision. Track debt timelines, analyze compound curves, and compare income taxation regimes dynamically.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <button
              onClick={() => {
                const element = document.getElementById('calc-grid');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-brand-accent hover:bg-brand-accent/90 focus:ring-2 focus:ring-brand-accent/30 text-brand-bg font-bold text-sm px-8 py-3.5 rounded-2xl shadow-xl shadow-brand-accent/10 transition-all hover:-translate-y-0.5 cursor-pointer min-h-[44px]"
            >
              Explore Calculators
            </button>
            <button
              onClick={() => onNavigate('/learn')}
              className="bg-white/5 hover:bg-white/10 focus:ring-2 focus:ring-white/20 text-white font-bold text-sm px-8 py-3.5 rounded-2xl transition-all border border-brand-border cursor-pointer min-h-[44px]"
            >
              Read Education Hub
            </button>
          </div>
        </div>
      </section>

      {/* Calculators Grid Section */}
      <section id="calc-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-left">
        <div className="mb-12">
          <span className="text-xs font-bold text-brand-accent uppercase tracking-widest font-mono">Verify The Math</span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white mt-2">
            Select a Mathematical Calculator
          </h2>
          <p className="text-base text-brand-text-secondary mt-2 max-w-3xl leading-relaxed">
            Engineered using regulatory tax schedules, banking compounding matrices, and capital standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculators.map((calc, i) => (
            <div key={i} className="h-full">
              <CalculatorCard
                title={calc.title}
                description={calc.description}
                path={calc.path}
                icon={calc.icon}
                colorClass={calc.colorClass}
                onNavigate={onNavigate}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="bg-brand-panel/40 border-t border-b border-brand-border py-20 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-brand-accent uppercase tracking-widest font-mono">Financial Literacy</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-white mt-2">
                Deep-Dive Advisory Articles
              </h2>
              <p className="text-base text-brand-text-secondary mt-2 max-w-3xl leading-relaxed">
                Equip yourself with compounding methodologies, inflation logic, and rule comparisons.
              </p>
            </div>
            
            <button
              onClick={() => onNavigate('/learn')}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-brand-accent hover:text-white transition-colors cursor-pointer min-h-[44px]"
            >
              See All Articles
              <ChevronRight className="h-4.5 w-4.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {LEARN_ARTICLES.map((article) => (
              <div key={article.id}>
                <ArticleCard article={article} onNavigate={onNavigate} />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <button
              onClick={() => onNavigate('/learn')}
              className="bg-white/5 border border-brand-border text-white hover:bg-white/10 font-bold text-sm px-6 py-3.5 rounded-2xl w-full transition cursor-pointer min-h-[44px]"
            >
              See All Articles
            </button>
          </div>
        </div>
      </section>

      {/* Trust & Transparency Feature Column */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-left">
        <div className="bg-gradient-to-br from-brand-panel to-[#040C1D] p-8 sm:p-14 rounded-3xl text-white relative overflow-hidden shadow-2xl border border-brand-border/60">
          <div className="absolute top-0 right-0 h-56 w-56 rounded-full bg-brand-accent/10 blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl relative z-10">
            <span className="text-xs font-bold text-brand-accent uppercase tracking-widest font-mono">Our Operational Mandate</span>
            <h2 className="text-3xl font-extrabold tracking-tight mt-2 leading-tight">
              Absolute Algorithmic Truth. No Upfront Fee Walls.
            </h2>
            <p className="text-base text-brand-text-secondary leading-relaxed mt-4">
              Unlike commercial product portals, FinTrust India does not partner with high-commission agents. We provide unshaded calculations so that you can verify fund, taxation, or mortgage payments based purely on facts and truth.
            </p>
            <div className="mt-10 flex flex-wrap gap-8 text-xs text-brand-text-secondary font-mono">
              <div className="flex items-center gap-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-brand-accent shrink-0" />
                <span className="font-semibold text-white">100% Non-Commercial</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-brand-accent shrink-0" />
                <span className="font-semibold text-white">SEBI-aligned Disclaimers</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-brand-accent shrink-0" />
                <span className="font-semibold text-white">Modern High-Precision Math</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
