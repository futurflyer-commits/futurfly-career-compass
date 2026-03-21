import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Gem, BookOpen, Code, Cloud, Snowflake, Shield, Monitor } from "lucide-react";

const phases = [
  {
    phase: "Phase 01",
    time: "0–3 Months",
    title: "Foundation & Core Logic",
    active: true,
    cards: [
      { icon: Gem, title: "Skills to Master", desc: "Data Structures (Arrays, Lists, Stacks), Basic Algorithms, Git/GitHub, and JavaScript Fundamentals." },
      { icon: BookOpen, title: "Learning Path", desc: "CS50 Introduction to Computer Science, FreeCodeCamp Responsive Web Design Certification." },
      { icon: Monitor, title: "Practical Project", desc: "Build a Personal Portfolio website using semantic HTML and CSS with dark mode support." },
    ],
  },
  {
    phase: "Phase 02",
    time: "3–9 Months",
    title: "Full-Stack Specialization",
    cards: [
      { icon: Gem, title: "Skills to Master", desc: "React.js, Node.js, Express, MongoDB, RESTful APIs, and State Management." },
      { icon: Shield, title: "Learning Path", desc: "FullStackOpen by University of Helsinki or Namaste React by Industry veterans." },
      { icon: Code, title: "Practical Project", desc: "MERN Stack E-commerce platform with Stripe integration and user authentication." },
    ],
  },
  {
    phase: "Phase 03",
    time: "9–18 Months",
    title: "Scaling & Cloud Mastery",
    cards: [
      { icon: Cloud, title: "Skills to Master", desc: "AWS/Azure Basics, Docker, Kubernetes, System Design, and CI/CD Pipelines." },
      { icon: Snowflake, title: "Learning Path", desc: "AWS Certified Solutions Architect course and High Level System Design series." },
      { icon: Code, title: "Practical Project", desc: "Real-time Video Streaming Service architecture or Microservices based Chat App." },
    ],
  },
];

const Roadmap = () => {
  return (
    <div className="min-h-screen bg-background">
      
      <div className="container py-8 md:py-12">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">AI-Native Career Co-Pilot</p>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Personalized <span className="text-gradient">Roadmap</span></h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Overall Completion</span>
            <span className="text-2xl font-display font-bold text-neon">35%</span>
          </div>
        </motion.div>

        {/* Phases */}
        <div className="relative">
          <div className="absolute left-5 md:left-6 top-0 bottom-0 w-px bg-border/50" />

          {phases.map((phase, pi) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: pi * 0.15 }}
              className="relative pl-14 md:pl-16 mb-12"
            >
              <div className={`absolute left-3 md:left-4 top-1 w-4 h-4 rounded-full border-2 ${phase.active ? "border-primary bg-primary/20" : "border-border bg-background"
                }`} />

              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs uppercase tracking-widest font-semibold ${phase.active ? "text-primary" : "text-muted-foreground"}`}>
                  {phase.phase}
                </span>
                <span className="text-xs text-muted-foreground">— {phase.time}</span>
              </div>
              <h2 className="text-xl font-display font-bold mb-4">{phase.title}</h2>

              <div className="grid md:grid-cols-3 gap-4">
                {phase.cards.map((card) => (
                  <div key={card.title} className="glass-card-hover p-5">
                    <card.icon className="h-5 w-5 text-primary mb-3" />
                    <h4 className="font-display font-semibold text-sm mb-2">{card.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mentorship CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-6 mt-8"
        >
          <div>
            <h3 className="text-xl font-display font-bold mb-2">Accelerate with Mentorship</h3>
            <p className="text-sm text-muted-foreground">Direct access to industry experts from leading tech giants and innovative startups to review your roadmap.</p>
          </div>
          <Link to="/pricing" className="shrink-0 inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors uppercase tracking-wider">
            Find a Mentor
          </Link>
        </motion.div>
      </div>

      <footer className="py-8 border-t border-border/50 mt-8">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-sm font-bold">FuturFly</span>
          </Link>
          <p className="text-xs text-muted-foreground">© 2026 FuturFly AI Career Platform. Engineered for the next generation.</p>
        </div>
      </footer>
    </div>
  );
};

export default Roadmap;
