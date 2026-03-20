from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from typing import List, Dict, Any, Optional
from app.models.schemas import CVExtractionResponse
from app.api.dependencies import get_current_user_id, get_cv_orchestrator, get_supabase_repo
from app.services.orchestrator import CVOrchestrator
from app.repositories.supabase_repo import SupabaseRepository
from app.utils.text_processing import extract_text_from_upload

router = APIRouter()

@router.post("/parse", response_model=CVExtractionResponse)
async def extract_cv_skills(
    file: UploadFile = File(...),
    user_id: str = Depends(get_current_user_id),
    orchestrator: CVOrchestrator = Depends(get_cv_orchestrator)
):
    """
    Accepts raw uploaded CV files, extracts text, pipes it through OpenAI for structure, 
    normalizes against Supabase terms, computes competency scores, 
    and persists the records.
    """
    try:
        resume_text = await extract_text_from_upload(file)
        response = await orchestrator.process_cv(user_id=user_id, resume_text=resume_text)
        return response
    except Exception as e:
        detail = str(e)
        if hasattr(e, "response") and hasattr(e.response, "text"):
            detail += f" | {e.response.text}"
        raise HTTPException(status_code=500, detail=detail)

@router.get("/user/skills", response_model=List[Dict[str, Any]])
async def get_my_skills(
    user_id: str = Depends(get_current_user_id),
    repo: SupabaseRepository = Depends(get_supabase_repo)
):
    """
    Returns the enriched view of the logged-in user's extracted skills 
    (from vw_user_skill_profile_enriched).
    """
    try:
        data = repo.get_user_skills(user_id=user_id)
        return data
    except Exception as e:
        detail = str(e)
        if hasattr(e, "response") and hasattr(e.response, "text"):
            detail += f" | {e.response.text}"
        raise HTTPException(status_code=500, detail=detail)

@router.get("/skill-wheel")
async def get_skill_wheel(
    role_id: Optional[str] = None,
    user_id: str = Depends(get_current_user_id),
    repo: SupabaseRepository = Depends(get_supabase_repo)
):
    """
    Returns the JSON representation of the skill clusters for the Radar Chart.
    """
    try:
        data = repo.get_skill_wheel_data(user_id=user_id, role_id=role_id)
        return data
    except Exception as e:
        detail = str(e)
        if hasattr(e, "response") and hasattr(e.response, "text"):
            detail += f" | {e.response.text}"
        raise HTTPException(status_code=500, detail=detail)
