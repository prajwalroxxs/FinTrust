import React from 'react';
import { formatRupee } from '../utils/format';

interface ResultItem {
  label: string;
  value: number;
  isCurrency?: boolean;
  textColorClass?: string;
  footnote?: string;
}

interface ResultCardProps {
  title: string;
  items: ResultItem[];
  highlightedIndex?: number;
  badge?: string;
}

export default function ResultCard({
  title,
  items,
  highlightedIndex = -1,
  badge,
}: ResultCardProps) {
  return (
    <div className="bg-brand-panel border border-brand-border rounded-3xl p-7 shadow-2xl flex flex-col relative overflow-hidden">
      {badge && (
        <span className="absolute top-5 right-5 bg-brand-accent/10 text-brand-accent text-[10px] font-bold font-mono tracking-wider uppercase px-2.5 py-1 rounded-lg border border-brand-accent/25 shadow-sm">
          {badge}
        </span>
      )}
      
      <h3 className="text-xs font-bold text-brand-text-muted font-mono uppercase tracking-widest border-b border-brand-border/60 pb-3 mb-5 text-left">
        {title}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 text-left">
        {items.map((item, idx) => {
          const isHighlighted = idx === highlightedIndex;
          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl transition-all ${
                isHighlighted
                  ? 'bg-brand-accent/10 border border-brand-accent/25 shadow-lg shadow-brand-accent/5'
                  : 'bg-white/5 border border-transparent'
              }`}
            >
              <span className="block text-xs font-bold text-brand-text-secondary uppercase tracking-wider mb-1">
                {item.label}
              </span>
              <span
                className={`block text-xl sm:text-2xl font-extrabold tracking-tight ${
                  isHighlighted ? 'text-brand-accent' : 'text-white'
                }`}
              >
                {item.isCurrency !== false ? formatRupee(item.value) : item.value}
              </span>
              {item.footnote && (
                <span className="block text-[11px] text-brand-text-muted font-bold font-mono mt-1">
                  {item.footnote}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
