import { BarChart3, AlertTriangle, ShieldCheck, ArrowLeft, TrendingUp, Sparkles, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

interface MarketRadarStepProps {
  onNext: () => void;
  onBack: () => void;
  selectedRoleId: string | null;
}

const MARKET_DATA: Record<string, any> = {
  "role-1": { title: "AI Solutions Architect", growth: "24.8% YoY", risk: "Low (12%)", riskLevel: "low", projection: [40, 55, 75, 90, 100], commentary: "Concentrated demand surge in Bengaluru and Hyderabad clusters. Strong emphasis on applicants with applied GenAI integration experience." },
  "role-2": { title: "GenAI Product Lead", growth: "32.4% YoY", risk: "Low (8%)", riskLevel: "low", projection: [20, 50, 75, 95, 100], commentary: "Extremely high startup demand. Companies are aggressively hiring leaders who can translate foundational models into shipped ARR." },
  "role-3": { title: "ML Engineering Manager", growth: "18.2% YoY", risk: "Low (15%)", riskLevel: "low", projection: [50, 60, 75, 85, 95], commentary: "Stable enterprise demand. Focus is shifting towards efficient model deployment and scaling infrastructure rather than pure academic R&D." },
  "role-4": { title: "Senior MLOps Engineer", growth: "28.5% YoY", risk: "Low (10%)", riskLevel: "low", projection: [30, 45, 65, 85, 100], commentary: "Critical infrastructural bottleneck. Proper CI/CD for model deployment is the highest pain-point in the market currently." },
  "role-5": { title: "Data Platform Architect", growth: "15.4% YoY", risk: "Medium (25%)", riskLevel: "medium", projection: [55, 65, 75, 80, 85], commentary: "Steady growth. The rise of RAG architectures requires incredibly robust streaming data pipelines underneath." },
  "role-6": { title: "AI UX Researcher", growth: "42.0% YoY", risk: "Low (5%)", riskLevel: "low", projection: [15, 35, 60, 85, 100], commentary: "Emerging field. As raw AI power commoditizes, building human trust and intuitive non-deterministic interactions is the primary differentiator." },
  "role-7": { title: "Edge AI Specialist", growth: "19.8% YoY", risk: "Low (18%)", riskLevel: "low", projection: [25, 40, 55, 80, 95], commentary: "Highly sought after niche. Exploding due to on-device hardware capabilities and offline localized LLM needs." },
  "role-8": { title: "Cloud AI Developer", growth: "22.5% YoY", risk: "Medium (30%)", riskLevel: "medium", projection: [45, 65, 80, 90, 100], commentary: "High volume enterprise hiring leveraging managed cloud wrappers (AWS Bedrock, Azure OpenAI) for swift application layer building." },
  "role-9": { title: "Quantitative AI Analyst", growth: "12.5% YoY", risk: "Medium (35%)", riskLevel: "medium", projection: [65, 68, 70, 72, 75], commentary: "Highly competitive, stable FinTech demand. Advanced transformer architecture application into time-series data streams." },
  "role-10": { title: "AI Prompt Engineer", growth: "-15.0% YoY", risk: "High (85%)", riskLevel: "high", projection: [100, 75, 50, 30, 15], commentary: "Declining standalone role. Prompting is rapidly becoming a baseline required skill for all software engineers, rather than a dedicated job family." },
};

export const MarketRadarStep = ({ onNext, onBack, selectedRoleId }: MarketRadarStepProps) => {
  const data = selectedRoleId && MARKET_DATA[selectedRoleId] 
    ? MARKET_DATA[selectedRoleId] 
    : MARKET_DATA["role-1"];
    
  const isDeclining = data.projection[data.projection.length - 1] < data.projection[0];

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold mb-2">Market Validation</h2>
        <p className="text-sm text-muted-foreground">
          Analyzing local hiring projections and automation resilience for <strong className="text-foreground">{data.title}</strong>.
        </p>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto custom-scrollbar pr-2">
        {/* Warning Banner if declining */}
        {isDeclining && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 flex gap-3 text-destructive">
             <AlertTriangle className="w-5 h-5 shrink-0" />
             <div>
               <p className="text-sm font-bold mb-1">High Risk Trajectory</p>
               <p className="text-xs opacity-90">This role is showing negative 5-year hiring growth. We strongly recommend returning to Step 1 and selecting a more resilient path before committing to a 16-week upskill.</p>
             </div>
          </div>
        )}

        {/* Core Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background/50 p-4 rounded-xl border border-border/50">
            {isDeclining ? <TrendingDown className="w-5 h-5 text-destructive mb-2" /> : <TrendingUp className="w-5 h-5 text-secondary mb-2" />}
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Growth Trend</p>
            <p className={`text-lg font-bold ${isDeclining ? "text-destructive" : ""}`}>{data.growth}</p>
          </div>
          <div className="bg-background/50 p-4 rounded-xl border border-border/50">
            <ShieldCheck className={`w-5 h-5 mb-2 ${data.riskLevel === 'high' ? 'text-destructive' : data.riskLevel === 'medium' ? 'text-amber-500' : 'text-primary'}`} />
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Automation Risk</p>
            <p className={`text-lg font-bold ${data.riskLevel === 'high' ? 'text-destructive' : data.riskLevel === 'medium' ? 'text-amber-500' : 'text-primary'}`}>
              {data.risk}
            </p>
          </div>
        </div>

        {/* Bar Chart Representation */}
        <div className="bg-background/50 p-5 rounded-xl border border-border/50">
           <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm flex items-center gap-2"><BarChart3 className="w-4 h-4 text-neon" /> 5-Year Hiring Volume Projection</h3>
           </div>
           <div className="flex items-end justify-between gap-3 h-40 pt-4 pb-2 border-b border-border/50">
              {data.projection.map((h: number, i: number) => {
                const isCurrentYear = i === 0;
                const isFutureYear = i === 4;
                const barColor = isDeclining 
                  ? (isFutureYear ? 'bg-destructive' : 'bg-destructive/40')
                  : (isFutureYear ? 'bg-primary shadow-[0_0_15px_rgba(45,212,191,0.4)]' : 'bg-secondary/40');
                  
                return (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                    <span className="text-[10px] font-bold text-muted-foreground mb-1.5">{h}%</span>
                    <div className="w-full flex-1 flex items-end">
                      <motion.div 
                        initial={{ height: 0 }} 
                        animate={{ height: `${h}%` }} 
                        transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                        className={`w-full rounded-t-md transition-colors ${barColor}`} 
                      />
                    </div>
                    <span className={`text-[10px] font-bold mt-2 ${isCurrentYear ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {2024 + i}
                    </span>
                  </div>
                )
              })}
           </div>
        </div>

        {/* Market Commentary */}
        <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20">
          <div className="flex gap-3">
            <Sparkles className="w-5 h-5 text-secondary shrink-0" />
            <div>
              <p className="text-sm font-semibold mb-1 text-foreground">Market Commentary</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                "{data.commentary}"
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 mt-4 border-t border-border/50 flex justify-between items-center shrink-0">
        <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> Reselect Role
        </button>
        <button 
          onClick={onNext}
          className={`px-8 py-3 font-bold rounded-full transition-all shadow-lg flex items-center gap-2 ${
            isDeclining 
              ? "bg-muted text-muted-foreground hover:bg-muted/80 shadow-none border border-border/50" 
              : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(45,212,191,0.3)]"
          }`}
        >
          {isDeclining ? "Proceed Anyway →" : "Commit to Analysis →"}
        </button>
      </div>
    </motion.div>
  );
};
