import os
import httpx
from dotenv import load_dotenv

load_dotenv()
url = os.environ.get("VITE_SUPABASE_URL")
key = os.environ.get("VITE_SUPABASE_SERVICE_ROLE_KEY")

headers = {
    "apikey": key,
    "Authorization": f"Bearer {key}",
}

print("Checking cv_parse_runs...")
r1 = httpx.get(f"{url}/rest/v1/cv_parse_runs?select=*", headers=headers)
runs = r1.json()
print("Total runs:", len(runs))
if runs:
    print("Latest run:", runs[-1])

print("\nChecking user_skill_profiles...")
r2 = httpx.get(f"{url}/rest/v1/user_skill_profiles?select=*", headers=headers)
profiles = r2.json()
print("Total skills in profile:", len(profiles))
if profiles:
    print("Sample skill:", profiles[0])

print("\nChecking user_skill_profile_history...")
r3 = httpx.get(f"{url}/rest/v1/user_skill_profile_history?select=*", headers=headers)
print("Total history records:", len(r3.json()))

print("\nChecking unmatched_user_skills...")
r4 = httpx.get(f"{url}/rest/v1/unmatched_user_skills?select=*", headers=headers)
print("Total unmatched skills:", len(r4.json()))
