import { useState } from "react";
import { DashboardNav } from "@/components/DashboardNav";
import { Footer } from "@/components/Footer";
import { Search, SlidersHorizontal, TrendingUp, ChevronDown, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

interface RoleCard {
  id: string;
  title: string;
  matchPercent: number;
  salaryRange: string;
  type: string;
  location: string;
  trending: boolean;
  tags: string[];
  demand: string;
  tier: string;
  trend: string;
}

const roles: RoleCard[] = [
  { id: "1", title: "AI Solutions Architect", matchPercent: 95, salaryRange: "₹35L - ₹60L", type: "Full-time", location: "Remote", trending: true, tags: ["LLMs", "Cloud Infra"], demand: "High Demand", tier: "Tier 1 MNCs", trend: "Strong Market Uptrend" },
  { id: "2", title: "Technical Product Manager", matchPercent: 88, salaryRange: "₹28L - ₹45L", type: "Hybrid", location: "Bangalore", trending: true, tags: ["Agile", "Strategy"], demand: "Growth Stage", tier: "Startups", trend: "Rapidly Emerging" },
  { id: "3", title: "Data Strategist", matchPercent: 82, salaryRange: "₹22L - ₹40L", type: "Contract", location: "Remote", trending: true, tags: ["Data Viz", "Big Query"], demand: "High Demand", tier: "Tech Giants", trend: "Stable Growth" },
  { id: "4", title: "Operations Manager", matchPercent: 43, salaryRange: "₹18L - ₹25L", type: "Full-time", location: "Mumbai", trending: false, tags: [], demand: "Moderate", tier: "Mid-size", trend: "Flat" },
];

const RoleHub = () => {
  const [search, setSearch] = useState("");

  const filtered = roles.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardNav />

      <main className="flex-1 container max-w-5xl py-10 md:py-16 px-4">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">Role Hub</h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-xl mb-8">
          AI-native matching engine analyzing your profile against 5,000+ high-growth career paths in tech and AI.
        </p>

        {/* Search & Filter */}
        <div className="flex items-center gap-2 bg-card border border-border/50 rounded-2xl px-4 py-3 mb-8">
          <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search roles, skills, or industries..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors border-l border-border/50 pl-3">
            <SlidersHorizontal className="h-4 w-4" /> Filter
          </button>
        </div>

        {/* Role Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((role, i) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`glass-card-hover p-5 cursor-pointer ${role.matchPercent < 60 ? "opacity-60" : ""}`}
            >
              <div className="flex items-start justify-between mb-3">
                <BarChart3 className="h-8 w-8 text-primary" />
                <span className="text-xs font-semibold text-neon bg-neon/10 border border-neon/30 rounded-full px-2 py-0.5">
                  {role.matchPercent}% Match
                </span>
              </div>
              <h4 className="font-display font-semibold mb-1">{role.title}</h4>
              <p className="text-xs text-muted-foreground mb-3">{role.demand} • {role.tier}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Avg. Salary (Annual)</span>
                <span className="text-sm font-semibold">{role.salaryRange}</span>
              </div>
              <div className="w-full h-1 bg-muted rounded-full mt-3 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${role.matchPercent}%` }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                />
              </div>
              <p className="flex items-center gap-1 text-xs text-primary mt-2">
                <TrendingUp className="h-3 w-3" /> {role.trend}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-10">
          <button className="flex items-center gap-2 text-sm font-medium border border-border/50 rounded-xl px-6 py-3 hover:border-primary/50 hover:text-primary transition-colors">
            <ChevronDown className="h-4 w-4" /> Load More Career Paths
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RoleHub;
