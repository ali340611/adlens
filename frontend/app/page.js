"use client";

import { useState } from "react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Bot,
  BrainCircuit,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Crown,
  Download,
  Gauge,
  Globe2,
  Image,
  LayoutDashboard,
  Lightbulb,
  LineChart,
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

const menuGroups = [
  {
    title: "Workspace",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, active: true },
      { label: "Strategies", icon: BrainCircuit },
      { label: "Campaigns", icon: Rocket },
      { label: "AI Intelligence", icon: Sparkles, badge: "New" },
      { label: "Competitors", icon: Users },
      { label: "Website Analyzer", icon: Gauge },
      { label: "Audience Builder", icon: Target },
      { label: "Creative Studio", icon: WandSparkles },
      { label: "Reports", icon: BarChart3 },
      { label: "Settings", icon: Settings },
    ],
  },
  {
    title: "AI Tools",
    items: [
      { label: "AI Copilot", icon: Bot, badge: "Beta" },
      { label: "Ad Copy Generator", icon: MessageSquareText },
      { label: "Creative Generator", icon: Image },
      { label: "Budget Simulator", icon: CircleDollarSign },
    ],
  },
];

const metrics = [
  {
    label: "Revenue",
    value: "$24,540",
    change: "+18.4%",
    icon: CircleDollarSign,
    tone: "purple",
    points: "0,28 12,26 24,27 36,20 48,22 60,15 72,17 84,10 96,13 108,5",
  },
  {
    label: "ROAS",
    value: "3.80x",
    change: "+16.2%",
    icon: TrendingUp,
    tone: "green",
    points: "0,27 12,29 24,23 36,24 48,18 60,20 72,13 84,15 96,8 108,5",
  },
  {
    label: "Ad Spend",
    value: "$6,452",
    change: "+12.4%",
    icon: Activity,
    tone: "blue",
    points: "0,27 12,25 24,26 36,21 48,23 60,17 72,18 84,12 96,13 108,7",
  },
  {
    label: "CTR",
    value: "2.45%",
    change: "+7.8%",
    icon: MousePointerClick,
    tone: "purple",
    points: "0,28 12,24 24,25 36,19 48,21 60,14 72,16 84,9 96,11 108,5",
  },
  {
    label: "CPC",
    value: "$0.68",
    change: "-9.2%",
    icon: Search,
    tone: "orange",
    points: "0,5 12,8 24,10 36,13 48,15 60,18 72,20 84,23 96,25 108,28",
  },
  {
    label: "CPA",
    value: "$18.72",
    change: "-11.7%",
    icon: Target,
    tone: "orange",
    points: "0,6 12,7 24,11 36,12 48,16 60,17 72,21 84,23 96,25 108,29",
  },
];

const priorities = [
  {
    number: 1,
    icon: Rocket,
    title: "Improve landing-page speed",
    subtitle: "Potential revenue increase",
    impact: "High impact",
    amount: "+$2,420",
  },
  {
    number: 2,
    icon: Zap,
    title: "Launch TikTok campaign",
    subtitle: "Potential revenue increase",
    impact: "High impact",
    amount: "+$1,890",
  },
  {
    number: 3,
    icon: Search,
    title: "Increase Google Ads budget",
    subtitle: "Potential revenue increase",
    impact: "Medium impact",
    amount: "+$1,350",
  },
];

const strategies = [
  {
    icon: "M",
    className: "meta",
    title: "E-commerce Growth Strategy",
    country: "United States",
    budget: "$2,500",
    goal: "Sales",
    score: 92,
    time: "2 days ago",
  },
  {
    icon: "T",
    className: "tiktok",
    title: "TikTok Scaling Strategy",
    country: "United States",
    budget: "$1,800",
    goal: "Leads",
    score: 88,
    time: "5 days ago",
  },
  {
    icon: "G",
    className: "google",
    title: "Google Ads Optimization",
    country: "United States",
    budget: "$1,400",
    goal: "Sales",
    score: 85,
    time: "1 week ago",
  },
];

function Logo() {
  return (
    <div className="brand">
      <div className="brand-mark">
        <span />
        <strong>A</strong>
      </div>

      <div className="brand-text">
        <strong>AdLens</strong>
        <span>AI Marketing Intelligence</span>
      </div>
    </div>
  );
}

function Sidebar({ open, close }) {
  return (
    <>
      <button
        type="button"
        className={`backdrop ${open ? "visible" : ""}`}
        onClick={close}
        aria-label="Close navigation"
      />

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <Logo />

          <button
            type="button"
            className="sidebar-close"
            onClick={close}
            aria-label="Close menu"
          >
            <X size={17} />
          </button>
        </div>

        <div className="sidebar-content">
          {menuGroups.map((group) => (
            <section className="menu-group" key={group.title}>
              <span className="menu-title">{group.title}</span>

              <nav>
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      type="button"
                      key={item.label}
                      className={`menu-item ${item.active ? "active" : ""}`}
                    >
                      <Icon size={15} strokeWidth={1.8} />

                      <span>{item.label}</span>

                      {item.badge && (
                        <small className="menu-badge">{item.badge}</small>
                      )}
                    </button>
                  );
                })}
              </nav>
            </section>
          ))}

          <div className="premium-card">
            <div className="premium-icon">
              <Crown size={16} />
            </div>

            <div>
              <strong>Go Premium</strong>
              <p>Unlock full AI power, advanced insights and priority support.</p>

              <button type="button">
                Upgrade plan
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>

        <div className="sidebar-profile">
          <div className="avatar">MA</div>

          <div>
            <strong>Muhammed Ali</strong>
            <span>Premium member</span>
          </div>

          <ChevronDown size={14} />
        </div>
      </aside>
    </>
  );
}

