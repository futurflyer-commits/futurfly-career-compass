import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Share2, Target, BrainCircuit, TrendingUp, Zap, Clock, ShieldCheck, CheckCircle2, Award, FileText, Rocket, Sparkles, Map, Briefcase } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { SkillGapWheel } from "@/components/SkillGapWheel";

interface CareerBlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  roleId: string | null;
}

// Reuse mock logic locally for the overlay report consistency
const MARKET_DATA: Record<string, any> = {
  "role-1": { title: "AI Solutions Architect", viability: { recommendation: "Strong", demandGrowth: "Very High" }, signals: { hiringYoY: "+35%" } },
  "default": { title: "AI Engineering Lead", viability: { recommendation: "Strong", demandGrowth: "Explosive" }, signals: { hiringYoY: "+40%" } }
};

const EVOLUTION_DATA: Record<string, any> = {
  "role-1": {
    header: { currentRole: "Software Engineer", targetRole: "AI Solutions Architect", timeline: "3-5 Years", currentSalary: "12L", targetSalary: "45L" },
    insights: { fit: "Your strong system design background provides a structural advantage for orchestrating LLM infrastructure.", strengths: ["C++ / System Level Design", "Scaling Logic", "Process Automation"], gaps: ["Vector Database Optimization", "RAG Pipeline Deployment", "API Cost Engineering"] },
    executionPlan: { skills: ["Prompt Engineering", "OpenAI / Claude APIs", "LangChain Basics"], projects: ["RAG Document Q&A Bot", "Agentic Workflow Builder"], outcome: "Build your first production-ready LLM wrapper service and gain confidence in AI integrations." },
    timeline: [
      { period: "Year 0–1", role: "AI Integration Engineer", resp: "Integrate managed AI APIs into existing SaaS platforms securely.", skills: ["Prompt Eng", "RAG", "Vector Search"], outcome: "Successfully deploying AI features to production.", salary: "₹15L - ₹22L" },
      { period: "Year 1–2", role: "Sr. AI Engineer", resp: "Design custom embeddings and optimize fine-tuned open-weight models.", skills: ["Fine-Tuning", "HuggingFace", "Python"], outcome: "Owning end-to-end model deployments for scale.", salary: "₹22L - ₹30L" },
      { period: "Year 2–3", role: "Lead AI Engineer", resp: "Architect multi-modal AI systems and mentor junior tier engineers.", skills: ["Multi-Agent Systems", "MLOps", "Model Evals"], outcome: "Leading a sub-team of AI practitioners.", salary: "₹30L - ₹38L" },
      { period: "Year 3–5+", role: "AI Solutions Architect", resp: "Define enterprise-wide AI strategy and govern primary cloud infrastructure.", skills: ["Enterprise Arch", "AI Strategy", "Cost Optimization"], outcome: "Driving organizational AI transformation.", salary: "₹38L - ₹45L+" }
    ]
  },
  "default": {
    header: { currentRole: "Software Engineer", targetRole: "AI Engineering Lead", timeline: "3-5 Years", currentSalary: "12L", targetSalary: "35L" },
    insights: { fit: "Your background in core engineering translates seamlessly into the fastest growing sector of modern tech.", strengths: ["Software Fundamentals", "Debugging Core Logic", "Team Collaboration"], gaps: ["Probability & Stats", "Transformers Core", "Model Serving Architecture"] },
    executionPlan: { skills: ["Python Mastery", "HuggingFace Libraries", "Docker & Kubernetes"], projects: ["End-to-End Sentiment Analyzer", "Containerized API Service"], outcome: "Deploy a resilient, scaleable open-source model endpoint from scratch." },
    timeline: [
      { period: "Year 0–1", role: "AI Developer", resp: "Consume and wrap cloud-managed LLMs into functional tools.", skills: ["API Design", "Prompt Tuning", "Frontend Integ"], outcome: "Creating functional generative applications.", salary: "₹14L - ₹20L" },
      { period: "Year 1–2", role: "AI Engineer", resp: "Implement local open-weights logic and standard vector search.", skills: ["Llama/Mistral", "ChromaDB", "Python Ecosystem"], outcome: "Moving beyond basic wrapper dependency.", salary: "₹20L - ₹26L" },
      { period: "Year 2–3", role: "Sr. AI Engineer", resp: "Maintain CI/CD for model lifecycle and automate fine-tuning.", skills: ["MLOps/LLMOps", "LoRA", "Data Pipelines"], outcome: "Securing production-grade deployments.", salary: "₹26L - ₹32L" },
      { period: "Year 3–5+", role: "AI Engineering Lead", resp: "Direct product-centric AI implementation and shape strategic technical roadmap.", skills: ["Technical Leadership", "System Design", "Product Strategy"], outcome: "Guiding the architectural future of the product.", salary: "₹32L - ₹38L+" }
    ]
  }
};

