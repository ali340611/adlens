"use client";

import { useMemo, useState } from "react";

import {
  Activity,
  BarChart3,
  Bell,
  Bot,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Crown,
  Download,
  Gauge,
  ImageIcon,
  LayoutDashboard,
  Lightbulb,
  Menu,
  MessageSquareText,
  MousePointerClick,
  Plus,
  Rocket,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";

import {
  SiAmazon,
  SiFacebook,
  SiGoogle,
  SiGoogleads,
  SiGoogleanalytics,
  SiHubspot,
  SiInstagram,
  SiKlaviyo,
  SiLinkedin,
  SiMailchimp,
  SiMeta,
  SiMicrosoft,
  SiPinterest,
  SiReddit,
  SiSalesforce,
  SiShopify,
  SiSnapchat,
  SiSpotify,
  SiSquarespace,
  SiTiktok,
  SiWix,
  SiWoocommerce,
  SiWordpress,
  SiX,
  SiYoutube,
} from "react-icons/si";

const navGroups = [
  {
    title: "Workspace",
    items: [
      ["Dashboard", LayoutDashboard, true],
      ["Strategies", WandSparkles],
      ["Campaigns", Rocket],
      ["AI Intelligence", Sparkles, false, "New"],
      ["Competitors", Users],
      ["Website Analyzer", Gauge],
      ["Audience Builder", Target],
      ["Creative Studio", ImageIcon],
      ["Reports", BarChart3],
      ["Settings", Settings],
    ],
  },
  {
    title: "AI Tools",
    items: [
      ["AI Copilot", Bot, false, "Beta"],
      ["Ad Copy Generator", MessageSquareText],
      ["Creative Generator", WandSparkles],
      ["Budget Simulator", CircleDollarSign],
    ],
  },
];

const connectedPlatforms = [
  {
    name: "Google Ads",
    Icon: SiGoogleads,
    className: "googleAds",
  },
  {
    name: "Meta Ads",
    Icon: SiMeta,
    className: "metaAds",
  },
  {
    name: "Shopify",
    Icon: SiShopify,
    className: "shopify",
  },
  {
    name: "GA4",
    Icon: SiGoogleanalytics,
    className: "analytics",
  },
];

const marketingPlatforms = [
  {
    name: "Google Ads",
    Icon: SiGoogleads,
    className: "googleAds",
    category: "Advertising",
  },
  {
    name: "Meta Ads",
    Icon: SiMeta,
    className: "metaAds",
    category: "Advertising",
  },
  {
    name: "Facebook",
    Icon: SiFacebook,
    className: "facebook",
    category: "Social",
  },
  {
    name: "Instagram",
    Icon: SiInstagram,
    className: "instagram",
    category: "Social",
  },
  {
    name: "TikTok Ads",
    Icon: SiTiktok,
    className: "tiktok",
    category: "Advertising",
  },
  {
    name: "YouTube Ads",
    Icon: SiYoutube,
    className: "youtube",
    category: "Advertising",
  },
  {
    name: "LinkedIn Ads",
    Icon: SiLinkedin,
    className: "linkedin",
    category: "Advertising",
  },
  {
    name: "Pinterest Ads",
    Icon: SiPinterest,
    className: "pinterest",
    category: "Advertising",
  },
  {
    name: "Snapchat Ads",
    Icon: SiSnapchat,
    className: "snapchat",
    category: "Advertising",
  },
  {
    name: "X Ads",
    Icon: SiX,
    className: "x",
    category: "Advertising",
  },
  {
    name: "Reddit Ads",
    Icon: SiReddit,
    className: "reddit",
    category: "Advertising",
  },
  {
    name: "Spotify Ads",
    Icon: SiSpotify,
    className: "spotify",
    category: "Advertising",
  },
  {
    name: "Microsoft Ads",
    Icon: SiMicrosoft,
    className: "microsoft",
    category: "Advertising",
  },
  {
    name: "Amazon Ads",
    Icon: SiAmazon,
    className: "amazon",
    category: "Advertising",
  },
  {
    name: "Google Analytics",
    Icon: SiGoogleanalytics,
    className: "analytics",
    category: "Analytics",
  },
  {
    name: "Google",
    Icon: SiGoogle,
    className: "google",
    category: "Analytics",
  },
  {
    name: "Shopify",
    Icon: SiShopify,
    className: "shopify",
    category: "E-commerce",
  },
  {
    name: "WooCommerce",
    Icon: SiWoocommerce,
    className: "woocommerce",
    category: "E-commerce",
  },
  {
    name: "WordPress",
    Icon: SiWordpress,
    className: "wordpress",
    category: "E-commerce",
  },
  {
    name: "Wix",
    Icon: SiWix,
    className: "wix",
    category: "E-commerce",
  },
  {
    name: "Squarespace",
    Icon: SiSquarespace,
    className: "squarespace",
    category: "E-commerce",
  },
  {
    name: "Mailchimp",
    Icon: SiMailchimp,
    className: "mailchimp",
    category: "Email",
  },
  {
    name: "Klaviyo",
    Icon: SiKlaviyo,
    className: "klaviyo",
    category: "Email",
  },
  {
    name: "HubSpot",
    Icon: SiHubspot,
    className: "hubspot",
    category: "CRM",
  },
  {
    name: "Salesforce",
    Icon: SiSalesforce,
    className: "salesforce",
    category: "CRM",
  },
];

const metrics = [
  {
    label: "Revenue",
    value: "$24,540",
    change: "↑ 18.6%",
    icon: CircleDollarSign,
    tone: "purple",
    chart:
      "3,27 15,25 27,26 39,20 51,23 63,17 75,19 87,12 99,15 111,8",
  },
  {
    label: "ROAS",
    value: "3.80x",
    change: "↑ 15.3%",
    icon: TrendingUp,
    tone: "green",
    chart:
      "3,28 15,26 27,25 39,22 51,23 63,18 75,19 87,14 99,12 111,7",
  },
  {
    label: "Ad Spend",
    value: "$6,452",
    change: "↑ 12.4%",
    icon: Activity,
    tone: "blue",
    chart:
      "3,29 15,27 27,25 39,26 51,20 63,22 75,16 87,18 99,12 111,8",
  },
  {
    label: "CTR",
    value: "2.45%",
    change: "↑ 8.7%",
    icon: MousePointerClick,
    tone: "purple",
    chart:
      "3,28 15,24 27,26 39,20 51,22 63,16 75,18 87,11 99,14 111,7",
  },
  {
    label: "CPC",
    value: "$0.68",
    change: "↓ 9.2%",
    icon: Search,
    tone: "orange",
    chart:
      "3,12 15,15 27,13 39,18 51,16 63,21 75,19 87,23 99,21 111,27",
    negative: true,
  },
  {
    label: "CPA",
    value: "$18.72",
    change: "↓ 11.9%",
    icon: Users,
    tone: "yellow",
    chart:
      "3,13 15,16 27,14 39,19 51,17 63,22 75,20 87,24 99,22 111,27",
    negative: true,
  },
];

const priorities = [
  {
    rank: 1,
    title: "Fix Landing Page Speed",
    subtitle: "Potential revenue increase",
    impact: "High Impact",
    revenue: "+$2,420",
    icon: Rocket,
  },
  {
    rank: 2,
    title: "Launch TikTok Campaign",
    subtitle: "Potential revenue increase",
    impact: "High Impact",
    revenue: "+$1,890",
    BrandIcon: SiTiktok,
  },
  {
    rank: 3,
    title: "Increase Google Ads Budget",
    subtitle: "Potential revenue increase",
    impact: "Medium Impact",
    revenue: "+$1,350",
    BrandIcon: SiGoogleads,
  },
];

const strategies = [
  {
    Icon: SiMeta,
    className: "meta",
    title: "E-commerce Growth Strategy",
    flag: "🇺🇸",
    country: "United States",
    budget: "$2,500",
    goal: "Sales",
    score: 92,
    created: "2 days ago",
  },
  {
    Icon: SiTiktok,
    className: "tiktok",
    title: "TikTok Scaling Strategy",
    flag: "🇬🇧",
    country: "United Kingdom",
    budget: "£1,800",
    goal: "Leads",
    score: 88,
    created: "5 days ago",
  },
  {
    Icon: SiGoogleads,
    className: "google",
    title: "Google Ads Optimization",
    flag: "🇩🇪",
    country: "Germany",
    budget: "€1,200",
    goal: "Sales",
    score: 85,
    created: "1 week ago",
  },
];

const countries = [
  {
    code: "US",
    flag: "🇺🇸",
    name: "United States",
    currency: "USD",
    symbol: "$",
  },
  {
    code: "GB",
    flag: "🇬🇧",
    name: "United Kingdom",
    currency: "GBP",
    symbol: "£",
  },
  {
    code: "DE",
    flag: "🇩🇪",
    name: "Germany",
    currency: "EUR",
    symbol: "€",
  },
  {
    code: "FR",
    flag: "🇫🇷",
    name: "France",
    currency: "EUR",
    symbol: "€",
  },
  {
    code: "IT",
    flag: "🇮🇹",
    name: "Italy",
    currency: "EUR",
    symbol: "€",
  },
  {
    code: "ES",
    flag: "🇪🇸",
    name: "Spain",
    currency: "EUR",
    symbol: "€",
  },
  {
    code: "NL",
    flag: "🇳🇱",
    name: "Netherlands",
    currency: "EUR",
    symbol: "€",
  },
  {
    code: "TR",
    flag: "🇹🇷",
    name: "Türkiye",
    currency: "TRY",
    symbol: "₺",
  },
  {
    code: "AE",
    flag: "🇦🇪",
    name: "United Arab Emirates",
    currency: "AED",
    symbol: "د.إ",
  },
  {
    code: "SA",
    flag: "🇸🇦",
    name: "Saudi Arabia",
    currency: "SAR",
    symbol: "﷼",
  },
  {
    code: "CA",
    flag: "🇨🇦",
    name: "Canada",
    currency: "CAD",
    symbol: "C$",
  },
  {
    code: "AU",
    flag: "🇦🇺",
    name: "Australia",
    currency: "AUD",
    symbol: "A$",
  },
  {
    code: "JP",
    flag: "🇯🇵",
    name: "Japan",
    currency: "JPY",
    symbol: "¥",
  },
  {
    code: "KR",
    flag: "🇰🇷",
    name: "South Korea",
    currency: "KRW",
    symbol: "₩",
  },
  {
    code: "IN",
    flag: "🇮🇳",
    name: "India",
    currency: "INR",
    symbol: "₹",
  },
  {
    code: "BR",
    flag: "🇧🇷",
    name: "Brazil",
    currency: "BRL",
    symbol: "R$",
  },
  {
    code: "MX",
    flag: "🇲🇽",
    name: "Mexico",
    currency: "MXN",
    symbol: "MX$",
  },
];

function Brand() {
  return (
    <div className="brand">
      <div className="brandMark">
        <span />
        <span />
        <b>A</b>
      </div>

      <div className="brandCopy">
        <strong>AdLens</strong>
        <small>AI Marketing Intelligence</small>
      </div>
    </div>
  );
}

function Sidebar({ open, onClose }) {
  return (
    <>
      <button
        type="button"
        className={`overlay ${open ? "show" : ""}`}
        onClick={onClose}
        aria-label="Close menu"
      />

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebarTop">
          <Brand />

          <button
            type="button"
            className="iconButton closeMenu"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={17} />
          </button>
        </div>

        <div className="sidebarBody">
          {navGroups.map((group) => (
            <section className="navGroup" key={group.title}>
              <span className="navTitle">{group.title}</span>

              {group.items.map(([label, Icon, active, badge]) => (
                <button
                  type="button"
                  className={`navItem ${active ? "active" : ""}`}
                  key={label}
                >
                  <Icon size={16} strokeWidth={1.9} />

                  <span>{label}</span>

                  {badge && <small>{badge}</small>}
                </button>
              ))}
            </section>
          ))}

          <div className="premiumCard">
            <div className="premiumHead">
              <span>
                <Crown size={18} />
              </span>

              <strong>Go Premium</strong>
            </div>

            <p>
              Unlock the full power of AdLens with unlimited strategies,
              advanced insights and priority support.
            </p>

            <button type="button">
              Upgrade Plan
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        <div className="sidebarUser">
          <div className="avatar">MA</div>

          <div>
            <strong>Muhammed Ali</strong>
            <small>Premium Member</small>
          </div>

          <ChevronDown size={15} />
        </div>
      </aside>
    </>
  );
}

function Topbar({ onMenu, onNewStrategy }) {
  return (
    <header className="topbar">
      <div className="welcomeWrap">
        <button
          type="button"
          className="iconButton menuButton"
          onClick={onMenu}
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1>
            Good evening, Muhammed! <span>👋</span>
          </h1>

          <p>Your business is outperforming 87% of similar businesses.</p>
        </div>
      </div>

      <div className="topActions">
        <button type="button" className="ghostButton dateButton">
          <CalendarDays size={15} />
          May 6 – Jun 5, 2026
          <ChevronDown size={13} />
        </button>

        <button type="button" className="ghostButton exportButton">
          <Download size={15} />
          Export Report
        </button>

        <button
          type="button"
          className="primaryButton"
          onClick={onNewStrategy}
        >
          <Plus size={16} />
          New Strategy
        </button>

        <button
          type="button"
          className="iconButton notify"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <i>3</i>
        </button>

        <div className="connections">
          {connectedPlatforms.map(({ name, Icon, className }) => (
            <div className={`connection ${className}`} key={name}>
              <b>
                <Icon size={16} />
              </b>

              <span>
                {name}
                <small>Connected</small>
              </span>
            </div>
          ))}
        </div>

        <button type="button" className="profileButton">
          <div className="avatar">MA</div>
          <ChevronDown size={14} />
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero shellCard">
      <div className="heroRevenue">
        <div className="heroPills">
          <span>Since joining AdLens</span>

          <span>
            <ShieldCheck size={13} />
            Business Health
            <b>87/100</b>
          </span>
        </div>

        <div className="heroAmount">
          <small>+</small>
          <strong>$10,340</strong>
        </div>

        <h2>Revenue Generated</h2>
        <p>Since you joined on May 6, 2026</p>

        <div className="confidence">
          <Lightbulb size={14} />
          AI Confidence Average: 94%
        </div>

        <svg
          className="heroWave"
          viewBox="0 0 560 160"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="waveStroke"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0" stopColor="#6d28d9" stopOpacity="0" />
              <stop offset=".48" stopColor="#c266ff" />
              <stop offset="1" stopColor="#7c3aed" stopOpacity=".15" />
            </linearGradient>

            <radialGradient id="waveGlow">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset=".25" stopColor="#e9d5ff" />
              <stop offset="1" stopColor="#a855f7" stopOpacity="0" />
            </radialGradient>
          </defs>

          <path d="M0 130 C110 128 155 76 252 94 C327 108 362 42 448 76 C502 98 525 118 560 110" />

          <path d="M0 142 C95 134 162 90 245 100 C330 112 378 55 455 86 C500 104 532 112 560 108" />

          <path d="M0 150 C108 140 166 110 250 108 C330 107 394 76 467 98 C507 110 538 112 560 109" />

          <circle cx="253" cy="94" r="22" fill="url(#waveGlow)" />
          <circle cx="253" cy="94" r="3.5" fill="#ffffff" />
          <circle cx="447" cy="76" r="2.5" fill="#d8b4fe" />
        </svg>
      </div>

      <div className="heroStats">
        {[
          ["+$7,180", "Estimated Profit", "↑ 68%", "vs Apr 5 – May 5"],
          ["146x", "ROI", "$148.58 per $1 spent", ""],
          ["-$12.68", "Lower CPA", "↓ 31%", "vs Apr 5 – May 5"],
          ["+72%", "Revenue Growth", "↑ 72%", "vs Apr 5 – May 5"],
        ].map(([value, label, change, meta]) => (
          <article key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
            <b>{change}</b>
            {meta && <small>{meta}</small>}
          </article>
        ))}
      </div>

      <div className="heroSide">
        <article className="miniPanel goalPanel">
          <div>
            <span>Monthly Goal</span>
            <button type="button">Edit Goal</button>
          </div>

          <p>
            <strong>$24,540</strong>
            <small>/ $50,000</small>
          </p>

          <div className="progressRow">
            <span>
              <i />
            </span>

            <b>49%</b>
          </div>

          <small>22 days left in this month</small>
        </article>

        <article className="miniPanel opportunityPanel">
          <div>
            <span>
              Opportunity Score <i>i</i>
            </span>

            <Lightbulb size={15} />
          </div>

          <div className="oppValues">
            <p>
              <small>Potential Revenue</small>
              <strong>$39,800</strong>
            </p>

            <p>
              <small>Opportunity Left</small>
              <strong>+$15,260</strong>
            </p>
          </div>

          <svg viewBox="0 0 200 30" preserveAspectRatio="none">
            <polyline points="0,20 12,17 24,21 36,16 48,19 60,15 72,19 84,14 96,16 108,11 120,14 132,9 144,12 156,7 168,10 180,5 200,7" />
          </svg>
        </article>
      </div>
    </section>
  );
}

function MetricCard({ metric }) {
  const Icon = metric.icon;

  return (
    <article className={`metricCard shellCard ${metric.tone}`}>
      <div className="metricTop">
        <span className="metricIcon">
          <Icon size={18} />
        </span>

        <span>{metric.label}</span>
      </div>

      <strong>{metric.value}</strong>

      <p>
        <b className={metric.negative ? "negative" : ""}>
          {metric.change}
        </b>

        <small>vs last 30 days</small>
      </p>

      <svg viewBox="0 0 114 32" preserveAspectRatio="none">
        <polyline points={metric.chart} />
      </svg>
    </article>
  );
}

function RevenueChart() {
  const purplePoints = [
    [18, 135],
    [60, 118],
    [100, 105],
    [145, 110],
    [185, 92],
    [225, 80],
    [265, 84],
    [305, 68],
    [345, 62],
    [385, 48],
    [425, 54],
    [465, 45],
    [505, 30],
    [545, 36],
    [585, 24],
    [625, 12],
    [670, 5],
  ];

  const greenPoints = [
    [18, 154],
    [60, 148],
    [100, 143],
    [145, 137],
    [185, 127],
    [225, 120],
    [265, 112],
    [305, 105],
    [345, 98],
    [385, 84],
    [425, 86],
    [465, 77],
    [505, 63],
    [545, 58],
    [585, 46],
    [625, 34],
    [670, 21],
  ];

  return (
    <section className="chartCard shellCard">
      <div className="sectionHead">
        <div>
          <h3>
            Revenue Impact Over Time <i>i</i>
          </h3>

          <p className="legend">
            <span>
              <b className="dash" />
              Without AdLens
            </span>

            <span>
              <b className="dot purpleDot" />
              With AdLens
            </span>

            <span>
              <b className="dot greenDot" />
              AdLens-attributed uplift
            </span>
          </p>
        </div>

        <button type="button">
          Last 30 days
          <ChevronDown size={13} />
        </button>
      </div>

      <div className="chartBody">
        <div>
          <svg viewBox="0 0 690 205" preserveAspectRatio="none">
            {[35, 77, 119, 161].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="690"
                y2={y}
                className="gridLine"
              />
            ))}

            <line
              x1="185"
              y1="12"
              x2="185"
              y2="190"
              className="started"
            />

            <text x="135" y="18">
              Started using AdLens
            </text>

            <polyline
              className="baselineLine"
              points="18,154 60,148 100,145 145,140 185,138 225,136 265,134 305,131 345,129 385,126 425,122 465,119 505,116 545,112 585,107 625,102 670,96"
            />

            <polyline
              className="purpleLine"
              points={purplePoints.map((point) => point.join(",")).join(" ")}
            />

            <polyline
              className="greenLine"
              points={greenPoints.map((point) => point.join(",")).join(" ")}
            />

            {purplePoints.map(([x, y]) => (
              <circle
                key={`purple-${x}`}
                cx={x}
                cy={y}
                r="3.5"
                className="purplePoint"
              />
            ))}

            {greenPoints.map(([x, y]) => (
              <circle
                key={`green-${x}`}
                cx={x}
                cy={y}
                r="3.5"
                className="greenPoint"
              />
            ))}
          </svg>

          <div className="axis">
            <span>May 6</span>
            <span>May 13</span>
            <span>May 20</span>
            <span>May 27</span>
            <span>Jun 3</span>
          </div>
        </div>

        <aside>
          <span>With AdLens</span>
          <strong className="purpleText">$24,540</strong>

          <span>Without AdLens</span>
          <strong>$17,360</strong>

          <span>Difference</span>
          <strong className="greenText">+$7,180</strong>

          <b>(+41.4%)</b>
        </aside>
      </div>

      <button type="button" className="textButton">
        View Detailed Analytics
        <ChevronRight size={14} />
      </button>
    </section>
  );
}

