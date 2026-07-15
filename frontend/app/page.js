"use client";

import { useMemo, useState } from "react";

import {
  Activity,
  BarChart3,
  Bell,
  Bot,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Crown,
  Download,
  Gauge,
  ImageIcon,
  LayoutDashboard,
  Lightbulb,
  Menu,
  MessageSquareText,
  MousePointerClick,
  Plus,
  Rocket,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  WandSparkles,
  X,
} from "lucide-react";

import {
  SiGoogleads,
  SiGoogleanalytics,
  SiMeta,
  SiShopify,
  SiTiktok,
} from "react-icons/si";

const NAVIGATION = [
  {
    title: "Workspace",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, active: true },
      { label: "Strategies", icon: WandSparkles },
      { label: "Campaigns", icon: Rocket },
      {
        label: "AI Intelligence",
        icon: Sparkles,
        badge: "New",
      },
      { label: "Competitors", icon: Users },
      { label: "Website Analyzer", icon: Gauge },
      { label: "Audience Builder", icon: Target },
      { label: "Creative Studio", icon: ImageIcon },
      { label: "Reports", icon: BarChart3 },
      { label: "Settings", icon: Settings },
    ],
  },
  {
    title: "AI Tools",
    items: [
      { label: "AI Copilot", icon: Bot, badge: "Beta" },
      { label: "Ad Copy Generator", icon: MessageSquareText },
      { label: "Creative Generator", icon: WandSparkles },
      { label: "Budget Simulator", icon: CircleDollarSign },
    ],
  },
];

const CONNECTED_PLATFORMS = [
  {
    label: "Google Ads",
    icon: SiGoogleads,
    className: "google-ads",
  },
  {
    label: "Meta Ads",
    icon: SiMeta,
    className: "meta-ads",
  },
  {
    label: "Shopify",
    icon: SiShopify,
    className: "shopify",
  },
  {
    label: "GA4",
    icon: SiGoogleanalytics,
    className: "analytics",
  },
];

const METRICS = [
  {
    label: "Revenue",
    value: "$24,540",
    change: "↑ 18.6%",
    description: "vs last 30 days",
    icon: CircleDollarSign,
    tone: "purple",
    points:
      "2,27 13,25 24,27 35,21 46,23 57,18 68,20 79,14 90,17 101,10 112,12 124,6",
  },
  {
    label: "ROAS",
    value: "3.80x",
    change: "↑ 15.3%",
    description: "vs last 30 days",
    icon: TrendingUp,
    tone: "green",
    points:
      "2,28 13,26 24,25 35,22 46,24 57,18 68,20 79,15 90,14 101,10 112,11 124,6",
  },
  {
    label: "Ad Spend",
    value: "$6,452",
    change: "↑ 12.4%",
    description: "vs last 30 days",
    icon: Activity,
    tone: "blue",
    points:
      "2,29 13,27 24,25 35,26 46,20 57,22 68,16 79,18 90,13 101,15 112,9 124,7",
  },
  {
    label: "CTR",
    value: "2.45%",
    change: "↑ 8.7%",
    description: "vs last 30 days",
    icon: MousePointerClick,
    tone: "purple",
    points:
      "2,28 13,24 24,26 35,20 46,22 57,16 68,18 79,11 90,14 101,9 112,11 124,5",
  },
  {
    label: "CPC",
    value: "$0.68",
    change: "↓ 9.2%",
    description: "vs last 30 days",
    icon: Search,
    tone: "orange",
    negative: true,
    points:
      "2,11 13,15 24,13 35,18 46,16 57,21 68,19 79,23 90,21 101,25 112,23 124,28",
  },
  {
    label: "CPA",
    value: "$18.72",
    change: "↓ 11.9%",
    description: "vs last 30 days",
    icon: Users,
    tone: "yellow",
    negative: true,
    points:
      "2,12 13,16 24,14 35,19 46,17 57,22 68,20 79,24 90,22 101,26 112,24 124,28",
  },
];

