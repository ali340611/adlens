"use client";

import { useState } from "react";

const API_URL = "http://127.0.0.1:8001";

const initialStrategyForm = {
  product: "",
  country: "",
  monthly_budget: "",
  goal: "sales",
};

export default function Home() {
  const [strategyForm, setStrategyForm] = useState(initialStrategyForm);
  const [strategyResult, setStrategyResult] = useState(null);
  const [strategyLoading, setStrategyLoading] = useState(false);
  const [strategyError, setStrategyError] = useState("");

  const [adText, setAdText] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState("");

  function updateStrategyField(event) {
    const { name, value } = event.target;

    setStrategyForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function generateStrategy(event) {
    event.preventDefault();

    setStrategyLoading(true);
    setStrategyError("");
    setStrategyResult(null);

    try {
      const response = await fetch(`${API_URL}/strategy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: strategyForm.product.trim(),
          country: strategyForm.country.trim(),
          monthly_budget: Number(strategyForm.monthly_budget),
          goal: strategyForm.goal,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "The advertising strategy could not be generated."
        );
      }

      setStrategyResult(data);
    } catch (error) {
      setStrategyError(
        error.message ||
          "Backend connection failed. Make sure FastAPI is running on port 8001."
      );
    } finally {
      setStrategyLoading(false);
    }
  }

  async function analyzeAdvertisement(event) {
    event.preventDefault();

    setAnalysisLoading(true);
    setAnalysisError("");
    setAnalysisResult(null);

    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ad_text: adText.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "The advertisement could not be analyzed."
        );
      }

      setAnalysisResult(data);
    } catch (error) {
      setAnalysisError(
        error.message ||
          "Backend connection failed. Make sure FastAPI is running on port 8001."
      );
    } finally {
      setAnalysisLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="hero">
        <div className="brand">ADLENS</div>

        <span className="eyebrow">
          AI ADVERTISING DECISION PLATFORM
        </span>

        <h1>Turn your ad budget into a clear action plan.</h1>

        <p>
          Create a global channel strategy and analyze your advertising copy
          with AI.
        </p>
      </section>

      <section className="workspace">
        <form
          className="card form-card"
          onSubmit={generateStrategy}
        >
          <h2>Create Strategy</h2>

          <label>
            What do you sell?
            <input
              name="product"
              value={strategyForm.product}
              onChange={updateStrategyField}
              placeholder="AI Resume Templates"
              required
            />
          </label>

          <label>
            Target country
            <input
              name="country"
              value={strategyForm.country}
              onChange={updateStrategyField}
              placeholder="United States"
              required
            />
          </label>

          <label>
            Monthly ad budget
            <input
              name="monthly_budget"
              type="number"
              min="1"
              step="0.01"
              value={strategyForm.monthly_budget}
              onChange={updateStrategyField}
              placeholder="3000"
              required
            />
          </label>

          <label>
            Goal
            <select
              name="goal"
              value={strategyForm.goal}
              onChange={updateStrategyField}
            >
              <option value="sales">Sales</option>
              <option value="traffic">Traffic</option>
              <option value="awareness">Brand awareness</option>
              <option value="leads">Leads</option>
            </select>
          </label>

          <button type="submit" disabled={strategyLoading}>
            {strategyLoading
              ? "Generating Strategy..."
              : "Generate Strategy"}
          </button>

          {strategyError && (
            <p className="error">{strategyError}</p>
          )}
        </form>

        <section className="card result-card">
          {!strategyResult ? (
            <div className="empty">
              <div className="score-placeholder">AI</div>

              <h2>Your strategy will appear here.</h2>

              <p>
                Complete the form to generate your advertising plan.
              </p>
            </div>
          ) : (
            <>
              <div className="result-header">
                <div>
                  <span className="eyebrow">ADLENS SCORE</span>

                  <div className="score">
                    {strategyResult.score}/100
                  </div>
                </div>

                <p>{strategyResult.summary}</p>
              </div>

              <h3>Recommended Channels</h3>

              <div className="channels">
                {strategyResult.channels.map((item, index) => (
                  <article
                    className="channel"
                    key={`${item.channel}-${index}`}
                  >
                    <div className="channel-top">
                      <strong>{item.channel}</strong>
                      <span>{item.percentage}%</span>
                    </div>

                    <div className="bar">
                      <div
                        style={{
                          width: `${item.percentage}%`,
                        }}
                      />
                    </div>

                    <div className="channel-meta">
                      <span>
                        $
                        {Number(item.budget).toLocaleString(
                          "en-US",
                          {
                            maximumFractionDigits: 2,
                          }
                        )}
                      </span>

                      <small>{item.reason}</small>
                    </div>
                  </article>
                ))}
              </div>

              <h3>First 30-Day Plan</h3>

              <ol className="plan">
                {strategyResult.first_30_day_plan.map(
                  (step, index) => (
                    <li key={`${step}-${index}`}>{step}</li>
                  )
                )}
              </ol>
            </>
          )}
        </section>
      </section>

      <section className="workspace analysis-workspace">
        <form
          className="card form-card"
          onSubmit={analyzeAdvertisement}
        >
          <span className="eyebrow">AI COPY REVIEW</span>

          <h2>Analyze My Ad</h2>

          <label>
            Advertisement text
            <textarea
              value={adText}
              onChange={(event) => setAdText(event.target.value)}
              placeholder="Paste your advertisement copy here..."
              rows={10}
              minLength={5}
              maxLength={3000}
              required
            />
          </label>

          <button type="submit" disabled={analysisLoading}>
            {analysisLoading
              ? "Analyzing Advertisement..."
              : "Analyze Advertisement"}
          </button>

          {analysisError && (
            <p className="error">{analysisError}</p>
          )}
        </form>

        <section className="card result-card">
          {!analysisResult ? (
            <div className="empty">
              <div className="score-placeholder">AI</div>

              <h2>Your analysis will appear here.</h2>

              <p>
                Paste your advertising copy to receive an AI review.
              </p>
            </div>
          ) : (
            <>
              <div className="result-header">
                <div>
                  <span className="eyebrow">
                    AD PERFORMANCE SCORE
                  </span>

                  <div className="score">
                    {analysisResult.score}/100
                  </div>
                </div>

                <p>
                  AI review of your advertising message,
                  positioning and conversion potential.
                </p>
              </div>

              <AnalysisSection
                title="Strengths"
                items={analysisResult.strengths}
              />

              <AnalysisSection
                title="Weaknesses"
                items={analysisResult.weaknesses}
              />

              <AnalysisSection
                title="Recommended Improvements"
                items={analysisResult.suggestions}
              />
            </>
          )}
        </section>
      </section>
    </main>
  );
}

function AnalysisSection({ title, items }) {
  return (
    <section className="analysis-section">
      <h3>{title}</h3>

      <ul className="analysis-list">
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </section>
  );
}