import { Target, TrendingUp, Briefcase, Eye, ShieldCheck, Database, LayoutTemplate, Cpu, Cloud, LineChart, Code, CheckCircle, AlertTriangle, Sparkles, BarChart3, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface RoleDiscoveryStepProps {
  onSelect: (roleId: string) => void;
  selectedRoleId: string | null;
  onNext: () => void;
}

// Extrapolated Mock Data matching RoleHub payload requirements
const ROLE_MATCHES = [
  { 
    id: "role-1", title: "AI Solutions Architect", match: 98, demand: "High Demand", tier: "Tier 1 MNCs", salary: "₹25L - ₹45L", trend: "Strong Market Uptrend", icon: Target,
    type: "Full-time", location: "Remote",
    description: "Design and implement end-to-end AI solutions spanning cloud infrastructure, LLM orchestration, and enterprise integration.",
    whyFit: ["Strong system design background", "Cloud infrastructure expertise", "Product-engineering bridge skills"],
    skillsNeeded: [{ name: "System Design", have: true }, { name: "Cloud (AWS/GCP)", have: true }, { name: "LLM Fine-tuning", have: false }]
  },
  { 
    id: "role-2", title: "GenAI Product Lead", match: 85, demand: "Growth Stage", tier: "Startups", salary: "₹20L - ₹38L", trend: "Rapidly Emerging", icon: Briefcase,
    type: "Hybrid", location: "Bangalore",
    description: "Lead the strategy and execution for generative AI products, from ideation through launch.",
    whyFit: ["Product leadership experience", "AI domain understanding", "User-centric design thinking"],
    skillsNeeded: [{ name: "Product Management", have: true }, { name: "GenAI Concepts", have: true }, { name: "Responsible AI", have: false }]
  },
  { 
    id: "role-3", title: "ML Engineering Manager", match: 76, demand: "Stable Growth", tier: "Enterprise", salary: "₹30L - ₹50L", trend: "Consistent Demand", icon: TrendingUp,
    type: "Full-time", location: "Hyderabad",
    description: "Build and maintain scalable ML infrastructure, including model training pipelines, feature stores, and deployment systems.",
    whyFit: ["Engineering Management", "Python proficiency", "DevOps understanding"],
    skillsNeeded: [{ name: "Python", have: true }, { name: "Docker/K8s", have: true }, { name: "MLOps Pipelines", have: false }]
  },
  { 
    id: "role-4", title: "Senior MLOps Engineer", match: 72, demand: "High Demand", tier: "Growth Phase", salary: "₹22L - ₹40L", trend: "Rapidly Emerging", icon: ShieldCheck,
    type: "Remote", location: "India",
    description: "Design automated machine learning CI/CD pipelines to bridge the gap between data science and production serving.",
    whyFit: ["CI/CD Mastery", "Infrastructure as Code", "Python Systems"],
    skillsNeeded: [{ name: "Terraform", have: true }, { name: "Kubernetes", have: false }, { name: "Airflow", have: false }]
  },
  { 
    id: "role-5", title: "Data Platform Architect", match: 68, demand: "Stable Growth", tier: "Enterprise", salary: "₹28L - ₹55L", trend: "Consistent Demand", icon: Database,
    type: "Hybrid", location: "Mumbai",
    description: "Architect and scale massive real-time data ingestion streams to support AI analytics workloads.",
    whyFit: ["Database Architecture logic", "Data modeling experience"],
    skillsNeeded: [{ name: "Kafka", have: true }, { name: "Snowflake", have: false }, { name: "Spark", have: false }]
  },
  { 
    id: "role-6", title: "AI UX Researcher", match: 65, demand: "Emerging", tier: "Tier 1 MNCs", salary: "₹18L - ₹30L", trend: "Strong Setup", icon: LayoutTemplate,
    type: "Full-time", location: "Bangalore",
    description: "Study how human users interact with non-deterministic probabilistic models and design better trust mechanisms.",
    whyFit: ["Human-computer interaction background", "Qualitative analysis"],
    skillsNeeded: [{ name: "Figma", have: true }, { name: "Prompt Evaluation", have: false }, { name: "User Trust Modeling", have: false }]
  },
  { id: "role-7", title: "Edge AI Specialist", match: 61, demand: "Niche", tier: "Startups", salary: "₹25L - ₹45L", trend: "Future Growth Focus", icon: Cpu, type: "On-site", location: "Chennai", description: "Deploy optimized, quantized neural networks onto embedded devices.", whyFit: ["C++ Mastery", "IoT Experience"], skillsNeeded: [{ name: "C++", have: true }, { name: "TensorRT", have: false }, { name: "Model Quantization", have: false }] },
  { id: "role-8", title: "Cloud AI Developer", match: 58, demand: "High Demand", tier: "Consulting", salary: "₹15L - ₹28L", trend: "Strong Volume", icon: Cloud, type: "Remote", location: "India", description: "Consume managed cloud AI services (AWS Bedrock, Azure OpenAI) to build business apps fast.", whyFit: ["Cloud Dev Background", "API Integrations"], skillsNeeded: [{ name: "REST APIs", have: true }, { name: "Azure OpenAI", have: false }, { name: "AWS Bedrock", have: false }] },
  { id: "role-9", title: "Quantitative AI Analyst", match: 54, demand: "Stable", tier: "FinTech", salary: "₹30L - ₹60L", trend: "Consistent Need", icon: LineChart, type: "Hybrid", location: "Mumbai", description: "Apply transformer models to time-series and financial unstructured data for trading signals.", whyFit: ["Math background", "Financial domain"], skillsNeeded: [{ name: "Statistics", have: true }, { name: "Time-series Models", have: false }, { name: "Alternative Data", have: false }] },
  { id: "role-10", title: "AI Prompt Engineer", match: 49, demand: "Declining", tier: "Agencies", salary: "₹12L - ₹20L", trend: "Commoditizing", icon: Code, type: "Contract", location: "Global", description: "Iteratively test and secure system prompts for various commercial LLM wrappers.", whyFit: ["Creative logic", "Fast feedback loops"], skillsNeeded: [{ name: "Prompting", have: true }, { name: "Red Teaming", have: false }, { name: "Few-shot design", have: false }] },
];

export const RoleDiscoveryStep = ({ onSelect, selectedRoleId, onNext }: RoleDiscoveryStepProps) => {
  const [viewRole, setViewRole] = useState<any | null>(null);

  const handleSelectRoleInDialog = () => {
    if (viewRole) {
      onSelect(viewRole.id);
      setViewRole(null);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col h-full">
      <div className="mb-4 shrink-0">
        <h2 className="text-2xl font-display font-bold mb-2">Role Discovery</h2>
        <p className="text-sm text-muted-foreground">Based on your Persona and parsed CV, these are your highest probability career trajectories in the AI-driven Indian market.</p>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-3 pb-6 -mr-3">
        {ROLE_MATCHES.map((role, idx) => {
          const isSelected = selectedRoleId === role.id;
          const isRecommended = idx === 0;
          return (
            <div 
              key={role.id}
              onClick={() => onSelect(role.id)}
              className={`p-5 rounded-xl border transition-all cursor-pointer group relative mt-4 ${
                isSelected 
                  ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(45,212,191,0.2)] scale-[1.01]" 
                  : "bg-muted/50 border-border/50 hover:border-primary/50 hover:bg-muted"
              }`}
            >
              {isRecommended && (
                <div className="absolute -top-3 left-5 bg-neon text-background text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_10px_rgba(var(--neon),0.5)] z-20 flex items-center gap-1.5 border border-background">
                  <Star className="w-3 h-3 fill-background" /> Recommended for You
                </div>
              )}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isSelected ? "bg-primary text-background" : "bg-background text-primary group-hover:bg-primary/20"}`}>
                    <role.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{role.title}</h3>
                    <p className="text-xs text-muted-foreground">{role.tier} • {role.salary}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className={`px-3 py-1 rounded-full border text-xs font-bold ${isSelected ? "bg-primary text-background border-primary" : "bg-neon/10 text-neon border-neon/30"}`}>
                    {role.match}% Match
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setViewRole(role); }} 
                    className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-muted-foreground hover:text-primary transition-colors bg-background/50 px-2.5 py-1 rounded border border-border/50 hover:border-primary/30"
                  >
                    <Eye className="w-3 h-3" /> View Role
                  </button>
                </div>
              </div>

              <div className="w-full h-1.5 bg-slate-800/50 rounded-full overflow-hidden mb-3">
                <motion.div 
                  className="h-full bg-gradient-to-r from-primary to-neon rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${role.match}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/50">
                <span className="flex items-center gap-1.5"><TrendingUp className={`w-3.5 h-3.5 ${isSelected ? 'text-primary' : ''}`} /> {role.trend}</span>
                <span className="font-medium bg-background px-2 py-0.5 rounded border border-border">{role.demand}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 mt-auto border-t border-border/30 flex flex-col items-end shrink-0 sticky bottom-0 bg-background/95 backdrop-blur-md pb-2 z-20 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)]">
        <button 
          onClick={onNext}
          disabled={!selectedRoleId}
          className="px-8 py-3.5 bg-primary text-primary-foreground font-bold rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 hover:scale-105 transition-all shadow-[0_0_20px_rgba(45,212,191,0.4)] disabled:shadow-none flex items-center gap-2 relative overflow-hidden group w-full md:w-auto justify-center"
        >
          {selectedRoleId && <span className="absolute inset-0 w-full h-full bg-white/20 blur-md pointer-events-none group-hover:animate-pulse" />}
          <span className="relative z-10 flex items-center gap-2">Next Step: Validate Market Fit <ArrowRight className="w-4 h-4" /></span>
        </button>
      </div>

      {/* Role Detail Dialog */}
      <Dialog open={!!viewRole} onOpenChange={(open) => !open && setViewRole(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto bg-background border-border/50">
          {viewRole && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-1">
                  <BarChart3 className="h-7 w-7 text-primary flex-shrink-0" />
                  <div>
                    <DialogTitle className="font-display text-xl font-bold">{viewRole.title}</DialogTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">{viewRole.type} • {viewRole.location} • {viewRole.demand}</p>
                  </div>
                </div>
              </DialogHeader>

              <div className="flex items-center justify-between bg-muted/50 rounded-xl p-3 mt-2">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Match Score</p>
                  <p className={`text-2xl font-display font-bold ${viewRole.match >= 80 ? "text-neon" : viewRole.match >= 60 ? "text-secondary" : "text-muted-foreground"}`}>
                    {viewRole.match}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Salary Range</p>
                  <p className="text-lg font-display font-bold text-secondary">{viewRole.salary}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mt-4">{viewRole.description}</p>

              {/* Skills Needed vs Gap */}
              <div className="mt-5">
                <h3 className="text-xs font-display font-bold uppercase tracking-widest mb-3">Skills Needed vs Your Profile</h3>
                <div className="space-y-2">
                  {viewRole.skillsNeeded.map((skill: any) => (
                    <div key={skill.name} className="flex items-center justify-between bg-muted/40 rounded-lg px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        {skill.have ? (
                          <CheckCircle className="h-4 w-4 text-neon flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium">{skill.name}</span>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${skill.have
                        ? "bg-neon/10 text-neon"
                        : "bg-destructive/10 text-destructive"
                        }`}>
                        {skill.have ? "Acquired" : "Gap"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why You Fit */}
              <div className="mt-5">
                <h3 className="text-xs font-display font-bold uppercase tracking-widest mb-3">Why You're a Fit</h3>
                <div className="space-y-2">
                  {viewRole.whyFit.map((reason: string) => (
                    <div key={reason} className="flex items-start gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={handleSelectRoleInDialog}
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary text-primary-foreground py-3 text-sm font-bold shadow-[0_0_15px_rgba(45,212,191,0.2)] hover:bg-primary/90 transition-colors"
                >
                  <CheckCircle className="h-4 w-4" /> Select This Role for Roadmap
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};