const PRIORITIES = [
  {
    rank: 1,
    title: "Fix Landing Page Speed",
    description: "Potential revenue increase",
    impact: "High Impact",
    value: "+$2,420",
    icon: Rocket,
    type: "lucide",
  },
  {
    rank: 2,
    title: "Launch TikTok Campaign",
    description: "Potential revenue increase",
    impact: "High Impact",
    value: "+$1,890",
    icon: SiTiktok,
    type: "brand",
    className: "tiktok",
  },
  {
    rank: 3,
    title: "Increase Google Ads Budget",
    description: "Potential revenue increase",
    impact: "Medium Impact",
    value: "+$1,350",
    icon: SiGoogleads,
    type: "brand",
    className: "google",
  },
];

const STRATEGIES = [
  {
    title: "E-commerce Growth Strategy",
    icon: SiMeta,
    className: "meta",
    flag: "🇺🇸",
    country: "United States",
    budget: "$2,500",
    goal: "Sales",
    score: 92,
    created: "2 days ago",
  },
  {
    title: "TikTok Scaling Strategy",
    icon: SiTiktok,
    className: "tiktok",
    flag: "🇬🇧",
    country: "United Kingdom",
    budget: "£1,800",
    goal: "Leads",
    score: 88,
    created: "5 days ago",
  },
  {
    title: "Google Ads Optimization",
    icon: SiGoogleads,
    className: "google",
    flag: "🇩🇪",
    country: "Germany",
    budget: "€1,200",
    goal: "Sales",
    score: 85,
    created: "1 week ago",
  },
];

const COUNTRIES = [
  {
    code: "US",
    flag: "🇺🇸",
    name: "United States",
    currency: "USD",
    symbol: "$",
  },
  {
    code: "GB",
    flag: "🇬🇧",
    name: "United Kingdom",
    currency: "GBP",
    symbol: "£",
  },
  {
    code: "DE",
    flag: "🇩🇪",
    name: "Germany",
    currency: "EUR",
    symbol: "€",
  },
  {
    code: "FR",
    flag: "🇫🇷",
    name: "France",
    currency: "EUR",
    symbol: "€",
  },
  {
    code: "IT",
    flag: "🇮🇹",
    name: "Italy",
    currency: "EUR",
    symbol: "€",
  },
  {
    code: "ES",
    flag: "🇪🇸",
    name: "Spain",
    currency: "EUR",
    symbol: "€",
  },
  {
    code: "TR",
    flag: "🇹🇷",
    name: "Türkiye",
    currency: "TRY",
    symbol: "₺",
  },
  {
    code: "AE",
    flag: "🇦🇪",
    name: "United Arab Emirates",
    currency: "AED",
    symbol: "د.إ",
  },
  {
    code: "CA",
    flag: "🇨🇦",
    name: "Canada",
    currency: "CAD",
    symbol: "C$",
  },
  {
    code: "AU",
    flag: "🇦🇺",
    name: "Australia",
    currency: "AUD",
    symbol: "A$",
  },
  {
    code: "JP",
    flag: "🇯🇵",
    name: "Japan",
    currency: "JPY",
    symbol: "¥",
  },
  {
    code: "IN",
    flag: "🇮🇳",
    name: "India",
    currency: "INR",
    symbol: "₹",
  },
];

function Logo() {
  return (
    <div className="brand">
      <div className="brand-logo">
        <span className="brand-orbit brand-orbit-one" />
        <span className="brand-orbit brand-orbit-two" />
        <strong>A</strong>
      </div>

      <div className="brand-text">
        <strong>AdLens</strong>
        <small>AI Marketing Intelligence</small>
      </div>
    </div>
  );
}

function Sidebar({ open, onClose }) {
  return (
    <>
      <button
        type="button"
        className={`mobile-overlay ${open ? "visible" : ""}`}
        onClick={onClose}
        aria-label="Close navigation"
      />

      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <Logo />

          <button
            type="button"
            className="icon-button sidebar-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <div className="sidebar-scroll">
          {NAVIGATION.map((group) => (
            <section className="navigation-group" key={group.title}>
              <span className="navigation-title">{group.title}</span>

              <div className="navigation-items">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      type="button"
                      className={`navigation-item ${
                        item.active ? "navigation-active" : ""
                      }`}
                      key={item.label}
                    >
                      <Icon size={17} strokeWidth={1.9} />

                      <span>{item.label}</span>

                      {item.badge && <small>{item.badge}</small>}
                    </button>
                  );
                })}
              </div>
            </section>
          ))}

          <div className="premium-card">
            <div className="premium-title">
              <span>
                <Crown size={19} />
              </span>

              <strong>Go Premium</strong>
            </div>

            <p>
              Unlock full AdLens intelligence, unlimited strategies,
              advanced insights and priority support.
            </p>

            <button type="button">
              Upgrade Plan
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="sidebar-profile">
          <div className="avatar">MA</div>

          <div>
            <strong>Muhammed Ali</strong>
            <small>Premium Member</small>
          </div>

          <ChevronDown size={15} />
        </div>
      </aside>
    </>
  );
}

