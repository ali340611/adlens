"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Command,
  Crown,
  DollarSign,
  Download,
  Eye,
  Gauge,
  Globe2,
  Image,
  LayoutDashboard,
  Lightbulb,
  LineChart,
  Menu,
  MessageSquareText,
  MousePointerClick,
  PanelLeftClose,
  PanelLeftOpen,
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

const navigation = [
  {
    title: "Workspace",
    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        active: true,
      },
      {
        label: "Strategies",
        icon: BrainCircuit,
        badge: "12",
      },
      {
        label: "Campaigns",
        icon: Rocket,
      },
      {
        label: "AI Intelligence",
        icon: Sparkles,
        badge: "New",
      },
      {
        label: "Competitors",
        icon: Users,
      },
      {
        label: "Website Analyzer",
        icon: Gauge,
      },
      {
        label: "Audience Builder",
        icon: Target,
      },
      {
        label: "Creative Studio",
        icon: WandSparkles,
      },
      {
        label: "Reports",
        icon: BarChart3,
      },
      {
        label: "Settings",
        icon: Settings,
      },
    ],
  },
  {
    title: "AI Tools",
    items: [
      {
        label: "AI Copilot",
        icon: Bot,
        badge: "Beta",
      },
      {
        label: "Ad Copy Generator",
        icon: MessageSquareText,
      },
      {
        label: "Creative Generator",
        icon: Image,
      },
      {
        label: "Budget Simulator",
        icon: CircleDollarSign,
      },
    ],
  },
];

const metrics = [
  {
    label: "Revenue",
    value: "$24,540",
    change: "+18.4%",
    description: "vs. previous period",
    icon: DollarSign,
    positive: true,
    chart: [22, 27, 25, 32, 35, 38, 44, 42, 49, 56, 61, 68],
  },
  {
    label: "ROAS",
    value: "3.80x",
    change: "+16.2%",
    description: "vs. previous period",
    icon: TrendingUp,
    positive: true,
    chart: [31, 29, 34, 37, 36, 43, 41, 49, 54, 57, 62, 66],
  },
  {
    label: "Ad Spend",
    value: "$6,452",
    change: "+12.4%",
    description: "vs. previous period",
    icon: Activity,
    positive: true,
    chart: [18, 20, 26, 24, 29, 35, 33, 39, 42, 46, 48, 52],
  },
  {
    label: "CTR",
    value: "2.45%",
    change: "+7.8%",
    description: "vs. previous period",
    icon: MousePointerClick,
    positive: true,
    chart: [26, 30, 29, 34, 38, 37, 43, 45, 51, 55, 57, 63],
  },
  {
    label: "CPC",
    value: "$0.68",
    change: "-9.2%",
    description: "lower is better",
    icon: MousePointerClick,
    positive: true,
    chart: [62, 59, 57, 54, 51, 49, 45, 42, 40, 37, 35, 31],
  },
  {
    label: "CPA",
    value: "$18.72",
    change: "-11.7%",
    description: "lower is better",
    icon: Target,
    positive: true,
    chart: [67, 65, 61, 60, 56, 52, 49, 46, 42, 39, 35, 32],
  },
];

const priorities = [
  {
    rank: 1,
    icon: Rocket,
    title: "Improve landing-page speed",
    description: "Potential revenue increase",
    value: "+$2,420",
    impact: "High impact",
  },
  {
    rank: 2,
    icon: Zap,
    title: "Launch TikTok campaign",
    description: "Potential revenue increase",
    value: "+$1,890",
    impact: "High impact",
  },
  {
    rank: 3,
    icon: Search,
    title: "Increase Google Ads budget",
    description: "Potential revenue increase",
    value: "+$1,350",
    impact: "Medium impact",
  },
];

const strategies = [
  {
    name: "E-commerce Growth Strategy",
    channel: "Meta Ads",
    market: "United States",
    budget: "$2,500",
    goal: "Sales",
    score: 92,
    status: "Active",
    date: "2 days ago",
  },
  {
    name: "TikTok Scaling Strategy",
    channel: "TikTok",
    market: "United Kingdom",
    budget: "$1,800",
    goal: "Leads",
    score: 88,
    status: "Active",
    date: "5 days ago",
  },
  {
    name: "Google Ads Optimization",
    channel: "Google",
    market: "Germany",
    budget: "$1,400",
    goal: "Sales",
    score: 85,
    status: "Review",
    date: "1 week ago",
  },
];

const chartSeries = {
  without: [
    18, 21, 23, 27, 30, 33, 36, 39, 42, 45, 47, 50, 53, 55, 57, 60,
  ],
  current: [
    18, 23, 28, 34, 40, 46, 53, 59, 64, 70, 76, 82, 88, 94, 101, 109,
  ],
  optimized: [
    18, 25, 32, 41, 50, 60, 70, 81, 91, 102, 113, 124, 136, 148, 161, 175,
  ],
};

