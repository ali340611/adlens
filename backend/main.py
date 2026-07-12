import os
from typing import Literal

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from pydantic import BaseModel, ConfigDict, Field


load_dotenv()


OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_MODEL = os.getenv(
    "OPENAI_MODEL",
    "gpt-4.1-mini",
)


app = FastAPI(
    title="AdLens API",
    version="3.0.0",
    description="AI marketing operating system",
)


ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "https://adlens-six.vercel.app",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_origin_regex=(
        r"https://adlens-[a-zA-Z0-9-]+"
        r"\.vercel\.app"
    ),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class StrictModel(BaseModel):
    model_config = ConfigDict(
        extra="forbid",
    )


def get_client() -> OpenAI:
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


def require_ai_result(result, error_message: str):
    if result is None:
        raise ValueError(error_message)

    return result


def percentage_change(
    before: float,
    after: float,
) -> float | None:
    if before == 0:
        return None

    return round(
        ((after - before) / before) * 100,
        2,
    )


# ==================================================
# BUSINESS PROFILE
# ==================================================


AdvertisingPlatform = Literal[
    "Google Ads",
    "Meta Ads",
    "LinkedIn Ads",
    "TikTok Ads",
    "Microsoft Ads",
    "Other",
]


BusinessGoal = Literal[
    "sales",
    "leads",
    "traffic",
    "awareness",
    "profitability",
]


class BusinessProfileRequest(StrictModel):
    company_name: str = Field(
        min_length=2,
        max_length=120,
    )

    website: str = Field(
        min_length=5,
        max_length=500,
    )

    industry: str = Field(
        min_length=2,
        max_length=120,
    )

    product_or_service: str = Field(
        min_length=2,
        max_length=300,
    )

    monthly_revenue: float = Field(
        ge=0,
    )

    monthly_ad_budget: float = Field(
        ge=0,
    )

    average_order_value: float = Field(
        ge=0,
    )

    countries: list[str] = Field(
        min_length=1,
        max_length=20,
    )

    primary_goal: BusinessGoal

    platforms: list[AdvertisingPlatform] = Field(
        min_length=1,
        max_length=6,
    )


class BusinessProfileResponse(StrictModel):
    company_name: str
    website: str
    industry: str
    product_or_service: str
    monthly_revenue: float
    monthly_ad_budget: float
    average_order_value: float
    countries: list[str]
    primary_goal: BusinessGoal
    platforms: list[AdvertisingPlatform]
    profile_status: Literal["ready"]
    next_step: str


# ==================================================
# BASELINE ANALYSIS
# ==================================================


class BaselineRequest(BusinessProfileRequest):
    current_monthly_conversions: int = Field(
        ge=0,
    )

    current_roas: float = Field(
        ge=0,
    )

    current_cpa: float = Field(
        ge=0,
    )

    current_ctr: float = Field(
        ge=0,
    )

    current_conversion_rate: float = Field(
        ge=0,
    )

    tracking_installed: bool

    website_optimized: bool


class BaselineMetrics(StrictModel):
    monthly_revenue: float
    monthly_ad_budget: float
    monthly_conversions: int
    roas: float
    cpa: float
    ctr: float
    conversion_rate: float
    estimated_profit: float


class AIBaselineAnalysis(StrictModel):
    marketing_score: int = Field(
        ge=0,
        le=100,
    )

    website_score: int = Field(
        ge=0,
        le=100,
    )

    advertising_score: int = Field(
        ge=0,
        le=100,
    )

    tracking_score: int = Field(
        ge=0,
        le=100,
    )

    conversion_score: int = Field(
        ge=0,
        le=100,
    )

    performance_level: Literal[
        "Critical",
        "Needs Improvement",
        "Average",
        "Strong",
        "Excellent",
    ]

    executive_summary: str = Field(
        min_length=20,
        max_length=800,
    )

    critical_issues: list[str] = Field(
        min_length=3,
        max_length=6,
    )

    priority_actions: list[str] = Field(
        min_length=3,
        max_length=6,
    )

    opportunities: list[str] = Field(
        min_length=2,
        max_length=5,
    )


class BaselineResponse(AIBaselineAnalysis):
    baseline_status: Literal["BEFORE"]
    baseline_metrics: BaselineMetrics
    data_source: Literal["user_provided"]
    disclaimer: str


# ==================================================
# STRATEGY
# ==================================================


