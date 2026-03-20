import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, TrendingUp, CheckCircle, Sparkles, BarChart3, Target, AlertTriangle, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

const PERSONA_CONTENT: Record<string, { desc: string; image: string; title: string[] }> = {
  "Emerging Builder": {
    desc: "You are an Emerging Builder. You thrive on exploration, fast learning, and getting your hands dirty building the future. Short-term growth and iteration are your superpowers.",
    image: "/personas/emerging_builder",
    title: ["The Emerging", "Builder"],
  },
  "Strategic Climber": {
    desc: "You are a Strategic Climber. Focused, analytical, and ready to optimize complex systems. You have a knack for leadership and structured career advancement.",
    image: "/personas/strategic_climber",
    title: ["The Strategic", "Climber"],
  },
  "Purpose Architect": {
    desc: "You are a Purpose Architect. You build with meaning, aiming for long-term impact and human-centered design. Aligning your career with your deep personal values is essential.",
    image: "/personas/purpose_architect",
    title: ["The Purpose", "Architect"],
  },
  "Growth Explorer": {
    desc: "You are a Growth Explorer (EB + SC mix). You balance rapid experimentation with ambitious, structured career strategy. You can build fast and scale smart.",
    image: "/personas/growth_explorer",
    title: ["The Growth", "Explorer"],
  },
  "Strategic Visionary": {
    desc: "You are a Strategic Visionary (SC + PA mix). You combine sharp analytical leadership with a profound desire to build meaningful, human-centric solutions.",
    image: "/personas/strategic_visionary",
    title: ["The Strategic", "Visionary"],
  },
  "Purpose Explorer": {
    desc: "You are a Purpose Explorer (EB + PA mix). You lean into rapidly building innovative products, but always ensure they serve a larger, impact-driven mission.",
    image: "/personas/purpose_explorer",
    title: ["The Purpose", "Explorer"],
  },
};

const roleMatches = [
  { title: "AI Solutions Architect", match: 98, demand: "High Demand", tier: "Tier 1 MNCs", salary: "₹25L - ₹45L", trend: "Strong Market Uptrend", icon: "🎯" },
  { title: "GenAI Product Lead", match: 85, demand: "Growth Stage", tier: "Startups", salary: "₹20L - ₹38L", trend: "Rapidly Emerging", icon: "📊" },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [personaData, setPersonaData] = useState<any>(null);
  const [loadingPersona, setLoadingPersona] = useState(true);

  useEffect(() => {
    async function fetchPersona() {
      if (!user) {
        setLoadingPersona(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('discovery_persona')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error("Error fetching persona:", error);
        } else if (data && data.discovery_persona) {
          setPersonaData(data.discovery_persona);
        }
      } catch (err) {
        console.error("Unexpected error fetching persona:", err);
      } finally {
        setLoadingPersona(false);
      }
    }

    fetchPersona();
  }, [user]);

  const personaContent = personaData && PERSONA_CONTENT[personaData.persona] 
    ? PERSONA_CONTENT[personaData.persona] 
    : null;

  return (
    <div className="min-h-screen bg-background">
      
      <div className="container py-8 md:py-12">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-1">Career <span className="text-gradient">Dashboard</span></h1>
          <p className="text-sm text-muted-foreground">Your personalized roadmap to the future of Indian Tech, powered by advanced generative AI.</p>
        </motion.div>

        {/* Persona + Career Path */}
        <div className="grid lg:grid-cols-5 gap-6 mb-8">
          {/* Persona Card */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2">
            <div className="glass-card p-6 h-full flex flex-col">
              {loadingPersona ? (
                <div className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
                  <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
                  <p className="text-sm font-semibold text-muted-foreground animate-pulse">Loading Identity Matrix...</p>
                </div>
              ) : !personaContent ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center min-h-[300px]">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2">Discover Your Edge</h3>
                  <p className="text-sm text-muted-foreground mb-6 max-w-[250px]">
                    Take the 60-second assessment to unlock your personalized AI product career roadmap.
                  </p>
                  <Link to="/assessment" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                    Take Assessment <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <>
                  <div className="relative bg-muted rounded-xl h-48 sm:h-56 flex items-center justify-center mb-5 overflow-hidden border border-border/50">
                    <span className="absolute top-3 right-3 z-10 text-xs font-semibold text-neon bg-background/80 backdrop-blur-md border border-neon/30 rounded-full px-2.5 py-0.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon shadow-[0_0_8px_rgba(var(--neon),0.8)]" /> 94% Confidence
                    </span>
                    <img 
                      src={`${personaContent.image}.png`}
                      alt={personaData.persona}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                         e.currentTarget.style.display = 'none';
                         e.currentTarget.parentElement!.innerHTML = '<div class="absolute inset-0 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary opacity-50"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg></div>';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">Primary Persona</p>
                  <h3 className="text-2xl font-display font-bold mb-3">{personaContent.title.join(" ")}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    {personaContent.desc}
                  </p>
                  <Link to="/persona" state={{ result: personaData }} className="inline-flex items-center gap-2 w-full justify-center rounded-full bg-muted py-3 text-sm font-semibold hover:bg-muted/80 transition-colors mt-auto">
                    Full Persona Analysis <ArrowRight className="h-4 w-4" />
                  </Link>
                </>
              )}
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
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2 ${step.done ? "bg-secondary/20 border-secondary text-secondary"
                          : step.active ? "bg-primary/20 border-primary text-primary animate-pulse"
                            : "bg-muted border-border text-muted-foreground"
                        }`}>
                        {step.done ? <CheckCircle className="h-5 w-5" /> : step.active ? <Target className="h-4 w-4" /> : <span className="w-2 h-2 rounded-full bg-muted-foreground" />}
                      </div>
                      <span className="text-[10px] md:text-xs font-medium leading-tight">{step.label}</span>
                      <span className={`text-[9px] md:text-[10px] uppercase tracking-wider mt-0.5 ${step.done ? "text-secondary" : step.active ? "text-primary" : "text-muted-foreground"
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
          <div className="glass-card p-5 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Critical Skill Gaps</p>
              <AlertTriangle className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-2.5 flex-1">
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
                  <p className="text-[10px] text-muted-foreground">Critical for pipeline architecture</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-muted rounded-lg p-3">
                <Sparkles className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-semibold">RAG Architecture</p>
                  <p className="text-[10px] text-muted-foreground">Emerging requirement in 72% of listings</p>
                </div>
              </div>
            </div>
            <Link to="/skill-lab" className="text-xs font-semibold text-primary hover:underline mt-3">View SkillLab</Link>
          </div>

          {/* Hyper-Local Analysis */}
          <div className="glass-card p-5 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Growth: Bengaluru</p>
              <TrendingUp className="h-4 w-4 text-secondary" />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-semibold">AI Product Manager</span>
              <span className="text-xs font-bold text-secondary">+24.8% YoY</span>
            </div>
            <div className="flex items-end gap-1.5 flex-1 min-h-[100px] mb-3">
              {[35, 45, 50, 60, 70, 80, 95].map((h, i) => (
                <motion.div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-secondary/60 to-secondary" initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }} />
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground italic mb-3">"Concentrated demand surge in Indiranagar and Whitefield clusters."</p>
            <Link to="/market" className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground hover:text-primary transition-colors mt-auto">
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