function Header({ openMenu }) {
  return (
    <header className="header">
      <div className="header-left">
        <button
          type="button"
          className="mobile-menu"
          onClick={openMenu}
          aria-label="Open menu"
        >
          <Menu size={19} />
        </button>

        <div className="welcome">
          <h1>
            Good evening, Muhammed! <span>👋</span>
          </h1>
          <p>Your business is outperforming 87% of similar businesses.</p>
        </div>
      </div>

      <div className="header-actions">
        <button type="button" className="header-button date-button">
          <CalendarDays size={14} />
          May 6 – Jun 5, 2026
          <ChevronDown size={12} />
        </button>

        <button type="button" className="header-button export-button">
          <Download size={14} />
          Export report
        </button>

        <button type="button" className="new-strategy">
          <Plus size={15} />
          New strategy
        </button>

        <button type="button" className="notification">
          <Bell size={16} />
          <span>3</span>
        </button>

        <div className="header-profile">
          <div className="avatar">MA</div>
          <ChevronDown size={13} />
        </div>
      </div>
    </header>
  );
}

function RevenueHero() {
  return (
    <section className="hero card">
      <div className="hero-main">
        <div className="hero-meta">
          <span>Since joining AdLens</span>

          <span>
            <ShieldCheck size={12} />
            Business health
            <strong>87/100</strong>
          </span>
        </div>

        <div className="hero-value">
          <small>+</small>
          <strong>$10,340</strong>
        </div>

        <h3>Revenue generated</h3>
        <p>Since you joined on May 6, 2026</p>

        <div className="confidence">
          <Sparkles size={12} />
          AI confidence average
          <strong>94%</strong>
        </div>

        <div className="hero-wave">
          <span className="wave-one" />
          <span className="wave-two" />
          <span className="wave-three" />
        </div>
      </div>

      <div className="hero-stats">
        <article>
          <strong>+$7,180</strong>
          <span>Estimated profit</span>
          <small className="positive">
            <ArrowUpRight size={11} />
            68%
          </small>
        </article>

        <article>
          <strong>146x</strong>
          <span>ROI</span>
          <small>$1,610 per $1 spent</small>
        </article>

        <article>
          <strong>-$12.68</strong>
          <span>Lower CPA</span>
          <small className="positive">31%</small>
        </article>

        <article>
          <strong>+72%</strong>
          <span>Revenue growth</span>
          <small className="positive">
            <ArrowUpRight size={11} />
            72%
          </small>
        </article>
      </div>

      <div className="goal-panel">
        <div className="goal-heading">
          <div>
            <span>Monthly goal</span>
            <strong>$24,540</strong>
          </div>

          <button type="button">Edit goal</button>
        </div>

        <div className="goal-copy">
          <span>$24,540 / $50,000</span>
          <strong>49%</strong>
        </div>

        <div className="progress">
          <span />
        </div>

        <small>22 days left in this month</small>

        <div className="goal-divider" />

        <div className="opportunity-title">
          <span>Opportunity score</span>
          <Lightbulb size={13} />
        </div>

        <div className="opportunity-values">
          <div>
            <span>Potential revenue</span>
            <strong>$39,800</strong>
          </div>

          <div>
            <span>Opportunity left</span>
            <strong>+$15,260</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ item }) {
  const Icon = item.icon;

  return (
    <article className={`metric card ${item.tone}`}>
      <div className="metric-top">
        <div className="metric-icon">
          <Icon size={15} />
        </div>

        <span className="metric-change">
          <ArrowUpRight size={10} />
          {item.change}
        </span>
      </div>

      <span className="metric-label">{item.label}</span>
      <strong className="metric-value">{item.value}</strong>
      <small>vs. previous period</small>

      <svg viewBox="0 0 108 32" preserveAspectRatio="none">
        <polyline points={item.points} />
      </svg>
    </article>
  );
}

function RevenueChart() {
  return (
    <section className="chart-card card">
      <div className="section-header">
        <div>
          <h2>Revenue impact over time</h2>

          <div className="legend">
            <span>
              <i className="gray-dot" />
              Without AdLens
            </span>

            <span>
              <i className="purple-dot" />
              With AdLens
            </span>

            <span>
              <i className="green-dot" />
              AI-optimized growth
            </span>
          </div>
        </div>

        <button type="button">
          Last 30 days
          <ChevronDown size={12} />
        </button>
      </div>

      <div className="chart-content">
        <div className="chart-visual">
          <svg viewBox="0 0 620 176" preserveAspectRatio="none">
            <defs>
              <linearGradient id="purpleArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="greenArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
              </linearGradient>
            </defs>

            {[28, 62, 96, 130, 164].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="620"
                y2={y}
                className="grid-line"
              />
            ))}

            <path
              d="M0 151 C55 148 78 144 115 139 C160 132 182 125 230 119 C272 111 310 106 350 98 C397 90 430 84 470 76 C520 66 570 57 620 49 L620 176 L0 176 Z"
              fill="url(#purpleArea)"
            />

            <path
              d="M0 151 C45 143 84 134 120 126 C165 117 195 105 235 94 C280 81 312 72 350 61 C395 48 430 38 475 28 C525 18 570 11 620 6 L620 176 L0 176 Z"
              fill="url(#greenArea)"
            />

            <path
              d="M0 151 C70 149 105 146 150 142 C205 138 250 135 300 130 C370 124 430 119 490 115 C545 111 585 108 620 105"
              className="line gray"
            />

            <path
              d="M0 151 C55 148 78 144 115 139 C160 132 182 125 230 119 C272 111 310 106 350 98 C397 90 430 84 470 76 C520 66 570 57 620 49"
              className="line purple"
            />

            <path
              d="M0 151 C45 143 84 134 120 126 C165 117 195 105 235 94 C280 81 312 72 350 61 C395 48 430 38 475 28 C525 18 570 11 620 6"
              className="line green"
            />
          </svg>

          <div className="chart-dates">
            <span>May 6</span>
            <span>May 13</span>
            <span>May 20</span>
            <span>May 27</span>
            <span>Jun 5</span>
          </div>
        </div>

        <div className="chart-summary">
          <span>With AdLens</span>
          <strong className="purple-text">$24,540</strong>

          <span>Without AdLens</span>
          <strong>$17,360</strong>

          <span>Difference</span>
          <strong className="positive">+$7,180</strong>

          <small>+41.4%</small>
        </div>
      </div>

      <button type="button" className="detail-link">
        View detailed analytics
        <ArrowRight size={12} />
      </button>
    </section>
  );
}