class StrategyRequest(StrictModel):
    product: str = Field(
        min_length=2,
        max_length=120,
    )

    country: str = Field(
        min_length=2,
        max_length=80,
    )

    monthly_budget: float = Field(
        gt=0,
    )

    goal: Literal[
        "sales",
        "traffic",
        "awareness",
        "leads",
    ]


class ExpectedResults(StrictModel):
    estimated_ctr: str
    estimated_conversions: str
    estimated_cpa: str


class AIChannel(StrictModel):
    channel: str
    percentage: int = Field(
        ge=1,
        le=100,
    )
    reason: str


class AIStrategy(StrictModel):
    score: int = Field(
        ge=0,
        le=100,
    )

    performance_level: str
    summary: str
    expected_results: ExpectedResults
    channels: list[AIChannel] = Field(
        min_length=3,
        max_length=5,
    )
    risks: list[str]
    first_30_day_plan: list[str]


class ChannelResponse(StrictModel):
    channel: str
    percentage: int
    budget: float
    reason: str


class StrategyResponse(StrictModel):
    score: int
    performance_level: str
    summary: str
    expected_results: ExpectedResults
    channels: list[ChannelResponse]
    risks: list[str]
    first_30_day_plan: list[str]


# ==================================================
# AD ANALYSIS
# ==================================================


class AnalyzeRequest(StrictModel):
    ad_text: str = Field(
        min_length=5,
        max_length=3000,
    )


class AnalyzeResponse(StrictModel):
    score: int = Field(
        ge=0,
        le=100,
    )

    headline_score: int = Field(
        ge=0,
        le=100,
    )

    cta_score: int = Field(
        ge=0,
        le=100,
    )

    trust_score: int = Field(
        ge=0,
        le=100,
    )

    strengths: list[str]
    weaknesses: list[str]
    suggestions: list[str]


# ==================================================
# WEBSITE ANALYSIS
# ==================================================


class WebsiteAnalyzeRequest(StrictModel):
    url: str = Field(
        min_length=5,
        max_length=500,
    )


class WebsiteAnalysisResponse(StrictModel):
    brand: str
    product: str
    target_audience: str
    pain_points: list[str]
    value_proposition: str
    recommended_channels: list[str]


# ==================================================
# BEFORE / AFTER
# ==================================================


class PerformanceSnapshot(StrictModel):
    revenue: float = Field(
        ge=0,
    )

    ad_spend: float = Field(
        ge=0,
    )

    conversions: int = Field(
        ge=0,
    )

    roas: float = Field(
        ge=0,
    )

    cpa: float = Field(
        ge=0,
    )

    ctr: float = Field(
        ge=0,
    )

    conversion_rate: float = Field(
        ge=0,
    )


class BeforeAfterRequest(StrictModel):
    before: PerformanceSnapshot
    after: PerformanceSnapshot


class MetricComparison(StrictModel):
    before: float
    after: float
    absolute_change: float
    percentage_change: float | None
    direction: Literal[
        "improved",
        "declined",
        "unchanged",
    ]


class BeforeAfterResponse(StrictModel):
    revenue: MetricComparison
    ad_spend: MetricComparison
    conversions: MetricComparison
    roas: MetricComparison
    cpa: MetricComparison
    ctr: MetricComparison
    conversion_rate: MetricComparison
    profit_before: float
    profit_after: float
    profit_change: float
    overall_status: Literal[
        "PROFITABLE_IMPROVEMENT",
        "MIXED_RESULTS",
        "PERFORMANCE_DECLINE",
    ]
    summary: str


# ==================================================
# DECISION ENGINE
# ==================================================


DecisionType = Literal[
    "CONTINUE",
    "SCALE",
    "OPTIMIZE",
    "PAUSE",
    "CHANGE_STRATEGY",
]


class DecisionEngineRequest(StrictModel):
    previous: PerformanceSnapshot
    current: PerformanceSnapshot

    target_roas: float = Field(
        gt=0,
    )

    maximum_cpa: float = Field(
        gt=0,
    )

    minimum_data_days: int = Field(
        default=7,
        ge=1,
        le=90,
    )

    observed_data_days: int = Field(
        ge=1,
        le=365,
    )


class DecisionEngineResponse(StrictModel):
    decision: DecisionType

    confidence: int = Field(
        ge=0,
        le=100,
    )

    profitable: bool

    previous_profit: float

    current_profit: float

    reasons: list[str]

    recommended_actions: list[str]

    next_review_in_days: int


