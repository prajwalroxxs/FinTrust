import React, { useState, useEffect } from 'react';
import { Route, EmiInputs, EmiResult } from '../types';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorInput from '../components/CalculatorInput';
import ResultCard from '../components/ResultCard';
import ChartSection from '../components/ChartSection';
import { calculateEmi } from '../utils/calculators';

interface EmiCalculatorProps {
  onNavigate: (path: Route) => void;
}

export default function EmiCalculator({ onNavigate }: EmiCalculatorProps) {
  // Inputs State
  const [loanAmount, setLoanAmount] = useState(5000000); // 50 Lakhs default
  const [interestRate, setInterestRate] = useState(8.5); // 8.5% default Home Loan
  const [tenureYears, setTenureYears] = useState(20); // 20 years default
  
  // Results State
  const [result, setResult] = useState<EmiResult | null>(null);

  // Recalculate on inputs change
  useEffect(() => {
    const outputs = calculateEmi({
      loanAmount,
      interestRate,
      tenureYears,
    });
    setResult(outputs);
  }, [loanAmount, interestRate, tenureYears]);

  const faqs = [
    {
      question: 'What is a Loan EMI (Equated Monthly Installment)?',
      answer: 'An EMI is a fixed monthly payment made by a borrower to a lender on a specific date of every calendar month. EMIs apply to both interest and principal repayments so that over a specified number of years, the loan is fully paid off.',
    },
    {
      question: 'How is the interest portion in EMIs amortized?',
      answer: 'Most retail mortgages and loans in India operate on a "reducing balance method". This means interest is calculated on the outstanding loan principal at the end of each month. In the initial years, a major portion of your EMI goes towards interest. As the principal drops, the interest portion shrinks, and principal repayments accelerate.',
    },
    {
      question: 'What is the role of loan pre-payments?',
      answer: 'Making additional lump-sum payments towards your outstanding loan principal is called pre-payment. Since this directly reduces your outstanding balance, it significantly clips your loan tenure and saves massive amounts of interest compound over time. Most banks allow zero pre-payment penalization on floating-rate home loans.',
    },
    {
      question: 'What is the difference between Fixed and Floating Interest Rates?',
      answer: 'A fixed interest rate remains constant throughout the loan tenure, offering payment predictability. A floating interest rate is tied to a benchmark market rate (like RBI Repo Rate / MCLR) and fluctuates with central monetary policies. Highly common in Indian home loans, floating rates can expand or contract your overall payment tenure.',
    },
  ];

  if (!result) return null;

  return (
    <CalculatorLayout
      title="Loan EMI (Equated Monthly Installment) Calculator"
      description="Calculate your monthly home, car, or personal mortgage repayments. See the amortization breakdown of principal versus interest paid over the selected tenure."
      onNavigate={onNavigate}
      faqs={faqs}
    >
      {/* Left Input Section */}
      <div className="lg:col-span-12 xl:col-span-5 bg-brand-panel border border-brand-border rounded-3xl p-7 sm:p-9 space-y-8 shadow-2xl">
        <h3 className="text-xs font-bold text-brand-text-muted uppercase tracking-widest border-b border-white/5 pb-4.5 font-sans text-left">
          Mortgage Parameters
        </h3>

        <CalculatorInput
          label="Loan Principal Amount"
          value={loanAmount}
          onChange={setLoanAmount}
          min={100000}
          max={100000000}
          step={50000}
          prefix="₹"
        />

        <CalculatorInput
          label="Annual Interest Rate p.a."
          value={interestRate}
          onChange={setInterestRate}
          min={3}
          max={20}
          step={0.1}
          suffix="%"
          helpText="Floating rate averages inside 8.5% - 11.5%"
        />

        <CalculatorInput
          label="Loan Tenure Duration"
          value={tenureYears}
          onChange={setTenureYears}
          min={1}
          max={30}
          step={1}
          suffix="Yrs"
          helpText="Max limit for home mortgages: 30 Yrs"
        />
      </div>

      {/* Right Output & Visualization Section */}
      <div className="lg:col-span-12 xl:col-span-7 space-y-8">
        {/* Results Summary Card */}
        <ResultCard
          title="Borrowing Cost Details"
          badge="Amortized Split"
          items={[
            { label: 'Calculated Monthly EMI', value: result.monthlyEmi },
            { label: 'Base Principal Borrowed', value: result.principalAmount },
            { label: 'Cumulative Interest Payable', value: result.totalInterest },
            { label: 'Cumulative Liability (Total Paid)', value: result.totalPayment },
          ]}
          highlightedIndex={0}
        />

        {/* Visual Analytics Curve */}
        <ChartSection type="emi" data={result} />
      </div>
    </CalculatorLayout>
  );
}
