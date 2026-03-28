import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PlayCircle, RefreshCw, Trophy, Target, 
  Lightbulb, ArrowRight, ShieldCheck, Zap, 
  BookOpen, Clock, Lock, CheckCircle2,
  BrainCircuit, Database
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// --- Types ---
interface SkillGap {
  name: string;
  current: number;
  required: number;
}

interface CourseItem {
  id: string;
  title: string;
  provider: string;
  duration: string;
  type: string;
}

interface PhaseData {
  id: string;
  title: string;
  time: string;
  status: "completed" | "current" | "locked";
  progress: number;
  whyItMatters: string;
  expectedOutcomes: string[];
  skillsToMaster: SkillGap[];
  courses: CourseItem[];
  certifications: string[];
  practicalOutcomes: string[];
  aiSuggestions: string[];
}

interface RoleRoadmap {
  title: string;
  timeToGoal: string;
  overallProgress: number;
  nextBestAction: {
    title: string;
    type: string;
    timeEstimate: string;
    description: string;
  };
  phases: PhaseData[];
}

// --- Mock Datasets ---
const ALTERNATE_COURSES: CourseItem[] = [
  { id: "alt-1", title: "Grokking Modern System Design", provider: "Educative", duration: "10 hrs", type: "Interactive" },
  { id: "alt-2", title: "Complete Python Bootcamp", provider: "Udemy", duration: "22 hrs", type: "Video" },
  { id: "alt-3", title: "DeepLearning.AI TensorFlow", provider: "Coursera", duration: "30 hrs", type: "Guided" },
  { id: "alt-4", title: "Advanced SQL for Data Engineers", provider: "DataCamp", duration: "14 hrs", type: "Interactive" }
];

const DEFAULT_ROADMAP: RoleRoadmap = {
  title: "AI Solutions Architect",
  timeToGoal: "12-18 Months",
  overallProgress: 24,
  nextBestAction: {
    title: "Complete Python Data Structures Module",
    type: "Priority Action",
    timeEstimate: "2 Hrs remaining",
    description: "You're 80% through this module. Finishing it now unlocks the ML Algorithms phase."
  },
  phases: [
    {
      id: "phase-1",
      title: "Foundation: Advanced Software Eng & Data",
      time: "0-3 Months",
      status: "current",
      progress: 60,
      whyItMatters: "Before architecting AI systems, you need a rock-solid understanding of how data flows and how scalable, distributed backends process information.",
      expectedOutcomes: [
        "Mastery of Python data manipulation",
        "Understanding distributed computing paradigms",
        "Ability to schema design for both SQL and NoSQL"
      ],
      skillsToMaster: [
        { name: "Python", current: 80, required: 100 },
        { name: "SQL Data Modeling", current: 50, required: 80 },
        { name: "System Design", current: 40, required: 90 }
      ],
      courses: [
        { id: "c1", title: "Advanced Python Algorithms", provider: "Coursera", duration: "12 hours", type: "Video" },
        { id: "c2", title: "Distributed Systems Design", provider: "Educative", duration: "8 hours", type: "Interactive" },
        { id: "c3", title: "Data Modeling with PostgreSQL", provider: "Udacity", duration: "15 hours", type: "Project" }
      ],
      certifications: ["AWS Certified Developer (Optional)"],
      practicalOutcomes: ["Build a highly concurrent Go/Python API handling 1k req/s"],
      aiSuggestions: [
        "Focus heavily on the 'Message Queues' section in the Distributed Systems course. Your previous assessment showed weakness here."
      ]
    },
    {
      id: "phase-2",
      title: "Core Logic: Machine Learning & NLP",
      time: "3-8 Months",
      status: "locked",
      progress: 0,
      whyItMatters: "The analytical core. Understanding underlying ML math guarantees you don't treat modern LLMs as mysterious black boxes.",
      expectedOutcomes: [
        "Train baseline predictive models",
        "Perform tokenization & embeddings",
        "Deploy models to REST endpoints"
      ],
      skillsToMaster: [
        { name: "Scikit-Learn / PyTorch", current: 10, required: 80 },
        { name: "Applied Statistics", current: 30, required: 70 },
        { name: "NLP Pipelines", current: 0, required: 85 }
      ],
      courses: [
        { id: "c4", title: "Machine Learning Specialization", provider: "Stanford", duration: "40 hours", type: "Video Suite" },
        { id: "c5", title: "HuggingFace NLP Course", provider: "HuggingFace", duration: "15 hours", type: "Interactive Docs" }
      ],
      certifications: ["TensorFlow Developer Certificate"],
      practicalOutcomes: ["Deploy a sentiment analysis microservice using FastAPI & Docker"],
      aiSuggestions: [
        "Don't get bogged down in manual backpropagation math; focus on intuition and applying libraries."
      ]
    },
    {
      id: "phase-3",
      title: "Expertise: GenAI Architecture",
      time: "8-15 Months",
      status: "locked",
      progress: 0,
      whyItMatters: "This is the frontier. Mastering RAG and LLMOps transforms you from a traditional developer into an AI Architect.",
      expectedOutcomes: [
        "Design production RAG systems",
        "Finetune open-source models",
        "Implement guardrails and low-latency inference"
      ],
      skillsToMaster: [
        { name: "LLM Orchestration (LangChain)", current: 0, required: 90 },
        { name: "Vector Databases", current: 5, required: 85 },
        { name: "LLMOps & Prompt Eng", current: 20, required: 95 }
      ],
      courses: [
        { id: "c6", title: "Building LLM Applications", provider: "DeepLearning.AI", duration: "6 hours", type: "Guided Lab" },
        { id: "c7", title: "Pinecone Vector DB Masterclass", provider: "Pinecone", duration: "4 hours", type: "Official Docs" }
      ],
      certifications: ["None specific yet - portfolio driven"],
      practicalOutcomes: ["Build an internal company wiki chatbot over enterprise PDF datasets"],
      aiSuggestions: [
        "Start playing with local models using Ollama to understand inference costs."
      ]
    }
  ]
};

