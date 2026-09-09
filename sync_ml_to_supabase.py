import os
import pandas as pd
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

def sync_data():
    csv_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "mplads_risk_report_v2.csv")
    if not os.path.exists(csv_path):
        print(f"Error: {csv_path} not found. Run the ML pipeline first.")
        return

    print(f"Reading {csv_path}...")
    df = pd.read_csv(csv_path)
    
    # We will upsert into 'anomaly_results'
    # The frontend expects: work_id, risk_level, risk_priority, ensemble_score, network_risk_flag, top_flag_reasons, flagged_by_model
    records_to_insert = []
    
    for _, row in df.iterrows():
        score = float(row['ensemble_score'])
        
        # Derive risk_level and risk_priority based on score if not present
        if score > 0.8:
            risk_level = "Critical"
            risk_priority = 1
        elif score > 0.6:
            risk_level = "High"
            risk_priority = 2
        else:
            risk_level = "Medium"
            risk_priority = 3
            
        record = {
            "work_id": row['work_id'],
            "ensemble_score": score,
            "network_risk_flag": bool(row['network_risk_flag']),
            "top_flag_reasons": str(row['top_flag_reasons']) if pd.notna(row['top_flag_reasons']) else None,
            "flagged_by_model": bool(row['flagged_by_model']),
            "risk_level": risk_level,
            "risk_priority": risk_priority
        }
        records_to_insert.append(record)
    
    print(f"Preparing to upsert {len(records_to_insert)} records into Supabase 'anomaly_results' table...")
    
    # Supabase allows bulk inserts
    try:
        # First, clear out all old anomaly results because upsert doesn't delete stale flagged rows
        # We can do this by deleting where flagged_by_model is not null (which is all of them)
        supabase.table("anomaly_results").delete().neq("work_id", "0").execute()
        
        # Now insert the new ones
        result = supabase.table("anomaly_results").upsert(records_to_insert, on_conflict="work_id").execute()
        print(f"Successfully synced {len(result.data)} records to Supabase!")
    except Exception as e:
        print(f"Failed to sync to Supabase: {e}")

if __name__ == "__main__":
    sync_data()
