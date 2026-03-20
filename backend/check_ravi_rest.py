import os
import httpx
from dotenv import load_dotenv

load_dotenv('../.env')

url = os.getenv('VITE_SUPABASE_URL')
key = os.getenv('VITE_SUPABASE_SERVICE_ROLE_KEY')

if not url or not key:
    print("Supabase credentials not found.")
    exit(1)

headers = {
    "apikey": key,
    "Authorization": f"Bearer {key}",
    "Content-Type": "application/json"
}

try:
    auth_res = httpx.get(f"{url}/auth/v1/admin/users", headers=headers)
    users = auth_res.json().get('users', [])
    ravi = next((u for u in users if 'ravi105' in str(u.get('email', ''))), None)

    if not ravi:
        print("User containing 'ravi' not found!")
    else:
        print(f"User: {ravi.get('email')} | ID: {ravi.get('id')}")
        user_id = ravi.get('id')
        
        runs = httpx.get(f"{url}/rest/v1/cv_parse_runs?user_id=eq.{user_id}", headers=headers).json()
        print(f"Parse Runs: {len(runs)}")
        
        skills = httpx.get(f"{url}/rest/v1/user_skill_profiles?user_id=eq.{user_id}", headers=headers).json()
        print(f"Skill Profiles count: {len(skills)}")
        
except Exception as e:
    print("Error:", e)
