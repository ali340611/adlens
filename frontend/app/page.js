"use client";

import { useState } from "react";

const API_URL =
  "https://adlens-backend-wt43.onrender.com";

const initialStrategy = {
  product: "AI Resume Templates",
  country: "United States",
  monthly_budget: "1000",
  goal: "sales",
};

const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
  },
  {
    id: "campaigns",
    label: "Campaigns",
  },
  {
    id: "creatives",
    label: "Creatives",
  },
  {
    id: "competitors",
    label: "Competitors",
  },
  {
    id: "reports",
    label: "Reports",
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
    throw new Error(
      data.detail || "Request failed"
    );
  }

  return data;
}

function PlatformIcon({ channel = "" }) {
  const name = channel.toLowerCase();

  if (name.includes("google")) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.7 4.7 0 0 1-2 3.1v2.6h3.2c1.9-1.8 3-4.4 3-7.5Z"
        />

        <path
          fill="currentColor"
          opacity=".8"
          d="M12 22c2.7 0 5-.9 6.6-2.3l-3.2-2.6c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.2H3.1v2.7A10 10 0 0 0 12 22Z"
        />

        <path
          fill="currentColor"
          opacity=".6"
          d="M6.4 13.9A6 6 0 0 1 6.1 12c0-.7.1-1.3.3-1.9V7.4H3.1A10 10 0 0 0 2 12c0 1.7.4 3.3 1.1 4.6l3.3-2.7Z"
        />

        <path
          fill="currentColor"
          opacity=".45"
          d="M12 5.9c1.6 0 3 .5 4.1 1.6l3.1-3A10 10 0 0 0 3.1 7.4l3.3 2.7C7.2 7.7 9.4 5.9 12 5.9Z"
        />
      </svg>
    );
  }

  if (name.includes("linkedin")) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M6.5 8.2H3.2V21h3.3V8.2ZM4.9 3A1.9 1.9 0 1 0 5 6.8 1.9 1.9 0 0 0 4.9 3ZM21 13.7c0-3.8-2-5.6-4.8-5.6-2.2 0-3.2 1.2-3.8 2.1v-2H9.1V21h3.3v-6.3c0-1.7.3-3.3 2.4-3.3s2.1 1.9 2.1 3.4V21H21v-7.3Z"
        />
      </svg>
    );
  }

  if (
    name.includes("facebook") ||
    name.includes("meta")
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M3 15.3C3 10.6 5.4 6 8.8 6c2.4 0 4.2 2.8 5.2 4.4C15 8.8 16.8 6 19.2 6 22.6 6 25 10.6 25 15.3c0 3.2-1.3 5.7-3.6 5.7-2.2 0-3.9-2.8-5.2-5L14 12.4 11.8 16c-1.3 2.2-3 5-5.2 5C4.3 21 3 18.5 3 15.3Z"
        />
      </svg>
    );
  }

  if (name.includes("instagram")) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M7.4 2h9.2A5.4 5.4 0 0 1 22 7.4v9.2a5.4 5.4 0 0 1-5.4 5.4H7.4A5.4 5.4 0 0 1 2 16.6V7.4A5.4 5.4 0 0 1 7.4 2Zm0 2A3.4 3.4 0 0 0 4 7.4v9.2A3.4 3.4 0 0 0 7.4 20h9.2a3.4 3.4 0 0 0 3.4-3.4V7.4A3.4 3.4 0 0 0 16.6 4H7.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
        />
      </svg>
    );
  }

  if (name.includes("email")) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M3.5 5h17A2.5 2.5 0 0 1 23 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-17A2.5 2.5 0 0 1 1 16.5v-9A2.5 2.5 0 0 1 3.5 5Zm.2 2 8.3 5.8L20.3 7H3.7Zm17.3 2.4-8.4 5.9a1 1 0 0 1-1.2 0L3 9.4v7.1c0 .3.2.5.5.5h17c.3 0 .5-.2.5-.5V9.4Z"
        />
      </svg>
    );
  }

  return <span>AI</span>;
}

