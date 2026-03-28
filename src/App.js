import React, { useState } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  AreaChart,
  Area,
  LineChart,
  Line,
  Cell
} from "recharts";
import {
  Sun,
  Moon,
  Zap,
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
  Factory,        
  ShieldCheck,    
  AlertOctagon,   
  FileText,
  Activity
} from "lucide-react";

// --- CHART DATA ---
const capacityMixData = [
  { year: '2025', total: 46, PV: 12, Hydro: 14, Bioenergy: 1, Oil: 3, Gas: 42, Coal: 29 },
  { year: '2030', total: 49, PV: 14, Hydro: 16, Bioenergy: 1, Oil: 2, Gas: 43, Coal: 23 },
  { year: '2035', total: 56, PV: 25, Hydro: 15, Bioenergy: 1, Oil: 2, Gas: 46, Coal: 11 },
  { year: '2040', total: 68, PV: 39, Hydro: 12, Bioenergy: 1, Oil: 2, Gas: 38, Coal: 9 },
  { year: '2045', total: 82, PV: 52, Hydro: 11, Bioenergy: 1, Oil: 0, Gas: 36, Coal: 1 },
  { year: '2050', total: 97, PV: 58, Hydro: 11, Bioenergy: 1, Oil: 0, Gas: 29, Coal: 0 },
];

const electricityShareData = [
  { source: 'Coal', value: 43.05, fill: '#955b5f' },
  { source: 'Gas', value: 36.68, fill: '#7c659e' },
  { source: 'Hydropower', value: 16.86, fill: '#5c84c1' },
  { source: 'Solar', value: 2.08, fill: '#c67667' },
  { source: 'Bioenergy', value: 0.74, fill: '#a68c63' },
  { source: 'Oil', value: 0.60, fill: '#ca7584' },
  { source: 'Nuclear', value: 0.00, fill: '#cccccc' },
  { source: 'Wind', value: 0.00, fill: '#cccccc' },
];

