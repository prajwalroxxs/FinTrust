import React, { useState } from 'react';
import { Route } from '../types';
import { LEARN_ARTICLES } from '../data/articles';
import { ChevronLeft, Calendar, Clock, Bookmark, Share2, ArrowLeft, Check } from 'lucide-react';

interface ArticleViewProps {
  slug: string;
  onNavigate: (path: Route) => void;
}

export default function ArticleView({ slug, onNavigate }: ArticleViewProps) {
  const [copied, setCopied] = useState(false);
  const article = LEARN_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-8 text-center bg-brand-bg font-sans text-white">
        <div className="bg-brand-panel border border-brand-border p-8 rounded-3xl max-w-sm shadow-2xl space-y-4">
          <h2 className="text-xl font-extrabold text-white">Advisory Not Found</h2>
          <p className="text-xs text-brand-text-muted leading-relaxed">The article you requested could not be retrieved from our local indexing database.</p>
          <button
            onClick={() => onNavigate('/learn')}
            className="w-full py-3 bg-brand-accent text-brand-bg font-bold text-sm rounded-xl hover:bg-white hover:text-brand-bg transition cursor-pointer min-h-[44px]"
          >
            Return to Education Hub
          </button>
        </div>
      </div>
    );
  }

  const categoryColors: Record<string, string> = {
    Investment: 'bg-brand-accent/10 text-brand-accent border-brand-accent/20',
    Taxation: 'bg-amber-400/10 text-amber-300 border-amber-400/20',
    Loans: 'bg-rose-400/10 text-rose-300 border-rose-400/20',
    Planning: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="font-sans min-h-screen bg-brand-bg pb-20 text-left text-white">
      {/* Top action details */}
      <div className="bg-brand-panel border-b border-brand-border py-4.5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <button
            id="back-learn-btn"
            onClick={() => onNavigate('/learn')}
            className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-brand-text-secondary hover:text-brand-accent cursor-pointer px-4.5 py-2.5 min-h-[44px] bg-white/5 hover:bg-white/10 rounded-2xl border border-brand-border transition-all"
          >
            <ChevronLeft className="h-4.5 w-4.5" />
            Learn Columns
          </button>
          
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-brand-text-secondary hover:text-brand-accent cursor-pointer px-4.5 py-2.5 min-h-[44px]"
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </button>
        </div>
      </div>

      {/* Main Column */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <article className="bg-brand-panel border border-brand-border rounded-[32px] p-7 sm:p-10 md:p-12 shadow-2xl font-sans relative">
          
          {/* Category Pill */}
          <div className="mb-6 flex gap-2.5 flex-wrap items-center">
            <span className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border uppercase tracking-wider ${categoryColors[article.category] || 'bg-white/5 border-white/5'}`}>
              {article.category}
            </span>
            {article.tags.map((tag) => (
              <span key={tag} className="text-xs text-brand-text-muted font-mono">
                #{tag}
              </span>
            ))}
          </div>

          {/* Primary Header */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight font-sans">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed mb-6 font-bold">
            {article.summary}
          </p>

          {/* Metas info */}
          <div className="flex items-center gap-6 text-xs text-brand-text-muted font-mono border-b border-t border-brand-border py-4 mb-8">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-brand-accent" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-brand-accent" />
              {article.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <Bookmark className="h-4 w-4 text-brand-accent" />
              AUTHORED OPINION
            </span>
          </div>

          {/* Article Editorial Rich Content, styled robustly via selectors */}
          <div 
            className="text-base leading-relaxed text-brand-text-secondary font-sans
              [&_h2]:text-white [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:border-l-[4px] [&_h2]:border-brand-accent [&_h2]:pl-4 [&_h2]:mt-10 [&_h2]:mb-4
              [&_h3]:text-white [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-3
              [&_p]:mb-5 [&_p]:leading-relaxed
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ul]:text-brand-text-secondary
              [&_li]:mb-2
              [&_strong]:text-white [&_strong]:font-bold"
            dangerouslySetInnerHTML={{ __html: article.content }} 
          />

          {/* Share Block Footer */}
          <div className="border-t border-brand-border pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-brand-text-muted font-bold uppercase">
            <span>Verified Investment Columns - FinTrust India</span>
            <button
              onClick={handleShare}
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-brand-border hover:border-brand-accent/20 rounded-2xl flex items-center gap-2 transition text-brand-accent hover:text-white group cursor-pointer min-h-[44px]"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-brand-accent animate-bounce" />
                  Copied Article link
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4 transition-transform group-hover:rotate-12" />
                  Share Column
                </>
              )}
            </button>
          </div>
        </article>
      </main>
    </div>
  );
}
