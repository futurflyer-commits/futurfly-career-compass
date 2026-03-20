import { supabase } from "@/lib/supabase";

export interface RoadmapState {
  hasActiveRoadmap: boolean;
  activeRoleId: string | null;
  roadmapProgressPercent: number;
  roadmapCurrentPhase: string;
}

const STORAGE_KEY = 'futurfly_roadmap_state';

// Try to fetch from DB, gracefully fallback to local storage
export async function getRoadmapState(userId: string): Promise<RoadmapState> {
  // 1. Try DB
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('has_active_roadmap, active_role_id, roadmap_progress_percent, roadmap_current_phase')
      .eq('id', userId)
      .single();

    if (!error && data) {
      // If the column exists, we rely on the DB. Look for the boolean.
      if (data.has_active_roadmap !== undefined) {
        return {
          hasActiveRoadmap: data.has_active_roadmap || false,
          activeRoleId: data.active_role_id || null,
          roadmapProgressPercent: data.roadmap_progress_percent || 0,
          roadmapCurrentPhase: data.roadmap_current_phase || 'Phase 1: Foundation',
        };
      }
    }
  } catch (err) {
    console.warn("DB roadmap columns not found or failed, falling back to LocalStorage.");
  }

  // 2. Fallback to LocalStorage
  const cached = localStorage.getItem(`${STORAGE_KEY}_${userId}`);
  if (cached) {
    return JSON.parse(cached);
  }

  return {
    hasActiveRoadmap: false,
    activeRoleId: null,
    roadmapProgressPercent: 0,
    roadmapCurrentPhase: 'Phase 1: Foundation'
  };
}

export async function saveRoadmapState(userId: string, state: RoadmapState): Promise<void> {
  // 1. Always attempt saving to Remote DB
  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        has_active_roadmap: state.hasActiveRoadmap,
        active_role_id: state.activeRoleId,
        roadmap_progress_percent: state.roadmapProgressPercent,
        roadmap_current_phase: state.roadmapCurrentPhase,
      })
      .eq('id', userId);
      
    if (error) {
      console.warn("Failed updating roadmap columns in DB. Only saving locally.", error);
    }
  } catch (err) {
    console.warn("RPC failed updating roadmap columns. Only saving locally.");
  }

  // 2. Always persist locally as primary sync metric for instant feedback
  localStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(state));
}
