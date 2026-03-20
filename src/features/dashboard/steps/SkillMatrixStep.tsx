import { ArrowLeft, Target, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { SkillGapWheel } from "@/components/SkillGapWheel";

interface SkillMatrixStepProps {
  onNext: () => void;
  onBack: () => void;
  selectedRoleId: string | null;
}

export const SkillMatrixStep = ({ onNext, onBack, selectedRoleId }: SkillMatrixStepProps) => {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold mb-2">Skill Gap Matrix</h2>
        <p className="text-sm text-muted-foreground">Comparing your current Parsed CV abilities against the requirements of an AI Solutions Architect.</p>
      </div>

      <div className="flex-1 mt-2 overflow-y-auto custom-scrollbar pr-3 pb-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-start">
          {/* Left Side: Radar Visualization */}
          <div className="lg:col-span-7 h-[420px] glass-card p-4 rounded-xl border border-border/50 relative flex items-center justify-center">
            <div className="w-full h-full relative flex items-center justify-center">
                {/* Centered Total Score Ring rendered underneath */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                  <div className="bg-[#11131a]/95 w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-2xl border border-white/5 backdrop-blur-md">
                    <span className="text-2xl font-display font-bold text-white leading-none">68%</span>
                    <span className="text-[8px] uppercase tracking-widest text-muted-foreground/80 mt-1 font-bold">Total Score</span>
                  </div>
                </div>
                
                {/* Radar visualization rendered on top so tooltips override the ring */}
                <div className="relative z-10 w-full h-full pointer-events-auto">
                  <SkillGapWheel 
                    data={[
                      { name: "Programming", score: 8, gap: 1.5, skills: [{name: "Python", level: 8}] },
                      { name: "Cloud & DevOps", score: 6, gap: 3, skills: [{name: "Docker", level: 6}] },
                      { name: "AI / ML", score: 5, gap: 4, skills: [{name: "LLMs", level: 4}] },
                      { name: "Data Engineering", score: 7, gap: 1, skills: [{name: "SQL", level: 8}] },
                      { name: "System Design", score: 6.5, gap: 2, skills: [{name: "Architecture", level: 6}] },
                      { name: "Soft Skills", score: 9, gap: 0, skills: [{name: "Leadership", level: 9}] },
                    ]} 
                    showRoleOverlay={true} 
                    onClusterClick={() => {}} 
                  />
                </div>
            </div>
          </div>

          {/* Right Side: Metrics & AI Summary */}
          <div className="lg:col-span-5 space-y-5">
            {/* Core Metrics vs Target */}
            <div className="glass-card p-6 rounded-xl flex flex-col gap-5 border-dashed border-primary/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Current Readiness</p>
                <h3 className="text-4xl font-display font-bold text-primary">68%</h3>
              </div>
              <div className="h-px w-full bg-border/50" />
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Target Role Avg</p>
                <h3 className="text-3xl font-display font-bold text-foreground opacity-50">85%+</h3>
              </div>
            </div>

            {/* Next Steps Hint / AI Summary */}
            <div className="p-5 rounded-xl glass-card flex flex-col gap-3 text-sm text-muted-foreground border border-secondary/20 bg-secondary/5">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-secondary shrink-0" />
                <h4 className="font-bold text-foreground uppercase tracking-widest text-xs">AI Assessment</h4>
              </div>
              <p className="leading-relaxed">Your background maps closely to this role. You are approximately <strong className="text-foreground">4-6 months</strong> of focused upskilling away from Tier-1 market readiness.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 mt-4 border-t border-border/30 flex justify-between items-center shrink-0">
        <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> Market Validate
        </button>
        <button 
          onClick={onNext}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(45,212,191,0.3)]"
        >
          View Curated Roadmap <Target className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