function Topbar({ onOpenSidebar, onOpenStrategy }) {
  return (
    <header className="topbar">
      <div className="welcome">
        <button
          type="button"
          className="icon-button mobile-menu"
          onClick={onOpenSidebar}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1>
            Good evening, Muhammed! <span>👋</span>
          </h1>
          <p>Your business is outperforming 87% of similar businesses.</p>
        </div>
      </div>

      <div className="topbar-actions">
        <button type="button" className="secondary-button date-button">
          <CalendarDays size={16} />
          May 6 – Jun 5, 2026
          <ChevronDown size={14} />
        </button>

        <button type="button" className="secondary-button export-button">
          <Download size={16} />
          Export Report
        </button>

        <button
          type="button"
          className="primary-button"
          onClick={onOpenStrategy}
        >
          <Plus size={17} />
          New Strategy
        </button>

        <button
          type="button"
          className="icon-button notification-button"
          aria-label="Notifications"
        >
          <Bell size={19} />
          <i>3</i>
        </button>

        <div className="platform-connections">
          {CONNECTED_PLATFORMS.map((platform) => {
            const Icon = platform.icon;

            return (
              <div
                className={`platform-connection ${platform.className}`}
                key={platform.label}
              >
                <span>
                  <Icon size={18} />
                </span>

                <div>
                  <strong>{platform.label}</strong>
                  <small>Connected</small>
                </div>
              </div>
            );
          })}
        </div>

        <button type="button" className="profile-menu">
          <div className="avatar">MA</div>
          <ChevronDown size={14} />
        </button>
      </div>
    </header>
  );
}

