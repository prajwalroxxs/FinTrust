import React, { ComponentType } from 'react';
import { Route } from '../types';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface CalculatorCardProps {
  title: string;
  description: string;
  path: Route;
  icon: LucideIcon;
  colorClass: string;
  onNavigate: (path: Route) => void;
}

export default function CalculatorCard({
  title,
  description,
  path,
  icon: Icon,
  colorClass,
  onNavigate,
}: CalculatorCardProps) {
  return (
    <button
      onClick={() => onNavigate(path)}
      className="group w-full text-left bg-brand-panel border border-brand-border rounded-3xl p-7 hover:border-brand-accent/30 hover:shadow-2xl hover:shadow-brand-accent/5 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-accent/25 flex flex-col justify-between h-full cursor-pointer relative overflow-hidden"
    >
      <div>
        {/* Animated Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-brand-accent transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
        
        {/* Icon & Label */}
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3.5 rounded-2xl bg-brand-accent/10 border border-brand-accent/25 text-brand-accent shadow-lg shadow-brand-accent/5 flex items-center justify-center shrink-0">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-brand-accent transition-colors">
              {title}
            </h3>
            <span className="block text-[10px] font-mono tracking-wider text-brand-text-muted uppercase mt-0.5 font-bold">
              Precision Tool
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-brand-text-secondary leading-relaxed font-sans mt-3">
          {description}
        </p>
      </div>

      {/* Action Line */}
      <div className="pt-6 mt-6 border-t border-brand-border flex items-center justify-between text-xs font-bold text-brand-accent uppercase tracking-widest group-hover:text-white transition-colors">
        <span>Launch Calculator</span>
        <div className="bg-white/5 p-1.5 rounded-lg group-hover:translate-x-1 transition-transform">
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </button>
  );
}
