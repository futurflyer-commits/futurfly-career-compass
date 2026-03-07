export type PersonaKey = "EB" | "SC" | "PA";

export type PersonaScores = {
  EB: number; // Emerging Builder
  SC: number; // Strategic Climber
  PA: number; // Purpose Architect
};

export type AssessmentResult = {
  persona: string;
  persona_score: PersonaScores;
  hybrid: boolean;
  recommendation: string;
};

// Option index mappings for each question
// Format: [{ EB, SC, PA }, { EB, SC, PA }, ...]
export const SCORING_MATRIX: PersonaScores[][] = [
  // Q1 – What excites you most about technology?
  [
    { EB: 1, SC: 2, PA: 1 }, // Building products used by millions
    { EB: 1, SC: 2, PA: 0 }, // Solving complex algorithms
    { EB: 0, SC: 2, PA: 1 }, // Leading teams toward a vision
    { EB: 0, SC: 2, PA: 0 }, // Analyzing data and insights
  ],
  // Q2 – Preferred work style
  [
    { EB: 1, SC: 1, PA: 0 }, // Deep focus
    { EB: 1, SC: 1, PA: 2 }, // Collaborative brainstorming
    { EB: 0, SC: 2, PA: 1 }, // Strategic planning
    { EB: 2, SC: 1, PA: 0 }, // Rapid experimentation
  ],
  // Q3 – How do you handle ambiguity?
  [
    { EB: 0, SC: 2, PA: 0 }, // Research and analyze first
    { EB: 2, SC: 1, PA: 0 }, // Experiment and learn
    { EB: 1, SC: 1, PA: 1 }, // Consult experts
    { EB: 1, SC: 1, PA: 2 }, // Trust instincts
  ],
  // Q4 – How do you approach solving complex problems?
  [
    { EB: 1, SC: 2, PA: 0 }, // AI-assisted problem solving (Mapped to options array in Assessment.tsx)
    { EB: 0, SC: 0, PA: 2 }, // Human-centered design
    { EB: 0, SC: 2, PA: 0 }, // Data-driven strategy
    { EB: 1, SC: 2, PA: 0 }, // Technical craftsmanship
  ],
  // Q5 – Career risk appetite
  [
    { EB: 0, SC: 2, PA: 0 }, // Conservative
    { EB: 1, SC: 2, PA: 0 }, // Moderate
    { EB: 1, SC: 1, PA: 0 }, // Aggressive
    { EB: 2, SC: 1, PA: 1 }, // Entrepreneurial
  ],
  // Q6 – Time horizon for career change
  [
    { EB: 2, SC: 0, PA: 0 }, // 3–6 months
    { EB: 1, SC: 2, PA: 0 }, // 1–2 years
    { EB: 0, SC: 2, PA: 1 }, // 3–5 years
    // Option 4 (Long-term)
    { EB: 0, SC: 0, PA: 2 },
  ]
];

const MAIN_PERSONAS: Record<PersonaKey, string> = {
  EB: "Emerging Builder",
  SC: "Strategic Climber",
  PA: "Purpose Architect",
};

export const calculatePersona = (answers: Record<number, number>): AssessmentResult => {
  const scores: PersonaScores = { EB: 0, SC: 0, PA: 0 };

  // Calculate total scores
  Object.entries(answers).forEach(([questionId, optionIndex]) => {
    // questionId from Assessment.tsx starts at 1, so index is questionId - 1
    const qIndex = parseInt(questionId) - 1;
    const optionScores = SCORING_MATRIX[qIndex]?.[optionIndex];
    
    if (optionScores) {
      scores.EB += optionScores.EB;
      scores.SC += optionScores.SC;
      scores.PA += optionScores.PA;
    }
  });

  const { EB, SC, PA } = scores;
  const maxScore = Math.max(EB, SC, PA);

  // Determine top personas
  const topPersonas: { key: PersonaKey; score: number }[] = [];
  if (EB === maxScore) topPersonas.push({ key: "EB", score: EB });
  if (SC === maxScore) topPersonas.push({ key: "SC", score: SC });
  if (PA === maxScore) topPersonas.push({ key: "PA", score: PA });

  // Get personas within 2 points of max
  const closePersonas = (["EB", "SC", "PA"] as PersonaKey[]).filter(
    (key) => maxScore - scores[key] <= 2
  );

  let finalPersona = "";
  let isHybrid = false;

  // Rule 2: If two personas are within 2 points difference -> assign a hybrid persona
  // Rule 3: If all scores are close -> default to persona with highest score (we just take the first top one if there's a 3-way tie)
  if (closePersonas.length === 2) {
    isHybrid = true;
    if (closePersonas.includes("EB") && closePersonas.includes("SC")) {
      finalPersona = "Growth Explorer";
    } else if (closePersonas.includes("SC") && closePersonas.includes("PA")) {
      finalPersona = "Strategic Visionary";
    } else if (closePersonas.includes("EB") && closePersonas.includes("PA")) {
      finalPersona = "Purpose Explorer";
    }
  } else if (closePersonas.length === 3) {
    // 3-way tie or close: default to highest score
    // If strict tie, just take first
    finalPersona = MAIN_PERSONAS[topPersonas[0].key];
    isHybrid = false;
  } else {
    // Rule 1: One persona has highest score clearly
    finalPersona = MAIN_PERSONAS[topPersonas[0].key];
  }

  return {
    persona: finalPersona,
    persona_score: scores,
    hybrid: isHybrid,
    recommendation: "Take detailed assessment",
  };
};
