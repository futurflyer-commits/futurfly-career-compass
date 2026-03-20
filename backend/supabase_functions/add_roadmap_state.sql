-- backend/supabase_functions/add_roadmap_state.sql

-- Purpose: Add fields to track if a user has completed the discovery wizard
--          and what their active structured roadmap state is.

-- 1. Add columns to public.profiles safely
DO $$
BEGIN
    -- Track if the user has finalized their discovery phase
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='has_active_roadmap') THEN
        ALTER TABLE public.profiles ADD COLUMN has_active_roadmap BOOLEAN DEFAULT FALSE;
    END IF;

    -- Store the ID of the core role they selected (e.g. "AI Solutions Architect")
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='active_role_id') THEN
        ALTER TABLE public.profiles ADD COLUMN active_role_id UUID REFERENCES public.roles(id) ON DELETE SET NULL;
    END IF;

    -- Store the string representation or JSON payload of their current phase status
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='roadmap_progress_percent') THEN
        ALTER TABLE public.profiles ADD COLUMN roadmap_progress_percent INT DEFAULT 0;
    END IF;

    -- Store the highest achieved phase name
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='roadmap_current_phase') THEN
        ALTER TABLE public.profiles ADD COLUMN roadmap_current_phase VARCHAR DEFAULT 'Phase 1: Foundation';
    END IF;
END $$;
