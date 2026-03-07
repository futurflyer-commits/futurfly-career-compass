from pydantic import BaseModel, Field
from typing import List, Optional, Literal

# ----------------------------------------------------------------------------
# Backend Output / Final Extraction Schemas
# ----------------------------------------------------------------------------

class CandidateSummary(BaseModel):
    current_title: Optional[str] = Field(default=None, description="The most recent or prominent job title")
    total_experience_years: int = Field(default=0, description="Total computed years of professional experience")

class ExtractedMatchedSkill(BaseModel):
    skill_name: str = Field(description="The canonical skill name from ontology")
    skill_id: str = Field(description="The UUID of the canonical skill")
    skill_type: Optional[str] = Field(default=None, description="e.g., hard_skill, soft_skill")
    domain_name: Optional[str] = Field(default=None, description="The domain the skill belongs to")
    category_name: Optional[str] = Field(default=None, description="The category the skill belongs to")
    competency: Literal["Expert", "Intermediate", "Novice"] = Field(description="String label for competency")
    competency_level: int = Field(ge=1, le=3, description="Numeric competency 1-3")
    evidence: List[str] = Field(default_factory=list, description="Raw text snippets highlighting how this skill was used")
    estimated_years: Optional[float] = Field(default=0.0, description="AI estimated years utilizing this skill")
    confidence_score: float = Field(default=0.0, description="Confidence of extraction 0.0 - 1.0")

class ExtractedUnmatchedSkill(BaseModel):
    raw_skill: str = Field(description="The raw skill string as extracted from CV that couldn't be normalized")
    evidence: str = Field(default="", description="Snippet where it was mentioned")

class CVExtractionResponse(BaseModel):
    candidate_summary: CandidateSummary
    matched_skills: List[ExtractedMatchedSkill]
    unmatched_skills: List[ExtractedUnmatchedSkill]

# ----------------------------------------------------------------------------
# OpenAI Intermediate Extraction Schemas (Structured JSON definition)
# ----------------------------------------------------------------------------
# We force OpenAI to return a strict taxonomy before we bounce against the Supabase DB
class OAIRawSkill(BaseModel):
    skill_name: str = Field(description="The exact skill technology or competency name")
    experience_years: float = Field(default=0.0, description="Years of experience interacting with this skill")
    evidence_snippet: str = Field(description="Direct quote or re-phrased strong evidence of skill usage")

class OAIExtractionResult(BaseModel):
    current_title: str
    total_experience_years: int
    raw_skills: List[OAIRawSkill]

class ParseRequestPayload(BaseModel):
    resume_text: str = Field(..., description="The raw unformatted text extracted from the CV")