# ==================================================
# BASIC ENDPOINTS
# ==================================================


@app.get("/")
def home():
    return {
        "name": "AdLens",
        "status": "running",
        "version": "3.0.0",
        "product": "AI Marketing Operating System",
    }


@app.get("/health")
def health():
    return {
        "status": "ok",
        "openai": bool(OPENAI_API_KEY),
        "version": "3.0.0",
    }


# ==================================================
# BUSINESS PROFILE ENDPOINT
# ==================================================


@app.post(
    "/business-profile",
    response_model=BusinessProfileResponse,
)
def create_business_profile(
    payload: BusinessProfileRequest,
):
    return BusinessProfileResponse(
        **payload.model_dump(),
        profile_status="ready",
        next_step=(
            "Create the baseline analysis "
            "before launching or changing campaigns."
        ),
    )


# ==================================================
# BASELINE ENDPOINT
# ==================================================


@app.post(
    "/baseline-analysis",
    response_model=BaselineResponse,
)
def create_baseline_analysis(
    payload: BaselineRequest,
):
    client = get_client()

    estimated_profit = round(
        payload.monthly_revenue
        - payload.monthly_ad_budget,
        2,
    )

    try:
        response = client.responses.parse(
            model=OPENAI_MODEL,
            input=[
                {
                    "role": "system",
                    "content": """
You are AdLens AI, a senior performance
marketing auditor.

Create a baseline marketing assessment
using only the user-provided data.

Score these categories from 0 to 100:

- overall marketing
- website readiness
- advertising performance
- tracking readiness
- conversion performance

Return:

- performance level
- concise executive summary
- 3 to 6 critical issues
- 3 to 6 prioritized actions
- 2 to 5 growth opportunities

Important rules:

- Do not claim live platform access.
- Do not claim that you visited the website.
- Do not invent Meta, Google or analytics data.
- Clearly base the assessment on supplied metrics.
- Use professional English.
""",
                },
                {
                    "role": "user",
                    "content": f"""
Company:
{payload.company_name}

Website:
{payload.website}

Industry:
{payload.industry}

Product or service:
{payload.product_or_service}

Monthly revenue:
${payload.monthly_revenue}

Monthly ad budget:
${payload.monthly_ad_budget}

Average order value:
${payload.average_order_value}

Countries:
{", ".join(payload.countries)}

Primary goal:
{payload.primary_goal}

Advertising platforms:
{", ".join(payload.platforms)}

Monthly conversions:
{payload.current_monthly_conversions}

Current ROAS:
{payload.current_roas}

Current CPA:
${payload.current_cpa}

Current CTR:
{payload.current_ctr}%

Current conversion rate:
{payload.current_conversion_rate}%

Tracking installed:
{payload.tracking_installed}

Website optimized:
{payload.website_optimized}

Create the BEFORE baseline report.
""",
                },
            ],
            text_format=AIBaselineAnalysis,
        )

        result = require_ai_result(
            response.output_parsed,
            "Empty baseline analysis",
        )

        metrics = BaselineMetrics(
            monthly_revenue=payload.monthly_revenue,
            monthly_ad_budget=payload.monthly_ad_budget,
            monthly_conversions=(
                payload.current_monthly_conversions
            ),
            roas=payload.current_roas,
            cpa=payload.current_cpa,
            ctr=payload.current_ctr,
            conversion_rate=(
                payload.current_conversion_rate
            ),
            estimated_profit=estimated_profit,
        )

        return BaselineResponse(
            **result.model_dump(),
            baseline_status="BEFORE",
            baseline_metrics=metrics,
            data_source="user_provided",
            disclaimer=(
                "This baseline is based on "
                "user-provided information and AI "
                "analysis. No advertising platform "
                "or website data was accessed."
            ),
        )

    except HTTPException:
        raise

    except Exception as error:
        print(
            "BASELINE ERROR:",
            repr(error),
        )

        raise HTTPException(
            status_code=502,
            detail="Baseline analysis failed.",
        )


# ==================================================
# STRATEGY ENDPOINT
# ==================================================


