import { ArrowLeft, Rocket, Map, Target, TrendingUp, Sparkles, Zap, Clock, CheckCircle2, ChevronRight, Briefcase, Activity, Flame, AlertTriangle, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { CareerBlueprintModal } from "../CareerBlueprintModal";

interface CuratedRoadmapStepProps {
  onCommit: () => void;
  onBack: () => void;
  selectedRoleId: string | null;
}

const EVOLUTION_DATA: Record<string, any> = {
  "role-1": {
    header: { currentRole: "Software Engineer", targetRole: "AI Solutions Architect", timeline: "3-5 Years", currentSalary: "12L", targetSalary: "45L" },
    insights: {
      fit: "Your strong system design background provides a structural advantage for orchestrating LLM infrastructure. This path aligns with your goal of architectural leadership while maintaining technical depth.",
      strengths: ["C++ / System Level Design", "Scaling Logic", "Process Automation"],
      gaps: ["Vector Database Optimization", "RAG Pipeline Deployment", "API Cost Engineering"]
    },
    executionPlan: {
      skills: ["Prompt Engineering", "OpenAI / Claude APIs", "LangChain Basics"],
      projects: ["RAG Document Q&A Bot", "Agentic Workflow Builder"],
      outcome: "Build your first production-ready LLM wrapper service and gain confidence in AI integrations."
    },
    timeline: [
      { period: "Year 0–1", role: "AI Integration Engineer", resp: "Integrate managed AI APIs into existing SaaS platforms securely.", skills: ["Prompt Eng", "RAG", "Vector Search"], outcome: "Successfully deploying AI features to production.", salary: "₹15L - ₹22L" },
      { period: "Year 1–2", role: "Sr. AI Engineer", resp: "Design custom embeddings and optimize fine-tuned open-weight models.", skills: ["Fine-Tuning", "HuggingFace", "Python"], outcome: "Owning end-to-end model deployments for scale.", salary: "₹22L - ₹30L" },
      { period: "Year 2–3", role: "Lead AI Engineer", resp: "Architect multi-modal AI systems and mentor junior tier engineers.", skills: ["Multi-Agent Systems", "MLOps", "Model Evals"], outcome: "Leading a sub-team of AI practitioners.", salary: "₹30L - ₹38L" },
      { period: "Year 3–5+", role: "AI Solutions Architect", resp: "Define enterprise-wide AI strategy and govern primary cloud infrastructure.", skills: ["Enterprise Arch", "AI Strategy", "Cost Optimization"], outcome: "Driving organizational AI transformation.", salary: "₹38L - ₹45L+" }
    ]
  },
  "default": {
    header: { currentRole: "Software Engineer", targetRole: "AI Engineering Lead", timeline: "3-5 Years", currentSalary: "12L", targetSalary: "35L" },
    insights: {
      fit: "Your background in core engineering translates seamlessly into the fastest growing sector of modern tech. This path turns your deterministic programming skills into probabilistic model management.",
      strengths: ["Software Fundamentals", "Debugging Core Logic", "Team Collaboration"],
      gaps: ["Probability & Stats", "Transformers Core", "Model Serving Architecture"]
    },
    executionPlan: {
      skills: ["Python Mastery", "HuggingFace Libraries", "Docker & Kubernetes"],
      projects: ["End-to-End Sentiment Analyzer", "Containerized API Service"],
      outcome: "Deploy a resilient, scaleable open-source model endpoint from scratch."
    },
    timeline: [
      { period: "Year 0–1", role: "AI Developer", resp: "Consume and wrap cloud-managed LLMs into functional tools.", skills: ["API Design", "Prompt Tuning", "Frontend Integ"], outcome: "Creating functional generative applications.", salary: "₹14L - ₹20L" },
      { period: "Year 1–2", role: "AI Engineer", resp: "Implement local open-weights logic and standard vector search.", skills: ["Llama/Mistral", "ChromaDB", "Python Ecosystem"], outcome: "Moving beyond basic wrapper dependency.", salary: "₹20L - ₹26L" },
      { period: "Year 2–3", role: "Sr. AI Engineer", resp: "Maintain CI/CD for model lifecycle and automate fine-tuning.", skills: ["MLOps/LLMOps", "LoRA", "Data Pipelines"], outcome: "Securing production-grade deployments.", salary: "₹26L - ₹32L" },
      { period: "Year 3–5+", role: "AI Engineering Lead", resp: "Direct product-centric AI implementation and shape strategic technical roadmap.", skills: ["Technical Leadership", "System Design", "Product Strategy"], outcome: "Guiding the architectural future of the product.", salary: "₹32L - ₹38L+" }
    ]
  }
};

export const CuratedRoadmapStep = ({ onCommit, onBack, selectedRoleId }: CuratedRoadmapStepProps) => {
  const [committing, setCommitting] = useState(false);
  const [showBlueprint, setShowBlueprint] = useState(false);
  
  const data = selectedRoleId && EVOLUTION_DATA[selectedRoleId] 
    ? EVOLUTION_DATA[selectedRoleId] 
    : EVOLUTION_DATA["default"];

  const handleCommit = async () => {
    setCommitting(true);
    // Simulate API save delay for UX
    await new Promise((res) => setTimeout(res, 1200));
    onCommit();
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full overflow-hidden">
      
      {/* 1. CAREER TRANSFORMATION HEADER */}
      <div className="shrink-0 mb-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:bg-primary/20 transition-all duration-700" />
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <h2 className="text-2xl font-display font-bold mb-1 flex items-center gap-2">
              <Map className="w-5 h-5 text-primary" /> Career Evolution Path
            </h2>
            <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">
              {data.header.timeline} Transformation Roadmap
            </p>
          </div>
          <div className="text-right">
            <span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-xs font-bold tracking-widest shadow-[0_0_15px_rgba(45,212,191,0.2)]">
              HIGH CONFIDENCE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-8 relative z-10 w-full overflow-x-hidden md:overflow-visible">
          <div className="flex-1 min-w-[120px]">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block mb-1.5">Current Point A</span>
            <p className="font-bold text-foreground truncate">{data.header.currentRole}</p>
            <p className="text-sm font-display text-muted-foreground">₹{data.header.currentSalary}</p>
          </div>
          
          <div className="shrink-0 flex items-center justify-center relative flex-1 min-w-[80px]">
            <div className="h-px border-t border-dashed border-white/30 absolute w-full top-1/2 -translate-y-1/2 z-0" />
            <div className="bg-[#050B14] p-2 rounded-full border border-white/10 relative z-10">
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </div>

          <div className="flex-1 text-right min-w-[120px]">
            <span className="text-[10px] text-primary uppercase tracking-widest font-bold block mb-1.5">Target Point B</span>
            <p className="font-bold text-primary truncate drop-shadow-sm">{data.header.targetRole}</p>
            <p className="text-sm font-display text-primary">₹{data.header.targetSalary}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-6 space-y-6">
        
        {/* 3. PERSONALIZED INSIGHT PANEL */}
        <div className="bg-background/50 border border-border/50 rounded-2xl p-5 relative overflow-hidden">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-secondary" /> Personalized Insight
          </h3>
          <p className="text-sm leading-relaxed text-foreground/90 font-medium mb-6">
            "{data.insights.fit}"
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-black/20 rounded-xl p-4 border border-white/5">
              <span className="text-[10px] text-primary uppercase tracking-widest font-bold flex items-center gap-1.5 mb-3">
                <TrendingUp className="w-3 h-3" /> Leveraged Strengths
              </span>
              <ul className="space-y-2">
                {data.insights.strengths.map((str: string, i: number) => (
                  <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary/70 shrink-0" /> {str}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-black/20 rounded-xl p-4 border border-white/5">
              <span className="text-[10px] text-amber-500 uppercase tracking-widest font-bold flex items-center gap-1.5 mb-3">
                <AlertTriangle className="w-3 h-3" /> Critical Skill Gaps
              </span>
              <ul className="space-y-2">
                {data.insights.gaps.map((gap: string, i: number) => (
                  <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                    <Target className="w-3.5 h-3.5 text-amber-500/70 shrink-0" /> {gap}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 4. FIRST 90-DAY EXECUTION PLAN */}
        <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-2xl p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-primary/20 transition-all duration-700" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-1 flex items-center gap-2">
            <Zap className="w-4 h-4" /> First 90-Day Execution Plan
          </h3>
          <p className="text-xs text-muted-foreground mb-5">Accelerated short-term sprints to build monumental momentum.</p>

          <div className="grid md:grid-cols-3 gap-3 mb-4 relative z-10">
            <div className="bg-black/40 border border-white/10 rounded-xl p-3 shadow-inner">
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold block mb-2">Core Skills</span>
              <div className="flex flex-wrap gap-1.5">
                {data.executionPlan.skills.map((skill: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/5 border border-white/10 text-slate-300">{skill}</span>
                ))}
              </div>
            </div>
            <div className="bg-black/40 border border-white/10 rounded-xl p-3 shadow-inner">
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold block mb-2">Target Projects</span>
              <ul className="space-y-1.5">
                 {data.executionPlan.projects.map((proj: string, i: number) => (
                    <li key={i} className="text-[10px] text-slate-300 list-disc list-inside">{proj}</li>
                 ))}
              </ul>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 shadow-inner flex flex-col justify-center text-center items-center">
              <span className="text-[9px] uppercase tracking-widest text-primary/80 font-bold block mb-1">Expected Outcome</span>
              <p className="text-[10px] font-bold text-primary leading-tight">{data.executionPlan.outcome}</p>
            </div>
          </div>
        </div>

        {/* 2. CAREER EVOLUTION TIMELINE */}
        <div className="bg-background/50 border border-border/50 rounded-2xl p-5">
           <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
            <Clock className="w-4 h-4 text-neon" /> Career Evolution Roadmap
           </h3>
           
           <div className="relative border-l border-white/10 ml-3 lg:ml-6 mt-2 pb-4 space-y-8">
              {data.timeline.map((stage: any, index: number) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 15 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: index * 0.15 + 0.2 }}
                  className="pl-6 relative group"
                >
                  {/* Node Connector */}
                  <div className={`absolute w-3 h-3 rounded-full border-2 left-[-6.5px] top-1.5 transition-colors duration-500 scale-110 shadow-lg ${index === 0 ? 'bg-primary border-primary shadow-[0_0_15px_rgba(45,212,191,0.5)]' : 'bg-[#050B14] border-slate-600 group-hover:border-primary/50'}`} />

                  {/* Period & Salary Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-black/40 border ${index === 0 ? 'border-primary/50 text-primary' : 'border-white/5 text-slate-400'}`}>
                      {stage.period}
                    </span>
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-widest flex items-center gap-1"><Briefcase className="w-3 h-3" /> {stage.salary}</span>
                  </div>

                  {/* Stage Card */}
                  <div className={`bg-white/5 border rounded-xl p-4 transition-all duration-300 ${index === 0 ? 'border-primary/30 shadow-[0_0_20px_rgba(45,212,191,0.05)]' : 'border-white/10 group-hover:border-white/20'}`}>
                    <h4 className={`text-lg font-display font-bold mb-1 ${index === 0 ? 'text-primary' : 'text-foreground'}`}>
                      {stage.role}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed font-medium mb-3">
                      {stage.resp}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/5">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block mb-1.5">Acquired Mastery</span>
                        <div className="flex flex-wrap gap-1.5">
                          {stage.skills.map((skill: string, i: number) => (
                            <span key={i} className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/40 text-slate-300 border border-white/5">{skill}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col justify-end">
                        <span className="text-[9px] uppercase tracking-widest text-secondary/70 font-bold block mb-1.5">Milestone Outcome</span>
                        <p className="text-[10px] text-slate-300 flex items-start gap-1.5 font-medium leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" /> {stage.outcome}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>

      </div>

      {/* 5. CTA PANEL */}
      <div className="pt-4 mt-auto border-t border-white/5 flex flex-col sm:flex-row justify-between items-center shrink-0 bg-background/80 backdrop-blur-md pb-2 gap-4 z-20 relative">
        <button onClick={onBack} disabled={committing} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors font-medium group py-2 w-full sm:w-auto justify-center disabled:opacity-50">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Market Data
        </button>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button 
            onClick={() => setShowBlueprint(true)}
            className="px-6 py-3.5 bg-secondary/10 border border-secondary/20 text-secondary font-bold rounded-full hover:bg-secondary/20 transition-all flex items-center justify-center gap-2 text-sm w-full sm:w-auto"
          >
            <FileText className="w-4 h-4" /> Generate Blueprint
          </button>
          <button 
            onClick={handleCommit}
            disabled={committing}
            className="px-8 py-3.5 bg-gradient-to-r from-primary to-[#29F2B9] text-[#0A1017] font-bold rounded-full hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(45,212,191,0.2)] hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] disabled:opacity-75 disabled:scale-100 disabled:cursor-wait w-full sm:w-auto group relative overflow-hidden"
          >
            {committing ? "Booting Career OS..." : "Start My Journey"} 
            {!committing && <Rocket className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
            {committing && <div className="absolute inset-0 bg-white/20 animate-pulse" />}
          </button>
        </div>
      </div>
      
      <CareerBlueprintModal 
        isOpen={showBlueprint} 
        onClose={() => setShowBlueprint(false)} 
        roleId={selectedRoleId} 
      />
    </motion.div>
  );
};
