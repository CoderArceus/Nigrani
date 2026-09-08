import os
from dotenv import load_dotenv
from supabase import create_client

# Load values from .env
load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

if not url or not key:
    raise ValueError("SUPABASE_URL or SUPABASE_KEY is missing from .env")

# Connect to Supabase
supabase = create_client(url, key)

# Test the connection
result = (
    supabase
    .table("projects")
    .select("work_id", count="exact")
    .limit(1)
    .execute()
)

print("Connected successfully!")
print("Projects in Supabase:", result.count)