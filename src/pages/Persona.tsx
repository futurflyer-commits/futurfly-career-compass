import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Share2, Download, Sparkles } from "lucide-react";
import { AssessmentResult } from "@/lib/scoring";
import { useAuth } from "@/contexts/AuthContext";

const traits = [
  { label: "Strategic Vision", value: 94, color: "from-primary to-secondary" },
  { label: "Technical Depth", value: 88, color: "from-secondary to-accent" },
  { label: "Systems Design", value: 91, color: "from-accent to-neon" },
  { label: "Human-AI Interaction", value: 82, color: "from-primary to-mint" },
];

const PERSONA_CONTENT: Record<string, { desc: string; image: string; title: string[] }> = {
  "Emerging Builder": {
    desc: "You are an Emerging Builder. You thrive on exploration, fast learning, and getting your hands dirty building the future. Short-term growth and iteration are your superpowers.",
    image: "/personas/emerging_builder", // We will append the regex match for the timestamp part
    title: ["THE EMERGING", "BUILDER"],
  },
  "Strategic Climber": {
    desc: "You are a Strategic Climber. Focused, analytical, and ready to optimize complex systems. You have a knack for leadership and structured career advancement.",
    image: "/personas/strategic_climber",
    title: ["THE STRATEGIC", "CLIMBER"],
  },
  "Purpose Architect": {
    desc: "You are a Purpose Architect. You build with meaning, aiming for long-term impact and human-centered design. Aligning your career with your deep personal values is essential.",
    image: "/personas/purpose_architect",
    title: ["THE PURPOSE", "ARCHITECT"],
  },
  "Growth Explorer": {
    desc: "You are a Growth Explorer (EB + SC mix). You balance rapid experimentation with ambitious, structured career strategy. You can build fast and scale smart.",
    image: "/personas/growth_explorer",
    title: ["THE GROWTH", "EXPLORER"],
  },
  "Strategic Visionary": {
    desc: "You are a Strategic Visionary (SC + PA mix). You combine sharp analytical leadership with a profound desire to build meaningful, human-centric solutions.",
    image: "/personas/strategic_visionary",
    title: ["THE STRATEGIC", "VISIONARY"],
  },
  "Purpose Explorer": {
    desc: "You are a Purpose Explorer (EB + PA mix). You lean into rapidly building innovative products, but always ensure they serve a larger, impact-driven mission.",
    image: "/personas/purpose_explorer",
    title: ["THE PURPOSE", "EXPLORER"],
  },
}

const Persona = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const result: AssessmentResult | null = location.state?.result || 
    (localStorage.getItem('discovery_assessment_result') 
      ? JSON.parse(localStorage.getItem('discovery_assessment_result')!) 
      : null);

  if (!result) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold mb-4">No assessment results found</h2>
        <button onClick={() => navigate('/assessment')} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">
          Take Assessment
        </button>
      </div>
    );
  }

  const content = PERSONA_CONTENT[result.persona] || PERSONA_CONTENT["Emerging Builder"];

  const getImagePath = (basePath: string) => {
    // In a real scenario we might know the exact file name.
    // Given the generated image pattern has a timestamp: name_123456.png
    // The easiest way is to use the exact names from public/personas/
    // We can map these directly since they are static assets copied over.
    // For now we'll match by start string if we were dynamically importing, but since we copied them, 
    // we need their exact filenames or to rename them during the copy. 
    return basePath; // Let's use a dynamic search in the render or just rely on a unified name format.
  };

  // We map the traits directly to the scores for dynamic progress bars
  const dynamicTraits = [
    { label: "Experimentation (EB)", value: Math.round((result.persona_score.EB / 10) * 100), color: "from-primary to-secondary" },
    { label: "Strategy (SC)", value: Math.round((result.persona_score.SC / 12) * 100), color: "from-secondary to-accent" },
    { label: "Impact (PA)", value: Math.round((result.persona_score.PA / 10) * 100), color: "from-accent to-neon" },
    { label: "Adaptability", value: 85, color: "from-primary to-mint" }, // Static filler for aesthetics
  ];

  return (
    <div className="min-h-screen bg-background">

      <div className="flex flex-col justify-center min-h-[calc(100vh-80px)] px-4 py-12 md:py-24 max-w-[1400px] mx-auto w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center w-full">
          
          {/* LEFT COLUMN: Title and Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center text-center w-full"
          >
            <span className="inline-block border border-primary/30 bg-primary/5 rounded-full px-5 py-2 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-primary mb-8 shadow-[0_0_20px_rgba(45,212,191,0.15)] backdrop-blur-sm">
              Assessment Processing Complete
            </span>

            <h1 className="text-4xl md:text-6xl xl:text-[5rem] font-display font-black mb-1 leading-none tracking-tight text-foreground">{content.title[0]}</h1>
            <h1 className="text-4xl md:text-6xl xl:text-[5rem] font-display font-black text-gradient mb-12 leading-none tracking-tight drop-shadow-md">{content.title[1]}</h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[320px] md:max-w-[440px] lg:max-w-[540px] xl:max-w-[640px] aspect-square mx-auto group cursor-default"
            >
              <div className="absolute inset-0 rounded-[2.5rem] lg:rounded-[4rem] bg-primary/20 blur-3xl animate-pulse-glow transition-all duration-700 group-hover:bg-primary/30" />
              <div className="relative w-full h-full rounded-[2.5rem] lg:rounded-[4rem] bg-card border-2 border-border/30 flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-[1.02]">
                <img 
                  src={`${content.image}.png`}
                  alt={result.persona}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                     e.currentTarget.style.display = 'none';
                     e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center w-full h-full"><svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary opacity-50"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg></div>';
                  }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Description, Stats, CTA */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center text-center w-full"
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground leading-relaxed md:leading-loose mb-12 max-w-xl font-medium">
              {content.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl mb-16">
              {dynamicTraits.map((t, i) => (
                <motion.div
                  key={t.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                  className="bg-card/40 border border-border/40 p-6 md:p-8 rounded-2xl hover:border-primary/30 transition-colors text-left relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl translate-x-10 -translate-y-10 rounded-full transition-all duration-700 group-hover:bg-primary/10 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-5">
                      <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">{t.label}</span>
                      <span className="text-lg md:text-xl lg:text-2xl font-display font-black text-foreground drop-shadow-sm">{t.value}%</span>
                    </div>
                    <div className="h-1.5 md:h-[6px] bg-[#11131a] border border-white/5 rounded-full overflow-hidden shadow-inner w-full">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${t.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${t.value}%` }}
                        transition={{ delay: 0.8 + i * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-primary to-neon px-12 py-6 lg:py-8 text-lg md:text-xl lg:text-2xl font-bold tracking-wide text-[#0a1017] glow-aqua hover:scale-[1.03] transform shadow-[0_0_30px_rgba(45,212,191,0.3)] hover:shadow-[0_0_50px_rgba(45,212,191,0.5)] transition-all duration-300 w-full sm:w-auto mb-12"
            >
              Unlock My Curated Roadmap <ArrowRight className="h-6 w-6 md:h-7 md:w-7 animate-pulse text-foreground/80" />
            </Link>

            <div className="flex items-center justify-center gap-8 text-muted-foreground/70">
              <button className="flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
                <Share2 className="h-4 w-4" /> Share Result
              </button>
              <button className="flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
                <Download className="h-4 w-4" /> Download Portfolio
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="py-6 text-center">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          © 2026 FuturFly. Built for the next gen of Indian tech.
        </p>
      </footer>
    </div>
  );
};

export default Persona;
