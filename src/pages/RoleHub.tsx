import { useState } from "react";
import { DashboardNav } from "@/components/DashboardNav";
import { Footer } from "@/components/Footer";
import { Search, SlidersHorizontal, TrendingUp, ArrowRight, ChevronDown } from "lucide-react";

interface RoleCard {
  id: string;
  title: string;
  matchPercent: number;
  salaryRange: string;
  type: string;
  location: string;
  trending: boolean;
  tags: string[];
}

const roles: RoleCard[] = [
  { id: "1", title: "AI Solutions Architect", matchPercent: 95, salaryRange: "₹35L - ₹60L PA", type: "Full-time", location: "Remote", trending: true, tags: ["LLMs", "Cloud Infra"] },
  { id: "2", title: "Technical Product Manager", matchPercent: 88, salaryRange: "₹28L - ₹45L PA", type: "Hybrid", location: "Bangalore", trending: true, tags: ["Agile", "Strategy"] },
  { id: "3", title: "Data Strategist", matchPercent: 82, salaryRange: "₹22L - ₹40L PA", type: "Contract", location: "Remote", trending: true, tags: ["Data Viz", "Big Query"] },
  { id: "4", title: "Operations Manager", matchPercent: 43, salaryRange: "₹18L - ₹25L PA", type: "Full-time", location: "Mumbai", trending: false, tags: [] },
];

const getMatchColor = (percent: number) => {
  if (percent >= 80) return "text-primary stroke-primary";
  if (percent >= 60) return "text-secondary stroke-secondary";
  return "text-muted-foreground stroke-muted-foreground";
};

const MatchCircle = ({ percent }: { percent: number }) => {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const colorClass = getMatchColor(percent);

  return (
    <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 52 52">
        <circle cx="26" cy="26" r={radius} fill="none" strokeWidth="3" className="stroke-muted/40" />
        <circle cx="26" cy="26" r={radius} fill="none" strokeWidth="3" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className={colorClass} />
      </svg>
      <span className={`absolute text-xs font-bold ${colorClass}`}>{percent}%</span>
    </div>
  );
};

const RoleHub = () => {
  const [search, setSearch] = useState("");

  const filtered = roles.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardNav />

      <main className="flex-1 container max-w-4xl py-10 md:py-16 px-4">
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

        {/* Role Cards */}
        <div className="space-y-4">
          {filtered.map((role) => (
            <div
              key={role.id}
              className={`flex items-center gap-4 md:gap-6 bg-card border rounded-2xl px-5 py-5 transition-colors ${
                role.matchPercent >= 60
                  ? "border-border/50 hover:border-primary/40"
                  : "border-border/30 opacity-60"
              }`}
            >
              <MatchCircle percent={role.matchPercent} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-base md:text-lg truncate">{role.title}</h3>
                  {role.trending && <TrendingUp className="h-4 w-4 text-primary flex-shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  💰 {role.salaryRange} &nbsp;🏢 {role.type} / {role.location}
                </p>
              </div>

              <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                {role.tags.map((tag) => (
                  <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold border border-primary/40 text-primary rounded-full px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>

              <button className="flex items-center gap-1.5 text-sm font-medium border border-border/50 rounded-xl px-4 py-2 hover:border-primary/50 hover:text-primary transition-colors flex-shrink-0">
                View Details <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
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
