import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Shield } from "lucide-react";

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
  const navigate = useNavigate();

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length + Object.keys(sliderValues).length;
  const pathFound = Math.round((answeredCount / questions.length) * 100);
  const isAnswered = q.type === "slider" ? sliderValues[q.id] !== undefined : answers[q.id] !== undefined;

  const selectOption = (idx: number) => {
    setAnswers((prev) => ({ ...prev, [q.id]: idx }));
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setLoading(true);
      setTimeout(() => navigate("/persona"), 3500);
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
          <p className="text-muted-foreground text-sm">Building your detailed persona from 28 data points across 6 dimensions</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      
      {/* Section tracker */}
      <div className="border-b border-border/30 bg-card/50 backdrop-blur-sm">
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
                    : "border-border text-muted-foreground"
                }`}>
                  {sectionNum}. {name}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-muted">
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
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
                Question {String(q.id).padStart(2, "0")} of 28 • {pathFound}% Complete
              </p>
              <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
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
                    className={`text-left p-5 rounded-xl border transition-all duration-200 ${
                      answers[q.id] === i
                        ? "border-primary bg-primary/10 glow-aqua-sm"
                        : "border-border/50 bg-card hover:border-primary/30"
                    }`}>
                    <h4 className="font-display font-semibold text-sm">{opt.title}</h4>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Slider */}
            {q.type === "slider" && (
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">{q.sliderMin}</span>
                  <span className="text-3xl font-display font-bold text-primary">{sliderValues[q.id] ?? 5}</span>
                  <span className="text-sm text-muted-foreground">{q.sliderMax}</span>
                </div>
                <input
                  type="range"
                  min={q.sliderMin}
                  max={q.sliderMax}
                  value={sliderValues[q.id] ?? 5}
                  onChange={(e) => setSliderValues((prev) => ({ ...prev, [q.id]: Number(e.target.value) }))}
                  className="w-full accent-[hsl(var(--primary))] h-2 rounded-full appearance-none bg-muted cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
                  <span>Not ready</span>
                  <span>Fully ready</span>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center gap-4 mt-12">
          <button onClick={prev} disabled={current === 0}
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground disabled:opacity-30 hover:border-primary/50 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Previous
          </button>
          <button onClick={next} disabled={!isAnswered}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-30 glow-aqua-sm hover:opacity-90 transition-all">
            {current === questions.length - 1 ? "Finish Assessment" : "Continue"} <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-6">
          <Shield className="h-3.5 w-3.5" /> Progress is autosaved to your neural profile
        </p>
      </div>
    </div>
  );
};

export default DetailedAssessment;
