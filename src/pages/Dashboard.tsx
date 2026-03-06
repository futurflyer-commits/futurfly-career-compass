import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, TrendingUp, CheckCircle, Sparkles, BarChart3, Target, AlertTriangle } from "lucide-react";
import { DashboardNav } from "@/components/DashboardNav";

const roleMatches = [
  { title: "AI Solutions Architect", match: 98, demand: "High Demand", tier: "Tier 1 MNCs", salary: "₹25L - ₹45L", trend: "Strong Market Uptrend", icon: "🎯" },
  { title: "GenAI Product Lead", match: 85, demand: "Growth Stage", tier: "Startups", salary: "₹20L - ₹38L", trend: "Rapidly Emerging", icon: "📊" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <div className="container py-8 md:py-12">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-1">Career Dashboard</h1>
          <p className="text-sm text-muted-foreground">Your personalized roadmap to the future of Indian Tech, powered by advanced generative AI.</p>
        </motion.div>

        {/* Persona + Career Path */}
        <div className="grid lg:grid-cols-5 gap-6 mb-8">
          {/* Persona Card */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2">
            <div className="glass-card p-6 h-full">
              <div className="relative bg-muted rounded-xl h-40 flex items-center justify-center mb-4">
                <span className="absolute top-3 right-3 text-xs font-semibold text-neon bg-neon/10 border border-neon/30 rounded-full px-2.5 py-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon" /> 94% Confidence
                </span>
                <Target className="h-16 w-16 text-primary" />
              </div>
              <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">Primary Persona</p>
              <h3 className="text-lg font-display font-bold mb-2">The AI Product Architect</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                You bridge the gap between technical AI capabilities and strategic product requirements. Your background in software engineering combined with business intuition makes you a 1% profile in India's tech ecosystem.
              </p>
              <Link to="/assessment" className="inline-flex items-center gap-2 w-full justify-center rounded-full bg-muted py-2.5 text-sm font-semibold hover:bg-muted/80 transition-colors">
                Full Persona Analysis →
              </Link>
            </div>
          </motion.div>

          {/* Career Path Status */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-3">
            <div className="glass-card p-6 h-full flex flex-col">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">Current Chosen Path</p>
                  <h3 className="text-xl md:text-2xl font-display font-bold">AI Solutions Architect</h3>
                </div>
                <Link to="/simulation" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold hover:border-primary/50 transition-colors">
                  <Sparkles className="h-3.5 w-3.5" /> Modify Strategy
                </Link>
              </div>
              <div className="flex gap-3 mb-6 mt-2">
                <span className="text-xs border border-border rounded-full px-3 py-1 text-muted-foreground flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> 18 Month Path
                </span>
                <span className="text-xs border border-border rounded-full px-3 py-1 text-muted-foreground flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> Tier 1 MNC Track
                </span>
              </div>

              {/* Phase Timeline */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="relative flex items-start justify-between mb-4">
                  <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-border" />
                  <div className="absolute top-5 left-[10%] h-0.5 bg-secondary" style={{ width: '30%' }} />
                  {[
                    { label: "Baseline Audit", status: "COMPLETED", done: true },
                    { label: "Skill Acquisition", status: "COMPLETED", done: true },
                    { label: "Portfolio Building", status: "IN PROGRESS", active: true },
                    { label: "Market Readiness", status: "UPCOMING" },
                    { label: "Placement", status: "FINAL PHASE" },
                  ].map((step, i) => (
                    <div key={i} className="relative z-10 flex flex-col items-center text-center w-1/5">
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2 ${
                        step.done ? "bg-secondary/20 border-secondary text-secondary"
                          : step.active ? "bg-primary/20 border-primary text-primary animate-pulse"
                          : "bg-muted border-border text-muted-foreground"
                      }`}>
                        {step.done ? <CheckCircle className="h-5 w-5" /> : step.active ? <Target className="h-4 w-4" /> : <span className="w-2 h-2 rounded-full bg-muted-foreground" />}
                      </div>
                      <span className="text-[10px] md:text-xs font-medium leading-tight">{step.label}</span>
                      <span className={`text-[9px] md:text-[10px] uppercase tracking-wider mt-0.5 ${
                        step.done ? "text-secondary" : step.active ? "text-primary" : "text-muted-foreground"
                      }`}>{step.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Overall Readiness */}
              <div className="mt-auto pt-4 border-t border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider font-semibold flex items-center gap-2">
                    Overall Path Readiness <span className="text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">18M Horizon</span>
                  </span>
                  <span className="text-sm font-semibold text-secondary">58% Total Progress</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-secondary to-accent rounded-full" initial={{ width: 0 }} animate={{ width: "58%" }} transition={{ duration: 1, delay: 0.4 }} />
                </div>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-primary" /> You are <strong className="text-foreground">ahead of schedule</strong> by 14 days in the 'Portfolio' phase. Keep the momentum.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Combined Row: Top Role Matches + Critical Gaps + Hyper-Local Analysis */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="grid md:grid-cols-3 gap-4">
          {/* Top Role Matches */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="flex items-center gap-2 font-display font-bold text-sm"><Target className="h-4 w-4 text-primary" /> Top Role Matches</h2>
              <div className="flex gap-1.5">
                <button className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:border-primary/50 transition-colors"><ChevronLeft className="h-3 w-3" /></button>
                <button className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:border-primary/50 transition-colors"><ChevronRight className="h-3 w-3" /></button>
              </div>
            </div>
            <div className="space-y-3 mb-4">
              {roleMatches.map((role) => (
                <div key={role.title} className="bg-muted rounded-lg p-3">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-sm font-semibold">{role.title}</h4>
                    <span className="text-[10px] font-semibold text-neon bg-neon/10 border border-neon/30 rounded-full px-2 py-0.5">{role.match}%</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mb-1.5">{role.demand} • {role.tier}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">{role.salary}</span>
                    <span className="flex items-center gap-1 text-[10px] text-primary"><TrendingUp className="h-2.5 w-2.5" /> {role.trend}</span>
                  </div>
                  <div className="w-full h-1 bg-background rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: `${role.match}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <Link to="/role-hub" className="text-xs font-semibold text-primary hover:underline">RoleHub →</Link>
          </div>

          {/* Critical Skill Gaps */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Critical Skill Gaps</p>
              <AlertTriangle className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3 bg-muted rounded-lg p-3">
                <Sparkles className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-semibold">Prompt Engineering</p>
                  <p className="text-[10px] text-muted-foreground">Required for 85% of AI PM roles</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-muted rounded-lg p-3">
                <Sparkles className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-semibold">LLM Orchestration</p>
                  <p className="text-[10px] text-muted-foreground">Secondary priority</p>
                </div>
              </div>
            </div>
            <Link to="/skill-lab" className="text-xs font-semibold text-primary hover:underline">View SkillLab</Link>
          </div>

          {/* Hyper-Local Analysis */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Growth: Bengaluru</p>
              <TrendingUp className="h-4 w-4 text-secondary" />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-semibold">AI Product Manager</span>
              <span className="text-xs font-bold text-secondary">+24.8% YoY</span>
            </div>
            <div className="flex items-end gap-1.5 h-20 mb-3">
              {[35, 45, 50, 60, 70, 80, 95].map((h, i) => (
                <motion.div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-secondary/60 to-secondary" initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }} />
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground italic mb-3">"Concentrated demand surge in Indiranagar and Whitefield clusters."</p>
            <Link to="/market" className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground hover:text-primary transition-colors">
              <BarChart3 className="h-3 w-3" /> Hyper-Local Analysis
            </Link>
          </div>
        </motion.div>
      </div>

      <footer className="py-8 text-center border-t border-border/30">
        <p className="text-xs text-muted-foreground">
          FuturFly AI — © 2026 • Empowering the next gen of tech leaders in India
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
