@echo off
setlocal enabledelayedexpansion

REM Read env
for /f "tokens=1,2 delims==" %%A in (.env) do (
    if "%%A"=="VITE_SUPABASE_URL" set URL=%%~B
    if "%%A"=="VITE_SUPABASE_SERVICE_ROLE_KEY" set KEY=%%~B
)

echo URL: %URL%
echo Target ID: 62ae02c5-7e57-4488-b4d7-d6f283a42394

echo Fetching profiles
curl -s "%URL%/rest/v1/profiles?id=eq.62ae02c5-7e57-4488-b4d7-d6f283a42394" -H "apikey: %KEY%" -H "Authorization: Bearer %KEY%"
echo.

echo Fetching parsed_cvs
curl -s "%URL%/rest/v1/parsed_cvs?user_id=eq.62ae02c5-7e57-4488-b4d7-d6f283a42394" -H "apikey: %KEY%" -H "Authorization: Bearer %KEY%"
echo.

echo Fetching vw_user_skill_profile_enriched
curl -s "%URL%/rest/v1/vw_user_skill_profile_enriched?user_id=eq.62ae02c5-7e57-4488-b4d7-d6f283a42394" -H "apikey: %KEY%" -H "Authorization: Bearer %KEY%"
echo.

echo Fetching user_skills
curl -s "%URL%/rest/v1/user_skills?user_id=eq.62ae02c5-7e57-4488-b4d7-d6f283a42394" -H "apikey: %KEY%" -H "Authorization: Bearer %KEY%"
echo.