function Priorities() {
  return (
    <section className="priority-card card">
      <div className="section-header">
        <div>
          <h2>Top 3 AI priorities</h2>
          <p>Recommended actions with the highest revenue impact.</p>
        </div>

        <button type="button" className="view-link">
          View all
        </button>
      </div>

      <div className="priority-list">
        {priorities.map((item) => {
          const Icon = item.icon;

          return (
            <article key={item.number}>
              <div className={`priority-number number-${item.number}`}>
                {item.number}
              </div>

              <div className="priority-icon">
                <Icon size={14} />
              </div>

              <div className="priority-copy">
                <strong>{item.title}</strong>
                <span>{item.subtitle}</span>
              </div>

              <div className="priority-value">
                <span>{item.impact}</span>
                <strong>{item.amount}</strong>
              </div>

              <ChevronRight size={14} />
            </article>
          );
        })}
      </div>

      <button type="button" className="review-button">
        Review recommendations
        <ArrowRight size={13} />
      </button>
    </section>
  );
}

function RecentStrategies() {
  return (
    <section className="strategies-card card">
      <div className="section-header">
        <div>
          <h2>Recent strategies</h2>
          <p>Your latest AI-generated marketing strategies.</p>
        </div>

        <button type="button" className="view-link">
          View all
        </button>
      </div>

      <div className="strategy-head">
        <span>Strategy</span>
        <span>Country</span>
        <span>Budget</span>
        <span>Goal</span>
        <span>AI score</span>
        <span />
      </div>

      {strategies.map((item) => (
        <article className="strategy-row" key={item.title}>
          <div className="strategy-name">
            <div className={`channel-icon ${item.className}`}>{item.icon}</div>

            <div>
              <strong>{item.title}</strong>
              <span>{item.time}</span>
            </div>
          </div>

          <span className="country">
            <Globe2 size={11} />
            {item.country}
          </span>

          <span>{item.budget}</span>
          <span>{item.goal}</span>

          <div className="score">
            <strong>{item.score}</strong>
          </div>

          <ChevronRight size={14} />
        </article>
      ))}
    </section>
  );
}

