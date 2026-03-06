import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { DashboardNav } from "@/components/DashboardNav";

const phases = [
  { phase: "Phase 00", title: "Graduate Trainee", salary: "₹8,50,000", tag: "" },
  { phase: "Phase 01", title: "Associate Dev", salary: "₹12,20,000", tag: "AWS-PRO" },
  { phase: "Current Phase", title: "SDE I (Tier 1)", salary: "₹18,50,000", tag: "System Design Core", current: true },
  { phase: "Phase 03", title: "SDE II", salary: "₹28,00,000", tag: "Distributed Sys" },
];

const skills = [
  { name: "Cloud Infra", status: "Complete" },
  { name: "Kubernetes", status: "40% Progress", progress: 40 },
  { name: "GenAI Architecture", status: "Loading AI..." },
];

const Simulation = () => {
  const [mode, setMode] = useState<"conservative" | "aggressive" | "native">("aggressive");

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <div className="container py-8 md:py-12">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">Analytics</span>
            <span className="text-xs bg-primary/10 border border-primary/30 rounded-full px-2 py-0.5 text-primary">AI Engine Active</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold">
              Path <span className="text-gradient">Simulation</span>
            </h1>
            <div className="flex rounded-full border border-border overflow-hidden">
              {(["conservative", "aggressive", "native"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-8 max-w-xl">
            A precise intelligence tool for Indian tech professionals. Engineering career trajectories through algorithmic market analysis.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {phases.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className={`glass-card p-5 ${p.current ? "border-primary/50 glow-aqua-sm" : ""}`}
            >
              <p className={`text-xs uppercase tracking-wider mb-2 ${p.current ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                {p.phase}
              </p>
              <h3 className="font-display font-bold mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{p.salary} /yr</p>
              {p.tag && <span className="text-xs bg-muted rounded px-2 py-0.5">{p.tag}</span>}
            </motion.div>
          ))}
        </div>

        {/* Growth + Skills */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="glass-card p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-display font-bold">Growth Trajectory</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Projected Compounded Yield</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-display font-bold text-primary">+42%</span>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Annual Increment</p>
              </div>
            </div>
            <div className="flex items-end gap-3 h-36">
              {[30, 40, 80, 60, 70, 50].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div
                    className={`w-full rounded-sm ${i === 2 ? "bg-primary" : "bg-muted"}`}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  />
                  <span className={`text-[10px] ${i === 2 ? "text-primary font-semibold" : "text-muted-foreground"}`}>Year {i}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-display font-bold mb-1"><span className="text-primary font-mono text-xs mr-2">terminal</span>Skill Matrix</h3>
            <div className="mt-4 flex flex-col gap-4">
              {skills.map((s) => (
                <div key={s.name} className="flex items-center justify-between">
                  <span className="text-sm font-medium uppercase tracking-wider">{s.name}</span>
                  <span className={`text-xs font-semibold ${s.progress ? "text-primary" : "text-muted-foreground"}`}>{s.status}</span>
                </div>
              ))}
              <Link to="/roadmap" className="mt-2 inline-flex items-center justify-center rounded-lg border border-border py-2.5 text-sm font-semibold hover:border-primary/50 transition-colors">
                Update Skillset
              </Link>
            </div>
          </div>
        </div>

        {/* Networking */}
        <div className="glass-card p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-display font-bold mb-2">Precision Networking</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Based on your Year 2 trajectory, we've identified 14 Engineering Leads in your stack. AI-matching is ready for 3 priority connections.
              </p>
              <Link to="/market" className="inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors">
                Initialize Contact
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <div className="glass-card p-4">
                <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">Market Volatility Alert</p>
                <p className="text-xs text-muted-foreground">Tier 1 Bangalore salaries for SDE-II up 14.2% YoY in Cloud/Infra sector.</p>
              </div>
              <div className="glass-card p-4">
                <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">Automation Index</p>
                <p className="text-xs text-muted-foreground">Your current path has a 4.2% disruption risk factor over the next 24 months.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-8 border-t border-border/30">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">FuturFly AI Systems © 2026</p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <span>Privacy Protocol</span>
            <span>Terms of Use</span>
            <span>System Status</span>
            <span>Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Simulation;
