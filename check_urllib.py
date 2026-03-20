import sys
import urllib.request
import json

env_path = '.env'
url = None
key = None

with open(env_path, 'r', encoding='utf-8') as f:
    for line in f:
        line = line.strip()
        if not line or line.startswith('#'): continue
        if '=' in line:
            k, v = line.split('=', 1)
            v = v.strip('"\' ')
            if k == 'VITE_SUPABASE_URL':
                url = v
            elif k == 'VITE_SUPABASE_SERVICE_ROLE_KEY':
                key = v

if not url or not key:
    print("Missing credentials")
    sys.exit(1)

target = "62ae02c5-7e57-4488-b4d7-d6f283a42394"
tables = ["user_skill_profiles", "vw_user_skill_profile_enriched"]

with open("raw.json", "w", encoding="utf-8") as out:
    for table in tables:
        req_url = f"{url}/rest/v1/{table}?user_id=eq.{target}"
        req = urllib.request.Request(req_url, headers={
            "apikey": key,
            "Authorization": f"Bearer {key}"
        })
        
        try:
            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read().decode())
                out.write(f"--- {table} ---\n")
                out.write(json.dumps(data, indent=2) + "\n\n")
        except urllib.error.HTTPError as e:
            out.write(f"--- ERROR {table} ---\n")
            out.write(f"{e.code} {e.reason}\n")
            out.write(e.read().decode() + "\n\n")
