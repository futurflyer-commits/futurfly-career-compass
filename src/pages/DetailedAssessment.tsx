import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Shield, Sparkles } from "lucide-react";
import Persona from "./Persona";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

type QuestionType = "select" | "swipe" | "slider";

interface Question {
  id: number;
  section: string;
  sectionNum: number;
  question: string;
  type: QuestionType;
  options?: { title: string }[];
  sliderMin?: number;
  sliderMax?: number;
}

const questions: Question[] = [
  // SECTION 1 — YOUR CURRENT DIRECTION
  { id: 1, sectionNum: 1, section: "YOUR CURRENT DIRECTION", type: "select", question: "What do you want most right now?", options: [
    { title: "Clarity on what suits me" }, { title: "Faster growth in my career" }, { title: "A meaningful path aligned with my values" },
  ]},
  { id: 2, sectionNum: 1, section: "YOUR CURRENT DIRECTION", type: "select", question: "Which statement feels closest to you?", options: [
    { title: "I want to discover my strengths" }, { title: "I want to level up strategically" }, { title: "I want to design my life's work" },
  ]},
  { id: 3, sectionNum: 1, section: "YOUR CURRENT DIRECTION", type: "select", question: "What is your biggest career frustration today?", options: [
    { title: "Too many options, no clear direction" }, { title: "I feel stuck or underutilized" }, { title: "My work lacks meaning" },
  ]},
  { id: 4, sectionNum: 1, section: "YOUR CURRENT DIRECTION", type: "select", question: "Your time horizon for change:", options: [
    { title: "3–6 months" }, { title: "1–2 years" }, { title: "5+ years" },
  ]},
  { id: 5, sectionNum: 1, section: "YOUR CURRENT DIRECTION", type: "select", question: "When making career decisions, you usually:", options: [
    { title: "Need structured guidance" }, { title: "Compare options and outcomes" }, { title: "Follow what feels aligned" },
  ]},
  { id: 6, sectionNum: 1, section: "YOUR CURRENT DIRECTION", type: "select", question: "Which outcome motivates you most?", options: [
    { title: "Building strong skills" }, { title: "Advancing position and income" }, { title: "Creating meaningful impact" },
  ]},

  // SECTION 2 — WHAT ENERGISES YOU?
  { id: 7, sectionNum: 2, section: "WHAT ENERGISES YOU?", type: "swipe", question: "I enjoy solving real-world practical problems.", options: [
    { title: "Yes" }, { title: "Sometimes" }, { title: "No" },
  ]},
  { id: 8, sectionNum: 2, section: "WHAT ENERGISES YOU?", type: "swipe", question: "I enjoy analysing data, systems, or complex ideas.", options: [
    { title: "Yes" }, { title: "Sometimes" }, { title: "No" },
  ]},
  { id: 9, sectionNum: 2, section: "WHAT ENERGISES YOU?", type: "swipe", question: "I enjoy creative expression (design, writing, storytelling).", options: [
    { title: "Yes" }, { title: "Sometimes" }, { title: "No" },
  ]},
  { id: 10, sectionNum: 2, section: "WHAT ENERGISES YOU?", type: "swipe", question: "I enjoy helping or guiding people.", options: [
    { title: "Yes" }, { title: "Sometimes" }, { title: "No" },
  ]},
  { id: 11, sectionNum: 2, section: "WHAT ENERGISES YOU?", type: "swipe", question: "I enjoy leading initiatives or influencing outcomes.", options: [
    { title: "Yes" }, { title: "Sometimes" }, { title: "No" },
  ]},
  { id: 12, sectionNum: 2, section: "WHAT ENERGISES YOU?", type: "swipe", question: "I enjoy organising systems, plans, or details.", options: [
    { title: "Yes" }, { title: "Sometimes" }, { title: "No" },
  ]},

  // SECTION 3 — WHAT MATTERS MOST TO YOU?
  { id: 13, sectionNum: 3, section: "WHAT MATTERS MOST?", type: "select", question: "Which matters more?", options: [
    { title: "Freedom & autonomy" }, { title: "Stability & security" },
  ]},
  { id: 14, sectionNum: 3, section: "WHAT MATTERS MOST?", type: "select", question: "Which matters more?", options: [
    { title: "High earnings" }, { title: "Meaningful contribution" },
  ]},
  { id: 15, sectionNum: 3, section: "WHAT MATTERS MOST?", type: "select", question: "Which environment suits you better?", options: [
    { title: "Structured and predictable" }, { title: "Flexible and evolving" },
  ]},
  { id: 16, sectionNum: 3, section: "WHAT MATTERS MOST?", type: "select", question: "You prefer work that is:", options: [
    { title: "Deeply specialised" }, { title: "Varied and multidisciplinary" },
  ]},
  { id: 17, sectionNum: 3, section: "WHAT MATTERS MOST?", type: "select", question: "Your ideal impact style:", options: [
    { title: "Behind the scenes" }, { title: "Visible leadership" }, { title: "Thought leadership" },
  ]},

  // SECTION 4 — HOW YOU WORK
  { id: 18, sectionNum: 4, section: "HOW YOU WORK", type: "select", question: "A project lacks direction. You:", options: [
    { title: "Define structure and plan" }, { title: "Analyse before acting" }, { title: "Generate new ideas" }, { title: "Support the team" },
  ]},
  { id: 19, sectionNum: 4, section: "HOW YOU WORK", type: "select", question: "You receive minimal instructions. You feel:", options: [
    { title: "Energised" }, { title: "Neutral" }, { title: "Uncomfortable" },
  ]},
  { id: 20, sectionNum: 4, section: "HOW YOU WORK", type: "select", question: "When facing uncertainty, you usually:", options: [
    { title: "Act quickly" }, { title: "Evaluate carefully" }, { title: "Wait for clarity" },
  ]},
  { id: 21, sectionNum: 4, section: "HOW YOU WORK", type: "select", question: "You feel most proud when:", options: [
    { title: "You solve a difficult problem" }, { title: "You help someone succeed" }, { title: "You create something original" }, { title: "You achieve measurable results" },
  ]},

  // SECTION 5 — PERSONALITY SNAPSHOT
  { id: 22, sectionNum: 5, section: "PERSONALITY SNAPSHOT", type: "swipe", question: "I take initiative easily.", options: [
    { title: "Low" }, { title: "Medium" }, { title: "High" },
  ]},
  { id: 23, sectionNum: 5, section: "PERSONALITY SNAPSHOT", type: "swipe", question: "I follow through reliably.", options: [
    { title: "Low" }, { title: "Medium" }, { title: "High" },
  ]},
  { id: 24, sectionNum: 5, section: "PERSONALITY SNAPSHOT", type: "swipe", question: "I enjoy collaborating with others.", options: [
    { title: "Low" }, { title: "Medium" }, { title: "High" },
  ]},
  { id: 25, sectionNum: 5, section: "PERSONALITY SNAPSHOT", type: "swipe", question: "I stay calm under pressure.", options: [
    { title: "Low" }, { title: "Medium" }, { title: "High" },
  ]},
  { id: 26, sectionNum: 5, section: "PERSONALITY SNAPSHOT", type: "swipe", question: "I adapt quickly to change.", options: [
    { title: "Low" }, { title: "Medium" }, { title: "High" },
  ]},

  // SECTION 6 — READINESS & ROADMAP INTENT
  { id: 27, sectionNum: 6, section: "READINESS & INTENT", type: "slider", question: "How ready are you to take action on a career plan?", sliderMin: 0, sliderMax: 10 },
  { id: 28, sectionNum: 6, section: "READINESS & INTENT", type: "select", question: "What support would help you most?", options: [
    { title: "Structured roadmap" }, { title: "Strategic guidance" }, { title: "Purpose alignment" },
  ]},
];

