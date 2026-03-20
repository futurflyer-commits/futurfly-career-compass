import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { ArrowLeft, BarChart3, TrendingUp, CheckCircle, AlertTriangle, Clock, Sparkles, MapPin, Briefcase } from "lucide-react";

const rolesData: Record<string, {
  title: string;
  matchPercent: number;
  salaryRange: string;
  type: string;
  location: string;
  demand: string;
  tier: string;
  trend: string;
  description: string;
  whyFit: string[];
  skillGaps: string[];
  transitionTime: string;
  hiringTrend: number[];
}> = {
  "1": {
    title: "AI Solutions Architect",
    matchPercent: 95,
    salaryRange: "₹35L - ₹60L",
    type: "Full-time",
    location: "Remote",
    demand: "High Demand",
    tier: "Tier 1 MNCs",
    trend: "Strong Market Uptrend",
    description: "Design and implement end-to-end AI solutions spanning cloud infrastructure, LLM orchestration, and enterprise integration. You'll lead technical strategy for AI-first products at scale.",
    whyFit: ["Strong system design background", "Cloud infrastructure expertise (AWS)", "Product-engineering bridge skills", "Stakeholder management experience"],
    skillGaps: ["LLM Fine-tuning", "Vector Databases", "RAG Orchestration"],
    transitionTime: "4-6 months",
    hiringTrend: [30, 38, 45, 55, 68, 80, 95],
  },
  "2": {
    title: "Technical Product Manager",
    matchPercent: 88,
    salaryRange: "₹28L - ₹45L",
    type: "Hybrid",
    location: "Bangalore",
    demand: "Growth Stage",
    tier: "Startups",
    trend: "Rapidly Emerging",
    description: "Own the product roadmap for AI-powered features, translating complex technical capabilities into user-centric experiences. Bridge engineering and business teams.",
    whyFit: ["Agile product management skills", "Technical background in engineering", "Strategic thinking capability", "Cross-functional collaboration"],
    skillGaps: ["AI Product Metrics", "Prompt Engineering", "A/B Testing for AI"],
    transitionTime: "3-5 months",
    hiringTrend: [25, 32, 40, 50, 58, 72, 85],
  },
  "3": {
    title: "Data Strategist",
    matchPercent: 82,
    salaryRange: "₹22L - ₹40L",
    type: "Contract",
    location: "Remote",
    demand: "High Demand",
    tier: "Tech Giants",
    trend: "Stable Growth",
    description: "Transform raw data into strategic business insights using advanced analytics, visualization, and AI-driven forecasting for enterprise decision-making.",
    whyFit: ["Data visualization proficiency", "BigQuery and analytics tools", "Business intelligence mindset", "Communication skills"],
    skillGaps: ["Advanced ML Models", "Data Governance", "Real-time Analytics"],
    transitionTime: "5-7 months",
    hiringTrend: [35, 40, 42, 48, 55, 62, 70],
  },
  "4": {
    title: "ML Platform Engineer",
    matchPercent: 78,
    salaryRange: "₹22L - ₹40L",
    type: "Full-time",
    location: "Hyderabad",
    demand: "High Demand",
    tier: "Tech Giants",
    trend: "Stable Growth",
    description: "Build and maintain scalable ML infrastructure, including model training pipelines, feature stores, and deployment systems for production AI workloads.",
    whyFit: ["Cloud infrastructure skills", "Python proficiency", "System design knowledge", "DevOps understanding"],
    skillGaps: ["MLOps Pipelines", "Kubernetes at Scale", "Feature Engineering"],
    transitionTime: "6-8 months",
    hiringTrend: [20, 30, 38, 45, 55, 65, 78],
  },
  "5": {
    title: "GenAI Product Lead",
    matchPercent: 85,
    salaryRange: "₹20L - ₹38L",
    type: "Full-time",
    location: "Bangalore",
    demand: "Growth Stage",
    tier: "Startups",
    trend: "Rapidly Emerging",
    description: "Lead the strategy and execution for generative AI products, from ideation through launch. Drive adoption and measure impact across user segments.",
    whyFit: ["Product leadership experience", "AI domain understanding", "Go-to-market skills", "User-centric design thinking"],
    skillGaps: ["GenAI Evaluation Frameworks", "Responsible AI", "LLM Cost Optimization"],
    transitionTime: "3-5 months",
    hiringTrend: [10, 20, 35, 50, 68, 82, 95],
  },
  "6": {
    title: "Operations Manager",
    matchPercent: 43,
    salaryRange: "₹18L - ₹25L",
    type: "Full-time",
    location: "Mumbai",
    demand: "Moderate",
    tier: "Mid-size",
    trend: "Flat",
    description: "Manage day-to-day operations, optimize workflows, and drive process improvements across teams. Focus on efficiency and cost optimization.",
    whyFit: ["Organizational skills", "Process optimization mindset"],
    skillGaps: ["Operations Analytics", "Supply Chain AI", "Automation Tools", "Six Sigma", "ERP Systems"],
    transitionTime: "8-12 months",
    hiringTrend: [40, 42, 43, 44, 43, 45, 44],
  },
};

const RoleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const role = rolesData[id || ""];

  if (!role) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
                <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Role not found.</p>
            <Link to="/role-hub" className="text-primary font-semibold hover:underline">← Back to Role Hub</Link>
          </div>
        </div>
      </div>
    );
  }

  const matchColor = role.matchPercent >= 80 ? "text-neon" : role.matchPercent >= 60 ? "text-secondary" : "text-muted-foreground";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      
      <main className="flex-1 container max-w-4xl py-10 md:py-16 px-4">
        {/* Back */}
        <Link to="/role-hub" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Role Hub
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
            <div className="flex items-start gap-4">
              <BarChart3 className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold mb-1">{role.title}</h1>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> {role.type}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {role.location}</span>
                  <span>{role.demand} • {role.tier}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-3xl font-display font-bold ${matchColor}`}>{role.matchPercent}%</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Match</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{role.description}</p>
          <div className="flex items-center justify-between border-t border-border/50 pt-4">
            <div>
              <p className="text-xs text-muted-foreground">Salary Range (Annual)</p>
              <p className="text-lg font-display font-bold text-secondary">{role.salaryRange}</p>
            </div>
            <p className="flex items-center gap-1 text-sm text-primary font-semibold">
              <TrendingUp className="h-4 w-4" /> {role.trend}
            </p>
          </div>
        </motion.div>

        {/* Grid: Why You Fit + Skill Gaps */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="font-display font-bold">Why You're a Fit</h2>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">AI-Generated Persona Analysis</p>
            <div className="space-y-3">
              {role.whyFit.map((reason) => (
                <div key={reason} className="flex items-start gap-2.5">
                  <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{reason}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <h2 className="font-display font-bold">Skill Gaps to Close</h2>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Priority Upskilling Areas</p>
            <div className="space-y-3">
              {role.skillGaps.map((gap) => (
                <div key={gap} className="flex items-center justify-between bg-muted rounded-lg p-3">
                  <span className="text-sm font-medium">{gap}</span>
                  <Link to="/skill-lab" className="text-[10px] uppercase tracking-wider text-primary font-semibold hover:underline">
                    Train →
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Hiring Trend + Transition Time */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-sm">Hiring Trend (India)</h2>
              <TrendingUp className="h-4 w-4 text-secondary" />
            </div>
            <div className="flex items-end gap-2 h-24">
              {role.hiringTrend.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-sm bg-gradient-to-t from-secondary/60 to-secondary"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
              <span>2019</span><span>2020</span><span>2021</span><span>2022</span><span>2023</span><span>2024</span><span className="font-bold text-secondary">2025</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-primary" />
                <h2 className="font-display font-bold text-sm">Estimated Time to Transition</h2>
              </div>
              <p className="text-3xl font-display font-bold text-primary mb-2">{role.transitionTime}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Based on your current skill profile, verified competencies, and the average learning curve for professionals in your persona bracket.
              </p>
            </div>
            <Link
              to="/simulation"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              <Sparkles className="h-4 w-4" /> Simulate This Career Path
            </Link>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6 text-center">
          <h3 className="font-display font-bold text-lg mb-2">Ready to pursue this role?</h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
            Start your personalized learning roadmap, simulate different career strategies, or chat with Flynn for guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/roadmap" className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:border-primary/50 transition-colors">
              View Learning Roadmap
            </Link>
            <Link to="/career-nav-ai" className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:border-primary/50 transition-colors">
              Ask Flynn
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default RoleDetail;
