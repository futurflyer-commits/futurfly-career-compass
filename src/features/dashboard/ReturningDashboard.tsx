import { motion } from "framer-motion";
import { PlayCircle, Award, Target, Settings2, Clock, CheckCircle, FileText, Zap, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { PersonaPanel } from "./PersonaPanel";
import { RoadmapState } from "./state";
import { useState } from "react";
import { CareerBlueprintModal } from "./CareerBlueprintModal";

interface ReturningDashboardProps {
  roadmapState: RoadmapState;
  onReconfigure: () => void;
}

export const ReturningDashboard = ({ roadmapState, onReconfigure }: ReturningDashboardProps) => {
  const { user } = useAuth();
  const [showBlueprint, setShowBlueprint] = useState(false);
  
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
        {/* Active Path (Takes 1 col) */}
        <div className="flex flex-col gap-4">
           <div className="glass-card p-5 rounded-xl border border-secondary/20 bg-secondary/5 h-full flex flex-col justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-1">Active Set Path</p>
                <h3 className="text-lg font-display font-bold text-foreground mb-4 leading-tight">AI Solutions Architect</h3>
              </div>
              
              <div className="flex flex-col gap-2 mt-4">
                 <button 
                   onClick={() => setShowBlueprint(true)}
                   className="w-full py-2.5 rounded-lg border border-primary/20 bg-primary/10 text-primary text-sm font-bold hover:bg-primary/20 transition-colors flex items-center justify-center gap-2"
                 >
                   <FileText className="w-4 h-4" /> Download Report
                 </button>
                 <button 
                   onClick={onReconfigure}
                   className="w-full py-2.5 rounded-lg border border-border bg-background/50 text-sm font-semibold hover:bg-muted/50 hover:border-primary/50 transition-colors flex items-center justify-center gap-2"
                 >
                   <Settings2 className="w-4 h-4" /> Reconfigure Path
                 </button>
              </div>
           </div>
        </div>

        {/* Roadmap Snapshot (Takes 2 cols) */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          {/* Next Best Action Snapshot */}
          <div className="glass-card p-6 rounded-xl border-primary/30 relative overflow-hidden group flex-1 flex flex-col justify-center bg-gradient-to-br from-background via-background to-primary/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-10 -mt-10 rounded-full transition-transform group-hover:scale-150" />
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary animate-pulse" />
                <h3 className="text-sm font-bold text-primary uppercase tracking-widest">Roadmap: Next Action</h3>
              </div>
              <span className="bg-background/80 text-[10px] uppercase font-bold text-muted-foreground px-2 py-1 rounded border border-border">Priority • 2 Hrs</span>
            </div>
            
            <div className="relative z-10 flex flex-col justify-between flex-1">
              <div>
                <h2 className="text-2xl font-display font-bold mb-2">Complete Python Data Structures Module</h2>
                <p className="text-sm text-foreground/80 max-w-xl leading-relaxed mb-6">
                  You're 80% through this module. Finishing it now unlocks the ML Algorithms phase. Jump back in exactly where you left off.
                </p>
              </div>
              
              <div className="flex items-center gap-4 mt-auto">
                <Link to="/roadmap" className="inline-flex items-center justify-center rounded-lg h-10 px-6 font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(var(--primary),0.3)] gap-2 transition-all">
                  <PlayCircle className="w-4 h-4" /> Resume Module
                </Link>
                <Link to="/roadmap" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  View Full Path <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <CareerBlueprintModal 
        isOpen={showBlueprint} 
        onClose={() => setShowBlueprint(false)} 
        roleId={roadmapState.activeRoleId} 
      />
    </motion.div>
  );
};