const Roadmap = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [roadmap, setRoadmap] = useState<RoleRoadmap>(DEFAULT_ROADMAP);

  // We keep track of courses individually in state to allow replacements to persist locally
  const [phaseCourses, setPhaseCourses] = useState<Record<string, CourseItem[]>>({});

  useEffect(() => {
    // 1. Initialize local course state from roadmap definition
    const initialCourses: Record<string, CourseItem[]> = {};
    DEFAULT_ROADMAP.phases.forEach(p => {
      initialCourses[p.id] = [...p.courses];
    });
    setPhaseCourses(initialCourses);

    // 2. Fetch User's Active Role (Mock logic to conditionally load roadmap)
    const fetchRoadmapData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        const { data } = await supabase.from("profiles").select("active_role_id").eq("id", user.id).single();
        if (data?.active_role_id && data.active_role_id !== "role-1") {
          // If they selected something else, we would normally fetch that JSON from DB.
          // For now, we mutate the default mockup title to match testing.
          let titleId = data.active_role_id;
          let newTitle = titleId.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
          if (titleId === "role-2") newTitle = "GenAI Product Lead";
          
          setRoadmap(prev => ({
            ...prev,
            title: newTitle
          }));
        }
      } catch (err) {
        console.error("Roadmap fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmapData();
  }, [user]);

  const handleCourseReplace = (phaseId: string, courseId: string) => {
    // Simulate AI/Algorithm fetching a better course match
    const newCourse = ALTERNATE_COURSES[Math.floor(Math.random() * ALTERNATE_COURSES.length)];
    
    setPhaseCourses(prev => {
      const currentList = prev[phaseId] || [];
      const updatedList = currentList.map(c => 
        c.id === courseId ? { ...newCourse, id: `replaced-${Date.now()}` } : c
      );
      return { ...prev, [phaseId]: updatedList };
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
         <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
         <p className="text-muted-foreground font-display tracking-widest uppercase text-sm">Compiling Execution Path...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      
      {/* Header & Hero Area */}
      <div className="bg-muted/10 border-b border-border/50 pt-8 pb-12 shadow-inner">
        <div className="container">
           <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-[10px] tracking-widest uppercase text-primary border-primary/30 bg-primary/5">
                   Dynamic Execution Engine
                </Badge>
                <span className="text-xs text-muted-foreground">• Target: {roadmap.title}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-bold">
                Your Career <span className="text-gradient">Blueprint</span>
              </h1>
           </motion.div>

           <div className="grid lg:grid-cols-3 gap-6">
              {/* Next Best Action Card (2 columns) */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 glass-card p-6 border-primary/20 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-10 -mt-10 rounded-full transition-transform group-hover:scale-150" />
                 
                 <div className="flex justify-between items-start mb-4 relative z-10">
                   <div className="flex items-center gap-2">
                     <Zap className="w-5 h-5 text-primary animate-pulse" />
                     <h3 className="text-sm font-bold text-primary uppercase tracking-widest">Next Best Action</h3>
                   </div>
                   <Badge variant="secondary" className="bg-background/80 text-[10px]">{roadmap.nextBestAction.timeEstimate}</Badge>
                 </div>
                 
                 <div className="relative z-10">
                   <h2 className="text-2xl font-display font-bold mb-2">{roadmap.nextBestAction.title}</h2>
                   <p className="text-sm text-foreground/80 max-w-xl leading-relaxed mb-6">
                     {roadmap.nextBestAction.description}
                   </p>
                   
                   <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-[0_0_15px_rgba(var(--primary),0.3)] gap-2">
                     <PlayCircle className="w-5 h-5" /> Execute Task
                   </Button>
                 </div>
              </motion.div>

              {/* Progress Summary Card */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 flex flex-col justify-center">
                 <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
                   <Target className="w-4 h-4" /> Global Trajectory
                 </h3>
                 
                 <div className="flex justify-between items-end mb-2">
                   <span className="text-4xl font-display font-bold text-foreground">{roadmap.overallProgress}%</span>
                   <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Time to Goal: <strong className="text-primary">{roadmap.timeToGoal}</strong></span>
                 </div>
                 
                 <Progress value={roadmap.overallProgress} className="h-2.5 bg-border/50" />
                 
                 <div className="mt-6 p-3 rounded-lg bg-background/50 border border-border text-xs flex items-start gap-3">
                   <BrainCircuit className="w-4 h-4 text-aqua shrink-0 mt-0.5" />
                   <p className="text-muted-foreground">AI pacing suggests you are <strong className="text-aqua">on schedule</strong>. Increase weekly hours by 2 to accelerate by 1 month.</p>
                 </div>
              </motion.div>
           </div>
        </div>
      </div>

      {/* Accordion Roadmap Phases */}
      <div className="container py-12">
        <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" /> Roadmap Phases
        </h3>

        <Accordion type="single" collapsible defaultValue="phase-1" className="space-y-4">
          {roadmap.phases.map((phase, i) => (
             <AccordionItem key={phase.id} value={phase.id} className="glass-card border border-border/50 rounded-xl overflow-hidden px-2 data-[state=open]:border-primary/30 transition-colors">
               
               <AccordionTrigger className="hover:no-underline py-5 px-4 group">
                 <div className="flex flex-col md:flex-row md:items-center w-full gap-4 text-left">
                    <div className="flex items-center gap-4 min-w-[200px]">
                      {phase.status === 'completed' ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                      ) : phase.status === 'locked' ? (
                        <Lock className="w-6 h-6 text-muted-foreground shrink-0" />
                      ) : (
                        <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                           <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                           <div className="w-3 h-3 bg-primary rounded-full relative z-10" />
                        </div>
                      )}
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Phase 0{i+1} • {phase.time}</p>
                        <h4 className={`text-lg font-display font-bold transition-colors ${phase.status === 'current' ? 'text-primary' : 'text-foreground'}`}>{phase.title}</h4>
                      </div>
                    </div>
                    
                    <div className="flex-1 hidden md:block px-8">
                       {phase.status !== 'locked' && (
                         <div className="flex items-center gap-3">
                           <Progress value={phase.progress} className={`h-1.5 w-full max-w-[200px] ${phase.status === 'completed' ? 'bg-green-500/20' : 'bg-primary/20'}`} />
                           <span className="text-[10px] font-bold text-muted-foreground">{phase.progress}%</span>
                         </div>
                       )}
                    </div>
                 </div>
               </AccordionTrigger>

               <AccordionContent className="px-4 pb-6 pt-2">
                  <div className="border-t border-border/50 pt-6 grid xl:grid-cols-12 gap-8">
                     
                     {/* Left Column: Context & Skills Map */}
                     <div className="xl:col-span-4 flex flex-col gap-6">
                        <div>
                          <h5 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5"><Lightbulb className="w-3.5 h-3.5" /> Why this matters</h5>
                          <p className="text-sm text-foreground/80 leading-relaxed border-l-2 border-primary/40 pl-3">
                            {phase.whyItMatters}
                          </p>
                        </div>
                        
                        <div>
                          <h5 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5"><Target className="w-3.5 h-3.5" /> Expected Outcomes</h5>
                          <ul className="space-y-2">
                             {phase.expectedOutcomes.map((out, idx) => (
                               <li key={idx} className="text-sm flex gap-2 text-foreground/90">
                                 <span className="text-primary mt-0.5">•</span> {out}
                               </li>
                             ))}
                          </ul>
                        </div>

                        <div className="bg-background/40 p-4 rounded-xl border border-border/50">
                           <h5 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-1.5"><Database className="w-3.5 h-3.5" /> Skill Gap Target</h5>
                           <div className="space-y-4">
                             {phase.skillsToMaster.map(skill => (
                               <div key={skill.name}>
                                 <div className="flex justify-between text-xs mb-1.5">
                                   <span className="font-semibold">{skill.name}</span>
                                   <span className="text-muted-foreground"><span className={skill.current < skill.required ? "text-amber-500 font-bold" : "text-primary"}>{skill.current}</span> / {skill.required}</span>
                                 </div>
                                 <div className="w-full h-1.5 bg-border/50 rounded-full relative overflow-hidden">
                                    <div className="absolute top-0 bottom-0 left-0 bg-muted-foreground/30" style={{ width: `${skill.required}%` }} />
                                    <div className={`absolute top-0 bottom-0 left-0 rounded-full ${skill.current >= skill.required ? 'bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`} style={{ width: `${skill.current}%` }} />
                                 </div>
                               </div>
                             ))}
                           </div>
                        </div>
                     </div>

                     {/* Center Column: Course Execution */}
                     <div className="xl:col-span-5 flex flex-col gap-4">
                        <h5 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-1 flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Learning Path Nodes</h5>
                        
                        <AnimatePresence>
                          {(phaseCourses[phase.id] || []).map((course, idx) => (
                             <motion.div 
                               key={course.id}
                               initial={{ opacity: 0, y: 10 }}
                               animate={{ opacity: 1, y: 0 }}
                               transition={{ delay: idx * 0.1 }}
                               className="glass-card-hover p-4 border border-border/60 hover:border-primary/40 rounded-xl group relative overflow-hidden"
                             >
                                <div className="absolute top-0 left-0 w-1 h-full bg-border group-hover:bg-primary transition-colors" />
                                <div className="flex justify-between items-start gap-4 ml-2">
                                  <div>
                                    <h4 className="font-display font-bold text-[15px] text-foreground mb-1 pr-6">{course.title}</h4>
                                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                                      <span className="font-semibold text-foreground/70">{course.provider}</span> • 
                                      <Clock className="w-3 h-3" /> {course.duration} • 
                                      {course.type}
                                    </p>
                                  </div>
                                  <div className="flex flex-col gap-2 shrink-0">
                                     <Button size="sm" className="h-7 text-xs font-bold w-20 bg-foreground text-background hover:bg-foreground/80">
                                       Launch
                                     </Button>
                                     <Button 
                                       size="sm" 
                                       variant="outline" 
                                       className="h-7 text-[10px] w-20 text-muted-foreground hover:text-primary hover:border-primary/50"
                                       onClick={() => handleCourseReplace(phase.id, course.id)}
                                     >
                                       <RefreshCw className="w-3 h-3 mr-1" /> Replace
                                     </Button>
                                  </div>
                                </div>
                             </motion.div>
                          ))}
                        </AnimatePresence>
                     </div>

                     {/* Right Column: AI & Validations */}
                     <div className="xl:col-span-3 flex flex-col gap-6">
                        
                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                           <h5 className="text-[11px] font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-1.5"><BrainCircuit className="w-3.5 h-3.5" /> AI Copilot Note</h5>
                           <p className="text-xs text-foreground/80 leading-relaxed italic">
                             "{phase.aiSuggestions[0]}"
                           </p>
                        </div>

                        <div>
                           <h5 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5"><Trophy className="w-3.5 h-3.5" /> Certification</h5>
                           <div className="space-y-2">
                             {phase.certifications.map((cert, idx) => (
                               <div key={idx} className="flex items-start gap-2 text-xs text-foreground/90 p-2 rounded-md bg-muted/30 border border-border/50">
                                 <ShieldCheck className="w-4 h-4 text-aqua shrink-0" />
                                 {cert}
                               </div>
                             ))}
                           </div>
                        </div>
                        
                        <div>
                           <h5 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> Practical Output</h5>
                           <div className="p-3 rounded-lg border border-border border-dashed bg-background/30 text-xs text-foreground/80">
                             {phase.practicalOutcomes[0]}
                           </div>
                        </div>

                     </div>

                  </div>
               </AccordionContent>

             </AccordionItem>
          ))}
        </Accordion>

      </div>

    </div>
  );
};

export default Roadmap;
