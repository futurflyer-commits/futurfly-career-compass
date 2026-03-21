import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Settings, Grid3X3, Layers, Brain, BarChart3,
  Eye, GraduationCap, MessageSquare, Plus, DownloadCloud, Zap, ChevronRight
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { SkillGapWheel } from "@/components/SkillGapWheel";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ClusterData {
  name: string;
  score: number;
  skills: { name: string; level: number }[];
  gap: number;
}

interface WheelResponse {
  clusters: ClusterData[];
  overall_score: number;
}

const SkillLab = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [wheelData, setWheelData] = useState<WheelResponse | null>(null);
  const [showTarget, setShowTarget] = useState(true);
  const [showTargetModal, setShowTargetModal] = useState(false);
  const [targetTitle, setTargetTitle] = useState("Target Role");
  
  // Dummy target role for the UI
  const targetRoleId = "dummy-role-uuid";

  useEffect(() => {
    if (user) {
      supabase.from("profiles").select("active_role_id").eq("id", user.id).single()
      .then(({data}) => {
         if (data?.active_role_id) {
           // Basic title mapping (e.g. "role-1" -> "AI Solutions Architect")
           const titleId = data.active_role_id;
           if (titleId === "role-1") setTargetTitle("AI Solutions Architect");
           else if (titleId === "role-2") setTargetTitle("GenAI Product Lead");
           else if (titleId === "role-3") setTargetTitle("ML Engineering Manager");
           else if (titleId === "role-4") setTargetTitle("Senior MLOps Engineer");
           else setTargetTitle(titleId.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()));
         }
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchWheelData = async () => {
      if (!user) return;
      try {
        setLoading(true);
        // Call the RPC we created or the API endpoint
        // For standard Supabase usage, we use rpc. 
        // We'll pass the dummy target role logic if showTarget is true
        const { data, error } = await supabase.rpc("get_user_skill_wheel", {
          p_user_id: user.id,
          p_role_id: showTarget ? targetRoleId : null
        });

        if (error) {
          console.error("RPC Error (it may not exist yet, falling back to mock):", error);
          // MOCK DATA FALLBACK for UI visualization if SQL isn't applied yet
          setWheelData({
            overall_score: 63,
            clusters: [
              { name: "Programming", score: 8.4, gap: 1.2, skills: [{ name: "Python", level: 3 }, { name: "Rust", level: 2 }, { name: "TypeScript", level: 3 }] },
              { name: "Cloud & DevOps", score: 6.2, gap: 3.5, skills: [{ name: "AWS", level: 2 }, { name: "Kubernetes", level: 1 }, { name: "Terraform", level: 1 }] },
              { name: "AI / ML", score: 3.8, gap: 4.0, skills: [{ name: "PyTorch", level: 1 }, { name: "NLP", level: 2 }] },
              { name: "Data Engineering", score: 7.0, gap: 0.5, skills: [{ name: "Spark", level: 2 }, { name: "SQL", level: 3 }] },
              { name: "System Design", score: 5.5, gap: 2.1, skills: [{ name: "Microservices", level: 2 }] },
              { name: "Soft Skills", score: 8.0, gap: 0.0, skills: [{ name: "Leadership", level: 3 }, { name: "Communication", level: 3 }] },
            ]
          });
        } else {
          setWheelData(data as WheelResponse);
        }
      } catch (err) {
        console.error("Failed to fetch wheel data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWheelData();
  }, [user, showTarget]);

  if (!user || loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-aqua/30 border-t-aqua rounded-full animate-spin mb-4" />
        <p className="text-muted-foreground font-display tracking-widest uppercase text-sm">Initializing Telemetry...</p>
      </div>
    );
  }

  const clusters = wheelData?.clusters || [];
  const programmingCluster = clusters.find(c => c.name.includes("Programming")) || clusters[0];
  const cloudCluster = clusters.find(c => c.name.includes("Cloud")) || clusters[1];
  const aiCluster = clusters.find(c => c.name.includes("AI")) || clusters[2];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen overflow-hidden">
        {/* Left icon sidebar */}
        <div className="hidden md:flex flex-col items-center w-16 border-r border-border/50 py-6 gap-4 shrink-0 bg-background/50 backdrop-blur-md">
          {[Grid3X3, Layers, Brain, BarChart3].map((Icon, i) => (
            <button key={i} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${i === 1 ? "bg-aqua/10 text-aqua border border-aqua/20" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"}`}>
              <Icon className="h-5 w-5" />
            </button>
          ))}
          <div className="mt-auto">
            <button className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-y-auto w-full p-4 md:p-8">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Skill <span className="text-gradient">Matrix</span>
              </h1>
              <p className="text-sm text-muted-foreground mt-2 max-w-lg leading-relaxed">
                A real-time visualization of your professional architecture. Analyze gaps and align your trajectory with industry standards.
              </p>
            </div>
            {/* Toggle Actual vs Target */}
            <div className="flex bg-muted/40 p-1 rounded-full border border-border/50 shrink-0">
              <button
                onClick={() => setShowTarget(false)}
                className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${!showTarget ? "bg-aqua text-background shadow-[0_0_15px_rgba(45,212,191,0.4)]" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                Actual
              </button>
              <button
                onClick={() => setShowTarget(true)}
                className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${showTarget ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(239,68,68,0.4)]" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                Target
              </button>
            </div>
          </div>

          {/* Three column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-[500px]">

            {/* Left Panel */}
            <div className="flex flex-col gap-6 lg:col-span-1">
              {/* Skill Breakdown Card */}
              <div className="glass-card rounded-2xl p-5 border border-border/50 shadow-xl bg-background/40 backdrop-blur-xl flex flex-col h-[55%]">
                <h3 className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-6">
                  <BarChart3 className="w-4 h-4 text-aqua" />
                  Skill Breakdown
                </h3>

                <div className="space-y-5 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  {[programmingCluster, cloudCluster, aiCluster].filter(Boolean).map((cat, i) => (
                    <div key={i} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-aqua group-hover:text-mint transition-colors">{cat.name}</span>
                        <span className="text-xs font-bold text-foreground">{cat.score.toFixed(1)} <span className="text-muted-foreground font-normal">/ 10</span></span>
                      </div>
                      <div className="w-full h-1 bg-border/40 rounded-full overflow-hidden mb-2">
                        <motion.div
                          initial={{ width: 0 }} animate={{ width: `${(cat.score / 10) * 100}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className={`h-full rounded-full ${i === 2 ? 'bg-primary' : 'bg-aqua'}`}
                        />
                      </div>
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground truncate">
                        {cat.skills.map(s => s.name).join(", ")}
                      </p>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 py-3 rounded-xl border border-aqua/30 text-aqua text-[11px] font-bold uppercase tracking-widest hover:bg-aqua/10 transition-colors flex items-center justify-center gap-2">
                  <DownloadCloud className="w-4 h-4" />
                  Download Full Report
                </button>
              </div>

              {/* Next Milestone Card */}
              <div className="glass-card rounded-2xl p-5 border border-border/50 shadow-xl bg-gradient-to-br from-background/80 to-muted/20 backdrop-blur-xl flex-1 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Next Milestone</h3>
                  <p className="text-sm text-foreground leading-relaxed">
                    Complete <strong className="text-aqua">"Advanced Distributed Systems"</strong> to bridge the System Design gap by +1.2 pts.
                  </p>
                </div>
                <div className="flex gap-2 mt-4">
                  {["JS", "PY", "K8"].map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-md border border-border/50 text-[9px] font-bold text-muted-foreground uppercase">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Center Panel (SkillGapWheel) */}
            <div className="relative flex items-center justify-center lg:col-span-2 glass-card rounded-2xl border border-border/50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-aqua/5 via-background to-background">
              {/* Decorative background rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-[300px] h-[300px] rounded-full border border-dashed border-aqua/50 animate-[spin_60s_linear_infinite]" />
                <div className="absolute w-[450px] h-[450px] rounded-full border border-dotted border-muted-foreground animate-[spin_90s_linear_infinite_reverse]" />
              </div>

              {/* Center Score Overlay rendered underneath */}
              <div className="absolute z-0 flex flex-col items-center justify-center w-32 h-32 rounded-full bg-background/80 backdrop-blur-md border border-aqua/20 shadow-[0_0_30px_rgba(45,212,191,0.15)] pointer-events-none">
                <span className="text-4xl font-display font-bold text-foreground">
                  {wheelData?.overall_score}%
                </span>
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold mt-1">Total Score</span>
              </div>

              {/* The Graph rendered on top */}
              <div className="absolute inset-0 z-10 p-4 pointer-events-auto flex items-center justify-center">
                <div className="w-full h-full relative z-10">
                  <SkillGapWheel
                    data={wheelData?.clusters || []}
                    showRoleOverlay={showTarget}
                    onClusterClick={() => { }}
                  />
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="flex flex-col gap-6 lg:col-span-1">

              {/* Target Overlay Callout */}
              <AnimatePresence mode="popLayout">
                {showTarget && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    className="glass-card rounded-2xl border-2 border-aqua/50 shadow-[0_0_20px_rgba(45,212,191,0.1)] p-5 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-aqua/10 blur-3xl -mr-10 -mt-10 rounded-full" />
                    <h3 className="flex items-center justify-between text-[11px] font-bold text-aqua uppercase tracking-widest mb-4">
                      Target Overlay <Eye className="w-4 h-4" />
                    </h3>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Position</p>
                    <p className="text-sm font-bold text-foreground tracking-wide mb-5">{targetTitle}</p>

                    <div className="flex items-center justify-between text-xs font-bold mb-2">
                      <span className="text-muted-foreground">Match Readiness</span>
                      <span className="text-aqua">78%</span>
                    </div>
                    <div className="w-full h-1.5 bg-border/50 rounded-full overflow-hidden mb-4">
                      <div className="h-full bg-aqua rounded-full shadow-[0_0_10px_rgba(45,212,191,0.5)]" style={{ width: "78%" }} />
                    </div>

                    <button 
                      onClick={() => setShowTargetModal(true)} 
                      className="w-full py-2.5 rounded-lg border border-aqua/30 bg-aqua/5 text-aqua font-bold text-[10px] uppercase tracking-widest hover:bg-aqua/20 transition-all flex justify-center items-center gap-2"
                    >
                      View Detailed Target <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Target Alignment Text */}
              <div className="glass-card rounded-2xl p-5 border border-border/50 shadow-xl flex-1">
                <h3 className="text-[11px] font-bold text-mint uppercase tracking-widest mb-4">Target Alignment</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Your profile is currently <strong className="text-primary font-bold">12% misaligned</strong> with "Lead Architect" requirements. Critical gap identified in <span className="text-aqua font-semibold">Kubernetes Management</span>.
                </p>
              </div>

              {/* Top Recommendations */}
              <div className="flex flex-col gap-3">
                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 px-1">Top Recommendations</h3>

                <div className="glass-card rounded-xl p-4 border border-border/50 hover:border-aqua/40 transition-colors flex items-center gap-4 cursor-pointer group">
                  <div className="w-10 h-10 rounded-lg bg-aqua/10 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5 text-aqua" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-foreground group-hover:text-aqua transition-colors">Cloud-Native Patterns</h4>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Course • 12 Hrs <span className="text-aqua font-bold ml-1">+14% Growth</span></p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-aqua transition-colors" />
                </div>

                <div className="glass-card rounded-xl p-4 border border-border/50 hover:border-primary/40 transition-colors flex items-center gap-4 cursor-pointer group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Mentor Session: AI Ops</h4>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Mentorship • 1 Hr <span className="text-primary font-bold ml-1">Available Now</span></p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

      <Dialog open={showTargetModal} onOpenChange={setShowTargetModal}>
        <DialogContent className="sm:max-w-2xl bg-background/95 backdrop-blur-xl border-border/50">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold">
              Target Competency: <span className="text-aqua">{targetTitle}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 space-y-6 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-4 rounded-xl border border-border/50">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Target Readiness</p>
                <p className="text-3xl font-display font-bold text-foreground">78%</p>
                <div className="w-full h-1.5 bg-border/50 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-aqua rounded-full shadow-[0_0_10px_rgba(45,212,191,0.5)]" style={{ width: "78%" }} />
                </div>
              </div>
              <div className="glass-card p-4 rounded-xl border border-destructive/30 bg-destructive/5">
                <p className="text-[10px] uppercase font-bold text-destructive tracking-widest mb-1">Critical Gap</p>
                <p className="text-xl font-bold text-foreground mb-1">Cloud Infrastructure</p>
                <p className="text-xs text-muted-foreground">Requires 3.5 severity upskilling to meet baseline.</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider">Role Requirements Matrix</h4>
              <div className="space-y-4">
                {wheelData?.clusters.map((cluster, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-bold">{cluster.name}</span>
                      <div className="flex gap-4">
                        <span className="text-muted-foreground text-xs">Required: <strong className="text-foreground">{(cluster.score + cluster.gap).toFixed(1)}</strong></span>
                        <span className="text-aqua text-xs">Actual: <strong className="text-aqua">{cluster.score.toFixed(1)}</strong></span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-border/30 rounded-full flex relative overflow-hidden">
                      {/* Target Required marker (rendered underneath) */}
                      <div className="absolute top-0 bottom-0 left-0 bg-muted-foreground/30 rounded-full" style={{ width: `${((cluster.score + cluster.gap) / 10) * 100}%` }} />
                      {/* Actual User competency bar */}
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(cluster.score / 10) * 100}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={`h-full rounded-full absolute top-0 left-0 z-10 ${cluster.gap > 0 ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]' : 'bg-aqua shadow-[0_0_10px_rgba(45,212,191,0.4)]'}`} 
                      />
                    </div>
                    {cluster.gap > 0 && (
                      <p className="text-[10px] text-amber-500 mt-1">
                        Must upskill in: {cluster.skills.map(s => s.name).join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
              <h4 className="font-bold text-sm mb-2 text-primary flex items-center gap-2"><Zap className="w-4 h-4" /> Next Recommended Action</h4>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Your highest negative differential is in <strong className="text-foreground">Cloud & DevOps</strong>. Start by clearing your assigned <strong>Kubernetes Management</strong> milestone on the active roadmap.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SkillLab;
