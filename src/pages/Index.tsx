import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, ArrowUpRight, Brain, Target, Map, Quote, ChevronDown, Network, User, GitBranch, Key, GraduationCap, ChevronUp } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Data
const phases = [
  {
    phase: "PHASE 01",
    title: "Discovery Persona",
    desc: "Uncover your strengths using AI cognitive mapping. Our system finds broad UI/UX, Data & Product Core capabilities.",
    cta: "Understand Yourself",
    link: "/assessment",
    icon: Brain
  },
  {
    phase: "PHASE 02",
    title: "Role Matching",
    desc: "Align your profile with high-growth opportunities. See where you are trending and what roles match you specifically.",
    cta: "Explore Roles",
    link: "/market",
    icon: Target
  },
  {
    phase: "PHASE 03",
    title: "Career Roadmaps",
    desc: "Get a step-by-step path to your next role, from skilling, project to interview preparation, we have you covered.",
    cta: "See Your Path",
    link: "/dashboard",
    icon: Map
  }
];

const faqs = [
  {
    q: "How personalized is the analysis?",
    a: "Extremely. We don't just use keywords; we analyze the context, extract your experience, and map your unique strengths against role requirements."
  },
  {
    q: "Does it really take under 10 minutes?",
    a: "Yes. By analyzing your CV or scanning profiles, our AI engine can process and deliver rich, actionable results immediately."
  },
  {
    q: "What is the cost for individual users?",
    a: "The initial assessment and core role matching is free forever. To access premium resources and recommendations, there is an affordable monthly subscription."
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const AccordionItem = ({ q, a }: { q: string, a: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-white/20 shadow-lg rounded-xl bg-white/10 backdrop-blur-xl hover:bg-white/20 overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full text-left px-6 py-4 flex items-center justify-between font-semibold hover:bg-white/10/30 transition-colors text-sm md:text-base"
      >
        {q}
        {isOpen ? <ChevronUp className="h-5 w-5 text-slate-300 shrink-0 ml-4" /> : <ChevronDown className="h-5 w-5 text-slate-300 shrink-0 ml-4" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4 text-slate-300 text-sm leading-relaxed border-t border-white/10 pt-3">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-primary/30">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section id="hero" className="relative pt-32 pb-24 md:pt-40 md:pb-32 container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-6 text-white">
            Stop Guessing <br className="hidden md:block" />
            Your Career. <span className="text-primary">Start <br className="hidden md:block" />
            Navigating It.</span>
          </h1>
          
          <p className="text-base md:text-lg text-slate-300 max-w-xl mb-8 leading-relaxed">
            Most tech professionals don't lack opportunities. They lack clarity. FuturFly analyzes your experience and shows the most realistic career paths you can grow into — and the exact skills to learn next.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <Link
              to="/assessment"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 text-foreground hover:border-primary/80 px-8 py-3.5 text-sm font-semibold transition-all w-full sm:w-auto"
            >
              Ready to fly? <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/waitlist"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3.5 text-sm font-semibold transition-all glow-aqua-sm w-full sm:w-auto"
            >
              Join Waitlist
            </Link>
          </div>
          
          <p className="text-xs text-slate-300 mb-8">
            100% free career assessment. 1000s of data points.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Designed for Tech Professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>AI-based Attribute Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Data-driven paths</span>
            </div>
          </div>
        </motion.div>

        {/* Hero Graphic */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 w-full min-h-[400px] lg:h-[600px] flex items-center justify-center lg:justify-end mt-10 lg:mt-0"
        >
          <div className="relative w-full max-w-2xl lg:max-w-3xl aspect-square md:aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden border border-primary/20 shadow-[0_0_60px_rgba(0,181,204,0.2)] bg-black/60 flex items-center justify-center">
            <video 
              src="/hero-video.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-contain"
            />
            {/* Overlay gradient to blend with the dark theme */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </section>

      {/* --- MIDDLE SECTION 1: NOT ALONE --- */}
      <section className="py-24 relative overflow-hidden bg-white/10 backdrop-blur-xl hover:bg-white/20 border-y border-white/10 text-center px-4">
         <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-1.5 mb-8">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-primary">START YOUR FREE ASSESSMENT</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">
              If Your Career Feels Uncertain, You're Not Alone.
            </h2>
            
            <p className="text-xl md:text-2xl italic font-serif text-slate-300 mb-8">
              "The Skills You Have Today May Not Be Enough Tomorrow"
            </p>
            <div className="w-16 h-0.5 bg-primary/50 mx-auto mb-8" />
            <p className="text-sm md:text-base text-slate-300 mx-auto max-w-2xl leading-relaxed">
              Recent data suggests over 40% of technical skills will be outdated by 2030. In a world of shifting AI paradigms, staying relevant isn't just about learning—it's about learning the <strong className="text-foreground">right</strong> things at the <strong className="text-foreground">right</strong> time.
            </p>
         </motion.div>
      </section>

      {/* --- SPLIT FEATURE SECTION --- */}
      <section className="py-24 container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Abstract rings */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="relative h-[400px] flex items-center justify-center bg-black/80 rounded-3xl border border-white/10 overflow-hidden ring-1 ring-inset ring-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
           {/* High-contrast Abstract orange elliptical glowing rings */}
           <div className="absolute w-[80%] h-[40%] border-[3px] border-orange-500/80 rounded-[100%] rotate-45 animate-spin shadow-[0_0_40px_rgba(249,115,22,0.6)]" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
           <div className="absolute w-[85%] h-[45%] border-[2px] border-orange-400/60 rounded-[100%] rotate-12 animate-spin shadow-[0_0_60px_rgba(249,115,22,0.4)]" style={{ animationDuration: '20s' }} />
           <div className="absolute w-[70%] h-[35%] border-[3px] border-white/50 rounded-[100%] -rotate-12 animate-spin shadow-[0_0_20px_rgba(255,255,255,0.2)]" style={{ animationDuration: '10s' }} />
           <div className="absolute w-[75%] h-[50%] border-[2px] border-orange-300/40 rounded-[100%] -rotate-45 animate-spin" style={{ animationDuration: '25s' }} />
           {/* Center bright core */}
           <div className="absolute w-[20%] h-[20%] bg-orange-500/20 rounded-full blur-[40px]" />
        </motion.div>

        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           variants={fadeUp}
           custom={0}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-10 leading-tight">
            A Career Navigation System For The Age Of AI
          </h2>
          
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="mt-1 w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                 <ArrowUpRight className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-1">Career paths you can realistically grow into</h4>
                <p className="text-sm text-slate-300">Data-driven analysis based on millions of career transitions and real-time pulse skill needs.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="mt-1 w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                 <Key className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-1">The skills that unlock those roles</h4>
                <p className="text-sm text-slate-300">We identify the exact "delta" between where you are and where you want to be.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="mt-1 w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                 <GraduationCap className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-1">The learning paths that actually matter</h4>
                <p className="text-sm text-slate-300">Forget generic courses. Get curated resources tailored for your specific gap.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- ROADMAP SECTION --- */}
      <section id="pathways" className="py-24 bg-white/10/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">Your Roadmap to Success</h2>
            <p className="text-sm text-slate-300 italic">*Three steps to complete clarity</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {phases.map((p, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-white/10 backdrop-blur-xl hover:bg-white/20 glass-card-hover border border-white/20 shadow-lg p-8 rounded-2xl flex flex-col relative overflow-hidden group"
              >
                <div className="absolute -bottom-6 -right-6 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                   <p.icon className="w-48 h-48" />
                </div>
                
                <span className="text-[10px] font-bold tracking-widest text-primary mb-4 block uppercase">{p.phase}</span>
                <h3 className="text-xl font-display font-bold mb-3">{p.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-8 flex-1">
                  {p.desc}
                </p>
                <Link to={p.link} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors mt-auto">
                   {p.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section id="success-stories" className="py-24 container mx-auto px-6 border-b border-white/10">
         <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">Customer Success Stories</h2>
            <div className="w-16 h-0.5 bg-primary/50 mx-auto" />
         </div>
         <div className="grid md:grid-cols-2 gap-8">
            <motion.div
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={fadeUp}
               custom={0}
               className="bg-white/10 backdrop-blur-xl hover:bg-white/20 p-8 rounded-2xl border border-white/20 shadow-lg relative"
            >
               <Quote className="h-10 w-10 text-primary/20 absolute top-8 right-8" />
               <p className="text-sm md:text-base leading-relaxed mb-8 relative z-10 italic text-slate-300">
                 "Yeah, there is a lot of clear and actionable advice. It didn't feel like lecture. It actually mapped my experience and showed exactly which cloud certs actually moved the needle for hiring managers. It cut my research time by weeks."
               </p>
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <User className="h-5 w-5 text-slate-300" />
                 </div>
                 <div>
                   <p className="text-sm font-bold text-foreground">Alex Rivera</p>
                   <p className="text-[11px] text-slate-300 uppercase tracking-wider">Senior Software Developer</p>
                 </div>
               </div>
            </motion.div>
            
            <motion.div
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={fadeUp}
               custom={1}
               className="bg-white/10 backdrop-blur-xl hover:bg-white/20 p-8 rounded-2xl border border-white/20 shadow-lg relative"
            >
               <Quote className="h-10 w-10 text-primary/20 absolute top-8 right-8" />
               <p className="text-sm md:text-base leading-relaxed mb-8 relative z-10 italic text-slate-300">
                 "As a new CS graduate, the market felt overwhelming. FuturFly identified that my side projects actually made me a great candidate for Developer Relations roles, not just backend dev. Found my first role in 3 weeks."
               </p>
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <User className="h-5 w-5 text-slate-300" />
                 </div>
                 <div>
                   <p className="text-sm font-bold text-foreground">Sarah Chen</p>
                   <p className="text-[11px] text-slate-300 uppercase tracking-wider">Computer Science Graduate</p>
                 </div>
               </div>
            </motion.div>
         </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 container mx-auto px-6 max-w-4xl">
         <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold">Common Questions</h2>
         </div>
         <div className="space-y-4">
           {faqs.map((faq, i) => (
             <AccordionItem key={i} q={faq.q} a={faq.a} />
           ))}
         </div>
      </section>

      {/* --- BOTTOM CTA --- */}
      <section className="py-24 relative text-center px-4">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto max-w-3xl relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white leading-tight">
            Your Future Career Is Already Possible. <br className="hidden md:block"/>
            <span className="text-primary">You Just Need To See The Path.</span>
          </h2>
          <p className="text-slate-300 text-sm md:text-base mx-auto max-w-lg mb-10">
            FuturFly can analyze your profile and reveal your most promising career paths in under a minute.
          </p>
          <Link
             to="/assessment"
             className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3.5 text-sm font-bold transition-all glow-aqua-sm"
          >
             Take the Free Career Assessment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
