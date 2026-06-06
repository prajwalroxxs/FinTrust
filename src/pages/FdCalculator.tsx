import React, { useState, useEffect } from 'react';
import { Route, FdInputs, FdResult } from '../types';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorInput from '../components/CalculatorInput';
import ResultCard from '../components/ResultCard';
import ChartSection from '../components/ChartSection';
import { calculateFd } from '../utils/calculators';

interface FdCalculatorProps {
  onNavigate: (path: Route) => void;
}

export default function FdCalculator({ onNavigate }: FdCalculatorProps) {
  // Inputs State
  const [principalAmount, setPrincipalAmount] = useState(100000); // 1 Lakh default
  const [interestRate, setInterestRate] = useState(7); // 7% standard bank FD default
  const [tenureYears, setTenureYears] = useState(5); // 5 years default
  const [compoundingFrequency, setCompoundingFrequency] = useState<
    'monthly' | 'quarterly' | 'half-yearly' | 'yearly'
  >('quarterly'); // standard Indian quarterly default
  
  // Results State
  const [result, setResult] = useState<FdResult | null>(null);

  // Recalculate on inputs change
  useEffect(() => {
    const outputs = calculateFd({
      principalAmount,
      interestRate,
      tenureYears,
      compoundingFrequency,
    });
    setResult(outputs);
  }, [principalAmount, interestRate, tenureYears, compoundingFrequency]);

  const faqs = [
    {
      question: 'What is a Fixed Deposit (FD) and how does it compromise risk?',
      answer: "A bank Fixed Deposit (FD) is a secure financial investment offered by scheduled commercial banks. You deposit your capital once for a fixed tenure in return for a locked, fully guaranteed rate of interest. This guarantees return values, shielding you from any stock market volatility.",
    },
    {
      question: 'What is the standard compounding compounding frequency in India?',
      answer: 'Most nationalized and private banks in India compound deposit interest on a quarterly basis. Compounding quarterly means interest earned during the first three months is added to the principal to compute interest for the next quarter, compounding your balance higher than straightforward simple-rate logic.',
    },
    {
      question: 'Is bank FD interest taxable in India?',
      answer: 'Yes. Interest income from Fixed Deposits is fully taxable. It is added to your other streams of income and taxed as per your standard individual income tax slab rates. If the cumulative FD interest across a bank exceeds ₹40,000 in a year (₹50,000 for senior citizens), the bank deducts Tax Deducted at Source (TDS), usually at 10%.',
    },
    {
      question: 'What are Tax Saver FDs under Section 80C?',
      answer: "Tax Saver FDs have a mandatory lock-in period of 5 years. Salaried and independent investors can claim tax exemptions of up to ₹1.5 Lakhs under Section 80C by investing in these deposits. However, prematurity liquidation is prohibited on these plans.",
    },
  ];

  if (!result) return null;

  return (
    <CalculatorLayout
      title="Fixed Deposit (FD) Calculator"
      description="Calculate maturity amounts of bank fixed deposits. Compare monthly, quarterly, and annual compound interest outputs to optimize deposit earnings."
      onNavigate={onNavigate}
      faqs={faqs}
    >
      {/* Left Input Section */}
      <div className="lg:col-span-12 xl:col-span-5 bg-brand-panel border border-brand-border rounded-3xl p-7 sm:p-9 space-y-8 shadow-2xl">
        <h3 className="text-xs font-bold text-brand-text-muted uppercase tracking-widest border-b border-white/5 pb-4.5 font-sans text-left">
          Deposit Parameters
        </h3>

        <CalculatorInput
          label="Principal Investment Capital"
          value={principalAmount}
          onChange={setPrincipalAmount}
          min={5000}
          max={10000000}
          step={5000}
          prefix="₹"
        />

        <CalculatorInput
          label="Locked Interest Rate (p.a.)"
          value={interestRate}
          onChange={setInterestRate}
          min={2}
          max={15}
          step={0.1}
          suffix="%"
          helpText="Averages inside 6.5% - 8.5%"
        />

        <CalculatorInput
          label="Deposit Tenure Duration"
          value={tenureYears}
          onChange={setTenureYears}
          min={1}
          max={25}
          step={1}
          suffix="Yrs"
        />

        {/* Compound Selector Row */}
        <div className="space-y-3 text-left">
          <label className="text-sm font-bold text-brand-text-secondary">
            Interest Compounding Frequency
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {(['monthly', 'quarterly', 'half-yearly', 'yearly'] as const).map((freq) => (
              <button
                key={freq}
                id={`compounding-${freq}-btn`}
                onClick={() => setCompoundingFrequency(freq)}
                className={`py-3 px-3 text-xs font-bold font-mono tracking-wider uppercase rounded-xl border text-center transition cursor-pointer min-h-[44px] flex items-center justify-center ${
                  compoundingFrequency === freq
                    ? 'bg-brand-accent/15 border-brand-accent text-brand-accent shadow-md shadow-brand-accent/5'
                    : 'bg-white/5 border-brand-border text-brand-text-secondary hover:border-brand-accent hover:text-white'
                }`}
              >
                {freq.replace('-', ' ')}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-brand-text-muted font-bold font-mono block">
            * Note: Quarterly compounding is the standard method used in Indian banks.
          </span>
        </div>
      </div>

      {/* Right Output & Visualization Section */}
      <div className="lg:col-span-12 xl:col-span-7 space-y-8">
        {/* Results Summary Card */}
        <ResultCard
          title="Deposit Yield Profile"
          badge="Terminal Returns"
          items={[
            { label: 'Invested Amount (Principal)', value: result.investedAmount },
            { label: 'Total Interest Earned', value: result.totalInterestEarned },
            { label: 'Total Maturity Value', value: result.maturityAmount },
          ]}
          highlightedIndex={2}
        />

        {/* Visual Analytics Curve */}
        <ChartSection type="fd" data={result.yearlyGrowth} />
      </div>
    </CalculatorLayout>
  );
}
