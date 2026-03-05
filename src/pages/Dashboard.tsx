import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket, Search, Bell, ChevronLeft, ChevronRight, TrendingUp, Eye, CheckCircle, Sparkles, BarChart3, Target } from "lucide-react";

const roleMatches = [
  { title: "AI Solutions Architect", match: 98, demand: "High Demand", tier: "Tier 1 MNCs", salary: "₹25L - ₹45L", trend: "Strong Market Uptrend", icon: "🎯" },
  { title: "GenAI Product Lead", match: 85, demand: "Growth Stage", tier: "Startups", salary: "₹20L - ₹38L", trend: "Rapidly Emerging", icon: "📊" },
  { title: "ML Platform Engineer", match: 78, demand: "High Demand", tier: "Tech Giants", salary: "₹22L - ₹40L", trend: "Stable Growth", icon: "⚙️" },
];

const verifiedSkills = ["System Design", "Python for DS", "Agile Product Management", "Cloud Infra (AWS)", "Stakeholder Mgmt"];
const criticalGaps = ["LLM Fine-tuning", "Vector Databases", "RAG Orchestration", "AI Governance & Ethics", "Neural Architectures"];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/30 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-primary" />
            <span className="font-display text-base font-bold">FuturFly</span>
          </Link>
          <div className="hidden md:flex items-center gap-2 bg-input rounded-full px-4 py-2 border border-border/50 w-64">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input className="bg-transparent text-sm flex-1 outline-none placeholder:text-muted-foreground" placeholder="Search insights or roles..." />
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/dashboard" className="font-semibold text-foreground underline underline-offset-4 decoration-primary">Dashboard</Link>
            <Link to="/roadmap" className="text-muted-foreground hover:text-foreground">Career Path</Link>
            <Link to="/simulation" className="text-muted-foreground hover:text-foreground">Skill Lab</Link>
            <Link to="/market" className="text-muted-foreground hover:text-foreground">Mentorship</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary" />
          </div>
        </div>
      </header>

      <div className="container py-8 md:py-12">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-1">AI Career Dashboard</h1>
          <p className="text-sm text-muted-foreground">Your personalized roadmap to the future of Indian Tech, powered by advanced generative AI.</p>
        </motion.div>

        {/* Persona + Roles */}
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
              <Link to="/persona" className="inline-flex items-center gap-2 w-full justify-center rounded-full bg-muted py-2.5 text-sm font-semibold hover:bg-muted/80 transition-colors">
                Full Persona Analysis →
              </Link>
            </div>
          </motion.div>

          {/* Role Matches */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="flex items-center gap-2 font-display font-bold"><Target className="h-5 w-5 text-primary" /> Top Role Matches</h2>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary/50 transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary/50 transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {roleMatches.slice(0, 2).map((role) => (
                <Link to="/simulation" key={role.title} className="glass-card-hover p-5">
                  <div className="flex items-start justify-between mb-3">
                    <BarChart3 className="h-8 w-8 text-primary" />
                    <span className="text-xs font-semibold text-neon bg-neon/10 border border-neon/30 rounded-full px-2 py-0.5">{role.match}% Match</span>
                  </div>
                  <h4 className="font-display font-semibold mb-1">{role.title}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{role.demand} • {role.tier}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Avg. Salary (Annual)</span>
                    <span className="text-sm font-semibold">{role.salary}</span>
                  </div>
                  <div className="w-full h-1 bg-muted rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: `${role.match}%` }} />
                  </div>
                  <p className="flex items-center gap-1 text-xs text-primary mt-2"><TrendingUp className="h-3 w-3" /> {role.trend}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skill Gap */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h2 className="flex items-center gap-2 font-display font-bold mb-1"><BarChart3 className="h-5 w-5 text-primary" /> Skill Gap Snapshot</h2>
              <p className="text-sm text-muted-foreground">Mapping your current abilities against the '<strong>AI Solutions Architect</strong>' benchmark</p>
            </div>
            <Link to="/roadmap" className="inline-flex items-center gap-2 mt-4 md:mt-0 rounded-full border border-border px-5 py-2 text-sm font-semibold hover:border-primary/50 transition-colors">
              <Eye className="h-4 w-4" /> Open Skill Lab
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-neon font-semibold mb-3">
                <CheckCircle className="h-3.5 w-3.5" /> Verified Mastery
              </p>
              <div className="flex flex-wrap gap-2">
                {verifiedSkills.map((s) => (
                  <span key={s} className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-primary font-semibold mb-3">
                <Sparkles className="h-3.5 w-3.5" /> Critical Gaps
              </p>
              <div className="flex flex-wrap gap-2">
                {criticalGaps.map((s) => (
                  <span key={s} className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">{s}</span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">Readiness Benchmark</span>
              <span className="font-semibold text-primary">65% Progress</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-neon rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-primary" /> AI Recommendation: Mastering <strong className="text-foreground">Vector Databases</strong> will increase your role match by 7.4%.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border/30 z-50">
        <div className="flex justify-around py-3">
          {[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Roles", href: "/simulation" },
            { label: "Roadmap", href: "/roadmap" },
            { label: "Market", href: "/market" },
            { label: "Profile", href: "/persona" },
          ].map((item) => (
            <Link key={item.label} to={item.href} className="text-xs text-muted-foreground hover:text-primary transition-colors text-center">
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <footer className="py-8 text-center border-t border-border/30">
        <p className="text-xs text-muted-foreground">
          <Rocket className="h-3 w-3 inline mr-1" /> FuturFly AI — © 2026 • Empowering the next gen of tech leaders in India
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
