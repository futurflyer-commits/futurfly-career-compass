import { motion } from "framer-motion";
import { PlayCircle, Award, Target, Settings2, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { PersonaPanel } from "./PersonaPanel";
import { RoadmapState } from "./state";

interface ReturningDashboardProps {
  roadmapState: RoadmapState;
  onReconfigure: () => void;
}

export const ReturningDashboard = ({ roadmapState, onReconfigure }: ReturningDashboardProps) => {
  const { user } = useAuth();
  
  // Try to use a stored full_name, fallback to capitalizing the email prefix, fallback to Architect.
  const displayIdentifier = user?.user_metadata?.full_name 
    || (user?.email ? user.email.split('@')[0].charAt(0).toUpperCase() + user.email.split('@')[0].slice(1) : "Architect");

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full gap-6 overflow-y-auto custom-scrollbar pr-3">
      
      {/* Banner Progress Summary top-anchored */}
      <div className="glass-card p-6 rounded-2xl border border-primary/20 relative overflow-hidden shrink-0">
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
         
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="w-full">
              <h2 className="text-2xl font-display font-bold mb-1">Welcome back, {displayIdentifier}.</h2>
              <p className="text-sm text-muted-foreground mb-6">You are actively tracking ahead of the local Bengaluru hiring median.</p>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Mastery Progress</span>
                <span className="text-sm font-bold">{roadmapState.roadmapProgressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${roadmapState.roadmapProgressPercent}%` }} 
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary to-neon" 
                />
              </div>
            </div>
            <div className="shrink-0 flex flex-col items-center gap-2">
              <Link to="/roadmap" className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(45,212,191,0.3)]">
                Continue Roadmap <PlayCircle className="w-4 h-4" />
              </Link>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-4">
        {/* Active Path & Velocity (Takes 1 col) */}
        <div className="flex flex-col gap-4">
           <div className="glass-card p-5 rounded-xl border border-secondary/20 bg-secondary/5">
              <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-1">Active Set Path</p>
              <h3 className="text-lg font-display font-bold text-foreground mb-4 leading-tight">AI Solutions Architect</h3>
              
              <button 
                onClick={onReconfigure}
                className="w-full py-2.5 rounded-lg border border-border bg-background/50 text-sm font-semibold hover:bg-muted/50 hover:border-primary/50 transition-colors flex items-center justify-center gap-2"
              >
                <Settings2 className="w-4 h-4" /> Reconfigure Path
              </button>
           </div>

           {/* Mini Tracker */}
           <div className="glass-card p-5 rounded-xl border border-border/50 flex-1">
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3 text-muted-foreground flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" /> 16-Week Velocity
              </h4>
              <div className="space-y-4 mt-4">
                <div className="flex items-center gap-2 opacity-50 relative">
                  <span className="absolute left-1.5 top-[18px] w-px h-6 bg-border/50"></span>
                  <CheckCircle className="w-3.5 h-3.5 text-secondary z-10 bg-background" />
                  <span className="text-[13px] line-through">Phase 1: Foundation</span>
                </div>
                <div className="flex items-center gap-2 text-primary font-bold relative">
                  <span className="absolute left-1.5 top-[18px] w-px h-6 bg-border/50"></span>
                  <Target className="w-3.5 h-3.5 animate-pulse z-10 bg-background" />
                  <span className="text-[13px]">Phase 2: Mechanics</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground relative">
                  <span className="absolute left-1.5 top-[18px] w-px h-6 bg-border/50"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-border ml-1 z-10" />
                  <span className="text-[13px] ml-0.5">Phase 3: Deep Dive</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground relative">
                  <span className="w-1.5 h-1.5 rounded-full bg-border ml-1 z-10" />
                  <span className="text-[13px] ml-0.5">Phase 4: Synthesis</span>
                </div>
              </div>
           </div>
        </div>

        {/* Sub-tasks & Gaps (Takes 2 cols) */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          {/* Next Milestone */}
          <div className="glass-card p-5 rounded-xl border border-border/50">
            <h4 className="font-bold text-sm flex items-center gap-2 mb-3"><Award className="w-4 h-4 text-neon" /> Next Technical Milestone</h4>
            <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
              <h5 className="font-bold mb-1 text-sm text-foreground">Implement a naive RAG retriever</h5>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">You have already mastered Vector DB ingest. Now build the context injector using LangChain or LlamaIndex.</p>
              <button className="text-[10px] font-bold text-primary hover:text-neon transition-colors uppercase tracking-wider flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/20">
                Start Objective →
              </button>
            </div>
          </div>

          {/* Pending Gaps */}
          <div className="glass-card p-5 rounded-xl border border-border/50 flex-1 flex flex-col">
            <h4 className="font-bold text-sm flex items-center gap-2 mb-3"><Target className="w-4 h-4 text-accent" /> Pending Skill Gaps</h4>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-background border border-border/50 hover:border-accent/30 transition-colors">
                <span className="text-xs font-semibold">LLM Fine-tuning (PeFT)</span>
                <span className="text-[9px] font-bold uppercase tracking-widest bg-accent/10 text-accent px-2.5 py-1 rounded border border-accent/20">Critical</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-background border border-border/50">
                <span className="text-xs font-semibold">Azure AI Search</span>
                <span className="text-[9px] font-bold uppercase tracking-widest bg-muted text-muted-foreground px-2.5 py-1 rounded border border-border">Pending</span>
              </div>
            </div>
            
            <Link to="/skill-lab" className="text-[11px] uppercase tracking-widest font-bold text-muted-foreground hover:text-foreground transition-colors mt-auto pt-4 flex items-center justify-center border-t border-border/50 w-full hover:underline">
              View Detailed Matrix
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
