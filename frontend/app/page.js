"use client";

import { useState } from "react";
import {
  Activity,
  BarChart3,
  Bell,
  Bot,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Crown,
  Download,
  Gauge,
  Globe2,
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
  Zap,
} from "lucide-react";

const sidebarGroups = [
  {
    title: "Workspace",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, active: true },
      { label: "Strategies", icon: WandSparkles },
      { label: "Campaigns", icon: Rocket },
      { label: "AI Intelligence", icon: Sparkles, badge: "New" },
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

const integrations = [
  { label: "Google Ads", short: "G", className: "google" },
  { label: "Meta Ads", short: "M", className: "meta" },
  { label: "Shopify", short: "S", className: "shopify" },
  { label: "GA4", short: "A", className: "analytics" },
];

const metrics = [
  {
    label: "Revenue",
    value: "$24,540",
    change: "↑ 18.6%",
    detail: "vs last 30 days",
    icon: CircleDollarSign,
    tone: "violet",
    chart: "2,29 12,26 22,28 32,23 42,25 52,19 62,22 72,15 82,17 92,11 102,14 112,8",
  },
  {
    label: "ROAS",
    value: "3.80x",
    change: "↑ 15.3%",
    detail: "vs last 30 days",
    icon: TrendingUp,
    tone: "green",
    chart: "2,28 12,26 22,27 32,22 42,23 52,18 62,20 72,14 82,16 92,10 102,12 112,7",
  },
  {
    label: "Ad Spend",
    value: "$6,452",
    change: "↑ 12.4%",
    detail: "vs last 30 days",
    icon: Activity,
    tone: "blue",
    chart: "2,29 12,27 22,25 32,26 42,21 52,22 62,17 72,19 82,13 92,15 102,9 112,7",
  },
  {
    label: "CTR",
    value: "2.45%",
    change: "↑ 8.7%",
    detail: "vs last 30 days",
    icon: MousePointerClick,
    tone: "violet",
    chart: "2,28 12,25 22,26 32,21 42,23 52,16 62,19 72,12 82,15 92,9 102,11 112,6",
  },
  {
    label: "CPC",
    value: "$0.68",
    change: "↓ 9.2%",
    detail: "vs last 30 days",
    icon: Search,
    tone: "orange",
    negative: true,
    chart: "2,12 12,15 22,13 32,18 42,16 52,21 62,19 72,23 82,21 92,25 102,22 112,27",
  },
  {
    label: "CPA",
    value: "$18.72",
    change: "↓ 11.9%",
    detail: "vs last 30 days",
    icon: Users,
    tone: "yellow",
    negative: true,
    chart: "2,13 12,16 22,14 32,19 42,17 52,22 62,20 72,24 82,22 92,26 102,23 112,27",
  },
];

const priorities = [
  {
    rank: 1,
    title: "Fix Landing Page Speed",
    subtitle: "Potential revenue increase",
    impact: "High Impact",
    revenue: "+$2,420",
    icon: Rocket,
  },
  {
    rank: 2,
    title: "Launch TikTok Campaign",
    subtitle: "Potential revenue increase",
    impact: "High Impact",
    revenue: "+$1,890",
    icon: Zap,
  },
  {
    rank: 3,
    title: "Increase Google Ads Budget",
    subtitle: "Potential revenue increase",
    impact: "Medium Impact",
    revenue: "+$1,350",
    icon: Search,
  },
];

const strategies = [
  {
    platform: "M",
    platformClass: "meta",
    title: "E-commerce Growth Strategy",
    country: "United States",
    budget: "$2,500",
    goal: "Sales",
    score: 92,
    created: "2 days ago",
  },
  {
    platform: "T",
    platformClass: "tiktok",
    title: "TikTok Scaling Strategy",
    country: "United States",
    budget: "$1,800",
    goal: "Leads",
    score: 88,
    created: "5 days ago",
  },
  {
    platform: "G",
    platformClass: "google",
    title: "Google Ads Optimization",
    country: "United States",
    budget: "$1,200",
    goal: "Sales",
    score: 85,
    created: "1 week ago",
  },
];

function Brand() {
  return (
    <div className="brand">
      <div className="brand-mark">
        <span className="brand-orbit brand-orbit-one" />
        <span className="brand-orbit brand-orbit-two" />
        <strong>A</strong>
      </div>

      <div className="brand-copy">
        <strong>AdLens</strong>
        <span>AI Marketing Intelligence</span>
      </div>
    </div>
  );
}

function Sidebar({ open, onClose }) {
  return (
    <>
      <button
        type="button"
        className={`sidebar-overlay ${open ? "visible" : ""}`}
        onClick={onClose}
        aria-label="Close navigation"
      />

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <Brand />

          <button
            type="button"
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="sidebar-scroll">
          {sidebarGroups.map((group) => (
            <section className="sidebar-group" key={group.title}>
              <span className="sidebar-group-title">{group.title}</span>

              <nav className="sidebar-nav">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      type="button"
                      className={`sidebar-item ${
                        item.active ? "active" : ""
                      }`}
                      key={item.label}
                    >
                      <Icon size={16} strokeWidth={1.8} />

                      <span>{item.label}</span>

                      {item.badge && (
                        <small className="sidebar-badge">{item.badge}</small>
                      )}
                    </button>
                  );
                })}
              </nav>
            </section>
          ))}

          <div className="premium-panel">
            <div className="premium-title">
              <div className="premium-icon">
                <Crown size={18} />
              </div>

              <strong>Go Premium</strong>
            </div>

            <p>
              Unlock full power of AdLens. Unlimited strategies, advanced
              insights, priority support and more.
            </p>

            <button type="button">
              Upgrade Plan
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        <div className="sidebar-profile">
          <div className="profile-avatar">MA</div>

          <div className="profile-copy">
            <strong>Muhammed Ali</strong>
            <span>Premium Member</span>
          </div>

          <ChevronDown size={15} />
        </div>
      </aside>
    </>
  );
}

