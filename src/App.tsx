import React, { useState, useEffect } from 'react';
import { Route } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import SipCalculator from './pages/SipCalculator';
import EmiCalculator from './pages/EmiCalculator';
import IncomeTaxCalculator from './pages/IncomeTaxCalculator';
import CagrCalculator from './pages/CagrCalculator';
import FdCalculator from './pages/FdCalculator';
import Learn from './pages/Learn';
import ArticleView from './pages/ArticleView';

export default function App() {
  const [currentPath, setCurrentPath] = useState<Route>('/');

  // Listen to hash change to support native browser forward/backward histories and direct deep links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        // e.g. change "#/calculators/sip" to "/calculators/sip"
        const cleanPath = hash.substring(1) as Route;
        setCurrentPath(cleanPath);
      } else {
        setCurrentPath('/');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial run
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (path: Route) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const renderActivePage = () => {
    switch (currentPath) {
      case '/':
        return <Home onNavigate={handleNavigate} />;
      
      case '/calculators/sip':
        return <SipCalculator onNavigate={handleNavigate} />;
      
      case '/calculators/emi':
        return <EmiCalculator onNavigate={handleNavigate} />;
      
      case '/calculators/income-tax':
        return <IncomeTaxCalculator onNavigate={handleNavigate} />;
      
      case '/calculators/cagr':
        return <CagrCalculator onNavigate={handleNavigate} />;
      
      case '/calculators/fd':
        return <FdCalculator onNavigate={handleNavigate} />;
      
      case '/learn':
        return <Learn onNavigate={handleNavigate} />;
      
      case '/learn/sip-vs-fd':
        return <ArticleView slug="sip-vs-fd" onNavigate={handleNavigate} />;
      
      case '/learn/how-much-sip-for-1-crore':
        return <ArticleView slug="how-much-sip-for-1-crore" onNavigate={handleNavigate} />;
      
      default:
        // Fallback for custom slug indexing matches inside /learn/*
        if (currentPath.startsWith('/learn/')) {
          const slug = currentPath.replace('/learn/', '');
          return <ArticleView slug={slug} onNavigate={handleNavigate} />;
        }
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg text-white antialiased">
      {/* Top Navigation */}
      <Navbar currentPath={currentPath} onNavigate={handleNavigate} />
      
      <main className="flex-grow">
        {renderActivePage()}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