function EmptyWorkspace({
  title,
  description,
}) {
  return (
    <section className="empty-dashboard card">
      <div className="empty-icon">
        AI
      </div>

      <h2>
        {title}
      </h2>

      <p>
        {description}
      </p>
    </section>
  );
}

export default function Home() {
  const [
    activeView,
    setActiveView,
  ] = useState("dashboard");

  const [
    strategyForm,
    setStrategyForm,
  ] = useState(initialStrategy);

  const [
    strategy,
    setStrategy,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    websiteUrl,
    setWebsiteUrl,
  ] = useState("");

  const [
    websiteResult,
    setWebsiteResult,
  ] = useState(null);

  const [
    websiteLoading,
    setWebsiteLoading,
  ] = useState(false);

  const [
    adText,
    setAdText,
  ] = useState("");

  const [
    adResult,
    setAdResult,
  ] = useState(null);

  const [
    adLoading,
    setAdLoading,
  ] = useState(false);

  function updateStrategy(e) {
    setStrategyForm({
      ...strategyForm,
      [e.target.name]:
        e.target.value,
    });
  }

  async function createStrategy(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const result =
        await apiRequest(
          "/strategy",
          {
            product:
              strategyForm.product,

            country:
              strategyForm.country,

            monthly_budget:
              Number(
                strategyForm.monthly_budget
              ),

            goal:
              strategyForm.goal,
          }
        );

      setStrategy(result);
      setActiveView("dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function analyzeWebsite(e) {
    e.preventDefault();

    setWebsiteLoading(true);

    try {
      const result =
        await apiRequest(
          "/website-analysis",
          {
            url: websiteUrl,
          }
        );

      setWebsiteResult(result);
      setActiveView("competitors");
    } catch (err) {
      alert(err.message);
    } finally {
      setWebsiteLoading(false);
    }
  }

  async function analyzeAd(e) {
    e.preventDefault();

    setAdLoading(true);

    try {
      const result =
        await apiRequest(
          "/analyze",
          {
            ad_text:
              adText.trim(),
          }
        );

      setAdResult(result);
      setActiveView("creatives");
    } catch (err) {
      alert(err.message);
    } finally {
      setAdLoading(false);
    }
  }

  const pageContent = {
    dashboard: {
      label:
        "ADVERTISING INTELLIGENCE",

      title:
        "Growth Dashboard",

      description:
        "Plan, analyze and improve your advertising with AI.",
    },

    campaigns: {
      label:
        "CAMPAIGN MANAGEMENT",

      title:
        "Campaigns",

      description:
        "Organize your advertising strategies, budgets and campaign status.",
    },

    creatives: {
      label:
        "CREATIVE INTELLIGENCE",

      title:
        "Creatives",

      description:
        "Analyze advertising copy and improve your creative performance.",
    },

    competitors: {
      label:
        "MARKET INTELLIGENCE",

      title:
        "Competitors",

      description:
        "Understand websites, positioning, audiences and market opportunities.",
    },

    reports: {
      label:
        "PERFORMANCE INSIGHTS",

      title:
        "Reports",

      description:
        "Review performance metrics and turn results into clear decisions.",
    },
  };

  const currentPage =
    pageContent[activeView];

  return (
    <main className="dashboard">

      <aside className="sidebar">

        <div className="logo-area">

          <div className="logo-mark">
            A
          </div>

          <div>
            <h2>
              AdLens
            </h2>

            <p>
              AI Growth Manager
            </p>
          </div>

        </div>


        <nav className="navigation">

          <span className="navigation-title">
            WORKSPACE
          </span>


          {navigationItems.map(
            (item) => (

              <button
                key={item.id}
                type="button"
                className={
                  `navigation-item ${
                    activeView === item.id
                      ? "active"
                      : ""
                  }`
                }
                onClick={() =>
                  setActiveView(
                    item.id
                  )
                }
              >
                {item.label}
              </button>

            )
          )}

        </nav>


        <div className="sidebar-divider" />


        <span className="navigation-title">
          AI TOOLS
        </span>


        <form
          className="tool-card"
          onSubmit={createStrategy}
        >

          <div className="tool-heading">

            <span className="tool-icon">
              S
            </span>

            <div>
              <h3>
                Create Strategy
              </h3>

              <p>
                Build your advertising plan
              </p>
            </div>

          </div>


          <label>
            Product

            <input
              name="product"
              value={
                strategyForm.product
              }
              onChange={
                updateStrategy
              }
              placeholder="AI Resume Templates"
              required
            />
          </label>


          <label>
            Target country

            <input
              name="country"
              value={
                strategyForm.country
              }
              onChange={
                updateStrategy
              }
              placeholder="United States"
              required
            />
          </label>


          <label>
            Monthly budget

            <input
              name="monthly_budget"
              type="number"
              min="1"
              value={
                strategyForm.monthly_budget
              }
              onChange={
                updateStrategy
              }
              placeholder="1000"
              required
            />
          </label>


          <label>
            Goal

            <select
              name="goal"
              value={
                strategyForm.goal
              }
              onChange={
                updateStrategy
              }
            >
              <option value="sales">
                Sales
              </option>

              <option value="traffic">
                Traffic
              </option>

              <option value="awareness">
                Awareness
              </option>

              <option value="leads">
                Leads
              </option>
            </select>
          </label>


          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Generating..."
              : "Generate Strategy"}
          </button>


          {error && (
            <p className="error">
              {error}
            </p>
          )}

        </form>


        <form
          className="tool-card"
          onSubmit={analyzeWebsite}
        >

          <div className="tool-heading">

            <span className="tool-icon">
              W
            </span>

            <div>
              <h3>
                Website Analyzer
              </h3>

              <p>
                Understand any business URL
              </p>
            </div>

          </div>


          <label>
            Website URL

            <input
              type="url"
              value={websiteUrl}
              onChange={(e) =>
                setWebsiteUrl(
                  e.target.value
                )
              }
              placeholder="https://yourwebsite.com"
              required
            />
          </label>


          <button
            type="submit"
            disabled={
              websiteLoading
            }
          >
            {websiteLoading
              ? "Analyzing..."
              : "Analyze Website"}
          </button>

        </form>


        <form
          className="tool-card"
          onSubmit={analyzeAd}
        >

          <div className="tool-heading">

            <span className="tool-icon">
              C
            </span>

            <div>
              <h3>
                Analyze My Ad
              </h3>

              <p>
                Review your advertising copy
              </p>
            </div>

          </div>


          <textarea
            value={adText}
            onChange={(e) =>
              setAdText(
                e.target.value
              )
            }
            placeholder="Paste your advertisement..."
            rows={6}
            required
          />


          <button
            type="submit"
            disabled={adLoading}
          >
            {adLoading
              ? "Analyzing..."
              : "Analyze Advertisement"}
          </button>

        </form>

      </aside>


      <section className="main-area">

        <header className="topbar">

          <div>

            <span className="page-label">
              {currentPage.label}
            </span>

            <h1>
              {currentPage.title}
            </h1>

            <p>
              {currentPage.description}
            </p>

          </div>


          <div className="user-area">

            <button
              type="button"
              className="icon-button"
            >
              N
            </button>

            <div className="user-avatar">
              MA
            </div>

          </div>

        </header>


        {activeView ===
          "dashboard" && (

          <>

            {!strategy ? (

              <EmptyWorkspace
                title="Create your first advertising strategy"
                description="Complete the form to generate a channel plan, budget allocation and 30-day action roadmap."
              />

            ) : (

              <>

                <section className="overview card">

                  <div className="overview-title">

                    <div>

                      <span className="page-label">
                        STRATEGY OVERVIEW
                      </span>

                      <h2>
                        {
                          strategyForm.product
                        }
                      </h2>

                    </div>


                    <span className="badge">
                      {
                        strategy.performance_level ||
                        "Generated"
                      }
                    </span>

                  </div>


                  <p className="strategy-summary">
                    {strategy.summary}
                  </p>


                  <div className="metrics">

                    <article className="metric-card">

                      <span>
                        Estimated CTR
                      </span>

                      <strong>
                        {
                          strategy
                            .expected_results
                            ?.estimated_ctr ||
                          "—"
                        }
                      </strong>

                    </article>


                    <article className="metric-card">

                      <span>
                        Estimated conversions
                      </span>

                      <strong>
                        {
                          strategy
                            .expected_results
                            ?.estimated_conversions ||
                          "—"
                        }
                      </strong>

                    </article>


                    <article className="metric-card">

                      <span>
                        Estimated CPA
                      </span>

                      <strong>
                        {
                          strategy
                            .expected_results
                            ?.estimated_cpa ||
                          "—"
                        }
                      </strong>

                    </article>

                  </div>

                </section>


                <section className="content-grid">

                  <div className="card">

                    <div className="section-header">

                      <h2>
                        Recommended Channels
                      </h2>

                      <span>
                        {
                          strategy.channels
                            ?.length || 0
                        }{" "}
                        Channels
                      </span>

                    </div>


                    <div className="channels">

                      {strategy.channels?.map(
                        (
                          item,
                          index
                        ) => (

                          <article
                            className="channel-item"
                            key={`${item.channel}-${index}`}
                          >

                            <div className="channel-header">

                              <div className="channel-name">

                                <div className="channel-icon">

                                  <PlatformIcon
                                    channel={
                                      item.channel
                                    }
                                  />

                                </div>


                                <div>

                                  <strong>
                                    {
                                      item.channel
                                    }
                                  </strong>

                                  <p>
                                    Budget $
                                    {
                                      item.budget
                                    }
                                  </p>

                                </div>

                              </div>


                              <strong>
                                {
                                  item.percentage
                                }
                                %
                              </strong>

                            </div>


                            <div className="progress">

                              <div
                                style={{
                                  width:
                                    `${Math.min(
                                      100,
                                      Math.max(
                                        0,
                                        Number(
                                          item.percentage
                                        ) || 0
                                      )
                                    )}%`,
                                }}
                              />

                            </div>


                            <small>
                              {
                                item.reason
                              }
                            </small>

                          </article>

                        )
                      )}

                    </div>

                  </div>


                  <div className="card score-card">

                    <span className="page-label">
                      ADLENS SCORE
                    </span>

                    <div className="circle-score">

                      {
                        strategy.score ??
                        "—"
                      }

                      <span>
                        /100
                      </span>

                    </div>

                    <p>
                      AI confidence score for this advertising strategy.
                    </p>

                  </div>

                </section>


                <section className="bottom-grid">

                  <section className="card">

                    <h2>
                      Potential Risks
                    </h2>


                    {strategy.risks?.length ? (

                      strategy.risks.map(
                        (
                          risk,
                          index
                        ) => (

                          <p key={index}>
                            ⚠ {risk}
                          </p>

                        )
                      )

                    ) : (

                      <p>
                        No major risks were returned.
                      </p>

                    )}

                  </section>


                  <section className="card">

                    <h2>
                      First 30-Day Plan
                    </h2>

                    <ol>

                      {strategy
                        .first_30_day_plan
                        ?.map(
                          (
                            step,
                            index
                          ) => (

                            <li key={index}>
                              {step}
                            </li>

                          )
                        )}

                    </ol>

                  </section>

                </section>

              </>

            )}

          </>

        )}


        {activeView ===
          "campaigns" && (

          <EmptyWorkspace
            title="Campaign workspace is ready"
            description="The next step is to save generated strategies here with campaign name, platform, budget, status and performance metrics."
          />

        )}


        {activeView ===
          "creatives" && (

          <>

            {!adResult ? (

              <EmptyWorkspace
                title="Analyze your first creative"
                description="Paste an advertisement into the Analyze My Ad tool. Your score, strengths and improvement ideas will appear here."
              />

            ) : (

              <section className="card analysis-result">

                <h2>
                  Advertisement Analysis
                </h2>


                <div className="metrics">

                  <article className="metric-card">

                    <span>
                      Overall Score
                    </span>

                    <strong>
                      {
                        adResult.score ??
                        "—"
                      }
                    </strong>

                  </article>


                  <article className="metric-card">

                    <span>
                      Headline
                    </span>

                    <strong>
                      {
                        adResult.headline_score ??
                        "—"
                      }
                    </strong>

                  </article>


                  <article className="metric-card">

                    <span>
                      CTA
                    </span>

                    <strong>
                      {
                        adResult.cta_score ??
                        "—"
                      }
                    </strong>

                  </article>

                </div>


                {adResult.strengths
                  ?.length > 0 && (

                  <>

                    <h3>
                      Strengths
                    </h3>

                    <ul>

                      {adResult.strengths.map(
                        (
                          item,
                          index
                        ) => (

                          <li key={index}>
                            {item}
                          </li>

                        )
                      )}

                    </ul>

                  </>

                )}


                {adResult.weaknesses
                  ?.length > 0 && (

                  <>

                    <h3>
                      Weaknesses
                    </h3>

                    <ul>

                      {adResult.weaknesses.map(
                        (
                          item,
                          index
                        ) => (

                          <li key={index}>
                            {item}
                          </li>

                        )
                      )}

                    </ul>

                  </>

                )}


                {adResult.suggestions
                  ?.length > 0 && (

                  <>

                    <h3>
                      Recommended Improvements
                    </h3>

                    <ul>

                      {adResult.suggestions.map(
                        (
                          item,
                          index
                        ) => (

                          <li key={index}>
                            {item}
                          </li>

                        )
                      )}

                    </ul>

                  </>

                )}

              </section>

            )}

          </>

        )}


        {activeView ===
          "competitors" && (

          <>

            {!websiteResult ? (

              <EmptyWorkspace
                title="Analyze a competitor website"
                description="Enter a website URL in the Website Analyzer. Brand positioning, audience, pain points and recommended channels will appear here."
              />

            ) : (

              <section className="card website-result">

                <h2>
                  Website Intelligence
                </h2>


                <p>
                  <strong>
                    Brand:
                  </strong>{" "}
                  {
                    websiteResult.brand ||
                    "—"
                  }
                </p>


                <p>
                  <strong>
                    Product:
                  </strong>{" "}
                  {
                    websiteResult.product ||
                    "—"
                  }
                </p>


                <p>
                  <strong>
                    Audience:
                  </strong>{" "}
                  {
                    websiteResult.target_audience ||
                    "—"
                  }
                </p>


                {websiteResult
                  .value_proposition && (

                  <p>
                    <strong>
                      Value Proposition:
                    </strong>{" "}
                    {
                      websiteResult.value_proposition
                    }
                  </p>

                )}


                <h3>
                  Pain Points
                </h3>

                <ul>

                  {websiteResult
                    .pain_points
                    ?.map(
                      (
                        item,
                        index
                      ) => (

                        <li key={index}>
                          {item}
                        </li>

                      )
                    )}

                </ul>


                <h3>
                  Recommended Channels
                </h3>

                <ul>

                  {websiteResult
                    .recommended_channels
                    ?.map(
                      (
                        item,
                        index
                      ) => (

                        <li key={index}>
                          {item}
                        </li>

                      )
                    )}

                </ul>

              </section>

            )}

          </>

        )}


        {activeView ===
          "reports" && (

          <EmptyWorkspace
            title="Reports will appear here"
            description="This area will combine spend, conversions, CTR, CPA and ROAS data after campaign tracking is connected."
          />

        )}

      </section>

    </main>
  );
}