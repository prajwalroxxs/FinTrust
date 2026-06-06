import React from 'react';
import { formatNumber } from '../utils/format';

interface CalculatorInputProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  helpText?: string;
}

export default function CalculatorInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix = '',
  suffix = '',
  helpText,
}: CalculatorInputProps) {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strip everything except numbers or dots
    const cleanedValue = e.target.value.replace(/[^0-9.]/g, '');
    const num = Number(cleanedValue);
    if (!isNaN(num)) {
      onChange(Math.min(max, Math.max(min, num)));
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  // Calculate track percentage for slider visual filling
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-3 font-sans text-left">
      <div className="flex justify-between items-center">
        <label className="text-sm font-bold text-brand-text-secondary">
          {label}
        </label>
        {helpText && (
          <span className="text-[11px] font-bold font-mono text-brand-accent tracking-wider uppercase">
            {helpText}
          </span>
        )}
      </div>

      <div className="flex gap-4 items-center">
        {/* Slider */}
        <div className="flex-grow">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleSliderChange}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-0 accent-brand-accent bg-[#1e293b]"
            style={{
              background: `linear-gradient(to right, #00E6A7 0%, #00E6A7 ${percentage}%, rgba(255, 255, 255, 0.08) ${percentage}%, rgba(255, 255, 255, 0.08) 100%)`,
            }}
          />
        </div>

        {/* Text Input Container with prefix/suffix */}
        <div className="relative w-40 flex-shrink-0">
          {prefix && (
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-sm font-bold text-brand-text-muted">
              {prefix}
            </span>
          )}
          <input
            type="text"
            value={formatNumber(value)}
            onChange={handleInputChange}
            className={`w-full ${prefix ? 'pl-7' : 'pl-3.5'} ${suffix ? 'pr-9' : 'pr-3.5'} py-2.5 text-right text-sm font-bold bg-brand-bg border border-brand-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent text-white shadow-inner font-mono min-h-[44px]`}
          />
          {suffix && (
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-[10px] font-bold text-brand-text-muted uppercase">
              {suffix}
            </span>
          )}
        </div>
      </div>

      {/* Slider Tick Limits */}
      <div className="flex justify-between text-[10px] font-mono font-bold text-brand-text-muted uppercase transition-colors">
        <span>{prefix}{formatNumber(min)}{suffix}</span>
        <span>{prefix}{formatNumber(max)}{suffix}</span>
      </div>
    </div>
  );
}
