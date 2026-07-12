"use client";

import { useState } from "react";

import {
  LayoutDashboard,
  Megaphone,
  Palette,
  Users,
  BarChart3,
  Globe,
  Sparkles,
  Target,
  Brain,
  Search,
  Rocket
} from "lucide-react";


const API_URL =
"https://adlens-backend-wt43.onrender.com";



const menu = [

{
name:"Dashboard",
icon:LayoutDashboard
},

{
name:"Campaigns",
icon:Megaphone
},

{
name:"Creatives",
icon:Palette
},

{
name:"Competitors",
icon:Users
},

{
name:"Reports",
icon:BarChart3
}

];





export default function Home(){


const [active,setActive] =
useState("Dashboard");



const [loading,setLoading] =
useState(false);



const [strategy,setStrategy] =
useState(null);



const [adResult,setAdResult] =
useState(null);



const [websiteResult,setWebsiteResult] =
useState(null);




const [form,setForm] =
useState({

product:"AI Resume Templates",

country:"United States",

monthly_budget:"1000",

goal:"sales"

});




const [website,setWebsite] =
useState("");



const [adText,setAdText] =
useState("");







function updateForm(e){


setForm({

...form,

[e.target.name]:
e.target.value

});


}





async function generateStrategy(){


setLoading(true);


try{


const res =
await fetch(

`${API_URL}/strategy`,

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},


body:JSON.stringify({

product:form.product,

country:form.country,

monthly_budget:
Number(form.monthly_budget),

goal:form.goal

})


}

);



const data =
await res.json();



setStrategy(data);



}

catch(e){

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


const res =
await fetch(

`${API_URL}/analyze`,

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},


body:JSON.stringify({

ad_text:adText

})

}

);



const data =
await res.json();


setAdResult(data);


}

catch(e){

alert(
"Ad analysis failed"
);

}


}




async function analyzeWebsite(){


try{


const res =
await fetch(

`${API_URL}/website-analysis`,

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},


body:JSON.stringify({

url:website

})

}

);



const data =
await res.json();


setWebsiteResult(data);


}

catch(e){

alert(
"Website analysis failed"
);

}


}
return (

<main className="dashboard">


<aside className="sidebar">


<div className="brand">


<div className="brand-icon">

<Brain size={26}/>

</div>


<div>

<h2>
AdLens
</h2>

<p>
AI Growth Platform
</p>

</div>


</div>





<nav className="menu">


{

menu.map(item=>{


const Icon =
item.icon;


return (

<button

key={item.name}

className={
active===item.name
?
"active"
:
""
}


onClick={()=>setActive(item.name)}

>


<Icon size={18}/>


<span>
{item.name}
</span>


</button>

)


})


}



</nav>







<div className="tool-card">


<h3>

<Sparkles size={18}/>

AI Strategy

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

placeholder="Monthly Budget"

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








<div className="tool-card">


<h3>

<Globe size={18}/>

Website Analyzer

</h3>



<input

value={website}

onChange={
e=>setWebsite(e.target.value)
}

placeholder="Website URL"

/>



<button

onClick={analyzeWebsite}

>

Analyze Website

</button>



</div>







<div className="tool-card">


<h3>

<Target size={18}/>

Analyze My Ad

</h3>




<textarea

value={adText}

onChange={
e=>setAdText(e.target.value)
}

placeholder="Paste your ad copy"

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

<span className="eyebrow">
ADVERTISING INTELLIGENCE
</span>


<h1>
{active}
</h1>


<p>
AI powered advertising workspace
</p>


</div>



<div className="profile">

MA

</div>


</header>
{

active==="Dashboard" && (


strategy ?


<section className="dashboard-result">



<div className="hero-card">


<div>


<span className="tag">

<Brain size={14}/>

AI STRATEGY

</span>


<h2>
{form.product}
</h2>


<p>

{
strategy.summary ||
"AI generated advertising strategy"
}

</p>


</div>




<div className="score">


<span>
AI SCORE
</span>


<strong>

{
strategy.score || 85
}

</strong>


<small>
/100

</small>


</div>



</div>







<h2 className="section-title">

< Rocket size={20}/>

Recommended Channels

</h2>





<div className="channel-grid">



{

strategy.channels?.map(

(channel,index)=>(


<div

className="channel-card"

key={index}

>



<div className="channel-head">


<strong>
{channel.channel}
</strong>


<span>

{channel.percentage}%

</span>


</div>





<div className="progress">


<div

style={{

width:
`${channel.percentage}%`

}}

/>


</div>





<p>
{channel.reason}
</p>





<div className="budget">


Budget:

<strong>

$

{

Math.round(

Number(form.monthly_budget)

*

channel.percentage

/

100

)

}

</strong>


</div>



</div>



)


)


}


</div>







<div className="plan-card">


<h3>
30 Day Action Plan
</h3>


<p>
✓ Launch campaigns
</p>


<p>
✓ Test creatives
</p>


<p>
✓ Optimize performance
</p>


</div>



</section>





:

<section className="empty-card">


<Sparkles size={45}/>


<h2>
Create your first AI strategy
</h2>


<p>
Generate your advertising plan from the sidebar.
</p>


</section>



)


}








{

active==="Campaigns" && (


<section className="card">


<h2>
Campaign Center
</h2>


<p>
Manage campaigns, budgets and performance.
</p>


</section>


)


}







{

active==="Creatives" && (


<section className="card">


<h2>
Creative Studio
</h2>


<div className="creative-box">


<Palette/>

Generate AI Ad Creatives


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


<Search/>

<p>
Analyze competitor positioning.
</p>


</section>


)


}







{

active==="Reports" && (


<section className="card">


<h2>
Reports Dashboard
</h2>


<div className="report-grid">


<div>

Spend

<strong>
$1500
</strong>


</div>


<div>

Conversions

<strong>
42
</strong>


</div>


<div>

ROAS

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
Ad Analysis
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
Website Analysis
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