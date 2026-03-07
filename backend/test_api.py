import httpx

url = "http://localhost:8000/api/cv/parse"
headers = {"Authorization": "Bearer 00000000-0000-0000-0000-000000000000"}
files = {"file": ("requirements.txt", open("requirements.txt", "rb"), "text/plain")}

response = httpx.post(url, headers=headers, files=files, timeout=60.0)
print("Status:", response.status_code)
print("Body:", response.text)
