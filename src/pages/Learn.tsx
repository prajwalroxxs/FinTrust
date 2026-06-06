import React, { useState } from 'react';
import { Route } from '../types';
import SearchBar from '../components/SearchBar';
import ArticleCard from '../components/ArticleCard';
import { LEARN_ARTICLES } from '../data/articles';
import { GraduationCap, ArrowLeft, BookOpen } from 'lucide-react';

interface LearnProps {
  onNavigate: (path: Route) => void;
}

export default function Learn({ onNavigate }: LearnProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Investment' | 'Taxation' | 'Loans' | 'Planning'>('All');

  const categories: ('All' | 'Investment' | 'Taxation' | 'Loans' | 'Planning')[] = [
    'All',
    'Investment',
    'Taxation',
    'Loans',
    'Planning',
  ];

  // Filtering Logic
  const filteredArticles = LEARN_ARTICLES.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="font-sans min-h-screen bg-brand-bg pb-16 text-left text-white">
      {/* Editorial Breadcrumbs */}
      <div className="bg-brand-panel border-b border-brand-border py-4.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <nav className="flex items-center text-xs font-bold font-mono text-brand-text-secondary space-x-2">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-brand-accent transition-colors cursor-pointer py-1.5 min-h-[36px]"
            >
              HOME
            </button>
            <span className="text-brand-text-muted">/</span>
            <span className="text-white font-extrabold uppercase">EDUCATION HUB</span>
          </nav>

          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-brand-text-secondary hover:text-brand-accent cursor-pointer px-4.5 py-2.5 min-h-[44px] bg-white/5 hover:bg-white/10 rounded-2xl border border-brand-border transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Banner Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-brand-accent/10 text-brand-accent px-4.5 py-1.5 rounded-full mb-5 border border-brand-accent/25 shadow-sm shadow-brand-accent/5">
            <GraduationCap className="h-4.5 w-4.5 animate-pulse" />
            <span className="text-xs font-bold font-mono uppercase tracking-wider">Investor Literacy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            FinTrust India Education Hub
          </h1>
          <p className="text-base text-brand-text-secondary mt-4 leading-relaxed">
            Unpack modern compounding equations, explore wealth allocation concepts, and discover structured rules of tax schedules with absolute visual simplicity.
          </p>
        </div>

        {/* Searching & Categories filters bar */}
        <div className="space-y-8 mb-16">
          <SearchBar
            placeholder="Search financial columns, keywords, or topics..."
            value={searchQuery}
            onChange={setSearchQuery}
          />

          {/* Pill category selection */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`cat-${cat}-btn`}
                onClick={() => setSelectedCategory(cat)}
                className={`py-2.5 px-5 text-xs font-bold font-sans rounded-full border transition cursor-pointer min-h-[44px] flex items-center justify-center ${
                  selectedCategory === cat
                    ? 'bg-brand-accent/15 border-brand-accent text-brand-accent shadow-md shadow-brand-accent/5'
                    : 'bg-white/5 border-brand-border text-brand-text-secondary hover:border-brand-accent hover:text-white'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Article Grid Rendering */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:max-w-5xl lg:mx-auto">
            {filteredArticles.map((article) => (
              <div key={article.id}>
                <ArticleCard article={article} onNavigate={onNavigate} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-brand-panel border border-brand-border rounded-3xl max-w-xl mx-auto p-10 shadow-2xl">
            <BookOpen className="h-12 w-12 text-brand-text-muted mx-auto mb-4" />
            <span className="block text-lg font-bold text-white">
              No Advisory Columns Found
            </span>
            <span className="block text-sm text-brand-text-muted font-mono mt-1 px-4">
              "{searchQuery}" did not return any matching articles or categories.
            </span>
            <button
              id="clear-search-btn"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-6 text-sm font-bold text-brand-accent hover:text-white underline focus:outline-none cursor-pointer px-4.5 py-2.5 min-h-[44px]"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
