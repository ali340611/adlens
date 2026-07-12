"use client";

import { useState } from "react";

const API_URL = "https://adlens-backend-wt43.onrender.com";


const initialStrategyForm = {
  product: "",
  country: "",
  monthly_budget: "",
  goal: "sales",
};


async function apiRequest(endpoint, payload) {

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 90000);


  try {

    const response = await fetch(
      `${API_URL}${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      }
    );


    const data = await response.json();


    if (!response.ok) {
      throw new Error(
        data.detail || "Request failed."
      );
    }


    return data;


  } catch (error) {


    if (error.name === "AbortError") {
      throw new Error(
        "AI server is taking too long. Please try again."
      );
    }


    throw error;


  } finally {

    clearTimeout(timeout);

  }

}



export default function Home() {


  const [strategyForm, setStrategyForm] =
    useState(initialStrategyForm);


  const [strategyResult, setStrategyResult] =
    useState(null);


  const [strategyLoading, setStrategyLoading] =
    useState(false);


  const [strategyError, setStrategyError] =
    useState("");



  const [adText, setAdText] =
    useState("");


  const [analysisResult, setAnalysisResult] =
    useState(null);


  const [analysisLoading, setAnalysisLoading] =
    useState(false);


  const [analysisError, setAnalysisError] =
    useState("");




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


      const result = await apiRequest(
        "/strategy",
        {
          product: strategyForm.product.trim(),

          country: strategyForm.country.trim(),

          monthly_budget:
            Number(strategyForm.monthly_budget),

          goal: strategyForm.goal,
        }
      );


      setStrategyResult(result);



    } catch(error) {


      setStrategyError(
        error.message
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


      const result = await apiRequest(
        "/analyze",
        {
          ad_text: adText.trim(),
        }
      );


      setAnalysisResult(result);



    } catch(error) {


      setAnalysisError(
        error.message
      );


    } finally {


      setAnalysisLoading(false);


    }

  }
    return (
    <main className="page">

      <section className="hero">

        <div className="brand">
          ADLENS
        </div>


        <span className="eyebrow">
          AI ADVERTISING DECISION PLATFORM
        </span>


        <h1>
          Turn your ad budget into a clear action plan.
        </h1>


        <p>
          Create advertising strategies and analyze your
          campaigns with AI.
        </p>

      </section>



      <section className="workspace">


        <form
          className="card form-card"
          onSubmit={generateStrategy}
        >

          <h2>
            Create Strategy
          </h2>


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
              value={strategyForm.monthly_budget}
              onChange={updateStrategyField}
              placeholder="1000"
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
            disabled={strategyLoading}
          >

            {
              strategyLoading
                ? "Generating..."
                : "Generate Strategy"
            }

          </button>




          {
            strategyError && (

              <p className="error">
                {strategyError}
              </p>

            )
          }



        </form>





        <section className="card result-card">


          {
            !strategyResult ? (


              <div className="empty">

                <div className="score-placeholder">
                  AI
                </div>


                <h2>
                  Your strategy will appear here.
                </h2>


                <p>
                  Generate your AI advertising plan.
                </p>


              </div>


            ) : (


              <>


                <div className="result-header">


                  <div>

                    <span className="eyebrow">
                      ADLENS SCORE
                    </span>


                    <div className="score">
                      {strategyResult.score}/100
                    </div>


                  </div>


                  <p>
                    {strategyResult.summary}
                  </p>


                </div>





                <h3>
                  Recommended Channels
                </h3>




                {
                  strategyResult.channels.map(
                    (item,index)=>(


                      <article
                        className="channel"
                        key={index}
                      >

                        <div className="channel-top">

                          <strong>
                            {item.channel}
                          </strong>


                          <span>
                            {item.percentage}%
                          </span>

                        </div>



                        <div className="bar">

                          <div
                            style={{
                              width:
                              `${item.percentage}%`
                            }}
                          />

                        </div>



                        <p>
                          Budget:
                          {" "}
                          $
                          {item.budget}
                        </p>



                        <small>
                          {item.reason}
                        </small>



                      </article>


                    )
                  )
                }





                <h3>
                  First 30-Day Plan
                </h3>



                <ol>

                  {
                    strategyResult.first_30_day_plan.map(
                      (step,index)=>(

                        <li key={index}>
                          {step}
                        </li>

                      )
                    )
                  }

                </ol>



              </>


            )

          }


        </section>



      </section>







      <section className="workspace">


        <form
          className="card form-card"
          onSubmit={analyzeAdvertisement}
        >


          <h2>
            Analyze My Ad
          </h2>



          <textarea

            value={adText}

            onChange={
              (e)=>setAdText(e.target.value)
            }

            placeholder="Paste your advertisement text"

            rows="10"

            required

          />




          <button
            disabled={analysisLoading}
          >

            {
              analysisLoading
              ? "Analyzing..."
              : "Analyze Advertisement"
            }


          </button>




          {
            analysisError && (

              <p className="error">
                {analysisError}
              </p>

            )
          }



        </form>






        <section className="card result-card">


          {
            analysisResult && (

              <>

                <h2>
                  Score {analysisResult.score}/100
                </h2>


                <h3>
                  Strengths
                </h3>


                {
                  analysisResult.strengths.map(
                    (x,i)=>
                    <p key={i}>
                      ✓ {x}
                    </p>
                  )
                }



                <h3>
                  Improvements
                </h3>


                {
                  analysisResult.suggestions.map(
                    (x,i)=>
                    <p key={i}>
                      → {x}
                    </p>
                  )
                }



              </>

            )
          }



        </section>



      </section>


    </main>
  );


}



function AnalysisSection({title,items}) {


  return (

    <section>

      <h3>
        {title}
      </h3>


      {
        items.map(
          (item,index)=>(

            <p key={index}>
              {item}
            </p>

          )
        )
      }


    </section>

  );

}