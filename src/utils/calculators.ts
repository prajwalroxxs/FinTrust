import {
  SipInputs,
  SipResult,
  EmiInputs,
  EmiResult,
  CagrInputs,
  CagrResult,
  FdInputs,
  FdResult,
  TaxInputs,
  TaxResult,
} from '../types';

// SIP Calculation
export function calculateSip(inputs: SipInputs): SipResult {
  const { monthlyInvestment, expectedReturnRate, timePeriodYears } = inputs;
  const P = monthlyInvestment;
  const i = (expectedReturnRate / 100) / 12;
  const n = timePeriodYears * 12;

  let totalValue = 0;
  if (i === 0) {
    totalValue = P * n;
  } else {
    // Standard SIP formula: M = P * [((1 + i)^n - 1) / i] * (1 + i)
    totalValue = P * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
  }

  const totalInvestment = P * n;
  const estimatedReturns = Math.max(0, totalValue - totalInvestment);

  // Generate yearly breakdown
  const yearlyData = [];
  for (let year = 1; year <= timePeriodYears; year++) {
    const months = year * 12;
    let valueAtYear = 0;
    if (i === 0) {
      valueAtYear = P * months;
    } else {
      valueAtYear = P * (((Math.pow(1 + i, months) - 1) / i) * (1 + i));
    }
    const investedAtYear = P * months;
    const returnsAtYear = Math.max(0, valueAtYear - investedAtYear);

    yearlyData.push({
      year,
      investment: Math.round(investedAtYear),
      returns: Math.round(returnsAtYear),
      total: Math.round(valueAtYear),
    });
  }

  return {
    totalInvestment: Math.round(totalInvestment),
    estimatedReturns: Math.round(estimatedReturns),
    totalValue: Math.round(totalValue),
    yearlyData,
  };
}