function PriorityIcon({ priority }) {
  if (priority.BrandIcon) {
    const BrandIcon = priority.BrandIcon;

    return (
      <span
        className={`priorityIcon brandPriority brandPriority${priority.rank}`}
      >
        <BrandIcon size={18} />
      </span>
    );
  }

  const Icon = priority.icon;

  return (
    <span className="priorityIcon">
      <Icon size={18} />
    </span>
  );
}

function Priorities() {
  return (
    <section className="priorityCard shellCard">
      <div className="sectionHead">
        <div>
          <h3>Top 3 AI Priorities</h3>
          <p>Recommended actions with the highest revenue impact.</p>
        </div>

        <button type="button" className="textButton">
          View All
        </button>
      </div>

      <div className="priorityList">
        {priorities.map((priority) => (
          <article key={priority.rank}>
            <span className={`rank rank${priority.rank}`}>
              {priority.rank}
            </span>

            <PriorityIcon priority={priority} />

            <div>
              <strong>{priority.title}</strong>
              <small>{priority.subtitle}</small>
            </div>

            <div>
              <span>{priority.impact}</span>
              <strong>{priority.revenue}</strong>
            </div>

            <ChevronRight size={16} />
          </article>
        ))}
      </div>

      <button type="button" className="recommendButton">
        Review Recommendations
        <ChevronRight size={16} />
      </button>
    </section>
  );
}