function Topbar({ onOpenSidebar }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="mobile-menu"
          onClick={onOpenSidebar}
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>

        <div className="welcome-copy">
          <h1>
            Good evening, Muhammed! <span>👋</span>
          </h1>

          <p>Your business is outperforming 87% of similar businesses.</p>
        </div>
      </div>

      <div className="topbar-actions">
        <button type="button" className="topbar-button date-action">
          <CalendarDays size={15} />
          <span>May 6 – Jun 5, 2026</span>
          <ChevronDown size={13} />
        </button>

        <button type="button" className="topbar-button export-action">
          <Download size={15} />
          <span>Export Report</span>
        </button>

        <button type="button" className="new-strategy-button">
          <Plus size={16} />
          <span>New Strategy</span>
        </button>

        <button
          type="button"
          className="notification-button"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span>3</span>
        </button>

        <div className="integrations">
          {integrations.map((integration) => (
            <div className="integration-item" key={integration.label}>
              <div
                className={`integration-logo ${integration.className}`}
              >
                {integration.short}
              </div>

              <div>
                <strong>{integration.label}</strong>
                <span>Connected</span>
              </div>
            </div>
          ))}
        </div>

        <button type="button" className="topbar-profile">
          <div className="profile-avatar">MA</div>
          <ChevronDown size={14} />
        </button>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="hero-section dashboard-card">
      <div className="hero-revenue">
        <div className="hero-labels">
          <span className="hero-pill">Since joining AdLens</span>

          <span className="health-pill">
            <ShieldCheck size={13} />
            Business Health
            <strong>87/100</strong>
          </span>
        </div>

        <div className="revenue-value">
          <small>+</small>
          <strong>$10,340</strong>
        </div>

        <h2>Revenue Generated</h2>
        <p>Since you joined on May 6, 2026</p>

        <div className="confidence-pill">
          <Lightbulb size={14} />
          AI Confidence Average: 94%
        </div>

        <div className="energy-wave">
          <span className="wave wave-one" />
          <span className="wave wave-two" />
          <span className="wave wave-three" />
          <span className="wave wave-four" />
          <i className="wave-light light-one" />
          <i className="wave-light light-two" />
          <i className="wave-light light-three" />
        </div>
      </div>

      <div className="hero-performance">
        <article>
          <strong>+$7,180</strong>
          <span>Estimated Profit</span>
          <b>↑ 68%</b>
          <small>vs Apr 5 – May 5</small>
        </article>

        <article>
          <strong>146x</strong>
          <span>ROI</span>
          <b>$148.58 per $1 spent</b>
        </article>

        <article>
          <strong>-$12.68</strong>
          <span>Lower CPA</span>
          <b>↓ 31%</b>
          <small>vs Apr 5 – May 5</small>
        </article>

        <article>
          <strong>+72%</strong>
          <span>Revenue Growth</span>
          <b>↑ 72%</b>
          <small>vs Apr 5 – May 5</small>
        </article>
      </div>

      <div className="hero-side">
        <article className="goal-card">
          <div className="side-card-heading">
            <span>Monthly Goal</span>
            <button type="button">Edit Goal</button>
          </div>

          <div className="goal-value">
            <strong>$24,540</strong>
            <span>/ $50,000</span>
          </div>

          <div className="goal-progress-row">
            <div className="goal-progress">
              <span />
            </div>

            <strong>49%</strong>
          </div>

          <small>22 days left in this month</small>
        </article>

        <article className="opportunity-card">
          <div className="side-card-heading">
            <span>
              Opportunity Score
              <i>i</i>
            </span>

            <Lightbulb size={15} />
          </div>

          <div className="opportunity-values">
            <div>
              <span>Potential Revenue</span>
              <strong>$39,800</strong>
            </div>

            <div>
              <span>Opportunity Left</span>
              <strong>+$15,260</strong>
            </div>
          </div>

          <svg
            className="opportunity-chart"
            viewBox="0 0 200 28"
            preserveAspectRatio="none"
          >
            <polyline points="0,19 10,17 20,20 30,16 40,18 50,15 60,19 70,17 80,18 90,13 100,15 110,11 120,13 130,10 140,12 150,8 160,10 170,7 180,9 190,5 200,6" />
          </svg>
        </article>
      </div>
    </section>
  );
}

