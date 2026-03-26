import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Sun,
  Moon,
  Zap,
  TrendingUp,
  Leaf,
  Shield,
  ChevronRight,
  ChevronLeft,
  Globe,
  Users,
  Settings,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Battery,
  Home,
  Cloud,
  Smartphone,
  Database,
  Brain,
  Activity
} from "lucide-react";

// --- DATA (Fully Restored) ---
const gridMixData = [
  { year: "2020", fossil: 82, renewable: 18 },
  { year: "2022", fossil: 79, renewable: 21 },
  { year: "2024", fossil: 76, renewable: 24 },
  { year: "2030*", fossil: 55, renewable: 45 },
  { year: "2035*", fossil: 40, renewable: 60 },
  { year: "2050*", fossil: 30, renewable: 70 },
];

const prosumerROIData = [
  { month: "Jan", baseline: 120, ecotrade: 145 },
  { month: "Feb", baseline: 118, ecotrade: 152 },
  { month: "Mar", baseline: 125, ecotrade: 168 },
  { month: "Apr", baseline: 130, ecotrade: 179 },
  { month: "May", baseline: 140, ecotrade: 198 },
  { month: "Jun", baseline: 145, ecotrade: 215 },
  { month: "Jul", baseline: 143, ecotrade: 224 },
  { month: "Aug", baseline: 141, ecotrade: 231 },
];

const energyFlowData = [
  { hour: "6am", surplus: 5, local: 3, grid: 2 },
  { hour: "8am", surplus: 18, local: 12, grid: 6 },
  { hour: "10am", surplus: 42, local: 30, grid: 12 },
  { hour: "12pm", surplus: 68, local: 55, grid: 13 },
  { hour: "2pm", surplus: 72, local: 62, grid: 10 },
  { hour: "4pm", surplus: 48, local: 42, grid: 6 },
  { hour: "6pm", surplus: 20, local: 20, grid: 0 },
  { hour: "8pm", surplus: 4, local: 4, grid: 0 },
];

// --- HELPER TO GET CHART TOOLTIP STYLE BASED ON THEME ---
const getTooltipStyle = (isDark) => ({
  backgroundColor: isDark ? '#1e293b' : '#ffffff',
  borderColor: isDark ? '#334155' : '#e2e8f0',
  color: isDark ? '#f8fafc' : '#0f172a',
  fontSize: 13,
  borderRadius: 12,
});

// --- SLIDE COMPONENTS ---

