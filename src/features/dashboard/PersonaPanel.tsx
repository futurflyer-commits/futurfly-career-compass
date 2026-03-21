import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface PersonaPanelProps {
  personaData: any | null;
  compact?: boolean;
}

const PERSONA_CONTENT: Record<string, { desc: string; image: string; title: string[] }> = {
  "Emerging Builder": {
    desc: "You thrive on exploration, fast learning, and getting your hands dirty building the future. Short-term growth and iteration are your superpowers.",
    image: "/personas/emerging_builder",
    title: ["The Emerging", "Builder"],
  },
  "Strategic Climber": {
    desc: "Focused, analytical, and ready to optimize complex systems. You have a knack for leadership and structured career advancement.",
    image: "/personas/strategic_climber",
    title: ["The Strategic", "Climber"],
  },
  "Purpose Architect": {
    desc: "You build with meaning, aiming for long-term impact and human-centered design. Aligning your career with your deep personal values is essential.",
    image: "/personas/purpose_architect",
    title: ["The Purpose", "Architect"],
  },
  "Growth Explorer": {
    desc: "You balance rapid experimentation with ambitious, structured career strategy. You can build fast and scale smart.",
    image: "/personas/growth_explorer",
    title: ["The Growth", "Explorer"],
  },
  "Strategic Visionary": {
    desc: "You combine sharp analytical leadership with a profound desire to build meaningful, human-centric solutions.",
    image: "/personas/strategic_visionary",
    title: ["The Strategic", "Visionary"],
  },
  "Purpose Explorer": {
    desc: "You lean into rapidly building innovative products, but always ensure they serve a larger, impact-driven mission.",
    image: "/personas/purpose_explorer",
    title: ["The Purpose", "Explorer"],
  },
};

export const PersonaPanel = ({ personaData, compact = false }: PersonaPanelProps) => {
  const content = personaData && PERSONA_CONTENT[personaData.persona]
    ? PERSONA_CONTENT[personaData.persona]
    : PERSONA_CONTENT["Emerging Builder"]; // Fallback for mocking

  if (compact) {
    return (
      <div className="glass-card p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border border-border/50 shrink-0">
          <img src={`${content.image}.png`} alt={personaData?.persona || "Persona"} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-0.5">Primary Persona</p>
          <h3 className="text-sm font-display font-bold">{content.title.join(" ")}</h3>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-5 h-full flex flex-col text-left">
      <div className="relative rounded-xl aspect-video w-full mb-5 overflow-hidden border border-border/20 shadow-lg bg-black/40">
        <img 
          src={`${content.image}.png`}
          alt={personaData?.persona || "Persona"}
          className="w-full h-full object-cover"
          onError={(e) => {
              e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/80 via-transparent to-transparent" />
        <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md border border-neon/30 px-2.5 py-1 rounded-full flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
          <span className="text-[10px] font-bold text-neon uppercase tracking-wider">94% Confidence</span>
        </div>
      </div>
      
      <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1.5">Primary Persona</p>
      <h3 className="text-2xl font-display font-bold mb-4 text-foreground">{content.title.join(" ")}</h3>
      
      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
        You are {content.title[0] === "The" ? "a" : ""} {content.title.join(" ")}. {content.desc}
      </p>

      {/* Persona Scores Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-3 rounded-xl bg-background border border-border/50 shadow-inner">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest truncate">Expr (EB)</span>
            <span className="text-[11px] font-bold text-[#2DD4BF]">{personaData?.scores?.eb || 30}%</span>
          </div>
          <div className="h-[5px] w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#2DD4BF]/50 to-[#2DD4BF] rounded-full" style={{ width: `${personaData?.scores?.eb || 30}%` }} />
          </div>
        </div>
        
        <div className="p-3 rounded-xl bg-background border border-border/50 shadow-inner">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest truncate">Strategy (SC)</span>
            <span className="text-[11px] font-bold text-[#4ADE80]">{personaData?.scores?.sc || 92}%</span>
          </div>
          <div className="h-[5px] w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#4ADE80]/50 to-[#4ADE80] rounded-full" style={{ width: `${personaData?.scores?.sc || 92}%` }} />
          </div>
        </div>

        <div className="p-3 rounded-xl bg-background border border-border/50 shadow-inner">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest truncate">Impact (PA)</span>
            <span className="text-[11px] font-bold text-[#4ADE80]">{personaData?.scores?.pa || 30}%</span>
          </div>
          <div className="h-[5px] w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#4ADE80]/50 to-[#4ADE80] rounded-full" style={{ width: `${personaData?.scores?.pa || 30}%` }} />
          </div>
        </div>

        <div className="p-3 rounded-xl bg-background border border-border/50 shadow-inner">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest truncate">Adaptability</span>
            <span className="text-[11px] font-bold text-[#2DD4BF]">{personaData?.scores?.adaptability || 85}%</span>
          </div>
          <div className="h-[5px] w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#2DD4BF]/50 to-[#2DD4BF] rounded-full" style={{ width: `${personaData?.scores?.adaptability || 85}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Link to="/detailed-assessment" className="w-full py-3.5 bg-muted/50 hover:bg-muted border border-border/50 text-foreground text-sm font-semibold rounded-2xl flex items-center justify-center gap-2 transition-colors group">
          Full Persona Analysis 
          <span className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all">→</span>
        </Link>
      </div>
    </motion.div>
  );
};
