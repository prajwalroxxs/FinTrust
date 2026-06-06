import React, { useState } from 'react';
import { FAQItem } from '../types';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQSectionProps {
  faqs: FAQItem[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // first item expanded by default

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-brand-panel border border-brand-border rounded-3xl p-7 sm:p-9 mt-12">
      <div className="flex items-center gap-3.5 mb-6 border-b border-brand-border pb-5">
        <div className="bg-brand-accent/10 text-brand-accent border border-brand-accent/25 p-2 rounded-xl">
          <HelpCircle className="h-5 w-5" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
          Frequently Answered Questions (FAQs)
        </h3>
      </div>

      <div className="divide-y divide-brand-border">
        {faqs.map((faq, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <div key={index} className="py-4.5 first:pt-0 last:pb-0">
              <button
                id={`faq-btn-${index}`}
                onClick={() => toggleExpand(index)}
                className="w-full flex justify-between items-center text-left py-3 min-h-[44px] font-bold text-white hover:text-brand-accent transition-colors focus:outline-none cursor-pointer group"
              >
                <span className="text-base font-bold group-hover:translate-x-0.5 transition-transform">{faq.question}</span>
                <span className="ml-4 flex-shrink-0 bg-white/5 p-2 rounded-lg text-brand-text-muted group-hover:text-brand-accent transition-colors">
                  {isExpanded ? (
                    <Minus className="h-4.5 w-4.5" />
                  ) : (
                    <Plus className="h-4.5 w-4.5" />
                  )}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isExpanded ? 'max-h-[500px] opacity-100 mt-3.5' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-sm text-brand-text-secondary leading-relaxed pl-1">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