function MetricCard({ metric }) {
  const Icon = metric.icon;

  return (
    <article className={`metric-card dashboard-card ${metric.tone}`}>
      <div className="metric-heading">
        <div className="metric-icon">
          <Icon size={18} />
        </div>

        <span>{metric.label}</span>
      </div>

      <strong className="metric-value">{metric.value}</strong>

      <div className="metric-change">
        <b className={metric.negative ? "negative" : ""}>{metric.change}</b>
        <span>{metric.detail}</span>
      </div>

      <svg viewBox="0 0 114 32" preserveAspectRatio="none">
        <polyline points={metric.chart} />
      </svg>
    </article>
  );
}

function RevenueChart() {
  return (
    <section className="revenue-chart-card dashboard-card">
      <div className="section-heading">
        <div>
          <h3>
            Revenue Impact Over Time
            <span className="information-dot">i</span>
          </h3>

          <div className="chart-legend">
            <span>
              <i className="legend-line baseline" />
              Without AdLens (baseline)
            </span>

            <span>
              <i className="legend-square violet" />
              With AdLens
            </span>

            <span>
              <i className="legend-square green" />
              AdLens-attributed uplift
            </span>
          </div>
        </div>

        <button type="button" className="period-button">
          Last 30 days
          <ChevronDown size={13} />
        </button>
      </div>

      <div className="revenue-chart-layout">
        <div className="revenue-chart-visual">
          <svg viewBox="0 0 690 205" preserveAspectRatio="none">
            {[35, 77, 119, 161].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="690"
                y2={y}
                className="chart-grid-line"
              />
            ))}

            <line
              x1="185"
              y1="12"
              x2="185"
              y2="190"
              className="started-line"
            />

            <text x="135" y="18" className="started-label">
              Started using AdLens
            </text>

            <polyline
              className="revenue-line baseline-line"
              points="18,154 60,148 100,145 145,140 185,138 225,136 265,134 305,131 345,129 385,126 425,122 465,119 505,116 545,112 585,107 625,102 670,96"
            />

            <polyline
              className="revenue-line violet-line"
              points="18,135 60,118 100,105 145,110 185,92 225,80 265,84 305,68 345,62 385,48 425,54 465,45 505,30 545,36 585,24 625,12 670,5"
            />

            <polyline
              className="revenue-line green-line"
              points="18,154 60,148 100,143 145,137 185,127 225,120 265,112 305,105 345,98 385,84 425,86 465,77 505,63 545,58 585,46 625,34 670,21"
            />

            {[
              [18, 135],
              [60, 118],
              [100, 105],
              [145, 110],
              [185, 92],
              [225, 80],
              [265, 84],
              [305, 68],
              [345, 62],
              [385, 48],
              [425, 54],
              [465, 45],
              [505, 30],
              [545, 36],
              [585, 24],
              [625, 12],
              [670, 5],
            ].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" className="violet-point" />
            ))}

            {[
              [18, 154],
              [60, 148],
              [100, 143],
              [145, 137],
              [185, 127],
              [225, 120],
              [265, 112],
              [305, 105],
              [345, 98],
              [385, 84],
              [425, 86],
              [465, 77],
              [505, 63],
              [545, 58],
              [585, 46],
              [625, 34],
              [670, 21],
            ].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" className="green-point" />
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
          <span>With AdLens</span>
          <strong className="violet-text">$24,540</strong>

          <span>Without AdLens</span>
          <strong>$17,360</strong>

          <span>Difference</span>
          <strong className="green-text">+$7,180</strong>

          <b>(+41.4%)</b>
        </aside>
      </div>

      <button type="button" className="section-link">
        View Detailed Analytics
        <ChevronRight size={14} />
      </button>
    </section>
  );
}

