import { ArrowLeft, Target, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { SkillGapWheel } from "@/components/SkillGapWheel";

interface SkillMatrixStepProps {
  onNext: () => void;
  onBack: () => void;
  selectedRoleId: string | null;
}

export const SkillMatrixStep = ({ onNext, onBack, selectedRoleId }: SkillMatrixStepProps) => {
  const { user } = useAuth();
  const [wheelData, setWheelData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fallback data if the real RPC function hasn't been executed by the user yet
  const mockData = {
    overall_score: 68,
    clusters: [
      { name: "Programming", score: 8, gap: 1.5, skills: [{name: "Python", level: 8}] },
      { name: "Cloud & DevOps", score: 6, gap: 3, skills: [{name: "Docker", level: 6}] },
      { name: "AI / ML", score: 5, gap: 4, skills: [{name: "LLMs", level: 4}] },
      { name: "Data Engineering", score: 7, gap: 1, skills: [{name: "SQL", level: 8}] },
      { name: "System Design", score: 6.5, gap: 2, skills: [{name: "Architecture", level: 6}] },
      { name: "Soft Skills", score: 9, gap: 0, skills: [{name: "Leadership", level: 9}] },
    ]
  };

  useEffect(() => {
    const fetchWheelData = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const { data, error } = await supabase.rpc("get_user_skill_wheel", {
          p_user_id: user.id,
          p_role_id: selectedRoleId
        });
        
        if (error) {
           console.error("RPC Error (falling back to mock data):", error);
           setWheelData(null);
        } else {
           setWheelData(data);
        }
      } catch (e) {
        console.error("Fetch Exception:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchWheelData();
  }, [user, selectedRoleId]);

  const currentData = wheelData?.clusters || mockData.clusters;
  const currentOverallScore = wheelData?.overall_score || mockData.overall_score;

  if (loading) {
    return (
      <div className="flex flex-col h-full items-center justify-center p-8">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
        <p className="text-muted-foreground font-display tracking-widest uppercase text-xs">Computing Skill Matrix...</p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold mb-2">Skill Gap Matrix</h2>
        <p className="text-sm text-muted-foreground">Comparing your current Parsed CV abilities against the requirements of an AI Solutions Architect.</p>
      </div>

      <div className="flex-1 mt-2 overflow-y-auto custom-scrollbar pr-3 pb-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-start">
          {/* Left Side: Radar Visualization */}
          <div className="lg:col-span-7 h-[420px] bg-background/50 p-4 rounded-xl border border-border/50 relative flex items-center justify-center">
            <div className="w-full h-full relative flex items-center justify-center">
                {/* Centered Total Score Ring rendered underneath */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                  <div className="bg-[#11131a]/95 w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-2xl border border-border/20 backdrop-blur-md">
                    <span className="text-2xl font-display font-bold text-white leading-none">{currentOverallScore}%</span>
                    <span className="text-[8px] uppercase tracking-widest text-muted-foreground/80 mt-1 font-bold">Total Score</span>
                  </div>
                </div>
                
                {/* Radar visualization rendered on top so tooltips override the ring */}
                <div className="relative z-10 w-full h-full pointer-events-auto">
                  <SkillGapWheel 
                    data={currentData} 
                    showRoleOverlay={true} 
                    onClusterClick={() => {}} 
                  />
                </div>
            </div>
          </div>

          {/* Right Side: Metrics & AI Summary */}
          <div className="lg:col-span-5 space-y-5">
            {/* Core Metrics vs Target */}
            <div className="bg-background/50 p-6 rounded-xl flex flex-col gap-5 border-dashed border-primary/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Current Readiness</p>
                <h3 className="text-4xl font-display font-bold text-primary">{currentOverallScore}%</h3>
              </div>
              <div className="h-px w-full bg-border/50" />
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Target Role Avg</p>
                <h3 className="text-3xl font-display font-bold text-foreground opacity-50">85%+</h3>
              </div>
            </div>

            {/* Next Steps Hint / AI Summary */}
            <div className="p-5 rounded-xl bg-background/50 flex flex-col gap-3 text-sm text-muted-foreground border border-secondary/20 bg-secondary/5">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-secondary shrink-0" />
                <h4 className="font-bold text-foreground uppercase tracking-widest text-xs">AI Assessment</h4>
              </div>
              <p className="leading-relaxed">Your background maps closely to this role. You are approximately <strong className="text-foreground">4-6 months</strong> of focused upskilling away from Tier-1 market readiness.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 mt-4 border-t border-border/50 flex justify-between items-center shrink-0">
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