@app.post(
    "/strategy",
    response_model=StrategyResponse,
)
def create_strategy(
    payload: StrategyRequest,
):
    client = get_client()

    try:
        response = client.responses.parse(
            model=OPENAI_MODEL,
            input=[
                {
                    "role": "system",
                    "content": """
You are AdLens AI, a senior global
advertising strategist.

Create a realistic advertising strategy.

Return:

- score between 0 and 100
- performance level
- short summary
- estimated CTR range
- estimated conversion range
- estimated CPA range
- 3 to 5 advertising channels
- channel allocation percentages
- potential risks
- exactly 4 weekly action steps

Important rules:

- Percentages must be positive.
- Recommendations must be actionable.
- Do not claim live advertising data.
- Do not guarantee financial results.
- Use professional English.
""",
                },
                {
                    "role": "user",
                    "content": f"""
Product:
{payload.product}

Country:
{payload.country}

Monthly budget:
${payload.monthly_budget}

Goal:
{payload.goal}

Create the advertising strategy.
""",
                },
            ],
            text_format=AIStrategy,
        )

        result = require_ai_result(
            response.output_parsed,
            "Empty AI response",
        )

        raw_total = sum(
            item.percentage
            for item in result.channels
        )

        if raw_total <= 0:
            raise ValueError(
                "Invalid channel allocation",
            )

        normalized_percentages = [
            round(
                item.percentage
                / raw_total
                * 100
            )
            for item in result.channels
        ]

        percentage_difference = (
            100 - sum(normalized_percentages)
        )

        normalized_percentages[-1] += (
            percentage_difference
        )

        channels: list[ChannelResponse] = []

        for item, percentage in zip(
            result.channels,
            normalized_percentages,
        ):
            channels.append(
                ChannelResponse(
                    channel=item.channel,
                    percentage=percentage,
                    budget=round(
                        payload.monthly_budget
                        * percentage
                        / 100,
                        2,
                    ),
                    reason=item.reason,
                )
            )

        return StrategyResponse(
            score=result.score,
            performance_level=(
                result.performance_level
            ),
            summary=result.summary,
            expected_results=(
                result.expected_results
            ),
            channels=channels,
            risks=result.risks,
            first_30_day_plan=(
                result.first_30_day_plan[:4]
            ),
        )

    except HTTPException:
        raise

    except Exception as error:
        print(
            "STRATEGY ERROR:",
            repr(error),
        )

        raise HTTPException(
            status_code=502,
            detail="Strategy generation failed.",
        )


# ==================================================
# AD ANALYSIS ENDPOINT
# ==================================================


@app.post(
    "/analyze",
    response_model=AnalyzeResponse,
)
def analyze_ad(
    payload: AnalyzeRequest,
):
    client = get_client()

    try:
        response = client.responses.parse(
            model=OPENAI_MODEL,
            input=[
                {
                    "role": "system",
                    "content": """
You are a senior conversion copywriter.

Analyze the advertisement text.

Return:

- overall score from 0 to 100
- headline score
- CTA score
- trust score
- strengths
- weaknesses
- actionable suggestions

Important rules:

- Use only the supplied advertisement.
- Do not invent performance data.
- Use professional English.
""",
                },
                {
                    "role": "user",
                    "content": f"""
Analyze this advertisement:

{payload.ad_text}
""",
                },
            ],
            text_format=AnalyzeResponse,
        )

        return require_ai_result(
            response.output_parsed,
            "Empty advertisement analysis",
        )

    except HTTPException:
        raise

    except Exception as error:
        print(
            "ANALYZE ERROR:",
            repr(error),
        )

        raise HTTPException(
            status_code=502,
            detail=(
                "Advertisement analysis failed."
            ),
        )


# ==================================================
# WEBSITE ANALYSIS ENDPOINT
# ==================================================


@app.post(
    "/website-analysis",
    response_model=WebsiteAnalysisResponse,
)
def analyze_website(
    payload: WebsiteAnalyzeRequest,
):
    client = get_client()

    try:
        response = client.responses.parse(
            model=OPENAI_MODEL,
            input=[
                {
                    "role": "system",
                    "content": """
You are AdLens AI, a growth marketing
expert.

Analyze the business information that can
reasonably be inferred from the supplied
website URL.

Return:

- likely brand name
- likely product description
- likely target audience
- likely customer pain points
- likely value proposition
- recommended advertising channels

Important rules:

- You cannot browse the website.
- Do not claim that you visited the website.
- Clearly avoid presenting assumptions as
  verified facts.
- Use professional English.
""",
                },
                {
                    "role": "user",
                    "content": f"""
Website URL:

{payload.url}

Create a cautious business analysis using
only the URL context.
""",
                },
            ],
            text_format=WebsiteAnalysisResponse,
        )

        return require_ai_result(
            response.output_parsed,
            "Empty website analysis",
        )

    except HTTPException:
        raise

    except Exception as error:
        print(
            "WEBSITE ANALYSIS ERROR:",
            repr(error),
        )

        raise HTTPException(
            status_code=502,
            detail="Website analysis failed.",
        )


