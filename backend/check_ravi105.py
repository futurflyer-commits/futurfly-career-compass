import os
from dotenv import load_dotenv

# Try to load env both from backend and project root
load_dotenv('.env')
if not os.getenv('VITE_SUPABASE_URL'):
    load_dotenv('../.env')

from supabase import create_client

url = os.getenv('VITE_SUPABASE_URL')
key = os.getenv('VITE_SUPABASE_SERVICE_ROLE_KEY')
if not url or not key:
    print("Supabase credentials not found.")
    exit(1)

client = create_client(url, key)
target_user = 'ravi105'

users_resp = client.auth.admin.list_users()
ravi = next((u for u in users_resp if target_user.lower() in (u.email or "").lower() or target_user in (u.user_metadata.get('full_name') or "")), None)

if not ravi:
    print(f"User '{target_user}' not found!")
else:
    print(f"User: {ravi.email} | ID: {ravi.id}")
    
    runs = client.table('cv_parse_runs').select('*').eq('user_id', ravi.id).execute()
    print(f"\nParse Runs: {len(runs.data)}")
    for r in runs.data:
        print(f"  - Run Status: {r.get('parse_status')}")
        
    skills = client.table('user_skill_profiles').select('*').eq('user_id', ravi.id).execute()
    print(f"\nSkill Profiles count (user_skill_profiles table): {len(skills.data)}")
    for s in skills.data:
        print(f"  - Skill ID: {s.get('skill_id')} | Level: {s.get('expertise_level', 'N/A')}")
    
    enriched = client.table('vw_user_skill_profile_enriched').select('*').eq('user_id', ravi.id).execute()
    print(f"\nEnriched View count (vw_user_skill_profile_enriched): {len(enriched.data)}")
    for e in enriched.data:
        print(f"  - Skill Name: {e.get('skill_name')} | Demand: {e.get('market_demand')} | Level: {e.get('expertise_level')}")
        
    discovery = client.table('profiles').select('discovery_persona').eq('id', ravi.id).execute()
    print(f"\nDiscovery Persona data exists: {bool(discovery.data and discovery.data[0].get('discovery_persona'))}")