function PrioritiesCard() {
  return (
    <section className="priorities-card dashboard-card">
      <div className="section-heading priorities-heading">
        <div>
          <h3>Top 3 AI Priorities</h3>
          <p>Recommended actions with the highest revenue impact.</p>
        </div>

        <button type="button" className="view-all-button">
          View All
        </button>
      </div>

      <div className="priorities-list">
        {priorities.map((priority) => {
          const Icon = priority.icon;

          return (
            <article key={priority.rank}>
              <div className={`priority-rank rank-${priority.rank}`}>
                {priority.rank}
              </div>

              <div className="priority-icon">
                <Icon size={18} />
              </div>

              <div className="priority-copy">
                <strong>{priority.title}</strong>
                <span>{priority.subtitle}</span>
              </div>

              <div className="priority-impact">
                <span>{priority.impact}</span>
                <strong>{priority.revenue}</strong>
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
    <section className="strategies-card dashboard-card">
      <div className="section-heading">
        <div>
          <h3>Recent Strategies</h3>
        </div>

        <button type="button" className="view-all-button">
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

        {strategies.map((strategy) => (
          <article className="strategy-row" key={strategy.title}>
            <div className="strategy-title">
              <div
                className={`strategy-platform ${strategy.platformClass}`}
              >
                {strategy.platform}
              </div>

              <strong>{strategy.title}</strong>
            </div>

            <span className="strategy-country">
              <Globe2 size={13} />
              {strategy.country}
            </span>

            <span>{strategy.budget}</span>
            <span>{strategy.goal}</span>

            <strong className="strategy-score">{strategy.score}</strong>

            <span>{strategy.created}</span>

            <ChevronRight size={15} />
          </article>
        ))}
      </div>
    </section>
  );
}

function CopilotCard() {
  const [message, setMessage] = useState("");

  const questions = [
    "Why is my ROAS decreasing?",
    "Which channel has best ROI?",
    "How can I improve my ad creative?",
    "What budget should I use?",
  ];

  return (
    <section className="copilot-card dashboard-card">
      <div className="section-heading">
        <div className="copilot-heading">
          <div className="copilot-logo">
            <Bot size={18} />
          </div>

          <h3>
            AI Copilot
            <span>Beta</span>
          </h3>
        </div>

        <button type="button" className="view-all-button">
          View All
        </button>
      </div>

      <div className="question-chips">
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
        className="copilot-form"
        onSubmit={(event) => {
          event.preventDefault();
          setMessage("");
        }}
      >
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Ask anything about your marketing..."
        />

        <button type="submit" aria-label="Send message">
          <Send size={17} />
        </button>
      </form>

      <div className="copilot-footer">
        <span>Powered by AdLens AI</span>
        <span>99% accuracy</span>
        <span>ⓘ</span>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="adlens-app">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="main-content">
        <Topbar onOpenSidebar={() => setSidebarOpen(true)} />

        <div className="dashboard-container">
          <HeroSection />

          <section className="metrics-grid">
            {metrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </section>

          <section className="analytics-grid">
            <RevenueChart />
            <PrioritiesCard />
          </section>

          <section className="dashboard-bottom-grid">
            <RecentStrategies />
            <CopilotCard />
          </section>
        </div>
      </main>
    </div>
  );
}