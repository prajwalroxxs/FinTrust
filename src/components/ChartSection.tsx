import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
} from 'recharts';
import { formatRupee } from '../utils/format';

interface ChartSectionProps {
  type: 'sip' | 'emi' | 'cagr' | 'fd' | 'tax';
  /* eslint-disable @typescript-eslint/no-explicit-any */
  data: any;
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

export default function ChartSection({ type, data }: ChartSectionProps) {
  // Common Custom Tooltip
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-brand-panel border border-brand-border text-white p-4.5 rounded-2xl shadow-2xl font-mono text-xs text-left animate-in fade-in duration-100">
          <p className="font-bold border-b border-white/5 pb-2 mb-2 text-brand-text-muted">
            Year {label}
          </p>
          <div className="space-y-1.5">
            {payload.map((entry: any, i: number) => (
              <p key={i} className="flex justify-between gap-6 items-center">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full inline-block shrink-0" style={{ backgroundColor: entry.color }} />
                  <span className="text-brand-text-secondary">{entry.name}:</span>
                </span>
                <span className="font-extrabold text-white">{formatRupee(entry.value)}</span>
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const renderChart = () => {
    const gridColor = "rgba(255, 255, 255, 0.05)";
    
    switch (type) {
      case 'sip':
      case 'fd':
        return (
          <div className="h-72 sm:h-80 w-full font-mono" id={`${type}-chart`}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 12, right: 10, left: -5, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E6A7" stopOpacity={0.18}/>
                    <stop offset="95%" stopColor="#00E6A7" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorReturns" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.18}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="year" fontSize={11} fontFamily="monospace" stroke="#9ca3af" tickLine={false} />
                <YAxis
                  fontSize={10}
                  fontFamily="monospace"
                  stroke="#9ca3af"
                  tickLine={false}
                  tickFormatter={(val) => `₹${(val / 100000).toFixed(1)}L`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconSize={10} iconType="circle" wrapperStyle={{ fontSize: 11, fontFamily: 'monospace', paddingTop: 12, color: '#D1D5DB' }} />
                <Area
                  type="monotone"
                  name="Invested Amount"
                  dataKey={type === 'sip' ? 'investment' : 'principal'}
                  stackId="1"
                  stroke="#00E6A7"
                  strokeWidth={2}
                  fill="url(#colorInvested)"
                />
                <Area
                  type="monotone"
                  name={type === 'sip' ? 'Estimated Returns' : 'Interest Earned'}
                  dataKey={type === 'sip' ? 'returns' : 'interest'}
                  stackId="2"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#colorReturns)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        );

      case 'emi': {
        const pieData = [
          { name: 'Principal Amount', value: data.principalAmount, color: '#00E6A7' },
          { name: 'Total Interest', value: data.totalInterest, color: '#3b82f6' },
        ];
        
        return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center font-mono">
            {/* Pie Chart */}
            <div className="col-span-1 md:col-span-4 flex justify-center h-48 sm:h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatRupee(Number(value))} contentStyle={{ backgroundColor: '#0B1736', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', fontSize: '11px', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Yearly Repayment Bar Graph */}
            <div className="col-span-1 md:col-span-8 h-48 sm:h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.yearlyRepayment} margin={{ top: 12, right: 5, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                  <XAxis dataKey="year" fontSize={11} fontFamily="monospace" stroke="#9ca3af" tickLine={false} />
                  <YAxis
                    fontSize={10}
                    fontFamily="monospace"
                    stroke="#9ca3af"
                    tickLine={false}
                    tickFormatter={(val) => `₹${(val / 100000).toFixed(1)}L`}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-brand-panel border border-brand-border text-white p-4.5 rounded-2xl shadow-2xl font-mono text-xs text-left">
                            <p className="font-bold border-b border-white/5 pb-2 mb-2 text-brand-text-muted">Year {label}</p>
                            <div className="space-y-1">
                              <p className="flex justify-between gap-6 py-0.5 text-brand-accent">
                                <span>Principal:</span>
                                <span className="font-bold">{formatRupee(payload[0].value as number)}</span>
                              </p>
                              <p className="flex justify-between gap-6 py-0.5 text-blue-400">
                                <span>Interest:</span>
                                <span className="font-bold">{formatRupee(payload[1].value as number)}</span>
                              </p>
                              <p className="flex justify-between gap-6 border-t border-white/5 pt-2 text-brand-text-secondary mt-1">
                                <span>Outstanding:</span>
                                <span className="font-bold text-white">{formatRupee(data.yearlyRepayment[Number(label)-1]?.outstandingBalance)}</span>
                              </p>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar name="Principal Paid" dataKey="principalPaid" stackId="a" fill="#00E6A7" />
                  <Bar name="Interest Paid" dataKey="interestPaid" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      }

      case 'cagr':
        return (
          <div className="h-72 sm:h-80 w-full font-mono" id="cagr-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 12, right: 10, left: -5, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCagr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E6A7" stopOpacity={0.18}/>
                    <stop offset="95%" stopColor="#00E6A7" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="year" fontSize={11} fontFamily="monospace" stroke="#9ca3af" tickLine={false} />
                <YAxis
                  fontSize={10}
                  fontFamily="monospace"
                  stroke="#9ca3af"
                  tickLine={false}
                  tickFormatter={(val) => `₹${(val / 100000).toFixed(1)}L`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-brand-panel border border-brand-border text-white p-3.5 rounded-2xl shadow-2xl font-mono text-xs text-left">
                          <p className="text-brand-text-muted mb-1.5 border-b border-white/5 pb-1">Period: Year {label}</p>
                          <p className="text-brand-accent font-extrabold">Value: {formatRupee(payload[0].value as number)}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" name="Portfolio Value" dataKey="value" stroke="#00E6A7" strokeWidth={2.5} fill="url(#colorCagr)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        );

      case 'tax': {
        const barData = [
          { name: 'Old Regime', 'Total Tax': data.oldRegimeTotalTax, color: '#3b82f6' },
          { name: 'New Regime', 'Total Tax': data.newRegimeTotalTax, color: '#00E6A7' },
        ];
        return (
          <div className="h-72 sm:h-80 w-full font-mono" id="tax-chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} barSize={44} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="name" fontSize={11} fontWeight="bold" stroke="#FFFFFF" tickLine={false} />
                <YAxis
                  fontSize={10}
                  fontFamily="monospace"
                  stroke="#9ca3af"
                  tickLine={false}
                  tickFormatter={(val) => `₹${(val / 100000).toFixed(1)}L`}
                />
                <Tooltip
                  formatter={(value) => formatRupee(Number(value))}
                  contentStyle={{ backgroundColor: '#0B1736', borderColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '16px', fontSize: '11px', fontFamily: 'monospace', color: '#fff' }}
                  labelStyle={{ color: '#9CA3AF', fontWeight: 'bold' }}
                />
                <Bar name="Total Tax Liability" dataKey="Total Tax" radius={[8, 8, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="bg-brand-panel border border-brand-border rounded-3xl p-7 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-4 mb-6 gap-3 text-left">
        <div>
          <h3 className="text-base font-bold text-white font-sans uppercase tracking-wider">
            Visual Analytics Curve
          </h3>
          <span className="text-xs font-mono text-brand-text-secondary block mt-1 font-semibold">
            {type === 'tax' ? 'Regime Comparison' : 'Growth & Amortization Progression'}
          </span>
        </div>

        {/* Dynamic Badge indicating a favorable choice */}
        {type === 'tax' && (
          <span className="bg-brand-accent/10 border border-brand-accent/25 text-brand-accent text-[11px] font-mono font-bold uppercase py-1.5 px-4.5 rounded-full flex items-center justify-center">
            {data.taxSavingsNewVsOld > 0 ? `Save ${formatRupee(data.taxSavingsNewVsOld)} with ${data.betterRegime}` : 'No Difference'}
          </span>
        )}
      </div>

      <div className="py-2.5">
        {renderChart()}
      </div>
    </div>
  );
}