# ==================================================
# BEFORE / AFTER ENDPOINT
# ==================================================


def comparison_direction(
    before: float,
    after: float,
    lower_is_better: bool = False,
) -> Literal[
    "improved",
    "declined",
    "unchanged",
]:
    if after == before:
        return "unchanged"

    improved = (
        after < before
        if lower_is_better
        else after > before
    )

    return (
        "improved"
        if improved
        else "declined"
    )


def create_comparison(
    before: float,
    after: float,
    lower_is_better: bool = False,
) -> MetricComparison:
    return MetricComparison(
        before=before,
        after=after,
        absolute_change=round(
            after - before,
            2,
        ),
        percentage_change=percentage_change(
            before,
            after,
        ),
        direction=comparison_direction(
            before,
            after,
            lower_is_better,
        ),
    )


@app.post(
    "/before-after",
    response_model=BeforeAfterResponse,
)
def compare_before_after(
    payload: BeforeAfterRequest,
):
    before_profit = round(
        payload.before.revenue
        - payload.before.ad_spend,
        2,
    )

    after_profit = round(
        payload.after.revenue
        - payload.after.ad_spend,
        2,
    )

    profit_change = round(
        after_profit - before_profit,
        2,
    )

    improved_metrics = 0
    declined_metrics = 0

    comparisons = [
        create_comparison(
            payload.before.revenue,
            payload.after.revenue,
        ),
        create_comparison(
            payload.before.conversions,
            payload.after.conversions,
        ),
        create_comparison(
            payload.before.roas,
            payload.after.roas,
        ),
        create_comparison(
            payload.before.cpa,
            payload.after.cpa,
            lower_is_better=True,
        ),
        create_comparison(
            payload.before.ctr,
            payload.after.ctr,
        ),
        create_comparison(
            payload.before.conversion_rate,
            payload.after.conversion_rate,
        ),
    ]

    for comparison in comparisons:
        if comparison.direction == "improved":
            improved_metrics += 1

        if comparison.direction == "declined":
            declined_metrics += 1

    if (
        profit_change > 0
        and improved_metrics >= 4
    ):
        overall_status = (
            "PROFITABLE_IMPROVEMENT"
        )

        summary = (
            "Performance improved and the "
            "campaign generated more estimated "
            "profit than the baseline."
        )

    elif (
        profit_change < 0
        and declined_metrics >= 3
    ):
        overall_status = (
            "PERFORMANCE_DECLINE"
        )

        summary = (
            "Performance declined compared with "
            "the baseline. The campaign strategy "
            "should be reviewed."
        )

    else:
        overall_status = "MIXED_RESULTS"

        summary = (
            "The campaign produced mixed results. "
            "Continue testing while optimizing "
            "weaker metrics."
        )

    return BeforeAfterResponse(
        revenue=create_comparison(
            payload.before.revenue,
            payload.after.revenue,
        ),
        ad_spend=create_comparison(
            payload.before.ad_spend,
            payload.after.ad_spend,
            lower_is_better=True,
        ),
        conversions=create_comparison(
            payload.before.conversions,
            payload.after.conversions,
        ),
        roas=create_comparison(
            payload.before.roas,
            payload.after.roas,
        ),
        cpa=create_comparison(
            payload.before.cpa,
            payload.after.cpa,
            lower_is_better=True,
        ),
        ctr=create_comparison(
            payload.before.ctr,
            payload.after.ctr,
        ),
        conversion_rate=create_comparison(
            payload.before.conversion_rate,
            payload.after.conversion_rate,
        ),
        profit_before=before_profit,
        profit_after=after_profit,
        profit_change=profit_change,
        overall_status=overall_status,
        summary=summary,
    )


# ==================================================
# DECISION ENGINE ENDPOINT
# ==================================================


