import React, { useState, useEffect } from 'react';
import { Route, CagrInputs, CagrResult } from '../types';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorInput from '../components/CalculatorInput';
import ResultCard from '../components/ResultCard';
import ChartSection from '../components/ChartSection';
import { calculateCagr } from '../utils/calculators';
import { formatPercent, formatRupee } from '../utils/format';

interface CagrCalculatorProps {
  onNavigate: (path: Route) => void;
}

export default function CagrCalculator({ onNavigate }: CagrCalculatorProps) {
  // Inputs State
  const [initialValue, setInitialValue] = useState(100000); // 1 Lakh
  const [finalValue, setFinalValue] = useState(150000); // 1.5 Lakhs
  const [durationYears, setDurationYears] = useState(5);
  
  // Results State
  const [result, setResult] = useState<CagrResult | null>(null);

  // Recalculate on inputs change
  useEffect(() => {
    const outputs = calculateCagr({
      initialValue,
      finalValue,
      durationYears,
    });
    setResult(outputs);
  }, [initialValue, finalValue, durationYears]);

  const faqs = [
    {
      question: 'What is CAGR (Compound Annual Growth Rate)?',
      answer: 'CAGR is the compounded rate at which a financial portfolio or asset grows annually over a specified period of years. Rather than showing erratic annual fluctuations, it smooths out returns representatively as if the asset had grown at a constant rate, compounded annually.',
    },
    {
      question: 'Why is CAGR better than Absolute (Simple) Returns?',
      answer: 'Simple returns look purely at the final percentage growth (e.g., doubling your money means a 100% simple return). However, simple returns fail to account for the duration of the cycle. Double your investment in 2 years is magnificent, whereas doubling in 15 years yields very low compound annual returns. CAGR incorporates time, helping you compare various assets (like FD, Gold, and Equity) on a level playing field.',
    },
    {
      question: 'How is CAGR mathematically calculated?',
      answer: 'The CAGR formula is: CAGR = [(Final Value / Initial Value)^(1 / n)] - 1; where n represents the duration of the investment in years.',
    },
    {
      question: 'What is the Rule of 72 inside compounding?',
      answer: "The Rule of 72 is a quick mental mathematical shortcut to estimate how many years it will take for your investment to double at a given compound annual return rate. Divide 72 by your expected CAGR (e.g., at an 12% CAGR, your investment doubles in approximately 72 / 12 = 6 years).",
    },
  ];

  if (!result) return null;

  return (
    <CalculatorLayout
      title="CAGR (Compound Annual Growth Rate) Calculator"
      description="Calculate the true geometric annual growth rate of your investment portfolio. Smooth out erratic year-by-year volatility into a representational compound scale."
      onNavigate={onNavigate}
      faqs={faqs}
    >
      {/* Left Input Section */}
      <div className="lg:col-span-5 bg-brand-panel border border-brand-border rounded-3xl p-7 sm:p-9 space-y-8 shadow-2xl">
        <h3 className="text-xs font-bold text-brand-text-muted uppercase tracking-widest border-b border-white/5 pb-4.5 font-sans text-left">
          CAGR Parameters
        </h3>

        <CalculatorInput
          label="Initial Investment Capital"
          value={initialValue}
          onChange={(val) => {
            setInitialValue(val);
            if (finalValue < val) setFinalValue(val);
          }}
          min={1000}
          max={100000000}
          step={1000}
          prefix="₹"
        />

        <CalculatorInput
          label="Estimated Final Portfolio Value"
          value={finalValue}
          onChange={(val) => {
            setFinalValue(val);
            if (initialValue > val) setInitialValue(val);
          }}
          min={1000}
          max={200000000}
          step={1000}
          prefix="₹"
        />

        <CalculatorInput
          label="Compounded Compounding Cycles (Duration)"
          value={durationYears}
          onChange={setDurationYears}
          min={1}
          max={40}
          step={1}
          suffix="Yrs"
        />
      </div>

      {/* Right Output & Visualization Section */}
      <div className="lg:col-span-7 space-y-8">
        {/* Results Summary Card */}
        <ResultCard
          title="Metric Profile"
          badge="Growth Metrics"
          items={[
            { label: 'Calculated CAGR', value: result.cagrPercentage, isCurrency: false, footnote: `${result.cagrPercentage}% compounded p.a.` },
            { label: 'Net Profit gained (Absolute Return)', value: finalValue - initialValue },
            { label: 'Total Returns Gain Ratio', value: result.totalGainPercentage, isCurrency: false, footnote: `${result.totalGainPercentage}% absolute increase` },
          ]}
          highlightedIndex={0}
        />

        {/* Visual Analytics Curve */}
        <ChartSection type="cagr" data={result.yearlyProjected} />
      </div>
    </CalculatorLayout>
  );
}
