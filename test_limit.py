import os
from supabase import create_client
from dotenv import load_dotenv
import time

load_dotenv()
supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

start_time = time.time()
resp = supabase.table("projects").select("work_id").limit(10000).execute()
print(f"Count: {len(resp.data)}, Time: {time.time() - start_time:.2f}s")
