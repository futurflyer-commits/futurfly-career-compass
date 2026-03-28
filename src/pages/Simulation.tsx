import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Zap, TrendingUp, Sparkles, Clock, ShieldAlert, Rocket, Target, AlertTriangle } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

const AI_EXPOSURE_LEVELS = ["Low", "Medium", "High", "Cutting Edge"];
const RISK_LEVELS = ["Safe", "Balanced", "Aggressive", "Founder Mode"];
const CONSISTENCY_LEVELS = ["Low", "Medium", "High"];

interface SimulationParams {
  learningTime: number; // 5 to 40
  aiExposure: number; // 0 to 3
  risk: number; // 0 to 3
  consistency: number; // 0 to 2
}

const DEFAULT_PARAMS: SimulationParams = {
  learningTime: 10,
  aiExposure: 1, // Medium
  risk: 1, // Balanced
  consistency: 1, // Medium
};

const MODE_10X_PARAMS: SimulationParams = {
  learningTime: 40,
  aiExposure: 3, // Cutting Edge
  risk: 3, // Founder Mode
  consistency: 2, // High
};

// --- Engine Logic ---
const calculateTrajectory = (params: SimulationParams, targetRoleTitle: string) => {
  const baseSalary = 8.5; // Lakhs
  const learningMultiplier = params.learningTime / 10; // 0.5 to 4
  const aiMultiplier = 1 + params.aiExposure * 0.25; // 1 to 1.75
  const riskMultiplier = 1 + params.risk * 0.3; // 1 to 1.9
  const consistencyMultiplier = 0.6 + params.consistency * 0.4; // 0.6 to 1.4

  const rawGrowthRate = 0.10 * learningMultiplier * aiMultiplier * riskMultiplier * consistencyMultiplier;
  const clampedGrowthRate = Math.min(Math.max(rawGrowthRate, 0.05), 1.5); // 5% to 150% max

  const timelineData = [];
  const milestones = [];
  let currentSalary = baseSalary;

  for (let year = 0; year <= 5; year++) {
    timelineData.push({
      year: `Year ${year}`,
      salary: parseFloat(currentSalary.toFixed(1)),
      baseline: parseFloat((baseSalary * Math.pow(1.15, year)).toFixed(1)) // 15% standard growth
    });

    let role = "Software Engineer";
    if (year === 5) {
      role = targetRoleTitle;
    } else if (year > 0) {
      if (currentSalary >= 80) role = "Principal / Core Contributor";
      else if (currentSalary >= 50) role = "Staff Engineer / Architect";
      else if (currentSalary >= 30) role = "Sr. Software Engineer";
      else if (currentSalary >= 18) role = "SDE II";
      else if (currentSalary >= 12) role = "SDE I";
    }

    milestones.push({ year, salary: currentSalary, role });

    // Compound
    currentSalary = currentSalary * (1 + clampedGrowthRate);
    
    // Non-linear variance based on risk and consistency
    if (params.risk > 1 && params.consistency < 2) {
      currentSalary *= 0.9; // Penalty for high risk without high consistency
    }
  }

  const finalSalary = timelineData[5].salary;
  const growthPercent = ((finalSalary - baseSalary) / baseSalary) * 100;
  
  // Metrics
  const speedMultiplier = (clampedGrowthRate / 0.15).toFixed(1); // Compared to 15% base
  const timeToGoal = params.learningTime > 20 && params.aiExposure >= 2 ? "-2.5 Yrs" : "Standard";

  // Identity & Trade-offs
  let identity = "Steady Performer";
  let pros = ["Stable income", "Predictable work hours", "Low stress"];
  let cons = ["Slower wealth accumulation", "Risk of skill obsolescence", "Linear growth"];
  let riskLevel = "Low";

  if (params.risk === 3 && params.learningTime >= 30) {
    identity = "Hyper-Growth Innovator";
    pros = ["Exponential wealth potential", "Industry influence", "Rapid skill acquisition"];
    cons = ["Extreme burnout risk", "High volatility", "Sacrificed work-life balance"];
    riskLevel = "Extreme";
  } else if (params.aiExposure >= 2 && params.consistency === 2) {
    identity = "AI-Augmented Specialist";
    pros = ["High market relevance", "Excellent leverage", "Strong compensation"];
    cons = ["Requires constant unlearning", "Niche dependency"];
    riskLevel = "Medium";
  } else if (params.learningTime < 10 && params.risk <= 1) {
    identity = "Comfort Zone Resident";
    pros = ["High work-life balance", "Zero extracurricular stress"];
    cons = ["AI replacement risk", "Stagnant compensation", "Limited options"];
    riskLevel = "High (Obsolescence)";
  } else if (params.risk >= 2) {
     identity = "Aggressive Climber";
     pros = ["Fast promotions", "Higher base pay"];
     cons = ["Office politics overhead", "Moderate burnout risk"];
     riskLevel = "High";
  }

  return {
    timelineData,
    milestones,
    finalSalary,
    growthPercent: Math.round(growthPercent),
    clampedGrowthRate: Math.round(clampedGrowthRate * 100),
    speedMultiplier,
    timeToGoal,
    identity,
    pros,
    cons,
    riskLevel
  };
};

