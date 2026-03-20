import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { PersonaPanel } from "@/features/dashboard/PersonaPanel";
import { DiscoveryWizard } from "@/features/dashboard/DiscoveryWizard";
import { ReturningDashboard } from "@/features/dashboard/ReturningDashboard";
import { getRoadmapState, saveRoadmapState, RoadmapState } from "@/features/dashboard/state";

export const Dashboard = () => {
  const { user } = useAuth();
  const [personaData, setPersonaData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [roadmapState, setRoadmapState] = useState<RoadmapState | null>(null);

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

  const handleWizardComplete = async (roleId: string) => {
    if (!user) return;
    const newState: RoadmapState = {
      hasActiveRoadmap: true,
      activeRoleId: roleId,
      roadmapProgressPercent: 5, // Start at 5% for committing
      roadmapCurrentPhase: 'Phase 1: Foundation',
    };
    await saveRoadmapState(user.id, newState);
    setRoadmapState(newState);
  };

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
          <DiscoveryWizard onComplete={handleWizardComplete} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
