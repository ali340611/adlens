"use client";

import { useState } from "react";
import {
  Activity,
  BarChart3,
  Bot,
  Brain,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  FileText,
  Globe2,
  LayoutDashboard,
  Megaphone,
  Palette,
  Rocket,
  Search,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  WandSparkles,
  Zap,
} from "lucide-react";

const API_URL =
  "https://adlens-backend-wt43.onrender.com";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Campaigns",
    icon: Megaphone,
  },
  {
    name: "Creatives",
    icon: Palette,
  },
  {
    name: "Competitors",
    icon: Users,
  },
  {
    name: "Reports",
    icon: BarChart3,
  },
];

const demoStrategies = [
  {
    name: "AI Resume Templates",
    country: "United States",
    budget: "$1,000",
    goal: "Sales",
    score: 92,
  },
  {
    name: "Fitness App Launch",
    country: "Canada",
    budget: "$2,500",
    goal: "Leads",
    score: 85,
  },
  {
    name: "SaaS Product",
    country: "United Kingdom",
    budget: "$3,000",
    goal: "Sales",
    score: 89,
  },
];

async function apiRequest(endpoint, body) {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      "The server returned an invalid response."
    );
  }

  if (!response.ok) {
    const detail =
      typeof data.detail === "string"
        ? data.detail
        : "Request failed";

    throw new Error(detail);
  }

  return data;
}

function StatCard({
  icon: Icon,
  label,
  value,
  change,
}) {
  return (
    <article className="stat-card">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{change}</small>
      </div>

      <div className="stat-icon">
        <Icon size={22} />
      </div>
    </article>
  );
}

