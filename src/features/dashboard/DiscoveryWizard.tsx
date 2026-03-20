import { useState } from "react";
import { motion } from "framer-motion";
import { RoleDiscoveryStep } from "./steps/RoleDiscoveryStep";
import { MarketRadarStep } from "./steps/MarketRadarStep";
import { SkillMatrixStep } from "./steps/SkillMatrixStep";
import { CuratedRoadmapStep } from "./steps/CuratedRoadmapStep";
import { Target, TrendingUp, Cpu, Map } from "lucide-react";
import { Sparkles } from "lucide-react";

interface DiscoveryWizardProps {
  onComplete: (roleId: string) => void;
}

const STEPS = [
  { id: 1, label: "Role", helper: "Choose your target role", icon: Target },
  { id: 2, label: "Market", helper: "Validate market demand", icon: TrendingUp },
  { id: 3, label: "Skills", helper: "Analyze your skill gaps", icon: Cpu },
  { id: 4, label: "Roadmap", helper: "Generate learning path", icon: Map },
];

export const DiscoveryWizard = ({ onComplete }: DiscoveryWizardProps) => {
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  
  const handleCommit = () => {
    if (selectedRoleId) {
      onComplete(selectedRoleId);
    }
  };

  return (
    <div className="glass-card flex flex-col h-full w-full overflow-hidden shadow-2xl relative border-primary/20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      
      {!isStarted ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative z-10 h-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="p-10 rounded-3xl max-w-lg relative"
          >
            <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="relative z-10 glass-card p-10 rounded-3xl border border-primary/30 shadow-[0_0_50px_rgba(45,212,191,0.15)] bg-background/50">
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-6 opacity-80 animate-pulse" />
              <h2 className="text-3xl font-display font-bold mb-4 text-foreground leading-tight">Set up your personalized career roadmap in 4 simple steps</h2>
              <p className="text-sm text-muted-foreground mb-10 leading-relaxed">Connect your current skills to market demands and generate an AI-optimized learning path specifically for you.</p>
              <button 
                onClick={() => setIsStarted(true)} 
                className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:scale-105 transition-all shadow-[0_0_30px_rgba(45,212,191,0.4)] text-lg w-full flex items-center justify-center gap-3"
              >
                Start Setup <Target className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      ) : (
        <>
          {/* Enhanced Stepper Header */}
          <div className="flex flex-col px-6 py-5 border-b border-border/50 bg-background/80 backdrop-blur-xl relative z-20 shrink-0 gap-4 shadow-sm">
            
            {/* Setup Progress & Helper Text */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4">
              <div>
                <motion.h3 
                  key={currentStep}
                  initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                  className="font-bold text-foreground text-sm"
                >
                  <span className="text-primary mr-1">Step {currentStep} of 4</span> — {STEPS[currentStep - 1].helper}
                </motion.h3>
              </div>
              <div className="w-full md:w-auto">
                 <div className="flex items-center justify-between md:justify-end gap-3 mb-1.5 md:mb-1">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Setup Progress</span>
                   <span className="text-[10px] font-bold text-primary">{currentStep * 25}%</span>
                 </div>
                 <div className="w-full md:w-32 h-1.5 bg-muted rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }} 
                     animate={{ width: `${currentStep * 25}%` }} 
                     transition={{ duration: 0.5 }}
                     className="h-full bg-gradient-to-r from-primary to-neon" 
                   />
                 </div>
              </div>
            </div>

            {/* Nodes */}
            <div className="flex items-center gap-2 md:gap-4 w-full justify-between max-w-2xl mx-auto mt-2">
              {STEPS.map((step) => {
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className="flex flex-col items-center gap-1.5 relative group flex-1">
                    <div 
                      className={`w-8 h-8 rounded-full flex justify-center items-center text-xs font-bold transition-all duration-500 relative z-10 ${
                        isActive 
                          ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(45,212,191,0.6)] scale-110 ring-4 ring-primary/20" 
                          : isCompleted
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-muted text-muted-foreground border border-border/50"
                      }`}
                    >
                      {isCompleted ? <step.icon className="w-3.5 h-3.5" /> : step.id}
                    </div>
                    <span className={`text-[9px] md:text-[10px] uppercase font-bold tracking-wider transition-colors mt-1 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                      {step.label}
                    </span>
                    
                    {/* Connecting Line */}
                    {step.id < 4 && (
                      <div className="absolute left-1/2 top-4 w-full h-[2px] -z-0 hidden md:block" style={{ left: 'calc(50% + 20px)', width: 'calc(100% - 40px)' }}>
                        <div className="w-full h-full bg-border/40 absolute" />
                        <motion.div 
                          className="h-full bg-secondary absolute top-0 left-0"
                          initial={{ width: "0%" }}
                          animate={{ width: isCompleted ? "100%" : "0%" }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Content Area */}
          <div className="flex-1 p-6 md:p-8 relative z-10 overflow-hidden flex flex-col">
            {currentStep === 1 && (
              <RoleDiscoveryStep 
                selectedRoleId={selectedRoleId} 
                onSelect={setSelectedRoleId} 
                onNext={handleNext} 
              />
            )}
            {currentStep === 2 && (
              <MarketRadarStep 
                selectedRoleId={selectedRoleId} 
                onNext={handleNext} 
                onBack={handleBack} 
              />
            )}
            {currentStep === 3 && (
              <SkillMatrixStep 
                selectedRoleId={selectedRoleId} 
                onNext={handleNext} 
                onBack={handleBack} 
              />
            )}
            {currentStep === 4 && (
              <CuratedRoadmapStep 
                selectedRoleId={selectedRoleId} 
                onCommit={handleCommit} 
                onBack={handleBack} 
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
