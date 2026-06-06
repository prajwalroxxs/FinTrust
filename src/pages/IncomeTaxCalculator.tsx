import React, { useState, useEffect } from 'react';
import { Route, TaxInputs, TaxResult } from '../types';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorInput from '../components/CalculatorInput';
import ResultCard from '../components/ResultCard';
import ChartSection from '../components/ChartSection';
import { calculateTax } from '../utils/calculators';
import { formatRupee } from '../utils/format';

interface IncomeTaxCalculatorProps {
  onNavigate: (path: Route) => void;
}

export default function IncomeTaxCalculator({ onNavigate }: IncomeTaxCalculatorProps) {
  // Tax Inputs State
  const [grossSalary, setGrossSalary] = useState(1200000); // 12 Lakhs default
  const [otherIncome, setOtherIncome] = useState(50000); // 50k default
  const [section80C, setSection80C] = useState(150000); // 1.5L max default
  const [section80D, setSection80D] = useState(25000); // 25k default
  const [interestOnHomeLoan24b, setInterestOnHomeLoan24b] = useState(0);
  const [hraDeduction, setHraDeduction] = useState(0);
  const [section80CCD, setSection80CCD] = useState(0); // NPS additional
  const [npsEmployer80CCD2, setNpsEmployer80CCD2] = useState(0);
  const [professionalTax, setProfessionalTax] = useState(2400); // Mumbai/Standard standard professional tax
  
  // Results State
  const [result, setResult] = useState<TaxResult | null>(null);

  // Recalculate on inputs change
  useEffect(() => {
    const outputs = calculateTax({
      grossSalary,
      otherIncome,
      section80C,
      section80D,
      interestOnHomeLoan24b,
      hraDeduction,
      section80CCD,
      npsEmployer80CCD2,
      professionalTax,
    });
    setResult(outputs);
  }, [
    grossSalary,
    otherIncome,
    section80C,
    section80D,
    interestOnHomeLoan24b,
    hraDeduction,
    section80CCD,
    npsEmployer80CCD2,
    professionalTax,
  ]);

  const faqs = [
    {
      question: 'What are the main differences between Old vs. New Tax Regimes?',
      answer: 'The Old Tax Regime offers high tax rates but lets you claim several deductions like Section 80C (EPF, LIC, PPF - up to ₹1.5L), Section 80D (health insurance - up to ₹25k/₹50k), Section 24b (home loan interest - up to ₹2L), HRA house rent, and LTA. The New Tax Regime offers lower simplified tax slab rates but strips away almost all of these deductions (except standard deduction & employee NPS).',
    },
    {
      question: 'What is the Standard Deduction for FY 2024-25 (AY 2025-26)?',
      answer: 'Under the revised rules of the Union Budget 2024, the standard deduction for salaried individuals in India is ₹75,000 for the New Tax Regime. For the Old Tax Regime, the standard deduction remains ₹50,000.',
    },
    {
      question: 'How does Section 87A rebate work under both regimes?',
      answer: 'Under the New Regime, if your taxable income does not exceed ₹7 Lakhs, you are eligible for full rebate, resulting in zero tax liability. Under the Old Regime, if your taxable income does not exceed ₹5 Lakhs, you receive a full tax rebate resulting in zero tax liability.',
    },
    {
      question: 'Can a salaried employee switch between regimes?',
      answer: 'Yes! Salaried individuals who do not have business or professional income can switch between the Old and New tax regimes every financial year when filing their Income Tax Return (ITR).',
    },
  ];

  if (!result) return null;

  return (
    <CalculatorLayout
      title="Income Tax (FY 2024-25 / AY 2025-26) Calculator"
      description="Compare your liability under the Old Tax Regime and the revised New Tax Slabs declared in Union Budget 2024. Tune your deductions to see which regime saves you more money."
      onNavigate={onNavigate}
      faqs={faqs}
    >
      {/* 2-Column Inputs Grid */}
      <div className="lg:col-span-12 xl:col-span-6 bg-brand-panel border border-brand-border rounded-3xl p-7 sm:p-9 space-y-6 shadow-2xl">
        <h3 className="text-xs font-bold text-brand-text-muted uppercase tracking-widest border-b border-white/5 pb-4 font-sans text-left">
          Income & Deduction Inputs
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CalculatorInput
            label="Gross Annual Salary"
            value={grossSalary}
            onChange={setGrossSalary}
            min={100000}
            max={10000000}
            step={50000}
            prefix="₹"
          />

          <CalculatorInput
            label="Other Sources of Income"
            value={otherIncome}
            onChange={setOtherIncome}
            min={0}
            max={2000000}
            step={10000}
            prefix="₹"
            helpText="Interest, freelancing, rental growth"
          />

          <CalculatorInput
            label="Section 80C Deductions"
            value={section80C}
            onChange={setSection80C}
            min={0}
            max={150000}
            step={5000}
            prefix="₹"
            helpText="EPF, PPF, LIC, ELSS (Capped at ₹1.5L)"
          />

          <CalculatorInput
            label="Section 80D Health Premiums"
            value={section80D}
            onChange={setSection80D}
            min={0}
            max={100000}
            step={5000}
            prefix="₹"
            helpText="Mediclaim (Max ₹25k/Senior ₹50k)"
          />

          <CalculatorInput
            label="Section 24b Home Loan Interest"
            value={interestOnHomeLoan24b}
            onChange={setInterestOnHomeLoan24b}
            min={0}
            max={500000}
            step={10000}
            prefix="₹"
            helpText="Self occupied (Capped at ₹2L)"
          />

          <CalculatorInput
            label="HRA / House Rent Allowance"
            value={hraDeduction}
            onChange={setHraDeduction}
            min={0}
            max={1000000}
            step={10000}
            prefix="₹"
            helpText="Only applicable in Old Regime"
          />

          <CalculatorInput
            label="Professional Tax"
            value={professionalTax}
            onChange={setProfessionalTax}
            min={0}
            max={5000}
            step={100}
            prefix="₹"
            helpText="Default standard: ₹2,400"
          />

          <CalculatorInput
            label="Section 80CCD NPS Contribution"
            value={section80CCD}
            onChange={setSection80CCD}
            min={0}
            max={200000}
            step={5000}
            prefix="₹"
            helpText="Employee voluntary NPS (Max ₹50k)"
          />
        </div>
      </div>

      {/* 2-Column Results Comparison */}
      <div className="lg:col-span-12 xl:col-span-6 space-y-8">
        {/* Recommendation Header Card */}
        <div className="bg-brand-panel border border-brand-accent/40 text-white p-7 rounded-3xl shadow-2xl text-left flex flex-col md:flex-row md:items-center md:justify-between gap-5 relative overflow-hidden">
          {/* Subtle glowing accent decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest font-mono text-brand-accent">
              Tax Advisory Recommendation
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold mt-1.5 tracking-tight text-white">
              {result.betterRegime === 'Any (Same)' 
                ? 'Regime Choices are Identical' 
                : `File under: ${result.betterRegime.toUpperCase()}`
              }
            </h3>
            <p className="text-sm text-brand-text-secondary mt-2 leading-relaxed max-w-xl">
              {result.taxSavingsNewVsOld === 0
                ? 'No tax liabilities computed under either of the regimes for your income range.'
                : `Opting for the ${result.betterRegime} saves you approximately ${formatRupee(result.taxSavingsNewVsOld)} in cumulative tax payout.`
              }
            </p>
          </div>
          {result.taxSavingsNewVsOld > 0 && (
            <div className="bg-brand-accent/10 px-5 py-3 rounded-2xl text-center flex-shrink-0 shrink-0 border border-brand-accent/25 shadow-lg shadow-brand-accent/5">
              <span className="block text-[10px] font-bold text-brand-text-muted font-mono uppercase tracking-wider">Calculated Savings</span>
              <span className="block text-2xl font-extrabold text-brand-accent mt-0.5">{formatRupee(result.taxSavingsNewVsOld)}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* New Regime Results Summary */}
          <ResultCard
            title="New Regime (Budget 2024)"
            badge="Simplified slabs"
            items={[
              { label: 'Standard/Employee NPS Deductions', value: result.newRegimeDeductions },
              { label: 'Net Net Taxable Income', value: result.newRegimeTaxableIncome },
              { label: 'Total Tax Taxable (With Cess)', value: result.newRegimeTotalTax },
            ]}
            highlightedIndex={result.betterRegime === 'New Regime' ? 2 : -1}
          />

          {/* Old Regime Results Summary */}
          <ResultCard
            title="Old Tax Regime"
            badge="Deductions active"
            items={[
              { label: 'Consolidated Deductions', value: result.oldRegimeDeductions },
              { label: 'Net Net Taxable Income', value: result.oldRegimeTaxableIncome },
              { label: 'Total Tax Taxable (With Cess)', value: result.oldRegimeTotalTax },
            ]}
            highlightedIndex={result.betterRegime === 'Old Regime' ? 2 : -1}
          />
        </div>

        {/* Comparison Slabs bar chart */}
        <ChartSection type="tax" data={result} />
      </div>
    </CalculatorLayout>
  );
}