// --- ALL 40 ROWS FOR CSV DATA (All Columns Included) ---
const userFeedbackData = [
  { id: "U001", time: "2/26 09:14", age: "25-34", solar: "no", trustAi: "no", useP2P: "definitely", feature: "price_forecast", concern: "ai_making_bad_trades", battery: "no", premium: "yes", vsGrid: "cheaper", rating: "4", comment: "like the charts but would only use manual mode first" },
  { id: "U002", time: "2/26 11:47", age: "35-44", solar: "yes", trustAi: "no", useP2P: "definitely", feature: "carbon_tracking", concern: "a_selling_too_low", battery: "yes", premium: "yes", vsGrid: "about_same", rating: "5", comment: "finally a way to sell my excess solar without waiting for tnb" },
  { id: "U003", time: "2/26 14:22", age: "18-24", solar: "no", trustAi: "no", useP2P: "maybe", feature: "ai_suggestions", concern: "privacy", battery: "no", premium: "no", vsGrid: "cheaper", rating: "3", comment: "idk looks cool i guess" },
  { id: "U004", time: "2/26 18:35", age: "25-44", solar: "yes", trustAi: "no", useP2P: "definitely", feature: "battery_monitoring", concern: "hacking_risk", battery: "yes", premium: "no", vsGrid: "same", rating: "5", comment: "been waiting for this since tnb rates went up last year" },
  { id: "U005", time: "2/27 08:12", age: "18-24", solar: "no", trustAi: "no", useP2P: "maybe", feature: "dashboard", concern: "trust", battery: "no", premium: "no", vsGrid: "cheaper", rating: "3", comment: "interesting but not sure if i trust the ai with my money lol" },
  { id: "U006", time: "2/27 10:58", age: "35-44", solar: "no", trustAi: "maybe", useP2P: "maybe", feature: "ai_autopilot", concern: "battery_damage", battery: "no", premium: "yes", vsGrid: "cheaper", rating: "4", comment: "good concept need to see real results before switching" },
  { id: "U007", time: "2/27 13:41", age: "25-34", solar: "yes", trustAi: "no", useP2P: "definitely", feature: "live_trading_signals", concern: "price_risk", battery: "yes", premium: "no", vsGrid: "same", rating: "5", comment: "love that i can see the ai reasoning behind each trade" },
  { id: "U008", time: "2/27 15:19", age: "55+", solar: "no", trustAi: "no", useP2P: "no", feature: "forecasting", concern: "too_complicated", battery: "no", premium: "no", vsGrid: "cheaper", rating: "2", comment: "too many numbers for me maybe simplify it" },
  { id: "U009", time: "2/27 17:54", age: "18-24", solar: "yes", trustAi: "no", useP2P: "maybe", feature: "carbon_tracker", concern: "profit_loss", battery: "yes", premium: "yes", vsGrid: "cheaper", rating: "4", comment: "showing my carbon offset to friends is a nice touch" },
  { id: "U010", time: "2/28 09:07", age: "25-34", solar: "no", trustAi: "no", useP2P: "definitely", feature: "earn_from_solar", concern: "not_applicable", battery: "no", premium: "yes", vsGrid: "cheaper", rating: "4", comment: "i dont have panels but i like buying from neighbors who do" },
  { id: "U011", time: "2/28 11:23", age: "45-54", solar: "yes", trustAi: "maybe", useP2P: "maybe", feature: "price_alerts", concern: "battery_warranty", battery: "yes", premium: "no", vsGrid: "same", rating: "3", comment: "worried about battery cycles if ai trades too often" },
  { id: "U012", time: "2/28 14:45", age: "18-24", solar: "no", trustAi: "no", useP2P: "maybe", feature: "peer_trading", concern: "not_interested", battery: "no", premium: "no", vsGrid: "cheaper", rating: "3", comment: "if my friends use it maybe i will too" },
  { id: "U013", time: "2/28 16:12", age: "25-34", solar: "yes", trustAi: "no", useP2P: "definitely", feature: "autopilot", concern: "profit_guarantee", battery: "yes", premium: "yes", vsGrid: "cheaper", rating: "5", comment: "just let it run and check weekly thats what i want" },
  { id: "U014", time: "2/28 18:08", age: "35-44", solar: "no", trustAi: "no", useP2P: "no", feature: "none", concern: "ai_black_box", battery: "no", premium: "no", vsGrid: "cheaper", rating: "2", comment: "how do i know the ai isnt just guessing" },
  { id: "U015", time: "2/28 20:33", age: "25-34", solar: "yes", trustAi: "no", useP2P: "maybe", feature: "marketplace", concern: "p2p_fraud", battery: "yes", premium: "no", vsGrid: "same", rating: "4", comment: "need proper escrow or something so people dont get scammed" },
  { id: "U016", time: "3/1 10:22", age: "18-24", solar: "no", trustAi: "yes", useP2P: "definitely", feature: "easy_ui", concern: "price_too_high", battery: "no", premium: "yes", vsGrid: "cheaper", rating: "4", comment: "looks clean and modern better than tnb app" },
  { id: "U017", time: "3/1 12:57", age: "25-34", solar: "yes", trustAi: "no", useP2P: "definitely", feature: "energy_dashboard", concern: "data_security", battery: "yes", premium: "no", vsGrid: "same", rating: "5", comment: "please add dark mode oh wait its already dark mode nice" },
  { id: "U018", time: "3/1 15:14", age: "35-44", solar: "no", trustAi: "no", useP2P: "no", feature: "none", concern: "too_risky", battery: "no", premium: "no", vsGrid: "no", rating: "2", comment: "not putting my money into some ai thing i dont understand" },
  { id: "U019", time: "3/1 17:38", age: "25-34", solar: "yes", trustAi: "yes", useP2P: "definitely", feature: "profit_tracking", concern: "not_applicable", battery: "yes", premium: "yes", vsGrid: "cheaper", rating: "4", comment: "wish there was a widget for quick balance check" },
  { id: "U020", time: "3/1 19:51", age: "18-24", solar: "no", trustAi: "no", useP2P: "definitely", feature: "price_comparison", concern: "budget", battery: "no", premium: "yes", vsGrid: "cheaper", rating: "3", comment: "just show me the cheapest option and ill buy it" },
  { id: "U021", time: "3/2 08:16", age: "45-54", solar: "yes", trustAi: "maybe", useP2P: "maybe", feature: "carbon_impact", concern: "battery_capacity", battery: "yes", premium: "no", vsGrid: "same", rating: "3", comment: "my battery is small hope the ai takes that into account" },
  { id: "U022", time: "3/2 10:43", age: "25-34", solar: "no", trustAi: "no", useP2P: "maybe", feature: "trade_history", concern: "confirmation_ui", battery: "no", premium: "yes", vsGrid: "cheaper", rating: "4", comment: "add a double check before executing trades please" },
  { id: "U023", time: "3/2 15:58", age: "18-24", solar: "no", trustAi: "maybe", useP2P: "maybe", feature: "community", concern: "peer_trust", battery: "no", premium: "yes", vsGrid: "cheaper", rating: "3", comment: "feels like a game interesting" },
  { id: "U024", time: "3/2 18:14", age: "25-34", solar: "yes", trustAi: "yes", useP2P: "definitely", feature: "everything", concern: "none", battery: "yes", premium: "yes", vsGrid: "cheaper", rating: "5", comment: "shut up and take my money already" },
  { id: "U025", time: "3/3 09:31", age: "55+", solar: "no", trustAi: "no", useP2P: "no", feature: "none", concern: "trust", battery: "no", premium: "no", vsGrid: "no", rating: "1", comment: "i dont trust computers with my electricity" },
  { id: "U026", time: "3/3 11:47", age: "35-44", solar: "yes", trustAi: "maybe", useP2P: "maybe", feature: "forecast_chart", concern: "volatility", battery: "yes", premium: "no", vsGrid: "same", rating: "4", comment: "showing regime status was a smart addition" },
  { id: "U027", time: "3/3 14:22", age: "25-34", solar: "no", trustAi: "no", useP2P: "maybe", feature: "ui", concern: "ease_of_use", battery: "no", premium: "yes", vsGrid: "cheaper", rating: "4", comment: "just make it simple" },
  { id: "U028", time: "3/3 16:05", age: "18-24", solar: "yes", trustAi: "no", useP2P: "definitely", feature: "sell_orders", concern: "market_timing", battery: "yes", premium: "yes", vsGrid: "cheaper", rating: "4", comment: "selling my extra power at night is genius" },
  { id: "U029", time: "3/3 18:39", age: "45-54", solar: "no", trustAi: "maybe", useP2P: "maybe", feature: "tax_reports", concern: "not_sure", battery: "no", premium: "yes", vsGrid: "cheaper", rating: "3", comment: "can i export my transactions for tax purposes" },
  { id: "U030", time: "3/4 09:14", age: "25-34", solar: "yes", trustAi: "yes", useP2P: "definitely", feature: "battery_health", concern: "overcharging", battery: "yes", premium: "no", vsGrid: "same", rating: "4", comment: "hope the ai knows when to stop charging" },
  { id: "U031", time: "3/4 11:52", age: "35-44", solar: "no", trustAi: "no", useP2P: "definitely", feature: "price_history", concern: "ai_biased", battery: "no", premium: "yes", vsGrid: "cheaper", rating: "3", comment: "what if the ai learns wrong patterns" },
  { id: "U032", time: "2/26 19:28", age: "25-34", solar: "yes", trustAi: "no", useP2P: "definitely", feature: "carbon_offset", concern: "p2p_matching", battery: "yes", premium: "yes", vsGrid: "cheaper", rating: "4", comment: "i trust the numbers not the ai" },
  { id: "U033", time: "3/1 20:15", age: "35-44", solar: "no", trustAi: "no", useP2P: "no", feature: "none", concern: "data_privacy", battery: "no", premium: "no", vsGrid: "no", rating: "2", comment: "worried my usage data gets sold" },
  { id: "U034", time: "3/3 20:07", age: "18-24", solar: "yes", trustAi: "maybe", useP2P: "maybe", feature: "profit_display", concern: "none", battery: "yes", premium: "yes", vsGrid: "cheaper", rating: "4", comment: "just want to see how much i earn daily" },
  { id: "U035", time: "3/4 14:33", age: "25-34", solar: "no", trustAi: "maybe", useP2P: "maybe", feature: "marketplace", concern: "too_new", battery: "no", premium: "yes", vsGrid: "cheaper", rating: "3", comment: "i want to use it but need more testimonials first" },
  { id: "U036", time: "2/27 20:44", age: "45-54", solar: "yes", trustAi: "no", useP2P: "yes", feature: "energy_dashboard", concern: "battery_degradation", battery: "yes", premium: "no", vsGrid: "same", rating: "3", comment: "great ui but worried about long term battery health" },
  { id: "U037", time: "2/28 21:12", age: "25-34", solar: "no", trustAi: "no", useP2P: "maybe", feature: "carbon_tracker", concern: "complexity", battery: "no", premium: "yes", vsGrid: "cheaper", rating: "3", comment: "too many features for me" },
  { id: "U038", time: "3/2 20:55", age: "35-44", solar: "yes", trustAi: "no", useP2P: "definitely", feature: "price_forecast", concern: "grid_outage", battery: "yes", premium: "no", vsGrid: "same", rating: "4", comment: "if grid goes down can we still trade p2p" },
  { id: "U039", time: "3/4 19:47", age: "18-24", solar: "no", trustAi: "no", useP2P: "yes", feature: "easy_ui", concern: "ai_misleading", battery: "no", premium: "yes", vsGrid: "cheaper", rating: "4", comment: "fun to use but need clearer explanations" },
  { id: "U040", time: "3/1 21:33", age: "55+", solar: "no", trustAi: "no", useP2P: "no", feature: "none", concern: "complicated_interface", battery: "no", premium: "no", vsGrid: "no", rating: "1", comment: "too much going on for old people like me" }
];


