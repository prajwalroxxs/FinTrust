import React, { useState, useEffect } from 'react';
import { Route, SipInputs, SipResult } from '../types';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorInput from '../components/CalculatorInput';
import ResultCard from '../components/ResultCard';
import ChartSection from '../components/ChartSection';
import { calculateSip } from '../utils/calculators';

interface SipCalculatorProps {
  onNavigate: (path: Route) => void;
}

export default function SipCalculator({ onNavigate }: SipCalculatorProps) {
  // Inputs State
  const [monthlyInvestment, setMonthlyInvestment] = useState(15000);
  const [expectedReturnRate, setExpectedReturnRate] = useState(12);
  const [timePeriodYears, setTimePeriodYears] = useState(15);
  
  // Results State
  const [result, setResult] = useState<SipResult | null>(null);

  // Recalculate on inputs change
  useEffect(() => {
    const outputs = calculateSip({
      monthlyInvestment,
      expectedReturnRate,
      timePeriodYears,
    });
    setResult(outputs);
  }, [monthlyInvestment, expectedReturnRate, timePeriodYears]);

  const faqs = [
    {
      question: 'What is a Systematic Investment Plan (SIP)?',
      answer: 'A Systematic Investment Plan (SIP) is an investment route provided by mutual funds to help investors invest disciplined, fixed amounts regularly—weekly, monthly, or quarterly—into their favorite mutual fund schemes rather than waiting to aggregate a large lump-sum capital.',
    },
    {
      question: 'Is the return rate of equity SIPs guaranteed?',
      answer: 'No. SIP investments are typically made into equity or hybrid mutual funds which are market-linked instruments. Returns are not guaranteed. However, over longer time horizons (such as 7 to 10+ years), Indian equity markets historically average returns of 12% to 15% per annum, comfortably beating traditional bank savings and inflation.',
    },
    {
      question: 'What is Rupee Cost Averaging inside SIP?',
      answer: 'Rupee Cost Averaging is a key financial dynamic of SIPs. Since you invest a fixed sum month after month, you automatically acquire more units when the asset prices are down and fewer units when prices are high. This balances out your average accumulation cost over time without needing to time market fluctuations.',
    },
    {
      question: 'Can I pause, stop, or increase my SIP anytime?',
      answer: 'Yes! SIPs are highly flexible. You can pause or stop your SIP requests without penalty. You can also edit your SIP amount upwards manually (referred to as a step-up SIP) to accelerate wealth building as your monthly income or salary grows.',
    },
  ];

  if (!result) return null;

  return (
    <CalculatorLayout
      title="SIP (Systematic Investment Plan) Calculator"
      description="Estimate the compounding wealth and terminal value of your regular mutual fund contributions. Move sliders to simulate differing growth curves and investment durations."
      onNavigate={onNavigate}
      faqs={faqs}
    >
      {/* Left Input Section */}
      <div className="lg:col-span-5 bg-brand-panel border border-brand-border rounded-3xl p-7 sm:p-9 space-y-8 shadow-2xl">
        <h3 className="text-xs font-bold text-brand-text-muted uppercase tracking-widest border-b border-white/5 pb-4.5 font-sans text-left">
          Investment Parameters
        </h3>

        <CalculatorInput
          label="Monthly Mutual Fund Contribution"
          value={monthlyInvestment}
          onChange={setMonthlyInvestment}
          min={500}
          max={200000}
          step={500}
          prefix="₹"
        />

        <CalculatorInput
          label="Expected Annual Rate of Return"
          value={expectedReturnRate}
          onChange={setExpectedReturnRate}
          min={1}
          max={30}
          step={0.5}
          suffix="%"
          helpText="Historically: 12% - 15%"
        />

        <CalculatorInput
          label="Investment Horizon (Time Period)"
          value={timePeriodYears}
          onChange={setTimePeriodYears}
          min={1}
          max={40}
          step={1}
          suffix="Yrs"
          helpText="Longer duration = higher compounding"
        />
      </div>

      {/* Right Output & Visualization Section */}
      <div className="lg:col-span-7 space-y-8">
        {/* Results Summary Card */}
        <ResultCard
          title="Accumulation Projection"
          badge="Terminal Capital"
          items={[
            { label: 'Total Capital Invested', value: result.totalInvestment },
            { label: 'Estimated Wealth Gains', value: result.estimatedReturns },
            { label: 'Total Value (Maturity)', value: result.totalValue },
          ]}
          highlightedIndex={2}
        />

        {/* Visual Analytics Curve */}
        <ChartSection type="sip" data={result.yearlyData} />
      </div>
    </CalculatorLayout>
  );
}
