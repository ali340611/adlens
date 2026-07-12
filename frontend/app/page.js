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



async function apiRequest(endpoint, body){

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(body),
    }
  );


  const data = await response.json();


  if(!response.ok){

    throw new Error(
      data.detail || "Request failed"
    );

  }


  return data;

}



export default function Home(){


const [strategyForm,setStrategyForm] =
useState(initialStrategy);



const [strategy,setStrategy] =
useState(null);



const [loading,setLoading] =
useState(false);



const [error,setError] =
useState("");



const [websiteUrl,setWebsiteUrl] =
useState("");



const [websiteResult,setWebsiteResult] =
useState(null);



const [websiteLoading,setWebsiteLoading] =
useState(false);




const [adText,setAdText] =
useState("");



const [adResult,setAdResult] =
useState(null);




function updateStrategy(e){

setStrategyForm({

...strategyForm,

[e.target.name]:
e.target.value

});

}




async function createStrategy(e){

e.preventDefault();


setLoading(true);

setError("");


try{


const result =
await apiRequest(
"/strategy",
{

product:
strategyForm.product,


country:
strategyForm.country,


monthly_budget:
Number(strategyForm.monthly_budget),


goal:
strategyForm.goal

}

);


setStrategy(result);


}

catch(err){

setError(
err.message
);

}


finally{

setLoading(false);

}

}






async function analyzeWebsite(e){

e.preventDefault();


setWebsiteLoading(true);



try{


const result =
await apiRequest(
"/website-analysis",
{
url:websiteUrl
}
);


setWebsiteResult(result);


}

catch(err){

alert(err.message);

}


finally{

setWebsiteLoading(false);

}

}
async function analyzeAd(e) {
  e.preventDefault();

  try {
    const result = await apiRequest(
      "/analyze",
      {
        ad_text: adText.trim(),
      }
    );

    setAdResult(result);
  } catch (err) {
    alert(err.message);
  }
}


return (
  <main className="dashboard">

    <aside className="sidebar">

      <div className="logo-area">
        <div className="logo-mark">A</div>

        <div>
          <h2>AdLens</h2>
          <p>AI Growth Manager</p>
        </div>
      </div>


      <nav className="navigation">

        <span className="navigation-title">
          WORKSPACE
        </span>

        <button
          type="button"
          className="navigation-item active"
        >
          Dashboard
        </button>

        <button
          type="button"
          className="navigation-item"
        >
          Campaigns
        </button>

        <button
          type="button"
          className="navigation-item"
        >
          Creatives
        </button>

        <button
          type="button"
          className="navigation-item"
        >
          Competitors
        </button>

        <button
          type="button"
          className="navigation-item"
        >
          Reports
        </button>

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
          <span className="tool-icon">S</span>

          <div>
            <h3>Create Strategy</h3>
            <p>Build your advertising plan</p>
          </div>
        </div>


        <label>
          Product

          <input
            name="product"
            value={strategyForm.product}
            onChange={updateStrategy}
            placeholder="AI Resume Templates"
            required
          />
        </label>


        <label>
          Target country

          <input
            name="country"
            value={strategyForm.country}
            onChange={updateStrategy}
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
            value={strategyForm.monthly_budget}
            onChange={updateStrategy}
            placeholder="1000"
            required
          />
        </label>


        <label>
          Goal

          <select
            name="goal"
            value={strategyForm.goal}
            onChange={updateStrategy}
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
          <span className="tool-icon">W</span>

          <div>
            <h3>Website Analyzer</h3>
            <p>Understand any business URL</p>
          </div>
        </div>


        <label>
          Website URL

          <input
            type="url"
            value={websiteUrl}
            onChange={(e) =>
              setWebsiteUrl(e.target.value)
            }
            placeholder="https://yourwebsite.com"
            required
          />
        </label>


        <button
          type="submit"
          disabled={websiteLoading}
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
          <span className="tool-icon">C</span>

          <div>
            <h3>Analyze My Ad</h3>
            <p>Review your advertising copy</p>
          </div>
        </div>


        <textarea
          value={adText}
          onChange={(e) =>
            setAdText(e.target.value)
          }
          placeholder="Paste your advertisement..."
          rows={6}
          required
        />


        <button type="submit">
          Analyze Advertisement
        </button>

      </form>

    </aside>


    <section className="main-area">

      <header className="topbar">

        <div>
          <span className="page-label">
            ADVERTISING INTELLIGENCE
          </span>

          <h1>
            Growth Dashboard
          </h1>

          <p>
            Plan, analyze and improve your advertising
            with AI.
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


      {!strategy ? (

        <section className="empty-dashboard card">

          <div className="empty-icon">
            AI
          </div>

          <h2>
            Create your first advertising strategy
          </h2>

          <p>
            Complete the form to generate a channel plan,
            budget allocation and 30-day action roadmap.
          </p>

        </section>

      ) : (

        <>

          <section className="overview card">

            <div className="overview-title">

              <div>
                <span className="page-label">
                  STRATEGY OVERVIEW
                </span>

                <h2>
                  {strategyForm.product}
                </h2>
              </div>


              <span className="badge">
                {strategy.performance_level}
              </span>

            </div>


            <p className="strategy-summary">
              {strategy.summary}
            </p>


            <div className="metrics">

              <article className="metric-card">
                <span>Estimated CTR</span>

                <strong>
                  {strategy.expected_results
                    ?.estimated_ctr}
                </strong>
              </article>


              <article className="metric-card">
                <span>Estimated conversions</span>

                <strong>
                  {strategy.expected_results
                    ?.estimated_conversions}
                </strong>
              </article>


              <article className="metric-card">
                <span>Estimated CPA</span>

                <strong>
                  {strategy.expected_results
                    ?.estimated_cpa}
                </strong>
              </article>

            </div>

          </section>
                    <section className="content-grid">

            <div className="card">

              <div className="section-header">
                <h2>Recommended Channels</h2>

                <span>
                  {strategy.channels.length} Channels
                </span>
              </div>

              <div className="channels">

                {strategy.channels.map((item, index) => (

                  <article
                    className="channel-item"
                    key={index}
                  >

                    <div className="channel-header">

                      <div className="channel-name">

                        <div className="channel-icon">

                          {item.channel.includes("Google")
                            ? "G"
                            : item.channel.includes("LinkedIn")
                            ? "in"
                            : item.channel.includes("Facebook")
                            ? "M"
                            : item.channel.includes("Email")
                            ? "@"
                            : "AI"}

                        </div>

                        <div>

                          <strong>
                            {item.channel}
                          </strong>

                          <p>
                            Budget ${item.budget}
                          </p>

                        </div>

                      </div>

                      <strong>
                        {item.percentage}%
                      </strong>

                    </div>

                    <div className="progress">

                      <div
                        style={{
                          width: `${item.percentage}%`,
                        }}
                      />

                    </div>

                    <small>
                      {item.reason}
                    </small>

                  </article>

                ))}

              </div>

            </div>



            <div className="card score-card">

              <span className="page-label">
                ADLENS SCORE
              </span>

              <div className="circle-score">

                {strategy.score}

                <span>
                  /100
                </span>

              </div>

              <p>
                AI confidence score for this
                advertising strategy.
              </p>

            </div>

          </section>



          <section className="bottom-grid">

            <section className="card">

              <h2>
                Potential Risks
              </h2>

              {strategy.risks?.map((risk, index) => (

                <p key={index}>
                  ⚠ {risk}
                </p>

              ))}

            </section>



            <section className="card">

              <h2>
                First 30-Day Plan
              </h2>

              <ol>

                {strategy.first_30_day_plan?.map(
                  (step, index) => (

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



      {websiteResult && (

        <section className="card">

          <h2>
            Website Intelligence
          </h2>

          <p>
            <strong>Brand:</strong>{" "}
            {websiteResult.brand}
          </p>

          <p>
            <strong>Product:</strong>{" "}
            {websiteResult.product}
          </p>

          <p>
            <strong>Audience:</strong>{" "}
            {websiteResult.target_audience}
          </p>

          <h3>
            Pain Points
          </h3>

          <ul>

            {websiteResult.pain_points.map(
              (item, index) => (

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

            {websiteResult.recommended_channels.map(
              (item, index) => (

                <li key={index}>
                  {item}
                </li>

              )
            )}

          </ul>

        </section>

      )}



      {adResult && (

        <section className="card">

          <h2>
            Advertisement Analysis
          </h2>

          <div className="metrics">

            <article className="metric-card">

              <span>Overall Score</span>

              <strong>
                {adResult.score}
              </strong>

            </article>

            <article className="metric-card">

              <span>Headline</span>

              <strong>
                {adResult.headline_score}
              </strong>

            </article>

            <article className="metric-card">

              <span>CTA</span>

              <strong>
                {adResult.cta_score}
              </strong>

            </article>

          </div>

        </section>

      )}

    </section>

  </main>

);

}