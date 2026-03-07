import { useState } from "react";
import { Link } from "react-router-dom";
import { DashboardNav } from "@/components/DashboardNav";
import { Footer } from "@/components/Footer";
import { Search, SlidersHorizontal, TrendingUp, ChevronDown, BarChart3, X, MapPin, Briefcase, IndianRupee, Eye, CheckCircle, AlertTriangle, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  description: string;
  whyFit: string[];
  skillsNeeded: { name: string; have: boolean }[];
}

const roles: RoleCard[] = [
  {
    id: "1", title: "AI Solutions Architect", matchPercent: 95, salaryRange: "₹35L - ₹60L", salaryMin: 35, type: "Full-time", location: "Remote", trending: true, tags: ["LLMs", "Cloud Infra"], demand: "High Demand", tier: "Tier 1 MNCs", trend: "Strong Market Uptrend",
    description: "Design and implement end-to-end AI solutions spanning cloud infrastructure, LLM orchestration, and enterprise integration.",
    whyFit: ["Strong system design background", "Cloud infrastructure expertise", "Product-engineering bridge skills"],
    skillsNeeded: [{ name: "System Design", have: true }, { name: "Cloud (AWS/GCP)", have: true }, { name: "LLM Fine-tuning", have: false }, { name: "Vector Databases", have: false }, { name: "RAG Orchestration", have: false }],
  },
  {
    id: "2", title: "Technical Product Manager", matchPercent: 88, salaryRange: "₹28L - ₹45L", salaryMin: 28, type: "Hybrid", location: "Bangalore", trending: true, tags: ["Agile", "Strategy"], demand: "Growth Stage", tier: "Startups", trend: "Rapidly Emerging",
    description: "Own the product roadmap for AI-powered features, translating complex technical capabilities into user-centric experiences.",
    whyFit: ["Agile product management skills", "Technical background", "Cross-functional collaboration"],
    skillsNeeded: [{ name: "Agile/Scrum", have: true }, { name: "Product Strategy", have: true }, { name: "AI Product Metrics", have: false }, { name: "Prompt Engineering", have: false }, { name: "A/B Testing for AI", have: false }],
  },
  {
    id: "3", title: "Data Strategist", matchPercent: 82, salaryRange: "₹22L - ₹40L", salaryMin: 22, type: "Contract", location: "Remote", trending: true, tags: ["Data Viz", "Big Query"], demand: "High Demand", tier: "Tech Giants", trend: "Stable Growth",
    description: "Transform raw data into strategic business insights using advanced analytics, visualization, and AI-driven forecasting.",
    whyFit: ["Data visualization proficiency", "BigQuery and analytics tools", "Business intelligence mindset"],
    skillsNeeded: [{ name: "Data Visualization", have: true }, { name: "BigQuery/SQL", have: true }, { name: "Advanced ML Models", have: false }, { name: "Data Governance", have: false }, { name: "Real-time Analytics", have: false }],
  },
  {
    id: "4", title: "ML Platform Engineer", matchPercent: 78, salaryRange: "₹22L - ₹40L", salaryMin: 22, type: "Full-time", location: "Hyderabad", trending: true, tags: ["MLOps", "Kubernetes"], demand: "High Demand", tier: "Tech Giants", trend: "Stable Growth",
    description: "Build and maintain scalable ML infrastructure, including model training pipelines, feature stores, and deployment systems.",
    whyFit: ["Cloud infrastructure skills", "Python proficiency", "DevOps understanding"],
    skillsNeeded: [{ name: "Python", have: true }, { name: "Docker/K8s", have: true }, { name: "MLOps Pipelines", have: false }, { name: "Feature Engineering", have: false }, { name: "Model Monitoring", have: false }],
  },
  {
    id: "5", title: "GenAI Product Lead", matchPercent: 85, salaryRange: "₹20L - ₹38L", salaryMin: 20, type: "Full-time", location: "Bangalore", trending: true, tags: ["GenAI", "Product"], demand: "Growth Stage", tier: "Startups", trend: "Rapidly Emerging",
    description: "Lead the strategy and execution for generative AI products, from ideation through launch.",
    whyFit: ["Product leadership experience", "AI domain understanding", "User-centric design thinking"],
    skillsNeeded: [{ name: "Product Management", have: true }, { name: "GenAI Concepts", have: true }, { name: "GenAI Evaluation", have: false }, { name: "Responsible AI", have: false }, { name: "LLM Cost Optimization", have: false }],
  },
  {
    id: "6", title: "Operations Manager", matchPercent: 43, salaryRange: "₹18L - ₹25L", salaryMin: 18, type: "Full-time", location: "Mumbai", trending: false, tags: [], demand: "Moderate", tier: "Mid-size", trend: "Flat",
    description: "Manage day-to-day operations, optimize workflows, and drive process improvements across teams.",
    whyFit: ["Organizational skills", "Process optimization mindset"],
    skillsNeeded: [{ name: "Process Design", have: true }, { name: "Operations Analytics", have: false }, { name: "Supply Chain AI", have: false }, { name: "Automation Tools", have: false }, { name: "Six Sigma", have: false }],
  },
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
  const [viewRole, setViewRole] = useState<RoleCard | null>(null);
  const [addedToPath, setAddedToPath] = useState<Set<string>>(new Set());

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

  const handleAddToPath = (roleId: string) => {
    setAddedToPath((prev) => new Set(prev).add(roleId));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardNav />

      <main className="flex-1 container max-w-5xl py-10 md:py-16 px-4">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">Role <span className="text-gradient">Hub</span></h1>
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
            className={`flex items-center gap-1.5 text-xs transition-colors border-l border-border/50 pl-3 ${showFilters || activeFilterCount > 0
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
                <div className="flex-1">
                  <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                    <MapPin className="h-3 w-3" /> Location
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {locations.map((loc) => (
                      <button key={loc} onClick={() => setLocation(loc)}
                        className={`text-xs rounded-full px-3 py-1.5 border transition-colors ${location === loc ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border/50 text-muted-foreground hover:text-foreground hover:border-border"}`}>
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                    <Briefcase className="h-3 w-3" /> Job Type
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {jobTypes.map((jt) => (
                      <button key={jt} onClick={() => setJobType(jt)}
                        className={`text-xs rounded-full px-3 py-1.5 border transition-colors ${jobType === jt ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border/50 text-muted-foreground hover:text-foreground hover:border-border"}`}>
                        {jt}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                    <IndianRupee className="h-3 w-3" /> Min Salary
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {salaryRanges.map((sr) => (
                      <button key={sr.label} onClick={() => setSalaryFilter(sr.min)}
                        className={`text-xs rounded-full px-3 py-1.5 border transition-colors ${salaryFilter === sr.min ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border/50 text-muted-foreground hover:text-foreground hover:border-border"}`}>
                        {sr.label}
                      </button>
                    ))}
                  </div>
                </div>
                {activeFilterCount > 0 && (
                  <button onClick={clearFilters} className="self-end flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
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
              className={`glass-card-hover p-5 ${role.matchPercent < 60 ? "opacity-60" : ""}`}
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
              <div className="flex items-center justify-between mt-3">
                <p className="flex items-center gap-1 text-xs text-primary">
                  <TrendingUp className="h-3 w-3" /> {role.trend}
                </p>
                <button
                  onClick={() => setViewRole(role)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  <Eye className="h-3.5 w-3.5" /> View
                </button>
              </div>
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

        {filtered.length > 0 && (
          <div className="flex justify-center mt-10">
            <button className="flex items-center gap-2 text-sm font-medium border border-border/50 rounded-xl px-6 py-3 hover:border-primary/50 hover:text-primary transition-colors">
              <ChevronDown className="h-4 w-4" /> Load More Career Paths
            </button>
          </div>
        )}
      </main>

      {/* Role Detail Dialog */}
      <Dialog open={!!viewRole} onOpenChange={(open) => !open && setViewRole(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto bg-background border-border/50">
          {viewRole && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-1">
                  <BarChart3 className="h-7 w-7 text-primary flex-shrink-0" />
                  <div>
                    <DialogTitle className="font-display text-xl font-bold">{viewRole.title}</DialogTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">{viewRole.type} • {viewRole.location} • {viewRole.demand}</p>
                  </div>
                </div>
              </DialogHeader>

              <div className="flex items-center justify-between bg-muted/50 rounded-xl p-3 mt-2">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Match Score</p>
                  <p className={`text-2xl font-display font-bold ${viewRole.matchPercent >= 80 ? "text-neon" : viewRole.matchPercent >= 60 ? "text-secondary" : "text-muted-foreground"}`}>
                    {viewRole.matchPercent}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Salary Range</p>
                  <p className="text-lg font-display font-bold text-secondary">{viewRole.salaryRange}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mt-4">{viewRole.description}</p>

              {/* Skills Needed vs Gap */}
              <div className="mt-5">
                <h3 className="text-xs font-display font-bold uppercase tracking-widest mb-3">Skills Needed vs Your Profile</h3>
                <div className="space-y-2">
                  {viewRole.skillsNeeded.map((skill) => (
                    <div key={skill.name} className="flex items-center justify-between bg-muted/40 rounded-lg px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        {skill.have ? (
                          <CheckCircle className="h-4 w-4 text-neon flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium">{skill.name}</span>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${skill.have
                        ? "bg-neon/10 text-neon"
                        : "bg-destructive/10 text-destructive"
                        }`}>
                        {skill.have ? "Acquired" : "Gap"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why You Fit */}
              <div className="mt-5">
                <h3 className="text-xs font-display font-bold uppercase tracking-widest mb-3">Why You're a Fit</h3>
                <div className="space-y-2">
                  {viewRole.whyFit.map((reason) => (
                    <div key={reason} className="flex items-start gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 space-y-3">
                {addedToPath.has(viewRole.id) ? (
                  <div className="flex items-center justify-center gap-2 w-full rounded-xl bg-neon/10 border border-neon/30 py-3 text-sm font-semibold text-neon">
                    <CheckCircle className="h-4 w-4" /> Added to Career Path
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddToPath(viewRole.id)}
                    className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary text-primary-foreground py-3 text-sm font-bold hover:bg-primary/90 transition-colors"
                  >
                    <ArrowRight className="h-4 w-4" /> Add to Career Path
                  </button>
                )}
                <Link
                  to={`/role/${viewRole.id}`}
                  className="flex items-center justify-center w-full rounded-xl border border-border/50 py-3 text-sm font-semibold text-foreground hover:border-primary/50 transition-colors"
                  onClick={() => setViewRole(null)}
                >
                  View Full Details
                </Link>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default RoleHub;
