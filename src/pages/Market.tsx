import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp, Shield, Zap, ChevronRight, ArrowRight, Download, BarChart3 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const statCards = [
  { icon: TrendingUp, badge: "+8.4% WOW", badgeColor: "bg-neon/20 text-neon", label: "HIRING VELOCITY", value: "92,410", sub: "New AI roles identified in Tier-1 hubs." },
  { icon: Shield, badge: "VITAL", badgeColor: "bg-aqua/20 text-aqua", label: "SKILL GAP INDEX", value: "68%", sub: "Immediate GenAI upskilling required." },
  { icon: Shield, badge: "LOW RISK", badgeColor: "bg-neon/20 text-neon", label: "AUTOMATION INDEX", value: "Low-Mid", sub: "Early disruption in repetitive tasks." },
];

const emergingRoles = [
  { rank: "01", title: "AI Prompt Engineer", meta: "320% YOY • FINTECH" },
  { rank: "02", title: "MLOps Architect", meta: "180% YOY • SAAS" },
  { rank: "03", title: "Data Ethics Officer", meta: "110% YOY • GOVERNANCE" },
];

const riskCategories = [
  { label: "PRODUCT", value: "12%", color: "text-aqua" },
  { label: "ENG", value: "24%", color: "text-aqua" },
  { label: "SUPPORT", value: "62%", color: "text-aqua" },
];

const industrySignals = [
  { label: "BFSI", value: "+24% CapEx" },
  { label: "RETAIL", value: "+18% Headcount" },
  { label: "HEALTH", value: "Bengaluru Lead" },
];

const heatmapSkills = [
  { name: "PYTORCH", score: 9.8, critical: true },
  { name: "VECTOR DB", score: 9.2, critical: true },
  { name: "LLMOPS", score: 8.9, critical: true },
  { name: "REACT.JS", score: 8.4, critical: true },
  { name: "NODE.JS", score: 6.1, critical: false },
  { name: "SQL", score: 4.2, critical: false },
  { name: "KUBERNETES", score: 9.1, critical: true },
  { name: "TYPESCRIPT", score: 8.2, critical: true },
  { name: "FASTAPI", score: 6.8, critical: false },
  { name: "DOCKER", score: 5.4, critical: false },
  { name: "JAVA", score: 3.9, critical: false },
  { name: "LANGCHAIN", score: 9.6, critical: true },
];