const MOCK_WHEEL_DATA = {
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

export const CareerBlueprintModal = ({ isOpen, onClose, roleId }: CareerBlueprintModalProps) => {
  const { user } = useAuth();
  const [persona, setPersona] = useState<any>(null);
  const [wheelData, setWheelData] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const market = roleId && MARKET_DATA[roleId] ? MARKET_DATA[roleId] : MARKET_DATA["default"];
  const evolution = roleId && EVOLUTION_DATA[roleId] ? EVOLUTION_DATA[roleId] : EVOLUTION_DATA["default"];

  useEffect(() => {
    async function fetchData() {
      if (user && isOpen) {
        // Fetch persona
        const { data: pData } = await supabase.from("profiles").select("discovery_persona").eq("id", user.id).single();
        if (pData?.discovery_persona) {
          setPersona(pData.discovery_persona);
        } else {
          // Fallback to local storage if supabase syncing failed
          const local = localStorage.getItem("futurfly_persona_result");
          if (local) setPersona(JSON.parse(local));
        }
        
        // Fetch wheel data
        const { data: wData } = await supabase.rpc("get_user_skill_wheel", {
          p_user_id: user.id,
          p_role_id: roleId
        });
        if (wData) {
          setWheelData(wData);
        }
      }
    }
    fetchData();
  }, [user, isOpen, roleId]);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const addScaledImageToPDF = async (pageId: string) => {
        const element = document.getElementById(pageId);
        if (!element) return;
        const canvas = await html2canvas(element, { scale: 2, backgroundColor: "#060b13", logging: false });
        const imgData = canvas.toDataURL("image/png");
        
        let finalHeight = (canvas.height * pdfWidth) / canvas.width;
        let finalWidth = pdfWidth;

        if (finalHeight > pdfHeight) {
           const ratio = pdfHeight / finalHeight;
           finalHeight = pdfHeight;
           finalWidth = finalWidth * ratio;
        }

        const xOffset = (pdfWidth - finalWidth) / 2;
        pdf.addImage(imgData, "PNG", xOffset, 0, finalWidth, finalHeight);
      };

      await addScaledImageToPDF("blueprint-page-1");
      pdf.addPage();
      await addScaledImageToPDF("blueprint-page-2");
      
      pdf.save(`FuturFly_Blueprint_${market.title.replace(/\s+/g, '_')}.pdf`);
    } catch (e) {
      console.error(e);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`https://app.futurfly.io/blueprint/${user?.id || 'demo'}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      >
        <div className="w-full max-w-5xl h-[90vh] bg-card border border-border/50 rounded-3xl shadow-2xl flex flex-col relative overflow-hidden">
          
          {/* Header Actions */}
          <div className="flex justify-between items-center p-6 border-b border-white/5 bg-background/50 relative z-20 shrink-0">
            <div>
              <h2 className="text-xl font-display font-bold flex items-center gap-2"><FileText className="w-5 h-5 text-neon" /> Career Blueprint Report</h2>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1 font-bold">Confidential Strategic Snapshot</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleShare} className="px-4 py-2 rounded-full border border-border/50 bg-background/50 hover:bg-muted text-sm font-bold transition-colors flex items-center gap-2">
                <Share2 className="w-4 h-4" /> {copied ? "Copied!" : "Share"}
              </button>
              <button 
                onClick={handleDownload} 
                disabled={isDownloading}
                className="px-5 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 font-bold transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> {isDownloading ? "Generating..." : "Download PDF"}
              </button>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 ml-2 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Report Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar relative">
             <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] pointer-events-none rounded-full" />
             <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 blur-[100px] pointer-events-none rounded-full" />
             
             {/* Document Capture Context */}
             <div className="w-full flex flex-col gap-12 bg-[#060b13] relative z-10 w-full pb-20">
             
             {/* --- PAGE 1 --- */}
             <div id="blueprint-page-1" className="w-full flex flex-col p-6 md:p-10 gap-5 bg-[#060b13] relative overflow-hidden shrink-0 pb-4">
                 <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] pointer-events-none rounded-full" />
                 <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 blur-[100px] pointer-events-none rounded-full" />
                
                {/* Impressive Report Header */}
                <div className="flex flex-col items-center justify-center text-center space-y-4 pt-4 pb-2">
                   <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
                     <span className="text-[10px] uppercase tracking-widest font-bold text-primary flex items-center gap-2"><Sparkles className="w-3 h-3" /> curated by FuturFly</span>
                   </div>
                   <h1 className="text-3xl md:text-4xl font-display font-black text-white drop-shadow-[0_0_20px_rgba(45,212,191,0.2)] uppercase tracking-tight max-w-full px-4 whitespace-nowrap leading-[1.1]">
                     Strategic Career Evolution Plan
                   </h1>
                   <p className="text-sm font-medium text-slate-400 max-w-xl mx-auto align-center md:px-6">
                      A personalized, data-backed 3-5 year trajectory to maximize your market value and align your innate capability with premium industry demand.
                   </p>
                </div>
                
                {/* 1 & 2. Persona & Target Overview Banner */}
                <div className="flex flex-col md:flex-row gap-6 bg-white/5 rounded-2xl p-6 border border-white/10">
                   {/* Persona Block */}
                   <div className="flex-1 border-r border-white/5 pr-6 flex flex-col sm:flex-row gap-4">
                     {/* Persona Image */}
                     <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-border/50 shrink-0 bg-black/40 shadow-inner">
                       <img 
                         src={`/personas/${(persona?.persona || "Emerging Builder").toLowerCase().replace(/ /g, "_")}.png`} 
                         alt="Persona" 
                         className="w-full h-full object-cover"
                         onError={(e) => { e.currentTarget.style.display = 'none'; }}
                       />
                     </div>
                     <div className="flex-1 flex flex-col justify-center">
                       <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1.5 block flex items-center gap-1.5"><BrainCircuit className="w-3 h-3 text-secondary" /> Mapped Identity</span>
                       <h3 className="text-xl md:text-2xl font-display font-bold text-secondary mb-2 leading-none">{persona?.persona || "The Emerging Builder"}</h3>
                       <div className="flex flex-col gap-1.5 mt-1">
                          <div className="flex items-center justify-between text-[9px] text-slate-300 font-bold uppercase tracking-widest">
                             <span>Adaptability</span>
                             <span className="text-primary">{persona?.scores?.adaptability || 85}%</span>
                          </div>
                          <div className="w-full h-1 bg-black/60 rounded-full overflow-hidden border border-white/5">
                            <div className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full" style={{ width: `${persona?.scores?.adaptability || 85}%` }} />
                          </div>
                          <div className="flex items-center justify-between text-[9px] text-slate-300 font-bold uppercase tracking-widest mt-1">
                             <span>Strategy Alignment</span>
                             <span className="text-secondary">{persona?.scores?.sc || 92}%</span>
                          </div>
                          <div className="w-full h-1 bg-black/60 rounded-full overflow-hidden border border-white/5">
                            <div className="h-full bg-gradient-to-r from-secondary/50 to-secondary rounded-full" style={{ width: `${persona?.scores?.sc || 92}%` }} />
                          </div>
                       </div>
                     </div>
                   </div>
                   
                   {/* Target Role Block */}
                   <div className="flex-1 md:pl-6">
                     <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-2 block flex items-center gap-1.5"><Target className="w-3 h-3 text-primary" /> Projected Target</span>
                     <h3 className="text-2xl font-display font-bold text-primary mb-2">{market.title}</h3>
                     <div className="flex items-center gap-3 mb-4">
                       <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">{market.viability.recommendation} Buy-in</span>
                       <span className="text-xs font-bold text-slate-300"><TrendingUp className="w-3 h-3 inline mr-1" />{market.signals.hiringYoY} YoY Growth</span>
                     </div>
                     <p className="text-sm font-display text-white mt-auto">Trajectory Limit: <strong className="text-neon">₹{evolution.header.targetSalary}</strong></p>
                   </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* 3. Skill Snapshot */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-slate-400" /> Skill & Execution Delta</h4>
                    <div className="bg-black/20 border border-white/5 rounded-xl p-5 mb-4">
                      <span className="text-[10px] text-primary uppercase font-bold block mb-3">Leveraged Trait Strengths</span>
                      <ul className="space-y-2">
                        {evolution.insights.strengths.map((str: string, i: number) => (
                          <li key={i} className="text-sm text-slate-300 flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {str}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-black/20 border border-white/5 rounded-xl p-5">
                      <span className="text-[10px] text-amber-500 uppercase font-bold block mb-3">Critical Skill Gaps</span>
                      <ul className="space-y-2">
                        {evolution.insights.gaps.map((gap: string, i: number) => (
                          <li key={i} className="text-sm text-slate-300 flex gap-2"><Zap className="w-4 h-4 text-amber-500 shrink-0" /> {gap}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 5. 90-Day Execution  */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center justify-center gap-2"><Zap className="w-4 h-4 text-neon" /> 90-Day Execution Sprint</h4>
                    <div className="bg-gradient-to-br from-neon/10 to-transparent border border-neon/20 rounded-xl p-6 h-[calc(100%-2rem)] flex flex-col justify-center items-center text-center">
                      <div>
                        <span className="text-[10px] text-neon uppercase font-bold block mb-2">Target Skills to Base-line</span>
                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                           {evolution.executionPlan.skills.map((s: string, i: number) => (
                             <span key={i} className="px-2 py-1 rounded bg-black/40 text-[10px] font-bold text-slate-300 border border-white/10">{s}</span>
                           ))}
                        </div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block mb-2">Portfolio Objectives</span>
                        <ul className="space-y-1 mb-6 text-center mx-auto inline-block">
                          {evolution.executionPlan.projects.map((p: string, i: number) => <li key={i} className="text-sm text-slate-300">{p}</li>)}
                        </ul>
                      </div>
                      <div className="border-t border-neon/20 pt-4 w-full">
                         <span className="text-[10px] text-neon uppercase font-bold block mb-1">Q1 Expected Outcome</span>
                         <p className="text-sm font-medium text-white">{evolution.executionPlan.outcome}</p>
                      </div>
                    </div>
                  </div>
                </div>

                 {/* Visual Skill Matrix */}
                 <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center relative w-full mb-2">
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center justify-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Core Competency Matrix</h4>
                    <div className="w-full max-w-2xl h-[340px] relative flex justify-center items-center">
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                       <div className="bg-[#11131a]/95 w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-2xl border border-border/20 backdrop-blur-md">
                         <span className="text-2xl font-display font-bold text-white leading-none">{wheelData?.overall_score || MOCK_WHEEL_DATA.overall_score}%</span>
                         <span className="text-[8px] uppercase tracking-widest text-muted-foreground/80 mt-1 font-bold">Readiness</span>
                       </div>
                     </div>
                     <div className="relative z-10 w-full h-full pointer-events-auto">
                       <SkillGapWheel 
                         data={wheelData?.clusters || MOCK_WHEEL_DATA.clusters} 
                         showRoleOverlay={true} 
                         onClusterClick={() => {}} 
                       />
                     </div>
                   </div>
                </div>

                {/* 4. Evolution Summary */}
                <div>
                   <h4 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center justify-center gap-2"><Clock className="w-4 h-4 text-primary" /> 5-Year High-Level Trajectory</h4>
                   <div className="flex flex-col sm:flex-row gap-4">
                     {evolution.timeline.map((step: any, i: number) => (
                        <div key={i} className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center text-center relative justify-center">
                          <span className="text-[9px] uppercase font-bold text-muted-foreground bg-black/40 px-2 py-1 rounded mb-3">{step.period}</span>
                          <h5 className="font-bold text-base text-foreground mb-1">{step.role}</h5>
                          <p className="text-[10px] text-primary font-bold uppercase tracking-wider mb-4"><Award className="w-3 h-3 inline mr-1" />{step.salary}</p>
                          <p className="text-xs text-slate-400 leading-relaxed mt-auto pt-4 border-t border-white/5 w-full">{step.outcome}</p>
                        </div>
                     ))}
                   </div>
                </div>
                
                 {/* Footer Branding (Page 1) */}
                 <div className="pt-4 mt-2 border-t border-white/10 flex items-center justify-between relative z-10 w-full">
                    <div className="flex items-center gap-2 drop-shadow-[0_0_20px_rgba(45,212,191,0.4)]">
                        <img src="/logo.png" alt="FuturFly Logo" className="h-8 md:h-10 object-contain" />
                    </div>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">© {new Date().getFullYear()} FuturFly. All rights reserved. (High-Level Brief)</p>
                 </div>
             </div> {/* End Page 1 Container */}
                
             {/* --- PAGE 2: DETAILED TIMELINE --- */}
             <div id="blueprint-page-2" className="w-full flex flex-col p-6 md:p-10 gap-6 bg-[#060b13] relative overflow-hidden shrink-0 mt-8 border-t-2 border-dashed border-white/10">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-primary/5 blur-[120px] pointer-events-none rounded-full" />
                 
                 <div className="flex flex-col items-center justify-center text-center space-y-2 mb-2">
                   <span className="text-[10px] uppercase tracking-widest font-bold text-primary flex items-center justify-center gap-2"><Map className="w-3 h-3" /> Detailed Projection</span>
                   <h2 className="text-3xl font-display font-black text-white drop-shadow-[0_0_20px_rgba(45,212,191,0.2)] uppercase tracking-tight">Career Evolution Roadmap</h2>
                 </div>
                 
                 <div className="relative border-l border-white/10 mx-auto max-w-4xl w-full select-none mt-2">
                     {evolution.timeline.map((stage: any, index: number) => (
                        <div key={index} className="pl-6 sm:pl-10 relative mb-12">
                          <div className={`absolute w-4 h-4 rounded-full border-2 left-[-8.5px] top-1.5 ${index === 0 ? 'bg-primary border-primary shadow-[0_0_15px_rgba(45,212,191,0.5)]' : 'bg-[#050B14] border-slate-600'}`} />
                          
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded bg-black/40 border inline-block ${index === 0 ? 'border-primary/50 text-primary' : 'border-white/5 text-slate-400'}`}>
                              {stage.period}
                            </span>
                            <span className="text-[10px] font-bold text-secondary uppercase tracking-widest flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> {stage.salary}</span>
                          </div>
                          
                          <div className={`bg-white/5 border rounded-2xl p-6 ${index === 0 ? 'border-primary/30 shadow-[0_0_20px_rgba(45,212,191,0.05)]' : 'border-white/10'}`}>
                            <h4 className={`text-xl font-display font-bold mb-2 ${index === 0 ? 'text-primary' : 'text-foreground'}`}>
                              {stage.role}
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed font-medium mb-5">
                              {stage.resp || stage.outcome}
                            </p>
                            
                            <div className="grid sm:grid-cols-2 gap-6 mt-5 pt-5 border-t border-white/5">
                              <div>
                                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block mb-2">Acquired Mastery</span>
                                <div className="flex flex-wrap gap-2">
                                  {stage.skills?.map((skill: string, i: number) => (
                                    <span key={i} className="px-2.5 py-1 rounded text-[10px] font-medium bg-black/40 text-slate-300 border border-white/5">{skill}</span>
                                  ))}
                                </div>
                              </div>
                              <div className="flex flex-col justify-end">
                                <span className="text-[10px] uppercase tracking-widest text-secondary/70 font-bold block mb-2">Milestone Outcome</span>
                                <p className="text-xs text-slate-300 flex items-start gap-2 font-medium leading-relaxed">
                                  <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" /> {stage.outcome}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                     ))}
                   </div>

                 {/* Footer Branding (Page 2) */}
                 <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between relative z-10 w-full">
                    <div className="flex items-center gap-2 drop-shadow-[0_0_20px_rgba(45,212,191,0.4)]">
                        <img src="/logo.png" alt="FuturFly Logo" className="h-8 md:h-10 object-contain" />
                    </div>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">© {new Date().getFullYear()} FuturFly. All rights reserved. (Detailed Track)</p>
                 </div>
             </div> {/* End Page 2 Container */}

             </div> {/* End Document Capture Context */}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
