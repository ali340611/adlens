import os
from typing import Literal

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from pydantic import BaseModel, Field


load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4.1-mini")


app = FastAPI(
    title="AdLens API",
    version="2.0.0",
    description="AI advertising decision platform",
)


ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://adlens-six.vercel.app",
    "https://adlens-nj930s729-ad-lens1.vercel.app",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_origin_regex=r"https://adlens-[a-zA-Z0-9-]+\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_client():

    if not OPENAI_API_KEY:
        raise HTTPException(
            status_code=503,
            detail="OPENAI_API_KEY missing",
        )

    return OpenAI(
        api_key=OPENAI_API_KEY,
        timeout=60,
        max_retries=2,
    )


# =========================
# STRATEGY MODELS
# =========================


class StrategyRequest(BaseModel):

    product: str = Field(
        min_length=2,
        max_length=120
    )

    country: str = Field(
        min_length=2,
        max_length=80
    )

    monthly_budget: float = Field(
        gt=0
    )

    goal: Literal[
        "sales",
        "traffic",
        "awareness",
        "leads"
    ]


class ExpectedResults(BaseModel):

    estimated_ctr: str

    estimated_conversions: str

    estimated_cpa: str



class AIChannel(BaseModel):

    channel: str

    percentage: int

    reason: str



class AIStrategy(BaseModel):

    score: int

    performance_level: str

    summary: str

    expected_results: ExpectedResults

    channels: list[AIChannel]

    risks: list[str]

    first_30_day_plan: list[str]



class ChannelResponse(BaseModel):

    channel: str

    percentage: int

    budget: float

    reason: str



class StrategyResponse(BaseModel):

    score: int

    performance_level: str

    summary: str

    expected_results: ExpectedResults

    channels: list[ChannelResponse]

    risks: list[str]

    first_30_day_plan: list[str]



# =========================
# ANALYSIS MODELS
# =========================


class AnalyzeRequest(BaseModel):

    ad_text: str = Field(
        min_length=5,
        max_length=3000
    )



class AnalyzeResponse(BaseModel):

    score: int

    headline_score: int

    cta_score: int

    trust_score: int

    strengths: list[str]

    weaknesses: list[str]

    suggestions: list[str]



# =========================
# BASIC
# =========================


@app.get("/")
def home():

    return {
        "name": "AdLens",
        "status": "running",
        "version": "2.0.0"
    }



@app.get("/health")
def health():

    return {
        "status": "ok",
        "openai": bool(OPENAI_API_KEY)
    }


# =========================
# STRATEGY
# =========================


@app.post(
    "/strategy",
    response_model=StrategyResponse
)
def create_strategy(
    payload: StrategyRequest
):

    client = get_client()


    try:

        response = client.responses.parse(

            model=OPENAI_MODEL,

            input=[

                {
                    "role":"system",

                    "content":"""

You are AdLens AI,
a senior advertising strategist.

Create a realistic marketing plan.

Return:

- score 0-100
- performance level
- summary
- expected CTR
- expected conversions
- expected CPA
- 3-5 channels
- risks
- exactly four weekly actions

Use professional English.

Do not invent live data.

"""
                },


                {
                    "role":"user",

                    "content":f"""

Product:
{payload.product}

Country:
{payload.country}

Budget:
${payload.monthly_budget}

Goal:
{payload.goal}

Create strategy.

"""
                }

            ],

            text_format=AIStrategy

        )


        result=response.output_parsed


        if not result:
            raise Exception(
                "Empty AI response"
            )
                percentages_total = sum(
            item.percentage
            for item in result.channels
        )


        if percentages_total <= 0:
            raise Exception(
                "Invalid channel percentages"
            )


        channels = []


        for item in result.channels:

            percentage = round(
                item.percentage / percentages_total * 100
            )


            channels.append(
                ChannelResponse(

                    channel=item.channel,

                    percentage=percentage,

                    budget=round(
                        payload.monthly_budget
                        * percentage
                        / 100,
                        2
                    ),

                    reason=item.reason

                )
            )



        return StrategyResponse(

            score=result.score,

            performance_level=result.performance_level,

            summary=result.summary,

            expected_results=result.expected_results,

            channels=channels,

            risks=result.risks,

            first_30_day_plan=
                result.first_30_day_plan[:4]

        )



    except HTTPException:
        raise


    except Exception as error:

        print(error)

        raise HTTPException(

            status_code=502,

            detail=
            "Strategy generation failed."

        )



# =========================
# AD ANALYSIS
# =========================


@app.post(
    "/analyze",
    response_model=AnalyzeResponse
)
def analyze_ad(
    payload: AnalyzeRequest
):

    client = get_client()


    try:


        response = client.responses.parse(


            model=OPENAI_MODEL,


            input=[


                {
                    "role":"system",

                    "content":"""

You are a senior conversion copywriter.

Analyze advertisement text.

Return:

- overall score
- headline score
- CTA score
- trust score
- strengths
- weaknesses
- improvements

Professional English only.

"""
                },


                {
                    "role":"user",

                    "content":payload.ad_text

                }

            ],


            text_format=AnalyzeResponse


        )



        result=response.output_parsed



        if not result:

            raise Exception(
                "Empty analysis"
            )



        return result



    except HTTPException:

        raise



    except Exception as error:


        print(error)


        raise HTTPException(

            status_code=502,

            detail=
            "Advertisement analysis failed."

        )