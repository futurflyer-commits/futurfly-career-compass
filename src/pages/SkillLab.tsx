import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, X, Code, Database, BarChart3, Brain, Layers,
  Settings, Plus, Minus, Maximize2, Grid3X3, TrendingUp,
  MessageSquare, Users, Target, Handshake,
} from "lucide-react";
import { DashboardNav } from "@/components/DashboardNav";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type SkillCategory = "all" | "technical" | "domain" | "soft";

interface SkillNode {
  id: string;
  label: string;
  icon: React.ElementType;
  x: number;
  y: number;
  size: "lg" | "md" | "sm";
  type: "core" | "adjacent" | "gap";
  proficiency: number;
  category: SkillCategory;
  tag?: string;
  marketDemand?: string;
  careerMatch?: string;
  targetLevel?: string;
  modules?: { title: string; count: number; duration: string }[];
}

const skillNodes: SkillNode[] = [
  // === DOMAIN (3) ===
  {
    id: "core", label: "Core Skillset", icon: Layers, x: 42, y: 48, size: "lg", type: "core", proficiency: 78, category: "domain",
    tag: "DATA SCIENCE", marketDemand: "+62%", careerMatch: "88%", targetLevel: "Expert",
    modules: [
      { title: "Advanced Statistical Methods", count: 5, duration: "4h 20m" },
      { title: "Feature Engineering Mastery", count: 4, duration: "3h 10m" },
    ],
  },
  {
    id: "dataviz", label: "Data Viz", icon: BarChart3, x: 28, y: 75, size: "md", type: "core", proficiency: 65, category: "domain",
    marketDemand: "+32%", careerMatch: "70%", targetLevel: "Advanced",
    modules: [{ title: "Interactive Dashboard Design", count: 4, duration: "3h 30m" }],
  },
  {
    id: "bizstrat", label: "Biz Strategy", icon: Target, x: 55, y: 80, size: "sm", type: "adjacent", proficiency: 42, category: "domain",
    marketDemand: "+38%", careerMatch: "65%", targetLevel: "Advanced",
    modules: [{ title: "Data-Driven Decision Making", count: 3, duration: "2h 40m" }],
  },

  // === TECHNICAL (4) ===
  {
    id: "python", label: "Python", icon: Code, x: 18, y: 32, size: "md", type: "adjacent", proficiency: 72, category: "technical",
    marketDemand: "+45%", careerMatch: "85%", targetLevel: "Advanced",
    modules: [
      { title: "Python for ML Pipelines", count: 6, duration: "5h 15m" },
      { title: "Async & Concurrency Patterns", count: 3, duration: "2h 45m" },
    ],
  },
  {
    id: "llms", label: "LLMs", icon: Brain, x: 60, y: 22, size: "md", type: "adjacent", proficiency: 25, category: "technical",
    tag: "TOP TREND", marketDemand: "+84%", careerMatch: "92%", targetLevel: "Expert",
    modules: [
      { title: "Transformer Architecture Basics", count: 4, duration: "2h 30m" },
      { title: "Fine-tuning Strategies", count: 6, duration: "5h 15m" },
    ],
  },
  {
    id: "sql", label: "SQL", icon: Database, x: 12, y: 60, size: "md", type: "core", proficiency: 80, category: "technical",
    marketDemand: "+28%", careerMatch: "76%", targetLevel: "Advanced",
    modules: [{ title: "Window Functions & CTEs", count: 3, duration: "2h" }],
  },
  {
    id: "mlops", label: "MLOps", icon: Settings, x: 80, y: 38, size: "sm", type: "gap", proficiency: 10, category: "technical",
    tag: "GROWTH GAP", marketDemand: "+91%", careerMatch: "88%", targetLevel: "Intermediate",
    modules: [
      { title: "CI/CD for ML Models", count: 5, duration: "4h" },
      { title: "Model Monitoring & Drift", count: 3, duration: "2h 30m" },
    ],
  },

  // === SOFT SKILLS (3) ===
  {
    id: "communication", label: "Communication", icon: MessageSquare, x: 72, y: 62, size: "md", type: "core", proficiency: 70, category: "soft",
    marketDemand: "+40%", careerMatch: "82%", targetLevel: "Expert",
    modules: [{ title: "Stakeholder Communication", count: 3, duration: "2h 15m" }],
  },
  {
    id: "leadership", label: "Leadership", icon: Users, x: 88, y: 50, size: "sm", type: "adjacent", proficiency: 45, category: "soft",
    marketDemand: "+50%", careerMatch: "78%", targetLevel: "Advanced",
    modules: [{ title: "Leading Cross-functional Teams", count: 4, duration: "3h" }],
  },
  {
    id: "collab", label: "Collaboration", icon: Handshake, x: 75, y: 82, size: "sm", type: "core", proficiency: 76, category: "soft",
    marketDemand: "+30%", careerMatch: "75%", targetLevel: "Advanced",
    modules: [{ title: "Remote Team Collaboration", count: 2, duration: "1h 45m" }],
  },
];

