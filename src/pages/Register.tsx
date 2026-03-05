import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket, User, Mail, Lock, Upload, Sparkles } from "lucide-react";

const Register = () => {
  const [step, setStep] = useState(1);
  const [parsing, setParsing] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleUpload = () => {
    setParsing(true);
    setTimeout(() => navigate("/dashboard"), 3000);
  };

  if (parsing) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <div className="relative w-28 h-28 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-primary/15 blur-2xl animate-pulse-glow" />
            {[0, 72, 144, 216, 288].map((deg) => (
              <div
                key={deg}
                className="absolute w-2 h-2 rounded-full bg-primary"
                style={{
                  top: `${50 + 40 * Math.sin((deg * Math.PI) / 180)}%`,
                  left: `${50 + 40 * Math.cos((deg * Math.PI) / 180)}%`,
                }}
              />
            ))}
            <div className="absolute inset-6 rounded-full border border-primary/20 animate-spin" style={{ animationDuration: "4s" }} />
          </div>
          <h2 className="text-xl font-display font-bold text-gradient mb-2">Synthesizing Your Experience...</h2>
          <div className="w-32 h-0.5 bg-muted rounded-full mx-auto overflow-hidden">
            <motion.div className="h-full bg-primary" animate={{ width: ["0%", "100%"] }} transition={{ duration: 2.5 }} />
          </div>
          <p className="text-xs text-muted-foreground mt-6 uppercase tracking-wider">
            AI-Native Intelligence • Secured with Enterprise Encryption
          </p>
        </motion.div>
      </div>
    );
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
                  Already have an account? <Link to="/" className="text-primary hover:underline">Log in</Link>
                </p>
              </div>
            </motion.div>
          </div>
        ) : (
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
