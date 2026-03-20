import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, ArrowLeft, ArrowRight, Shield, CheckCircle2 } from "lucide-react";
import { calculatePersona } from "@/lib/scoring";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

const questions = [
  {
    id: 1,
    label: "DISCOVERY PHASE",
    question: "What excites you most about technology?",
    options: [
      { title: "Building Products", desc: "Creating solutions that millions use daily.", insight: "🚀 You're a builder. Around 48% of top-performing tech professionals are product-focused thinkers.", trait: "Builder" },
      { title: "Solving Hard Problems", desc: "Cracking complex algorithmic and systems challenges.", insight: "🧠 Strong analytical mindset. Problem-solvers dominate high-impact engineering roles.", trait: "Analytical" },
      { title: "Leading Teams", desc: "Orchestrating people and projects toward a vision.", insight: "👥 Leadership-driven. Only ~20% naturally gravitate toward people + vision roles.", trait: "Leadership" },
      { title: "Analyzing Data", desc: "Finding patterns and insights hidden in data.", insight: "📊 Insight-driven thinker. Data specialists are among the fastest-growing roles globally.", trait: "Data-Driven" },
    ],
  },
  {
    id: 2,
    label: "DISCOVERY PHASE",
    question: "What's your preferred work style?",
    options: [
      { title: "Deep Focus", desc: "Long uninterrupted blocks of concentrated work.", insight: "🎯 Maker-mode. Focus-driven pros often excel in highly specialized engineering roles.", trait: "Focused" },
      { title: "Collaborative", desc: "Brainstorming and building with a team.", insight: "🤝 Synergistic. Team builders accelerate product delivery and team cohesion by 40%.", trait: "Collaborative" },
      { title: "Strategic Planning", desc: "High-level thinking with clear execution plans.", insight: "🗺️ Visionary. Strategic planners are critical for scaling complex organizations.", trait: "Strategic" },
      { title: "Fast Iteration", desc: "Rapid prototyping and shipping quickly.", insight: "⚡ Agile. Rapid iterators thrive natively in high-growth startups and product zeros.", trait: "Agile" },
    ],
  },
  {
    id: 3,
    label: "DISCOVERY PHASE",
    question: "How do you handle ambiguity?",
    options: [
      { title: "Research First", desc: "Deep dive into data before making decisions.", insight: "🔍 Methodical. Data-backed deciders reduce project risks significantly in early stages.", trait: "Methodical" },
      { title: "Experiment & Learn", desc: "Try things quickly and iterate based on results.", insight: "🧪 Empirical. Action-oriented learners adapt 3x faster to market changes.", trait: "Adaptive" },
      { title: "Consult Experts", desc: "Seek mentorship and leverage collective wisdom.", insight: "🏛️ Networked. Wisdom-seekers build stronger, more resilient architectures.", trait: "Networked" },
      { title: "Trust Instinct", desc: "Pattern-match from experience and act decisively.", insight: "⚡ Intuitive. Pattern-matchers make the best crisis-mode and zero-to-one leaders.", trait: "Intuitive" },
    ],
  },
  {
    id: 4,
    label: "DISCOVERY PHASE",
    question: "How do you prefer to solve complex problems?",
    options: [
      { title: "AI-Augmented Logic", desc: "Leveraging neural networks and automated reasoning to find optimal solutions.", insight: "🤖 Forward-thinking. AI-augmented developers ship conceptual code 55% faster.", trait: "Innovative" },
      { title: "Human-Centric Design", desc: "Focusing on empathy, user experience patterns, and human behavior psychology.", insight: "👤 Empathetic. UX-focused thinking increases product long-term adoption dramatically.", trait: "Empathetic" },
      { title: "Data-Driven Strategy", desc: "Analyzing patterns, statistical significance, and large datasets to inform actions.", insight: "📉 Objective. Quant-based leaders consistently optimize ROI across deployments.", trait: "Objective" },
      { title: "Technical Craftsmanship", desc: "Deep-diving into architecture, code precision, and low-level performance tuning.", insight: "🛠️ Artisan. Deep technical mastery is the foundation of robust, uncrackable systems.", trait: "Technical" },
    ],
  },
  {
    id: 5,
    label: "DISCOVERY PHASE",
    question: "What's your risk appetite for career moves?",
    options: [
      { title: "Conservative", desc: "Steady growth in established companies with clear paths.", insight: "🛡️ Stable. Calculated growth leads to sustainable, long-term technical mastery.", trait: "Stable" },
      { title: "Moderate", desc: "Balanced risk with calculated bets on emerging areas.", insight: "⚖️ Balanced. Balanced risk-takers often find the sweet spot of innovation and security.", trait: "Balanced" },
      { title: "Aggressive", desc: "High-risk, high-reward moves into cutting-edge domains.", insight: "🚀 Bold. High-risk takers are disproportionately represented in unicorn startups.", trait: "Bold" },
      { title: "Entrepreneurial", desc: "Building from scratch with full ownership and uncertainty.", insight: "💡 Pioneer. Founders and early-stage builders drive industry disruption completely.", trait: "Pioneer" },
    ],
  },
  {
    id: 6,
    label: "DISCOVERY PHASE",
    question: "What's your ideal time horizon for change?",
    options: [
      { title: "3–6 Months", desc: "Quick wins and immediate career shifts with fast results.", insight: "⏱️ Action-oriented. Sprint-based thinkers capitalize on immediate macro opportunities.", trait: "Action-oriented" },
      { title: "1–2 Years", desc: "Strategic moves with time to upskill and transition smoothly.", insight: "📅 Tactical. Mid-term planners successfully pivot into adjacent domains with ease.", trait: "Tactical" },
      { title: "3–5 Years", desc: "Long-term transformation with deep expertise and leadership growth.", insight: "🔭 Long-term. Generational impact requires deep, sustained commitment.", trait: "Long-term" },
    ],
  },
];

