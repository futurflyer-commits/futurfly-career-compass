import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv('../.env')

url = os.getenv('VITE_SUPABASE_URL')
key = os.getenv('VITE_SUPABASE_SERVICE_ROLE_KEY')
if not url or not key:
    print("Supabase credentials not found.")
    exit(1)

client = create_client(url, key)

users = client.auth.admin.list_users()
ravi = next((u for u in users if 'ravi101' in u.email), None)

if not ravi:
    print("User ravi101 not found!")
else:
    print(f"User: {ravi.email} | ID: {ravi.id}")
    
    runs = client.table('cv_parse_runs').select('*').eq('user_id', ravi.id).execute()
    print(f"Parse Runs: {len(runs.data)}")
    for r in runs.data:
        print(f"  - Run Status: {r.get('parse_status')}")
        
    skills = client.table('user_skill_profiles').select('*').eq('user_id', ravi.id).execute()
    print(f"Skill Profiles count: {len(skills.data)}")
    
    enriched = client.table('vw_user_skill_profile_enriched').select('*').eq('user_id', ravi.id).execute()
    print(f"Enriched View count: {len(enriched.data)}")
