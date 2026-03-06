import { useState } from "react";
import { Link } from "react-router-dom";
import { DashboardNav } from "@/components/DashboardNav";
import { Footer } from "@/components/Footer";
import { Search, SlidersHorizontal, TrendingUp, ChevronDown, BarChart3, X, MapPin, Briefcase, IndianRupee } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RoleCard {
  id: string;
  title: string;
  matchPercent: number;
  salaryRange: string;
  salaryMin: number;
  type: string;
  location: string;
  trending: boolean;
  tags: string[];
  demand: string;
  tier: string;
  trend: string;
}

const roles: RoleCard[] = [
  { id: "1", title: "AI Solutions Architect", matchPercent: 95, salaryRange: "₹35L - ₹60L", salaryMin: 35, type: "Full-time", location: "Remote", trending: true, tags: ["LLMs", "Cloud Infra"], demand: "High Demand", tier: "Tier 1 MNCs", trend: "Strong Market Uptrend" },
  { id: "2", title: "Technical Product Manager", matchPercent: 88, salaryRange: "₹28L - ₹45L", salaryMin: 28, type: "Hybrid", location: "Bangalore", trending: true, tags: ["Agile", "Strategy"], demand: "Growth Stage", tier: "Startups", trend: "Rapidly Emerging" },
  { id: "3", title: "Data Strategist", matchPercent: 82, salaryRange: "₹22L - ₹40L", salaryMin: 22, type: "Contract", location: "Remote", trending: true, tags: ["Data Viz", "Big Query"], demand: "High Demand", tier: "Tech Giants", trend: "Stable Growth" },
  { id: "4", title: "ML Platform Engineer", matchPercent: 78, salaryRange: "₹22L - ₹40L", salaryMin: 22, type: "Full-time", location: "Hyderabad", trending: true, tags: ["MLOps", "Kubernetes"], demand: "High Demand", tier: "Tech Giants", trend: "Stable Growth" },
  { id: "5", title: "GenAI Product Lead", matchPercent: 85, salaryRange: "₹20L - ₹38L", salaryMin: 20, type: "Full-time", location: "Bangalore", trending: true, tags: ["GenAI", "Product"], demand: "Growth Stage", tier: "Startups", trend: "Rapidly Emerging" },
  { id: "6", title: "Operations Manager", matchPercent: 43, salaryRange: "₹18L - ₹25L", salaryMin: 18, type: "Full-time", location: "Mumbai", trending: false, tags: [], demand: "Moderate", tier: "Mid-size", trend: "Flat" },
];

const locations = ["All Locations", "Remote", "Bangalore", "Mumbai", "Hyderabad"];
const jobTypes = ["All Types", "Full-time", "Hybrid", "Contract"];
const salaryRanges = [
  { label: "All Salaries", min: 0 },
  { label: "₹20L+", min: 20 },
  { label: "₹30L+", min: 30 },
  { label: "₹40L+", min: 40 },
];

const RoleHub = () => {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [location, setLocation] = useState("All Locations");
  const [jobType, setJobType] = useState("All Types");
  const [salaryFilter, setSalaryFilter] = useState(0);

  const activeFilterCount = [
    location !== "All Locations",
    jobType !== "All Types",
    salaryFilter > 0,
  ].filter(Boolean).length;

  const filtered = roles.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesLocation = location === "All Locations" || r.location === location;
    const matchesType = jobType === "All Types" || r.type === jobType;
    const matchesSalary = r.salaryMin >= salaryFilter;
    return matchesSearch && matchesLocation && matchesType && matchesSalary;
  });

  const clearFilters = () => {
    setLocation("All Locations");
    setJobType("All Types");
    setSalaryFilter(0);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardNav />

      <main className="flex-1 container max-w-5xl py-10 md:py-16 px-4">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">Role Hub</h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-xl mb-8">
          AI-native matching engine analyzing your profile against 5,000+ high-growth career paths in tech and AI.
        </p>

        {/* Search & Filter Toggle */}
        <div className="flex items-center gap-2 bg-card border border-border/50 rounded-2xl px-4 py-3 mb-3">
          <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search roles, skills, or industries..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 text-xs transition-colors border-l border-border/50 pl-3 ${
              showFilters || activeFilterCount > 0
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
            {activeFilterCount > 0 && (
              <span className="bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-5"
            >
              <div className="bg-card border border-border/50 rounded-2xl p-4 flex flex-col md:flex-row gap-4">
                {/* Location */}
                <div className="flex-1">
                  <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                    <MapPin className="h-3 w-3" /> Location
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => setLocation(loc)}
                        className={`text-xs rounded-full px-3 py-1.5 border transition-colors ${
                          location === loc
                            ? "border-primary bg-primary/10 text-primary font-semibold"
                            : "border-border/50 text-muted-foreground hover:text-foreground hover:border-border"
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Job Type */}
                <div className="flex-1">
                  <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                    <Briefcase className="h-3 w-3" /> Job Type
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {jobTypes.map((jt) => (
                      <button
                        key={jt}
                        onClick={() => setJobType(jt)}
                        className={`text-xs rounded-full px-3 py-1.5 border transition-colors ${
                          jobType === jt
                            ? "border-primary bg-primary/10 text-primary font-semibold"
                            : "border-border/50 text-muted-foreground hover:text-foreground hover:border-border"
                        }`}
                      >
                        {jt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Salary */}
                <div className="flex-1">
                  <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                    <IndianRupee className="h-3 w-3" /> Min Salary
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {salaryRanges.map((sr) => (
                      <button
                        key={sr.label}
                        onClick={() => setSalaryFilter(sr.min)}
                        className={`text-xs rounded-full px-3 py-1.5 border transition-colors ${
                          salaryFilter === sr.min
                            ? "border-primary bg-primary/10 text-primary font-semibold"
                            : "border-border/50 text-muted-foreground hover:text-foreground hover:border-border"
                        }`}
                      >
                        {sr.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear */}
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="self-end flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-3 w-3" /> Clear all
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count */}
        <p className="text-xs text-muted-foreground mb-4">
          Showing <span className="font-semibold text-foreground">{filtered.length}</span> role{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Role Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((role, i) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                to={`/role/${role.id}`}
                className={`glass-card-hover p-5 block cursor-pointer ${role.matchPercent < 60 ? "opacity-60" : ""}`}
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
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.06 }}
                  />
                </div>
                <p className="flex items-center gap-1 text-xs text-primary mt-2">
                  <TrendingUp className="h-3 w-3" /> {role.trend}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-sm">No roles match your current filters.</p>
            <button onClick={clearFilters} className="text-primary text-sm font-semibold mt-2 hover:underline">
              Clear all filters
            </button>
          </div>
        )}

        {/* Load More */}
        {filtered.length > 0 && (
          <div className="flex justify-center mt-10">
            <button className="flex items-center gap-2 text-sm font-medium border border-border/50 rounded-xl px-6 py-3 hover:border-primary/50 hover:text-primary transition-colors">
              <ChevronDown className="h-4 w-4" /> Load More Career Paths
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default RoleHub;
