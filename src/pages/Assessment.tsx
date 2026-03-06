import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, ArrowLeft, ArrowRight, Shield } from "lucide-react";

const questions = [
  {
    id: 1,
    label: "DISCOVERY PHASE",
    question: "What excites you most about technology?",
    options: [
      { title: "Building Products", desc: "Creating solutions that millions use daily." },
      { title: "Solving Hard Problems", desc: "Cracking complex algorithmic and systems challenges." },
      { title: "Leading Teams", desc: "Orchestrating people and projects toward a vision." },
      { title: "Analyzing Data", desc: "Finding patterns and insights hidden in data." },
    ],
  },
  {
    id: 2,
    label: "DISCOVERY PHASE",
    question: "What's your preferred work style?",
    options: [
      { title: "Deep Focus", desc: "Long uninterrupted blocks of concentrated work." },
      { title: "Collaborative", desc: "Brainstorming and building with a team." },
      { title: "Strategic Planning", desc: "High-level thinking with clear execution plans." },
      { title: "Fast Iteration", desc: "Rapid prototyping and shipping quickly." },
    ],
  },
  {
    id: 3,
    label: "DISCOVERY PHASE",
    question: "How do you handle ambiguity?",
    options: [
      { title: "Research First", desc: "Deep dive into data before making decisions." },
      { title: "Experiment & Learn", desc: "Try things quickly and iterate based on results." },
      { title: "Consult Experts", desc: "Seek mentorship and leverage collective wisdom." },
      { title: "Trust Instinct", desc: "Pattern-match from experience and act decisively." },
    ],
  },
  {
    id: 4,
    label: "DISCOVERY PHASE",
    question: "How do you prefer to solve complex problems?",
    options: [
      { title: "AI-Augmented Logic", desc: "Leveraging neural networks and automated reasoning to find optimal solutions." },
      { title: "Human-Centric Design", desc: "Focusing on empathy, user experience patterns, and human behavior psychology." },
      { title: "Data-Driven Strategy", desc: "Analyzing patterns, statistical significance, and large datasets to inform actions." },
      { title: "Technical Craftsmanship", desc: "Deep-diving into architecture, code precision, and low-level performance tuning." },
    ],
  },
  {
    id: 5,
    label: "DISCOVERY PHASE",
    question: "What's your risk appetite for career moves?",
    options: [
      { title: "Conservative", desc: "Steady growth in established companies with clear paths." },
      { title: "Moderate", desc: "Balanced risk with calculated bets on emerging areas." },
      { title: "Aggressive", desc: "High-risk, high-reward moves into cutting-edge domains." },
      { title: "Entrepreneurial", desc: "Building from scratch with full ownership and uncertainty." },
    ],
  },
  {
    id: 6,
    label: "DISCOVERY PHASE",
    question: "What's your ideal time horizon for change?",
    options: [
      { title: "3–6 Months", desc: "Quick wins and immediate career shifts with fast results." },
      { title: "1–2 Years", desc: "Strategic moves with time to upskill and transition smoothly." },
      { title: "3–5 Years", desc: "Long-term transformation with deep expertise and leadership growth." },
    ],
  },
];

const Assessment = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;
  const pathFound = Math.round(((current + (answers[q.id] !== undefined ? 1 : 0)) / questions.length) * 100);

  const selectOption = (idx: number) => {
    setAnswers((prev) => ({ ...prev, [q.id]: idx }));
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setLoading(true);
      setTimeout(() => navigate("/persona"), 3000);
    }
  };

  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse-glow" />
            <div className="absolute inset-4 rounded-full border border-primary/30 animate-spin" style={{ animationDuration: "3s" }} />
            <div className="absolute inset-8 rounded-full border border-secondary/30 animate-spin" style={{ animationDuration: "5s", animationDirection: "reverse" }} />
            {[0, 72, 144, 216, 288].map((deg) => (
              <div
                key={deg}
                className="absolute w-2.5 h-2.5 rounded-full bg-primary animate-pulse-glow"
                style={{
                  top: `${50 + 42 * Math.sin((deg * Math.PI) / 180)}%`,
                  left: `${50 + 42 * Math.cos((deg * Math.PI) / 180)}%`,
                }}
              />
            ))}
          </div>
          <h2 className="text-2xl font-display font-bold mb-2 text-gradient">Analyzing your career DNA…</h2>
          <p className="text-muted-foreground text-sm">Mapping your neural profile against 10,000+ career paths</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/30 bg-background/80 backdrop-blur-xl">
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
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-4xl"
          >
            <div className="text-center mb-10">
              <span className="inline-block border border-primary/40 rounded-full px-4 py-1 text-xs font-semibold tracking-widest uppercase text-primary mb-3">
                {q.label}
              </span>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
                Question {String(q.id).padStart(2, "0")} • {pathFound}% Path Found
              </p>
              <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
                {q.question.split(" ").slice(0, -2).join(" ")}{" "}
                <span className="text-gradient">{q.question.split(" ").slice(-2).join(" ")}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {q.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectOption(i)}
                  className={`text-left p-5 rounded-xl border transition-all duration-200 ${
                    answers[q.id] === i
                      ? "border-primary bg-primary/10 glow-aqua-sm"
                      : "border-border/50 bg-card hover:border-primary/30"
                  }`}
                >
                  <h4 className="font-display font-semibold text-sm mb-2">{opt.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{opt.desc}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center gap-4 mt-12">
          <button
            onClick={prev}
            disabled={current === 0}
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground disabled:opacity-30 hover:border-primary/50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </button>
          <button
            onClick={next}
            disabled={answers[q.id] === undefined}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-30 glow-aqua-sm hover:opacity-90 transition-all"
          >
            Continue <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-6">
          <Shield className="h-3.5 w-3.5" /> Progress is autosaved to your neural profile
        </p>
      </div>
    </div>
  );
};

export default Assessment;
