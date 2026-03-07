import os
import json
from openai import AsyncOpenAI
from typing import List, Dict, Any
from app.prompts.openai_prompts import COMPETENCY_CLASSIFICATION_PROMPT
from app.models.schemas import ExtractedMatchedSkill
from pydantic import BaseModel

class CompetencyChoice(BaseModel):
    competency: str
    justification: str

class CompetencyService:
    def __init__(self):
        self.client = AsyncOpenAI()

    async def determine_competency(
        self, 
        skill_name: str, 
        evidence_list: List[str], 
        estimated_years: float, 
        total_career_years: int
    ) -> tuple[str, int]:
        """
        Calls OpenAI to look at the isolated skill snippet and classify it 
        into Novice (1), Intermediate (2), or Expert (3).
        """
        evidence_block = "\n".join(evidence_list)
        
        user_prompt = f"""
        Skill: {skill_name}
        Total Career Experience: {total_career_years}
        Estimated Skill Experience: {estimated_years}
        Evidence Snippet(s) from Resume explicitly citing {skill_name}:
        \"\"\"{evidence_block}\"\"\"
        
        Analyze this and return the classified competency and justification. 
        """
        
        try:
            response = await self.client.beta.chat.completions.parse(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": COMPETENCY_CLASSIFICATION_PROMPT},
                    {"role": "user", "content": user_prompt}
                ],
                response_format=CompetencyChoice,
                seed=42 # keep it relatively deterministic
            )
            
            c_label = response.choices[0].message.parsed.competency.capitalize()
            
            # Strict clamping
            if c_label == "Expert":
                return "Expert", 3
            elif c_label == "Intermediate":
                return "Intermediate", 2
            else:
                return "Novice", 1
                
        except Exception as e:
            print(f"LLM Classification failed for {skill_name}. Defaulting to Novice. Error: {e}")
            return "Novice", 1
            
    async def enrich_matched_skills(self, normalized_skills: List[Dict[str, Any]], total_career_years: int) -> List[ExtractedMatchedSkill]:
        """
        Takes the grouped output from normalization_service and transforms them into 
        final ExtractedMatchedSkill objects by calculating their competency.
        """
        enriched_list = []
        
        for sk in normalized_skills:
            comp_label, comp_level = await self.determine_competency(
                skill_name=sk["skill_name"],
                evidence_list=sk["evidence_list"],
                estimated_years=sk["estimated_years"],
                total_career_years=total_career_years
            )
            
            # Provide high pseudo-confidence by default if exact match passed
            final_obj = ExtractedMatchedSkill(
                skill_name=sk["skill_name"],
                skill_id=sk["skill_id"],
                competency=comp_label,
                competency_level=comp_level,
                evidence=sk["evidence_list"],
                estimated_years=sk["estimated_years"],
                confidence_score=0.95
            )
            enriched_list.append(final_obj)
            
        return enriched_list
