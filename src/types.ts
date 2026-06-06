export type Route =
  | '/'
  | '/calculators/sip'
  | '/calculators/emi'
  | '/calculators/income-tax'
  | '/calculators/cagr'
  | '/calculators/fd'
  | '/learn'
  | '/learn/sip-vs-fd'
  | '/learn/how-much-sip-for-1-crore';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface LearnArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  readTime: string;
  date: string;
  category: 'Investment' | 'Taxation' | 'Loans' | 'Planning';
  summary: string;
  content: string; // Markdown or rich HTML
  tags: string[];
}

// SIP Types
export interface SipInputs {
  monthlyInvestment: number;
  expectedReturnRate: number;
  timePeriodYears: number;
}

export interface SipResult {
  totalInvestment: number;
  estimatedReturns: number;
  totalValue: number;
  yearlyData: {
    year: number;
    investment: number;
    returns: number;
    total: number;
  }[];
}

// EMI Types
export interface EmiInputs {
  loanAmount: number;
  interestRate: number;
  tenureYears: number;
}

export interface EmiResult {
  monthlyEmi: number;
  principalAmount: number;
  totalInterest: number;
  totalPayment: number;
  yearlyRepayment: {
    year: number;
    principalPaid: number;
    interestPaid: number;
    balancePaid: number;
    outstandingBalance: number;
  }[];
}

// CAGR Types
export interface CagrInputs {
  initialValue: number;
  finalValue: number;
  durationYears: number;
}

export interface CagrResult {
  cagrPercentage: number;
  totalGainPercentage: number;
  yearlyProjected: {
    year: number;
    value: number;
  }[];
}

// FD Types
export interface FdInputs {
  principalAmount: number;
  interestRate: number;
  tenureYears: number;
  compoundingFrequency: 'monthly' | 'quarterly' | 'half-yearly' | 'yearly';
}

export interface FdResult {
  maturityAmount: number;
  totalInterestEarned: number;
  investedAmount: number;
  yearlyGrowth: {
    year: number;
    principal: number;
    interest: number;
    total: number;
  }[];
}

// Income Tax Types (FY 2024-25 / AY 2025-26 rules)
export interface TaxInputs {
  grossSalary: number;
  otherIncome: number;
  interestOnHomeLoan24b: number; // Max 2L deductions in Old, 0 in New
  section80C: number; // Max 1.5L in Old, 0 in New
  section80D: number; // Max 25k (or 50k senior) in Old
  section80CCD: number; // NPS, etc.
  npsEmployer80CCD2: number; // Max 10% of salary (deductible in both)
  hraDeduction: number;
  professionalTax: number;
}

export interface TaxResult {
  grossSalary: number;
  otherIncome: number;
  totalIncomeBeforeDeductions: number;
  
  // New Regime Details
  newRegimeDeductions: number;
  newRegimeTaxableIncome: number;
  newRegimeTaxPayable: number;
  newRegimeRebate: number;
  newRegimeSurcharge: number;
  newRegimeSurchargeCess: number;
  newRegimeTotalTax: number;

  // Old Regime Details
  oldRegimeDeductions: number;
  oldRegimeTaxableIncome: number;
  oldRegimeTaxPayable: number;
  oldRegimeRebate: number;
  oldRegimeSurcharge: number;
  oldRegimeSurchargeCess: number;
  oldRegimeTotalTax: number;

  taxSavingsNewVsOld: number;
  betterRegime: 'New Regime' | 'Old Regime' | 'Any (Same)';
  
  // Tax breakdown slices
  newRegimeSlabs: { slab: string; rate: number; tax: number }[];
  oldRegimeSlabs: { slab: string; rate: number; tax: number }[];
}