function ToolButton({
  icon: Icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      type="button"
      className="quick-tool"
      onClick={onClick}
    >
      <div className="quick-tool-icon">
        <Icon size={20} />
      </div>

      <div>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>

      <ChevronRight size={17} />
    </button>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
}) {
  return (
    <section className="empty-state panel">
      <div className="empty-state-icon">
        <Icon size={34} />
      </div>

      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}

export default function Home() {
  const [active, setActive] =
    useState("Dashboard");

  const [form, setForm] = useState({
    product: "AI Resume Templates",
    country: "United States",
    monthly_budget: "1000",
    goal: "sales",
  });

  const [strategy, setStrategy] =
    useState(null);

  const [website, setWebsite] =
    useState("");

  const [websiteResult, setWebsiteResult] =
    useState(null);

  const [adText, setAdText] =
    useState("");

  const [adResult, setAdResult] =
    useState(null);

  const [strategyLoading, setStrategyLoading] =
    useState(false);

  const [websiteLoading, setWebsiteLoading] =
    useState(false);

  const [adLoading, setAdLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  function updateForm(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]:
        event.target.value,
    }));
  }

  async function generateStrategy(event) {
    event?.preventDefault();

    setStrategyLoading(true);
    setError("");

    try {
      const data = await apiRequest(
        "/strategy",
        {
          product: form.product.trim(),
          country: form.country.trim(),
          monthly_budget: Number(
            form.monthly_budget
          ),
          goal: form.goal,
        }
      );

      setStrategy(data);
      setActive("Dashboard");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setStrategyLoading(false);
    }
  }

  async function analyzeWebsite(event) {
    event?.preventDefault();

    if (!website.trim()) {
      setError(
        "Please enter a website URL."
      );
      return;
    }

    setWebsiteLoading(true);
    setError("");

    try {
      const data = await apiRequest(
        "/website-analysis",
        {
          url: website.trim(),
        }
      );

      setWebsiteResult(data);
      setActive("Competitors");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setWebsiteLoading(false);
    }
  }

  async function analyzeAd(event) {
    event?.preventDefault();

    if (!adText.trim()) {
      setError(
        "Please enter advertisement copy."
      );
      return;
    }

    setAdLoading(true);
    setError("");

    try {
      const data = await apiRequest(
        "/analyze",
        {
          ad_text: adText.trim(),
        }
      );

      setAdResult(data);
      setActive("Creatives");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setAdLoading(false);
    }
  }

  const pageDescriptions = {
    Dashboard:
      "AI-powered marketing command center.",
    Campaigns:
      "Manage campaigns, budgets and performance.",
    Creatives:
      "Analyze and improve advertising creatives.",
    Competitors:
      "Understand websites and market positioning.",
    Reports:
      "Review marketing performance and opportunities.",
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <Brain size={24} />
          </div>

          <div>
            <h2>AdLens</h2>
            <p>AI Marketing Intelligence</p>
          </div>
        </div>

        <span className="sidebar-label">
          WORKSPACE
        </span>

        <nav className="menu">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                type="button"
                key={item.name}
                className={
                  active === item.name
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActive(item.name)
                }
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <span className="sidebar-label tools-label">
          AI TOOLS
        </span>

        <form
          className="sidebar-tool"
          onSubmit={generateStrategy}
        >
          <div className="sidebar-tool-title">
            <WandSparkles size={17} />
            <h3>Create Strategy</h3>
          </div>

          <input
            name="product"
            value={form.product}
            onChange={updateForm}
            placeholder="Product or business"
            required
          />

          <input
            name="country"
            value={form.country}
            onChange={updateForm}
            placeholder="Target country"
            required
          />

          <input
            name="monthly_budget"
            type="number"
            min="1"
            value={form.monthly_budget}
            onChange={updateForm}
            placeholder="Monthly budget"
            required
          />

          <select
            name="goal"
            value={form.goal}
            onChange={updateForm}
          >
            <option value="sales">
              Sales
            </option>
            <option value="traffic">
              Traffic
            </option>
            <option value="leads">
              Leads
            </option>
            <option value="awareness">
              Awareness
            </option>
          </select>

          <button
            type="submit"
            className="primary-button"
            disabled={strategyLoading}
          >
            <Sparkles size={16} />

            {strategyLoading
              ? "Generating..."
              : "Generate Strategy"}
          </button>
        </form>

        <form
          className="sidebar-tool"
          onSubmit={analyzeWebsite}
        >
          <div className="sidebar-tool-title">
            <Globe2 size={17} />
            <h3>Website Analyzer</h3>
          </div>

          <input
            type="url"
            value={website}
            onChange={(event) =>
              setWebsite(event.target.value)
            }
            placeholder="https://website.com"
            required
          />

          <button
            type="submit"
            className="primary-button"
            disabled={websiteLoading}
          >
            <Search size={16} />

            {websiteLoading
              ? "Analyzing..."
              : "Analyze Website"}
          </button>
        </form>

        <form
          className="sidebar-tool"
          onSubmit={analyzeAd}
        >
          <div className="sidebar-tool-title">
            <Target size={17} />
            <h3>Analyze My Ad</h3>
          </div>

          <textarea
            value={adText}
            onChange={(event) =>
              setAdText(event.target.value)
            }
            placeholder="Paste your advertisement..."
            required
          />

          <button
            type="submit"
            className="primary-button"
            disabled={adLoading}
          >
            <Activity size={16} />

            {adLoading
              ? "Analyzing..."
              : "Analyze Advertisement"}
          </button>
        </form>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="upgrade-card">
          <div className="upgrade-icon">
            <Zap size={18} />
          </div>

          <h3>Go Premium</h3>

          <p>
            Unlock advanced insights,
            exports and unlimited analyses.
          </p>

          <button type="button">
            Upgrade Now
          </button>
        </div>
      </aside>

      <section className="main-content">
        <header className="topbar">
          <div>
            <span className="eyebrow">
              ADVERTISING INTELLIGENCE
            </span>

            <h1>{active}</h1>

            <p>
              {pageDescriptions[active]}
            </p>
          </div>

          <div className="topbar-actions">
            <button
              type="button"
              className="premium-chip"
            >
              <Sparkles size={16} />
              Premium Plan
            </button>

            <div className="profile">
              MA
            </div>
          </div>
        </header>

        {active === "Dashboard" && (
          <>
            <section className="welcome-banner">
              <div>
                <span>
                  AI MARKETING OPERATING SYSTEM
                </span>

                <h2>
                  Welcome back, Muhammed Ali
                </h2>

                <p>
                  Turn marketing data into clear,
                  profitable actions.
                </p>
              </div>

              <div className="welcome-art">
                <Bot size={56} />
              </div>
            </section>

            <section className="stats-grid">
              <StatCard
                icon={FileText}
                label="Strategies Created"
                value="12"
                change="+20% this month"
              />

              <StatCard
                icon={TrendingUp}
                label="Average Strategy Score"
                value={
                  strategy?.score
                    ? `${strategy.score}/100`
                    : "87/100"
                }
                change="Excellent"
              />

              <StatCard
                icon={Activity}
                label="Ads Analyzed"
                value="28"
                change="+40% this month"
              />

              <StatCard
                icon={Globe2}
                label="Websites Analyzed"
                value="9"
                change="+12% this month"
              />
            </section>

            {!strategy ? (
              <section className="dashboard-grid">
                <div className="panel recent-panel">
                  <div className="panel-header">
                    <div>
                      <span className="eyebrow">
                        RECENT WORK
                      </span>
                      <h2>
                        Recent Strategies
                      </h2>
                    </div>

                    <button type="button">
                      View all
                    </button>
                  </div>

                  <div className="strategy-list">
                    {demoStrategies.map(
                      (item) => (
                        <article
                          key={item.name}
                          className="strategy-row"
                        >
                          <div className="strategy-row-icon">
                            <Rocket size={18} />
                          </div>

                          <div className="strategy-row-main">
                            <strong>
                              {item.name}
                            </strong>

                            <span>
                              {item.country} ·{" "}
                              {item.budget} ·{" "}
                              {item.goal}
                            </span>
                          </div>

                          <div className="mini-score">
                            {item.score}
                          </div>

                          <ChevronRight
                            size={17}
                          />
                        </article>
                      )
                    )}
                  </div>
                </div>

                <div className="panel opportunities-panel">
                  <div className="panel-header">
                    <div>
                      <span className="eyebrow">
                        AI OPPORTUNITIES
                      </span>
                      <h2>
                        Biggest Opportunities
                      </h2>
                    </div>
                  </div>

                  <div className="opportunity">
                    <Target size={18} />
                    <div>
                      <strong>
                        Improve landing-page CTA
                      </strong>
                      <span>
                        Potential conversion increase:
                        18%
                      </span>
                    </div>
                  </div>

                  <div className="opportunity">
                    <CircleDollarSign size={18} />
                    <div>
                      <strong>
                        Reallocate search budget
                      </strong>
                      <span>
                        Estimated monthly savings:
                        $420
                      </span>
                    </div>
                  </div>

                  <div className="opportunity">
                    <Megaphone size={18} />
                    <div>
                      <strong>
                        Launch video creatives
                      </strong>
                      <span>
                        Expected CTR improvement:
                        23%
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            ) : (
              <>
                <section className="strategy-hero panel">
                  <div className="strategy-hero-content">
                    <span className="strategy-tag">
                      <Brain size={14} />
                      AI STRATEGY
                    </span>

                    <h2>{form.product}</h2>

                    <p>
                      {strategy.summary ||
                        "Your AI advertising strategy is ready."}
                    </p>

                    <div className="strategy-meta">
                      <span>{form.country}</span>
                      <span>
                        ${form.monthly_budget}
                      </span>
                      <span>
                        {form.goal}
                      </span>
                    </div>
                  </div>

                  <div className="large-score">
                    <span>AI SCORE</span>
                    <strong>
                      {strategy.score || 0}
                    </strong>
                    <small>/100</small>
                  </div>
                </section>

                <section className="section-block">
                  <div className="section-heading">
                    <div>
                      <span className="eyebrow">
                        BUDGET ALLOCATION
                      </span>

                      <h2>
                        Recommended Channels
                      </h2>
                    </div>

                    <span className="section-count">
                      {strategy.channels?.length ||
                        0}{" "}
                      channels
                    </span>
                  </div>

                  <div className="channel-grid">
                    {strategy.channels?.map(
                      (channel, index) => {
                        const percentage =
                          Number(
                            channel.percentage
                          ) || 0;

                        const budget =
                          Math.round(
                            Number(
                              form.monthly_budget
                            ) *
                              (percentage / 100)
                          );

                        return (
                          <article
                            className="channel-card"
                            key={`${channel.channel}-${index}`}
                          >
                            <div className="channel-card-top">
                              <div className="channel-card-icon">
                                <Megaphone
                                  size={19}
                                />
                              </div>

                              <span>
                                {percentage}%
                              </span>
                            </div>

                            <h3>
                              {channel.channel}
                            </h3>

                            <p>
                              {channel.reason}
                            </p>

                            <div className="progress-track">
                              <div
                                style={{
                                  width: `${Math.min(
                                    100,
                                    Math.max(
                                      0,
                                      percentage
                                    )
                                  )}%`,
                                }}
                              />
                            </div>

                            <div className="channel-budget">
                              <span>
                                Monthly budget
                              </span>

                              <strong>
                                ${budget}
                              </strong>
                            </div>
                          </article>
                        );
                      }
                    )}
                  </div>
                </section>

                <section className="plan-grid">
                  <div className="panel">
                    <span className="eyebrow">
                      EXECUTION ROADMAP
                    </span>

                    <h2>
                      First 30-Day Plan
                    </h2>

                    <div className="plan-list">
                      {(
                        strategy.first_30_day_plan ||
                        [
                          "Launch campaigns on recommended channels.",
                          "Test audiences and creative variations.",
                          "Review results and optimize budget allocation.",
                          "Build retargeting campaigns for engaged visitors.",
                        ]
                      ).map(
                        (step, index) => (
                          <div
                            className="plan-step"
                            key={index}
                          >
                            <div className="step-number">
                              {index + 1}
                            </div>

                            <p>{step}</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="panel risk-panel">
                    <span className="eyebrow">
                      RISK MONITOR
                    </span>

                    <h2>
                      Potential Risks
                    </h2>

                    {strategy.risks?.length ? (
                      strategy.risks.map(
                        (risk, index) => (
                          <div
                            className="risk-item"
                            key={index}
                          >
                            <Activity size={17} />
                            <span>{risk}</span>
                          </div>
                        )
                      )
                    ) : (
                      <div className="risk-item">
                        <CheckCircle2 size={17} />
                        <span>
                          No major risks were
                          returned.
                        </span>
                      </div>
                    )}
                  </div>
                </section>
              </>
            )}

            <section className="panel tools-panel">
              <div className="panel-header">
                <div>
                  <span className="eyebrow">
                    QUICK ACTIONS
                  </span>

                  <h2>AI Marketing Tools</h2>
                </div>
              </div>

              <div className="quick-tools-grid">
                <ToolButton
                  icon={WandSparkles}
                  title="Create Strategy"
                  description="Build a complete channel plan."
                  onClick={() =>
                    document
                      .querySelector(
                        ".sidebar"
                      )
                      ?.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      })
                  }
                />

                <ToolButton
                  icon={Globe2}
                  title="Website Analyzer"
                  description="Find website growth opportunities."
                  onClick={() =>
                    setActive("Competitors")
                  }
                />

                <ToolButton
                  icon={Target}
                  title="Ad Analyzer"
                  description="Improve your ad performance."
                  onClick={() =>
                    setActive("Creatives")
                  }
                />

                <ToolButton
                  icon={BarChart3}
                  title="Reports"
                  description="Review performance insights."
                  onClick={() =>
                    setActive("Reports")
                  }
                />
              </div>
            </section>
          </>
        )}

        {active === "Campaigns" && (
          <section className="panel page-panel">
            <div className="panel-header">
              <div>
                <span className="eyebrow">
                  CAMPAIGN MANAGEMENT
                </span>

                <h2>Campaign Center</h2>
              </div>

              <button
                type="button"
                className="secondary-button"
              >
                <Rocket size={16} />
                New Campaign
              </button>
            </div>

            <div className="campaign-table">
              <div className="campaign-table-head">
                <span>Campaign</span>
                <span>Channel</span>
                <span>Budget</span>
                <span>Status</span>
                <span>ROAS</span>
              </div>

              <div className="campaign-table-row">
                <strong>
                  Resume Templates USA
                </strong>
                <span>Meta Ads</span>
                <span>$400</span>
                <span className="status-active">
                  Active
                </span>
                <span>3.2x</span>
              </div>

              <div className="campaign-table-row">
                <strong>
                  Search Conversion
                </strong>
                <span>Google Ads</span>
                <span>$350</span>
                <span className="status-active">
                  Active
                </span>
                <span>4.1x</span>
              </div>

              <div className="campaign-table-row">
                <strong>
                  Professional Audience
                </strong>
                <span>LinkedIn</span>
                <span>$150</span>
                <span className="status-draft">
                  Draft
                </span>
                <span>—</span>
              </div>
            </div>
          </section>
        )}

        {active === "Creatives" && (
          <>
            {!adResult ? (
              <EmptyState
                icon={Palette}
                title="Analyze your first advertisement"
                description="Paste your ad copy into the Ad Analyzer in the sidebar. Your score, strengths and recommendations will appear here."
              />
            ) : (
              <section className="panel page-panel">
                <span className="eyebrow">
                  CREATIVE INTELLIGENCE
                </span>

                <h2>Advertisement Analysis</h2>

                <div className="analysis-score-grid">
                  <StatCard
                    icon={Activity}
                    label="Overall Score"
                    value={`${adResult.score ?? 0}/100`}
                    change="AI evaluation"
                  />

                  <StatCard
                    icon={Target}
                    label="Headline Score"
                    value={
                      adResult.headline_score ??
                      "—"
                    }
                    change="Message clarity"
                  />

                  <StatCard
                    icon={Send}
                    label="CTA Score"
                    value={
                      adResult.cta_score ?? "—"
                    }
                    change="Action strength"
                  />
                </div>

                <div className="analysis-columns">
                  <div className="analysis-card positive">
                    <h3>Strengths</h3>

                    {adResult.strengths?.map(
                      (item, index) => (
                        <p key={index}>
                          <CheckCircle2
                            size={16}
                          />
                          {item}
                        </p>
                      )
                    )}
                  </div>

                  <div className="analysis-card negative">
                    <h3>Weaknesses</h3>

                    {adResult.weaknesses?.map(
                      (item, index) => (
                        <p key={index}>
                          <Activity size={16} />
                          {item}
                        </p>
                      )
                    )}
                  </div>

                  <div className="analysis-card recommendation">
                    <h3>
                      AI Recommendations
                    </h3>

                    {adResult.suggestions?.map(
                      (item, index) => (
                        <p key={index}>
                          <Sparkles size={16} />
                          {item}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        {active === "Competitors" && (
          <>
            {!websiteResult ? (
              <EmptyState
                icon={Globe2}
                title="Analyze a website"
                description="Enter a website URL in the sidebar. AdLens will identify its positioning, audience, pain points and recommended marketing channels."
              />
            ) : (
              <section className="panel page-panel">
                <span className="eyebrow">
                  WEBSITE INTELLIGENCE
                </span>

                <h2>
                  {websiteResult.brand ||
                    "Website Analysis"}
                </h2>

                <div className="website-summary-grid">
                  <article>
                    <span>Product</span>
                    <strong>
                      {websiteResult.product ||
                        "—"}
                    </strong>
                  </article>

                  <article>
                    <span>Target Audience</span>
                    <strong>
                      {websiteResult.target_audience ||
                        "—"}
                    </strong>
                  </article>

                  <article>
                    <span>
                      Value Proposition
                    </span>
                    <strong>
                      {websiteResult.value_proposition ||
                        "—"}
                    </strong>
                  </article>
                </div>

                <div className="analysis-columns">
                  <div className="analysis-card negative">
                    <h3>Customer Pain Points</h3>

                    {websiteResult.pain_points?.map(
                      (item, index) => (
                        <p key={index}>
                          <Activity size={16} />
                          {item}
                        </p>
                      )
                    )}
                  </div>

                  <div className="analysis-card recommendation">
                    <h3>
                      Recommended Channels
                    </h3>

                    {websiteResult.recommended_channels?.map(
                      (item, index) => (
                        <p key={index}>
                          <TrendingUp
                            size={16}
                          />
                          {item}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        {active === "Reports" && (
          <section className="panel page-panel">
            <span className="eyebrow">
              PERFORMANCE REPORTS
            </span>

            <h2>Marketing Analytics</h2>

            <section className="stats-grid reports-stats">
              <StatCard
                icon={CircleDollarSign}
                label="Total Spend"
                value="$1,500"
                change="+12% this month"
              />

              <StatCard
                icon={Target}
                label="Conversions"
                value="42"
                change="+18% this month"
              />

              <StatCard
                icon={TrendingUp}
                label="ROAS"
                value="3.4x"
                change="Strong performance"
              />

              <StatCard
                icon={Activity}
                label="Average CTR"
                value="2.8%"
                change="+0.6% improvement"
              />
            </section>

            <div className="report-chart">
              <div className="chart-header">
                <div>
                  <span className="eyebrow">
                    PERFORMANCE TREND
                  </span>
                  <h3>Strategy Score</h3>
                </div>

                <span>Last 30 days</span>
              </div>

              <div className="chart-area">
                <div className="chart-line" />
                <div className="chart-dot dot-one" />
                <div className="chart-dot dot-two" />
                <div className="chart-dot dot-three" />
                <div className="chart-dot dot-four" />
              </div>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}