function RecentStrategies() {
  return (
    <section className="strategiesCard shellCard">
      <div className="sectionHead">
        <h3>Recent Strategies</h3>

        <button type="button" className="textButton">
          View All
        </button>
      </div>

      <div className="strategyTable">
        <div className="strategyHeader">
          <span>Strategy</span>
          <span>Country</span>
          <span>Budget</span>
          <span>Goal</span>
          <span>AI Score</span>
          <span>Created</span>
          <span />
        </div>

        {strategies.map((strategy) => {
          const PlatformIcon = strategy.Icon;

          return (
            <article key={strategy.title}>
              <div className="strategyName">
                <b className={strategy.className}>
                  <PlatformIcon size={15} />
                </b>

                <strong>{strategy.title}</strong>
              </div>

              <span className="strategyCountry">
                <b>{strategy.flag}</b>
                {strategy.country}
              </span>

              <span>{strategy.budget}</span>
              <span>{strategy.goal}</span>
              <i>{strategy.score}</i>
              <span>{strategy.created}</span>
              <ChevronRight size={15} />
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Copilot() {
  const [message, setMessage] = useState("");

  const questions = [
    "Why is my ROAS decreasing?",
    "Which channel has best ROI?",
    "How can I improve my ad creative?",
    "What budget should I use?",
  ];

  return (
    <section className="copilotCard shellCard">
      <div className="sectionHead">
        <div className="copilotTitle">
          <span>
            <Bot size={18} />
          </span>

          <h3>
            AI Copilot <small>Beta</small>
          </h3>
        </div>

        <button type="button" className="textButton">
          View All
        </button>
      </div>

      <div className="chips">
        {questions.map((question) => (
          <button
            type="button"
            key={question}
            onClick={() => setMessage(question)}
          >
            {question}
          </button>
        ))}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setMessage("");
        }}
      >
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Ask anything about your marketing..."
        />

        <button type="submit">
          <Send size={17} />
        </button>
      </form>

      <footer>
        <span>Powered by AdLens AI</span>
        <span>99% accuracy</span>
        <span>ⓘ</span>
      </footer>
    </section>
  );
}

function PlatformSelector({ value, onChange }) {
  const [searchValue, setSearchValue] = useState("");

  const filteredPlatforms = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    if (!normalizedSearch) {
      return marketingPlatforms;
    }

    return marketingPlatforms.filter((platform) => {
      return (
        platform.name.toLowerCase().includes(normalizedSearch) ||
        platform.category.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [searchValue]);

  return (
    <div className="platformSelector">
      <div className="platformSearch">
        <Search size={15} />

        <input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Search platform..."
        />
      </div>

      <div className="platformGrid">
        {filteredPlatforms.map((platform) => {
          const Icon = platform.Icon;
          const selected = value === platform.name;

          return (
            <button
              type="button"
              key={platform.name}
              className={`platformOption ${platform.className} ${
                selected ? "selected" : ""
              }`}
              onClick={() => onChange(platform.name)}
            >
              <span>
                <Icon size={18} />
              </span>

              <strong>{platform.name}</strong>
              <small>{platform.category}</small>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NewStrategyModal({ open, onClose }) {
  const [countryCode, setCountryCode] = useState("US");
  const [selectedPlatform, setSelectedPlatform] =
    useState("Google Ads");
  const [product, setProduct] = useState("");
  const [budget, setBudget] = useState("");
  const [goal, setGoal] = useState("Sales");

  const selectedCountry = useMemo(
    () =>
      countries.find((country) => country.code === countryCode) ??
      countries[0],
    [countryCode],
  );

  if (!open) {
    return null;
  }

  return (
    <div
      className="modalBackdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal modalLarge">
        <div className="modalHead">
          <div>
            <span>
              <Sparkles size={18} />
            </span>

            <div>
              <h2>Create New Strategy</h2>
              <p>
                Select your platforms and generate a market-ready AI
                advertising strategy.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="iconButton"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="formGrid">
          <label>
            <span>Product or Service</span>

            <input
              value={product}
              onChange={(event) => setProduct(event.target.value)}
              placeholder="e.g. Premium skincare brand"
            />
          </label>

          <label>
            <span>Target Country</span>

            <select
              value={countryCode}
              onChange={(event) => setCountryCode(event.target.value)}
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name} · {country.currency}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Monthly Budget</span>

            <div className="moneyInput">
              <b>{selectedCountry.symbol}</b>

              <input
                type="number"
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                placeholder="5000"
              />
            </div>
          </label>

          <label>
            <span>Primary Goal</span>

            <select
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
            >
              <option>Sales</option>
              <option>Leads</option>
              <option>Awareness</option>
              <option>App Installs</option>
              <option>Website Traffic</option>
            </select>
          </label>
        </div>

        <div className="modalSectionTitle">
          <div>
            <strong>Primary Marketing Platform</strong>
            <small>
              Choose the main channel for this advertising strategy.
            </small>
          </div>

          <span>{selectedPlatform}</span>
        </div>

        <PlatformSelector
          value={selectedPlatform}
          onChange={setSelectedPlatform}
        />

        <div className="currencyPreview">
          <span>{selectedCountry.flag}</span>

          <div>
            <strong>{selectedCountry.name}</strong>
            <small>
              {selectedCountry.currency} · {selectedCountry.symbol}
            </small>
          </div>

          <div className="selectedPlatformPreview">
            {(() => {
              const platform =
                marketingPlatforms.find(
                  (item) => item.name === selectedPlatform,
                ) ?? marketingPlatforms[0];

              const Icon = platform.Icon;

              return (
                <>
                  <span className={platform.className}>
                    <Icon size={17} />
                  </span>

                  <div>
                    <strong>{platform.name}</strong>
                    <small>Primary advertising platform</small>
                  </div>
                </>
              );
            })()}
          </div>
        </div>

        <button
          type="button"
          className="generateButton"
          onClick={onClose}
        >
          <Sparkles size={17} />
          Generate Strategy
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="adlensApp">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="mainContent">
        <Topbar
          onMenu={() => setSidebarOpen(true)}
          onNewStrategy={() => setModalOpen(true)}
        />

        <div className="dashboard">
          <Hero />

          <section className="metricsGrid">
            {metrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </section>

          <section className="middleGrid">
            <RevenueChart />
            <Priorities />
          </section>

          <section className="bottomGrid">
            <RecentStrategies />
            <Copilot />
          </section>
        </div>
      </main>

      <NewStrategyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}