function HeroWave() {
  return (
    <svg
      className="hero-wave"
      viewBox="0 0 620 200"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="heroLineA" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6d28d9" stopOpacity="0" />
          <stop offset="38%" stopColor="#9d5cff" stopOpacity="0.85" />
          <stop offset="58%" stopColor="#ecd6ff" />
          <stop offset="100%" stopColor="#5b21b6" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="heroLineB" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4c1d95" stopOpacity="0" />
          <stop offset="45%" stopColor="#a855f7" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#312e81" stopOpacity="0" />
        </linearGradient>

        <radialGradient id="heroLight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="16%" stopColor="#f2ddff" stopOpacity="0.95" />
          <stop offset="42%" stopColor="#b579ff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="heroHaze" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="230" cy="120" rx="230" ry="120" fill="url(#heroHaze)" />

      <path
        className="hero-wave-line hero-wave-line-a"
        d="M-30 168 C60 176 108 118 176 108 C246 98 258 150 330 132 C398 115 402 60 470 74 C530 87 560 132 650 96"
      />
      <path
        className="hero-wave-line hero-wave-line-b"
        d="M-30 128 C70 108 120 158 200 140 C270 124 300 76 366 96 C424 114 452 158 520 128 C570 106 600 118 650 100"
      />
      <path
        className="hero-wave-line hero-wave-line-c"
        d="M-30 152 C80 140 150 180 224 158 C290 138 316 96 384 112 C446 126 470 90 540 108 C580 118 610 128 650 118"
      />

      <circle cx="245" cy="106" r="34" fill="url(#heroLight)" />
      <circle cx="245" cy="106" r="4.2" fill="#ffffff" />
      <circle cx="470" cy="74" r="2.6" fill="#e9d5ff" opacity="0.85" />
      <circle cx="366" cy="96" r="2" fill="#c084fc" opacity="0.7" />
    </svg>
  );
}

function Hero() {
  const statistics = [
    {
      value: "+$7,180",
      title: "Estimated Profit",
      change: "↑ 68%",
      comparison: "vs Apr 5 – May 5",
    },
    {
      value: "146x",
      title: "ROI",
      change: "$148.58 per $1 spent",
      comparison: "",
    },
    {
      value: "-$12.68",
      title: "Lower CPA",
      change: "↓ 31%",
      comparison: "vs Apr 5 – May 5",
    },
    {
      value: "+72%",
      title: "Revenue Growth",
      change: "↑ 72%",
      comparison: "vs Apr 5 – May 5",
    },
  ];

  return (
    <section className="hero-card">
      <div className="hero-revenue">
        <div className="hero-badges">
          <span>Since joining AdLens</span>

          <span>
            <ShieldCheck size={14} />
            Business Health
            <strong>87/100</strong>
          </span>
        </div>

        <div className="revenue-number">
          <small>+</small>
          <strong>$10,340</strong>
        </div>

        <h2>Revenue Generated</h2>
        <p>Since you joined on May 6, 2026</p>

        <div className="confidence-badge">
          <Lightbulb size={15} />
          AI Confidence Average: 94%
        </div>

        <HeroWave />
      </div>

      <div className="hero-statistics">
        {statistics.map((statistic) => (
          <article key={statistic.title}>
            <strong>{statistic.value}</strong>
            <span>{statistic.title}</span>
            <b>{statistic.change}</b>

            {statistic.comparison && (
              <small>{statistic.comparison}</small>
            )}
          </article>
        ))}
      </div>

      <div className="hero-side">
        <article className="goal-card">
          <div className="card-label-row">
            <strong>Monthly Goal</strong>
            <button type="button">Edit Goal</button>
          </div>

          <div className="goal-value">
            <strong>$24,540</strong>
            <span>/ $50,000</span>
          </div>

          <div className="goal-progress">
            <span>
              <i />
            </span>
            <strong>49%</strong>
          </div>

          <small>22 days left in this month</small>
        </article>

        <article className="opportunity-card">
          <div className="card-label-row">
            <strong>
              Opportunity Score
              <i>i</i>
            </strong>
            <Lightbulb size={16} />
          </div>

          <div className="opportunity-values">
            <div>
              <small>Potential Revenue</small>
              <strong>$39,800</strong>
            </div>

            <div>
              <small>Opportunity Left</small>
              <strong>+$15,260</strong>
            </div>
          </div>

          <svg viewBox="0 0 220 34" preserveAspectRatio="none">
            <polyline points="0,23 12,19 24,22 36,17 48,20 60,16 72,20 84,15 96,17 108,12 120,15 132,10 144,13 156,8 168,11 180,6 198,9 220,5" />
          </svg>
        </article>
      </div>
    </section>
  );
}

function MetricCard({ metric }) {
  const Icon = metric.icon;

  return (
    <article className={`metric-card metric-${metric.tone}`}>
      <div className="metric-title">
        <span>
          <Icon size={18} />
        </span>
        <small>{metric.label}</small>
      </div>

      <strong className="metric-value">{metric.value}</strong>

      <div className="metric-comparison">
        <strong className={metric.negative ? "metric-negative" : ""}>
          {metric.change}
        </strong>
        <small>{metric.description}</small>
      </div>

      <svg viewBox="0 0 126 34" preserveAspectRatio="none">
        <polyline points={metric.points} />
      </svg>
    </article>
  );
}

function RevenueChart() {
  const purplePoints = [
    [20, 137],
    [62, 119],
    [102, 105],
    [144, 111],
    [186, 92],
    [228, 80],
    [270, 85],
    [312, 68],
    [354, 61],
    [396, 48],
    [438, 54],
    [480, 44],
    [522, 30],
    [564, 36],
    [606, 24],
    [648, 12],
    [688, 6],
  ];

  const greenPoints = [
    [20, 155],
    [62, 149],
    [102, 144],
    [144, 138],
    [186, 128],
    [228, 120],
    [270, 113],
    [312, 105],
    [354, 98],
    [396, 84],
    [438, 86],
    [480, 77],
    [522, 63],
    [564, 58],
    [606, 46],
    [648, 34],
    [688, 21],
  ];

  return (
    <section className="dashboard-card revenue-chart-card">
      <div className="section-heading">
        <div>
          <h3>
            Revenue Impact Over Time <i>i</i>
          </h3>

          <div className="chart-legend">
            <span>
              <i className="legend-baseline" />
              Without AdLens
            </span>

            <span>
              <i className="legend-purple" />
              With AdLens
            </span>

            <span>
              <i className="legend-green" />
              AdLens-attributed uplift
            </span>
          </div>
        </div>

        <button type="button">
          Last 30 days
          <ChevronDown size={14} />
        </button>
      </div>

      <div className="chart-content">
        <div className="chart-area">
          <svg viewBox="0 0 710 210" preserveAspectRatio="none">
            {[38, 80, 122, 164].map((y) => (
              <line
                key={y}
                className="chart-grid-line"
                x1="0"
                y1={y}
                x2="710"
                y2={y}
              />
            ))}

            <line
              className="chart-start-line"
              x1="190"
              y1="13"
              x2="190"
              y2="191"
            />

            <text x="135" y="19">
              Started using AdLens
            </text>

            <polyline
              className="chart-baseline"
              points="20,155 62,149 102,146 144,141 186,139 228,137 270,135 312,132 354,130 396,127 438,123 480,120 522,117 564,113 606,108 648,103 688,97"
            />

            <polyline
              className="chart-purple-line"
              points={purplePoints
                .map((point) => point.join(","))
                .join(" ")}
            />

            <polyline
              className="chart-green-line"
              points={greenPoints
                .map((point) => point.join(","))
                .join(" ")}
            />

            {purplePoints.map(([x, y]) => (
              <circle
                key={`purple-${x}`}
                className="chart-purple-point"
                cx={x}
                cy={y}
                r="3.4"
              />
            ))}

            {greenPoints.map(([x, y]) => (
              <circle
                key={`green-${x}`}
                className="chart-green-point"
                cx={x}
                cy={y}
                r="3.4"
              />
            ))}
          </svg>

          <div className="chart-axis">
            <span>May 6</span>
            <span>May 13</span>
            <span>May 20</span>
            <span>May 27</span>
            <span>Jun 3</span>
          </div>
        </div>

        <aside className="chart-summary">
          <small>With AdLens</small>
          <strong className="purple-value">$24,540</strong>

          <small>Without AdLens</small>
          <strong>$17,360</strong>

          <small>Difference</small>
          <strong className="green-value">+$7,180</strong>
          <b>(+41.4%)</b>
        </aside>
      </div>

      <button type="button" className="link-button">
        View Detailed Analytics
        <ChevronRight size={14} />
      </button>
    </section>
  );
}

function Priorities() {
  return (
    <section className="dashboard-card priorities-card">
      <div className="section-heading">
        <div>
          <h3>Top 3 AI Priorities</h3>
          <p>Recommended actions with the highest revenue impact.</p>
        </div>

        <button type="button" className="link-button">
          View All
        </button>
      </div>

      <div className="priority-list">
        {PRIORITIES.map((priority) => {
          const Icon = priority.icon;

          return (
            <article key={priority.rank}>
              <span className={`priority-rank rank-${priority.rank}`}>
                {priority.rank}
              </span>

              <span
                className={`priority-icon ${
                  priority.className ?? ""
                }`}
              >
                <Icon size={19} />
              </span>

              <div className="priority-content">
                <strong>{priority.title}</strong>
                <small>{priority.description}</small>
              </div>

              <div className="priority-impact">
                <small>{priority.impact}</small>
                <strong>{priority.value}</strong>
              </div>

              <ChevronRight size={17} />
            </article>
          );
        })}
      </div>

      <button type="button" className="recommendations-button">
        Review Recommendations
        <ChevronRight size={16} />
      </button>
    </section>
  );
}

function RecentStrategies() {
  return (
    <section className="dashboard-card strategies-card">
      <div className="section-heading">
        <h3>Recent Strategies</h3>

        <button type="button" className="link-button">
          View All
        </button>
      </div>

      <div className="strategy-table">
        <div className="strategy-table-header">
          <span>Strategy</span>
          <span>Country</span>
          <span>Budget</span>
          <span>Goal</span>
          <span>AI Score</span>
          <span>Created</span>
          <span />
        </div>

        {STRATEGIES.map((strategy) => {
          const Icon = strategy.icon;

          return (
            <article key={strategy.title}>
              <div className="strategy-name">
                <span className={`strategy-platform ${strategy.className}`}>
                  <Icon size={16} />
                </span>

                <strong>{strategy.title}</strong>
              </div>

              <span className="country-cell">
                <i>{strategy.flag}</i>
                {strategy.country}
              </span>

              <span>{strategy.budget}</span>
              <span>{strategy.goal}</span>
              <strong className="strategy-score">{strategy.score}</strong>
              <span>{strategy.created}</span>
              <ChevronRight size={15} />
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Copilot() {
  const [message, setMessage] = useState("");

  const questions = [
    "Why is my ROAS decreasing?",
    "Which channel has best ROI?",
    "How can I improve my ad creative?",
    "What budget should I use?",
  ];

  return (
    <section className="dashboard-card copilot-card">
      <div className="section-heading">
        <div className="copilot-heading">
          <span>
            <Bot size={19} />
          </span>

          <h3>
            AI Copilot
            <small>Beta</small>
          </h3>
        </div>

        <button type="button" className="link-button">
          View All
        </button>
      </div>

      <div className="copilot-questions">
        {questions.map((question) => (
          <button
            type="button"
            key={question}
            onClick={() => setMessage(question)}
          >
            {question}
          </button>
        ))}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setMessage("");
        }}
      >
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Ask anything about your marketing..."
        />

        <button type="submit" aria-label="Send message">
          <Send size={17} />
        </button>
      </form>

      <footer>
        <span>Powered by AdLens AI</span>
        <span>99% accuracy</span>
        <span>ⓘ</span>
      </footer>
    </section>
  );
}

function NewStrategyModal({ open, onClose }) {
  const [countryCode, setCountryCode] = useState("US");
  const [product, setProduct] = useState("");
  const [budget, setBudget] = useState("");
  const [goal, setGoal] = useState("Sales");

  const selectedCountry = useMemo(
    () =>
      COUNTRIES.find((country) => country.code === countryCode) ??
      COUNTRIES[0],
    [countryCode],
  );

  if (!open) {
    return null;
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="strategy-modal">
        <div className="modal-heading">
          <div>
            <span>
              <Sparkles size={20} />
            </span>

            <div>
              <h2>Create New Strategy</h2>
              <p>Generate a market-ready AI advertising strategy.</p>
            </div>
          </div>

          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={19} />
          </button>
        </div>

        <div className="strategy-form">
          <label>
            <span>Product or Service</span>
            <input
              type="text"
              value={product}
              onChange={(event) => setProduct(event.target.value)}
              placeholder="e.g. Premium skincare brand"
            />
          </label>

          <label>
            <span>Target Country</span>

            <select
              value={countryCode}
              onChange={(event) => setCountryCode(event.target.value)}
            >
              {COUNTRIES.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name} · {country.currency}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Monthly Budget</span>

            <div className="budget-input">
              <strong>{selectedCountry.symbol}</strong>

              <input
                type="number"
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                placeholder="5000"
              />
            </div>
          </label>

          <label>
            <span>Primary Goal</span>

            <select
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
            >
              <option>Sales</option>
              <option>Leads</option>
              <option>Awareness</option>
              <option>Website Traffic</option>
              <option>App Installs</option>
            </select>
          </label>
        </div>

        <div className="country-preview">
          <span>{selectedCountry.flag}</span>

          <div>
            <strong>{selectedCountry.name}</strong>
            <small>
              {selectedCountry.currency} · {selectedCountry.symbol}
            </small>
          </div>
        </div>

        <button
          type="button"
          className="generate-strategy-button"
          onClick={onClose}
        >
          <Sparkles size={18} />
          Generate Strategy
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [strategyModalOpen, setStrategyModalOpen] = useState(false);

  return (
    <div className="adlens-app">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="main-content">
        <Topbar
          onOpenSidebar={() => setSidebarOpen(true)}
          onOpenStrategy={() => setStrategyModalOpen(true)}
        />

        <div className="dashboard">
          <Hero />

          <section className="metrics-grid">
            {METRICS.map((metric) => (
              <MetricCard metric={metric} key={metric.label} />
            ))}
          </section>

          <section className="dashboard-middle">
            <RevenueChart />
            <Priorities />
          </section>

          <section className="dashboard-bottom">
            <RecentStrategies />
            <Copilot />
          </section>
        </div>
      </main>

      <NewStrategyModal
        open={strategyModalOpen}
        onClose={() => setStrategyModalOpen(false)}
      />
    </div>
  );
}