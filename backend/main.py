import os
from typing import Literal
from dotenv import load_dotenv
from openai import OpenAI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI(title="AdLens API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class StrategyRequest(BaseModel):
    product: str = Field(min_length=2, max_length=120)
    country: str = Field(min_length=2, max_length=80)
    monthly_budget: float = Field(gt=0)
    goal: Literal["sales", "traffic", "awareness", "leads"]


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


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/strategy", response_model=StrategyResponse)
def create_strategy(payload: StrategyRequest) -> StrategyResponse:
    # V0: basit kural tabanlı sonuç.
    # Sonraki adımda OpenAI ve gerçek veri kaynakları eklenecek.
    if payload.goal == "sales":
        weights = [
            ("Google Shopping", 40, "Yüksek satın alma niyetine sahip kullanıcıları yakalar."),
            ("Meta Ads", 30, "Görsel ürünlerde keşif ve yeniden hedefleme için güçlüdür."),
            ("TikTok Ads", 20, "Yeni kitlelere hızlı kreatif testleriyle ulaşır."),
            ("Pinterest Ads", 10, "Görsel keşif odaklı kategorilerde destekleyici kanaldır."),
        ]
    elif payload.goal == "leads":
        weights = [
            ("Google Search", 45, "Aktif çözüm arayan kullanıcıları yakalar."),
            ("Meta Ads", 25, "Form ve yeniden hedefleme kampanyalarında etkilidir."),
            ("LinkedIn Ads", 20, "B2B hedefleme gerekiyorsa değerlidir."),
            ("YouTube Ads", 10, "Güven ve farkındalık oluşturur."),
        ]
    elif payload.goal == "traffic":
        weights = [
            ("Meta Ads", 35, "Geniş kitlelere düşük maliyetli trafik sağlayabilir."),
            ("Google Search", 30, "İlgili arama niyetini yakalar."),
            ("TikTok Ads", 25, "Kısa video ile hızlı trafik testleri yapılabilir."),
            ("Pinterest Ads", 10, "Uzun ömürlü yönlendirme trafiği sağlayabilir."),
        ]
    else:
        weights = [
            ("Meta Ads", 35, "Geniş erişim ve marka hikâyesi için uygundur."),
            ("YouTube Ads", 30, "Video ile güçlü marka hatırlanması sağlar."),
            ("TikTok Ads", 25, "Yeni kitlelerde hızlı farkındalık oluşturur."),
            ("Google Display", 10, "Tekrar görünürlük ve erişim sağlar."),
        ]

    channels = [
        ChannelRecommendation(
            channel=channel,
            percentage=percentage,
            budget=round(payload.monthly_budget * percentage / 100, 2),
            reason=reason,
        )
        for channel, percentage, reason in weights
    ]

    return StrategyResponse(
        score=82,
        summary=(
            f"{payload.country} pazarında {payload.product} için bütçeyi önce "
            "yüksek niyetli kanallarda doğrulayıp ardından keşif kanallarında "
            "kreatif testlerle büyüt."
        ),
        channels=channels,
        first_30_day_plan=[
            "1. hafta: Ölçüm altyapısını ve ana kampanya yapısını kur.",
            "2. hafta: İki farklı kreatif ve iki hedef kitle testi başlat.",
            "3. hafta: Düşük performanslı kombinasyonları durdur.",
            "4. hafta: Kazanan kanala bütçenin %15-20'sini kademeli aktar.",
        ],
    )
@app.get("/ai-test")
def ai_test():
    response = client.responses.create(
        model="gpt-4.1-mini",
        input="Write one sentence about digital marketing."
    )

    return {"result": response.output_text}
class AnalyzeRequest(BaseModel):
    ad_text: str

class AnalyzeRequest(BaseModel):
    ad_text: str = Field(min_length=5, max_length=3000)


class AnalyzeResponse(BaseModel):
    score: int
    strengths: list[str]
    weaknesses: list[str]
    suggestions: list[str]


@app.post("/analyze", response_model=AnalyzeResponse)
def analyze_ad(payload: AnalyzeRequest) -> AnalyzeResponse:
    response = client.responses.parse(
        model="gpt-4.1-mini",
        input=[
            {
                "role": "system",
                "content": (
                    "You are an expert advertising strategist. "
                    "Analyze the advertisement objectively."
                ),
            },
            {
                "role": "user",
                "content": payload.ad_text,
            },
        ],
        text_format=AnalyzeResponse,
    )

    return response.output_parsed
