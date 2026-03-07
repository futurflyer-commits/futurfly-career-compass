from app.services.extractor_service import ExtractorService
from app.services.normalization_service import NormalizationService
from app.services.competency_service import CompetencyService
from app.repositories.supabase_repo import SupabaseRepository
from app.models.schemas import CVExtractionResponse, CandidateSummary, ExtractedUnmatchedSkill

class CVOrchestrator:
    def __init__(self, extractor: ExtractorService, normalizer: NormalizationService, 
                 scorer: CompetencyService, repo: SupabaseRepository):
        self.extractor = extractor
        self.normalizer = normalizer
        self.scorer = scorer
        self.repo = repo
        
    async def process_cv(self, user_id: str, resume_text: str) -> CVExtractionResponse:
        """
        Orchestrates the entire end-to-end pipeline:
        1. Extract Raw JSON from Text
        2. Normalize against Supabase Dictionary View
        3. Score individual matched skills for Competency
        4. Persist to tables
        """
        
        # 1. GPT Extraction
        extraction_res = await self.extractor.extract_skills_from_text(resume_text)
        
        # 2. Extract into a standard Dict list before normalization
        raw_skills_dict_list = []
        for s in extraction_res.raw_skills:
            raw_skills_dict_list.append({
                "skill_name": s.skill_name,
                "experience_years": s.experience_years,
                "evidence_snippet": s.evidence_snippet
            })
            
        # 3. Normalize
        normalized_matched, raw_unmatched = self.normalizer.normalize_skills(raw_skills_dict_list)
        
        # 4. Score Competency for Matched items
        final_matched_skill_objects = await self.scorer.enrich_matched_skills(
            normalized_matched, 
            extraction_res.total_experience_years
        )
        
        # Format Unmatched items
        final_unmatched_skill_objects = [
             ExtractedUnmatchedSkill(raw_skill=u["raw_skill"], evidence=u["evidence"]) 
             for u in raw_unmatched
        ]
        
        # 5. Build Header Response
        summary = CandidateSummary(
            current_title=extraction_res.current_title,
            total_experience_years=extraction_res.total_experience_years
        )
        
        response = CVExtractionResponse(
            candidate_summary=summary,
            matched_skills=final_matched_skill_objects,
            unmatched_skills=final_unmatched_skill_objects
        )
        
        # 6. Persist results
        # Create parse run header
        parse_run_id = self.repo.create_parse_run(
            user_id=user_id, 
            current_title=summary.current_title, 
            total_experience=summary.total_experience_years
        )
        
        # Upsert Matches & Log Histories
        self.repo.persist_matched_skills(
            user_id=user_id, 
            skills=final_matched_skill_objects, 
            parse_run_id=parse_run_id
        )
        
        # Insert Unmatched
        self.repo.persist_unmatched_skills(
            user_id=user_id, 
            skills=final_unmatched_skill_objects, 
            parse_run_id=parse_run_id
        )
        
        return response
