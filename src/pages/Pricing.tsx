import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    features: ["AI Persona Discovery", "3 Role Matches", "Basic Career Roadmap", "Market Insights (Limited)", "Community Access"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "₹999",
    period: "/month",
    features: ["Everything in Free", "Unlimited Simulations", "Real-time Market Tracking", "Salary Forecasting", "AI Mentor Chat", "Priority Support", "Advanced Skill Lab"],
    cta: "Upgrade to Premium Co-Pilot",
    highlighted: true,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container pt-28 pb-16">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-3">
            Choose Your <span className="text-gradient">Co-Pilot</span> Plan
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">Invest in your future. Cancel anytime.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`rounded-2xl p-8 ${
                plan.highlighted
                  ? "bg-gradient-to-b from-primary/10 to-transparent border border-primary/40 glow-aqua-sm"
                  : "glass-card"
              }`}
            >
              <h3 className="font-display text-xl font-bold mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-display font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>
              <ul className="flex flex-col gap-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className={`block text-center rounded-full py-3 text-sm font-semibold transition-all ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground glow-aqua-sm hover:opacity-90"
                    : "border border-border text-foreground hover:border-primary/50"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
