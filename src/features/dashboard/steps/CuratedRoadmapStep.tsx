import { ArrowLeft, Rocket, GitCommit, PlayCircle, Trophy, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface CuratedRoadmapStepProps {
  onCommit: () => void;
  onBack: () => void;
  selectedRoleId: string | null;
}

const PHASES = [
  { phase: "Phase 1: Foundation", focus: "Prompt Eng & LLM Basics", duration: "Weeks 1-4" },
  { phase: "Phase 2: Mechanics", focus: "RAG & Vector DB Integration", duration: "Weeks 5-8" },
  { phase: "Phase 3: Deep Dive", focus: "Fine-tuning & Strategy", duration: "Weeks 9-12" },
  { phase: "Phase 4: Synthesis", focus: "Capstone Portfolio Build", duration: "Weeks 13-16" },
];

export const CuratedRoadmapStep = ({ onCommit, onBack, selectedRoleId }: CuratedRoadmapStepProps) => {
  const [committing, setCommitting] = useState(false);

  const handleCommit = async () => {
    setCommitting(true);
    // Simulate API save delay for UX
    await new Promise((res) => setTimeout(res, 1200));
    onCommit();
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold mb-2">Your 16-Week Co-Pilot Roadmap</h2>
        <p className="text-sm text-muted-foreground">We have engineered a highly specific, linear learning path to close your critical gaps efficiently.</p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar md:pr-4">
        <div className="relative border-l-2 border-border/50 ml-4 mb-6">
          {PHASES.map((p, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: index * 0.15 + 0.2 }}
              className="mb-8 pl-8 relative"
            >
              <div className="absolute w-4 h-4 rounded-full bg-background border-2 border-primary left-[-9px] top-1" />
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-1 flex items-center gap-2">
                    {p.phase}
                  </h4>
                  <p className="text-lg font-display text-primary">{p.focus}</p>
                </div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded-md">
                  {p.duration}
                </span>
              </div>
            </motion.div>
          ))}
          
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.8 }}
            className="pl-8 relative"
          >
             <div className="absolute w-6 h-6 rounded-full bg-neon shadow-[0_0_15px_rgba(var(--neon),0.8)] flex items-center justify-center left-[-13px] top-0">
               <Trophy className="w-3 h-3 text-background" />
             </div>
             <p className="text-xl font-display font-bold text-neon">Market Ready Placement</p>
             <p className="text-xs text-muted-foreground mt-1">Tier-1 Interview readiness complete.</p>
          </motion.div>
        </div>

        <div className="glass-card p-4 rounded-xl flex gap-3 border-secondary/20 bg-secondary/10 mt-6">
          <Sparkles className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
          <p className="text-sm flex-1 text-muted-foreground leading-relaxed">
            This roadmap automatically connects to the SkillLab and Simulation engines allowing you to track progress transparently.
          </p>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-border/30 flex justify-between items-center shrink-0">
        <button onClick={onBack} disabled={committing} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors disabled:opacity-50">
          <ArrowLeft className="w-4 h-4" /> Skill Gap Matrix
        </button>
        <button 
          onClick={handleCommit}
          disabled={committing}
          className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold rounded-full hover:scale-105 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(45,212,191,0.4)] disabled:opacity-75 disabled:scale-100 disabled:cursor-wait"
        >
          {committing ? "Building Path..." : "Commit to This Path"} 
          <PlayCircle className={`w-4 h-4 ${committing ? "animate-spin" : ""}`} />
        </button>
      </div>
    </motion.div>
  );
};
