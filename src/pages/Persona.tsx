import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Share2, Download, Sparkles } from "lucide-react";
import { DashboardNav } from "@/components/DashboardNav";
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
      {user && <DashboardNav />}

      <div className="flex flex-col items-center justify-center px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl"
        >
          <span className="inline-block border border-primary/40 rounded-full px-4 py-1 text-xs font-semibold tracking-widest uppercase text-primary mb-6">
            Assessment Complete
          </span>

          <h1 className="text-4xl md:text-6xl font-display font-bold mb-2">{content.title[0]}</h1>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient mb-10">{content.title[1]}</h1>

          {/* Avatar area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative w-64 h-64 mx-auto mb-8"
          >
            <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-2xl animate-pulse-glow" />
            <div className="relative w-full h-full rounded-2xl bg-card border border-border/50 flex items-center justify-center overflow-hidden">
              <img 
                src={`${content.image}.png`}
                alt={result.persona}
                className="w-full h-full object-cover"
                onError={(e) => {
                   e.currentTarget.style.display = 'none';
                   e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center w-full h-full"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg></div>';
                }}
              />
            </div>
          </motion.div>

          <p className="text-muted-foreground leading-relaxed mb-10 max-w-lg mx-auto">
            {content.desc}
          </p>

          {/* Trait bars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-12">
            {dynamicTraits.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="glass-card p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">{t.label}</span>
                  <span className="text-sm font-display font-bold text-primary">{t.value}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${t.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${t.value}%` }}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-3.5 text-sm font-semibold text-primary-foreground glow-aqua hover:opacity-90 transition-all mb-6"
          >
            Unlock My Career Roadmap <ArrowRight className="h-4 w-4" />
          </Link>

          <div className="flex items-center justify-center gap-6 text-muted-foreground">
            <button className="flex items-center gap-1.5 text-xs uppercase tracking-wider hover:text-primary transition-colors">
              <Share2 className="h-3.5 w-3.5" /> Share Result
            </button>
            <button className="flex items-center gap-1.5 text-xs uppercase tracking-wider hover:text-primary transition-colors">
              <Download className="h-3.5 w-3.5" /> Download Portfolio
            </button>
          </div>
        </motion.div>
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
