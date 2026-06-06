import React from 'react';
import { LearnArticle, Route } from '../types';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

interface ArticleCardProps {
  article: LearnArticle;
  onNavigate: (path: Route) => void;
}

export default function ArticleCard({ article, onNavigate }: ArticleCardProps) {
  const categoryColors: Record<string, string> = {
    Investment: 'bg-brand-accent/10 text-brand-accent border-brand-accent/20',
    Taxation: 'bg-amber-400/10 text-amber-300 border-amber-400/20',
    Loans: 'bg-rose-400/10 text-rose-300 border-rose-400/20',
    Planning: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
  };

  return (
    <article className="group bg-brand-panel border border-brand-border rounded-3xl overflow-hidden hover:border-brand-accent/30 hover:shadow-2xl hover:shadow-brand-accent/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <div className="p-7 flex flex-col flex-grow">
        {/* Category & Tags */}
        <div className="flex flex-wrap items-center gap-2.5 mb-4.5">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border uppercase tracking-wider ${categoryColors[article.category] || 'bg-white/5 border-white/5'}`}>
            {article.category}
          </span>
          {article.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs text-brand-text-muted font-mono">
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 font-sans group-hover:text-brand-accent transition-colors line-clamp-2">
          {article.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-brand-text-secondary line-clamp-3 mb-6 flex-grow leading-relaxed">
          {article.summary}
        </p>

        {/* Meta & Button */}
        <div className="pt-4 border-t border-brand-border flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3.5 text-xs text-brand-text-muted font-mono">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-brand-accent" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-brand-accent" />
              {article.readTime}
            </span>
          </div>

          <button
            onClick={() => onNavigate(`/learn/${article.slug}` as Route)}
            className="flex items-center gap-1.5 text-xs font-bold text-brand-accent hover:text-white transition-colors group/btn cursor-pointer py-2 min-h-[44px]"
          >
            Read Article
            <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
}
