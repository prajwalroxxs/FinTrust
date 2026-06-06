import React, { useState } from 'react';
import { Route } from '../types';
import { Percent, Wallet, ChevronDown, Menu, X, Landmark, Calculator, BookOpen, AlertCircle } from 'lucide-react';

interface NavbarProps {
  currentPath: Route;
  onNavigate: (path: Route) => void;
}

export default function Navbar({ currentPath, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCalcsOpen, setIsCalcsOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' as Route, icon: Landmark },
    { label: 'Learn', path: '/learn' as Route, icon: BookOpen },
  ];

  const calculators = [
    { label: 'SIP Calculator', path: '/calculators/sip' as Route, description: 'Systematic Investment Plan growth calculator' },
    { label: 'EMI Calculator', path: '/calculators/emi' as Route, description: 'Loan payment & amortization schedule' },
    { label: 'Income Tax Calculator', path: '/calculators/income-tax' as Route, description: 'New vs Old tax regime comparison' },
    { label: 'FD Calculator', path: '/calculators/fd' as Route, description: 'Fixed deposit maturity compounding' },
    { label: 'CAGR Calculator', path: '/calculators/cagr' as Route, description: 'Compound annual growth rate' },
  ];

  const handleLinkClick = (path: Route) => {
    onNavigate(path);
    setIsOpen(false);
    setIsCalcsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-brand-bg/90 border-b border-brand-border/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              id="navbar-logo-btn"
              onClick={() => handleLinkClick('/')}
              className="flex items-center gap-3.5 hover:opacity-95 transition-opacity focus:outline-none focus:ring-2 focus:ring-brand-accent/20 rounded-xl p-1 cursor-pointer"
            >
              <div className="bg-brand-accent/10 text-brand-accent border border-brand-accent/25 p-2 rounded-xl flex items-center justify-center shadow-lg shadow-brand-accent/10 h-11 w-11 shrink-0">
                <Percent className="h-5.5 w-5.5" />
              </div>
              <div className="text-left">
                <span className="block text-2xl font-extrabold font-sans tracking-tight text-white leading-none">
                  FinTrust<span className="text-brand-accent">.</span>
                </span>
                <span className="block text-[10px] font-mono tracking-wider text-brand-text-muted uppercase leading-none mt-1.5">
                  India Financial Hub
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Actions */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Standard Nav Links */}
            <button
              id="nav-home-btn"
              onClick={() => handleLinkClick('/')}
              className={`px-4.5 py-2.5 min-h-[44px] rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center ${
                currentPath === '/' 
                  ? 'bg-brand-accent/10 border border-brand-accent/25 text-brand-accent' 
                  : 'text-brand-text-secondary hover:bg-white/5 hover:text-white'
              }`}
            >
              Home
            </button>

            {/* Calculators Dropdown Menu */}
            <div className="relative">
              <button
                id="nav-calculators-dropdown-btn"
                onClick={() => setIsCalcsOpen(!isCalcsOpen)}
                className={`px-4.5 py-2.5 min-h-[44px] rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentPath.startsWith('/calculators')
                    ? 'bg-brand-accent/10 border border-brand-accent/25 text-brand-accent'
                    : 'text-brand-text-secondary hover:bg-white/5 hover:text-white'
                }`}
              >
                Calculators
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isCalcsOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCalcsOpen && (
                <div className="absolute right-0 mt-3 w-84 bg-brand-panel border border-brand-border rounded-2xl shadow-2xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <div className="px-4.5 py-2 border-b border-white/5">
                    <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-widest font-mono">Precision Mathematical Tools</span>
                  </div>
                  <div className="max-h-[380px] overflow-y-auto">
                    {calculators.map((calc, i) => (
                      <button
                        key={calc.path}
                        id={`nav-calc-${i}-btn`}
                        onClick={() => handleLinkClick(calc.path)}
                        className="w-full text-left px-4.5 py-3 hover:bg-white/5 flex items-start gap-4.5 group transition-colors cursor-pointer"
                      >
                        <div className="mt-0.5 bg-white/5 group-hover:bg-brand-accent text-brand-text-muted group-hover:text-brand-bg p-2 rounded-xl transition-colors shadow-sm">
                          <Calculator className="h-4.5 w-4.5" />
                        </div>
                        <div className="flex-grow">
                          <span className="block text-sm font-bold text-white group-hover:text-brand-accent transition-colors">
                            {calc.label}
                          </span>
                          <span className="block text-xs text-brand-text-secondary mt-0.5 font-sans leading-normal">
                            {calc.description}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              id="nav-learn-btn"
              onClick={() => handleLinkClick('/learn')}
              className={`px-4.5 py-2.5 min-h-[44px] rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center ${
                currentPath.startsWith('/learn') 
                  ? 'bg-brand-accent/10 border border-brand-accent/25 text-brand-accent' 
                  : 'text-brand-text-secondary hover:bg-white/5 hover:text-white'
              }`}
            >
              Learn Hub
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2.5 min-h-[44px] min-w-[44px] rounded-xl text-brand-text-secondary hover:text-white hover:bg-white/5 focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-brand-panel border-t border-brand-border px-4 pt-3 pb-5 space-y-2.5 shadow-2xl animate-in fade-in slide-in-from-top duration-200">
          <button
            onClick={() => handleLinkClick('/')}
            className="w-full text-left flex items-center gap-3.5 px-4 py-3 min-h-[44px] rounded-xl text-base font-bold text-white hover:bg-white/5"
          >
            Home Base
          </button>
          <div className="py-2 border-t border-b border-brand-border/40 my-2">
            <div className="px-4 py-1.5">
              <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-widest font-mono">Financial Calculators</span>
            </div>
            <div className="space-y-1 mt-1">
              {calculators.map((calc) => (
                <button
                  key={calc.path}
                  onClick={() => handleLinkClick(calc.path)}
                  className="w-full text-left flex items-center gap-3 px-6 py-2.5 min-h-[44px] rounded-xl text-sm font-semibold text-brand-text-secondary hover:text-brand-accent hover:bg-brand-accent/5 transition-all cursor-pointer"
                >
                  <Calculator className="h-4 w-4 text-brand-accent shrink-0" />
                  {calc.label}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => handleLinkClick('/learn')}
            className="w-full text-left flex items-center gap-3.5 px-4 py-3 min-h-[44px] rounded-xl text-base font-bold text-white hover:bg-white/5 cursor-pointer"
          >
            Learn & Articles
          </button>
        </div>
      )}
    </nav>
  );
}
