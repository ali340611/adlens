"use client";

import { useState } from "react";

const API_URL =
  "https://adlens-backend-wt43.onrender.com";


const initialForm = {
  product: "AI Resume Templates",
  country: "United States",
  monthly_budget: "1000",
  goal: "sales",
};


async function apiRequest(endpoint, payload) {

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      method: "POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(payload),
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

const [form,setForm] = useState(initialForm);

const [strategy,setStrategy] = useState(null);

const [loading,setLoading] = useState(false);

const [error,setError] = useState("");

const [adText,setAdText] = useState("");

const [analysis,setAnalysis] = useState(null);



function update(e){

setForm({
 ...form,
 [e.target.name]:e.target.value
});

}



async function generate(e){

e.preventDefault();

setLoading(true);

setError("");

try{

const result = await apiRequest(
"/strategy",
{
product:form.product,
country:form.country,
monthly_budget:Number(form.monthly_budget),
goal:form.goal
}
);


setStrategy(result);


}

catch(err){

setError(err.message);

}

finally{

setLoading(false);

}

}




async function analyze(e){

e.preventDefault();


try{

const result =
await apiRequest(
"/analyze",
{
ad_text:adText
}
);


setAnalysis(result);


}

catch(err){

alert(err.message);

}

}



return (

<main className="dashboard">


<aside className="sidebar">

<div className="logo">
🟣 AdLens
</div>

<p className="small">
AI Strategy Studio
</p>


<div className="side-card">

<h3>
Create Strategy
</h3>


<label>
Product
</label>

<input
name="product"
value={form.product}
onChange={update}
/>



<label>
Target Country
</label>


<input
name="country"
value={form.country}
onChange={update}
/>



<label>
Monthly Budget
</label>


<input
name="monthly_budget"
value={form.monthly_budget}
onChange={update}
/>



<label>
Goal
</label>


<select
name="goal"
value={form.goal}
onChange={update}
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

</select>



<button
onClick={generate}
>

✨ Generate Strategy

</button>


</div>




<div className="side-card analyze">


<h3>
Analyze My Ad
</h3>


<textarea

value={adText}

onChange={
e=>setAdText(e.target.value)
}

placeholder="Paste advertisement..."

/>


<button
onClick={analyze}
>
Analyze Advertisement
</button>


</div>


</aside>





<section className="main-area">


<header className="topbar">

<div>
<h2>
AdLens AI
</h2>

<span>
Advertising Intelligence Platform
</span>

</div>


<div className="user">
MA
</div>


</header>



{
!strategy ?

<div className="empty-dashboard">

<h1>
Create your first AI strategy
</h1>

<p>
Generate an advertising plan with AI.
</p>

</div>


:


<>


<section className="overview card">


<div className="overview-title">

<h2>
Strategy Overview
</h2>


<span className="badge">
{strategy.performance_level}
</span>


</div>


<p>
{strategy.summary}
</p>



<div className="metrics">


<div>
<span>
CTR
</span>

<strong>
{strategy.expected_results?.estimated_ctr}
</strong>

</div>



<div>
<span>
Conversions
</span>

<strong>
{strategy.expected_results?.estimated_conversions}
</strong>

</div>



<div>
<span>
CPA
</span>

<strong>
{strategy.expected_results?.estimated_cpa}
</strong>

</div>


</div>



</section>
      <section className="content-grid">


        <div className="card channels-card">

          <h2>
            Recommended Channels
          </h2>


          <div className="channels">


          {
            strategy.channels.map(
              (item,index)=>(


                <article
                  className="channel-item"
                  key={index}
                >

                  <div className="channel-header">

                    <strong>
                      {item.channel}
                    </strong>

                    <span>
                      {item.percentage}%
                    </span>

                  </div>


                  <div className="progress">

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
                    ${item.budget}
                  </p>


                  <small>
                    {item.reason}
                  </small>


                </article>


              )
            )
          }


          </div>

        </div>




        <div className="card score-card">

          <h2>
            ADLENS Score
          </h2>


          <div className="circle-score">

            {strategy.score}

            <span>
              /100
            </span>

          </div>



          <p>
            AI evaluation based on budget,
            market and advertising goal.
          </p>


        </div>



      </section>






      <section className="bottom-grid">



        <div className="card">

          <h2>
            Potential Risks
          </h2>


          {
            strategy.risks?.map(
              (risk,index)=>(

                <p key={index}>
                  ⚠ {risk}
                </p>

              )
            )
          }


        </div>




        <div className="card">


          <h2>
            First 30-Day Plan
          </h2>


          <ol>

          {
            strategy.first_30_day_plan?.map(
              (step,index)=>(

                <li key={index}>
                  {step}
                </li>

              )
            )
          }

          </ol>


        </div>



      </section>




      {
        analysis &&

        <section className="card analysis-result">


          <h2>
            Ad Analysis
          </h2>


          <div className="metrics">


            <div>
              <span>
                Score
              </span>

              <strong>
                {analysis.score}
              </strong>
            </div>


            <div>
              <span>
                Headline
              </span>

              <strong>
                {analysis.headline_score}
              </strong>
            </div>


            <div>
              <span>
                CTA
              </span>

              <strong>
                {analysis.cta_score}
              </strong>
            </div>


          </div>



        </section>

      }



</>

}


</section>


</main>


);


}