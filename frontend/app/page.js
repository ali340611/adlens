"use client";

import { useState } from "react";


const API_URL =
  "https://adlens-backend-wt43.onrender.com";


const initialStrategyForm = {
  product: "",
  country: "",
  monthly_budget: "",
  goal: "sales",
};



async function apiRequest(endpoint, payload) {

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    }
  );


  const data = await response.json();


  if (!response.ok) {

    throw new Error(
      data.detail || "Request failed"
    );

  }


  return data;

}



export default function Home() {


const [strategyForm,setStrategyForm] =
useState(initialStrategyForm);


const [strategyResult,setStrategyResult] =
useState(null);


const [strategyLoading,setStrategyLoading] =
useState(false);


const [strategyError,setStrategyError] =
useState("");



const [adText,setAdText] =
useState("");


const [analysisResult,setAnalysisResult] =
useState(null);


const [analysisLoading,setAnalysisLoading] =
useState(false);



function updateStrategyField(e){

const {
name,
value
}=e.target;


setStrategyForm(
current=>({
...current,
[name]:value
})
);

}




async function generateStrategy(e){

e.preventDefault();


setStrategyLoading(true);

setStrategyError("");


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
Number(
strategyForm.monthly_budget
),


goal:
strategyForm.goal

}
);


setStrategyResult(result);


}

catch(error){

setStrategyError(
error.message
);

}


finally{

setStrategyLoading(false);

}

}





async function analyzeAdvertisement(e){

e.preventDefault();


setAnalysisLoading(true);


try{


const result =
await apiRequest(
"/analyze",
{
ad_text:
adText
}
);


setAnalysisResult(result);


}

catch(error){

alert(
error.message
);

}

finally{

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
Create advertising strategies and analyze your campaigns with AI.
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
Product

<input
name="product"
value={strategyForm.product}
onChange={updateStrategyField}
placeholder="AI Resume Templates"
required
/>

</label>



<label>
Target Country

<input
name="country"
value={strategyForm.country}
onChange={updateStrategyField}
placeholder="United States"
required
/>

</label>



<label>
Monthly Budget

<input
type="number"
name="monthly_budget"
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
?
"Generating Strategy..."
:
"Generate Strategy"
}


</button>



{
strategyError &&

<p className="error">
{strategyError}
</p>

}



</form>






<section className="card result-card">


{

!strategyResult ?


(

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


)


:


(


<>


<div className="premium-score-card">


<div>


<span className="eyebrow">
ADLENS SCORE
</span>


<div className="score-big">

{strategyResult.score}

<span>
/100
</span>

</div>



<strong>
{strategyResult.performance_level}
</strong>


</div>




<p>

{strategyResult.summary}

</p>



</div>





{

strategyResult.expected_results &&


<div className="metrics-grid">


<div className="metric-card">

<span>
CTR
</span>


<strong>
{
strategyResult.expected_results.estimated_ctr
}
</strong>

</div>



<div className="metric-card">

<span>
Conversions
</span>


<strong>
{
strategyResult.expected_results.estimated_conversions
}
</strong>


</div>




<div className="metric-card">

<span>
CPA
</span>


<strong>
{
strategyResult.expected_results.estimated_cpa
}
</strong>


</div>


</div>


}




<h3>
Recommended Channels
</h3>



<div className="channels">


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
width:`${item.percentage}%`
}}
/>

</div>



<p>
Budget:
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



</div>
id="3/3"
{

strategyResult.risks &&

<>

<h3>
Potential Risks
</h3>


<div className="risk-box">

{
strategyResult.risks.map(

(item,index)=>(

<p key={index}>
⚠ {item}
</p>

)

)
}

</div>

</>

}




<h3>
First 30-Day Plan
</h3>



<ol className="plan">


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


placeholder="Paste your advertisement text here..."


rows="10"


required

/>




<button
disabled={analysisLoading}
>


{

analysisLoading

?

"Analyzing..."

:

"Analyze Advertisement"

}


</button>



</form>





<section className="card result-card">


{

analysisResult &&

<>


<div className="premium-score-card">


<div>

<span className="eyebrow">
AD PERFORMANCE SCORE
</span>


<div className="score-big">

{analysisResult.score}

<span>
/100
</span>

</div>


</div>



</div>




<div className="metrics-grid">


<div className="metric-card">

<span>
Headline
</span>

<strong>
{analysisResult.headline_score}
</strong>

</div>



<div className="metric-card">

<span>
CTA
</span>

<strong>
{analysisResult.cta_score}
</strong>

</div>



<div className="metric-card">

<span>
Trust
</span>

<strong>
{analysisResult.trust_score}
</strong>

</div>


</div>




<h3>
Strengths
</h3>


{

analysisResult.strengths.map(

(item,index)=>(

<p key={index}>
✓ {item}
</p>

)

)

}




<h3>
Improvements
</h3>



{

analysisResult.suggestions.map(

(item,index)=>(

<p key={index}>
→ {item}
</p>

)

)

}


</>

}


</section>


</section>




</main>

);


}