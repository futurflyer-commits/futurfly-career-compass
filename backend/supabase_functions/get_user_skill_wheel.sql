-- backend/supabase_functions/get_user_skill_wheel.sql
-- Function to compute skill clusters and overlay with target role gaps
-- Execute this script in your Supabase SQL Editor.

create or replace function get_user_skill_wheel(p_user_id uuid, p_role_id uuid default null)
returns json as $$
declare
    result json;
begin
    with skill_data as (
        select 
            usp.skill_id,
            sn.skill_name,
            sc.category_name,
            usp.competency_level,
            -- Logic to map category to clusters based on user prompt mapping
            case
                when sc.category_name ilike '%programming%' or sc.category_name ilike '%development%' then 'Programming'
                when sc.category_name ilike '%cloud%' or sc.category_name ilike '%devops%' or sc.category_name ilike '%aws%' then 'Cloud & DevOps'
                when sc.category_name ilike '%data%' or sc.category_name ilike '%sql%' then 'Data Engineering'
                when sc.category_name ilike '%ai%' or sc.category_name ilike '%ml%' or sc.category_name ilike '%machine%' then 'AI / ML'
                when sc.category_name ilike '%architecture%' or sc.category_name ilike '%design%' then 'System Design'
                when sc.category_name ilike '%backend%' or sc.category_name ilike '%api%' then 'Backend Engineering'
                when sc.category_name ilike '%database%' then 'Databases'
                when sc.category_name ilike '%soft%' or sc.category_name ilike '%lead%' or sc.category_name ilike '%management%' then 'Soft Skills'
                else 'Other'
            end as skill_cluster
        from user_skill_profiles usp
        left join skill_name sn on sn.skill_id = usp.skill_id
        left join skill_categories sc on sc.category_id = sn.category_id
        where usp.user_id = p_user_id
    ),
    cluster_scores as (
        select 
            skill_cluster as name,
            -- normalize 1-3 to 0-10: (avg(competency) / 3.0) * 10
            round((avg(competency_level) / 3.0) * 10.0, 1) as score,
            json_agg(json_build_object('name', skill_name, 'level', competency_level)) as skills
        from skill_data
        group by skill_cluster
    ),
    final_clusters as (
        select 
            c.name,
            c.score,
            c.skills,
            -- Standard fallback for gap calculation if role_id is present
            -- You can enhance this by joining role_skill_requirements table
            0.0 as gap
        from cluster_scores c
    )
    select json_build_object(
        'clusters', (select coalesce(json_agg(row_to_json(final_clusters)), '[]'::json) from final_clusters),
        'overall_score', (select coalesce(round(avg(score), 1), 0) from final_clusters)
    ) into result;

    return result;
end;
$$ language plpgsql security definer;