@app.post(
    "/decision-engine",
    response_model=DecisionEngineResponse,
)
def create_decision(
    payload: DecisionEngineRequest,
):
    previous_profit = round(
        payload.previous.revenue
        - payload.previous.ad_spend,
        2,
    )

    current_profit = round(
        payload.current.revenue
        - payload.current.ad_spend,
        2,
    )

    profitable = current_profit > 0

    roas_change = percentage_change(
        payload.previous.roas,
        payload.current.roas,
    )

    cpa_change = percentage_change(
        payload.previous.cpa,
        payload.current.cpa,
    )

    ctr_change = percentage_change(
        payload.previous.ctr,
        payload.current.ctr,
    )

    reasons: list[str] = []
    actions: list[str] = []

    if (
        payload.observed_data_days
        < payload.minimum_data_days
    ):
        decision: DecisionType = "CONTINUE"
        confidence = 55

        reasons.append(
            "The campaign does not yet have "
            "enough data for a strong decision."
        )

        actions.extend(
            [
                "Continue collecting data.",
                "Avoid major budget changes.",
                "Review performance after the minimum data period.",
            ]
        )

    elif (
        payload.current.roas
        >= payload.target_roas * 1.15
        and payload.current.cpa
        <= payload.maximum_cpa
        and current_profit > previous_profit
    ):
        decision = "SCALE"
        confidence = 92

        reasons.extend(
            [
                "ROAS is materially above target.",
                "CPA is within the accepted limit.",
                "Estimated profit improved.",
            ]
        )

        actions.extend(
            [
                "Increase the winning campaign budget by 10% to 20%.",
                "Keep the strongest audience and creative active.",
                "Review CPA and ROAS again within three days.",
            ]
        )

    elif (
        payload.current.roas
        >= payload.target_roas
        and payload.current.cpa
        <= payload.maximum_cpa
        and profitable
    ):
        decision = "CONTINUE"
        confidence = 86

        reasons.extend(
            [
                "The campaign is meeting the ROAS target.",
                "CPA remains within the accepted limit.",
                "The campaign is currently profitable.",
            ]
        )

        actions.extend(
            [
                "Continue the current campaign.",
                "Do not make large budget changes.",
                "Test one new creative variation.",
            ]
        )

    elif (
        not profitable
        or payload.current.roas < 1
    ):
        decision = "PAUSE"
        confidence = 94

        reasons.extend(
            [
                "The campaign is not producing positive estimated profit.",
                "Current ROAS is below a sustainable level.",
            ]
        )

        actions.extend(
            [
                "Pause the weakest campaign or ad set.",
                "Review conversion tracking before relaunching.",
                "Replace low-performing creatives and targeting.",
            ]
        )

    elif (
        payload.current.roas
        < payload.previous.roas * 0.8
        and payload.current.cpa
        > payload.previous.cpa * 1.2
    ):
        decision = "CHANGE_STRATEGY"
        confidence = 90

        reasons.extend(
            [
                "ROAS declined significantly.",
                "CPA increased significantly.",
                "The current approach is losing efficiency.",
            ]
        )

        actions.extend(
            [
                "Change the campaign strategy.",
                "Move budget away from the weakest channel.",
                "Test a new audience, offer and creative angle.",
            ]
        )

    else:
        decision = "OPTIMIZE"
        confidence = 78

        reasons.extend(
            [
                "Results are not strong enough to scale.",
                "The campaign is not weak enough to pause immediately.",
                "Performance requires targeted optimization.",
            ]
        )

        actions.extend(
            [
                "Reduce budget on weak ads.",
                "Create new headline and visual variations.",
                "Review audience quality and landing-page conversion.",
            ]
        )

    if roas_change is not None:
        reasons.append(
            f"ROAS change: {roas_change:+.2f}%."
        )

    if cpa_change is not None:
        reasons.append(
            f"CPA change: {cpa_change:+.2f}%."
        )

    if ctr_change is not None:
        reasons.append(
            f"CTR change: {ctr_change:+.2f}%."
        )

    return DecisionEngineResponse(
        decision=decision,
        confidence=confidence,
        profitable=profitable,
        previous_profit=previous_profit,
        current_profit=current_profit,
        reasons=reasons,
        recommended_actions=actions,
        next_review_in_days=(
            3
            if decision in {
                "SCALE",
                "PAUSE",
                "CHANGE_STRATEGY",
            }
            else 7
        ),
    )