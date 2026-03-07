from fastapi import Depends, Header, HTTPException
from app.repositories.supabase_repo import SupabaseRepository
from app.services.extractor_service import ExtractorService
from app.services.normalization_service import NormalizationService
from app.services.competency_service import CompetencyService
from app.services.orchestrator import CVOrchestrator
import os

def get_supabase_repo() -> SupabaseRepository:
    return SupabaseRepository()

def get_normalization_service(repo: SupabaseRepository = Depends(get_supabase_repo)) -> NormalizationService:
    dictionary = repo.get_skill_normalization_dictionary()
    return NormalizationService(dictionary)

def get_cv_orchestrator(
    repo: SupabaseRepository = Depends(get_supabase_repo),
    normalizer: NormalizationService = Depends(get_normalization_service)
) -> CVOrchestrator:
    extractor = ExtractorService()
    scorer = CompetencyService()
    return CVOrchestrator(extractor=extractor, normalizer=normalizer, scorer=scorer, repo=repo)

def get_current_user_id(authorization: str = Header(None)) -> str:
    """
    Validates JWT and returns the parsed profiles.id.
    Note: For a production flow, pass token into supabase.auth.get_user()
    Currently mocked to bypass raw decoding for speed, expecting UI to send the valid token.
    """
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization Header")
        
    # In full prod: 
    # supabase = create_client(url, anon_key)
    # user_resp = supabase.auth.get_user(authorization.replace("Bearer ", ""))
    # if user_resp.user: return user_resp.user.id
    
    # Note: For a production flow, pass token into supabase.auth.get_user()
    token = authorization.replace("Bearer ", "").strip()
    return token