const Market = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container pt-24 pb-16">
        {/* Hero Header */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-aqua font-semibold mb-3">
            <span className="w-6 h-px bg-aqua inline-block" /> AI-Native Market Insights
          </p>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">
                India Tech Pulse<span className="text-aqua">.</span>
              </h1>
              <p className="text-sm text-muted-foreground max-w-lg">
                Real-time displacement risk analysis and emerging opportunity signals across the Indian tech ecosystem.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex rounded-full border border-border/50 overflow-hidden text-xs font-semibold">
                <span className="px-4 py-2 bg-aqua/10 text-aqua border-r border-border/50">INDIA-SPECIFIC</span>
                <span className="px-4 py-2 text-muted-foreground">GLOBAL</span>
              </div>
              <button className="flex items-center gap-2 rounded-lg border border-border/50 px-4 py-2 text-xs font-semibold text-foreground hover:border-aqua/50 transition-colors">
                <Download className="h-3.5 w-3.5" /> Q3 REPORT
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {statCards.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-aqua/10 flex items-center justify-center">
                  <s.icon className="h-5 w-5 text-aqua" />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider rounded-full px-2.5 py-1 ${s.badgeColor}`}>{s.badge}</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-1">{s.label}</p>
              <p className="text-3xl font-display font-bold mb-1">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Middle Row: Emerging Roles + AI Risk Meter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Emerging Roles */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-display font-bold uppercase tracking-wider">Top Emerging Roles</h2>
              <button className="text-muted-foreground hover:text-foreground">•••</button>
            </div>
            <div className="space-y-4">
              {emergingRoles.map((r) => (
                <div key={r.rank} className="flex items-center gap-4 group cursor-pointer">
                  <span className="text-xs text-muted-foreground font-mono w-6">{r.rank}</span>
                  <div className="flex-1 border-l border-border/50 pl-4">
                    <p className="text-sm font-semibold group-hover:text-aqua transition-colors">{r.title}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{r.meta}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-aqua transition-colors" />
                </div>
              ))}
            </div>
            <button className="w-full mt-6 rounded-lg border border-border/50 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground hover:border-aqua/50 transition-colors">
              Exploration Mode
            </button>
          </motion.div>

          {/* AI Risk Precision Meter */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-card p-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="text-sm font-display font-bold uppercase tracking-wider">AI Risk Precision Meter</h2>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Probability of Role Displacement (24mo)</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-display font-bold text-aqua">28%</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Safe Range</p>
              </div>
            </div>
            {/* Gauge visual */}
            <div className="flex items-center justify-center py-8">
              <div className="relative w-40 h-24">
                <svg viewBox="0 0 160 90" className="w-full h-full">
                  <path d="M 15 80 A 65 65 0 0 1 145 80" fill="none" stroke="hsl(var(--border))" strokeWidth="12" strokeLinecap="round" opacity="0.3" />
                  <path d="M 15 80 A 65 65 0 0 1 80 15" fill="none" stroke="hsl(var(--aqua))" strokeWidth="12" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-end justify-center pb-1">
                  <span className="text-lg font-display font-bold">LOW</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1 mb-6">
              <span className="w-2 h-2 rounded-full bg-aqua" />
              <span className="w-2 h-2 rounded-full bg-aqua/40" />
              <span className="w-2 h-2 rounded-full bg-aqua/20" />
            </div>
            <div className="grid grid-cols-3 gap-4 border-t border-border/30 pt-4">
              {riskCategories.map((c) => (
                <div key={c.label} className="text-center">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{c.label}</p>
                  <p className={`text-lg font-display font-bold ${c.color}`}>{c.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Industry Growth Signals */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6 mb-8">
          <h2 className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold text-center mb-5">Industry Growth Signals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {industrySignals.map((s) => (
              <div key={s.label} className="rounded-lg bg-aqua/5 border border-aqua/20 p-4">
                <p className="text-[10px] uppercase tracking-widest text-aqua font-semibold mb-2">{s.label}</p>
                <p className="text-sm font-semibold">{s.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skill Demand Heatmap */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mb-8">
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="text-xl font-display font-bold">Skill Demand Heatmap</h2>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Market Scarcity vs Institutional Demand</p>
            </div>
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-border/50" /> Legacy</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-aqua" /> Critical</span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {heatmapSkills.map((skill) => (
              <div key={skill.name} className={`rounded-xl p-4 ${skill.critical ? "bg-aqua/15 border border-aqua/30" : "bg-border/10 border border-border/30"}`}>
                <p className={`text-[10px] font-bold uppercase tracking-wider mb-3 ${skill.critical ? "text-aqua" : "text-muted-foreground"}`}>{skill.name}</p>
                <p className={`text-2xl font-display font-bold ${skill.critical ? "text-foreground" : "text-muted-foreground"}`}>{skill.score}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-2xl bg-gradient-to-r from-neon/20 to-aqua/10 border border-neon/30 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-neon/20 flex items-center justify-center shrink-0">
              <Zap className="h-6 w-6 text-neon" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold">Ready to Bridge the Gap?</h3>
              <p className="text-sm text-muted-foreground">Your profile matches 85% of 'MLOps Architect' requirements.</p>
            </div>
          </div>
          <Link to="/roadmap" className="shrink-0 inline-flex items-center gap-2 rounded-full border border-aqua px-6 py-3 text-sm font-semibold text-aqua hover:bg-aqua/10 transition-colors uppercase tracking-wider">
            Optimize My Stack <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Market;
