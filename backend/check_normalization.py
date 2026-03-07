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

print("Fetching Normalization Dictionary...")
r_dict = httpx.get(f"{url}/rest/v1/vw_skill_normalization_dictionary?select=*", headers=headers)
dictionary = r_dict.json()
print(f"Total entries in dictionary: {len(dictionary)}")
if dictionary:
    print("Sample dictionary entries:")
    for d in dictionary[:3]:
        print(f"  - {d}")

print("\nFetching Unmatched Skills from latest run...")
r_unmatched = httpx.get(f"{url}/rest/v1/unmatched_user_skills?select=*", headers=headers)
unmatched = r_unmatched.json()
print(f"Total unmatched skills: {len(unmatched)}")
if unmatched:
    print("Sample unmatched skills:")
    for u in unmatched[:5]:
        print(f"  - {u['raw_skill']}")