const Assessment = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;
  const pathFound = Math.round(((current + (answers[q.id] !== undefined ? 1 : 0)) / questions.length) * 100);

  const getTraitProgress = () => {
    if (Object.keys(answers).length === 0) return [];
    
    const selectedTraits = Object.entries(answers).map(([qId, optIdx]) => {
      const question = questions.find((ques) => ques.id === parseInt(qId));
      if (!question) return null;
      return (question.options as any)[optIdx as number].trait;
    }).filter(Boolean) as string[];

    return selectedTraits.slice(-2).reverse().map((trait, index) => {
      const percentage = index === 0 ? 60 : 40;
      return { trait, percentage };
    });
  };

  const traitProgress = getTraitProgress();

  const selectOption = (idx: number) => {
    setAnswers((prev) => ({ ...prev, [q.id]: idx }));
  };

  const next = async () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setLoading(true);
      
      // Calculate persona
      const result = calculatePersona(answers);
      
      // Save to localStorage for guests
      localStorage.setItem("discovery_assessment_result", JSON.stringify(result));
      
      // If logged in, save to profile
      if (user) {
        try {
          await supabase
            .from('profiles')
            .update({ discovery_persona: result })
            .eq('id', user.id);
        } catch (error) {
          console.error("Error saving assessment to profile:", error);
        }
      }

      setTimeout(() => navigate("/persona", { state: { result } }), 3000);
    }
  };

  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto mb-16">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
            <div className="absolute inset-4 rounded-full border-2 border-primary/30 animate-spin" style={{ animationDuration: "3s" }} />
            <div className="absolute inset-8 rounded-full border-2 border-secondary/30 animate-spin" style={{ animationDuration: "5s", animationDirection: "reverse" }} />
            {[0, 72, 144, 216, 288].map((deg) => (
              <div
                key={deg}
                className="absolute w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(45,212,191,0.8)] animate-pulse-glow"
                style={{
                  top: `${50 + 42 * Math.sin((deg * Math.PI) / 180)}%`,
                  left: `${50 + 42 * Math.cos((deg * Math.PI) / 180)}%`,
                }}
              />
            ))}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-6 text-foreground tracking-tight leading-tight">
            Synthesizing your <span className="text-gradient drop-shadow-md">Career DNA</span>
          </h2>
          <p className="text-lg md:text-xl font-medium text-muted-foreground uppercase tracking-[0.2em] leading-relaxed">
            Mapping neural profile against 10,000+ industry trajectories
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background Enhancements */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-glow" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-secondary/10 rounded-full blur-[150px] mix-blend-screen animate-pulse-glow" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="border-b border-border/30 bg-background/80 backdrop-blur-xl relative z-10">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <Rocket className="h-5 w-5 text-primary" />
            <span className="font-display text-base font-bold">FuturFly</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <span>Assessments</span>
            <span>Roadmaps</span>
            <span>Mentors</span>
          </nav>
        </div>
      </header>

      {/* Progress */}
      <div className="w-full h-1 bg-muted">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-5xl mx-auto"
          >
            <div className="text-center mb-16 md:mb-20">
              <span className="inline-block border border-primary/20 bg-primary/5 rounded-full px-5 py-1.5 text-xs font-bold tracking-[0.2em] uppercase text-primary mb-6 shadow-[0_0_15px_rgba(45,212,191,0.15)] relative overflow-hidden group">
                <span className="absolute inset-0 w-full h-full bg-primary/20 blur-md animate-pulse pointer-events-none" />
                <span className="relative z-10">{q.label}</span>
              </span>
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-4 flex items-center justify-center gap-3">
                <span className="w-8 md:w-16 h-px bg-border/50" />
                <span className="uppercase tracking-[0.2em]">Step {current + 1} of {questions.length} — Discovering your strengths</span>
                <span className="w-8 md:w-16 h-px bg-border/50" />
              </p>
              <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-[4.5rem] font-display font-bold leading-tight md:leading-[1.15] max-w-4xl mx-auto mb-4">
                {q.question.split(" ").slice(0, -2).join(" ")}{" "}
                <span className="text-gradient drop-shadow-sm">{q.question.split(" ").slice(-2).join(" ")}</span>
              </h2>
              <p className="text-sm md:text-base text-muted-foreground/80 font-medium tracking-wide">This helps us tailor your career path with precision.</p>
            </div>

            <div className={`grid gap-6 md:gap-8 ${q.options.length <= 3 ? 'grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto' : 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'}`}>
              {q.options.map((opt, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                  whileHover={{ scale: answers[q.id] === undefined ? 1.02 : 1, y: answers[q.id] === undefined ? -5 : 0 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectOption(i)}
                  className={`text-left p-8 md:p-10 rounded-[20px] backdrop-blur-md border transition-all duration-300 relative overflow-hidden group ${
                    answers[q.id] === i
                      ? "border-transparent bg-primary/10 shadow-[0_0_40px_rgba(45,212,191,0.3)] scale-[1.03] ring-2 ring-primary bg-gradient-to-br from-[#2EF2F2]/10 to-[#29F2B9]/5 z-10"
                      : answers[q.id] !== undefined
                      ? "border-border/20 bg-background/40 opacity-50 scale-[0.98]"
                      : "border-border/40 bg-background/80 hover:border-primary/40 hover:bg-muted/40 hover:shadow-2xl"
                  }`}
                >
                  <div className={`absolute top-0 right-0 w-40 h-40 blur-3xl rounded-full transition-opacity duration-700 pointer-events-none ${answers[q.id] === i ? "bg-primary/30 opacity-100" : "bg-primary/0 group-hover:bg-primary/20 opacity-0 group-hover:opacity-100"}`} />
                  
                  {/* Inner Content Block */}
                  <div className="relative z-10 flex justify-between items-start gap-4">
                    <div>
                      <h4 className={`font-display font-bold text-lg md:text-2xl mb-3 md:mb-4 transition-colors ${answers[q.id] === i ? "text-primary drop-shadow-sm" : "text-foreground group-hover:text-primary/90"}`}>{opt.title}</h4>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed md:leading-loose font-medium">{opt.desc}</p>
                    </div>
                    {answers[q.id] === i && (
                      <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", bounce: 0.5 }} className="flex-shrink-0 mt-1">
                        <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-primary drop-shadow-[0_0_8px_rgba(45,212,191,0.6)]" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Dynamic Insight & Personalization Bar */}
            <AnimatePresence>
              {answers[q.id] !== undefined && (
                <motion.div
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -20, height: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full max-w-4xl mx-auto mt-12 overflow-hidden"
                >
                  <div className="bg-background/40 backdrop-blur-md border border-primary/20 rounded-2xl p-6 md:p-8 relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-l-2xl" />
                    
                    <p className="text-base md:text-lg text-foreground/90 font-medium leading-relaxed">
                      {(q.options as any)[answers[q.id]]?.insight}
                    </p>

                    <div className="mt-8 pt-6 border-t border-border/30">
                      <h4 className="text-sm font-bold text-foreground mb-4 opacity-80 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" /> Your profile is shaping up...
                      </h4>
                      <div className="space-y-4">
                        {traitProgress.map((t) => (
                          <div key={t.trait} className="flex items-center gap-4 text-sm font-mono">
                            <span className="w-32 md:w-40 text-muted-foreground truncate">{t.trait}</span>
                            <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden flex relative">
                              <motion.div 
                                initial={{ width: 0 }} 
                                animate={{ width: `${t.percentage}%` }} 
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-primary to-[#29F2B9] relative" 
                              />
                            </div>
                            <span className="w-12 text-right text-primary font-bold">{t.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center w-full max-w-5xl mt-16 md:mt-24 px-4 md:px-0 relative z-10">
          <button
            onClick={prev}
            disabled={current === 0}
            className="inline-flex items-center gap-3 rounded-full border border-border px-8 py-4 text-sm font-bold tracking-wide text-foreground disabled:opacity-0 hover:border-primary/50 hover:bg-muted/30 transition-all opacity-100"
          >
            <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" /> 
            <span className="hidden sm:inline">Go Back</span>
          </button>
          
          <div className="flex flex-col items-center">
            <button
              onClick={next}
              disabled={answers[q.id] === undefined}
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary to-neon px-10 py-4 md:py-5 text-sm md:text-base font-bold tracking-wide text-primary-foreground disabled:opacity-30 disabled:scale-100 shadow-[0_0_20px_rgba(45,212,191,0.4)] hover:shadow-[0_0_40px_rgba(45,212,191,0.6)] hover:scale-105 transition-all group"
            >
              Reveal Next Insight <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 group-disabled:translate-x-0 transition-transform" />
            </button>
            <p className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground mt-4">
              <Shield className="h-3 w-3 text-primary" /> Auto-saving to Neural Profile
            </p>
          </div>
          
          <div className="w-[120px] hidden sm:block" /> {/* Layout balancer */}
        </div>
      </div>
    </div>
  );
};

export default Assessment;
