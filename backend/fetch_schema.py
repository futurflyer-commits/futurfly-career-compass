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

response = httpx.get(f"{url}/rest/v1/", headers=headers)
print(response.status_code)
if response.status_code == 200:
    schema = response.json()
    print("cv_parse_runs:", schema["definitions"]["cv_parse_runs"]["properties"].keys())
    print("user_skill_profiles:", schema["definitions"].get("user_skill_profiles", {}).get("properties", {}).keys())
    print("user_skill_profile_history:", schema["definitions"].get("user_skill_profile_history", {}).get("properties", {}).keys())
    print("unmatched_user_skills:", schema["definitions"].get("unmatched_user_skills", {}).get("properties", {}).keys())
else:
    print(response.text)
