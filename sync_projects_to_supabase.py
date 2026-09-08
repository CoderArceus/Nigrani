import os
import pandas as pd
import numpy as np
from dotenv import load_dotenv
from supabase import create_client

# Load environment variables
load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

if not url or not key:
    raise ValueError("SUPABASE_URL or SUPABASE_KEY is missing from .env")

# Connect to Supabase
supabase = create_client(url, key)

def sync_projects():
    csv_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "mplads_synthetic_dataset.csv")
    if not os.path.exists(csv_path):
        print(f"Error: {csv_path} not found.")
        return

    print(f"Reading {csv_path}...")
    df = pd.read_csv(csv_path)
    
    # Supabase doesn't like NaN for nullable strings, convert to None
    df = df.replace({np.nan: None})
    
    # Drop ML ground-truth columns as they aren't in the projects schema
    if 'is_anomaly' in df.columns:
        df = df.drop(columns=['is_anomaly', 'anomaly_type'])
        
    # We don't extract the int anymore, we use the DB's auto-increment IDs.
    
    # 1. Fetch existing agencies and vendors
    print("Fetching existing agencies and vendors...")
    db_agencies = supabase.table("implementing_agencies").select("agency_id, agency_name").execute().data
    db_vendors = supabase.table("vendors").select("vendor_id, vendor_name").execute().data
    
    agency_map = {row['agency_name']: row['agency_id'] for row in db_agencies}
    vendor_map = {row['vendor_name']: row['vendor_id'] for row in db_vendors}
    
    # 2. Insert missing agencies
    missing_agencies = set(df['implementing_agency']) - set(agency_map.keys())
    if missing_agencies:
        print(f"Inserting {len(missing_agencies)} new agencies...")
        new_agencies = [{"agency_name": name} for name in missing_agencies]
        res = supabase.table("implementing_agencies").insert(new_agencies).execute()
        for row in res.data:
            agency_map[row['agency_name']] = row['agency_id']
            
    # 3. Insert missing vendors
    missing_vendors = set(df['vendor']) - set(vendor_map.keys())
    if missing_vendors:
        print(f"Inserting {len(missing_vendors)} new vendors...")
        new_vendors = [{"vendor_name": name} for name in missing_vendors]
        res = supabase.table("vendors").insert(new_vendors).execute()
        for row in res.data:
            vendor_map[row['vendor_name']] = row['vendor_id']
            
    # 4. Map the strings to the DB IDs
    df['agency_id'] = df['implementing_agency'].map(agency_map)
    df['vendor_id'] = df['vendor'].map(vendor_map)
    
    # Drop the original string columns
    df = df.drop(columns=['implementing_agency', 'vendor'])
    
    records = df.to_dict(orient='records')
    
    print(f"Preparing to upsert {len(records)} records into Supabase 'projects' table...")
    
    # Supabase max rows per request is 1000, we should chunk it just in case
    chunk_size = 500
    for i in range(0, len(records), chunk_size):
        chunk = records[i:i+chunk_size]
        print(f"Upserting chunk {i} to {i+len(chunk)}...")
        try:
            result = supabase.table("projects").upsert(chunk, on_conflict="work_id").execute()
        except Exception as e:
            print(f"Failed on chunk {i}: {e}")

    print("Successfully synchronized all projects to Supabase.")

if __name__ == "__main__":
    sync_projects()
