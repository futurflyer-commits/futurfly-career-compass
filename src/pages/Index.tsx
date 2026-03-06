import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Search, Filter, Compass, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const features = [
  {
    icon: Compass,
    title: "Discovery Persona",
    desc: "Uncover your hidden technical and behavioral strengths with our native AI cognitive mapping engine.",
    cta: "Learn More",
    link: "/assessment",
  },
  {
    icon: Search,
    title: "Role Matching",
    desc: "Strategic alignment between your unique profile and the highest growth opportunities in the AI ecosystem.",
  },
  {
    icon: Filter,
    title: "Career Roadmaps",
    desc: "Step-by-step skilling paths designed by AI to bridge the gap between where you are and your dream role.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />

        <div className="container relative grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 mb-6">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold tracking-widest uppercase text-primary">AI-Native Career Co-Pilot</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] mb-6">
              Design Your Future With{" "}
              <span className="text-gradient">Intelligent Career Paths</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              Navigate the complexity of the modern tech landscape with high-precision AI guidance tailored for Indian professionals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/assessment"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 glow-aqua-sm"
              >
                Get Started <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-6 py-3 text-sm font-semibold text-foreground hover:border-primary/80 transition-colors"
              >
                How It Works
              </a>
            </div>
          </motion.div>

          {/* Abstract visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden md:flex items-center justify-center"
          >
            <div className="relative w-72 h-72">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 blur-2xl animate-pulse-glow" />
              <div className="absolute inset-8 rounded-full border border-primary/20 animate-float" />
              <div className="absolute inset-16 rounded-full bg-card border border-border/50 flex items-center justify-center">
                <Sparkles className="h-12 w-12 text-primary" />
              </div>
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <div
                  key={deg}
                  className="absolute w-2 h-2 rounded-full bg-primary/60"
                  style={{
                    top: `${50 + 45 * Math.sin((deg * Math.PI) / 180)}%`,
                    left: `${50 + 45 * Math.cos((deg * Math.PI) / 180)}%`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">Precision-Engineered Career Growth</h2>
            <div className="w-12 h-0.5 bg-primary mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
              >
                {f.link ? (
                  <Link to={f.link} className="block glass-card-hover p-6 h-full group">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-5">
                      <f.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{f.desc}</p>
                    {f.cta && (
                      <span className="text-sm font-semibold text-primary group-hover:underline inline-flex items-center gap-1">
                        {f.cta} <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </Link>
                ) : (
                  <div className="block glass-card-hover p-6 h-full">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-5">
                      <f.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{f.desc}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="glass-card p-10 md:p-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Ready to pilot your career?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Join 10,000+ tech professionals future-proofing their careers with the most advanced AI co-pilot in India.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/assessment"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-7 py-3 text-sm font-semibold text-primary-foreground glow-aqua-sm hover:opacity-90 transition-all"
              >
                Start Free Assessment
              </Link>
              <Link
                to="/persona"
                className="inline-flex items-center gap-2 rounded-full bg-muted px-7 py-3 text-sm font-semibold text-foreground hover:bg-muted/80 transition-colors"
              >
                Watch Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