const Simulation = () => {
  const { user } = useAuth();
  const [targetTitle, setTargetTitle] = useState("AI Solution Architect");
  const [params, setParams] = useState<SimulationParams>(DEFAULT_PARAMS);
  const [isWarping, setIsWarping] = useState(false);
  const [lastChanged, setLastChanged] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      supabase.from("profiles").select("active_role_id").eq("id", user.id).single()
        .then(({ data }) => {
          if (data?.active_role_id) {
            const titleId = data.active_role_id;
            if (titleId === "role-1") setTargetTitle("AI Solution Architect");
            else if (titleId === "role-2") setTargetTitle("GenAI Product Lead");
            else if (titleId === "role-3") setTargetTitle("ML Engineering Manager");
            else if (titleId === "role-4") setTargetTitle("Senior MLOps Engineer");
            else setTargetTitle(titleId.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()));
          }
        });
    }
  }, [user]);

  const trajectory = useMemo(() => calculateTrajectory(params, targetTitle), [params, targetTitle]);

  const handleParamChange = (key: keyof SimulationParams, value: number) => {
    setParams(prev => ({ ...prev, [key]: value }));
    setLastChanged(key);
  };

  const activate10XMode = () => {
    setIsWarping(true);
    setParams(MODE_10X_PARAMS);
    setLastChanged("All (10X Mode)");
    setTimeout(() => setIsWarping(false), 1200);
  };

  return (
    <div className="min-h-screen bg-background pb-20 overflow-x-hidden">
      {/* 10X Warp Overlay */}
      <AnimatePresence>
        {isWarping && (
           <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: [0.8, 1.2, 1], opacity: [0, 1, 0] }} 
              transition={{ duration: 1.2 }}
              className="text-primary flex flex-col items-center"
            >
              <Zap className="w-32 h-32 mb-4 animate-pulse" />
              <h2 className="text-4xl font-display font-bold text-gradient">10X MODE ACTIVATED</h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container py-8 md:py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">Interactive Engine</span>
              <span className="text-xs bg-primary/10 border border-primary/30 rounded-full px-2 py-0.5 text-primary flex items-center gap-1">
                <Target size={12} /> Live Simulation
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-2">
              Career <span className="text-gradient">Simulator</span> Engine
            </h1>
            <p className="text-muted-foreground max-w-xl text-sm md:text-base">
              Dynamically adjust your input parameters. Real-time algorithmic projection of your career trajectory, skill velocity, and compensation outcomes.
            </p>
          </div>
          <Button 
            onClick={activate10XMode} 
            size="lg"
            className="group relative overflow-hidden bg-primary text-primary-foreground font-bold border-2 border-transparent hover:border-primary/50 transition-all shadow-[0_0_20px_rgba(var(--primary),0.4)]"
          >
            <motion.div 
              className="absolute inset-0 bg-white/20" 
              initial={{ x: "-100%" }} 
              whileHover={{ x: "100%" }} 
              transition={{ duration: 0.5 }}
            />
            <Rocket className="mr-2 h-5 w-5 group-hover:-translate-y-1 transition-transform" />
            ACTIVATE 10X MODE
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column: Controls & Impacts */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 border-primary/20 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-transparent" />
               <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-2">
                 <Target className="w-5 h-5 text-primary" /> Control Panel
               </h3>

               {/* Learning Time */}
               <div className="mb-6">
                 <div className="flex justify-between items-end mb-2">
                   <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Learning Investment</label>
                   <span className="text-primary font-bold">{params.learningTime} <span className="text-xs text-muted-foreground font-normal">hrs/wk</span></span>
                 </div>
                 <Slider 
                   value={[params.learningTime]} 
                   min={5} 
                   max={40} 
                   step={1} 
                   onValueChange={(val) => handleParamChange('learningTime', val[0])} 
                   className="py-1"
                 />
                 <div className="flex justify-between mt-1 px-1">
                   <span className="text-[10px] text-muted-foreground/60">Casual (5h)</span>
                   <span className="text-[10px] text-muted-foreground/60">Obsessed (40h)</span>
                 </div>
               </div>

               {/* AI Exposure */}
               <div className="mb-6">
                 <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">AI Integration Level</label>
                 <Select value={params.aiExposure.toString()} onValueChange={(val) => handleParamChange('aiExposure', parseInt(val))}>
                   <SelectTrigger className="bg-background/50 border-input w-full">
                     <SelectValue placeholder="Select AI exposure" />
                   </SelectTrigger>
                   <SelectContent>
                     {AI_EXPOSURE_LEVELS.map((level, i) => (
                       <SelectItem key={i} value={i.toString()}>{level}</SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
               </div>

               {/* Risk Taking */}
               <div className="mb-6">
                 <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Risk Tolerance</label>
                 <Select value={params.risk.toString()} onValueChange={(val) => handleParamChange('risk', parseInt(val))}>
                   <SelectTrigger className="bg-background/50 border-input w-full">
                     <SelectValue placeholder="Select risk level" />
                   </SelectTrigger>
                   <SelectContent>
                     {RISK_LEVELS.map((level, i) => (
                       <SelectItem key={i} value={i.toString()}>{level}</SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
               </div>

               {/* Consistency */}
               <div className="mb-2">
                 <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Execution Consistency</label>
                 <Select value={params.consistency.toString()} onValueChange={(val) => handleParamChange('consistency', parseInt(val))}>
                   <SelectTrigger className="bg-background/50 border-input w-full">
                     <SelectValue placeholder="Select consistency" />
                   </SelectTrigger>
                   <SelectContent>
                     {CONSISTENCY_LEVELS.map((level, i) => (
                       <SelectItem key={i} value={i.toString()}>{level}</SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
               </div>
            </motion.div>

            {/* Trade-off Panel */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
              <h3 className="font-display font-medium text-lg mb-4 flex items-center gap-2">
                 <TrendingUp className="w-4 h-4 text-primary" /> Path Analysis
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <h4 className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-2">Upsides</h4>
                  <ul className="text-xs text-muted-foreground space-y-1 pl-3 list-disc marker:text-green-500/50">
                    {trajectory.pros.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">Trade-offs</h4>
                  <ul className="text-xs text-muted-foreground space-y-1 pl-3 list-disc marker:text-red-500/50">
                    {trajectory.cons.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between p-3 rounded-md bg-secondary/50 border border-border">
                <span className="text-xs uppercase text-muted-foreground font-semibold">Systemic Risk</span>
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  trajectory.riskLevel.includes('High') || trajectory.riskLevel === 'Extreme' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                }`}>
                  {trajectory.riskLevel}
                </span>
              </div>
            </motion.div>

            {/* What Changed Highlight */}
            <AnimatePresence mode="wait">
              {lastChanged && (
                <motion.div 
                  key={lastChanged + trajectory.finalSalary}
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: "auto" }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-primary/10 border border-primary/30 rounded-lg p-4 flex items-start gap-3"
                >
                  <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-primary uppercase mb-1">Live Impact: {lastChanged}</p>
                    <p className="text-sm text-foreground">
                      This adjustment modified your projected 5-year peak to <strong className="text-primary font-display border-b border-primary border-dashed">₹{trajectory.finalSalary}L</strong> and shifted your growth velocity to <strong className="text-primary">{trajectory.speedMultiplier}x</strong>.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Right Column: Visualizations */}
          <div className="lg:col-span-7 flex flex-col gap-6">
             {/* Key Metrics Row */}
             <div className="grid grid-cols-3 gap-4">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="glass-card p-4 flex flex-col justify-center items-center text-center">
                  <span className="text-xs text-muted-foreground uppercase tracking-widest mb-1">5 YR Salary</span>
                  <motion.span 
                    key={trajectory.finalSalary}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-2xl md:text-3xl font-display font-bold text-gradient"
                  >
                    ₹{trajectory.finalSalary}L
                  </motion.span>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="glass-card p-4 flex flex-col justify-center items-center text-center">
                  <span className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Growth</span>
                  <motion.span 
                    key={trajectory.growthPercent}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-2xl md:text-3xl font-display font-bold text-foreground"
                  >
                    +{trajectory.growthPercent}%
                  </motion.span>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="glass-card p-4 flex flex-col justify-center items-center text-center">
                  <span className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Velocity</span>
                  <motion.span 
                    key={trajectory.speedMultiplier}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-2xl md:text-3xl font-display font-bold text-primary flex items-center gap-1"
                  >
                    {trajectory.speedMultiplier}x <Zap className="w-4 h-4 fill-primary" />
                  </motion.span>
                </motion.div>
             </div>

             {/* Dynamic Chart */}
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6 h-[320px] flex flex-col">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="font-display font-bold">Projection Curve</h3>
                 <div className="flex gap-4">
                   <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-primary" />
                     <span className="text-xs text-muted-foreground">Simulated Path</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-border" />
                     <span className="text-xs text-muted-foreground">Baseline (Current)</span>
                   </div>
                 </div>
               </div>
               <div className="flex-1 w-full relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trajectory.timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val}L`} />
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                        labelStyle={{ color: 'hsl(var(--muted-foreground))', marginBottom: '4px' }}
                        formatter={(val: number) => [`₹${val} Lakhs`, ""]}
                      />
                      <Area type="monotone" dataKey="baseline" stroke="hsl(var(--border))" strokeDasharray="5 5" fillOpacity={0} />
                      <Area type="monotone" dataKey="salary" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorSalary)" />
                    </AreaChart>
                 </ResponsiveContainer>
               </div>
             </motion.div>

             {/* Career Timeline */}
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
                <div className="flex justify-between items-end mb-6 border-b border-border/50 pb-4">
                  <div>
                    <h3 className="font-display font-bold text-lg">Evolution Timeline</h3>
                    <p className="text-xs text-muted-foreground">Projected milestones based on current engine settings.</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs uppercase tracking-widest text-muted-foreground">Future Identity</span>
                    <span className="font-bold text-primary">{trajectory.identity}</span>
                  </div>
                </div>

                <div className="relative pl-6 space-y-8">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border">
                    <motion.div 
                      className="absolute top-0 w-full bg-primary" 
                      initial={{ height: 0 }}
                      animate={{ height: "100%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>

                  {trajectory.milestones.map((m, i) => {
                    // Only show Year 0, 2, 4, 5 to save space
                    if (![0, 2, 4, 5].includes(m.year)) return null;
                    return (
                      <motion.div 
                        key={`${m.year}-${m.role}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="relative"
                      >
                        <div className={`absolute -left-[30px] w-4 h-4 rounded-full border-2 border-background flex items-center justify-center z-10 ${i === 5 ? 'bg-primary scale-125' : 'bg-muted-foreground'}`}>
                           {i === 5 && <div className="w-1.5 h-1.5 bg-background rounded-full animate-ping" />}
                        </div>
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs uppercase font-bold text-primary tracking-widest mb-1 block">Year {m.year}</span>
                            <h4 className="font-display font-semibold text-foreground text-lg">{m.role}</h4>
                          </div>
                          <div className="text-right">
                            <span className="font-display font-bold text-foreground">₹{m.salary.toFixed(1)}L</span>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
             </motion.div>
             
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
