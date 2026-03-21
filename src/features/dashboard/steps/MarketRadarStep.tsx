import { CheckCircle2, TrendingUp, ShieldCheck, Target, ArrowRight, ArrowLeft, BrainCircuit, Globe, Building2, UserCircle, Briefcase, Zap, AlertTriangle, BadgeCheck, Star } from "lucide-react";
import { motion } from "framer-motion";

interface MarketRadarStepProps {
  onNext: () => void;
  onBack: () => void;
  selectedRoleId: string | null;
}

const MARKET_DATA: Record<string, any> = {
  "role-1": { 
    title: "AI Solutions Architect", 
    viability: { demandGrowth: "Very High", salaryPotential: "₹25L-₹45L", competition: "Moderate", automationRisk: "Low", entryBarrier: "High", recommendation: "Strong" },
    signals: { hiringYoY: "+35%", cities: "Bengaluru, Pune", industries: "IT Services", trendLabel: "High Demand" },
    scarcity: { opportunity: "High", demandSupplyRatio: "Demand outpaces supply 3:1" },
    fit: "Your system design background and cloud capabilities make you a natural orchestrator for high-level AI integrations.",
    guidance: "Exceptional balance of high demand and leadership trajectory. Ideal transition target.",
  },
  "role-2": { 
    title: "GenAI Product Lead", 
    viability: { demandGrowth: "Explosive", salaryPotential: "₹20L-₹38L", competition: "Low", automationRisk: "Low", entryBarrier: "High", recommendation: "Strong" },
    signals: { hiringYoY: "+52%", cities: "NCR, Hyderabad", industries: "Startups, SaaS", trendLabel: "Emerging" },
    scarcity: { opportunity: "Very High", demandSupplyRatio: "Severe talent shortage (5:1 ratio)" },
    fit: "Leverages your existing product management skills while pivoting you into the highest-growth sector of the tech economy.",
    guidance: "Highly recommended path. Perfect for leaders who want to shape the future of software interaction.",
  },
  "role-3": { 
    title: "ML Engineering Manager", 
    viability: { demandGrowth: "Steady", salaryPotential: "₹30L-₹50L", competition: "High", automationRisk: "Medium", entryBarrier: "Very High", recommendation: "Moderate" },
    signals: { hiringYoY: "+18%", cities: "Pune, Bengaluru", industries: "Enterprise Tech", trendLabel: "Stable" },
    scarcity: { opportunity: "Medium", demandSupplyRatio: "Balanced talent ecosystem" },
    fit: "Your engineering management history provides the baseline needed to lead complex technical data science teams.",
    guidance: "A solid, stable path for senior engineers looking to scale impact.",
  },
  "role-4": { 
    title: "Senior MLOps Engineer", 
    viability: { demandGrowth: "High", salaryPotential: "₹22L-₹40L", competition: "Low", automationRisk: "Low", entryBarrier: "High", recommendation: "Strong" },
    signals: { hiringYoY: "+42%", cities: "Bengaluru, Remote", industries: "HealthTech", trendLabel: "High Demand" },
    scarcity: { opportunity: "High", demandSupplyRatio: "Critical infrastructural bottleneck" },
    fit: "Capitalizes on your solid DevOps foundations by appending highly lucrative ML pipeline skills.",
    guidance: "One of the highest premiums paid currently due to scarcity of production-grade deployment talent.",
  },
  "role-5": { 
    title: "Data Platform Architect", 
    viability: { demandGrowth: "Moderate", salaryPotential: "₹28L-₹55L", competition: "Moderate", automationRisk: "Medium", entryBarrier: "Very High", recommendation: "Moderate" },
    signals: { hiringYoY: "+15%", cities: "Mumbai, Pune", industries: "Banking, Retail", trendLabel: "Stable" },
    scarcity: { opportunity: "Medium", demandSupplyRatio: "Consistent need for senior talent" },
    fit: "Fits perfectly with your established backend data engineering trajectories.",
    guidance: "Strong evolutionary path for senior engineers prioritizing stability and compensation over hype.",
  },
  "role-6": { 
    title: "AI UX Researcher", 
    viability: { demandGrowth: "Emerging", salaryPotential: "₹18L-₹30L", competition: "Low", automationRisk: "High", entryBarrier: "Medium", recommendation: "Strong" },
    signals: { hiringYoY: "+65%", cities: "Bengaluru, Remote", industries: "B2C AI Apps", trendLabel: "Emerging" },
    scarcity: { opportunity: "High", demandSupplyRatio: "Virtually no established senior talent" },
    fit: "Your qualitative analysis and design thinking are the exact counter-balance needed for raw LLM wrappers.",
    guidance: "Incredible blue-ocean opportunity for design professionals looking to specialize.",
  },
  "role-7": { 
    title: "Edge AI Specialist", 
    viability: { demandGrowth: "High", salaryPotential: "₹25L-₹45L", competition: "Very Low", automationRisk: "Low", entryBarrier: "Very High", recommendation: "Strong" },
    signals: { hiringYoY: "+38%", cities: "Chennai, Pune", industries: "IoT, Automotive", trendLabel: "High Demand" },
    scarcity: { opportunity: "High", demandSupplyRatio: "Deep-tech barrier preventing saturation" },
    fit: "Perfect utilization of your low-level systems programming background (C/C++).",
    guidance: "Deep tech specialization commanding a high premium in hardware-centric companies.",
  },
  "role-8": { 
    title: "Cloud AI Developer", 
    viability: { demandGrowth: "High", salaryPotential: "₹15L-₹28L", competition: "Very High", automationRisk: "Medium", entryBarrier: "Low", recommendation: "Moderate" },
    signals: { hiringYoY: "+25%", cities: "Pan India", industries: "Consulting", trendLabel: "Stable" },
    scarcity: { opportunity: "Medium", demandSupplyRatio: "High demand, but rapidly filling supply" },
    fit: "Provides the fastest ROI on your current full-stack React framework skills.",
    guidance: "Excellent first step into the AI ecosystem, though long-term differentiation is required.",
  },
  "role-9": { 
    title: "Quantitative AI Analyst", 
    viability: { demandGrowth: "Moderate", salaryPotential: "₹30L-₹60L", competition: "High", automationRisk: "High", entryBarrier: "Very High", recommendation: "Moderate" },
    signals: { hiringYoY: "+12%", cities: "Mumbai, Gurugram", industries: "Hedge Funds", trendLabel: "Stable" },
    scarcity: { opportunity: "Medium", demandSupplyRatio: "Highly competitive, niche market" },
    fit: "Pairs your deep statistical mathematics background directly to capital markets.",
    guidance: "Lucrative domain transition requiring immense mathematical rigor and domain specific knowledge.",
  },
  "role-10": { 
    title: "AI Prompt Engineer", 
    viability: { demandGrowth: "Declining", salaryPotential: "₹12L-₹20L", competition: "Extreme", automationRisk: "Very High", entryBarrier: "Low", recommendation: "Weak" },
    signals: { hiringYoY: "-25%", cities: "Global Remote", industries: "Content Agencies", trendLabel: "Declining" },
    scarcity: { opportunity: "Low", demandSupplyRatio: "Severe oversupply of entry-level talent" },
    fit: "Utilizes your creative logic, but faces intense macro-economic headwinds.",
    guidance: "We strongly advise pivoting to a more defensible technical or product-oriented role.",
  },
};

