import pandas as pd
import numpy as np
import datetime
from main import supabase

# Fetch all projects
resp = supabase.table("projects").select("*").execute()
df = pd.DataFrame(resp.data)

print(f"Loaded {len(df)} projects")

# Data cleaning
df['sanction_date'] = pd.to_datetime(df['sanction_date'], errors='coerce')
df['recommendation_date'] = pd.to_datetime(df['recommendation_date'], errors='coerce')
df['completion_date'] = pd.to_datetime(df['completion_date'], errors='coerce')

# Derived columns
df['approval_delay_days'] = (df['sanction_date'] - df['recommendation_date']).dt.days
df['execution_duration_days'] = (df['completion_date'] - df['sanction_date']).dt.days
df['utilization_pct'] = np.where(df['sanctioned_amount'] > 0, 
                                 (df['released_amount'] / df['sanctioned_amount']) * 100, 
                                 0)

# Precompute Peer Groups (Category + State)
peer_groups = df.groupby(['work_category', 'state'])

for name, group in peer_groups:
    if len(group) >= 8:
        # compute medians
        median_duration = group['execution_duration_days'].median()
        # compute IQR bounds
        Q1 = group['execution_duration_days'].quantile(0.25)
        Q3 = group['execution_duration_days'].quantile(0.75)
        IQR = Q3 - Q1
        upper_bound = Q3 + 1.5 * IQR
        # print(f"Group {name} - Median Duration: {median_duration}, Upper Bound: {upper_bound}")

print("Precomputation logic successful.")