function buildPath(values, width = 600, height = 210, padding = 12) {
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const range = maximum - minimum || 1;

  return values
    .map((value, index) => {
      const x =
        padding +
        (index / Math.max(values.length - 1, 1)) * (width - padding * 2);

      const y =
        height -
        padding -
        ((value - minimum) / range) * (height - padding * 2);

      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

function MiniChart({ values }) {
  const path = buildPath(values, 140, 42, 3);

  return (
    <svg
      className="mini-chart"
      viewBox="0 0 140 42"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="miniArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.32" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        d={`${path} L 137 42 L 3 42 Z`}
        fill="url(#miniArea)"
        opacity="0.52"
      />

      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Logo() {
  return (
    <div className="brand">
      <div className="brand-icon">
        <span className="brand-orbit brand-orbit-one" />
        <span className="brand-orbit brand-orbit-two" />
        <span className="brand-core">A</span>
      </div>

      <div className="brand-copy">
        <strong>AdLens</strong>
        <span>AI Marketing Intelligence</span>
      </div>
    </div>
  );
}

function Sidebar({
  mobileOpen,
  sidebarCollapsed,
  setMobileOpen,
  setSidebarCollapsed,
}) {
  return (
    <>
      <button
        type="button"
        className={`mobile-overlay ${mobileOpen ? "is-visible" : ""}`}
        aria-label="Close navigation"
        onClick={() => setMobileOpen(false)}
      />

      <aside
        className={[
          "sidebar",
          mobileOpen ? "is-open" : "",
          sidebarCollapsed ? "is-collapsed" : "",
        ].join(" ")}
      >
        <div className="sidebar-top">
          <Logo />

          <button
            type="button"
            className="sidebar-collapse-button desktop-collapse"
            aria-label={
              sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
            onClick={() => setSidebarCollapsed((current) => !current)}
          >
            {sidebarCollapsed ? (
              <PanelLeftOpen size={18} />
            ) : (
              <PanelLeftClose size={18} />
            )}
          </button>

          <button
            type="button"
            className="sidebar-collapse-button mobile-close"
            aria-label="Close sidebar"
            onClick={() => setMobileOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <div className="sidebar-scroll">
          {navigation.map((section) => (
            <div className="navigation-section" key={section.title}>
              <p className="navigation-title">{section.title}</p>

              <nav>
                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      type="button"
                      className={`navigation-item ${
                        item.active ? "is-active" : ""
                      }`}
                      key={item.label}
                    >
                      <span className="navigation-item-icon">
                        <Icon size={17} strokeWidth={1.8} />
                      </span>

                      <span className="navigation-label">{item.label}</span>

                      {item.badge ? (
                        <span className="navigation-badge">{item.badge}</span>
                      ) : null}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}

          <div className="upgrade-card">
            <div className="upgrade-icon">
              <Crown size={18} />
            </div>

            <div className="upgrade-content">
              <span className="upgrade-plan">Go Premium</span>

              <p>
                Unlock full AI power, advanced insights and priority support.
              </p>

              <button type="button">
                Upgrade plan
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="sidebar-user">
          <div className="avatar avatar-small">MA</div>

          <div className="sidebar-user-copy">
            <strong>Muhammed Ali</strong>
            <span>Premium member</span>
          </div>

          <ChevronDown className="sidebar-user-chevron" size={16} />
        </div>
      </aside>
    </>
  );
}

function Header({ setMobileOpen }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="icon-button mobile-menu"
          aria-label="Open navigation"
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={20} />
        </button>

        <div className="greeting">
          <div className="greeting-line">
            <h1>Good evening, Muhammed!</h1>
            <span className="wave">👋</span>
          </div>

          <p>Your business is outperforming 87% of similar businesses.</p>
        </div>
      </div>

      <div className="topbar-actions">
        <button type="button" className="date-button">
          <CalendarDays size={16} />
          <span>May 6 – Jun 5, 2026</span>
          <ChevronDown size={14} />
        </button>

        <button type="button" className="secondary-button export-button">
          <Download size={16} />
          <span>Export report</span>
        </button>

        <button type="button" className="primary-button">
          <Plus size={17} />
          <span>New strategy</span>
        </button>

        <button
          type="button"
          className="icon-button notification-button"
          aria-label="Notifications"
        >
          <Bell size={19} />
          <span className="notification-dot">3</span>
        </button>

        <div className="header-avatar">
          <div className="avatar">MA</div>
          <ChevronDown size={14} />
        </div>
      </div>
    </header>
  );
}

function RevenueHero() {
  return (
    <section className="revenue-hero dashboard-card">
      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />

      <div className="hero-grid">
        <div className="hero-primary">
          <div className="hero-eyebrow">
            <span>Since joining AdLens</span>

            <span className="hero-health">
              <ShieldCheck size={14} />
              Business health
              <strong>87/100</strong>
            </span>
          </div>

          <div className="hero-amount">
            <span className="hero-plus">+</span>
            <strong>$10,340</strong>
          </div>

          <p className="hero-label">Revenue generated</p>

          <span className="hero-meta">
            Since you joined on May 6, 2026
          </span>

          <div className="ai-confidence">
            <Sparkles size={14} />
            AI confidence average
            <strong>94%</strong>
          </div>
        </div>

        <div className="hero-statistics">
          <article>
            <span className="hero-stat-change positive">+$7,180</span>
            <strong>Estimated profit</strong>
            <small>
              <ArrowUpRight size={12} />
              68%
            </small>
          </article>

          <article>
            <span className="hero-stat-change">146x</span>
            <strong>ROI</strong>
            <small>+1,610 per $1 spent</small>
          </article>

          <article>
            <span className="hero-stat-change">-$12.68</span>
            <strong>Lower CPA</strong>
            <small className="positive">
              <ArrowDownRight size={12} />
              31%
            </small>
          </article>

          <article>
            <span className="hero-stat-change">+72%</span>
            <strong>Revenue growth</strong>
            <small className="positive">
              <ArrowUpRight size={12} />
              72%
            </small>
          </article>
        </div>

        <div className="goal-panel">
          <div className="goal-header">
            <div>
              <span>Monthly goal</span>
              <strong>$24,540</strong>
            </div>

            <button type="button">Edit goal</button>
          </div>

          <div className="goal-progress-copy">
            <span>$24,540 / $50,000</span>
            <strong>49%</strong>
          </div>

          <div className="progress-track">
            <span style={{ width: "49%" }} />
          </div>

          <small>22 days left in this month</small>

          <div className="goal-divider" />

          <div className="opportunity-header">
            <span>Opportunity score</span>
            <Lightbulb size={15} />
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
      </div>
    </section>
  );
}

function MetricCard({ metric }) {
  const Icon = metric.icon;

  return (
    <article className="metric-card dashboard-card">
      <div className="metric-header">
        <div className="metric-icon">
          <Icon size={17} />
        </div>

        <span className="metric-change">
          {metric.positive ? (
            <ArrowUpRight size={12} />
          ) : (
            <ArrowDownRight size={12} />
          )}

          {metric.change}
        </span>
      </div>

      <span className="metric-label">{metric.label}</span>
      <strong className="metric-value">{metric.value}</strong>

      <div className="metric-footer">
        <span>{metric.description}</span>
        <MiniChart values={metric.chart} />
      </div>
    </article>
  );
}

function RevenueChart() {
  const [period, setPeriod] = useState("Last 30 days");

  const lines = useMemo(
    () => ({
      without: buildPath(chartSeries.without),
      current: buildPath(chartSeries.current),
      optimized: buildPath(chartSeries.optimized),
    }),
    [],
  );

  return (
    <section className="dashboard-card chart-card">
      <div className="section-heading">
        <div>
          <div className="section-title-row">
            <h2>Revenue impact over time</h2>
            <span className="info-dot">i</span>
          </div>

          <div className="chart-legends">
            <span>
              <i className="legend-dot legend-gray" />
              Without AdLens
            </span>

            <span>
              <i className="legend-dot legend-purple" />
              With AdLens
            </span>

            <span>
              <i className="legend-dot legend-green" />
              AI-optimized growth
            </span>
          </div>
        </div>

        <button
          type="button"
          className="period-button"
          onClick={() =>
            setPeriod((current) =>
              current === "Last 30 days" ? "Last 90 days" : "Last 30 days",
            )
          }
        >
          {period}
          <ChevronDown size={14} />
        </button>
      </div>

      <div className="chart-layout">
        <div className="chart-area">
          <svg
            viewBox="0 0 600 210"
            preserveAspectRatio="none"
            role="img"
            aria-label="Revenue growth chart"
          >
            <defs>
              <linearGradient
                id="optimizedArea"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
              </linearGradient>

              <linearGradient
                id="currentArea"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.24" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {[30, 70, 110, 150, 190].map((position) => (
              <line
                key={position}
                x1="0"
                y1={position}
                x2="600"
                y2={position}
                stroke="rgba(255,255,255,0.055)"
                strokeWidth="1"
              />
            ))}

            {[75, 150, 225, 300, 375, 450, 525].map((position) => (
              <line
                key={position}
                x1={position}
                y1="0"
                x2={position}
                y2="210"
                stroke="rgba(255,255,255,0.035)"
                strokeWidth="1"
              />
            ))}

            <path
              d={`${lines.optimized} L 588 210 L 12 210 Z`}
              fill="url(#optimizedArea)"
            />

            <path
              d={`${lines.current} L 588 210 L 12 210 Z`}
              fill="url(#currentArea)"
            />

            <path
              d={lines.without}
              fill="none"
              stroke="#64748b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="5 6"
            />

            <path
              d={lines.current}
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d={lines.optimized}
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle cx="588" cy="12" r="4" fill="#22c55e" />
            <circle cx="588" cy="12" r="9" fill="#22c55e" opacity="0.16" />

            <circle cx="588" cy="12" r="2" fill="#ffffff" />
          </svg>

          <div className="chart-axis-labels">
            <span>May 6</span>
            <span>May 13</span>
            <span>May 20</span>
            <span>May 27</span>
            <span>Jun 5</span>
          </div>
        </div>

        <div className="chart-summary">
          <div className="chart-summary-label">With AdLens</div>
          <strong className="chart-summary-current">$24,540</strong>

          <span>Without AdLens</span>
          <strong>$17,360</strong>

          <span>Difference</span>
          <strong className="positive">+$7,180</strong>

          <small>+41.4%</small>
        </div>
      </div>

      <button type="button" className="text-action chart-action">
        View detailed analytics
        <ArrowRight size={14} />
      </button>
    </section>
  );
}

function PrioritiesCard() {
  return (
    <section className="dashboard-card priorities-card">
      <div className="section-heading compact-heading">
        <div>
          <h2>Top 3 AI priorities</h2>
          <p>Recommended actions with the highest revenue impact.</p>
        </div>

        <button type="button" className="text-action">
          View all
        </button>
      </div>

      <div className="priority-list">
        {priorities.map((priority) => {
          const Icon = priority.icon;

          return (
            <article className="priority-item" key={priority.rank}>
              <div className="priority-rank">{priority.rank}</div>

              <div className="priority-icon">
                <Icon size={17} />
              </div>

              <div className="priority-copy">
                <strong>{priority.title}</strong>
                <span>{priority.description}</span>
              </div>

              <div className="priority-value">
                <span>{priority.impact}</span>
                <strong>{priority.value}</strong>
              </div>

              <ChevronRight size={17} className="priority-chevron" />
            </article>
          );
        })}
      </div>

      <button type="button" className="review-button">
        Review recommendations
        <ArrowRight size={15} />
      </button>
    </section>
  );
}

function StrategiesCard() {
  return (
    <section className="dashboard-card strategies-card">
      <div className="section-heading compact-heading">
        <div>
          <h2>Recent strategies</h2>
          <p>Your latest AI-generated marketing strategies.</p>
        </div>

        <button type="button" className="text-action">
          View all
        </button>
      </div>

      <div className="strategy-table">
        <div className="strategy-table-header">
          <span>Strategy</span>
          <span>Market</span>
          <span>Budget</span>
          <span>Goal</span>
          <span>AI score</span>
          <span />
        </div>

        {strategies.map((strategy) => (
          <article className="strategy-row" key={strategy.name}>
            <div className="strategy-name">
              <div
                className={`strategy-channel-icon channel-${strategy.channel
                  .toLowerCase()
                  .replace(" ads", "")}`}
              >
                {strategy.channel.charAt(0)}
              </div>

              <div>
                <strong>{strategy.name}</strong>
                <span>
                  {strategy.channel} · {strategy.date}
                </span>
              </div>
            </div>

            <span className="strategy-market">
              <Globe2 size={14} />
              {strategy.market}
            </span>

            <span>{strategy.budget}</span>
            <span>{strategy.goal}</span>

            <span className="strategy-score">
              <i>{strategy.score}</i>
              {strategy.status}
            </span>

            <button type="button" className="row-button">
              <ChevronRight size={16} />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function CopilotCard() {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);

  const suggestions = [
    "Why is my ROAS decreasing?",
    "Which channel performed best?",
    "How can I improve my creatives?",
    "What budget should I use?",
  ];

  function submitMessage(value) {
    const cleanValue = value.trim();

    if (!cleanValue) {
      return;
    }

    setConversation((current) => [
      ...current,
      {
        id: Date.now(),
        text: cleanValue,
      },
    ]);

    setMessage("");
  }

  return (
    <section className="dashboard-card copilot-card">
      <div className="copilot-heading">
        <div className="copilot-title">
          <div className="copilot-icon">
            <Bot size={19} />
          </div>

          <div>
            <div className="section-title-row">
              <h2>AI Copilot</h2>
              <span className="beta-badge">Beta</span>
            </div>

            <p>Ask anything about your marketing performance.</p>
          </div>
        </div>

        <button type="button" className="text-action">
          View all
        </button>
      </div>

      <div className="suggestion-chips">
        {suggestions.map((suggestion) => (
          <button
            type="button"
            key={suggestion}
            onClick={() => setMessage(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>

      {conversation.length > 0 ? (
        <div className="conversation-preview">
          {conversation.slice(-2).map((item) => (
            <div className="conversation-message" key={item.id}>
              <div className="avatar avatar-message">MA</div>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="copilot-insight">
          <div className="insight-icon">
            <Sparkles size={16} />
          </div>

          <div>
            <strong>Today’s insight</strong>
            <p>
              Your Meta campaigns generated 31% more conversions after the
              latest audience update.
            </p>
          </div>
        </div>
      )}

      <form
        className="copilot-input"
        onSubmit={(event) => {
          event.preventDefault();
          submitMessage(message);
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

      <div className="copilot-footer">
        <span>Powered by AdLens AI</span>
        <span>89% accuracy</span>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div
      className={`app-shell ${
        sidebarCollapsed ? "sidebar-is-collapsed" : ""
      }`}
    >
      <Sidebar
        mobileOpen={mobileOpen}
        sidebarCollapsed={sidebarCollapsed}
        setMobileOpen={setMobileOpen}
        setSidebarCollapsed={setSidebarCollapsed}
      />

      <main className="main-area">
        <Header setMobileOpen={setMobileOpen} />

        <div className="dashboard-content">
          <RevenueHero />

          <section className="metrics-grid">
            {metrics.map((metric) => (
              <MetricCard metric={metric} key={metric.label} />
            ))}
          </section>

          <section className="dashboard-two-column">
            <RevenueChart />
            <PrioritiesCard />
          </section>

          <section className="dashboard-bottom-grid">
            <StrategiesCard />
            <CopilotCard />
          </section>
        </div>
      </main>

      <style jsx global>{`
        :root {
          color-scheme: dark;
          --background: #05050a;
          --sidebar: #07070d;
          --surface: rgba(14, 13, 25, 0.88);
          --surface-strong: #11101d;
          --surface-soft: rgba(255, 255, 255, 0.035);
          --surface-hover: rgba(255, 255, 255, 0.06);
          --border: rgba(255, 255, 255, 0.075);
          --border-strong: rgba(139, 92, 246, 0.28);
          --text: #f6f4ff;
          --text-secondary: #a7a4b5;
          --text-muted: #6f6c80;
          --purple: #7c3aed;
          --purple-bright: #9d5cff;
          --purple-soft: rgba(124, 58, 237, 0.15);
          --green: #2ee59d;
          --red: #fb7185;
          --orange: #fb923c;
          --blue: #38bdf8;
          --sidebar-width: 244px;
          --sidebar-collapsed-width: 76px;
        }

        * {
          box-sizing: border-box;
        }

        html {
          background: var(--background);
        }

        body {
          min-width: 320px;
          margin: 0;
          overflow-x: hidden;
          background:
            radial-gradient(
              circle at 60% -15%,
              rgba(124, 58, 237, 0.11),
              transparent 28%
            ),
            #05050a;
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

        button,
        a {
          -webkit-tap-highlight-color: transparent;
        }

        .app-shell {
          min-height: 100vh;
        }

        .sidebar {
          position: fixed;
          z-index: 60;
          top: 0;
          bottom: 0;
          left: 0;
          display: flex;
          width: var(--sidebar-width);
          flex-direction: column;
          border-right: 1px solid var(--border);
          background:
            radial-gradient(
              circle at 25% 12%,
              rgba(124, 58, 237, 0.09),
              transparent 25%
            ),
            rgba(7, 7, 13, 0.98);
          transition:
            width 220ms ease,
            transform 220ms ease;
          backdrop-filter: blur(26px);
        }

        .sidebar.is-collapsed {
          width: var(--sidebar-collapsed-width);
        }

        .sidebar-top {
          position: relative;
          display: flex;
          min-height: 76px;
          align-items: center;
          justify-content: space-between;
          padding: 16px 17px;
          border-bottom: 1px solid var(--border);
        }

        .brand {
          display: flex;
          min-width: 0;
          align-items: center;
          gap: 11px;
        }

        .brand-icon {
          position: relative;
          display: grid;
          width: 39px;
          height: 39px;
          flex: 0 0 auto;
          place-items: center;
          overflow: hidden;
          border: 1px solid rgba(167, 139, 250, 0.32);
          border-radius: 12px;
          background:
            linear-gradient(
              145deg,
              rgba(139, 92, 246, 0.95),
              rgba(88, 28, 135, 0.88)
            ),
            #7c3aed;
          box-shadow:
            0 0 28px rgba(124, 58, 237, 0.28),
            inset 0 1px rgba(255, 255, 255, 0.2);
        }

        .brand-core {
          position: relative;
          z-index: 2;
          font-size: 17px;
          font-weight: 800;
          letter-spacing: -0.05em;
        }

        .brand-orbit {
          position: absolute;
          width: 31px;
          height: 13px;
          border: 1px solid rgba(255, 255, 255, 0.55);
          border-radius: 999px;
        }

        .brand-orbit-one {
          transform: rotate(45deg);
        }

        .brand-orbit-two {
          transform: rotate(-45deg);
        }

        .brand-copy {
          display: flex;
          min-width: 0;
          flex-direction: column;
          white-space: nowrap;
          transition:
            opacity 160ms ease,
            width 160ms ease;
        }

        .brand-copy strong {
          font-size: 16px;
          letter-spacing: -0.025em;
        }

        .brand-copy span {
          margin-top: 2px;
          color: var(--text-muted);
          font-size: 8px;
          letter-spacing: 0.03em;
        }

        .sidebar-collapse-button,
        .icon-button {
          display: grid;
          flex: 0 0 auto;
          place-items: center;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.025);
          cursor: pointer;
          transition: 160ms ease;
        }

        .sidebar-collapse-button {
          width: 30px;
          height: 30px;
          border-radius: 9px;
          color: var(--text-muted);
        }

        .sidebar-collapse-button:hover,
        .icon-button:hover {
          border-color: var(--border-strong);
          background: var(--purple-soft);
          color: var(--text);
        }

        .mobile-close {
          display: none;
        }

        .sidebar-scroll {
          flex: 1;
          overflow-x: hidden;
          overflow-y: auto;
          padding: 18px 12px;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
        }

        .navigation-section + .navigation-section {
          margin-top: 22px;
        }

        .navigation-title {
          margin: 0 0 8px;
          padding: 0 10px;
          color: #4f4c5e;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .navigation-item {
          position: relative;
          display: flex;
          width: 100%;
          height: 39px;
          align-items: center;
          gap: 11px;
          margin-bottom: 3px;
          padding: 0 11px;
          overflow: hidden;
          border: 1px solid transparent;
          border-radius: 9px;
          background: transparent;
          color: #858293;
          cursor: pointer;
          text-align: left;
          transition: 160ms ease;
          white-space: nowrap;
        }

        .navigation-item:hover {
          background: var(--surface-soft);
          color: #d8d5e2;
        }

        .navigation-item.is-active {
          border-color: rgba(139, 92, 246, 0.2);
          background: linear-gradient(
            90deg,
            rgba(124, 58, 237, 0.35),
            rgba(124, 58, 237, 0.13)
          );
          color: #ffffff;
          box-shadow:
            inset 3px 0 #8b5cf6,
            0 7px 22px rgba(76, 29, 149, 0.1);
        }

        .navigation-item-icon {
          display: grid;
          width: 20px;
          flex: 0 0 auto;
          place-items: center;
        }

        .navigation-label {
          flex: 1;
          overflow: hidden;
          font-size: 12px;
          font-weight: 500;
          text-overflow: ellipsis;
        }

        .navigation-badge {
          display: inline-flex;
          min-width: 21px;
          height: 18px;
          align-items: center;
          justify-content: center;
          padding: 0 6px;
          border: 1px solid rgba(167, 139, 250, 0.16);
          border-radius: 999px;
          background: rgba(124, 58, 237, 0.15);
          color: #bd9dff;
          font-size: 8px;
          font-weight: 700;
        }

        .upgrade-card {
          position: relative;
          display: flex;
          gap: 11px;
          margin-top: 20px;
          overflow: hidden;
          padding: 14px 12px;
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 13px;
          background:
            radial-gradient(
              circle at 80% 0%,
              rgba(124, 58, 237, 0.25),
              transparent 42%
            ),
            linear-gradient(
              145deg,
              rgba(47, 24, 89, 0.55),
              rgba(15, 13, 27, 0.9)
            );
        }

        .upgrade-icon {
          display: grid;
          width: 32px;
          height: 32px;
          flex: 0 0 auto;
          place-items: center;
          border: 1px solid rgba(250, 204, 21, 0.22);
          border-radius: 9px;
          background: rgba(250, 204, 21, 0.08);
          color: #facc15;
        }

        .upgrade-content {
          min-width: 0;
        }

        .upgrade-plan {
          font-size: 12px;
          font-weight: 700;
        }

        .upgrade-content p {
          margin: 7px 0 11px;
          color: #8f8a9e;
          font-size: 9px;
          line-height: 1.5;
        }

        .upgrade-content button {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 10px;
          border: 1px solid rgba(167, 139, 250, 0.2);
          border-radius: 8px;
          background: linear-gradient(135deg, #7c3aed, #5b21b6);
          color: #ffffff;
          cursor: pointer;
          font-size: 9px;
          font-weight: 700;
        }

        .sidebar-user {
          display: flex;
          min-height: 72px;
          align-items: center;
          gap: 10px;
          padding: 13px 16px;
          border-top: 1px solid var(--border);
        }

        .avatar {
          display: grid;
          width: 34px;
          height: 34px;
          flex: 0 0 auto;
          place-items: center;
          border: 2px solid rgba(167, 139, 250, 0.28);
          border-radius: 50%;
          background:
            linear-gradient(145deg, rgba(124, 58, 237, 0.7), #1e1b4b),
            #181826;
          color: #ffffff;
          font-size: 9px;
          font-weight: 800;
          box-shadow: 0 0 18px rgba(124, 58, 237, 0.15);
        }

        .avatar-small {
          width: 32px;
          height: 32px;
        }

        .sidebar-user-copy {
          display: flex;
          min-width: 0;
          flex: 1;
          flex-direction: column;
          white-space: nowrap;
        }

        .sidebar-user-copy strong {
          overflow: hidden;
          font-size: 10px;
          text-overflow: ellipsis;
        }

        .sidebar-user-copy span {
          margin-top: 3px;
          color: var(--text-muted);
          font-size: 8px;
        }

        .sidebar-user-chevron {
          color: var(--text-muted);
        }

        .sidebar.is-collapsed .brand-copy,
        .sidebar.is-collapsed .navigation-title,
        .sidebar.is-collapsed .navigation-label,
        .sidebar.is-collapsed .navigation-badge,
        .sidebar.is-collapsed .upgrade-content,
        .sidebar.is-collapsed .sidebar-user-copy,
        .sidebar.is-collapsed .sidebar-user-chevron {
          display: none;
        }

        .sidebar.is-collapsed .sidebar-top {
          justify-content: center;
          padding-inline: 12px;
        }

        .sidebar.is-collapsed .desktop-collapse {
          position: absolute;
          right: -14px;
          background: #11101c;
        }

        .sidebar.is-collapsed .navigation-item {
          justify-content: center;
          padding: 0;
        }

        .sidebar.is-collapsed .upgrade-card {
          justify-content: center;
          padding: 12px 8px;
        }

        .sidebar.is-collapsed .sidebar-user {
          justify-content: center;
          padding-inline: 10px;
        }

        .main-area {
          min-width: 0;
          margin-left: var(--sidebar-width);
          transition: margin-left 220ms ease;
        }

        .sidebar-is-collapsed .main-area {
          margin-left: var(--sidebar-collapsed-width);
        }

        .topbar {
          position: sticky;
          z-index: 40;
          top: 0;
          display: flex;
          min-height: 76px;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 12px 24px;
          border-bottom: 1px solid var(--border);
          background: rgba(5, 5, 10, 0.82);
          backdrop-filter: blur(22px);
        }

        .topbar-left {
          display: flex;
          min-width: 0;
          align-items: center;
          gap: 12px;
        }

        .mobile-menu {
          display: none;
        }

        .greeting {
          min-width: 0;
        }

        .greeting-line {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .greeting h1 {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.025em;
        }

        .wave {
          display: inline-block;
          font-size: 15px;
        }

        .greeting p {
          margin: 5px 0 0;
          color: var(--text-muted);
          font-size: 9px;
        }

        .topbar-actions {
          display: flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 8px;
        }

        .date-button,
        .secondary-button,
        .primary-button {
          display: inline-flex;
          height: 36px;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 12px;
          border-radius: 9px;
          cursor: pointer;
          font-size: 10px;
          font-weight: 600;
          transition: 160ms ease;
          white-space: nowrap;
        }

        .date-button,
        .secondary-button {
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.025);
          color: #bbb7c7;
        }

        .date-button:hover,
        .secondary-button:hover {
          border-color: var(--border-strong);
          background: var(--purple-soft);
          color: var(--text);
        }

        .primary-button {
          border: 1px solid rgba(167, 139, 250, 0.3);
          background: linear-gradient(135deg, #8b5cf6, #6d28d9);
          color: #ffffff;
          box-shadow:
            0 8px 24px rgba(124, 58, 237, 0.22),
            inset 0 1px rgba(255, 255, 255, 0.18);
        }

        .primary-button:hover {
          transform: translateY(-1px);
          box-shadow:
            0 12px 30px rgba(124, 58, 237, 0.31),
            inset 0 1px rgba(255, 255, 255, 0.2);
        }

        .icon-button {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          color: #9793a6;
        }

        .notification-button {
          position: relative;
        }

        .notification-dot {
          position: absolute;
          top: -4px;
          right: -4px;
          display: grid;
          width: 16px;
          height: 16px;
          place-items: center;
          border: 2px solid #08080e;
          border-radius: 50%;
          background: #ef4444;
          color: #ffffff;
          font-size: 7px;
          font-weight: 800;
        }

        .header-avatar {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-left: 2px;
          color: var(--text-muted);
          cursor: pointer;
        }

        .dashboard-content {
          width: 100%;
          max-width: 1900px;
          margin: 0 auto;
          padding: 20px 24px 34px;
        }

        .dashboard-card {
          border: 1px solid var(--border);
          border-radius: 14px;
          background:
            linear-gradient(
              145deg,
              rgba(18, 17, 31, 0.93),
              rgba(10, 10, 18, 0.96)
            ),
            var(--surface);
          box-shadow:
            0 18px 50px rgba(0, 0, 0, 0.18),
            inset 0 1px rgba(255, 255, 255, 0.018);
        }

        .revenue-hero {
          position: relative;
          overflow: hidden;
          min-height: 224px;
          padding: 0;
        }

        .revenue-hero::before {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              90deg,
              rgba(124, 58, 237, 0.11),
              transparent 38%
            ),
            radial-gradient(
              circle at 28% 82%,
              rgba(124, 58, 237, 0.2),
              transparent 25%
            );
          content: "";
          pointer-events: none;
        }

        .hero-glow {
          position: absolute;
          border-radius: 999px;
          filter: blur(20px);
          opacity: 0.48;
          pointer-events: none;
        }

        .hero-glow-one {
          bottom: -60px;
          left: 12%;
          width: 310px;
          height: 130px;
          background: rgba(124, 58, 237, 0.35);
          transform: rotate(-12deg);
        }

        .hero-glow-two {
          top: -70px;
          right: 27%;
          width: 210px;
          height: 160px;
          background: rgba(76, 29, 149, 0.19);
        }

        .hero-grid {
          position: relative;
          z-index: 1;
          display: grid;
          min-height: 224px;
          grid-template-columns: minmax(260px, 1.05fr) 1.55fr minmax(
              230px,
              0.8fr
            );
        }

        .hero-primary {
          display: flex;
          min-width: 0;
          flex-direction: column;
          justify-content: center;
          padding: 24px 26px;
          border-right: 1px solid var(--border);
        }

        .hero-eyebrow {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          color: #898596;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hero-health {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #aaa6b6;
          letter-spacing: normal;
          text-transform: none;
        }

        .hero-health svg {
          color: var(--green);
        }

        .hero-health strong {
          color: var(--green);
        }

        .hero-amount {
          display: flex;
          align-items: flex-start;
          margin-top: 16px;
          letter-spacing: -0.055em;
        }

        .hero-amount strong {
          font-size: clamp(34px, 4.1vw, 58px);
          font-weight: 650;
          line-height: 0.95;
        }

        .hero-plus {
          margin-top: 3px;
          margin-right: 5px;
          color: #b9b5c3;
          font-size: 20px;
          font-weight: 400;
        }

        .hero-label {
          margin: 12px 0 0;
          font-size: 12px;
          font-weight: 650;
        }

        .hero-meta {
          margin-top: 6px;
          color: var(--text-muted);
          font-size: 8px;
        }

        .ai-confidence {
          display: inline-flex;
          width: fit-content;
          align-items: center;
          gap: 6px;
          margin-top: 19px;
          padding: 7px 9px;
          border: 1px solid rgba(139, 92, 246, 0.16);
          border-radius: 8px;
          background: rgba(124, 58, 237, 0.07);
          color: #908b9f;
          font-size: 8px;
        }

        .ai-confidence svg,
        .ai-confidence strong {
          color: #b28aff;
        }

        .hero-statistics {
          display: grid;
          min-width: 0;
          grid-template-columns: repeat(4, 1fr);
          align-items: center;
        }

        .hero-statistics article {
          display: flex;
          min-width: 0;
          min-height: 88px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 14px 9px;
          border-right: 1px solid var(--border);
          text-align: center;
        }

        .hero-stat-change {
          color: #f4f1fb;
          font-size: 17px;
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .hero-statistics article > strong {
          margin-top: 7px;
          color: #aaa6b5;
          font-size: 8px;
          font-weight: 600;
        }

        .hero-statistics small {
          display: flex;
          align-items: center;
          gap: 3px;
          margin-top: 7px;
          color: var(--text-muted);
          font-size: 7px;
        }

        .positive {
          color: var(--green) !important;
        }

        .goal-panel {
          display: flex;
          min-width: 0;
          flex-direction: column;
          justify-content: center;
          padding: 22px 21px;
          background: rgba(255, 255, 255, 0.012);
        }

        .goal-header,
        .goal-progress-copy,
        .opportunity-header,
        .opportunity-values {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .goal-header > div {
          display: flex;
          flex-direction: column;
        }

        .goal-header span,
        .opportunity-header span {
          color: #9b97a7;
          font-size: 9px;
          font-weight: 650;
        }

        .goal-header strong {
          margin-top: 7px;
          font-size: 17px;
          letter-spacing: -0.03em;
        }

        .goal-header button {
          border: 0;
          background: transparent;
          color: #a782ff;
          cursor: pointer;
          font-size: 8px;
        }

        .goal-progress-copy {
          margin-top: 15px;
          color: var(--text-muted);
          font-size: 8px;
        }

        .goal-progress-copy strong {
          color: #d7d3df;
        }

        .progress-track {
          height: 5px;
          margin-top: 8px;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
        }

        .progress-track span {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #6d28d9, #a855f7);
          box-shadow: 0 0 14px rgba(168, 85, 247, 0.45);
        }

        .goal-panel > small {
          margin-top: 7px;
          color: var(--text-muted);
          font-size: 7px;
        }

        .goal-divider {
          height: 1px;
          margin: 17px 0 13px;
          background: var(--border);
        }

        .opportunity-header svg {
          color: #facc15;
        }

        .opportunity-values {
          margin-top: 11px;
        }

        .opportunity-values > div {
          display: flex;
          flex-direction: column;
        }

        .opportunity-values span {
          color: var(--text-muted);
          font-size: 7px;
        }

        .opportunity-values strong {
          margin-top: 5px;
          font-size: 13px;
        }

        .opportunity-values > div:last-child {
          text-align: right;
        }

        .opportunity-values > div:last-child strong {
          color: var(--green);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 11px;
          margin-top: 13px;
        }

        .metric-card {
          position: relative;
          min-width: 0;
          min-height: 139px;
          overflow: hidden;
          padding: 13px 14px 10px;
        }

        .metric-card::after {
          position: absolute;
          right: -24px;
          bottom: -35px;
          width: 95px;
          height: 95px;
          border-radius: 50%;
          background: rgba(124, 58, 237, 0.06);
          filter: blur(16px);
          content: "";
        }

        .metric-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .metric-icon {
          display: grid;
          width: 30px;
          height: 30px;
          place-items: center;
          border: 1px solid rgba(139, 92, 246, 0.18);
          border-radius: 9px;
          background: rgba(124, 58, 237, 0.1);
          color: #a78bfa;
        }

        .metric-change {
          display: flex;
          align-items: center;
          gap: 3px;
          color: var(--green);
          font-size: 8px;
          font-weight: 700;
        }

        .metric-label {
          display: block;
          margin-top: 11px;
          color: #8b8798;
          font-size: 8px;
          font-weight: 600;
        }

        .metric-value {
          display: block;
          margin-top: 4px;
          font-size: 18px;
          letter-spacing: -0.035em;
        }

        .metric-footer {
          display: grid;
          height: 38px;
          grid-template-columns: 1fr 68px;
          align-items: end;
          gap: 3px;
          margin-top: 2px;
        }

        .metric-footer > span {
          align-self: center;
          color: var(--text-muted);
          font-size: 7px;
          line-height: 1.35;
        }

        .mini-chart {
          width: 68px;
          height: 30px;
          color: #8b5cf6;
        }

        .dashboard-two-column,
        .dashboard-bottom-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.55fr) minmax(320px, 0.85fr);
          gap: 13px;
          margin-top: 13px;
        }

        .chart-card,
        .priorities-card,
        .strategies-card,
        .copilot-card {
          min-width: 0;
          padding: 17px;
        }

        .section-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;
        }

        .section-title-row {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .section-heading h2,
        .copilot-heading h2 {
          margin: 0;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: -0.015em;
        }

        .section-heading p,
        .copilot-heading p {
          margin: 5px 0 0;
          color: var(--text-muted);
          font-size: 8px;
        }

        .info-dot {
          display: grid;
          width: 14px;
          height: 14px;
          place-items: center;
          border: 1px solid var(--border);
          border-radius: 50%;
          color: var(--text-muted);
          font-size: 8px;
        }

        .chart-legends {
          display: flex;
          flex-wrap: wrap;
          gap: 13px;
          margin-top: 10px;
          color: #777384;
          font-size: 7px;
        }

        .chart-legends span {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .legend-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .legend-gray {
          background: #64748b;
        }

        .legend-purple {
          background: #8b5cf6;
        }

        .legend-green {
          background: #22c55e;
        }

        .period-button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 8px;
          border: 1px solid var(--border);
          border-radius: 7px;
          background: rgba(255, 255, 255, 0.02);
          color: #8f8b9d;
          cursor: pointer;
          font-size: 7px;
        }

        .chart-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 106px;
          align-items: stretch;
          gap: 12px;
          margin-top: 11px;
        }

        .chart-area {
          min-width: 0;
          overflow: hidden;
        }

        .chart-area svg {
          display: block;
          width: 100%;
          height: 190px;
          overflow: visible;
        }

        .chart-axis-labels {
          display: flex;
          justify-content: space-between;
          padding: 2px 4px 0;
          color: #595666;
          font-size: 7px;
        }

        .chart-summary {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 12px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.018);
        }

        .chart-summary-label,
        .chart-summary span {
          color: var(--text-muted);
          font-size: 7px;
        }

        .chart-summary strong {
          margin: 4px 0 11px;
          font-size: 12px;
        }

        .chart-summary-current {
          color: #b38dff;
          font-size: 15px !important;
        }

        .chart-summary small {
          color: var(--green);
          font-size: 8px;
          font-weight: 700;
        }

        .text-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0;
          border: 0;
          background: transparent;
          color: #a47cff;
          cursor: pointer;
          font-size: 8px;
          font-weight: 650;
        }

        .chart-action {
          margin-top: 10px;
        }

        .compact-heading {
          align-items: center;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
        }

        .priority-list {
          display: flex;
          flex-direction: column;
        }

        .priority-item {
          display: grid;
          grid-template-columns: 22px 34px minmax(0, 1fr) auto 16px;
          align-items: center;
          gap: 9px;
          min-height: 62px;
          border-bottom: 1px solid var(--border);
        }

        .priority-rank {
          display: grid;
          width: 19px;
          height: 19px;
          place-items: center;
          border-radius: 50%;
          background: rgba(239, 68, 68, 0.11);
          color: #fb7185;
          font-size: 8px;
          font-weight: 800;
        }

        .priority-item:nth-child(2) .priority-rank {
          background: rgba(251, 146, 60, 0.11);
          color: #fb923c;
        }

        .priority-item:nth-child(3) .priority-rank {
          background: rgba(250, 204, 21, 0.11);
          color: #facc15;
        }

        .priority-icon {
          display: grid;
          width: 31px;
          height: 31px;
          place-items: center;
          border: 1px solid rgba(139, 92, 246, 0.16);
          border-radius: 9px;
          background: rgba(124, 58, 237, 0.07);
          color: #a78bfa;
        }

        .priority-copy {
          display: flex;
          min-width: 0;
          flex-direction: column;
        }

        .priority-copy strong {
          overflow: hidden;
          font-size: 8px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .priority-copy span {
          margin-top: 4px;
          overflow: hidden;
          color: var(--text-muted);
          font-size: 7px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .priority-value {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;
        }

        .priority-value span {
          color: #fb7185;
          font-size: 7px;
        }

        .priority-item:nth-child(3) .priority-value span {
          color: #facc15;
        }

        .priority-value strong {
          margin-top: 4px;
          color: var(--green);
          font-size: 9px;
        }

        .priority-chevron {
          color: #4f4b5e;
        }

        .review-button {
          display: flex;
          width: 100%;
          height: 31px;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin-top: 12px;
          border: 1px solid rgba(139, 92, 246, 0.18);
          border-radius: 8px;
          background: linear-gradient(
            90deg,
            rgba(91, 33, 182, 0.72),
            rgba(124, 58, 237, 0.85)
          );
          color: #ffffff;
          cursor: pointer;
          font-size: 8px;
          font-weight: 700;
        }

        .dashboard-bottom-grid {
          grid-template-columns: minmax(0, 1.45fr) minmax(320px, 0.95fr);
        }

        .strategy-table {
          min-width: 0;
          overflow-x: auto;
        }

        .strategy-table-header,
        .strategy-row {
          display: grid;
          min-width: 660px;
          grid-template-columns:
            minmax(205px, 1.65fr)
            minmax(110px, 0.8fr)
            75px
            62px
            78px
            26px;
          align-items: center;
          gap: 10px;
        }

        .strategy-table-header {
          min-height: 32px;
          color: #5f5b6c;
          font-size: 7px;
          font-weight: 650;
          text-transform: uppercase;
        }

        .strategy-row {
          min-height: 54px;
          border-top: 1px solid var(--border);
          color: #aaa6b5;
          font-size: 8px;
        }

        .strategy-name {
          display: flex;
          min-width: 0;
          align-items: center;
          gap: 9px;
        }

        .strategy-name > div:last-child {
          display: flex;
          min-width: 0;
          flex-direction: column;
        }

        .strategy-name strong {
          overflow: hidden;
          color: #e9e6ef;
          font-size: 8px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .strategy-name span {
          margin-top: 4px;
          overflow: hidden;
          color: var(--text-muted);
          font-size: 7px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .strategy-channel-icon {
          display: grid;
          width: 28px;
          height: 28px;
          flex: 0 0 auto;
          place-items: center;
          border-radius: 8px;
          background: rgba(34, 197, 94, 0.11);
          color: #2ee59d;
          font-size: 10px;
          font-weight: 800;
        }

        .channel-tiktok {
          background: rgba(56, 189, 248, 0.1);
          color: #38bdf8;
        }

        .channel-google {
          background: rgba(250, 204, 21, 0.1);
          color: #facc15;
        }

        .strategy-market {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .strategy-score {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .strategy-score i {
          display: grid;
          width: 24px;
          height: 24px;
          place-items: center;
          border: 1px solid rgba(46, 229, 157, 0.22);
          border-radius: 50%;
          color: var(--green);
          font-size: 7px;
          font-style: normal;
          font-weight: 800;
        }

        .row-button {
          display: grid;
          width: 26px;
          height: 26px;
          place-items: center;
          border: 0;
          border-radius: 7px;
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
        }

        .row-button:hover {
          background: var(--surface-hover);
          color: var(--text);
        }

        .copilot-card {
          display: flex;
          flex-direction: column;
        }

        .copilot-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
        }

        .copilot-title {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .copilot-icon,
        .insight-icon {
          display: grid;
          width: 33px;
          height: 33px;
          flex: 0 0 auto;
          place-items: center;
          border: 1px solid rgba(139, 92, 246, 0.22);
          border-radius: 10px;
          background: rgba(124, 58, 237, 0.1);
          color: #a78bfa;
        }

        .beta-badge {
          padding: 3px 6px;
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 999px;
          background: rgba(124, 58, 237, 0.1);
          color: #aa80ff;
          font-size: 6px;
          font-weight: 800;
          text-transform: uppercase;
        }

        .suggestion-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 12px;
        }

        .suggestion-chips button {
          padding: 6px 8px;
          border: 1px solid rgba(139, 92, 246, 0.15);
          border-radius: 999px;
          background: rgba(124, 58, 237, 0.055);
          color: #a29dac;
          cursor: pointer;
          font-size: 7px;
          transition: 150ms ease;
        }

        .suggestion-chips button:hover {
          border-color: rgba(167, 139, 250, 0.32);
          background: rgba(124, 58, 237, 0.13);
          color: #ded9e7;
        }

        .copilot-insight {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          margin-top: 12px;
          padding: 11px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background:
            radial-gradient(
              circle at 0 0,
              rgba(124, 58, 237, 0.08),
              transparent 52%
            ),
            rgba(255, 255, 255, 0.016);
        }

        .insight-icon {
          width: 28px;
          height: 28px;
        }

        .copilot-insight strong {
          font-size: 8px;
        }

        .copilot-insight p {
          margin: 5px 0 0;
          color: #898596;
          font-size: 7px;
          line-height: 1.5;
        }

        .conversation-preview {
          display: flex;
          max-height: 82px;
          flex-direction: column;
          gap: 7px;
          margin-top: 12px;
          overflow-y: auto;
        }

        .conversation-message {
          display: flex;
          align-items: flex-start;
          gap: 7px;
        }

        .avatar-message {
          width: 26px;
          height: 26px;
          font-size: 7px;
        }

        .conversation-message p {
          margin: 0;
          padding: 7px 9px;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: rgba(255, 255, 255, 0.025);
          color: #aaa6b5;
          font-size: 7px;
          line-height: 1.45;
        }

        .copilot-input {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-top: auto;
          padding-top: 12px;
        }

        .copilot-input input {
          width: 100%;
          height: 35px;
          min-width: 0;
          padding: 0 11px;
          outline: none;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: rgba(255, 255, 255, 0.022);
          color: #dedbe5;
          font-size: 8px;
          transition: 150ms ease;
        }

        .copilot-input input::placeholder {
          color: #5d5969;
        }

        .copilot-input input:focus {
          border-color: rgba(139, 92, 246, 0.42);
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.08);
        }

        .copilot-input button {
          display: grid;
          width: 35px;
          height: 35px;
          flex: 0 0 auto;
          place-items: center;
          border: 1px solid rgba(167, 139, 250, 0.25);
          border-radius: 9px;
          background: linear-gradient(135deg, #8b5cf6, #6d28d9);
          color: #ffffff;
          cursor: pointer;
        }

        .copilot-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
          color: #514d5d;
          font-size: 6px;
        }

        .mobile-overlay {
          display: none;
        }

        @media (max-width: 1280px) {
          .hero-grid {
            grid-template-columns: minmax(250px, 1fr) 1.35fr;
          }

          .goal-panel {
            grid-column: 1 / -1;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 18px 30px;
            border-top: 1px solid var(--border);
          }

          .goal-progress-copy,
          .progress-track,
          .goal-panel > small {
            grid-column: 1;
          }

          .goal-divider {
            display: none;
          }

          .opportunity-header,
          .opportunity-values {
            grid-column: 2;
          }

          .opportunity-header {
            grid-row: 1;
          }

          .opportunity-values {
            grid-row: 2 / span 3;
            align-self: center;
          }

          .metrics-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 1050px) {
          .dashboard-two-column,
          .dashboard-bottom-grid {
            grid-template-columns: 1fr;
          }

          .chart-area svg {
            height: 220px;
          }

          .export-button {
            display: none;
          }
        }

        @media (max-width: 860px) {
          .sidebar,
          .sidebar.is-collapsed {
            width: min(286px, 86vw);
            transform: translateX(-105%);
          }

          .sidebar.is-open {
            transform: translateX(0);
          }

          .sidebar.is-collapsed .brand-copy,
          .sidebar.is-collapsed .navigation-title,
          .sidebar.is-collapsed .navigation-label,
          .sidebar.is-collapsed .navigation-badge,
          .sidebar.is-collapsed .upgrade-content,
          .sidebar.is-collapsed .sidebar-user-copy,
          .sidebar.is-collapsed .sidebar-user-chevron {
            display: initial;
          }

          .sidebar.is-collapsed .brand-copy,
          .sidebar.is-collapsed .sidebar-user-copy {
            display: flex;
          }

          .sidebar.is-collapsed .sidebar-top {
            justify-content: space-between;
            padding-inline: 17px;
          }

          .sidebar.is-collapsed .navigation-item {
            justify-content: flex-start;
            padding: 0 11px;
          }

          .sidebar.is-collapsed .upgrade-card {
            justify-content: flex-start;
            padding: 14px 12px;
          }

          .sidebar.is-collapsed .sidebar-user {
            justify-content: flex-start;
            padding-inline: 16px;
          }

          .desktop-collapse {
            display: none;
          }

          .mobile-close {
            display: grid;
          }

          .mobile-overlay {
            position: fixed;
            z-index: 55;
            inset: 0;
            display: block;
            visibility: hidden;
            border: 0;
            background: rgba(0, 0, 0, 0.68);
            opacity: 0;
            transition: 180ms ease;
            backdrop-filter: blur(3px);
          }

          .mobile-overlay.is-visible {
            visibility: visible;
            opacity: 1;
          }

          .main-area,
          .sidebar-is-collapsed .main-area {
            margin-left: 0;
          }

          .mobile-menu {
            display: grid;
          }

          .topbar {
            padding-inline: 16px;
          }

          .dashboard-content {
            padding-inline: 16px;
          }

          .date-button {
            display: none;
          }
        }

        @media (max-width: 700px) {
          .topbar {
            min-height: 69px;
          }

          .greeting h1 {
            font-size: 14px;
          }

          .greeting p {
            display: none;
          }

          .primary-button {
            width: 36px;
            padding: 0;
          }

          .primary-button span {
            display: none;
          }

          .header-avatar {
            display: none;
          }

          .dashboard-content {
            padding-top: 14px;
          }

          .hero-grid {
            display: flex;
            flex-direction: column;
          }

          .hero-primary {
            border-right: 0;
            border-bottom: 1px solid var(--border);
          }

          .hero-statistics {
            grid-template-columns: repeat(2, 1fr);
          }

          .hero-statistics article:nth-child(2) {
            border-right: 0;
          }

          .hero-statistics article:nth-child(-n + 2) {
            border-bottom: 1px solid var(--border);
          }

          .goal-panel {
            display: flex;
          }

          .metrics-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .chart-layout {
            grid-template-columns: 1fr;
          }

          .chart-summary {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            align-items: end;
            gap: 8px;
          }

          .chart-summary-label,
          .chart-summary span {
            grid-row: 1;
          }

          .chart-summary strong,
          .chart-summary-current,
          .chart-summary small {
            grid-row: 2;
            margin: 0;
          }

          .chart-area svg {
            height: 190px;
          }
        }

        @media (max-width: 480px) {
          .dashboard-content {
            padding-inline: 11px;
          }

          .topbar {
            padding-inline: 11px;
          }

          .greeting h1 {
            max-width: 180px;
            overflow: hidden;
            font-size: 13px;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .notification-button {
            display: none;
          }

          .hero-primary,
          .goal-panel {
            padding: 20px 17px;
          }

          .hero-amount strong {
            font-size: 39px;
          }

          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .metric-card {
            min-height: 125px;
          }

          .metric-footer {
            grid-template-columns: 1fr 120px;
          }

          .mini-chart {
            width: 120px;
          }

          .chart-card,
          .priorities-card,
          .strategies-card,
          .copilot-card {
            padding: 14px;
          }

          .priority-item {
            grid-template-columns: 20px 31px minmax(0, 1fr) 15px;
          }

          .priority-value {
            display: none;
          }

          .chart-summary {
            grid-template-columns: repeat(2, 1fr);
          }

          .chart-summary-label,
          .chart-summary span,
          .chart-summary strong,
          .chart-summary-current,
          .chart-summary small {
            grid-row: auto;
          }
        }
      `}</style>
    </div>
  );
}