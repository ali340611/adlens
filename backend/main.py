import os
from typing import Literal

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from pydantic import BaseModel, Field


# Local development sırasında backend/.env dosyasını okur.
# Render'da Environment Variables otomatik okunur.
load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4.1-mini")


app = FastAPI(
    title="AdLens API",
    version="1.1.0",
    description="AI-powered advertising strategy and ad analysis API",
)


# Local geliştirme ve canlı Vercel frontend adresleri.
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://adlens-six.vercel.app",
    "https://adlens-nj930s729-ad-lens1.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    # Vercel preview deployment adreslerine de izin verir.
    allow_origin_regex=r"https://adlens-[a-zA-Z0-9-]+\.vercel\.app",
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


def get_openai_client() -> OpenAI:
    """
    API anahtarını istek sırasında kontrol eder.
    Böylece anahtar eksik olsa bile / ve /health endpointleri çalışabilir.
    """
    if not OPENAI_API_KEY:
        raise HTTPException(
            status_code=503,
            detail="OPENAI_API_KEY is not configured on the server.",
        )

    return OpenAI(
        api_key=OPENAI_API_KEY,
        timeout=60.0,
        max_retries=2,
    )


# ---------------------------------------------------------
# STRATEGY MODELS
# ---------------------------------------------------------

class StrategyRequest(BaseModel):
    product: str = Field(min_length=2, max_length=120)
    country: str = Field(min_length=2, max_length=80)
    monthly_budget: float = Field(gt=0, le=100_000_000)
    goal: Literal["sales", "traffic", "awareness", "leads"]


class AIChannelRecommendation(BaseModel):
    channel: str = Field(min_length=2, max_length=80)
    percentage: int = Field(ge=1, le=100)
    reason: str = Field(min_length=10, max_length=300)


class AIStrategyOutput(BaseModel):
    score: int = Field(ge=0, le=100)
    summary: str = Field(min_length=20, max_length=600)
    channels: list[AIChannelRecommendation] = Field(
        min_length=3,
        max_length=5,
    )
    first_30_day_plan: list[str] = Field(
        min_length=4,
        max_length=4,
    )


class ChannelRecommendation(BaseModel):
    channel: str
    percentage: int
    budget: float
    reason: str


class StrategyResponse(BaseModel):
    score: int
    summary: str
    channels: list[ChannelRecommendation]
    first_30_day_plan: list[str]


# ---------------------------------------------------------
# AD ANALYSIS MODELS
# ---------------------------------------------------------

class AnalyzeRequest(BaseModel):
    ad_text: str = Field(min_length=5, max_length=3000)


class AnalyzeResponse(BaseModel):
    score: int = Field(ge=0, le=100)
    strengths: list[str] = Field(min_length=1, max_length=6)
    weaknesses: list[str] = Field(min_length=1, max_length=6)
    suggestions: list[str] = Field(min_length=1, max_length=6)


# ---------------------------------------------------------
# HELPERS
# ---------------------------------------------------------

def normalize_percentages(
    channels: list[AIChannelRecommendation],
) -> list[int]:
    """
    Kanal yüzdelerini toplam tam 100 olacak şekilde normalize eder.
    Yuvarlama farkını en yüksek küsuratlı kanallara dağıtır.
    """
    total = sum(channel.percentage for channel in channels)

    if total <= 0:
        raise ValueError("Channel allocation total must be greater than zero.")

    exact_values = [
        channel.percentage * 100 / total
        for channel in channels
    ]

    normalized = [int(value) for value in exact_values]
    missing_points = 100 - sum(normalized)

    remainder_order = sorted(
        range(len(exact_values)),
        key=lambda index: exact_values[index] - normalized[index],
        reverse=True,
    )

    for index in remainder_order[:missing_points]:
        normalized[index] += 1

    return normalized


# ---------------------------------------------------------
# BASIC ENDPOINTS
# ---------------------------------------------------------

@app.get("/")
def root() -> dict[str, str]:
    return {
        "name": "AdLens API",
        "status": "running",
        "version": "1.1.0",
    }


@app.get("/health")
def health() -> dict[str, str]:
    return {
        "status": "ok",
        "openai_configured": str(bool(OPENAI_API_KEY)).lower(),
    }


