import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, User, Mail, Lock, Upload, Sparkles, ArrowRight, Search, Bot, Pen, Monitor, Leaf, Bitcoin, Shield, Cog, RocketIcon, Dna, FlaskConical, GraduationCap, Eye, TrendingUp, GitBranch, Brain } from "lucide-react";

const interests = [
  { label: "AI Ethics", icon: Bot },
  { label: "Generative Art", icon: Pen },
  { label: "Fintech", icon: Monitor },
  { label: "Sustainability", icon: Leaf },
  { label: "Web3 & DeFi", icon: Bitcoin },
  { label: "Cybersecurity", icon: Shield },
  { label: "Robotics", icon: Cog },
  { label: "Space Tech", icon: RocketIcon },
  { label: "BioTech", icon: Dna },
  { label: "Quantum Computing", icon: FlaskConical },
  { label: "EdTech", icon: GraduationCap },
  { label: "UX Research", icon: Eye },
];

const processingSteps = [
  "Initializing node expansion...",
  "Mapping skill hierarchy [SUCCESS]",
  "Fetching global demand data...",
  "Synthesizing unique ID: FTR-2026-X",
  "Calibrating persona vectors...",
  "Compiling market fit analysis...",
];

const statusCards = [
  { label: "MARKET TRENDS", text: "Matching 4,200+ vectors", icon: TrendingUp },
  { label: "PATH TRAJECTORIES", text: "Calculating 12 growth arcs", icon: GitBranch },
];

const titlePhases = [
  "Synthesizing Your",
  "Synthesizing Your",
  "Synthesizing Your",
];

const subtitlePhases = [
  "Career Architecture...",
  "Career Architecture...",
  "Career Architecture...",
];

const analysisTexts = [
  "Analyzing skill clusters...",
  "Mapping career trajectories...",
  "Finalizing persona synthesis...",
];

const AIProcessingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState<number>(0);
  const [analysisIndex, setAnalysisIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(onComplete, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 1.2 + Math.random() * 2, 100));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLogs((v) => Math.min(v + 1, processingSteps.length));
    }, 700);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalysisIndex((i) => (i + 1) % analysisTexts.length);
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-primary/3 to-transparent" />
      </div>

      {/* Header */}
      <header className="border-b border-border/30 bg-background/80 backdrop-blur-xl relative z-10">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-primary" />
            <span className="font-display text-base font-bold">FuturFly</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Session Active
            <Cog className="h-4 w-4 ml-1" />
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4">
        {/* Brain icon with orbital rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-36 h-36 mb-8"
        >
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl animate-pulse" />
          <div className="absolute inset-2 rounded-full border border-primary/20" />
          <div className="absolute inset-0 rounded-full border border-dashed border-primary/15 animate-spin" style={{ animationDuration: "8s" }} />
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 backdrop-blur-sm flex items-center justify-center">
            <Brain className="h-14 w-14 text-primary" />
          </div>
          {/* Orbiting dots */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <motion.div
              key={deg}
              className="absolute w-1.5 h-1.5 rounded-full bg-primary/60"
              style={{
                top: `${50 + 48 * Math.sin((deg * Math.PI) / 180)}%`,
                left: `${50 + 48 * Math.cos((deg * Math.PI) / 180)}%`,
              }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: deg * 0.005 }}
            />
          ))}
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-1">Synthesizing Your</h1>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-gradient">Career Architecture...</h1>
        </motion.div>

        {/* Analysis subtitle */}
        <motion.p
          key={analysisIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-sm italic text-muted-foreground mb-8"
        >
          {analysisTexts[analysisIndex]}
        </motion.p>

        {/* Central content: status cards + progress */}
        <div className="w-full max-w-3xl flex items-start justify-between gap-4 mb-6">
          {/* Left status cards */}
          <div className="hidden md:flex flex-col gap-3 w-52">
            {statusCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.3 }}
                  className="glass-card p-3 flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">{card.label}</p>
                    <p className="text-xs font-semibold">{card.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Center progress bar */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-full max-w-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">Processing Stream</span>
                <span className="text-sm font-mono font-bold text-primary">{progress.toFixed(1)}%</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </div>

          {/* Right: Live Engine Feed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="hidden md:block glass-card p-4 w-60"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest font-semibold">Live Engine Feed</span>
            </div>
            <div className="font-mono text-[11px] space-y-1.5 text-muted-foreground">
              {processingSteps.slice(0, visibleLogs).map((log, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={log.includes("[SUCCESS]") ? "text-primary" : ""}
                >
                  &gt; {log}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Engine version */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-xs text-muted-foreground flex items-center gap-1.5 mt-4"
        >
          <Sparkles className="h-3 w-3" /> Quantum Intelligence Engine v4.0.2
        </motion.p>
      </div>
    </div>
  );
};


