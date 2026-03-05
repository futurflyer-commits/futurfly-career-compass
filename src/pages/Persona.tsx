import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket, ArrowRight, Share2, Download, Sparkles } from "lucide-react";

const traits = [
  { label: "Strategic Vision", value: 94, color: "from-primary to-secondary" },
  { label: "Technical Depth", value: 88, color: "from-secondary to-accent" },
  { label: "Systems Design", value: 91, color: "from-accent to-neon" },
  { label: "Human-AI Interaction", value: 82, color: "from-primary to-mint" },
];

const Persona = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/30 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-primary" />
            <span className="font-display text-base font-bold">FuturFly</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/roadmap">Career Path</Link>
            <span>Community</span>
            <Link to="/register" className="border border-border rounded-full px-4 py-1.5 font-medium text-foreground hover:border-primary/50 transition-colors">
              Profile
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex flex-col items-center justify-center px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl"
        >
          <span className="inline-block border border-primary/40 rounded-full px-4 py-1 text-xs font-semibold tracking-widest uppercase text-primary mb-6">
            Assessment Complete
          </span>

          <h1 className="text-4xl md:text-6xl font-display font-bold mb-2">THE AI PRODUCT</h1>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient mb-10">ARCHITECT</h1>

          {/* Avatar area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative w-48 h-48 mx-auto mb-8"
          >
            <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-2xl animate-pulse-glow" />
            <div className="relative w-full h-full rounded-2xl bg-card border border-border/50 flex items-center justify-center">
              <Sparkles className="h-16 w-16 text-primary" />
            </div>
          </motion.div>

          <p className="text-muted-foreground leading-relaxed mb-10 max-w-lg mx-auto">
            "You don't just solve problems; you design the intelligence that prevents them. Your vision bridges the gap between human empathy and algorithmic precision."
          </p>

          {/* Trait bars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-12">
            {traits.map((t, i) => (
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
