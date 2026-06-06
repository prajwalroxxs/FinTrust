import { LearnArticle } from '../types';

export const LEARN_ARTICLES: LearnArticle[] = [
  {
    id: 'sip-vs-fd',
    slug: 'sip-vs-fd',
    title: 'SIP vs. Fixed Deposit (FD): Which is Better for You?',
    subtitle: 'A detailed comparative analysis between systematic equity investments and traditional fixed deposits.',
    readTime: '6 min read',
    date: 'June 3, 2026',
    category: 'Investment',
    tags: ['SIP', 'Fixed Deposit', 'Wealth Creation', 'Risk Management'],
    summary: 'Deciding between physical compounding security (FD) and high-growth systematic wealth generation (SIP)? Read this complete comparison of returns, inflation-beating power, tax efficiency, and liquidity to make an informed choice.',
    content: `
      <h2>Introduction</h2>
      <p>When it comes to putting your hard-earned money to work in India, two of the most popular avenues are <strong>Systematic Investment Plans (SIPs)</strong> in mutual funds and <strong>Fixed Deposits (FDs)</strong>. While both offer ways to build wealth, they cater to radically different investor psychologies, timelines, and financial goals.</p>
      
      <p>This article parses through the differences, highlighting performance benchmarks, tax implications, and asset safety to help you decide which belongs in your portfolio.</p>

      <h2>What is an FD?</h2>
      <p>A <strong>Fixed Deposit (FD)</strong> is a debt instrument offered by banks and non-banking financial companies (NBFCs). You invest a lump sum for a specific tenure at a guaranteed, locked interest rate. Under Section 80C, some five-year "tax-saver FDs" also offer deductions from your income tax.</p>
      
      <h3>Key Benefits of FDs:</h3>
      <ul>
        <li><strong>Guaranteed Return:</strong> The interest rate remains immune to market volatility.</li>
        <li><strong>Capital Protection:</strong> Up to ₹5 Lakhs per bank is insured by the Deposit Insurance and Credit Guarantee Corporation (DICGC).</li>
        <li><strong>Predictability:</strong> You know exactly what your maturity amount will be from day one.</li>
      </ul>

      <h2>What is a SIP?</h2>
      <p>A <strong>Systematic Investment Plan (SIP)</strong> is a method of investing a fixed amount of money at regular intervals (usually monthly) into mutual funds, primarily equity-oriented funds. Rather than timing the market, you practice rupee cost averaging.</p>

      <h3>Key Benefits of SIPs:</h3>
      <ul>
        <li><strong>Rupee Cost Average:</strong> When markets are high, you buy fewer mutual fund units. When markets dip, you automatically buy more units, lowering your average cost.</li>
        <li><strong>Inflation-Beating Returns:</strong> Over long-term horizons (7+ years), equity dynamic SIPs historically generate inflation-adjusted returns of 12% to 15%, whereas FDs generally hover between 6% and 7.5%.</li>
        <li><strong>Power of Compounding:</strong> Reinvested compounding gains generate higher exponential profits over longer horizons.</li>
      </ul>

      <h2>Direct Comparison metrics</h2>
      <table class="w-full border-collapse my-6">
        <thead>
          <tr class="bg-gray-100 dark:bg-slate-800 text-left border-b border-gray-200">
            <th class="p-3 font-semibold text-sm">Feature</th>
            <th class="p-3 font-semibold text-sm">Fixed Deposit (FD)</th>
            <th class="p-3 font-semibold text-sm">SIP (Equity Mutual Fund)</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 dark:divide-slate-700">
          <tr>
            <td class="p-3 font-medium text-sm">Returns Rate</td>
            <td class="p-3 text-sm">Locked (6.0% - 7.5% p.a.)</td>
            <td class="p-3 text-sm">Market-linked (Historically 12% - 15% long term)</td>
          </tr>
          <tr>
            <td class="p-3 font-medium text-sm">Risk Level</td>
            <td class="p-3 text-sm">Virtually Zero</td>
            <td class="p-3 text-sm">Moderate to High in short term, reduces long term</td>
          </tr>
          <tr>
            <td class="p-3 font-medium text-sm">Inflation Guard</td>
            <td class="p-3 text-sm">Pre-tax interest often falls short of real inflation</td>
            <td class="p-3 text-sm">Strong historical tracker for long-term real growth</td>
          </tr>
          <tr>
            <td class="p-3 font-medium text-sm">Tax Treatment</td>
            <td class="p-3 text-sm">Interest taxed under standard slab rate</td>
            <td class="p-3 text-sm">LTGC (Capital Gains) taxed at 12.5% beyond ₹1.25L profit</td>
          </tr>
          <tr>
            <td class="p-3 font-medium text-sm">Investment Style</td>
            <td class="p-3 text-sm">One-time Lump sum</td>
            <td class="p-3 text-sm">Recurring weekly/monthly</td>
          </tr>
        </tbody>
      </table>

      <h2>Taxation Nuance</h2>
      <p>Many investors ignore tax leakage when comparing returns. FD interest is added to your total income and taxed at your applicable tax slab (which can be as high as 30% plus cess). If you fall in a higher tax bracket, your post-tax FD return is heavily diminished.</p>
      
      <p>On the other hand, Equity Mutual Fund growth inside a SIP is exempt from tax until redemption. Upon exit, gains are treated as Short-Term Capital Gains (STCG) taxed at 20% (if held under 1 year) or Long-Term Capital Gains (LTCG) taxed at a very favorable 12.5% (with an annual exemption of up to ₹1.25 Lakhs) if held for over 1 year.</p>

      <h2>The Verdict: Which is better?</h2>
      <p>If you have short-term goals (under 3 years) or require absolute capital security for emergency reserves, a <strong>Fixed Deposit</strong> is the right tool.</p>
      
      <p>However, if you are building wealth for retirement, high-quality milestones, or family goals 5+ years out, a <strong>SIP</strong> remains the absolute champion for beating inflation and accumulating compounding wealth in India.</p>
    `,
  },
  {
    id: 'how-much-sip-for-1-crore',
    slug: 'how-much-sip-for-1-crore',
    title: 'How Much SIP is Needed to Reach ₹1 Crore?',
    subtitle: 'The math, timeframes, and strategies required to build a ₹10,000,000 portfolio.',
    readTime: '5 min read',
    date: 'June 3, 2026',
    category: 'Planning',
    tags: ['Crore Club', 'SIP Math', 'Financial Freedom', 'Compounding'],
    summary: 'Building a portfolio of ₹1 Crore is a dream for many Indian investors. Discover the exact monthly SIP amounts required to cross this milestone in 10, 15, or 20 years at different potential rate returns.',
    content: `
      <h2>Introduction</h2>
      <p>The "₹1 Crore" target represents a psychological and technical milestone of financial security for Indian retail investors. Thanks to the power of compounding, achieving this does not require a windfall. It requires systematic, disciplined monthly commitments.</p>

      <p>Below we break down the exact mathematics of how much you need to invest monthly to construct a solid ₹1 Crore corpus under varying return projections.</p>

      <h2>The 15-15-15 Rule</h2>
      <p>In the Indian mutual fund industry, a famous thumb rule is the <strong>15-15-15 rule</strong>. It states: </p>
      <blockquote class="border-l-4 border-emerald-500 pl-4 py-1 my-4 italic text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-800 rounded">
        "Investing ₹15,000 a month for 15 years at an expected compounding return of 15% per annum yields exactly ₹1 Crore."
      </blockquote>

      <p>Let's look at the math details:
        <ul>
          <li>Monthly payout: <strong>₹15,000</strong></li>
          <li>Tenure: <strong>15 Years</strong> (180 months)</li>
          <li>Total Investment: <strong>₹27,00,000</strong></li>
          <li>Estimated Profit: <strong>₹73,27,000</strong></li>
          <li>Maturity Value: <strong>₹1,00,27,000</strong></li>
        </ul>
        More than 73% of your final corpus comes directly from compounding growth rather than your out-of-pocket investment!
      </p>

      <h2>SIP vs Time: Monthly Investment Matrix</h2>
      <p>Because compounding operates exponentially rather than linearly, the duration of your investment matters far more than the exact amount. See below the monthly SIP required to hit ₹1 Crore depending on your time horizon at an expected <strong>12% p.a.</strong> return rate:</p>

      <table class="w-full border-collapse my-6">
        <thead>
          <tr class="bg-gray-100 dark:bg-slate-800 text-left border-b border-gray-200">
            <th class="p-3 font-semibold text-sm">Tenure (Years)</th>
            <th class="p-3 font-semibold text-sm">Monthly SIP Required (at 12% Return)</th>
            <th class="p-3 font-semibold text-sm">Your Total Principal Outlay</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 dark:divide-slate-700">
          <tr>
            <td class="p-3 font-medium text-sm">10 Years</td>
            <td class="p-3 text-sm">₹43,500 / month</td>
            <td class="p-3 text-sm">₹52,20,000</td>
          </tr>
          <tr>
            <td class="p-3 font-medium text-sm">15 Years</td>
            <td class="p-3 text-sm">₹20,000 / month</td>
            <td class="p-3 text-sm">₹36,00,000</td>
          </tr>
          <tr>
            <td class="p-3 font-medium text-sm">20 Years</td>
            <td class="p-3 text-sm">₹10,100 / month</td>
            <td class="p-3 text-sm">₹24,24,000</td>
          </tr>
          <tr>
            <td class="p-3 font-medium text-sm">25 Years</td>
            <td class="p-3 text-sm">₹5,300 / month</td>
            <td class="p-3 text-sm">₹15,90,000</td>
          </tr>
          <tr>
            <td class="p-3 font-medium text-sm">30 Years</td>
            <td class="p-3 text-sm">₹2,860 / month</td>
            <td class="p-3 text-sm">₹10,29,600</td>
          </tr>
        </tbody>
      </table>

      <h2>The Cost of Delaying</h2>
      <p>If you delay starting your SIP by just 5 years, the cost is staggering. Standard projections illustrate that starting at age 25 with a minor monthly budget accumulates ₹1 Crore with ease, whereas starting at 35 or 40 requires high, sometimes unrealistic capital amounts to make up for lost time.</p>

      <h2>Pro Tip: Step-Up your SIP</h2>
      <p>If you cannot afford ₹20,000 a month today, do not lose hope! By starting with a lower base (e.g., ₹8,000) and increasing your SIP by <strong>10% every year</strong> (matching salary hikes), you can comfortably slash your path to ₹1 Crore in nearly the same duration. This is called a **Step-Up SIP** strategy, and remains the single most powerful tool for retail wage earners.</p>
    `,
  },
];
