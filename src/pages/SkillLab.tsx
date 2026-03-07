import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, X, Code, Database, BarChart3, Brain, Layers,
  Settings, Plus, Minus, Maximize2, Grid3X3, TrendingUp,
  MessageSquare, Users, Target, Handshake, BrainCircuit
} from "lucide-react";
import { DashboardNav } from "@/components/DashboardNav";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

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
  evidence_array?: string[];
}

const sizeMap = { lg: 110, md: 80, sm: 60 };

const SkillLab = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState<SkillNode[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selected, setSelected] = useState<SkillNode | null>(null);
  const [activeFilter, setActiveFilter] = useState<SkillCategory>("all");
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.2, 2));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.4));
  const handleReset = () => setZoom(1);

  useEffect(() => {
    const fetchSkills = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from("vw_user_skill_profile_enriched")
          .select("*")
          .eq("user_id", user.id);

        if (error) throw error;
        
        let topSkillsData: any[] = [];
        try {
           const { data: tsData } = await supabase.from("v_top_skills").select("*").limit(100);
           if (tsData) topSkillsData = tsData;
        } catch (e) {
           console.log("Failed to load v_top_skills, using baseline");
        }
        
        const maxDemand = topSkillsData.length > 0 ? Math.max(...topSkillsData.map((s: any) => Number(s.demand_count) || 0)) : 100;

        // Algorithmic layout mapper
        const mappedSkills: SkillNode[] = (data || []).map((row: any, i: number, arr: any[]) => {
          // Calculate angle for radial distribution
          const angle = (i / arr.length) * Math.PI * 2;
          
          let radius = 20; // Default exact middle cluster
          let prof = 50;
          let nodeType: "core" | "adjacent" | "gap" = "adjacent";
          let sz: "lg" | "md" | "sm" = "md";
          
          if (row.competency_level === 3) {
            radius = 15; // Tightly packed in center
            prof = 95;
            nodeType = "core";
            sz = "lg";
          } else if (row.competency_level === 2) {
            radius = 35; // Orbiting cleanly
            prof = 66;
            nodeType = "adjacent";
            sz = "md";
          } else if (row.competency_level === 1) {
            radius = 45; // Furthest out
            prof = 33;
            nodeType = "gap";
            sz = "sm";
          }

          // Offset slightly so they don't form a perfect uniform ring
          radius = radius + (Math.random() * 8 - 4);

          // Convert polar to cartesian (scaled to 0-100% boundary box where 50,50 is center)
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);

          // Randomly assign icons based on abstract categories for now
          const catStr = (row.category_name || "").toLowerCase();
          let icon = BrainCircuit;
          let catEnum: SkillCategory = "technical";
          
          if (catStr.includes("data") || catStr.includes("sql")) { icon = Database; catEnum = "domain"; }
          else if (catStr.includes("soft") || catStr.includes("lead")) { icon = Users; catEnum = "soft"; }
          else if (catStr.includes("python") || catStr.includes("java")) { icon = Code; catEnum = "technical"; }

          // Try parsing JSON or split by pipe if it's the raw string we saved
          let evArray: string[] = [];
          if (row.evidence) {
             if (typeof row.evidence === 'string' && row.evidence.includes('|')) {
                 evArray = row.evidence.split('|').map((s: string) => s.trim());
             } else {
                 evArray = [String(row.evidence)];
             }
          }
          
          let demandStr = "+12%"; // baseline
          let targetLvl = "Intermediate";
          
          const match = topSkillsData.find((s: any) => (s.skill_name || "").toUpperCase() === (row.skill_name || "").toUpperCase());
          if (match && Number(match.demand_count) > 0) {
             const maxD = maxDemand < 1 ? 1 : maxDemand;
             const pct = Math.round((Number(match.demand_count) / maxD) * 100);
             if (pct > 0) {
                 demandStr = "+" + pct + "%";
                 if (pct > 75) targetLvl = "Expert";
                 else if (pct > 40) targetLvl = "Advanced";
             }
          }

          return {
            id: row.skill_id,
            label: row.skill_name || "Unknown Skill",
            icon: icon,
            x: x,
            y: y,
            size: sz,
            type: nodeType,
            proficiency: prof,
            category: catEnum,
            marketDemand: demandStr,
            careerMatch: "85%", // To be updated next
            targetLevel: targetLvl,
            evidence_array: evArray
          };
        });
        
        const avgAll = Math.round(mappedSkills.reduce((s, n) => s + n.proficiency, 0) / (mappedSkills.length || 1));
        const finalMapped = mappedSkills.map(m => ({...m, careerMatch: avgAll + "%"}));

        setSkills(finalMapped);
      } catch (err) {
        console.error("Failed to load skills:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, [user]);

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

  const filteredNodes = activeFilter === "all" ? skills : skills.filter((n) => n.category === activeFilter);
  const filteredIds = new Set(filteredNodes.map((n) => n.id));

  // Aggregate stats
  const avgProficiency = skills.length > 0 ? Math.round(skills.reduce((s, n) => s + n.proficiency, 0) / skills.length) : 0;
  const expertCount = skills.filter((n) => n.proficiency >= 75).length;
  const gapCount = skills.filter((n) => n.proficiency < 15).length;
  const strongestSkill = skills.length > 0 ? [...skills].sort((a, b) => b.proficiency - a.proficiency)[0] : null;
  const weakestSkill = skills.length > 0 ? [...skills].sort((a, b) => a.proficiency - b.proficiency)[0] : null;

  const getNodePos = (id: string) => {
    const node = skills.find((n) => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  if (!user || loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-aqua/30 border-t-aqua rounded-full animate-spin mb-4" />
        <p className="text-muted-foreground font-display tracking-widest uppercase">Initializing Canvas...</p>
      </div>
    );
  }

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
            <h1 className="text-2xl md:text-3xl font-display font-bold">Skill <span className="text-gradient">Lab</span></h1>
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
                { label: "Expert Skills", value: expertCount, sub: `of ${skills.length}`, color: "hsl(142, 71%, 45%)" },
                { label: "Skill Gaps", value: gapCount, sub: "need focus", color: "hsl(0, 84%, 60%)" },
                { label: "Strongest", value: strongestSkill?.label || "None", sub: `${strongestSkill?.proficiency || 0}%`, color: "hsl(142, 71%, 45%)" },
                { label: "Weakest", value: weakestSkill?.label || "None", sub: `${weakestSkill?.proficiency || 0}%`, color: "hsl(0, 84%, 60%)" },
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
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeFilter === f.value
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
                  {skills.map((nodeA) => {
                    return skills.map((nodeB) => {
                      if (nodeA.id >= nodeB.id || nodeA.category !== nodeB.category) return null;
                      
                      const dimmed = !filteredIds.has(nodeA.id) || !filteredIds.has(nodeB.id);
                      if (dimmed) return null;
                      
                      const isGap = nodeA.type === "gap" || nodeB.type === "gap";
                      
                      return (
                        <line 
                          key={`${nodeA.id}-${nodeB.id}`} 
                          x1={`${nodeA.x}%`} y1={`${nodeA.y}%`} 
                          x2={`${nodeB.x}%`} y2={`${nodeB.y}%`}
                          stroke={isGap ? "hsl(var(--aqua) / 0.15)" : "hsl(var(--aqua) / 0.3)"} 
                          strokeWidth="1.5"
                          strokeDasharray={isGap ? "6 4" : "none"} 
                        />
                      );
                    });
                  })}
                </svg>

                {skills.map((node) => {
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
                          <div className={`relative w-full h-full rounded-full flex flex-col items-center justify-center border-2 transition-all duration-300`}
                            style={{
                              borderColor: isSelected ? profLevel.color : `${profLevel.color}80`,
                              backgroundColor: isSelected ? `${profLevel.color}22` : `${profLevel.color}0D`,
                              boxShadow: isSelected ? `0 0 25px ${profLevel.color}4D` : "none",
                            }}>
                            <node.icon className={`${node.size === "lg" ? "h-6 w-6" : node.size === "md" ? "h-5 w-5" : "h-4 w-4"} transition-colors`} style={{ color: profLevel.color }} />
                            <span className={`${node.size === "lg" ? "text-xs mt-1.5" : "text-[10px] mt-1"} font-semibold`} style={{ color: profLevel.color }}>{node.label}</span>
                            {node.tag && (
                              <span className={`text-[8px] font-bold uppercase tracking-wider mt-0.5 px-1.5 py-0.5 rounded-full ${node.tag === "TOP TREND" ? "bg-aqua/20 text-aqua"
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

                  {selected.evidence_array && selected.evidence_array.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xs font-display font-bold uppercase tracking-widest mb-4">Extracted Context</h3>
                      <div className="space-y-3">
                        {selected.evidence_array.map((ev, i) => (
                          <div key={i} className="flex items-start gap-3 glass-card p-3 rounded-xl border border-border/30">
                            <span className="w-5 h-5 rounded-full bg-aqua/15 text-aqua text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                            <div>
                              <p className="text-xs text-muted-foreground italic">&ldquo;{ev}&rdquo;</p>
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