// --- MAIN SLIDE COMPONENTS ---

function Slide1({ isDark }) {
  return (
    <div className={`h-full relative overflow-y-auto md:overflow-hidden flex items-center justify-center p-4 md:p-6 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <img
        src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80"
        alt="Solar panels"
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${isDark ? 'opacity-40 mix-blend-luminosity' : 'opacity-100'}`}
      />
      <div className={`absolute inset-0 transition-all duration-300 ${isDark ? 'bg-slate-950/60' : 'bg-slate-900/30'}`} />

      <div className={`relative z-10 backdrop-blur-md rounded-3xl p-6 md:p-10 border shadow-xl max-w-3xl w-full flex flex-col items-center text-center transition-all duration-300 ${isDark ? 'bg-slate-900/80 border-slate-700 shadow-black/50' : 'bg-white/90 border-slate-100'}`}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/20">
            <Sun className="text-white" size={24} />
          </div>
          <span className={`text-3xl md:text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`} style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
            EcoTrade
          </span>
        </div>

        <p className={`font-bold uppercase tracking-widest text-sm md:text-base mb-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
          Decentralized SaaS Virtual Power Plant
        </p>

        <h1 className={`text-2xl md:text-3xl font-black leading-snug mb-8 max-w-xl ${isDark ? 'text-white' : 'text-slate-800'}`} style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
          Democratise clean solar access <span className={isDark ? 'text-emerald-400' : 'text-emerald-500'}>without owning panels.</span>
        </h1>

        <div className="flex flex-col md:flex-row gap-3 w-full max-w-2xl mt-2">
          {[
            { num: "7", title: "Affordable & Clean Energy", icon: <Sun size={18} />, color: "bg-yellow-500", text: "text-yellow-500" },
            { num: "12", title: "Responsible Consumption", icon: <Leaf size={18} />, color: "bg-emerald-500", text: "text-emerald-500" },
            { num: "13", title: "Climate Action", icon: <Globe size={18} />, color: "bg-blue-500", text: "text-blue-500" },
          ].map((sdg) => (
            <div key={sdg.num} className={`flex-1 flex items-center gap-3 border rounded-xl p-3 shadow-sm transition-all duration-300 ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white/90 border-slate-200'}`}>
              <div className={`w-8 h-8 rounded-lg ${sdg.color} flex items-center justify-center shrink-0 shadow-sm`}>
                 <span className="text-white">{sdg.icon}</span>
              </div>
              <div className="flex flex-col text-left">
                <span className={`text-[10px] font-black uppercase tracking-widest ${sdg.text}`}>SDG {sdg.num}</span>
                <span className={`text-xs md:text-sm font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>{sdg.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide2({ isDark }) {
  return (
    <div className={`h-full flex flex-col justify-center px-4 md:px-8 py-2 overflow-y-auto ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="mb-4 mt-2 text-center shrink-0">
        <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-emerald-400' : 'text-emerald-500'}`}>Problem Statement</span>
        <h2 className={`text-3xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-800'}`} style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>The Clean Energy Access Barrier</h2>
      </div>
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
        
        {/* CARD 1: Focused Data Problem */}
        <div className={`border rounded-3xl p-5 md:p-6 flex flex-col justify-center relative overflow-hidden ${isDark ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-100'}`}>
          <div className="flex flex-col mb-4">
            <Globe className={`mb-3 ${isDark ? 'text-red-400' : 'text-red-500'}`} size={36} />
            <div className={`font-black text-xl md:text-2xl leading-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
              Vulnerable Energy Security & The NETR Gap
            </div>
          </div>
          <div className={`text-base md:text-lg font-semibold leading-relaxed mb-4 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
            Malaysia relies heavily on fossil fuels, with Coal and Gas comprising roughly 80% of our 2024 electricity mix.
          </div>
          
          {/* Chart with Circle Overlay targeting Coal and Gas at the top */}
          <div className="relative w-full h-[180px] md:h-[200px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                layout="vertical"
                data={electricityShareData}
                margin={{ top: 0, right: 50, left: 10, bottom: 0 }}
              >
                <XAxis type="number" hide />
                <YAxis 
                  type="category" 
                  dataKey="source" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 11, fontWeight: 'bold' }}
                  reversed={true} // Forces Coal and Gas to the TOP
                />
                <Tooltip cursor={{fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}} contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#ffffff', borderColor: isDark ? '#334155' : '#e2e8f0', color: isDark ? '#f8fafc' : '#0f172a', borderRadius: '8px' }} formatter={(value) => `${value}%`} />
                <Bar dataKey="value" barSize={16} radius={[0, 4, 4, 0]}>
                  <LabelList 
                    dataKey="value" 
                    position="right" 
                    formatter={(val) => `${val}%`} 
                    style={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: '11px', fontWeight: 600 }} 
                  />
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
            
            {/* Circle Effect highlighting the top two bars (Coal and Gas) */}
            <div className="absolute top-[4px] left-[15%] w-[80%] h-[50px] border-[3px] border-red-500 border-dashed rounded-[30px] pointer-events-none flex items-center justify-end z-10">
              <div className="absolute -right-3 -top-4 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg animate-pulse whitespace-nowrap">
                ~80% Fossil Fuel
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: Policy Problem (Extracted Text) */}
        <div className={`border rounded-3xl p-5 md:p-6 flex flex-col justify-center ${isDark ? 'bg-amber-500/10 border-amber-500/20' : 'bg-amber-50 border-amber-100'}`}>
          <div className="flex flex-col mb-4">
            <Shield className={`mb-3 ${isDark ? 'text-amber-400' : 'text-amber-500'}`} size={36} />
            <div className={`font-black text-xl md:text-2xl leading-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
              Flawed Policies & Financial Disincentives
            </div>
          </div>
          
          <div className={`text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            <p className="font-bold mb-3 md:text-lg">Under the new January 2026 Solar ATAP scheme:</p>
            
            {/* Extracted Document Box */}
            <div className={`p-5 rounded-2xl border shadow-sm ${isDark ? 'bg-slate-900/60 border-slate-700' : 'bg-white border-amber-200'}`}>
              <h4 className="font-black text-xs md:text-sm uppercase tracking-widest mb-3 opacity-80">
                14. ENERGY ACCOUNTING AND SETTLEMENT
              </h4>
              <p className="mb-3 italic text-sm md:text-base leading-relaxed">
                "(d) If the Energy exported exceeds the electricity consumed from the EUC or the MAQ, whichever is lower, during the Billing Period, such excess of the exported energy <span className="text-red-500 font-black underline">shall be forfeited</span>;"
              </p>
              <p className="italic text-sm md:text-base leading-relaxed">
                "(e) If the net bill amount is in negative value, it <span className="text-red-500 font-black underline">shall be adjusted to zero</span> and <span className="text-red-500 font-black underline">does not involve any cash transactions</span>."
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function SlideSolution({ isDark }) {
  return (
    <div className={`h-full flex flex-col items-center justify-center relative ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="absolute top-6 w-full text-center">
        <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-emerald-400' : 'text-emerald-500'}`}>
          Core Solution
        </span>
      </div>
      <h1 className={`text-6xl md:text-8xl font-black tracking-tighter opacity-10 ${isDark ? 'text-white' : 'text-slate-800'}`} style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
        Solution
      </h1>
    </div>
  );
}

function SlideTargetUser({ isDark }) {
  const users = [
    { num: "01", role: "Consumer", title: "Everyday Users", desc: "No solar panels needed. Any smartphone user can instantly buy affordable, community-generated green energy.", icon: <Smartphone size={28} />, colorDark: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400", colorLight: "bg-emerald-50 border-emerald-200 text-emerald-700" },
    { num: "02", role: "Prosumer", title: "Solar Owners", desc: "Monetize excess solar generation at better rates than the national grid — your rooftop, your revenue.", icon: <Sun size={28} />, colorDark: "bg-amber-500/10 border-amber-500/20 text-amber-400", colorLight: "bg-amber-50 border-amber-200 text-amber-700" },
    { num: "03", role: "Industrial", title: "Industry Players", desc: "Factories with large energy demands can secure local, clean energy at scale via a decentralized marketplace.", icon: <Factory size={28} />, colorDark: "bg-blue-500/10 border-blue-500/20 text-blue-400", colorLight: "bg-blue-50 border-blue-200 text-blue-700" }
  ];

  return (
    <div className={`h-full flex flex-col justify-center px-4 md:px-10 overflow-y-auto ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="mb-4 mt-6 text-center w-full shrink-0">
        <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-emerald-400' : 'text-emerald-500'}`}>Target Market</span>
      </div>
      
      <div className="mb-6 text-center shrink-0">
        <h2 className={`text-2xl md:text-3xl font-black leading-tight ${isDark ? 'text-white' : 'text-slate-800'}`} style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
          A <span className={isDark ? "text-emerald-400" : "text-emerald-500"}>three-sided</span> ecosystem built for everyone.
        </h2>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-5 pb-6">
        {users.map((u) => (
          <div key={u.role} className={`flex-1 border rounded-3xl p-6 md:p-8 flex flex-col justify-center transition-transform hover:-translate-y-1 ${isDark ? 'bg-slate-800 border-slate-700 hover:border-emerald-500/50' : 'bg-white border-slate-200 hover:border-emerald-400 hover:shadow-lg'}`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${u.colorDark} ${!isDark && u.colorLight}`}>
              {u.icon}
            </div>
            <div className={`text-[10px] font-black tracking-[0.1em] uppercase mb-2 ${isDark ? 'text-emerald-500' : 'text-emerald-600'}`}>{u.num} — {u.role}</div>
            <h3 className={`text-xl md:text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>{u.title}</h3>
            <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{u.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideTesting({ isDark }) {
  return (
    <div className={`h-full flex flex-col px-4 md:px-8 overflow-y-auto ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="mb-4 mt-6 text-center shrink-0">
        <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-emerald-400' : 'text-emerald-500'}`}>User Trust & Validation</span>
        <h2 className={`text-2xl md:text-3xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-800'}`} style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
          AI you can <span className={isDark ? "text-emerald-400" : "text-emerald-500"}>audit</span>, not just trust blindly.
        </h2>
        <p className={`mt-1 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Tested by 50 Malaysian users (84% Aged 35+)</p>
      </div>

      <div className="flex-1 flex flex-col gap-4 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`border rounded-3xl p-5 md:p-6 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <ShieldCheck size={24} className={isDark ? "text-emerald-400 mb-3" : "text-emerald-500 mb-3"} />
            <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>Autopilot is Opt-In, Always</h3>
            <p className={`text-sm mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>AI automation is never switched on by default. Users choose when to let the system act.</p>
            <div className={`rounded-xl p-3 border ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Confidence Score</span>
                <span className="text-[11px] font-bold bg-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded">0.87 — Auto ✓</span>
              </div>
              <div className={`h-1.5 rounded-full w-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
                <div className="h-full bg-emerald-500 w-[87%] rounded-full"></div>
              </div>
            </div>
          </div>

          <div className={`border rounded-3xl p-5 md:p-6 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <AlertOctagon size={24} className={isDark ? "text-amber-400 mb-3" : "text-amber-500 mb-3"} />
            <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>Layered Hallucination Prevention</h3>
            <p className={`text-sm mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Safeguards ensure the AI never recommends impossible trades from input to output.</p>
            <div className={`rounded-xl p-3 border ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Low Confidence</span>
                <span className="text-[11px] font-bold bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded">0.61 — Review ⚠️</span>
              </div>
              <div className={`h-1.5 rounded-full w-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
                <div className="h-full bg-amber-500 w-[61%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { tag: "Layer 1", icon: <FileText size={20}/>, title: "Pre-Prompt Constraints", desc: "Rules baked in before every AI call, scoping suggestions." },
            { tag: "Layer 2", icon: <CheckCircle size={20}/>, title: "Post-Response Validation", desc: "Every AI output is checked against real grid data." },
            { tag: "Layer 3", icon: <Activity size={20}/>, title: "ML Handles the Math", desc: "Forecast engine does heavy analysis. AI makes the final call." }
          ].map((layer) => (
            <div key={layer.tag} className={`border rounded-2xl p-4 flex flex-col justify-center ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200'}`}>
              <span className={`self-start text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md mb-3 ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>{layer.tag}</span>
              <h4 className={`font-bold text-sm mb-1.5 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                 <span className={isDark ? "text-slate-400" : "text-slate-500"}>{layer.icon}</span> {layer.title}
              </h4>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{layer.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideRoadmap({ isDark }) {
  const steps = [
    { phase: "Short-Term", label: "Strategic Partnerships", desc: "Forging collaborations with key industry players and utilities.", color: "#10b981", textColor: "text-emerald-500" },
    { phase: "Short-Term", label: "Ecosystem Development", desc: "Onboarding stakeholders to create a scalable trading network.", color: "#10b981", textColor: "text-emerald-500" },
    { phase: "Short-Term", label: "Infrastructure Readiness", desc: "Strengthening the ecosystem to support real-world deployment.", color: "#10b981", textColor: "text-emerald-500" },
    { phase: "Long-Term", label: "Market Expansion", desc: "Scaling beyond local markets into international networks.", color: "#3b82f6", textColor: "text-blue-500" },
    { phase: "Long-Term", label: "Borderless Trading", desc: "Enabling seamless energy exchange across communities.", color: "#3b82f6", textColor: "text-blue-500" },
    { phase: "Long-Term", label: "Global Platform", desc: "Building a fully interconnected system without limitations.", color: "#3b82f6", textColor: "text-blue-500" }
  ];

  return (
    <div className={`h-full flex flex-col justify-center px-4 md:px-8 overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="mb-2 mt-6 text-center shrink-0">
        <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-emerald-400' : 'text-emerald-500'}`}>Expansion Plan</span>
        <h2 className={`text-3xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-800'}`} style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Future Roadmap</h2>
      </div>
      
      {/* Horizontal Zigzag Timeline container */}
      <div className="flex-1 flex items-center justify-center w-full overflow-x-auto pb-6 custom-scrollbar">
        <div className="min-w-[1000px] w-full relative h-[400px] flex flex-col justify-center px-6">
           
           {/* Unoccluded Top Background Headers */}
           <div className="absolute top-0 left-0 right-0 flex w-full select-none">
             <div className="w-1/2 flex flex-col items-center border-t-4 border-emerald-500 pt-4 px-4">
               <h3 className={`text-xl md:text-2xl font-black uppercase tracking-wide text-emerald-500`}>Short-Term</h3>
               <p className={`text-[11px] md:text-xs font-bold mt-1 uppercase text-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Foundation & Ecosystem Building</p>
             </div>
             <div className="w-1/2 flex flex-col items-center border-t-4 border-blue-500 pt-4 px-4">
               <h3 className={`text-xl md:text-2xl font-black uppercase tracking-wide text-blue-500`}>Long-Term</h3>
               <p className={`text-[11px] md:text-xs font-bold mt-1 uppercase text-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Regional & Global Expansion</p>
             </div>
           </div>

           {/* Center Horizontal Dashed Line */}
           <div className={`absolute left-4 right-4 h-1 border-t-4 border-dashed ${isDark ? 'border-slate-700' : 'border-slate-300'} z-0 mt-8`}></div>
           
           <div className="flex justify-between w-full relative z-10 pt-24">
             {steps.map((p, i) => {
               const isTop = i % 2 === 0; 
               return (
                 <div key={p.label} className="relative flex flex-col items-center w-[150px]">
                   {/* Node on the line */}
                   <div className="w-6 h-6 rounded-full border-[4px] z-10 shadow-md" style={{ backgroundColor: p.color, borderColor: isDark ? '#0f172a' : '#ffffff' }}></div>
                   
                   {/* Connecting vertical stub */}
                   <div className={`absolute w-1 ${isDark ? 'bg-slate-700' : 'bg-slate-300'} z-0 ${isTop ? 'bottom-6 h-10' : 'top-6 h-10'}`}></div>
                   
                   {/* Enlarge Card Content */}
                   <div className={`absolute w-[180px] ${isTop ? 'bottom-[60px]' : 'top-[60px]'} p-5 rounded-3xl border shadow-xl ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`} style={{ borderTopWidth: isTop ? '4px' : '1px', borderBottomWidth: !isTop ? '4px' : '1px', borderTopColor: isTop ? p.color : '', borderBottomColor: !isTop ? p.color : '' }}>
                     <div className={`font-black text-sm md:text-base mb-2 ${p.textColor}`}>{p.label}</div>
                     <p className={`text-[11px] md:text-xs leading-relaxed font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{p.desc}</p>
                   </div>
                 </div>
               )
             })}
           </div>
        </div>
      </div>
    </div>
  );
}

function Slide7({ isDark }) {
  return (
    <div className={`h-full flex flex-col items-center justify-center px-4 md:px-8 py-8 text-center relative ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="absolute top-6 w-full text-center">
        <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-emerald-400' : 'text-emerald-500'}`}>
          Conclusion
        </span>
      </div>
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-6">
        <Sun className="text-white" size={48} />
      </div>
      <h1 className={`text-4xl md:text-6xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`} style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
        Thank You.
      </h1>
    </div>
  );
}

// --- APPENDIX SLIDES ---

function Slide8_SDGs({ isDark }) {
  const sdgs = [
    { num: "7", color: "bg-yellow-500", title: "Affordable & Clean Energy", targets: ["Universal access to affordable energy"], contribution: "Lowers financial barrier to zero. Anyone with a smartphone can purchase clean energy directly from neighbors' ESS.", icon: <Sun size={28} className="text-slate-900" /> },
    { num: "12", color: "bg-emerald-500", title: "Responsible Consumption", targets: ["Sustainable management of resources"], contribution: "Reads smart meters to predict voltage spikes, routing midday excess into ESS for peak hour use, ensuring zero waste.", icon: <Leaf size={28} className="text-white" /> },
    { num: "13", color: "bg-blue-500", title: "Climate Action", targets: ["Integrate climate measures into policies"], contribution: "Built-in carbon engine translates trades into kg CO₂ offset, gamifying climate action to accelerate coal phase-out.", icon: <Globe size={28} className="text-white" /> },
  ];
  return (
    <div className={`h-full flex flex-col justify-center px-4 md:px-8 py-4 overflow-y-auto ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="mb-4 mt-4 text-center shrink-0">
        <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Appendix</span>
        <h2 className={`text-2xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-800'}`} style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Deep Dive: SDG Alignment</h2>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
        {sdgs.map((sdg) => (
          <div key={sdg.num} className={`border rounded-3xl p-5 md:p-8 shadow-lg flex flex-col ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
            <div className="flex flex-col gap-4 mb-4">
              <div className={`w-14 h-14 rounded-2xl ${sdg.color} flex items-center justify-center shadow-md shrink-0`}>{sdg.icon}</div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">SDG {sdg.num}</div>
                <div className={`font-black text-xl md:text-2xl leading-tight mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>{sdg.title}</div>
                
                {sdg.targets.map((t) => (
                  <div key={t} className="flex items-start gap-2 mb-4">
                    <CheckCircle size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span className={`text-sm md:text-base font-semibold leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`text-sm md:text-base p-4 md:p-5 rounded-2xl leading-relaxed border mt-auto ${isDark ? 'bg-slate-900/50 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-100 text-slate-600'}`}>
              <div className="font-bold mb-2 opacity-80 uppercase tracking-wider text-xs">EcoTrade Contribution</div>
              {sdg.contribution}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide9_Tech({ isDark }) {
  const stack = [
    { layer: "Frontend", tech: "Flutter (Dart) + Riverpod", desc: "Cross-platform mobile, fintech UI with real-time state management.", icon: <Smartphone size={18} />, colorDark: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400", colorLight: "bg-cyan-100 border-cyan-200 text-cyan-900" },
    { layer: "Backend", tech: "Firebase Cloud Functions", desc: "Serverless triggers: monitorTelemetry, maintenanceAdvisor, carbonExplainer.", icon: <Settings size={18} />, colorDark: "bg-orange-500/10 border-orange-500/20 text-orange-400", colorLight: "bg-orange-100 border-orange-200 text-orange-900" },
    { layer: "Database", tech: "Cloud Firestore", desc: "Real-time NoSQL ledger for portfolios, telemetry, and trade signals.", icon: <Database size={18} />, colorDark: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400", colorLight: "bg-yellow-100 border-yellow-200 text-yellow-900" },
    { layer: "AI Engine", tech: "Gemini API (gemma)", desc: "Powers the Robo-Advisor auto-trader and natural-language carbon explainer.", icon: <Brain size={18} />, colorDark: "bg-purple-500/10 border-purple-500/20 text-purple-400", colorLight: "bg-purple-100 border-purple-200 text-purple-900" },
    { layer: "Simulator", tech: "Node.js IoT Simulator", desc: "Physics engine for solar generation, ESS capacity, and TOU pricing.", icon: <Zap size={18} />, colorDark: "bg-green-500/10 border-green-500/20 text-green-400", colorLight: "bg-green-100 border-green-200 text-green-900" },
    { layer: "Scaling", tech: "Cloud Run + Vertex AI", desc: "Stateless AI for production, cross-border multi-region architecture.", icon: <Cloud size={18} />, colorDark: "bg-blue-500/10 border-blue-500/20 text-blue-400", colorLight: "bg-blue-100 border-blue-200 text-blue-900" },
  ];
  return (
    <div className={`h-full flex flex-col justify-center px-4 md:px-8 py-4 overflow-y-auto ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="mb-4 mt-4 text-center shrink-0">
        <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Appendix</span>
        <h2 className={`text-2xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-800'}`} style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Tech Stack & Data Flow</h2>
      </div>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {stack.map((s) => (
          <div key={s.layer} className={`border rounded-2xl p-4 flex flex-col gap-2 justify-center ${isDark ? s.colorDark : s.colorLight}`}>
            <div className="flex items-center gap-2 font-bold text-xs md:text-sm">
              {s.icon} <span className="uppercase tracking-wider opacity-70">{s.layer}</span>
            </div>
            <div className={`font-black text-sm md:text-base ${isDark ? 'text-white' : ''}`}>{s.tech}</div>
            <div className={`text-xs md:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700 opacity-90'}`}>{s.desc}</div>
          </div>
        ))}
      </div>
      <div className={`rounded-2xl border p-4 mb-4 shrink-0 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
        <div className={`text-xs font-bold uppercase tracking-widest mb-3 ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>Data Flow</div>
        <div className="flex items-center gap-2 flex-wrap">
          {["IoT Simulator", "→", "Firestore", "→", "Cloud Functions", "→", "Gemini API", "→", "Flutter UI"].map((item, i) =>
            item === "→" ? ( <ArrowRight key={i} size={16} className={isDark ? 'text-slate-500' : 'text-slate-300'} /> ) : (
              <span key={i} className={`border rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-200 text-slate-700'}`}>{item}</span>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function Slide10_Graphs({ isDark }) {
  const tooltipStyle = {
    backgroundColor: isDark ? '#1e293b' : '#ffffff',
    borderColor: isDark ? '#334155' : '#e2e8f0',
    color: isDark ? '#f8fafc' : '#0f172a',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
  };
  const axisTextColor = isDark ? '#94a3b8' : '#64748b';
  const gridLineColor = isDark ? '#334155' : '#e2e8f0';

  return (
    <div className={`h-full flex flex-col px-4 md:px-8 py-4 overflow-y-auto ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="mb-4 mt-4 text-center shrink-0">
        <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Appendix</span>
        <h2 className={`text-2xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-800'}`} style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Data & Projections</h2>
      </div>
      
      <div className="flex-1 flex flex-col gap-6 pb-6">
        {/* CHART 1: Projected Capacity */}
        <div className={`border rounded-3xl p-5 md:p-6 shadow-sm overflow-hidden flex flex-col ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
          <h3 className={`font-bold text-lg mb-1 shrink-0 ${isDark ? 'text-white' : 'text-slate-800'}`}>Projected Power System Installed Capacity Mix 2050</h3>
          <div className="w-full overflow-x-auto custom-scrollbar flex-1">
            <div className="min-w-[600px] h-[350px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={capacityMixData} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridLineColor} />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: axisTextColor, fontSize: 12, fontWeight: 600 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: axisTextColor, fontSize: 12, fontWeight: 600 }} unit=" GW" width={50} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(value) => `${value} GW`} />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px', color: axisTextColor }} />
                  <Bar dataKey="Coal" stackId="a" fill="#3d3d3d" />
                  <Bar dataKey="Gas" stackId="a" fill="#88211b" />
                  <Bar dataKey="Oil" stackId="a" fill="#b0b0b0" />
                  <Bar dataKey="Bioenergy" stackId="a" fill="#4bae4f" />
                  <Bar dataKey="Hydro" stackId="a" fill="#3674ab" />
                  <Bar dataKey="PV" stackId="a" fill="#fce044">
                    <LabelList dataKey="total" position="top" style={{ fill: isDark ? '#f8fafc' : '#0f172a', fontSize: '14px', fontWeight: 'bold' }} />
                  </Bar>
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className={`text-[10px] mt-3 font-medium shrink-0 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Source: NETR page 33/70
          </div>
        </div>

        {/* CHART 2: Electricity Share */}
        <div className={`border rounded-3xl p-5 md:p-6 shadow-sm ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
          <h3 className={`font-bold text-lg mb-6 ${isDark ? 'text-white' : 'text-slate-800'}`}>Share of Electricity Production by Source, Malaysia (2024)</h3>
          <div className="w-full h-[300px]">
            <ResponsiveContainer>
              <RechartsBarChart layout="vertical" data={electricityShareData} margin={{ top: 0, right: 50, left: 20, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="source" axisLine={false} tickLine={false} tick={{ fill: axisTextColor, fontSize: 13, fontWeight: 'bold' }} />
                <Tooltip cursor={{fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}} contentStyle={tooltipStyle} formatter={(value) => `${value}%`} />
                <Bar dataKey="value" barSize={24} radius={[0, 4, 4, 0]}>
                  <LabelList dataKey="value" position="right" formatter={(val) => `${val}%`} style={{ fill: axisTextColor, fontSize: '13px', fontWeight: 600 }} />
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
          <div className={`text-[10px] mt-3 font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Data source: Ember (2026); Energy Institute - Statistical Review of World Energy (2025)
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide11_UserFeedback({ isDark }) {
  return (
    <div className={`h-full flex flex-col px-4 md:px-8 py-4 overflow-y-auto ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="mb-4 mt-4 text-center shrink-0">
        <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Appendix</span>
        <h2 className={`text-2xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-800'}`} style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>User Feedback (CSV Data)</h2>
      </div>

      <div className={`flex-1 rounded-3xl border shadow-sm overflow-hidden flex flex-col ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="overflow-auto w-full custom-scrollbar flex-1">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead className="sticky top-0 z-10">
              <tr className={`border-b text-xs uppercase tracking-wider ${isDark ? 'bg-slate-900 border-slate-700 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
                <th className="p-4 font-bold">User ID</th>
                <th className="p-4 font-bold">Time</th>
                <th className="p-4 font-bold">Age</th>
                <th className="p-4 font-bold">Panel Owner</th>
                <th className="p-4 font-bold">Trust AI</th>
                <th className="p-4 font-bold">Use P2P</th>
                <th className="p-4 font-bold">Best Feature</th>
                <th className="p-4 font-bold">Concern</th>
                <th className="p-4 font-bold">Battery</th>
                <th className="p-4 font-bold">Pay Premium</th>
                <th className="p-4 font-bold">P2P vs Grid</th>
                <th className="p-4 font-bold">Rating</th>
                <th className="p-4 font-bold min-w-[250px]">Feedback</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {userFeedbackData.map((row) => (
                <tr key={row.id} className={`border-b last:border-0 transition-colors ${isDark ? 'border-slate-700/50 hover:bg-slate-700/30 text-slate-300' : 'border-slate-100 hover:bg-slate-50 text-slate-700'}`}>
                  <td className="p-4 font-mono text-xs opacity-70">{row.id}</td>
                  <td className="p-4 whitespace-nowrap text-xs">{row.time}</td>
                  <td className="p-4 whitespace-nowrap">{row.age}</td>
                  <td className="p-4 uppercase text-[10px] font-bold">{row.solar}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold ${row.trustAi === 'yes' ? 'bg-emerald-500/20 text-emerald-500' : row.trustAi === 'no' ? 'bg-red-500/20 text-red-500' : 'bg-amber-500/20 text-amber-500'}`}>{row.trustAi}</span>
                  </td>
                  <td className="p-4 uppercase text-[10px] font-bold">{row.useP2P}</td>
                  <td className="p-4 whitespace-nowrap text-xs">{row.feature}</td>
                  <td className="p-4 whitespace-nowrap text-xs opacity-80">{row.concern}</td>
                  <td className="p-4 uppercase text-[10px] font-bold">{row.battery}</td>
                  <td className="p-4 uppercase text-[10px] font-bold">{row.premium}</td>
                  <td className="p-4 text-xs">{row.vsGrid}</td>
                  <td className="p-4 font-bold">{row.rating}/5</td>
                  <td className="p-4 italic opacity-90 text-xs">"{row.comment}"</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- APP CONFIGURATION ---

const SLIDES = [
  { id: 1, title: "Overview", shortTitle: "Intro", appendix: false, component: Slide1 },
  { id: 2, title: "Problem Statement", shortTitle: "Problem", appendix: false, component: Slide2 },
  { id: 3, title: "Solution", shortTitle: "Solution", appendix: false, component: SlideSolution },
  { id: 4, title: "Target User", shortTitle: "Target User", appendix: false, component: SlideTargetUser },
  { id: 5, title: "User Testing", shortTitle: "Testing", appendix: false, component: SlideTesting },
  { id: 6, title: "Roadmap", shortTitle: "Roadmap", appendix: false, component: SlideRoadmap },
  { id: 7, title: "Thank You", shortTitle: "End", appendix: false, component: Slide7 },
  // APPENDIX SLIDES
  { id: 8, title: "SDG Alignment", shortTitle: "SDGs", appendix: true, component: Slide8_SDGs },
  { id: 9, title: "Tech Stack", shortTitle: "Tech Stack", appendix: true, component: Slide9_Tech },
  { id: 10, title: "Data Projections", shortTitle: "Graphs", appendix: true, component: Slide10_Graphs },
  { id: 11, title: "User Feedback", shortTitle: "Feedback CSV", appendix: true, component: Slide11_UserFeedback },
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
    <div className={`min-h-screen flex items-center justify-center p-2 md:p-4 transition-colors duration-300 ${isDark ? 'bg-slate-950' : 'bg-gradient-to-br from-slate-50 via-white to-emerald-50'}`} style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>
      <div className="w-full max-w-6xl h-screen md:h-[95vh] flex flex-col pt-2 pb-2">
        
        {/* Top Header */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Sun size={24} className="text-white" />
            </div>
            <span className={`font-black text-xl md:text-2xl tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>EcoTrade</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`text-sm md:text-base font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {current + 1} / {SLIDES.length} <span className="hidden md:inline">— {SLIDES[current].title}</span>
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2.5 rounded-xl transition-all duration-200 shadow-sm ${isDark ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              title="Toggle Theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* --- MAIN NAVIGATION ROW --- */}
        <div className="flex flex-wrap md:flex-nowrap gap-1.5 mb-2 px-1">
          {SLIDES.map((s, i) => !s.appendix && (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className={`flex-1 text-center text-xs md:text-sm font-bold py-2 px-2 rounded-xl transition-all duration-200 ${
                i === current ? "bg-emerald-500 text-white shadow-md" : (isDark ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200")
              }`}
            >
              {s.shortTitle}
            </button>
          ))}
        </div>

        {/* --- APPENDIX NAVIGATION ROW --- */}
        <div className="flex flex-wrap md:flex-nowrap items-center gap-1.5 mb-4 px-1">
          <span className={`text-[10px] md:text-xs font-black tracking-widest mr-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>APPENDIX:</span>
          {SLIDES.map((s, i) => s.appendix && (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className={`px-3 md:px-4 py-1.5 text-xs font-bold rounded-lg border transition-all duration-200 ${
                i === current ? "bg-slate-700 border-slate-600 text-white shadow-inner" : (isDark ? "border-slate-800 text-slate-500 hover:bg-slate-800" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-100")
              }`}
            >
              {s.shortTitle}
            </button>
          ))}
        </div>

        {/* Main Slide Card */}
        <div className={`flex-1 min-h-0 rounded-3xl shadow-2xl overflow-hidden transition-all duration-200 flex flex-col ${isDark ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-slate-100'} ${animating ? "opacity-0 scale-98" : "opacity-100 scale-100"}`}>
          <SlideComponent isDark={isDark} />
        </div>

        {/* Bottom Controls */}
        <div className="flex items-center justify-between mt-4 px-1">
          <button
            onClick={prev}
            disabled={current === 0}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${current === 0 ? (isDark ? "text-slate-700 cursor-not-allowed" : "text-slate-300 cursor-not-allowed") : (isDark ? "text-slate-300 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-200")}`}
          >
            <ChevronLeft size={18} />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${i === current ? "bg-emerald-500 w-6" : (isDark ? "bg-slate-700 hover:bg-slate-600" : "bg-slate-300 hover:bg-slate-400")}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={current === SLIDES.length - 1}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${current === SLIDES.length - 1 ? (isDark ? "text-slate-700 cursor-not-allowed" : "text-slate-300 cursor-not-allowed") : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md"}`}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}