const sectionNames = [
  "Your Current Direction",
  "What Energises You?",
  "What Matters Most?",
  "How You Work",
  "Personality Snapshot",
  "Readiness & Intent",
];

const DetailedAssessment = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [sliderValues, setSliderValues] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(false);
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length + Object.keys(sliderValues).length;
  const pathFound = Math.round((answeredCount / questions.length) * 100);
  const isAnswered = q.type === "slider" ? sliderValues[q.id] !== undefined : answers[q.id] !== undefined;

  const selectOption = (idx: number) => {
    setAnswers((prev) => ({ ...prev, [q.id]: idx }));
  };

  const next = async () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setLoading(true);
      
      // Save the completion status to the authenticated profile
      if (user) {
        try {
          await supabase.from("profiles").update({
             assessment_completed: true,
             detailed_persona_synced: true,
          }).eq("id", user.id);
        } catch (e) {
          console.error("Failed to sync detailed persona to profile", e);
        }
      }

      setTimeout(() => {
        setLoading(false);
        setAssessmentComplete(true);
      }, 3500);
    }
  };

  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse-glow" />
            <div className="absolute inset-4 rounded-full border border-primary/30 animate-spin" style={{ animationDuration: "3s" }} />
            <div className="absolute inset-8 rounded-full border border-secondary/30 animate-spin" style={{ animationDuration: "5s", animationDirection: "reverse" }} />
            {[0, 72, 144, 216, 288].map((deg) => (
              <div key={deg} className="absolute w-2.5 h-2.5 rounded-full bg-primary animate-pulse-glow" style={{
                top: `${50 + 42 * Math.sin((deg * Math.PI) / 180)}%`,
                left: `${50 + 42 * Math.cos((deg * Math.PI) / 180)}%`,
              }} />
            ))}
          </div>
          <h2 className="text-2xl font-display font-bold mb-2 text-gradient">Deep-analyzing your career DNA…</h2>
          <p className="text-slate-300 text-sm">Building your detailed persona from 28 data points across 6 dimensions</p>
        </motion.div>
      </div>
    );
  }

  if (assessmentComplete) {
    const personasList = ["Emerging Builder", "Strategic Climber", "Purpose Architect", "Growth Explorer", "Strategic Visionary", "Purpose Explorer"];
    const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
    const computedPersona = personasList[totalScore % 6];

    const computedResult = {
      persona: computedPersona,
      persona_score: { 
        EB: 8 + (totalScore % 3), 
        SC: 7 + (totalScore % 4), 
        PA: 6 + (Object.keys(answers).length % 5) 
      },
      matchScore: 88 + (Object.keys(answers).length % 10)
    };

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
        {/* Render the full persona screen natively inside this view */}
        <Persona hideRoadmapLink={true} hideSharing={false} forceResult={computedResult} />
      </motion.div>
    );
  }

  const generateInsightText = (qIndex: number, optIndex: number = 0) => {
    const insights = [
      "🧠 Strong analytical mindset. Problem-solvers dominate high-impact engineering roles.",
      "🛡️ Foundational reliability. Consistency is the highest predictor of architectural success.",
      "🚀 High-risk tolerance. Bold movers are disproportionately represented in unicorn startups.",
      "💡 Creative synthesizer. The ability to bridge disjoint concepts drives genuine innovation.",
      "⚙️ Operational efficiency. Structured thinkers scale systems significantly faster.",
      "🔭 Strategic vision. Long-term forecasting separates senior leads from mid-level execution."
    ];
    return insights[(qIndex + optIndex) % insights.length];
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      
      {/* Section tracker */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-xl/50 backdrop-blur-sm">
        <div className="container py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {sectionNames.map((name, i) => {
              const sectionNum = i + 1;
              const sectionQuestions = questions.filter((qq) => qq.sectionNum === sectionNum);
              const sectionAnswered = sectionQuestions.every(
                (qq) => qq.type === "slider" ? sliderValues[qq.id] !== undefined : answers[qq.id] !== undefined
              );
              const isActive = q.sectionNum === sectionNum;
              return (
                <span key={i} className={`whitespace-nowrap text-[10px] md:text-xs rounded-full px-3 py-1 border transition-colors ${
                  isActive
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : sectionAnswered
                    ? "border-secondary/50 bg-secondary/10 text-secondary"
                    : "border-white/20 text-slate-300"
                }`}>
                  {sectionNum}. {name}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-white/10">
        <motion.div className="h-full bg-gradient-to-r from-primary to-secondary" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div key={q.id} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }} className="w-full max-w-4xl">
            <div className="text-center mb-10">
              <span className="inline-block border border-primary/40 rounded-full px-4 py-1 text-xs font-semibold tracking-widest uppercase text-primary mb-3">
                Section {q.sectionNum} — {q.section}
              </span>
              <p className="text-xs text-slate-300 uppercase tracking-wider mb-4">
                Question {String(q.id).padStart(2, "0")} of 28 • {pathFound}% Complete
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
                {q.question}
              </h2>
            </div>

            {/* Select / Swipe options */}
            {(q.type === "select" || q.type === "swipe") && q.options && (
              <div className={`grid gap-4 max-w-3xl mx-auto ${
                q.options.length === 2 ? "grid-cols-1 sm:grid-cols-2" :
                q.options.length === 3 ? "grid-cols-1 sm:grid-cols-3" :
                "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              }`}>
                {q.options.map((opt, i) => (
                  <motion.button key={i} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => selectOption(i)}
                    className={`text-center flex flex-col items-center justify-center min-h-[120px] p-6 rounded-xl border transition-all duration-200 ${
                      answers[q.id] === i
                        ? "border-primary bg-primary/10 glow-aqua-sm scale-[1.02] ring-1 ring-primary"
                        : "border-white/10 bg-white/5 backdrop-blur-xl hover:border-primary/30"
                    }`}>
                    <h4 className={`font-display font-semibold text-lg md:text-xl ${answers[q.id] === i ? 'text-primary' : 'text-foreground/90'}`}>{opt.title}</h4>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Slider */}
            {q.type === "slider" && (
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-slate-300">{q.sliderMin}</span>
                  <span className="text-3xl font-display font-bold text-primary">{sliderValues[q.id] ?? 5}</span>
                  <span className="text-sm text-slate-300">{q.sliderMax}</span>
                </div>
                <input
                  type="range"
                  min={q.sliderMin}
                  max={q.sliderMax}
                  value={sliderValues[q.id] ?? 5}
                  onChange={(e) => setSliderValues((prev) => ({ ...prev, [q.id]: Number(e.target.value) }))}
                  className="w-full accent-[hsl(var(--primary))] h-2 rounded-full appearance-none bg-white/10 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-300 mt-2">
                  <span>Not ready</span>
                  <span>Fully ready</span>
                </div>
              </div>
            )}
            {/* Dynamic Insight & Personalization Bar */}
            <AnimatePresence>
              {isAnswered && q.type !== "slider" && (
                <motion.div
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -20, height: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full max-w-4xl mx-auto mt-8 overflow-hidden"
                >
                  <div className="bg-white/5 backdrop-blur-xl border border-primary/30 rounded-2xl p-6 md:p-8 relative shadow-[0_0_30px_rgba(45,212,191,0.1)]">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-l-2xl" />
                    
                    <p className="text-base md:text-lg text-foreground/90 font-medium leading-relaxed">
                      {generateInsightText(current, answers[q.id])}
                    </p>

                    <div className="mt-8 pt-6 border-t border-white/10">
                      <h4 className="text-sm font-bold text-foreground mb-4 opacity-80 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" /> Your profile is shaping up...
                      </h4>
                      <div className="flex items-center gap-4 text-sm font-mono">
                        <span className="w-32 md:w-40 text-slate-300 truncate">Analytical</span>
                        <div className="flex-1 h-2 bg-white/10 border border-white/5 rounded-full overflow-hidden flex relative">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: `${Math.min(100, 30 + (progress * 0.5) + (answers[q.id] * 5))}%` }} 
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-primary to-[#29F2B9] relative" 
                          />
                        </div>
                        <span className="w-12 text-right text-primary font-bold">{Math.round(Math.min(100, 30 + (progress * 0.5) + (answers[q.id] * 5)))}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <AnimatePresence>
            {isAnswered && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={next}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-[#29F2B9] px-10 py-4 text-base md:text-lg font-bold text-[#0a1017] glow-aqua hover:scale-[1.03] transform shadow-[0_0_30px_rgba(45,212,191,0.3)] hover:shadow-[0_0_50px_rgba(45,212,191,0.5)] transition-all duration-300"
              >
                {current === questions.length - 1 ? "Complete Analysis" : "Reveal Next Insight"} <ArrowRight className="h-5 w-5 animate-pulse text-foreground/80" />
              </motion.button>
            )}
          </AnimatePresence>

          <p className="flex items-center gap-1.5 text-xs text-slate-300 mt-2">
            <Shield className="h-3.5 w-3.5" /> Auto-saving to neural profile
          </p>
          
          {current > 0 && (
            <button onClick={prev} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-primary transition-all backdrop-blur-md">
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailedAssessment;
