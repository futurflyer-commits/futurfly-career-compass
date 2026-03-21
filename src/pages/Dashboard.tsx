import { useEffect, useState } from "react";
import { Loader2, Rocket, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { PersonaPanel } from "@/features/dashboard/PersonaPanel";
import { ReturningDashboard } from "@/features/dashboard/ReturningDashboard";
import { getRoadmapState, saveRoadmapState, RoadmapState } from "@/features/dashboard/state";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { user } = useAuth();
  const [personaData, setPersonaData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [roadmapState, setRoadmapState] = useState<RoadmapState | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function initDashboard() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // 1. Fetch persona logic
        const { data: profileData, error: profileErr } = await supabase
          .from('profiles')
          .select('discovery_persona')
          .eq('id', user.id)
          .single();

        if (!profileErr && profileData?.discovery_persona) {
          setPersonaData(profileData.discovery_persona);
        }

        // 2. Fetch specific resilient roadmap state
        const state = await getRoadmapState(user.id);
        setRoadmapState(state);

      } catch (err) {
        console.error("Dashboard init error:", err);
      } finally {
        setLoading(false);
      }
    }

    initDashboard();
  }, [user]);

  const handleReconfigure = async () => {
    if (!user) return;
    const resetState: RoadmapState = {
      hasActiveRoadmap: false,
      activeRoleId: null,
      roadmapProgressPercent: 0,
      roadmapCurrentPhase: 'Phase 1: Foundation',
    };
    await saveRoadmapState(user.id, resetState);
    setRoadmapState(resetState);
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
        <p className="text-sm font-semibold text-muted-foreground animate-pulse">Initializing Interface...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-64px)] py-4 md:py-8 bg-background flex flex-col md:flex-row gap-6 p-4 md:px-8 justify-center">
      {/* Persisted left Identity Panel */}
      <div className="w-full md:w-[360px] lg:w-[460px] xl:w-[500px] shrink-0 h-auto md:h-[650px]">
        <PersonaPanel personaData={personaData} />
      </div>

      {/* Adaptive Dashboard Content */}
      <div className="flex-1 max-w-4xl h-auto md:h-[650px] overflow-hidden flex flex-col justify-start">
        {roadmapState?.hasActiveRoadmap ? (
          <ReturningDashboard 
            roadmapState={roadmapState} 
            onReconfigure={handleReconfigure} 
          />
        ) : (
          <div className="bg-card border border-border/50 flex flex-col h-full w-full overflow-hidden shadow-2xl relative rounded-[2rem]">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
             <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative z-10 h-full">
               <div className="p-10 rounded-3xl max-w-lg relative">
                 <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
                 <div className="relative z-10 bg-card p-10 rounded-3xl border border-border shadow-[0_0_50px_rgba(45,212,191,0.15)]">
                   <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                     <Rocket className="w-10 h-10 text-primary animate-pulse" />
                   </div>
                   <h2 className="text-3xl font-display font-bold mb-4 text-foreground leading-tight">Set up your personalized career roadmap in 4 simple steps</h2>
                   <p className="text-sm text-muted-foreground mb-10 leading-relaxed">Connect your current skills to market demands and generate an AI-optimized learning path specifically for you.</p>
                   <button 
                     onClick={() => navigate('/setup')} 
                     className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:scale-105 transition-all shadow-[0_0_30px_rgba(45,212,191,0.4)] text-lg w-full flex items-center justify-center gap-3 cursor-pointer"
                   >
                     Start Setup <ArrowRight className="w-5 h-5" />
                   </button>
                 </div>
               </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
