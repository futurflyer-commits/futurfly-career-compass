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

with open("schema.txt", "w") as f:
    response = httpx.get(f"{url}/rest/v1/", headers=headers)
    if response.status_code == 200:
        schema = response.json()
        f.write(f"Tables: {list(schema['definitions'].keys())}\n\n")
        
        for table_name in ["skills", "skill_name", "skill_categories", "profiles", "roles", "user_skill_profiles"]:
            if table_name in schema["definitions"]:
                f.write(f"{table_name}:\n")
                for k, v in schema["definitions"][table_name].get("properties", {}).items():
                    f.write(f"  - {k} ({v.get('type')})\n")
            else:
                f.write(f"{table_name} not found\n")
    else:
        f.write(response.text)