export const MarketRadarStep = ({ onNext, onBack, selectedRoleId }: MarketRadarStepProps) => {
  const data = selectedRoleId && MARKET_DATA[selectedRoleId] 
    ? MARKET_DATA[selectedRoleId] 
    : MARKET_DATA["role-1"];

  const isStrong = data.viability.recommendation === "Strong";
  const isWeak = data.viability.recommendation === "Weak";

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full">
      <div className="mb-6 shrink-0">
        <h2 className="text-2xl font-display font-bold mb-2 text-foreground">Market Intelligence</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Evaluating the viability and long-term opportunity for <strong className="text-foreground tracking-wide">{data.title}</strong>.
        </p>
      </div>

      <div className="flex-1 space-y-4 lg:space-y-6 overflow-y-auto custom-scrollbar pr-2 pb-6">
        
        {/* RECOMMENDATION BANNER */}
        <div className={`p-4 rounded-xl border flex items-start gap-4 shadow-sm relative overflow-hidden group ${
            isStrong ? "bg-primary/10 border-primary/30 text-primary" : 
            isWeak ? "bg-destructive/10 border-destructive/30 text-destructive" :
            "bg-amber-500/10 border-amber-500/30 text-amber-500"
          }`}>
          <div className="mt-0.5 shrink-0 relative z-10">
            {isStrong ? <BadgeCheck className="w-6 h-6" /> : isWeak ? <AlertTriangle className="w-6 h-6" /> : <Target className="w-6 h-6" />}
          </div>
          <div className="relative z-10">
            <h3 className="font-bold text-sm lg:text-base mb-1 text-foreground flex items-center gap-2">
              {data.viability.recommendation} Buy-in Recommended
            </h3>
            <p className={`text-xs lg:text-sm leading-relaxed ${isStrong ? "text-primary/90" : isWeak ? "text-destructive/90" : "text-amber-500/90"}`}>
              {data.guidance}
            </p>
          </div>
        </div>

        {/* ROLE VIABILITY SCORECARD */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 px-1 flex items-center gap-2">
            <Target className="w-3.5 h-3.5" /> Viability Scorecard
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
             <div className="bg-background/50 border border-border/50 p-4 rounded-xl">
               <span className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1.5 font-bold block">Demand Growth</span>
               <span className="text-sm lg:text-base font-bold text-foreground flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" /> {data.viability.demandGrowth}</span>
             </div>
             <div className="bg-background/50 border border-border/50 p-4 rounded-xl">
               <span className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1.5 font-bold block">Salary Potential</span>
               <span className="text-sm lg:text-base font-bold text-secondary flex items-center gap-2"><Zap className="w-4 h-4" /> {data.viability.salaryPotential}</span>
             </div>
             <div className="bg-background/50 border border-border/50 p-4 rounded-xl">
               <span className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1.5 font-bold block">Competition</span>
               <span className="text-sm lg:text-base font-bold text-foreground flex items-center gap-2"><Briefcase className="w-4 h-4 text-amber-500" /> {data.viability.competition}</span>
             </div>
             <div className="bg-background/50 border border-border/50 p-4 rounded-xl">
               <span className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1.5 font-bold block">Automation Risk</span>
               <span className="text-sm lg:text-base font-bold text-foreground flex items-center gap-2"><ShieldCheck className={`w-4 h-4 ${data.viability.automationRisk === "Low" ? "text-primary" : "text-destructive"}`} /> {data.viability.automationRisk}</span>
             </div>
             <div className="bg-background/50 border border-border/50 p-4 rounded-xl">
               <span className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1.5 font-bold block">Entry Barrier</span>
               <span className="text-sm lg:text-base font-bold text-foreground flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-slate-400" /> {data.viability.entryBarrier}</span>
             </div>
             <div className="bg-background/50 border border-border/50 p-4 rounded-xl relative overflow-hidden group">
               <div className={`absolute top-0 right-0 w-16 h-16 blur-xl -translate-y-4 translate-x-4 rounded-full transition-all group-hover:scale-110 ${isStrong ? 'bg-primary/10' : isWeak ? 'bg-destructive/10' : 'bg-amber-500/10'}`} />
               <span className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1.5 font-bold block relative z-10">Verdict</span>
               <span className={`text-sm lg:text-base font-bold flex items-center gap-2 relative z-10 ${isStrong ? "text-primary" : isWeak ? "text-destructive" : "text-amber-500"}`}>
                 <Star className="w-4 h-4 inline" /> {data.viability.recommendation}
               </span>
             </div>
          </div>
        </div>

        {/* MARKET SIGNALS & SKILL SCARCITY */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-background/50 border border-border/50 rounded-2xl p-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2"><Globe className="w-4 h-4 text-neon" /> Market Signals</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-xs text-slate-400">Hiring Growth (YoY)</span>
                <span className="text-sm font-bold text-foreground">{data.signals.hiringYoY}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-xs text-slate-400">Top Cities</span>
                <span className="text-xs font-medium text-foreground text-right">{data.signals.cities}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-xs text-slate-400">Top Industries</span>
                <span className="text-xs font-medium text-foreground text-right">{data.signals.industries}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-xs text-slate-400">Demand Trend</span>
                <span className={`px-2.5 py-1.5 rounded-md border border-white/10 text-[10px] font-bold uppercase tracking-wider ${isWeak ? 'bg-destructive/10 text-destructive' : 'bg-black/40 text-secondary'}`}>
                  {data.signals.trendLabel}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-background/50 border border-border/50 rounded-2xl p-5 relative flex flex-col justify-center overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 blur-3xl -translate-y-10 translate-x-10 rounded-full" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2 relative z-10"><Target className="w-4 h-4 text-secondary" /> Skill Scarcity Insight</h3>
            
            <div className="bg-black/20 border border-white/5 rounded-xl p-4 mb-4 relative z-10 shadow-inner">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest block mb-1 font-bold">Opportunity Level</span>
              <p className="text-xl font-display font-bold text-secondary">{data.scarcity.opportunity}</p>
            </div>

            <div className="pt-1 relative z-10">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-2 font-bold">Demand vs Supply</span>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">"{data.scarcity.demandSupplyRatio}"</p>
            </div>
          </div>
        </div>

        {/* PERSONALIZED FIT */}
        <div className="bg-background/50 border border-border/50 rounded-2xl p-5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2"><UserCircle className="w-4 h-4 text-primary" /> Personalized Fit Insight</h3>
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-black/40 rounded-xl shrink-0 border border-white/5 shadow-inner">
              <BrainCircuit className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed font-medium pt-1">
              {data.fit}
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER CTA */}
      <div className="pt-4 mt-auto border-t border-white/5 flex flex-col sm:flex-row justify-between items-center shrink-0 bg-background/80 backdrop-blur-md pb-2 gap-4">
        <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors font-medium group py-2 w-full sm:w-auto justify-center">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Re-evaluate Role
        </button>
        <button 
          onClick={onNext}
          className={`px-8 py-3.5 font-bold rounded-full transition-all flex items-center justify-center gap-2 text-sm w-full sm:w-auto shadow-lg group ${
            isWeak 
            ? "bg-muted text-muted-foreground hover:bg-muted/80 border border-border shadow-none" 
            : "bg-gradient-to-r from-primary to-[#29F2B9] text-[#0A1017] hover:scale-105 shadow-[0_0_20px_rgba(45,212,191,0.2)] hover:shadow-[0_0_30px_rgba(45,212,191,0.4)]"
          }`}
        >
          {isWeak ? "Proceed Anyway" : "Continue to Analysis"} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};
