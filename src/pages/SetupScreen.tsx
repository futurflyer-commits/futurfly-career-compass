import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DiscoveryWizard } from "@/features/dashboard/DiscoveryWizard";
import { saveRoadmapState, RoadmapState } from "@/features/dashboard/state";
import { useEffect } from "react";

const SetupScreen = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleComplete = async (roleId: string) => {
    if (!user) return;
    const newState: RoadmapState = {
      hasActiveRoadmap: true,
      activeRoleId: roleId,
      roadmapProgressPercent: 5,
      roadmapCurrentPhase: 'Phase 1: Foundation',
    };
    await saveRoadmapState(user.id, newState);
    // Return to dashboard after saving state
    navigate("/dashboard");
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] py-4 md:py-8 bg-background flex flex-col gap-6 p-4 md:px-8 justify-start items-center relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[90rem] h-auto min-h-[calc(100vh-8rem)] md:min-h-[900px] relative z-10 flex flex-col items-center justify-center">
        <div className="w-full text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">Neural Career Mapping</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">We're calibrating your industry knowledge, technical capability, and market positioning to generate the optimal path to success.</p>
        </div>
        
        <div className="flex-1 w-full h-[85vh] md:h-[90vh] bg-card backdrop-blur-xl border border-border/50 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col">
          <DiscoveryWizard onComplete={handleComplete} autoStart={true} />
        </div>
      </div>
    </div>
  );
};

export default SetupScreen;