// EMI Calculation
export function calculateEmi(inputs: EmiInputs): EmiResult {
  const { loanAmount, interestRate, tenureYears } = inputs;
  const n = tenureYears * 12;
  const r = (interestRate / 100) / 12;

  let monthlyEmi = 0;
  if (r === 0) {
    monthlyEmi = loanAmount / n;
  } else {
    // Equated Monthly Installment = [P x R x (1+R)^N]/[((1+R)^N)-1]
    monthlyEmi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const totalPayment = monthlyEmi * n;
  const totalInterest = Math.max(0, totalPayment - loanAmount);

  // Amortization Schedule
  const yearlyRepayment = [];
  let remainingOutstanding = loanAmount;
  
  for (let year = 1; year <= tenureYears; year++) {
    let yearlyPrincipalPaid = 0;
    let yearlyInterestPaid = 0;

    for (let m = 1; m <= 12; m++) {
      const interestForMonth = remainingOutstanding * r;
      const principalForMonth = Math.min(remainingOutstanding, monthlyEmi - interestForMonth);
      
      yearlyPrincipalPaid += principalForMonth;
      yearlyInterestPaid += interestForMonth;
      remainingOutstanding -= principalForMonth;
    }

    yearlyRepayment.push({
      year,
      principalPaid: Math.round(yearlyPrincipalPaid),
      interestPaid: Math.round(yearlyInterestPaid),
      balancePaid: Math.round(loanAmount - remainingOutstanding),
      outstandingBalance: Math.max(0, Math.round(remainingOutstanding)),
    });
  }

  return {
    monthlyEmi: Math.round(monthlyEmi),
    principalAmount: Math.round(loanAmount),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
    yearlyRepayment,
  };
}

// CAGR Calculation
export function calculateCagr(inputs: CagrInputs): CagrResult {
  const { initialValue, finalValue, durationYears } = inputs;
  
  if (initialValue <= 0 || finalValue <= 0 || durationYears <= 0) {
    return {
      cagrPercentage: 0,
      totalGainPercentage: 0,
      yearlyProjected: [],
    };
  }

  // CAGR = (Final / Initial)^(1 / Years) - 1
  const cagr = Math.pow(finalValue / initialValue, 1 / durationYears) - 1;
  const totalGainPercentage = ((finalValue - initialValue) / initialValue) * 100;
  const cagrPercentage = cagr * 100;

  // Generate compounding progression
  const yearlyProjected = [];
  for (let year = 0; year <= durationYears; year++) {
    const valueAtYear = initialValue * Math.pow(1 + cagr, year);
    yearlyProjected.push({
      year,
      value: Math.round(valueAtYear),
    });
  }

  return {
    cagrPercentage: Math.round(cagrPercentage * 100) / 100,
    totalGainPercentage: Math.round(totalGainPercentage * 100) / 100,
    yearlyProjected,
  };
}

// FD Calculation
export function calculateFd(inputs: FdInputs): FdResult {
  const { principalAmount, interestRate, tenureYears, compoundingFrequency } = inputs;
  
  let timesCompoundedPerYear = 4; // default quarterly
  if (compoundingFrequency === 'monthly') timesCompoundedPerYear = 12;
  else if (compoundingFrequency === 'quarterly') timesCompoundedPerYear = 4;
  else if (compoundingFrequency === 'half-yearly') timesCompoundedPerYear = 2;
  else if (compoundingFrequency === 'yearly') timesCompoundedPerYear = 1;

  const r = interestRate / 100;
  const t = tenureYears;
  const n = timesCompoundedPerYear;

  // A = P * (1 + r / n) ^ (n * t)
  const maturityAmount = principalAmount * Math.pow(1 + r / n, n * t);
  const totalInterestEarned = Math.max(0, maturityAmount - principalAmount);

  // Generate Growth curve
  const yearlyGrowth = [];
  for (let year = 1; year <= tenureYears; year++) {
    const val = principalAmount * Math.pow(1 + r / n, n * year);
    const interest = Math.max(0, val - principalAmount);
    yearlyGrowth.push({
      year,
      principal: Math.round(principalAmount),
      interest: Math.round(interest),
      total: Math.round(val),
    });
  }

  return {
    maturityAmount: Math.round(maturityAmount),
    totalInterestEarned: Math.round(totalInterestEarned),
    investedAmount: principalAmount,
    yearlyGrowth,
  };
}

// Income Tax Calculation (Revised slabs FY 2024-25 / AY 2025-26 under Union Budget 2024)
export function calculateTax(inputs: TaxInputs): TaxResult {
  const {
    grossSalary,
    otherIncome,
    interestOnHomeLoan24b,
    section80C,
    section80D,
    section80CCD,
    npsEmployer80CCD2,
    hraDeduction,
    professionalTax,
  } = inputs;

  const totalGrossIncome = grossSalary + otherIncome;

  // --- NEW REGIME CALCULATION ---
  // Standard Deduction in New Regime: ₹75,000 for FY 24-25
  const newRegimeStandardDeduction = Math.min(grossSalary, 75000);
  // Employer NPS under Section 80CCD(2) is deductible in New Regime
  const allowedEmployerNpsNew = Math.min(npsEmployer80CCD2, grossSalary * 0.10);
  
  const totalNewRegimeDeductions = newRegimeStandardDeduction + allowedEmployerNpsNew;
  const newRegimeTaxableIncome = Math.max(0, totalGrossIncome - totalNewRegimeDeductions);

  // Calculate tax on New Regime Slabs (Budget 2024)
  // Slabs:
  // - 0 to 3,00,000: Nil
  // - 3,00,001 to 7,00,000: 5%
  // - 7,00,001 to 10,00,000: 10%
  // - 10,00,001 to 14,00,000: 15%
  // - 14,00,001 to 15,00,000: 20%
  // - Above 15,00,000: 30%
  
  const newSlabs = [
    { limit: 300000, rate: 0.00, slab: '₹0 - ₹3L' },
    { limit: 400000, rate: 0.05, slab: '₹3L - ₹7L' },
    { limit: 300000, rate: 0.10, slab: '₹7L - ₹10L' },
    { limit: 400000, rate: 0.15, slab: '₹10L - ₹14L' },
    { limit: 100000, rate: 0.20, slab: '₹14L - ₹15L' },
    { limit: Infinity, rate: 0.30, slab: 'Above ₹15L' },
  ];

  let remainingNewIncome = newRegimeTaxableIncome;
  let newRegimeTaxPayable = 0;
  const newRegimeSlabsBreakdown = [];

  for (let idx = 0; idx < newSlabs.length; idx++) {
    const slab = newSlabs[idx];
    let taxableInThisSlab = 0;

    if (remainingNewIncome > 0) {
      taxableInThisSlab = Math.min(remainingNewIncome, slab.limit);
      remainingNewIncome -= taxableInThisSlab;
    }

    const taxForSlab = taxableInThisSlab * slab.rate;
    newRegimeTaxPayable += taxForSlab;

    newRegimeSlabsBreakdown.push({
      slab: slab.slab,
      rate: slab.rate * 100,
      tax: Math.round(taxForSlab),
    });
  }

  // Section 87A rebate New Regime: If net taxable income is <= ₹7,00,000, tax is 0 (max rebate ₹20,000)
  // (With Budget 2024 revised slabs, the tax on ₹7,00,000 is 5% of 4,00,000 = ₹20,000. So rebate is ₹20,000)
  let newRegimeRebate = 0;
  if (newRegimeTaxableIncome <= 700000) {
    newRegimeRebate = newRegimeTaxPayable;
    newRegimeTaxPayable = 0;
  }

  // Surcharge (for simple calculator, assume standard tax rates up to 50L)
  const newRegimeSurcharge = 0;
  const newRegimeCess = Math.round((newRegimeTaxPayable - newRegimeRebate) * 0.04);
  const newRegimeTotalTax = Math.max(0, Math.round(newRegimeTaxPayable - newRegimeRebate + newRegimeCess));


  // --- OLD REGIME CALCULATION ---
  // Standard Deduction in Old Regime: ₹50,000
  const oldRegimeStandardDeduction = Math.min(grossSalary, 50000);
  const allowed80C = Math.min(section80C, 150000);
  const allowed80D = Math.min(section80D, 25000); // generic non-senior max
  const allowedHomeLoan = Math.min(interestOnHomeLoan24b, 200000); // 24b home loan interest
  const allowedNpsOwn = Math.min(section80CCD, 50000); // 80CCD(1B) additional NPS
  const allowedEmployerNpsOld = Math.min(npsEmployer80CCD2, grossSalary * 0.10);
  const allowedHra = hraDeduction;
  const allowedPt = professionalTax;

  const totalOldRegimeDeductions =
    oldRegimeStandardDeduction +
    allowed80C +
    allowed80D +
    allowedHomeLoan +
    allowedNpsOwn +
    allowedEmployerNpsOld +
    allowedHra +
    allowedPt;

  const oldRegimeTaxableIncome = Math.max(0, totalGrossIncome - totalOldRegimeDeductions);

  // Old Slabs:
  // - 0 to 2,50,000: Nil
  // - 2,50,001 to 5,00,000: 5%
  // - 5,00,001 to 10,00,000: 20%
  // - Above 10,00,000: 30%
  const oldSlabs = [
    { limit: 250000, rate: 0.00, slab: '₹0 - ₹2.5L' },
    { limit: 250000, rate: 0.05, slab: '₹2.5L - ₹5L' },
    { limit: 500000, rate: 0.20, slab: '₹5L - ₹10L' },
    { limit: Infinity, rate: 0.30, slab: 'Above ₹10L' },
  ];

  let remainingOldIncome = oldRegimeTaxableIncome;
  let oldRegimeTaxPayable = 0;
  const oldRegimeSlabsBreakdown = [];

  for (let idx = 0; idx < oldSlabs.length; idx++) {
    const slab = oldSlabs[idx];
    let taxableInThisSlab = 0;

    if (remainingOldIncome > 0) {
      taxableInThisSlab = Math.min(remainingOldIncome, slab.limit);
      remainingOldIncome -= taxableInThisSlab;
    }

    const taxForSlab = taxableInThisSlab * slab.rate;
    oldRegimeTaxPayable += taxForSlab;

    oldRegimeSlabsBreakdown.push({
      slab: slab.slab,
      rate: slab.rate * 100,
      tax: Math.round(taxForSlab),
    });
  }

  // Section 87A rebate Old Regime: If net taxable income is <= ₹5,00,000, tax is 0 (max rebate ₹12,500)
  let oldRegimeRebate = 0;
  if (oldRegimeTaxableIncome <= 500000) {
    oldRegimeRebate = oldRegimeTaxPayable;
    oldRegimeTaxPayable = 0;
  }

  const oldRegimeSurcharge = 0;
  const oldRegimeCess = Math.round((oldRegimeTaxPayable - oldRegimeRebate) * 0.04);
  const oldRegimeTotalTax = Math.max(0, Math.round(oldRegimeTaxPayable - oldRegimeRebate + oldRegimeCess));

  // Compare results
  const taxSavingsNewVsOld = oldRegimeTotalTax - newRegimeTotalTax;
  let betterRegime: 'New Regime' | 'Old Regime' | 'Any (Same)' = 'New Regime';
  if (newRegimeTotalTax < oldRegimeTotalTax) {
    betterRegime = 'New Regime';
  } else if (oldRegimeTotalTax < newRegimeTotalTax) {
    betterRegime = 'Old Regime';
  } else {
    betterRegime = 'Any (Same)';
  }

  return {
    grossSalary,
    otherIncome,
    totalIncomeBeforeDeductions: totalGrossIncome,
    
    newRegimeDeductions: Math.round(totalNewRegimeDeductions),
    newRegimeTaxableIncome: Math.round(newRegimeTaxableIncome),
    newRegimeTaxPayable: Math.round(newRegimeTaxPayable),
    newRegimeRebate: Math.round(newRegimeRebate),
    newRegimeSurcharge,
    newRegimeSurchargeCess: Math.round(newRegimeCess),
    newRegimeTotalTax,

    oldRegimeDeductions: Math.round(totalOldRegimeDeductions),
    oldRegimeTaxableIncome: Math.round(oldRegimeTaxableIncome),
    oldRegimeTaxPayable: Math.round(oldRegimeTaxPayable),
    oldRegimeRebate: Math.round(oldRegimeRebate),
    oldRegimeSurcharge,
    oldRegimeSurchargeCess: Math.round(oldRegimeCess),
    oldRegimeTotalTax,

    taxSavingsNewVsOld: Math.abs(taxSavingsNewVsOld),
    betterRegime,

    newRegimeSlabs: newRegimeSlabsBreakdown,
    oldRegimeSlabs: oldRegimeSlabsBreakdown,
  };
}