const Register = () => {
  const [step, setStep] = useState(1);
  const [parsing, setParsing] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const [selected, setSelected] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleUpload = () => {
    setStep(3);
  };

  const toggleInterest = (label: string) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const handleFinalize = () => {
    setParsing(true);
  };

  const filteredInterests = interests.filter((i) =>
    i.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (parsing) {
    return <AIProcessingScreen onComplete={() => navigate("/dashboard")} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/30 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-primary" />
            <span className="font-display text-base font-bold">FuturFly</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Log in</Link>
            <Link to="/register" className="rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-1.5 text-sm font-semibold text-primary-foreground">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <div className="container py-16 md:py-24">
        {step === 1 ? (
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <span className="inline-block border border-primary/40 rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase text-primary mb-4">
                AI-Native Career Co-Pilot
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-4">
                Join the <span className="text-gradient">Future of Work</span>
              </h1>
              <p className="text-muted-foreground leading-relaxed mb-8">
                FuturFly uses advanced neural networks to map your potential and connect you with opportunities that match your specific DNA.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="glass-card p-4">
                  <Sparkles className="h-5 w-5 text-primary mb-2" />
                  <h4 className="text-sm font-semibold mb-1">AI Optimization</h4>
                  <p className="text-xs text-muted-foreground">Smart resume & profile builder</p>
                </div>
                <div className="glass-card p-4">
                  <Mail className="h-5 w-5 text-primary mb-2" />
                  <h4 className="text-sm font-semibold mb-1">Skill Mapping</h4>
                  <p className="text-xs text-muted-foreground">Identify gaps in your career path</p>
                </div>
              </div>
              <p className="flex items-center gap-2 text-sm text-muted-foreground mt-6">
                Join <strong className="text-foreground">12,000+</strong> career pioneers
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="glass-card p-8">
                {showLogin ? (
                  <>
                    <h2 className="text-xl font-display font-bold mb-1">Welcome Back</h2>
                    <p className="text-sm text-muted-foreground mb-6">Log in to your FuturFly account.</p>
                    <form onSubmit={(e) => { e.preventDefault(); navigate("/dashboard"); }} className="flex flex-col gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Email Address</label>
                        <div className="flex items-center gap-2 bg-input rounded-lg px-3 py-2.5 border border-border/50 focus-within:border-primary/50 transition-colors">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <input className="bg-transparent text-sm flex-1 outline-none placeholder:text-muted-foreground" placeholder="name@company.com" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Password</label>
                        <div className="flex items-center gap-2 bg-input rounded-lg px-3 py-2.5 border border-border/50 focus-within:border-primary/50 transition-colors">
                          <Lock className="h-4 w-4 text-muted-foreground" />
                          <input type="password" className="bg-transparent text-sm flex-1 outline-none" placeholder="••••••••" />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button type="button" className="text-xs text-primary hover:underline">Forgot Password?</button>
                      </div>
                      <button type="submit" className="w-full rounded-lg bg-gradient-to-r from-primary to-secondary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all">
                        Log In
                      </button>
                    </form>
                    <div className="flex items-center gap-3 my-5">
                      <div className="flex-1 h-px bg-border" />
                      <span className="text-xs text-muted-foreground uppercase">Or continue with</span>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium hover:border-primary/40 transition-colors">
                        Google
                      </button>
                      <button className="flex items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium hover:border-primary/40 transition-colors">
                        LinkedIn
                      </button>
                    </div>
                    <p className="text-center text-sm text-muted-foreground mt-4">
                      Don't have an account? <button onClick={() => setShowLogin(false)} className="text-primary hover:underline">Sign up</button>
                    </p>
                  </>
                ) : (
                  <>
                <h2 className="text-xl font-display font-bold mb-1">Create Account</h2>
                <p className="text-sm text-muted-foreground mb-6">Start your AI-native career journey today.</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                    <div className="flex items-center gap-2 bg-input rounded-lg px-3 py-2.5 border border-border/50 focus-within:border-primary/50 transition-colors">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <input className="bg-transparent text-sm flex-1 outline-none placeholder:text-muted-foreground" placeholder="John Doe" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email Address</label>
                    <div className="flex items-center gap-2 bg-input rounded-lg px-3 py-2.5 border border-border/50 focus-within:border-primary/50 transition-colors">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <input className="bg-transparent text-sm flex-1 outline-none placeholder:text-muted-foreground" placeholder="name@company.com" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Password</label>
                    <div className="flex items-center gap-2 bg-input rounded-lg px-3 py-2.5 border border-border/50 focus-within:border-primary/50 transition-colors">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <input type="password" className="bg-transparent text-sm flex-1 outline-none" placeholder="••••••••" />
                    </div>
                  </div>
                  <button type="submit" className="w-full rounded-lg bg-gradient-to-r from-primary to-secondary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all">
                    Create Account
                  </button>
                </form>
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground uppercase">Or continue with</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium hover:border-primary/40 transition-colors">
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium hover:border-primary/40 transition-colors">
                    LinkedIn
                  </button>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Already have an account? <button onClick={() => setShowLogin(true)} className="text-primary hover:underline">Log in</button>
                </p>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        ) : step === 2 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              Tell us your <span className="text-gradient">story</span>
            </h1>
            <p className="text-muted-foreground mb-10">
              Upload your CV or Portfolio to let our AI map your career DNA and unlock your future potential.
            </p>
            <div
              onClick={handleUpload}
              className="glass-card border-dashed border-2 border-primary/30 p-12 cursor-pointer hover:border-primary/60 transition-colors mb-6"
            >
              <Upload className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-1">Drop your CV or Portfolio here</h3>
              <p className="text-sm text-muted-foreground mb-4">PDF, DOCX, or JPG supported (Max 10MB)</p>
              <span className="inline-block rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary">
                Browse Files
              </span>
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Or</p>
            <button
              onClick={handleUpload}
              className="inline-flex items-center gap-2 bg-muted rounded-full px-8 py-3 text-sm font-semibold hover:bg-muted/80 transition-colors"
            >
              Connect LinkedIn
            </button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-3">
              What fuels your <span className="text-gradient">curiosity?</span>
            </h1>
            <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
              Select the domains that define your ambition. We'll tailor your AI career co-pilot to match your unique interests.
            </p>

            <div className="flex items-center gap-3 bg-card border border-border/50 rounded-xl px-4 py-3 max-w-lg mx-auto mb-10 focus-within:border-primary/50 transition-colors">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-sm flex-1 outline-none placeholder:text-muted-foreground"
                placeholder="Search interests (e.g. AI Ethics, Fintech, Space Tech...)"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12">
              {filteredInterests.map((item, i) => {
                const Icon = item.icon;
                const isSelected = selected.includes(item.label);
                return (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => toggleInterest(item.label)}
                    className={`flex flex-col items-center gap-3 p-6 rounded-xl border transition-all duration-200 ${
                      isSelected
                        ? "border-primary bg-primary/15 glow-aqua-sm"
                        : "border-border/50 bg-card hover:border-primary/30"
                    }`}
                  >
                    <Icon className={`h-7 w-7 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={`text-sm font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <button
              onClick={handleFinalize}
              disabled={selected.length === 0}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-10 py-3.5 text-sm font-semibold text-primary-foreground glow-aqua-sm hover:opacity-90 transition-all disabled:opacity-30"
            >
              Finalize My Profile <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </div>

      <footer className="py-6 border-t border-border/30">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© 2026 FuturFly AI Career Systems. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;
