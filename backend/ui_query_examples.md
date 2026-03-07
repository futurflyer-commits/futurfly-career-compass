# FuturFly UI Integration: Sample Queries

The following queries demonstrate how the frontend should pull the data populated by the CV Backend.

## 1. Fetch Current User's Extracted Skills
```sql
SELECT 
    skill_name,
    competency_level, -- 1=Novice, 2=Intermediate, 3=Expert
    years_experience,
    confidence_score,
    domain_name,
    category_name
FROM vw_user_skill_profile_enriched
WHERE user_id = 'CURRENT_USER_ID_HERE'
ORDER BY competency_level DESC, years_experience DESC;
```

## 2. Fetch Top 5 Role Matches for Current User
```sql
SELECT 
    role_id,
    role_name,
    department,
    match_score_percentage,
    missing_critical_skills_count
FROM vw_user_role_fit
WHERE user_id = 'CURRENT_USER_ID_HERE'
ORDER BY match_score_percentage DESC
LIMIT 5;
```

## 3. Fetch Skill Gaps for a Selected Role
When a user clicks into a "Solutions Architect" role, you query their exact gap:
```sql
SELECT 
    required_skill_name,
    required_competency,
    user_competency,
    gap_difference, -- negative numbers imply a gap
    is_critical
FROM vw_user_role_skill_gap
WHERE user_id = 'CURRENT_USER_ID_HERE' 
  AND role_id = 'SELECTED_ROLE_ID_HERE'
ORDER BY is_critical DESC, gap_difference ASC;
```

## Example Backend API Usage (Frontend JS)
```javascript
const response = await fetch('http://localhost:8000/api/cv/parse', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${supabaseSessionToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ resume_text: 'Experienced Python developer deployed models on AWS...' })
});

const extractionData = await response.json();
console.log(extractionData.candidate_summary.total_experience_years);
```