@app.get("/ai-test")
def ai_test() -> dict[str, str]:
    client = get_openai_client()

    try:
        response = client.responses.create(
            model=OPENAI_MODEL,
            input=(
                "Write one short professional sentence in English "
                "about global digital advertising."
            ),
        )

        return {"result": response.output_text}

    except Exception as error:
        print(f"OpenAI test error: {error}")

        raise HTTPException(
            status_code=502,
            detail="The OpenAI test request failed.",
        ) from error


# ---------------------------------------------------------
# AI STRATEGY ENDPOINT
# ---------------------------------------------------------

@app.post("/strategy", response_model=StrategyResponse)
def create_strategy(payload: StrategyRequest) -> StrategyResponse:
    client = get_openai_client()

    try:
        response = client.responses.parse(
            model=OPENAI_MODEL,
            input=[
                {
                    "role": "system",
                    "content": (
                        "You are AdLens, a global advertising strategy advisor. "
                        "Always respond in professional English. "
                        "Create a realistic strategy using only the supplied "
                        "product, country, budget and objective. "
                        "Do not claim access to live advertising data. "
                        "Recommend exactly three to five genuinely relevant "
                        "advertising channels. "
                        "Use sensible percentage allocations. "
                        "Provide concise and actionable reasons. "
                        "Return exactly four 30-day plan steps, one per week. "
                        "The score must represent the suitability of the "
                        "budget and objective for the selected market."
                    ),
                },
                {
                    "role": "user",
                    "content": (
                        f"Product or service: {payload.product}\n"
                        f"Target country: {payload.country}\n"
                        f"Monthly advertising budget: "
                        f"{payload.monthly_budget:.2f}\n"
                        f"Primary objective: {payload.goal}\n\n"
                        "Create a practical advertising strategy."
                    ),
                },
            ],
            text_format=AIStrategyOutput,
        )

        ai_strategy = response.output_parsed

        if ai_strategy is None:
            raise ValueError("No valid structured strategy was returned.")

        percentages = normalize_percentages(ai_strategy.channels)

        channels = [
            ChannelRecommendation(
                channel=channel.channel,
                percentage=percentage,
                budget=round(
                    payload.monthly_budget * percentage / 100,
                    2,
                ),
                reason=channel.reason,
            )
            for channel, percentage in zip(
                ai_strategy.channels,
                percentages,
            )
        ]

        return StrategyResponse(
            score=ai_strategy.score,
            summary=ai_strategy.summary,
            channels=channels,
            first_30_day_plan=ai_strategy.first_30_day_plan,
        )

    except HTTPException:
        raise

    except Exception as error:
        print(f"Strategy generation error: {error}")

        raise HTTPException(
            status_code=502,
            detail="Strategy generation failed. Please try again.",
        ) from error


# ---------------------------------------------------------
# AI AD ANALYSIS ENDPOINT
# ---------------------------------------------------------

@app.post("/analyze", response_model=AnalyzeResponse)
def analyze_ad(payload: AnalyzeRequest) -> AnalyzeResponse:
    client = get_openai_client()

    try:
        response = client.responses.parse(
            model=OPENAI_MODEL,
            input=[
                {
                    "role": "system",
                    "content": (
                        "You are an expert advertising strategist and "
                        "conversion copywriter. "
                        "Always respond in professional English. "
                        "Analyze the advertisement objectively. "
                        "Give a score from 0 to 100. "
                        "Provide concise strengths, weaknesses and specific "
                        "actionable improvements. "
                        "Do not invent product facts that are not present "
                        "in the advertisement."
                    ),
                },
                {
                    "role": "user",
                    "content": (
                        "Analyze the following advertisement:\n\n"
                        f"{payload.ad_text}"
                    ),
                },
            ],
            text_format=AnalyzeResponse,
        )

        analysis = response.output_parsed

        if analysis is None:
            raise ValueError("No valid structured analysis was returned.")

        return analysis

    except HTTPException:
        raise

    except Exception as error:
        print(f"Advertisement analysis error: {error}")

        raise HTTPException(
            status_code=502,
            detail="Advertisement analysis failed. Please try again.",
        ) from error