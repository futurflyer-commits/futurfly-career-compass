import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp, CheckCircle, Sparkles, BarChart3, Target, AlertTriangle, IndianRupee, ArrowRight } from "lucide-react";
import { DashboardNav } from "@/components/DashboardNav";

const roleMatches = [
  { title: "AI Solutions Architect", match: 98, tier: "Tier 1 MNCs", salary: "₹25L–₹45L" },
  { title: "GenAI Product Lead", match: 85, tier: "Startups", salary: "₹20L–₹38L" },
  { title: "ML Platform Engineer", match: 78, tier: "Tech Giants", salary: "₹22L–₹40L" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <div className="container py-6 md:py-10 space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl md:text-3xl font-display font-bold">AI Career Dashboard</h1>
        </motion.div>

        {/* Row 1: Persona + Career Path */}
        <div className="grid lg:grid-cols-5 gap-4">
          {/* Compact Persona */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="lg:col-span-2">
            <div className="glass-card p-5 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-primary font-semibold">Primary Persona</p>
                  <h3 className="text-base font-display font-bold">The AI Product Architect</h3>
                </div>
                <span className="ml-auto text-[10px] font-semibold text-neon bg-neon/10 border border-neon/30 rounded-full px-2 py-0.5 shrink-0">94%</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
                You bridge technical AI capabilities and strategic product needs — a top 1% profile in India's tech ecosystem.
              </p>
              <Link to="/persona" className="inline-flex items-center justify-center gap-1.5 rounded-full bg-muted py-2 text-xs font-semibold hover:bg-muted/80 transition-colors">
                Full Analysis <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </motion.div>

          {/* Career Path */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-3">
            <div className="glass-card p-5 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-primary font-semibold">Current Path</p>
                  <h3 className="text-lg font-display font-bold">AI Solutions Architect</h3>
                </div>
                <Link to="/simulation" className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[10px] font-semibold hover:border-primary/50 transition-colors">
                  <Sparkles className="h-3 w-3" /> Modify
                </Link>
              </div>

              {/* Compact Timeline */}
              <div className="flex-1 flex items-center">
                <div className="relative flex items-start justify-between w-full">
                  <div className="absolute top-4 left-[10%] right-[10%] h-px bg-border" />
                  <div className="absolute top-4 left-[10%] h-px bg-secondary" style={{ width: '30%' }} />
                  {[
                    { label: "Audit", done: true },
                    { label: "Skills", done: true },
                    { label: "Portfolio", active: true },
                    { label: "Readiness" },
                    { label: "Placement" },
                  ].map((step, i) => (
                    <div key={i} className="relative z-10 flex flex-col items-center text-center w-1/5">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-1 ${
                        step.done ? "bg-secondary/20 border-secondary text-secondary"
                          : step.active ? "bg-primary/20 border-primary text-primary animate-pulse"
                          : "bg-muted border-border text-muted-foreground"
                      }`}>
                        {step.done ? <CheckCircle className="h-4 w-4" /> : step.active ? <Target className="h-3.5 w-3.5" /> : <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />}
                      </div>
                      <span className="text-[10px] font-medium leading-tight">{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress */}
              <div className="mt-3 pt-3 border-t border-border/50">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase tracking-wider font-semibold">Overall Readiness</span>
                  <span className="text-xs font-semibold text-secondary">58%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-secondary to-accent rounded-full" initial={{ width: 0 }} animate={{ width: "58%" }} transition={{ duration: 0.8, delay: 0.3 }} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Row 2: Role Matches (compact) + Market Intelligence */}
        <div className="grid lg:grid-cols-5 gap-4">
          {/* Role Matches - compact list */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="lg:col-span-2">
            <div className="glass-card p-5 h-full">
              <div className="flex items-center justify-between mb-3">
                <h2 className="flex items-center gap-1.5 text-sm font-display font-bold"><Target className="h-4 w-4 text-primary" /> Top Matches</h2>
                <Link to="/role-hub" className="text-[10px] font-semibold text-primary hover:underline">View All</Link>
              </div>
              <div className="space-y-2">
                {roleMatches.map((role) => (
                  <Link to="/simulation" key={role.title} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary">{role.match}%</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{role.title}</p>
                      <p className="text-[10px] text-muted-foreground">{role.tier} • {role.salary}</p>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Market Intelligence - 3 compact cards */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-3">
            <div className="grid sm:grid-cols-3 gap-4 h-full">
              {/* Skill Gaps */}
              <div className="glass-card p-4 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Skill Gaps</p>
                  <AlertTriangle className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="bg-muted rounded-lg p-2.5">
                    <p className="text-xs font-semibold">Prompt Engineering</p>
                    <p className="text-[9px] text-muted-foreground">85% of AI PM roles</p>
                  </div>
                  <div className="bg-muted rounded-lg p-2.5">
                    <p className="text-xs font-semibold">LLM Orchestration</p>
                    <p className="text-[9px] text-muted-foreground">Secondary priority</p>
                  </div>
                </div>
                <Link to="/skill-lab" className="text-[10px] font-semibold text-primary hover:underline mt-3">+3 MORE</Link>
              </div>

              {/* Growth */}
              <div className="glass-card p-4 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Growth: Bengaluru</p>
                  <TrendingUp className="h-3.5 w-3.5 text-secondary" />
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-xs font-semibold">AI Product Mgr</span>
                  <span className="text-[10px] font-bold text-secondary">+24.8%</span>
                </div>
                <div className="flex items-end gap-1 h-16 flex-1">
                  {[35, 45, 50, 60, 70, 80, 95].map((h, i) => (
                    <motion.div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-secondary/60 to-secondary" initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }} />
                  ))}
                </div>
                <Link to="/market" className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground hover:text-primary transition-colors mt-2">
                  <BarChart3 className="h-3 w-3" /> Analysis
                </Link>
              </div>

              {/* Salary */}
              <div className="glass-card p-4 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Market Salary</p>
                  <IndianRupee className="h-3.5 w-3.5 text-primary" />
                </div>
                <p className="text-xl font-display font-bold mb-0.5">
                  <span className="text-secondary">₹45L</span>–<span className="text-secondary">₹62L</span>
                </p>
                <p className="text-[9px] uppercase tracking-wider text-muted-foreground mb-2">Median Range</p>
                <div className="h-12 flex-1">
                  <svg viewBox="0 0 120 50" className="w-full h-full" preserveAspectRatio="none">
                    <path d="M0 45 Q20 42 40 38 T80 30 Q90 20 100 8 L105 5" fill="none" stroke="hsl(var(--secondary))" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="105" cy="5" r="3" fill="hsl(var(--secondary))" />
                  </svg>
                </div>
                <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
                  <span>2022</span>
                  <span>2023</span>
                  <span className="font-bold text-secondary">2024</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="py-6 text-center border-t border-border/30">
        <p className="text-xs text-muted-foreground">FuturFly AI — © 2026 • Empowering the next gen of tech leaders in India</p>
      </footer>
    </div>
  );
};

export default Dashboard;