function Slide1({ isDark }) {
  return (
    <div className={`h-full relative overflow-y-auto md:overflow-hidden flex items-center justify-center p-4 md:p-6 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`} style={{ minHeight: 520 }}>
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80"
        alt="Solar panels on rooftop"
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${isDark ? 'opacity-40 mix-blend-luminosity' : 'opacity-100'}`}
      />
      <div className={`absolute inset-0 transition-all duration-300 ${isDark ? 'bg-slate-950/60' : 'bg-slate-900/30'}`} />

      {/* Content */}
      <div className={`relative z-10 backdrop-blur-md rounded-3xl p-6 md:p-8 border shadow-xl max-w-2xl w-full flex flex-col items-center text-center transition-all duration-300 ${isDark ? 'bg-slate-900/80 border-slate-700 shadow-black/50' : 'bg-white/90 border-slate-100'}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/20">
            <Sun className="text-white" size={20} />
          </div>
          <span
            className={`text-2xl md:text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            EcoTrade
          </span>
        </div>

        <p className={`font-bold uppercase tracking-widest text-xs md:text-sm mb-3 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
          Decentralized SaaS Virtual Power Plant
        </p>

        <h1
          className={`text-xl md:text-2xl font-black leading-snug mb-6 max-w-lg ${isDark ? 'text-white' : 'text-slate-800'}`}
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          Democratise clean solar access{" "}
          <span className={isDark ? 'text-emerald-400' : 'text-emerald-500'}>without owning panels.</span>
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {[
            {
              label: "Target Renewables by 2050",
              value: "70%",
              icon: <Sun size={16} />,
              accentDark: "text-emerald-400",
              accentLight: "text-emerald-600",
              bgDark: "bg-emerald-500/10 border-emerald-500/20",
              bgLight: "bg-emerald-50 border-emerald-100"
            },
            {
              label: "Current Fossil Reliance",
              value: "≈80%",
              icon: <AlertTriangle size={16} />,
              accentDark: "text-red-400",
              accentLight: "text-red-500",
              bgDark: "bg-red-500/10 border-red-500/20",
              bgLight: "bg-red-50 border-red-100"
            },
            {
              label: "Avg Solar Hardware Cost",
              value: "RM 15,000+",
              icon: <Home size={16} />,
              accentDark: "text-amber-400",
              accentLight: "text-amber-500",
              bgDark: "bg-amber-500/10 border-amber-500/20",
              bgLight: "bg-amber-50 border-amber-100"
            },
          ].map((s) => (
            <div
              key={s.label}
              className={`flex flex-col items-center gap-1.5 border rounded-2xl p-4 text-center shadow-sm transition-all duration-300 ${isDark ? s.bgDark : s.bgLight}`}
            >
              <span className={isDark ? s.accentDark : s.accentLight}>{s.icon}</span>
              <span className={`font-black text-2xl ${isDark ? s.accentDark : s.accentLight}`}>
                {s.value}
              </span>
              <span className={`text-xs md:text-sm font-medium leading-snug ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide2({ isDark }) {
  return (
    <div className={`h-full flex flex-col px-4 md:px-6 py-6 overflow-y-auto ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="mb-4">
        <span className={`text-xs md:text-sm font-bold uppercase tracking-widest ${isDark ? 'text-emerald-400' : 'text-emerald-500'}`}>
          Problem Statement
        </span>
        <h2
          className={`text-xl md:text-2xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-800'}`}
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          The Monopoly of the Roof
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {[
          {
            icon: <Home size={24} />,
            colorDark: "bg-red-500/10 border-red-500/20",
            colorLight: "bg-red-50 border-red-100",
            iconColorDark: "text-red-400",
            iconColorLight: "text-red-500",
            title: "Financial Barrier",
            body: "Solar generation is 53% cheaper than fossil fuels, but RM 15,000+ hardware costs restrict green energy to wealthy property owners.",
          },
          {
            icon: <Zap size={24} />,
            colorDark: "bg-amber-500/10 border-amber-500/20",
            colorLight: "bg-amber-50 border-amber-100",
            iconColorDark: "text-amber-400",
            iconColorLight: "text-amber-500",
            title: "Grid Instability & Waste",
            body: "Midday solar peaks without localized ESS trading lead to massive energy waste and voltage spikes on the national grid.",
          },
          {
            icon: <Globe size={24} />,
            colorDark: "bg-blue-500/10 border-blue-500/20",
            colorLight: "bg-blue-50 border-blue-100",
            iconColorDark: "text-blue-400",
            iconColorLight: "text-blue-500",
            title: "Fossil Dominance",
            body: "Despite massive solar potential, Malaysia remains 80% reliant on fossil fuels while electricity demand is projected to surge 20%.",
          },
          {
            icon: <Shield size={24} />,
            colorDark: "bg-purple-500/10 border-purple-500/20",
            colorLight: "bg-purple-50 border-purple-100",
            iconColorDark: "text-purple-400",
            iconColorLight: "text-purple-500",
            title: "Hardware-Locked Policy",
            body: "NEM 3.0 / SELCO require physical ownership. NEM NOVA compensates excess grid exports at low System Marginal Price (SMP).",
          },
        ].map((card) => (
          <div
            key={card.title}
            className={`border rounded-2xl p-4 ${isDark ? card.colorDark : card.colorLight}`}
          >
            <div className={`mb-2 ${isDark ? card.iconColorDark : card.iconColorLight}`}>{card.icon}</div>
            <div className={`font-black text-base md:text-lg mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              {card.title}
            </div>
            <div className={`text-xs md:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {card.body}
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 min-h-[200px] md:min-h-0">
        <div className={`text-xs md:text-sm font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
          Malaysia Grid Mix Trend & NETR Target (70% Renewables by 2050)
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={gridMixData} barCategoryGap="25%">
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#f1f5f9"} />
            <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#94a3b8" }} />
            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} unit="%" />
            <Tooltip
              formatter={(v) => `${v}%`}
              contentStyle={getTooltipStyle(isDark)}
              itemStyle={{ color: isDark ? '#f8fafc' : '#0f172a' }}
            />
            <Legend wrapperStyle={{ fontSize: 13, color: isDark ? '#f8fafc' : '#0f172a' }} />
            <Bar dataKey="fossil" name="Fossil Fuel %" fill={isDark ? "#ef4444" : "#fca5a5"} radius={[4, 4, 0, 0]} />
            <Bar dataKey="renewable" name="Renewable %" fill={isDark ? "#10b981" : "#6ee7b7"} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Slide3({ isDark }) {
  const sdgs = [
    {
      num: "7",
      color: "bg-yellow-500",
      title: "Affordable & Clean Energy",
      targets: ["Universal access to affordable energy"],
      contribution:
        "Lowers financial barrier to zero. Anyone with a smartphone can purchase clean energy directly from neighbors' ESS.",
      icon: <Sun size={26} className="text-slate-900" />,
    },
    {
      num: "12",
      color: "bg-emerald-500",
      title: "Responsible Consumption",
      targets: ["Sustainable management of resources"],
      contribution:
        "Reads smart meters to predict voltage spikes, routing midday excess into ESS for peak hour use, ensuring zero waste.",
      icon: <Leaf size={26} className="text-white" />,
    },
    {
      num: "13",
      color: "bg-blue-500",
      title: "Climate Action",
      targets: ["Integrate climate measures into policies"],
      contribution:
        "Built-in carbon engine translates trades into kg CO₂ offset, gamifying climate action to accelerate coal phase-out.",
      icon: <Globe size={26} className="text-white" />,
    },
  ];

  return (
    <div className={`h-full flex flex-col px-4 md:px-6 py-6 overflow-y-auto ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="mb-4">
        <span className={`text-xs md:text-sm font-bold uppercase tracking-widest ${isDark ? 'text-emerald-400' : 'text-emerald-500'}`}>
          SDG Alignment
        </span>
        <h2
          className={`text-xl md:text-2xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-800'}`}
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          Three Goals, One Platform
        </h2>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-2">
        {sdgs.map((sdg) => (
          <div
            key={sdg.num}
            className={`border rounded-3xl p-5 md:p-6 shadow-lg flex flex-col h-full ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}
          >
            <div className="flex flex-col gap-4 mb-4">
              <div className={`w-14 h-14 rounded-2xl ${sdg.color} flex items-center justify-center shadow-md shrink-0`}>
                {sdg.icon}
              </div>
              <div>
                <div className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">
                  SDG {sdg.num}
                </div>
                <div className={`font-black text-lg md:text-xl leading-snug ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {sdg.title}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 mt-2 flex-1">
              {sdg.targets.map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                  <span className={`text-sm md:text-base font-semibold leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {t}
                  </span>
                </div>
              ))}
            </div>

            <div className={`text-sm md:text-base p-4 rounded-2xl leading-relaxed border mt-4 ${isDark ? 'bg-slate-900/50 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-100 text-slate-600'}`}>
              {sdg.contribution}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide4({ isDark }) {
  const components = [
    {
      title: "Fractional P2P Dashboard",
      icon: <Users size={18} />,
      colorDark: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
      colorLight: "bg-emerald-50 border-emerald-200 text-emerald-800",
      desc: "Lowers entry barrier, allowing consumers to buy/sell clean energy without owning a physical solar system.",
    },
    {
      title: "AI Energy Routing & Pricing",
      icon: <Brain size={18} />,
      colorDark: "bg-purple-500/10 border-purple-500/20 text-purple-400",
      colorLight: "bg-purple-50 border-purple-200 text-purple-800",
      desc: "Analyzes Smart Meter TOU & voltage to dynamically decide whether to store, P2P sell, or export to TNB.",
    },
    {
      title: "ESS Management Engine",
      icon: <Battery size={18} />,
      colorDark: "bg-blue-500/10 border-blue-500/20 text-blue-400",
      colorLight: "bg-blue-50 border-blue-200 text-blue-800",
      desc: "Intelligently holds excess solar or cheap off-peak energy until it can be sold at a premium peak price.",
    },
    {
      title: "Carbon Impact Tracker",
      icon: <Leaf size={18} />,
      colorDark: "bg-green-500/10 border-green-500/20 text-green-400",
      colorLight: "bg-green-50 border-green-200 text-green-800",
      desc: "Translates traded energy into tangible metric tons of CO₂ equivalent reduced to track SDG progress.",
    },
  ];

  return (
    <div className={`h-full flex flex-col px-4 md:px-6 py-6 overflow-y-auto ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="mb-4">
        <span className={`text-xs md:text-sm font-bold uppercase tracking-widest ${isDark ? 'text-emerald-400' : 'text-emerald-500'}`}>
          Solution Architecture
        </span>
        <h2
          className={`text-xl md:text-2xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-800'}`}
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          Decentralized AI-Driven SaaS VPP
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {components.map((c, i) => (
          <div
            key={c.title}
            className={`border rounded-2xl p-4 flex flex-col gap-2 ${isDark ? c.colorDark : c.colorLight}`}
          >
            <div className="flex items-center gap-2 font-black text-sm md:text-base leading-tight">
              {c.icon}
              <span>{c.title}</span>
            </div>
            <div className={`text-xs md:text-sm opacity-90 leading-relaxed flex-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {c.desc}
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 min-h-[200px] md:min-h-0">
        <div className={`text-xs md:text-sm font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
          Solar Energy Flow — Local Capture vs Grid Export (kWh)
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={energyFlowData}>
            <defs>
              <linearGradient id="localGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gridGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#f1f5f9"} />
            <XAxis dataKey="hour" tick={{ fontSize: 12, fill: "#94a3b8" }} />
            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} unit="kWh" />
            <Tooltip contentStyle={getTooltipStyle(isDark)} />
            <Legend wrapperStyle={{ fontSize: 13, color: isDark ? '#f8fafc' : '#0f172a' }} />
            <Area
              type="monotone"
              dataKey="local"
              name="Local P2P Consumption"
              stroke="#10b981"
              fill="url(#localGrad)"
              strokeWidth={2.5}
            />
            <Area
              type="monotone"
              dataKey="grid"
              name="Grid Export (SMP)"
              stroke={isDark ? "#ef4444" : "#f87171"}
              fill="url(#gridGrad)"
              strokeWidth={2}
              strokeDasharray="5 3"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Slide5({ isDark }) {
  const goals = [
    {
      title: "Goal 1: Financial Returns",
      desc: "Maximize returns over traditional TNB NEM rates.",
      colorDark: "bg-emerald-950/30 border-emerald-900/50",
      colorLight: "bg-emerald-50 border-emerald-200",
      titleColorDark: "text-emerald-400",
      titleColorLight: "text-emerald-800",
      metrics: [
        { label: "Yield Improvement", value: "↑ % vs NEM", icon: <TrendingUp size={16}/> },
        { label: "Execution Latency", value: "< 200ms", icon: <Zap size={16}/> },
      ]
    },
    {
      title: "Goal 2: Grid Efficiency",
      desc: "Optimize Time-of-Use & local ESS storage utilization.",
      colorDark: "bg-blue-950/30 border-blue-900/50",
      colorLight: "bg-blue-50 border-blue-200",
      titleColorDark: "text-blue-400",
      titleColorLight: "text-blue-800",
      metrics: [
        { label: "ESS Utilization", value: "Max Midday", icon: <Battery size={16}/> },
        { label: "Data Accuracy", value: "99.9%", icon: <Activity size={16}/> },
      ]
    },
    {
      title: "Goal 3: Climate Action",
      desc: "Measurable decarbonization & Go Green user growth.",
      colorDark: "bg-purple-950/30 border-purple-900/50",
      colorLight: "bg-purple-50 border-purple-200",
      titleColorDark: "text-purple-400",
      titleColorLight: "text-purple-800",
      metrics: [
        { label: "GHG Avoided", value: "mt CO₂e/mo", icon: <Leaf size={16}/> },
        { label: "User Growth", value: "Active +% MoM", icon: <Users size={16}/> },
      ]
    }
  ];

  return (
    <div className={`h-full flex flex-col px-4 md:px-6 py-6 overflow-y-auto ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="mb-4">
        <span className={`text-xs md:text-sm font-bold uppercase tracking-widest ${isDark ? 'text-emerald-400' : 'text-emerald-500'}`}>
          Measurable Goals & Success Metrics
        </span>
        <h2
          className={`text-xl md:text-2xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-800'}`}
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          Evaluating the "Go Green" Ecosystem
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {goals.map((g) => (
          <div key={g.title} className={`border rounded-2xl p-4 flex flex-col gap-3 shadow-sm ${isDark ? g.colorDark : g.colorLight}`}>
            <div>
              <div className={`font-black text-base md:text-lg ${isDark ? g.titleColorDark : g.titleColorLight}`}>{g.title}</div>
              <div className={`text-xs md:text-sm mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{g.desc}</div>
            </div>
            <div className="flex flex-col gap-2 mt-auto">
              {g.metrics.map(m => (
                <div key={m.label} className={`border rounded-xl p-3 shadow-sm flex items-center justify-between ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-100'}`}>
                  <div className={`flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {m.icon}
                    <span className="text-xs md:text-sm font-semibold">{m.label}</span>
                  </div>
                  <span className={`font-black text-xs md:text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 min-h-[200px] md:min-h-0">
        <div className={`text-xs md:text-sm font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
          Goal 1 Indicator: Baseline NEM/SMP vs EcoTrade P2P (RM/month)
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={prosumerROIData}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#f1f5f9"} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} />
            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} unit="RM" />
            <Tooltip contentStyle={getTooltipStyle(isDark)} />
            <Legend wrapperStyle={{ fontSize: 13, color: isDark ? '#f8fafc' : '#0f172a' }} />
            <Line
              type="monotone"
              dataKey="baseline"
              name="Baseline NEM/SMP"
              stroke="#94a3b8"
              strokeWidth={2}
              strokeDasharray="5 3"
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="ecotrade"
              name="EcoTrade P2P"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 5, fill: "#10b981" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Slide6({ isDark }) {
  const stack = [
    {
      layer: "Frontend",
      tech: "Flutter (Dart) + Riverpod",
      desc: "Cross-platform mobile, fintech UI with real-time state management.",
      icon: <Smartphone size={18} />,
      colorDark: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
      colorLight: "bg-cyan-100 border-cyan-200 text-cyan-900",
    },
    {
      layer: "Backend",
      tech: "Firebase Cloud Functions",
      desc: "Serverless triggers: monitorTelemetry, maintenanceAdvisor, carbonExplainer.",
      icon: <Settings size={18} />,
      colorDark: "bg-orange-500/10 border-orange-500/20 text-orange-400",
      colorLight: "bg-orange-100 border-orange-200 text-orange-900",
    },
    {
      layer: "Database",
      tech: "Cloud Firestore",
      desc: "Real-time NoSQL ledger for portfolios, telemetry, and trade signals.",
      icon: <Database size={18} />,
      colorDark: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
      colorLight: "bg-yellow-100 border-yellow-200 text-yellow-900",
    },
    {
      layer: "AI Engine",
      tech: "Gemini API (gemma-3-27b-it)",
      desc: "Powers the Robo-Advisor auto-trader and natural-language carbon explainer.",
      icon: <Brain size={18} />,
      colorDark: "bg-purple-500/10 border-purple-500/20 text-purple-400",
      colorLight: "bg-purple-100 border-purple-200 text-purple-900",
    },
    {
      layer: "Simulator",
      tech: "Node.js IoT Simulator",
      desc: "Physics engine for solar generation, ESS capacity, and TOU pricing.",
      icon: <Zap size={18} />,
      colorDark: "bg-green-500/10 border-green-500/20 text-green-400",
      colorLight: "bg-green-100 border-green-200 text-green-900",
    },
    {
      layer: "Scaling",
      tech: "Cloud Run + Vertex AI",
      desc: "Stateless AI for production, cross-border multi-region architecture.",
      icon: <Cloud size={18} />,
      colorDark: "bg-blue-500/10 border-blue-500/20 text-blue-400",
      colorLight: "bg-blue-100 border-blue-200 text-blue-900",
    },
  ];

  return (
    <div className={`h-full flex flex-col px-4 md:px-6 py-6 overflow-y-auto ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="mb-5">
        <span className={`text-xs md:text-sm font-bold uppercase tracking-widest ${isDark ? 'text-emerald-400' : 'text-emerald-500'}`}>
          Technical Architecture & Tech Stack
        </span>
        <h2
          className={`text-xl md:text-2xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-800'}`}
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          Real-Time Market Clearing & AI Automation
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {stack.map((s) => (
          <div
            key={s.layer}
            className={`border rounded-2xl p-4 md:p-5 flex flex-col gap-2 ${isDark ? s.colorDark : s.colorLight}`}
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              {s.icon}
              <span className="uppercase tracking-wider opacity-70">
                {s.layer}
              </span>
            </div>
            <div className={`font-black text-base md:text-lg ${isDark ? 'text-white' : ''}`}>{s.tech}</div>
            <div className={`text-xs md:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-800 opacity-80'}`}>{s.desc}</div>
          </div>
        ))}
      </div>

      <div className={`rounded-2xl border p-4 md:p-5 mt-auto ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
        <div className={`text-xs md:text-sm font-bold uppercase tracking-widest mb-3 ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
          Data & AI Flow
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {[
            "IoT Simulator",
            "→",
            "Firestore Telemetry",
            "→",
            "Cloud Functions",
            "→",
            "Gemini (gemma-3-27b-it)",
            "→",
            "Trade Signal",
            "→",
            "Flutter App",
          ].map((item, i) =>
            item === "→" ? (
              <ArrowRight key={i} size={16} className={isDark ? 'text-slate-500' : 'text-slate-300'} />
            ) : (
              <span
                key={i}
                className={`border rounded-xl px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-semibold shadow-sm ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-200 text-slate-700'}`}
              >
                {item}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function Slide7({ isDark }) {
  const challenges = [
    {
      challenge: "AI Hallucinations in Execution",
      detail:
        "AI occasionally attempted impossible trades (selling empty battery).",
      solution:
        "Multi-layer guard: JSON validation rejects invalid bounds, and a critical battery override forces grid purchases < 20 kWh.",
      icon: <Brain size={18} />,
    },
    {
      challenge: "Duplicate Alert Flooding",
      detail:
        "Telemetry spikes triggered identical safety alerts multiple times per second.",
      solution:
        "Deduplication flags gate alerts to once per event, resetting only when the hardware anomaly clears.",
      icon: <Zap size={18} />,
    },
    {
      challenge: "Simulator-Frontend Battery Sync",
      detail:
        "Manual UI trades caused the Flutter app and Node.js simulator to desync.",
      solution:
        "pendingBatteryDelta field added to Firestore; simulator reads, applies, and resets it per tick for eventual consistency.",
      icon: <Battery size={18} />,
    },
  ];

  const actionCards = [
    { label: "SELL", bg: "bg-emerald-500", text: "text-white", desc: "Sell surplus" },
    { label: "BUY", bg: "bg-red-500", text: "text-white", desc: "Buy energy" },
    { label: "ALERT", bg: "bg-amber-400", text: "text-white", desc: "Safety warning" },
    { label: "MARKET", bg: "bg-blue-500", text: "text-white", desc: "Price update" },
  ];

  return (
    <div className={`h-full flex flex-col px-4 md:px-6 py-6 overflow-y-auto ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="mb-4">
        <span className={`text-xs md:text-sm font-bold uppercase tracking-widest ${isDark ? 'text-emerald-400' : 'text-emerald-500'}`}>
          User Feedback & Iteration
        </span>
        <h2
          className={`text-xl md:text-2xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-800'}`}
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          50 Malaysian Users, 84% Aged 35+
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div className={`border rounded-2xl p-4 md:p-5 ${isDark ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Home size={18} />
              <span className={`font-black text-xl md:text-2xl ${isDark ? 'text-emerald-300' : ''}`}>80%</span>
            </div>
            <div className={`font-bold text-sm md:text-base mb-1 ${isDark ? 'text-white' : ''}`}>Fintech-First Dashboard</div>
            <div className={`flex items-start gap-2 text-xs md:text-sm opacity-90 ${isDark ? 'text-slate-300' : ''}`}>
              <CheckCircle size={14} className="mt-1 shrink-0" />
              <span>Users ignored hardware stats. Redesigned to lead with wallet balance & AI Risk Profile (Conservative/Aggressive).</span>
            </div>
        </div>

        <div className={`border rounded-2xl p-4 md:p-5 ${isDark ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-purple-50 border-purple-200 text-purple-700'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Brain size={18} />
              <span className={`font-black text-xl md:text-2xl ${isDark ? 'text-purple-300' : ''}`}>65%</span>
            </div>
            <div className={`font-bold text-sm md:text-base mb-1 ${isDark ? 'text-white' : ''}`}>Eliminating Autopilot Anxiety</div>
            <div className={`flex items-start gap-2 text-xs md:text-sm opacity-90 ${isDark ? 'text-slate-300' : ''}`}>
              <CheckCircle size={14} className="mt-1 shrink-0" />
              <span>Regex tense sanitization converts past-tense AI statements into conditional recommendations in manual mode.</span>
            </div>
        </div>

        <div className={`border rounded-2xl p-4 md:p-5 col-span-1 md:col-span-2 ${isDark ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={18} />
              <span className={`font-black text-xl md:text-2xl ${isDark ? 'text-amber-300' : ''}`}>72%</span>
            </div>
            <div className={`font-bold text-sm md:text-base mb-1 ${isDark ? 'text-white' : ''}`}>Human-Readable Alert Differentiation</div>
            <div className={`flex items-start gap-2 text-xs md:text-sm opacity-90 mb-4 ${isDark ? 'text-slate-300' : ''}`}>
              <CheckCircle size={14} className="mt-1 shrink-0" />
              <span>Raw voltage warnings confused users. Dynamic color-coding instantly separates system safety from market opportunities:</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {actionCards.map((c) => (
                <div key={c.label} className={`flex items-center gap-3 border rounded-xl p-3 shadow-sm ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-amber-100'}`}>
                  <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center shrink-0`}>
                    <span className={`text-[9px] font-black tracking-wide ${c.text}`}>{c.label}</span>
                  </div>
                  <span className={`text-xs md:text-sm font-semibold leading-snug ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{c.desc}</span>
                </div>
              ))}
            </div>
        </div>
      </div>

      <div>
        <div className={`text-sm md:text-base font-black uppercase tracking-widest mb-3 ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
          Technical Challenges → Solutions
        </div>
        <div className="flex flex-col gap-3">
          {challenges.map((c) => (
            <div key={c.challenge} className={`border rounded-2xl p-4 flex flex-col md:flex-row md:items-start gap-4 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-slate-400">{c.icon}</span>
                  <span className={`font-bold text-sm md:text-base ${isDark ? 'text-white' : 'text-slate-800'}`}>{c.challenge}</span>
                </div>
                <div className={`text-xs md:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{c.detail}</div>
              </div>
              <ArrowRight size={20} className="hidden md:block text-emerald-500 shrink-0 mt-3" />
              <div className={`flex-1 min-w-0 border rounded-xl p-3 mt-2 md:mt-0 ${isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-100'}`}>
                <div className={`text-xs md:text-sm font-bold mb-1 ${isDark ? 'text-emerald-400' : 'text-emerald-800'}`}>Solution</div>
                <div className={`text-xs md:text-sm leading-relaxed ${isDark ? 'text-emerald-200' : 'text-emerald-900'}`}>{c.solution}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide8({ isDark }) {
  const phases = [
    {
      phase: "Phase 1",
      title: "Validation & Hardware Migration",
      items: [
        "TNB and Energy Commission Regulatory Sandbox testing.",
        "Replace Node.js simulator with real field IoT gateways.",
      ],
      colorDark: "border-l-emerald-400",
      colorLight: "border-l-emerald-400",
    },
    {
      phase: "Phase 2",
      title: "Multi-User Scaling & Hardware Partners",
      items: [
        "Partner with ESS hardware providers for API integration.",
        "Implement Firebase Auth and Firestore Security Rules.",
      ],
      colorDark: "border-l-blue-400",
      colorLight: "border-l-blue-400",
    },
    {
      phase: "Phase 3",
      title: "Production AI & P2P Order Book",
      items: [
        "Migrate Gemini Robo-Advisor to stateless Cloud Run.",
        "Proximity-based order book matching via Google Maps API.",
      ],
      colorDark: "border-l-purple-400",
      colorLight: "border-l-purple-400",
    },
    {
      phase: "Phase 4",
      title: "International Market Entry",
      items: [
        "Deploy in countries lacking Feed-in Tariff (FiT) incentives.",
        "Parameterize TOU pricing engine for rapid localized scaling.",
      ],
      colorDark: "border-l-amber-400",
      colorLight: "border-l-amber-400",
    },
    {
      phase: "Phase 5",
      title: "ASEAN Regional Interconnection",
      items: [
        "Scale across the ASEAN Power Grid (APG) for cross-border trades.",
        "Establish EcoTrade as the default micro-energy trading infrastructure.",
      ],
      colorDark: "border-l-red-400",
      colorLight: "border-l-red-400",
    },
  ];

  return (
    <div className={`h-full flex flex-col px-4 md:px-6 py-6 overflow-y-auto ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="mb-6 text-center">
        <span className={`text-xs md:text-sm font-bold uppercase tracking-widest ${isDark ? 'text-emerald-400' : 'text-emerald-500'}`}>
          Future Roadmap
        </span>
        <h2
          className={`text-xl md:text-2xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-800'}`}
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          From Validation to ASEAN Scale
        </h2>
      </div>

      <div className="flex flex-col gap-3 flex-1 justify-center max-w-3xl mx-auto w-full mb-4">
        {phases.map((p) => (
          <div
            key={p.phase}
            className={`border border-l-4 rounded-2xl p-4 md:p-5 shadow-sm flex flex-col md:flex-row md:items-center gap-3 md:gap-6 ${isDark ? `${p.colorDark} bg-slate-800 border-slate-700` : `${p.colorLight} bg-white border-slate-100`}`}
          >
            <div className="shrink-0 md:text-center md:w-20">
              <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">
                Phase
              </div>
              <div className={`font-black text-xl md:text-3xl mt-0.5 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                {p.phase.replace("Phase ", "")}
              </div>
            </div>
            
            <div className="flex-1">
              <div className={`font-black text-base md:text-lg mb-1.5 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                {p.title}
              </div>
              <div className="flex flex-col gap-1.5">
                {p.items.map((item) => (
                  <div
                    key={item}
                    className={`flex items-start gap-2 text-xs md:text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
                  >
                    <CheckCircle
                      size={14}
                      className="text-emerald-500 shrink-0 mt-0.5"
                    />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const SLIDES = [
  { id: 1, title: "Overview", shortTitle: "Intro", component: Slide1 },
  { id: 2, title: "Problem Statement", shortTitle: "Problem", component: Slide2 },
  { id: 3, title: "SDG Alignment", shortTitle: "SDGs", component: Slide3 },
  { id: 4, title: "Solution Architecture", shortTitle: "Solution", component: Slide4 },
  { id: 5, title: "Measurable Goals", shortTitle: "Goals", component: Slide5 },
  { id: 6, title: "Tech Stack", shortTitle: "Tech", component: Slide6 },
  { id: 7, title: "User Testing", shortTitle: "Testing", component: Slide7 },
  { id: 8, title: "Roadmap", shortTitle: "Roadmap", component: Slide8 },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const goTo = (idx) => {
    if (idx === current || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 180);
  };

  const prev = () => goTo(Math.max(0, current - 1));
  const next = () => goTo(Math.min(SLIDES.length - 1, current + 1));

  const SlideComponent = SLIDES[current].component;

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-2 md:p-4 transition-colors duration-300 ${isDark ? 'bg-slate-950' : 'bg-gradient-to-br from-slate-50 via-white to-emerald-50'}`}
      style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
    >
      <div className="w-full max-w-5xl h-[95vh] md:h-auto flex flex-col md:block">
        
        {/* Top Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/20">
              <Sun size={16} className="text-white" />
            </div>
            <span className={`font-black text-sm tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
              EcoTrade
            </span>
          </div>
          
          <div className="flex items-center gap-3 md:gap-4">
            <div className={`text-xs md:text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {current + 1} / {SLIDES.length} <span className="hidden md:inline">— {SLIDES[current].title}</span>
            </div>
            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-xl transition-all duration-200 shadow-sm ${isDark ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              title="Toggle Theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-1.5 mb-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className={`flex-1 rounded-full h-1.5 transition-all duration-300 ${
                i === current
                  ? "bg-emerald-500"
                  : i < current
                  ? (isDark ? "bg-emerald-900" : "bg-emerald-200")
                  : (isDark ? "bg-slate-800" : "bg-slate-200")
              }`}
            />
          ))}
        </div>

        {/* Slide Labels */}
        <div className="flex flex-wrap md:flex-nowrap gap-1 mb-3">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className={`flex-1 text-center text-[10px] md:text-[11px] font-semibold py-1 md:py-1.5 px-1 rounded-lg transition-all duration-200 ${
                i === current
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                  : (isDark ? "text-slate-500 hover:text-slate-300 hover:bg-slate-800" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100")
              }`}
            >
              {s.shortTitle}
            </button>
          ))}
        </div>

        {/* Main Slide Card */}
        <div
          className={`flex-1 md:flex-none rounded-3xl shadow-xl overflow-hidden transition-all duration-200 ${
            isDark ? 'bg-slate-900 border border-slate-700 shadow-black/40' : 'bg-white border border-slate-100 shadow-slate-200/60'
          } ${animating ? "opacity-0 scale-98" : "opacity-100 scale-100"}`}
          style={{ minHeight: 'auto', md: { minHeight: 520 } }}
        >
          <SlideComponent isDark={isDark} />
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between mt-4 pb-2 md:pb-0">
          <button
            onClick={prev}
            disabled={current === 0}
            className={`flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-2xl font-semibold text-xs md:text-sm transition-all duration-200 ${
              current === 0
                ? (isDark ? "text-slate-700 cursor-not-allowed" : "text-slate-300 cursor-not-allowed")
                : (isDark ? "text-slate-300 hover:bg-slate-800 hover:text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-800")
            }`}
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex gap-1.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  i === current
                    ? "bg-emerald-500 w-6"
                    : (isDark ? "bg-slate-700 hover:bg-slate-600" : "bg-slate-200 hover:bg-slate-300")
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={current === SLIDES.length - 1}
            className={`flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-2xl font-semibold text-xs md:text-sm transition-all duration-200 ${
              current === SLIDES.length - 1
                ? (isDark ? "text-slate-700 cursor-not-allowed" : "text-slate-300 cursor-not-allowed")
                : "bg-emerald-500 text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600"
            }`}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}