import React from 'react';
import { Route } from '../types';
import { Mail, Phone, MapPin, Percent, HelpCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: Route) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-panel text-brand-text-secondary border-t border-brand-border pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-brand-accent/10 border border-brand-accent/25 text-brand-accent p-2.5 rounded-xl flex items-center justify-center h-11 w-11 shadow-lg shadow-brand-accent/5">
                <Percent className="h-5 w-5" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                FinTrust<span className="text-brand-accent">.</span>
              </span>
            </div>
            <p className="text-sm text-brand-text-secondary leading-relaxed font-sans pt-2">
              India's premier independent planning portal. Our mission is to democratize compound algorithms with absolute truth, precision, and zero fee markup.
            </p>
          </div>

          {/* Quick Calculators */}
          <div>
            <h4 className="text-xs font-bold text-brand-accent uppercase tracking-widest font-mono mb-5">Calculators</h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('/calculators/sip')} 
                  className="hover:text-brand-accent text-brand-text-secondary font-medium transition-colors text-left focus:outline-none focus:ring-1 focus:ring-brand-accent/30 rounded py-1 cursor-pointer"
                >
                  SIP Calculator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/calculators/emi')} 
                  className="hover:text-brand-accent text-brand-text-secondary font-medium transition-colors text-left focus:outline-none focus:ring-1 focus:ring-brand-accent/30 rounded py-1 cursor-pointer"
                >
                  EMI Calculator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/calculators/income-tax')} 
                  className="hover:text-brand-accent text-brand-text-secondary font-medium transition-colors text-left focus:outline-none focus:ring-1 focus:ring-brand-accent/30 rounded py-1 cursor-pointer"
                >
                  Income Tax Calculator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/calculators/fd')} 
                  className="hover:text-brand-accent text-brand-text-secondary font-medium transition-colors text-left focus:outline-none focus:ring-1 focus:ring-brand-accent/30 rounded py-1 cursor-pointer"
                >
                  FD Calculator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/calculators/cagr')} 
                  className="hover:text-brand-accent text-brand-text-secondary font-medium transition-colors text-left focus:outline-none focus:ring-1 focus:ring-brand-accent/30 rounded py-1 cursor-pointer"
                >
                  CAGR Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Useful resources */}
          <div>
            <h4 className="text-xs font-bold text-brand-accent uppercase tracking-widest font-mono mb-5">Articles & Learn</h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('/learn')} 
                  className="hover:text-brand-accent text-brand-text-secondary font-medium transition-colors text-left focus:outline-none focus:ring-1 focus:ring-brand-accent/30 rounded py-1 cursor-pointer"
                >
                  Learn Hub
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/learn/sip-vs-fd')} 
                  className="hover:text-brand-accent text-brand-text-secondary font-medium transition-colors text-left focus:outline-none focus:ring-1 focus:ring-brand-accent/30 rounded py-1 cursor-pointer text-xs"
                >
                  SIP vs Fixed Deposit (FD)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/learn/how-much-sip-for-1-crore')} 
                  className="hover:text-brand-accent text-brand-text-secondary font-medium transition-colors text-left focus:outline-none focus:ring-1 focus:ring-brand-accent/30 rounded py-1 cursor-pointer text-xs"
                >
                  How Much to Reach ₹1 Crore?
                </button>
              </li>
            </ul>
          </div>

          {/* Legal/Regulatory details */}
          <div>
            <h4 className="text-xs font-bold text-brand-accent uppercase tracking-widest font-mono mb-5">Contact & Location</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4.5 w-4.5 mt-0.5 text-brand-accent shrink-0" />
                <span className="text-brand-text-secondary">Navi Mumbai, Maharashtra, 400703</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4.5 w-4.5 text-brand-accent shrink-0" />
                <a href="mailto:support@fintrust.in" className="hover:text-brand-accent text-brand-text-secondary transition-colors focus:outline-none focus:ring-1 focus:ring-brand-accent/30 rounded px-1">support@fintrust.in</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4.5 w-4.5 text-brand-accent shrink-0" />
                <span className="text-brand-text-secondary">+91 22 4598-1000</span>
              </li>
            </ul>
          </div>
        </div>

        {/* SEBI Investment Disclaimer */}
        <div className="border-t border-brand-border pt-8 mt-8 text-xs text-brand-text-muted leading-relaxed space-y-3.5">
          <p className="font-bold text-brand-text-secondary uppercase tracking-wider text-[11px] font-mono flex items-center gap-2">
            <HelpCircle className="h-4.5 w-4.5 text-brand-accent" /> SEBI & Financial Disclaimer:
          </p>
          <p>
            Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing. Historical performance benchmarks do not guarantee future returns. The calculators and results displayed are for illustration purposes only and do not constitute formal investment advice or a solicitation for any financial instruments.
          </p>
          <p>
            Tax laws are subject to changes. The figures calculated for old and new regimes represent general calculations under current provisions of the Income Tax Act, 1961. Consult an authenticated Tax Advisor or Registered Financial Practitioner for personalized wealth calculations.
          </p>
          <div className="border-t border-brand-border/60 pt-6 mt-6 flex flex-col sm:flex-row justify-between items-center text-brand-text-muted font-mono text-xs gap-3">
            <span>© {currentYear} FinTrust India Private Ltd. All rights reserved.</span>
            <span className="text-[10px] text-brand-accent font-bold">Made in India with Precision Engineering</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
