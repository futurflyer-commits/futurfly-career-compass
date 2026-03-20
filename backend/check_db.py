import os
from dotenv import load_dotenv
from supabase import create_client

# Load from backend dir assuming execution from there
load_dotenv('../.env')

url = os.getenv('VITE_SUPABASE_URL')
key = os.getenv('VITE_SUPABASE_SERVICE_ROLE_KEY')
client = create_client(url, key)

users = client.auth.admin.list_users()
manish = next((u for u in users if u.email == 'manish1@gmail.com'), None)

print(f"User: manish1@gmail.com")
if not manish:
    print("User not found in Auth!")
else:
    print(f"ID: {manish.id}")
    
    runs = client.table('cv_parse_runs').select('*').eq('user_id', manish.id).execute()
    print(f"Parse Runs: {len(runs.data)}")
    for r in runs.data:
        print(f"  - Run Status: {r.get('parse_status')}")
        
    skills = client.table('user_skill_profiles').select('*').eq('user_id', manish.id).execute()
    print(f"Skill Profiles count: {len(skills.data)}")
    
    enriched = client.table('vw_user_skill_profile_enriched').select('*').eq('user_id', manish.id).execute()
    print(f"Enriched View count: {len(enriched.data)}")
