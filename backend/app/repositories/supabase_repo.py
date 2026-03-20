import os
import httpx
from app.models.schemas import ExtractedMatchedSkill, ExtractedUnmatchedSkill
from typing import List, Dict, Any, Optional
import uuid

class SupabaseRepository:
    def __init__(self):
        self.url = os.environ.get("VITE_SUPABASE_URL")
        self.key = os.environ.get("VITE_SUPABASE_SERVICE_ROLE_KEY")
        self.anon_key = os.environ.get("VITE_SUPABASE_ANON_KEY")
        
        if not self.url or not self.key or not self.anon_key:
            raise ValueError("VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, and VITE_SUPABASE_SERVICE_ROLE_KEY must be set in the root .env")
        
        self.headers = {
            "apikey": self.key,
            "Authorization": f"Bearer {self.key}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        }

    def _get_api_url(self, table_name: str) -> str:
        return f"{self.url}/rest/v1/{table_name}"

    def get_skill_normalization_dictionary(self) -> List[Dict[str, Any]]:
        """Fetch the current skill synonyms and ontology view to normalize against."""
        response = httpx.get(self._get_api_url("vw_skill_normalization_dictionary"), headers=self.headers)
        response.raise_for_status()
        return response.json()

    def create_parse_run(self, user_id: str, current_title: str, total_experience: int) -> str:
        """Create a header record for the CV parse event."""
        run_id = str(uuid.uuid4())
        data = {
            "parse_run_id": run_id,
            "user_id": user_id,
            "candidate_current_title": current_title,
            "total_experience_years": total_experience,
            "parse_status": "completed"
        }
        res = httpx.post(self._get_api_url("cv_parse_runs"), json=data, headers=self.headers)
        if res.status_code >= 400:
            print("Create Parse Run Error:", res.text)
        res.raise_for_status()
        return run_id

    def persist_matched_skills(self, user_id: str, skills: List[ExtractedMatchedSkill], parse_run_id: str):
        """Upsert matched skills into profiles, and append to history."""
        if not skills:
            return

        profile_records = []
        history_records = []
        
        for sk in skills:
            if not sk.skill_id:
                continue
                
            evidence_str = " | ".join(sk.evidence)
            
            profile_records.append({
                "user_id": user_id,
                "skill_id": sk.skill_id,
                "competency_level": sk.competency_level,
                "estimated_years": sk.estimated_years or 0,
                "evidence": evidence_str,
                "confidence_score": sk.confidence_score,
                "source": "cv_parse",
                "parse_run_id": parse_run_id
            })
            
            history_records.append({
                "user_id": user_id,
                "skill_id": sk.skill_id,
                "parse_run_id": parse_run_id,
                "competency_level": sk.competency_level,
                "confidence_score": sk.confidence_score,
                "estimated_years": sk.estimated_years or 0,
                "evidence": evidence_str
            })

        if history_records:
            h_res = httpx.post(self._get_api_url("user_skill_profile_history"), json=history_records, headers=self.headers)
            if h_res.status_code >= 400:
                print("History Insert Error:", h_res.text)
            h_res.raise_for_status()

        if profile_records:
            # For upsert, PostgREST requires the "Prefer: resolution=merge-duplicates" header
            upsert_headers = self.headers.copy()
            upsert_headers["Prefer"] = "resolution=merge-duplicates,return=representation"
            
            p_res = httpx.post(
                self._get_api_url("user_skill_profiles"), 
                json=profile_records, 
                headers=upsert_headers
            )
            if p_res.status_code >= 400:
                print("Profile Upsert Error:", p_res.text)
            p_res.raise_for_status()

    def persist_unmatched_skills(self, user_id: str, skills: List[ExtractedUnmatchedSkill], parse_run_id: str):
        """Insert completely unmatched raw text into unmatched logging table for later admin review."""
        if not skills:
            return
            
        records = []
        for sk in skills:
            evidence_str = " | ".join(sk.evidence) if isinstance(sk.evidence, list) else str(sk.evidence)
            records.append({
                "user_id": user_id,
                "raw_skill": sk.raw_skill,
                "evidence": evidence_str,
                "parse_run_id": parse_run_id,
                "confidence_score": sk.confidence_score if hasattr(sk, 'confidence_score') else 0,
                "review_status": "pending_review"
            })

        u_res = httpx.post(self._get_api_url("unmatched_user_skills"), json=records, headers=self.headers)
        if u_res.status_code >= 400:
            print("Unmatched Skills Insert Error:", u_res.text)
        u_res.raise_for_status()

    def get_user_skills(self, user_id: str) -> List[Dict[str, Any]]:
        """Fetch the enriched view for frontend consumption."""
        params = {
            "user_id": f"eq.{user_id}",
            "select": "*,skills(name,category)"
        }
        response = httpx.get(
            self._get_api_url("user_skill_profiles"), 
            headers=self.headers,
            params=params
        )
        response.raise_for_status()
        return response.json()

    def get_skill_wheel_data(self, user_id: str, role_id: Optional[str] = None) -> Dict[str, Any]:
        """Fetch skill wheel data via Supabase RPC get_user_skill_wheel."""
        payload = {"p_user_id": user_id}
        if role_id:
            payload["p_role_id"] = role_id
            
        response = httpx.post(
            f"{self.url}/rest/v1/rpc/get_user_skill_wheel",
            json=payload,
            headers=self.headers
        )
        response.raise_for_status()
        return response.json()

