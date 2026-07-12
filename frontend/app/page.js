"use client";

import { useState } from "react";


const API_URL =
  "https://adlens-backend-wt43.onrender.com";


export default function Home(){

const [active,setActive]=useState("Dashboard");


const [loading,setLoading]=useState(false);


const [strategy,setStrategy]=useState(null);


const [adResult,setAdResult]=useState(null);


const [websiteResult,setWebsiteResult]=useState(null);



const [form,setForm]=useState({

product:"AI Resume Templates",

country:"United States",

monthly_budget:"1000",

goal:"sales"

});



const [website,setWebsite]=useState("");

const [adText,setAdText]=useState("");




function updateForm(e){

setForm({

...form,

[e.target.name]:e.target.value

});

}







async function generateStrategy(){


setLoading(true);


try{


const response = await fetch(

`${API_URL}/strategy`,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

product:form.product,

country:form.country,

monthly_budget:Number(form.monthly_budget),

goal:form.goal

})

}

);



const data =
await response.json();


console.log(data);


setStrategy(data);



}

catch(error){

console.log(error);

alert(
"Strategy failed"
);

}

finally{

setLoading(false);

}


}







async function analyzeAd(){


try{


const response = await fetch(

`${API_URL}/analyze`,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

ad_text:adText

})

}

);



const data =
await response.json();



setAdResult(data);



}

catch(error){

alert(
"Ad analysis failed"
);

}



}






async function analyzeWebsite(){


try{


const response = await fetch(

`${API_URL}/website-analysis`,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

url:website

})

}

);



const data =
await response.json();



setWebsiteResult(data);



}

catch(error){

alert(
"Website analysis failed"
);

}


}
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





<div className="menu">


{

[
"Dashboard",
"Campaigns",
"Creatives",
"Competitors",
"Reports"

].map(item=>(


<button

key={item}

className={
active===item
?
"active"
:
""
}


onClick={()=>setActive(item)}

>

{item}

</button>


))

}


</div>






<div className="side-box">


<h3>
Create Strategy
</h3>



<input

name="product"

value={form.product}

onChange={updateForm}

placeholder="Product"

/>



<input

name="country"

value={form.country}

onChange={updateForm}

placeholder="Country"

/>



<input

name="monthly_budget"

value={form.monthly_budget}

onChange={updateForm}

placeholder="Budget"

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


</select>




<button

onClick={generateStrategy}

>

{

loading
?
"Generating..."
:
"Generate Strategy"

}


</button>



</div>







<div className="side-box">


<h3>
Website Analyzer
</h3>



<input

value={website}

onChange={
e=>setWebsite(e.target.value)
}

placeholder="https://website.com"

/>



<button

onClick={analyzeWebsite}

>

Analyze Website

</button>



</div>







<div className="side-box">


<h3>
Analyze My Ad
</h3>



<textarea

rows="5"

value={adText}

onChange={
e=>setAdText(e.target.value)
}

placeholder="Paste advertisement"

/>



<button

onClick={analyzeAd}

>

Analyze Advertisement

</button>



</div>



</aside>








<section className="main-area">



<header className="topbar">


<div>

<span className="label">
ADVERTISING INTELLIGENCE
</span>


<h1>
{active}
</h1>


<p>
AI powered marketing workspace
</p>


</div>



<div className="avatar">

MA

</div>



</header>
{

active==="Dashboard" && (

strategy ? (

<section className="card">


<div className="card-header">

<h2>
{form.product}
</h2>


<span className="badge">
AI Generated
</span>


</div>



<p>
{
strategy.summary
||
"AI strategy generated successfully."
}
</p>



<h3>
Recommended Channels
</h3>



{

strategy.channels?.map(

(channel,index)=>(


<div

className="channel"

key={index}

>


<div className="channel-top">


<strong>
{channel.channel}
</strong>


<strong>
{channel.percentage}%
</strong>


</div>



<div className="bar">

<div

style={{

width:
`${channel.percentage}%`

}}

/>

</div>



<small>
{channel.reason}
</small>



</div>


)

)


}



</section>


)

:

<section className="card empty">


<div className="empty-icon">
AI
</div>


<h2>
Create your first AI strategy
</h2>


<p>
Generate your advertising plan.
</p>


</section>


)


}







{

active==="Campaigns" && (

<section className="card">

<h2>
Campaign Management
</h2>


<p>
Manage campaigns, budgets and results.
</p>


</section>


)

}







{

active==="Creatives" && (

<section className="card">

<h2>
AI Creative Studio
</h2>


<div className="creative-grid">


<button>
Facebook Ad Copy
</button>


<button>
Google Ads
</button>


<button>
LinkedIn Ads
</button>


<button>
Email Campaign
</button>


</div>


</section>


)

}







{

active==="Competitors" && (

<section className="card">

<h2>
Competitor Intelligence
</h2>


<p>
Analyze competitors and market opportunities.
</p>


</section>


)

}






{

active==="Reports" && (

<section className="card">


<h2>
Performance Reports
</h2>



<div className="stats">


<div>

<span>
Spend
</span>

<strong>
$1500
</strong>

</div>



<div>

<span>
Conversions
</span>

<strong>
42
</strong>

</div>



<div>

<span>
ROAS
</span>

<strong>
3.4x
</strong>

</div>



</div>


</section>


)

}






{

adResult && (

<section className="card">


<h2>
Ad Analysis Result
</h2>


<p>
Score: {adResult.score}
</p>


</section>


)

}





{

websiteResult && (

<section className="card">


<h2>
Website Analysis Result
</h2>


<pre>

{
JSON.stringify(
websiteResult,
null,
2
)
}

</pre>


</section>


)

}





</section>


</main>


);


}