function Copilot() {
  const [message, setMessage] = useState("");

  return (
    <section className="copilot-card card">
      <div className="section-header">
        <div className="copilot-title">
          <div className="copilot-icon">
            <Bot size={16} />
          </div>

          <div>
            <h2>
              AI Copilot
              <small>Beta</small>
            </h2>
            <p>Ask anything about your marketing performance.</p>
          </div>
        </div>

        <button type="button" className="view-link">
          View all
        </button>
      </div>

      <div className="chips">
        <button type="button" onClick={() => setMessage("Why is my ROAS decreasing?")}>
          Why is my ROAS decreasing?
        </button>

        <button type="button" onClick={() => setMessage("Which channel performed best?")}>
          Which channel performed best?
        </button>

        <button type="button" onClick={() => setMessage("How can I improve my creatives?")}>
          How can I improve my creatives?
        </button>

        <button type="button" onClick={() => setMessage("What budget should I use?")}>
          What budget should I use?
        </button>
      </div>

      <div className="insight">
        <div>
          <Sparkles size={14} />
        </div>

        <p>
          <strong>Today&apos;s insight</strong>
          Your Meta campaigns generated 31% more conversions after the latest
          audience update.
        </p>
      </div>

      <form
        className="copilot-input"
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

        <button type="submit">
          <Send size={14} />
        </button>
      </form>

      <div className="copilot-footer">
        <span>Powered by AdLens AI</span>
        <span>89% accuracy</span>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app">
      <Sidebar
        open={sidebarOpen}
        close={() => setSidebarOpen(false)}
      />

      <main className="main">
        <Header openMenu={() => setSidebarOpen(true)} />

        <div className="dashboard">
          <RevenueHero />

          <section className="metrics-grid">
            {metrics.map((item) => (
              <MetricCard key={item.label} item={item} />
            ))}
          </section>

          <section className="middle-grid">
            <RevenueChart />
            <Priorities />
          </section>

          <section className="bottom-grid">
            <RecentStrategies />
            <Copilot />
          </section>
        </div>
      </main>

      <style jsx global>{`
        :root {
          color-scheme: dark;
          --bg: #05050a;
          --sidebar: #080810;
          --card: #0d0c17;
          --card-2: #100e1d;
          --border: rgba(255, 255, 255, 0.075);
          --border-purple: rgba(139, 92, 246, 0.28);
          --text: #f7f5ff;
          --muted: #777385;
          --muted-2: #aaa6b7;
          --purple: #8b5cf6;
          --purple-2: #6d28d9;
          --green: #2ee59d;
          --orange: #fb923c;
          --sidebar-width: 188px;
        }

        * {
          box-sizing: border-box;
        }

        html,
        body {
          min-width: 320px;
          min-height: 100%;
          margin: 0;
          background: var(--bg);
        }

        body {
          overflow-x: hidden;
          color: var(--text);
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        button,
        input {
          font: inherit;
        }

        button {
          color: inherit;
        }

        .app {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 58% -20%,
              rgba(124, 58, 237, 0.11),
              transparent 34%
            ),
            var(--bg);
        }

        .sidebar {
          position: fixed;
          z-index: 60;
          inset: 0 auto 0 0;
          display: flex;
          width: var(--sidebar-width);
          flex-direction: column;
          border-right: 1px solid var(--border);
          background:
            radial-gradient(
              circle at 35% 10%,
              rgba(124, 58, 237, 0.09),
              transparent 28%
            ),
            rgba(7, 7, 14, 0.98);
          backdrop-filter: blur(22px);
        }

        .sidebar-header {
          display: flex;
          height: 62px;
          align-items: center;
          justify-content: space-between;
          padding: 0 13px;
          border-bottom: 1px solid var(--border);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .brand-mark {
          position: relative;
          display: grid;
          width: 31px;
          height: 31px;
          place-items: center;
          overflow: hidden;
          border: 1px solid rgba(196, 181, 253, 0.3);
          border-radius: 9px;
          background: linear-gradient(145deg, #8b5cf6, #5b21b6);
          box-shadow: 0 0 22px rgba(124, 58, 237, 0.28);
        }

        .brand-mark span {
          position: absolute;
          width: 24px;
          height: 10px;
          border: 1px solid rgba(255, 255, 255, 0.58);
          border-radius: 999px;
          transform: rotate(45deg);
        }

        .brand-mark span::after {
          position: absolute;
          inset: -1px;
          border: 1px solid rgba(255, 255, 255, 0.58);
          border-radius: inherit;
          content: "";
          transform: rotate(90deg);
        }

        .brand-mark strong {
          position: relative;
          z-index: 2;
          font-size: 13px;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-text strong {
          font-size: 13px;
          letter-spacing: -0.03em;
        }

        .brand-text span {
          margin-top: 2px;
          color: #646071;
          font-size: 5px;
        }

        .sidebar-close {
          display: none;
          width: 28px;
          height: 28px;
          place-items: center;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: transparent;
        }

        .sidebar-content {
          flex: 1;
          overflow-y: auto;
          padding: 12px 9px;
          scrollbar-width: thin;
        }

        .menu-group + .menu-group {
          margin-top: 16px;
        }

        .menu-title {
          display: block;
          margin: 0 8px 6px;
          color: #4c4857;
          font-size: 6px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .menu-item {
          display: flex;
          width: 100%;
          height: 30px;
          align-items: center;
          gap: 8px;
          margin-bottom: 2px;
          padding: 0 8px;
          border: 1px solid transparent;
          border-radius: 7px;
          background: transparent;
          color: #858191;
          cursor: pointer;
          text-align: left;
        }

        .menu-item > span {
          flex: 1;
          overflow: hidden;
          font-size: 8px;
          font-weight: 500;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .menu-item:hover {
          background: rgba(255, 255, 255, 0.035);
          color: #d8d4df;
        }

        .menu-item.active {
          border-color: rgba(139, 92, 246, 0.2);
          background: linear-gradient(
            90deg,
            rgba(124, 58, 237, 0.4),
            rgba(124, 58, 237, 0.13)
          );
          color: #ffffff;
          box-shadow: inset 2px 0 #9d6bff;
        }

        .menu-badge {
          padding: 2px 5px;
          border: 1px solid rgba(167, 139, 250, 0.18);
          border-radius: 999px;
          background: rgba(124, 58, 237, 0.15);
          color: #c4b5fd;
          font-size: 5px;
          font-weight: 800;
          text-transform: uppercase;
        }

        .premium-card {
          display: flex;
          gap: 8px;
          margin-top: 14px;
          padding: 11px 9px;
          border: 1px solid rgba(139, 92, 246, 0.24);
          border-radius: 10px;
          background:
            radial-gradient(
              circle at 90% 0,
              rgba(124, 58, 237, 0.25),
              transparent 45%
            ),
            rgba(47, 24, 89, 0.35);
        }

        .premium-icon {
          display: grid;
          width: 26px;
          height: 26px;
          flex: 0 0 auto;
          place-items: center;
          border: 1px solid rgba(250, 204, 21, 0.2);
          border-radius: 8px;
          background: rgba(250, 204, 21, 0.08);
          color: #facc15;
        }

        .premium-card strong {
          font-size: 8px;
        }

        .premium-card p {
          margin: 5px 0 8px;
          color: #7c7788;
          font-size: 6px;
          line-height: 1.45;
        }

        .premium-card button {
          display: flex;
          width: 100%;
          height: 25px;
          align-items: center;
          justify-content: center;
          gap: 5px;
          border: 1px solid rgba(167, 139, 250, 0.22);
          border-radius: 7px;
          background: linear-gradient(135deg, #7c3aed, #5b21b6);
          font-size: 6px;
          font-weight: 800;
        }

        .sidebar-profile {
          display: flex;
          min-height: 58px;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border-top: 1px solid var(--border);
        }

        .avatar {
          display: grid;
          width: 28px;
          height: 28px;
          flex: 0 0 auto;
          place-items: center;
          border: 1px solid rgba(196, 181, 253, 0.32);
          border-radius: 50%;
          background: linear-gradient(145deg, #7c3aed, #312e81);
          color: #ffffff;
          font-size: 7px;
          font-weight: 800;
        }

        .sidebar-profile > div:nth-child(2) {
          display: flex;
          min-width: 0;
          flex: 1;
          flex-direction: column;
        }

        .sidebar-profile strong {
          overflow: hidden;
          font-size: 7px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .sidebar-profile span {
          margin-top: 3px;
          color: #625e6e;
          font-size: 6px;
        }

        .sidebar-profile svg {
          color: #625e6e;
        }

        .main {
          min-width: 0;
          margin-left: var(--sidebar-width);
        }

        .header {
          position: sticky;
          z-index: 40;
          top: 0;
          display: flex;
          height: 62px;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 0 15px;
          border-bottom: 1px solid var(--border);
          background: rgba(5, 5, 10, 0.87);
          backdrop-filter: blur(20px);
        }

        .header-left,
        .header-actions {
          display: flex;
          align-items: center;
        }

        .header-left {
          min-width: 0;
          gap: 10px;
        }

        .header-actions {
          flex: 0 0 auto;
          gap: 6px;
        }

        .mobile-menu {
          display: none;
          width: 31px;
          height: 31px;
          place-items: center;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.025);
        }

        .welcome h1 {
          margin: 0;
          font-size: 12px;
          letter-spacing: -0.025em;
        }

        .welcome p {
          margin: 4px 0 0;
          color: #6f6b7a;
          font-size: 6px;
        }

        .header-button,
        .new-strategy {
          display: flex;
          height: 30px;
          align-items: center;
          gap: 6px;
          padding: 0 9px;
          border-radius: 7px;
          cursor: pointer;
          font-size: 7px;
          white-space: nowrap;
        }

        .header-button {
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.02);
          color: #aaa6b5;
        }

        .new-strategy {
          border: 1px solid rgba(167, 139, 250, 0.3);
          background: linear-gradient(135deg, #8b5cf6, #6d28d9);
          box-shadow: 0 7px 20px rgba(124, 58, 237, 0.22);
          font-weight: 700;
        }

        .notification {
          position: relative;
          display: grid;
          width: 30px;
          height: 30px;
          place-items: center;
          border: 1px solid var(--border);
          border-radius: 7px;
          background: rgba(255, 255, 255, 0.02);
        }

        .notification span {
          position: absolute;
          top: -4px;
          right: -4px;
          display: grid;
          width: 14px;
          height: 14px;
          place-items: center;
          border: 2px solid var(--bg);
          border-radius: 50%;
          background: #ef4444;
          font-size: 5px;
          font-weight: 800;
        }

        .header-profile {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #646071;
        }

        .dashboard {
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
          padding: 12px 14px 18px;
        }

        .card {
          border: 1px solid var(--border);
          border-radius: 10px;
          background:
            linear-gradient(
              145deg,
              rgba(17, 15, 30, 0.96),
              rgba(9, 9, 16, 0.98)
            ),
            var(--card);
          box-shadow:
            0 16px 40px rgba(0, 0, 0, 0.18),
            inset 0 1px rgba(255, 255, 255, 0.015);
        }

        .hero {
          display: grid;
          min-height: 172px;
          overflow: hidden;
          grid-template-columns: 1.12fr 1.45fr 0.88fr;
        }

        .hero-main {
          position: relative;
          display: flex;
          min-width: 0;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
          padding: 17px 19px;
          border-right: 1px solid var(--border);
          background:
            radial-gradient(
              circle at 30% 90%,
              rgba(124, 58, 237, 0.28),
              transparent 42%
            ),
            linear-gradient(
              135deg,
              rgba(124, 58, 237, 0.12),
              transparent 60%
            );
        }

        .hero-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 9px;
          color: #777283;
          font-size: 6px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .hero-meta span:last-child {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          letter-spacing: 0;
          text-transform: none;
        }

        .hero-meta svg,
        .hero-meta strong {
          color: var(--green);
        }

        .hero-value {
          display: flex;
          align-items: flex-start;
          margin-top: 13px;
          letter-spacing: -0.055em;
        }

        .hero-value small {
          margin: 3px 4px 0 0;
          color: #aaa6b4;
          font-size: 14px;
        }

        .hero-value strong {
          font-size: clamp(30px, 3.3vw, 46px);
          font-weight: 650;
          line-height: 0.95;
        }

        .hero-main h3 {
          margin: 9px 0 0;
          font-size: 9px;
        }

        .hero-main > p {
          margin: 4px 0 0;
          color: #777282;
          font-size: 6px;
        }

        .confidence {
          display: flex;
          width: fit-content;
          align-items: center;
          gap: 5px;
          margin-top: 13px;
          padding: 5px 7px;
          border: 1px solid rgba(139, 92, 246, 0.14);
          border-radius: 6px;
          background: rgba(124, 58, 237, 0.07);
          color: #777282;
          font-size: 6px;
        }

        .confidence svg,
        .confidence strong {
          color: #ad86ff;
        }

        .hero-wave {
          position: absolute;
          right: -25px;
          bottom: -35px;
          left: -20px;
          height: 85px;
          opacity: 0.7;
          transform: rotate(-4deg);
        }

        .hero-wave span {
          position: absolute;
          right: 0;
          left: 0;
          height: 28px;
          border: 2px solid rgba(139, 92, 246, 0.44);
          border-radius: 50%;
          filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.42));
        }

        .wave-one {
          bottom: 0;
        }

        .wave-two {
          bottom: 13px;
          opacity: 0.55;
        }

        .wave-three {
          bottom: 26px;
          opacity: 0.28;
        }

        .hero-stats {
          display: grid;
          min-width: 0;
          grid-template-columns: repeat(4, 1fr);
          align-items: center;
        }

        .hero-stats article {
          display: flex;
          min-width: 0;
          min-height: 78px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 10px 6px;
          border-right: 1px solid var(--border);
          text-align: center;
        }

        .hero-stats article:last-child {
          border-right: 0;
        }

        .hero-stats strong {
          font-size: 13px;
          letter-spacing: -0.03em;
        }

        .hero-stats span {
          margin-top: 6px;
          color: #9691a1;
          font-size: 6px;
        }

        .hero-stats small {
          display: flex;
          align-items: center;
          gap: 2px;
          margin-top: 5px;
          color: #666272;
          font-size: 5px;
        }

        .positive {
          color: var(--green) !important;
        }

        .goal-panel {
          display: flex;
          min-width: 0;
          flex-direction: column;
          justify-content: center;
          padding: 15px 16px;
          border-left: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.01);
        }

        .goal-heading,
        .goal-copy,
        .opportunity-title,
        .opportunity-values {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .goal-heading > div {
          display: flex;
          flex-direction: column;
        }

        .goal-heading span,
        .opportunity-title span {
          color: #8e8999;
          font-size: 7px;
          font-weight: 700;
        }

        .goal-heading strong {
          margin-top: 5px;
          font-size: 13px;
        }

        .goal-heading button {
          border: 0;
          background: transparent;
          color: #a77cff;
          font-size: 6px;
        }

        .goal-copy {
          margin-top: 11px;
          color: #6b6677;
          font-size: 6px;
        }

        .goal-copy strong {
          color: #c7c2cf;
        }

        .progress {
          height: 4px;
          margin-top: 6px;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
        }

        .progress span {
          display: block;
          width: 49%;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #6d28d9, #a855f7);
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
        }

        .goal-panel > small {
          margin-top: 6px;
          color: #5d5968;
          font-size: 5px;
        }

        .goal-divider {
          height: 1px;
          margin: 12px 0 9px;
          background: var(--border);
        }

        .opportunity-title svg {
          color: #facc15;
        }

        .opportunity-values {
          margin-top: 8px;
        }

        .opportunity-values div {
          display: flex;
          flex-direction: column;
        }

        .opportunity-values div:last-child {
          text-align: right;
        }

        .opportunity-values span {
          color: #6a6675;
          font-size: 5px;
        }

        .opportunity-values strong {
          margin-top: 4px;
          font-size: 10px;
        }

        .opportunity-values div:last-child strong {
          color: var(--green);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 8px;
          margin-top: 8px;
        }

        .metric {
          position: relative;
          min-width: 0;
          min-height: 104px;
          overflow: hidden;
          padding: 9px 10px;
        }

        .metric-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .metric-icon {
          display: grid;
          width: 24px;
          height: 24px;
          place-items: center;
          border: 1px solid rgba(139, 92, 246, 0.16);
          border-radius: 7px;
          background: rgba(124, 58, 237, 0.1);
          color: #a78bfa;
        }

        .metric.green .metric-icon {
          border-color: rgba(46, 229, 157, 0.15);
          background: rgba(46, 229, 157, 0.08);
          color: var(--green);
        }

        .metric.blue .metric-icon {
          border-color: rgba(56, 189, 248, 0.15);
          background: rgba(56, 189, 248, 0.08);
          color: #38bdf8;
        }

        .metric.orange .metric-icon {
          border-color: rgba(251, 146, 60, 0.15);
          background: rgba(251, 146, 60, 0.08);
          color: var(--orange);
        }

        .metric-change {
          display: flex;
          align-items: center;
          gap: 2px;
          color: var(--green);
          font-size: 6px;
          font-weight: 700;
        }

        .metric-label {
          display: block;
          margin-top: 8px;
          color: #777282;
          font-size: 6px;
        }

        .metric-value {
          display: block;
          margin-top: 3px;
          font-size: 14px;
          letter-spacing: -0.035em;
        }

        .metric > small {
          display: block;
          margin-top: 3px;
          color: #5f5a69;
          font-size: 5px;
        }

        .metric svg {
          position: absolute;
          right: 8px;
          bottom: 7px;
          width: 48%;
          height: 24px;
          overflow: visible;
        }

        .metric polyline {
          fill: none;
          stroke: #8b5cf6;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 4px rgba(139, 92, 246, 0.35));
        }

        .metric.green polyline {
          stroke: var(--green);
        }

        .metric.blue polyline {
          stroke: #38bdf8;
        }

        .metric.orange polyline {
          stroke: var(--orange);
        }

        .middle-grid,
        .bottom-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.52fr) minmax(280px, 0.83fr);
          gap: 8px;
          margin-top: 8px;
        }

        .chart-card,
        .priority-card,
        .strategies-card,
        .copilot-card {
          min-width: 0;
          padding: 11px 12px;
        }

        .section-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
        }

        .section-header h2 {
          margin: 0;
          font-size: 9px;
          letter-spacing: -0.02em;
        }

        .section-header p {
          margin: 4px 0 0;
          color: #666171;
          font-size: 5px;
        }

        .section-header > button:not(.view-link) {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 6px;
          border: 1px solid var(--border);
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.02);
          color: #777282;
          font-size: 5px;
        }

        .legend {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 7px;
          color: #696473;
          font-size: 5px;
        }

        .legend span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .legend i {
          width: 5px;
          height: 5px;
          border-radius: 50%;
        }

        .gray-dot {
          background: #64748b;
        }

        .purple-dot {
          background: #8b5cf6;
        }

        .green-dot {
          background: #22c55e;
        }

        .chart-content {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 86px;
          gap: 8px;
          margin-top: 6px;
        }

        .chart-visual {
          min-width: 0;
        }

        .chart-visual > svg {
          display: block;
          width: 100%;
          height: 134px;
        }

        .grid-line {
          stroke: rgba(255, 255, 255, 0.045);
          stroke-width: 1;
        }

        .line {
          fill: none;
          stroke-width: 2.1;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .line.gray {
          stroke: #64748b;
          stroke-dasharray: 5 5;
        }

        .line.purple {
          stroke: #8b5cf6;
        }

        .line.green {
          stroke: #22c55e;
        }

        .chart-dates {
          display: flex;
          justify-content: space-between;
          padding: 1px 2px 0;
          color: #555160;
          font-size: 5px;
        }

        .chart-summary {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 8px;
          border: 1px solid var(--border);
          border-radius: 7px;
          background: rgba(255, 255, 255, 0.015);
        }

        .chart-summary span {
          color: #65616f;
          font-size: 5px;
        }

        .chart-summary strong {
          margin: 3px 0 7px;
          font-size: 9px;
        }

        .purple-text {
          color: #aa80ff;
          font-size: 11px !important;
        }

        .chart-summary small {
          color: var(--green);
          font-size: 6px;
          font-weight: 800;
        }

        .detail-link,
        .view-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 0;
          border: 0;
          background: transparent;
          color: #9f74ff;
          font-size: 5px;
          font-weight: 700;
        }

        .detail-link {
          margin-top: 6px;
        }

        .priority-list {
          margin-top: 7px;
          border-top: 1px solid var(--border);
        }

        .priority-list article {
          display: grid;
          min-height: 47px;
          grid-template-columns: 18px 28px minmax(0, 1fr) auto 13px;
          align-items: center;
          gap: 7px;
          border-bottom: 1px solid var(--border);
        }

        .priority-number {
          display: grid;
          width: 16px;
          height: 16px;
          place-items: center;
          border-radius: 50%;
          background: rgba(239, 68, 68, 0.11);
          color: #fb7185;
          font-size: 5px;
          font-weight: 800;
        }

        .number-2 {
          background: rgba(251, 146, 60, 0.11);
          color: #fb923c;
        }

        .number-3 {
          background: rgba(250, 204, 21, 0.11);
          color: #facc15;
        }

        .priority-icon {
          display: grid;
          width: 26px;
          height: 26px;
          place-items: center;
          border: 1px solid rgba(139, 92, 246, 0.16);
          border-radius: 7px;
          background: rgba(124, 58, 237, 0.08);
          color: #a78bfa;
        }

        .priority-copy {
          display: flex;
          min-width: 0;
          flex-direction: column;
        }

        .priority-copy strong {
          overflow: hidden;
          font-size: 6px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .priority-copy span {
          margin-top: 3px;
          overflow: hidden;
          color: #605c6a;
          font-size: 5px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .priority-value {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .priority-value span {
          color: #fb7185;
          font-size: 5px;
        }

        .priority-value strong {
          margin-top: 3px;
          color: var(--green);
          font-size: 7px;
        }

        .priority-list svg:last-child {
          color: #4e4a58;
        }

        .review-button {
          display: flex;
          width: 100%;
          height: 25px;
          align-items: center;
          justify-content: center;
          gap: 5px;
          margin-top: 8px;
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 6px;
          background: linear-gradient(90deg, #5b21b6, #7c3aed);
          font-size: 6px;
          font-weight: 800;
        }

        .bottom-grid {
          grid-template-columns: minmax(0, 1.48fr) minmax(280px, 0.87fr);
        }

        .strategy-head,
        .strategy-row {
          display: grid;
          min-width: 560px;
          grid-template-columns:
            minmax(185px, 1.65fr)
            minmax(105px, 0.85fr)
            58px
            48px
            52px
            12px;
          align-items: center;
          gap: 8px;
        }

        .strategy-head {
          min-height: 25px;
          margin-top: 6px;
          color: #4f4b58;
          font-size: 5px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .strategies-card {
          overflow-x: auto;
        }

        .strategy-row {
          min-height: 42px;
          border-top: 1px solid var(--border);
          color: #8f8a99;
          font-size: 6px;
        }

        .strategy-name {
          display: flex;
          min-width: 0;
          align-items: center;
          gap: 7px;
        }

        .strategy-name > div:last-child {
          display: flex;
          min-width: 0;
          flex-direction: column;
        }

        .strategy-name strong {
          overflow: hidden;
          color: #e5e1eb;
          font-size: 6px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .strategy-name span {
          margin-top: 3px;
          color: #5e5a68;
          font-size: 5px;
        }

        .channel-icon {
          display: grid;
          width: 23px;
          height: 23px;
          flex: 0 0 auto;
          place-items: center;
          border-radius: 6px;
          font-size: 7px;
          font-weight: 800;
        }

        .channel-icon.meta {
          background: rgba(34, 197, 94, 0.1);
          color: var(--green);
        }

        .channel-icon.tiktok {
          background: rgba(56, 189, 248, 0.1);
          color: #38bdf8;
        }

        .channel-icon.google {
          background: rgba(250, 204, 21, 0.1);
          color: #facc15;
        }

        .country {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .score {
          display: flex;
          align-items: center;
        }

        .score strong {
          display: grid;
          width: 21px;
          height: 21px;
          place-items: center;
          border: 1px solid rgba(46, 229, 157, 0.22);
          border-radius: 50%;
          color: var(--green);
          font-size: 5px;
        }

        .copilot-title {
          display: flex;
          align-items: flex-start;
          gap: 7px;
        }

        .copilot-icon {
          display: grid;
          width: 27px;
          height: 27px;
          flex: 0 0 auto;
          place-items: center;
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 8px;
          background: rgba(124, 58, 237, 0.1);
          color: #a78bfa;
        }

        .copilot-title h2 {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .copilot-title h2 small {
          padding: 2px 4px;
          border: 1px solid rgba(139, 92, 246, 0.18);
          border-radius: 999px;
          background: rgba(124, 58, 237, 0.1);
          color: #a87fff;
          font-size: 4px;
          text-transform: uppercase;
        }

        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 9px;
        }

        .chips button {
          padding: 5px 6px;
          border: 1px solid rgba(139, 92, 246, 0.14);
          border-radius: 999px;
          background: rgba(124, 58, 237, 0.055);
          color: #8b8795;
          font-size: 5px;
        }

        .insight {
          display: flex;
          gap: 7px;
          margin-top: 8px;
          padding: 8px;
          border: 1px solid var(--border);
          border-radius: 7px;
          background: rgba(255, 255, 255, 0.015);
        }

        .insight > div {
          display: grid;
          width: 24px;
          height: 24px;
          flex: 0 0 auto;
          place-items: center;
          border: 1px solid rgba(139, 92, 246, 0.16);
          border-radius: 7px;
          background: rgba(124, 58, 237, 0.08);
          color: #a78bfa;
        }

        .insight p {
          margin: 0;
          color: #716c7b;
          font-size: 5px;
          line-height: 1.45;
        }

        .insight strong {
          display: block;
          margin-bottom: 3px;
          color: #d7d2dd;
          font-size: 6px;
        }

        .copilot-input {
          display: flex;
          gap: 5px;
          margin-top: 8px;
        }

        .copilot-input input {
          width: 100%;
          height: 28px;
          min-width: 0;
          padding: 0 8px;
          outline: none;
          border: 1px solid var(--border);
          border-radius: 7px;
          background: rgba(255, 255, 255, 0.02);
          color: #d7d2dd;
          font-size: 6px;
        }

        .copilot-input input:focus {
          border-color: rgba(139, 92, 246, 0.4);
        }

        .copilot-input button {
          display: grid;
          width: 28px;
          height: 28px;
          flex: 0 0 auto;
          place-items: center;
          border: 1px solid rgba(167, 139, 250, 0.24);
          border-radius: 7px;
          background: linear-gradient(135deg, #8b5cf6, #6d28d9);
        }

        .copilot-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 6px;
          color: #4d4956;
          font-size: 4px;
        }

        .backdrop {
          display: none;
        }

        @media (min-width: 1500px) {
          :root {
            --sidebar-width: 205px;
          }

          .dashboard {
            max-width: 1800px;
          }

          .hero {
            min-height: 188px;
          }

          .metric {
            min-height: 112px;
          }

          .chart-visual > svg {
            height: 148px;
          }
        }

        @media (max-width: 1150px) {
          .metrics-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .middle-grid,
          .bottom-grid {
            grid-template-columns: 1fr;
          }

          .hero {
            grid-template-columns: 1fr 1.25fr;
          }

          .goal-panel {
            grid-column: 1 / -1;
            border-top: 1px solid var(--border);
            border-left: 0;
          }
        }

        @media (max-width: 820px) {
          .sidebar {
            width: min(250px, 84vw);
            transform: translateX(-105%);
            transition: transform 180ms ease;
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .sidebar-close {
            display: grid;
          }

          .backdrop {
            position: fixed;
            z-index: 55;
            inset: 0;
            display: block;
            visibility: hidden;
            border: 0;
            background: rgba(0, 0, 0, 0.65);
            opacity: 0;
            transition: 180ms ease;
            backdrop-filter: blur(3px);
          }

          .backdrop.visible {
            visibility: visible;
            opacity: 1;
          }

          .main {
            margin-left: 0;
          }

          .mobile-menu {
            display: grid;
          }

          .date-button,
          .export-button {
            display: none;
          }

          .dashboard {
            padding-inline: 10px;
          }
        }

        @media (max-width: 650px) {
          .header {
            height: 58px;
            padding-inline: 10px;
          }

          .welcome h1 {
            max-width: 170px;
            overflow: hidden;
            font-size: 10px;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .welcome p,
          .header-profile {
            display: none;
          }

          .new-strategy {
            width: 30px;
            padding: 0;
            justify-content: center;
          }

          .new-strategy:not(svg) {
            font-size: 0;
          }

          .new-strategy svg {
            font-size: initial;
          }

          .hero {
            display: flex;
            flex-direction: column;
          }

          .hero-main,
          .goal-panel {
            border-right: 0;
            border-left: 0;
          }

          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .hero-stats article:nth-child(2) {
            border-right: 0;
          }

          .hero-stats article:nth-child(-n + 2) {
            border-bottom: 1px solid var(--border);
          }

          .metrics-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .chart-content {
            grid-template-columns: 1fr;
          }

          .chart-summary {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 5px;
          }

          .chart-summary strong {
            margin-bottom: 0;
          }
        }

        @media (max-width: 420px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .metric {
            min-height: 98px;
          }

          .chart-card,
          .priority-card,
          .strategies-card,
          .copilot-card {
            padding: 10px;
          }

          .priority-list article {
            grid-template-columns: 18px 27px minmax(0, 1fr) 13px;
          }

          .priority-value {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