const connections: [string, string][] = [
  ["core", "python"], ["core", "llms"], ["core", "sql"], ["core", "dataviz"],
  ["core", "mlops"], ["core", "communication"], ["llms", "mlops"],
  ["dataviz", "bizstrat"], ["communication", "leadership"], ["communication", "collab"],
  ["sql", "dataviz"], ["bizstrat", "collab"],
];

const sizeMap = { lg: 110, md: 80, sm: 60 };

const SkillLab = () => {
  const [selected, setSelected] = useState<SkillNode | null>(null);
  const [activeFilter, setActiveFilter] = useState<SkillCategory>("all");
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.2, 2));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.4));
  const handleReset = () => setZoom(1);

  const filters: { value: SkillCategory; label: string }[] = [
    { value: "all", label: "All" },
    { value: "technical", label: "Technical" },
    { value: "domain", label: "Domain" },
    { value: "soft", label: "Soft Skills" },
  ];

  const proficiencyLevels = [
    { label: "Expert", color: "hsl(142, 71%, 45%)", min: 75 },
    { label: "Intermediate", color: "hsl(217, 91%, 60%)", min: 40 },
    { label: "Novice", color: "hsl(38, 92%, 50%)", min: 15 },
    { label: "Missing / Gap", color: "hsl(0, 84%, 60%)", min: 0 },
  ];

  const getProficiencyLevel = (p: number) => proficiencyLevels.find((l) => p >= l.min)!;

  const filteredNodes = activeFilter === "all" ? skillNodes : skillNodes.filter((n) => n.category === activeFilter);
  const filteredIds = new Set(filteredNodes.map((n) => n.id));

  // Aggregate stats
  const avgProficiency = Math.round(skillNodes.reduce((s, n) => s + n.proficiency, 0) / skillNodes.length);
  const expertCount = skillNodes.filter((n) => n.proficiency >= 75).length;
  const gapCount = skillNodes.filter((n) => n.proficiency < 15).length;
  const strongestSkill = [...skillNodes].sort((a, b) => b.proficiency - a.proficiency)[0];
  const weakestSkill = [...skillNodes].sort((a, b) => a.proficiency - b.proficiency)[0];

  const getNodePos = (id: string) => {
    const node = skillNodes.find((n) => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="flex pt-16 h-screen">
        {/* Left icon sidebar */}
        <div className="hidden md:flex flex-col items-center w-16 border-r border-border/30 py-6 gap-4">
          {[Grid3X3, Layers, Brain, BarChart3].map((Icon, i) => (
            <button key={i} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${i === 1 ? "bg-aqua/20 text-aqua" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"}`}>
              <Icon className="h-5 w-5" />
            </button>
          ))}
          <div className="mt-auto">
            <button className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-6 md:px-10 pt-6 pb-4">
            <h1 className="text-2xl md:text-3xl font-display font-bold">SkillLab</h1>
            <p className="text-sm text-muted-foreground mt-1">Visualize your expertise and plot your next move.</p>

            {/* Overall proficiency summary */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-5">
              <div className="glass-card p-4 rounded-xl flex items-center gap-3 col-span-2 md:col-span-1">
                <div className="relative w-12 h-12 shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 44 44">
                    <circle cx="22" cy="22" r="18" fill="none" stroke="hsl(var(--border) / 0.3)" strokeWidth="4" />
                    <circle cx="22" cy="22" r="18" fill="none" stroke={getProficiencyLevel(avgProficiency).color} strokeWidth="4"
                      strokeDasharray={`${avgProficiency * 1.13} ${113 - avgProficiency * 1.13}`} strokeLinecap="round" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">{avgProficiency}%</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Overall</p>
                  <p className="text-sm font-display font-bold">Proficiency</p>
                </div>
              </div>
              {[
                { label: "Expert Skills", value: expertCount, sub: `of ${skillNodes.length}`, color: "hsl(142, 71%, 45%)" },
                { label: "Skill Gaps", value: gapCount, sub: "need focus", color: "hsl(0, 84%, 60%)" },
                { label: "Strongest", value: strongestSkill.label, sub: `${strongestSkill.proficiency}%`, color: "hsl(142, 71%, 45%)" },
                { label: "Weakest", value: weakestSkill.label, sub: `${weakestSkill.proficiency}%`, color: "hsl(0, 84%, 60%)" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-4 rounded-xl">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-lg font-display font-bold" style={{ color: stat.color }}>{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground">{stat.sub}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-between mt-5 gap-4">
              <div className="flex items-center gap-2">
                {filters.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setActiveFilter(f.value)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      activeFilter === f.value
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground/30"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="glass-card px-5 py-3 rounded-xl">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Proficiency</p>
                <div className="flex flex-col gap-1.5">
                  {proficiencyLevels.map((l) => (
                    <span key={l.label} className="flex items-center gap-2 text-xs text-foreground">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                      {l.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Graph */}
            <div className="flex-1 relative overflow-hidden">
              <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, hsl(var(--border) / 0.3) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

              <div className="absolute inset-0" style={{ transform: `scale(${zoom})`, transformOrigin: "center center", transition: "transform 0.3s ease" }}>

              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {connections.map(([from, to]) => {
                  if (!filteredIds.has(from) && !filteredIds.has(to)) return null;
                  const a = getNodePos(from);
                  const b = getNodePos(to);
                  const isGap = skillNodes.find((n) => n.id === from)?.type === "gap" || skillNodes.find((n) => n.id === to)?.type === "gap";
                  const dimmed = !filteredIds.has(from) || !filteredIds.has(to);
                  return (
                    <line key={`${from}-${to}`} x1={`${a.x}%`} y1={`${a.y}%`} x2={`${b.x}%`} y2={`${b.y}%`}
                      stroke={isGap ? "hsl(var(--aqua) / 0.15)" : "hsl(var(--aqua) / 0.3)"} strokeWidth="1.5"
                      strokeDasharray={isGap ? "6 4" : "none"} opacity={dimmed ? 0.2 : 1} />
                  );
                })}
              </svg>

              {skillNodes.map((node) => {
                const size = sizeMap[node.size];
                const isGap = node.type === "gap";
                const isSelected = selected?.id === node.id;
                const isVisible = filteredIds.has(node.id);
                const profLevel = getProficiencyLevel(node.proficiency);

                return (
                  <Tooltip key={node.id}>
                    <TooltipTrigger asChild>
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: isVisible ? 1 : 0.15, scale: isVisible ? 1 : 0.85 }}
                        transition={{ delay: 0.1 }}
                        onClick={() => isVisible && setSelected(node)}
                        className={`absolute group ${!isVisible ? "pointer-events-none" : ""}`}
                        style={{ left: `${node.x}%`, top: `${node.y}%`, width: size, height: size, transform: "translate(-50%, -50%)" }}
                      >
                        {/* Proficiency ring */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="47" fill="none" stroke="hsl(var(--border) / 0.2)" strokeWidth="3" />
                          <circle cx="50" cy="50" r="47" fill="none" stroke={profLevel.color} strokeWidth="3"
                            strokeDasharray={`${node.proficiency * 2.95} ${295 - node.proficiency * 2.95}`}
                            strokeLinecap="round" />
                        </svg>
                        {isGap && (
                          <>
                            <span className="absolute inset-0 rounded-full border border-aqua/40 animate-[pulse-ring_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
                            <span className="absolute -inset-2 rounded-full border border-aqua/20 animate-[pulse-ring_2s_cubic-bezier(0.4,0,0.6,1)_infinite_0.5s]" />
                          </>
                        )}
                        <div className={`relative w-full h-full rounded-full flex flex-col items-center justify-center border-2 transition-all duration-300 ${
                          isSelected ? "border-aqua bg-aqua/15 shadow-[0_0_25px_hsl(var(--aqua)/0.3)]"
                            : isGap ? "border-aqua/40 bg-aqua/5 hover:border-aqua hover:bg-aqua/10"
                              : node.type === "core" ? "border-aqua/60 bg-aqua/10 hover:border-aqua hover:bg-aqua/15"
                                : "border-border/60 bg-background/80 hover:border-aqua/50 hover:bg-aqua/5"
                        }`}>
                          <node.icon className={`${node.size === "lg" ? "h-6 w-6" : node.size === "md" ? "h-5 w-5" : "h-4 w-4"} ${
                            node.type === "core" || isSelected ? "text-aqua" : "text-muted-foreground group-hover:text-aqua"
                          } transition-colors`} />
                          <span className={`${node.size === "lg" ? "text-xs mt-1.5" : "text-[10px] mt-1"} font-semibold ${
                            node.type === "core" || isSelected ? "text-aqua" : "text-foreground"
                          }`}>{node.label}</span>
                          {node.tag && (
                            <span className={`text-[8px] font-bold uppercase tracking-wider mt-0.5 px-1.5 py-0.5 rounded-full ${
                              node.tag === "TOP TREND" ? "bg-aqua/20 text-aqua"
                                : node.tag === "GROWTH GAP" || node.tag === "NOVICE" ? "bg-primary/20 text-primary"
                                  : "bg-muted text-muted-foreground"
                            }`}>{node.tag}</span>
                          )}
                        </div>
                      </motion.button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-background/95 border-border/50 backdrop-blur-xl p-3 max-w-[200px]">
                      <p className="font-display font-bold text-sm mb-1">{node.label}</p>
                      <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                        <span>{node.type === "gap" ? "Gap" : node.type === "core" ? "Core" : "Adjacent"}</span>
                        <span>•</span>
                        <span>{node.proficiency}% proficient</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-border/30 overflow-hidden">
                        <div className="h-full rounded-full bg-aqua" style={{ width: `${node.proficiency}%` }} />
                      </div>
                      {isGap && <p className="text-[10px] text-primary mt-2 font-medium">⚡ High growth opportunity</p>}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
              </div>{/* end zoom wrapper */}

              {/* Zoom controls */}
              <div className="absolute bottom-20 left-6 flex flex-col gap-2 z-10">
                <button onClick={handleZoomIn} className="w-10 h-10 rounded-xl border border-border/50 bg-background/80 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
                <button onClick={handleZoomOut} className="w-10 h-10 rounded-xl border border-border/50 bg-background/80 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <Minus className="h-4 w-4" />
                </button>
                <button onClick={handleReset} className="w-10 h-10 rounded-xl border border-border/50 bg-background/80 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors mt-2">
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>

              {/* Legend */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-6 text-[10px] uppercase tracking-widest text-muted-foreground">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-neon" /> Current Core</span>
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-aqua" /> Adjacent Skills</span>
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-muted-foreground" /> Growth Gaps</span>
                <span className="ml-auto hidden md:block">System Status: Optimal • Last Updated: 2m ago</span>
              </div>
            </div>

            {/* Side panel */}
            <AnimatePresence>
              {selected && (
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="w-[340px] border-l border-border/30 bg-background/95 backdrop-blur-xl overflow-y-auto p-6 hidden md:block"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-aqua/20 text-aqua px-2.5 py-1 rounded-full">Selected Skill</span>
                    <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground transition-colors"><X className="h-5 w-5" /></button>
                  </div>
                  <h2 className="text-2xl font-display font-bold mb-5">{selected.label}</h2>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="glass-card p-4">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Market Demand</p>
                      <p className="text-xl font-display font-bold text-aqua">{selected.marketDemand} <TrendingUp className="inline h-4 w-4" /></p>
                    </div>
                    <div className="glass-card p-4">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Career Match</p>
                      <p className="text-xl font-display font-bold">{selected.careerMatch}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold">Expertise Level</p>
                      <p className="text-xs text-muted-foreground">Target: {selected.targetLevel}</p>
                    </div>
                    <div className="w-full h-2 rounded-full bg-border/30 overflow-hidden mb-1">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${selected.proficiency}%` }} transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-aqua to-mint" />
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{selected.proficiency}% Competency Acquired</p>
                  </div>

                  {selected.modules && selected.modules.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xs font-display font-bold uppercase tracking-widest mb-4">Recommended Path</h3>
                      <div className="space-y-3">
                        {selected.modules.map((m, i) => (
                          <div key={m.title} className="flex items-start gap-3">
                            <span className="w-7 h-7 rounded-full bg-aqua/15 text-aqua text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                            <div>
                              <p className="text-sm font-semibold">{m.title}</p>
                              <p className="text-xs text-muted-foreground">{m.count} modules · {m.duration}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <Link to="/roadmap" className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-aqua to-mint py-3.5 text-sm font-bold text-background hover:opacity-90 transition-all">
                      Start Learning Path <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link to="/market" className="flex items-center justify-center w-full rounded-xl border border-border/50 py-3.5 text-sm font-semibold text-foreground hover:border-aqua/50 transition-colors">
                      View Market Analysis
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.25); opacity: 0; }
          100% { transform: scale(1.25); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default SkillLab;
