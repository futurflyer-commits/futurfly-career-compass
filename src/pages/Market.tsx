import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket, TrendingUp, AlertTriangle, Flame, BarChart3, Zap } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const roles = [
  { title: "AI Solutions Architect", growth: "+34%", risk: "Low", demand: "Very High" },
  { title: "MLOps Engineer", growth: "+28%", risk: "Low", demand: "High" },
  { title: "GenAI Product Manager", growth: "+45%", risk: "Medium", demand: "Very High" },
  { title: "Data Platform Engineer", growth: "+22%", risk: "Low", demand: "High" },
  { title: "AI Safety Researcher", growth: "+52%", risk: "Medium", demand: "Emerging" },
];

const Market = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container pt-24 pb-12">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Market Intelligence</h1>
          <p className="text-sm text-muted-foreground">Real-time career market data for Indian tech professionals, powered by AI analysis.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: TrendingUp, label: "Avg. Growth", value: "+32%", sub: "AI Roles YoY" },
            { icon: AlertTriangle, label: "Disruption Risk", value: "4.2%", sub: "Your Current Path" },
            { icon: Flame, label: "Hot Skills", value: "12", sub: "In Demand Now" },
            { icon: Zap, label: "New Roles", value: "847", sub: "This Month" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-5 text-center">
              <s.icon className="h-5 w-5 text-primary mx-auto mb-2" />
              <p className="text-2xl font-display font-bold text-gradient">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Emerging Roles */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6 mb-8">
          <h2 className="flex items-center gap-2 font-display font-bold mb-5"><BarChart3 className="h-5 w-5 text-primary" /> Top Emerging Roles in India</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 text-xs text-muted-foreground uppercase tracking-wider font-medium">Role</th>
                  <th className="text-left py-3 text-xs text-muted-foreground uppercase tracking-wider font-medium">Growth</th>
                  <th className="text-left py-3 text-xs text-muted-foreground uppercase tracking-wider font-medium">AI Risk</th>
                  <th className="text-left py-3 text-xs text-muted-foreground uppercase tracking-wider font-medium">Demand</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((r) => (
                  <tr key={r.title} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                    <td className="py-3 font-medium">{r.title}</td>
                    <td className="py-3 text-neon font-semibold">{r.growth}</td>
                    <td className="py-3">
                      <span className={`text-xs rounded-full px-2 py-0.5 ${r.risk === "Low" ? "bg-neon/10 text-neon" : "bg-primary/10 text-primary"}`}>
                        {r.risk}
                      </span>
                    </td>
                    <td className="py-3 text-muted-foreground">{r.demand}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="glass-card p-8 text-center">
          <h3 className="text-xl font-display font-bold mb-2">Want deeper insights?</h3>
          <p className="text-sm text-muted-foreground mb-6">Unlock real-time market tracking, salary forecasting, and AI mentor chat.</p>
          <Link to="/pricing" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-7 py-3 text-sm font-semibold text-primary-foreground glow-aqua-sm hover:opacity-90 transition-all">
            Upgrade to Premium
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Market;
