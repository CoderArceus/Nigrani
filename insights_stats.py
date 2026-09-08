import pandas as pd
import numpy as np

class InsightsDataStore:
    def __init__(self, supabase_client):
        self.supabase = supabase_client
        self.df = pd.DataFrame()
        self.peer_groups = None
        
    def load_data(self):
        all_data = []
        start = 0
        batch_size = 1000
        
        while True:
            resp = (
                self.supabase.table("projects")
                .select("*")
                .range(start, start + batch_size - 1)
                .execute()
            )
            data = resp.data
            if not data:
                break
            all_data.extend(data)
            if len(data) < batch_size:
                break
            start += batch_size
            
        self.df = pd.DataFrame(all_data)
        
        self.df['sanction_date'] = pd.to_datetime(self.df['sanction_date'], errors='coerce')
        self.df['recommendation_date'] = pd.to_datetime(self.df['recommendation_date'], errors='coerce')
        self.df['completion_date'] = pd.to_datetime(self.df['completion_date'], errors='coerce')
        
        self.df['approval_delay_days'] = (self.df['sanction_date'] - self.df['recommendation_date']).dt.days
        self.df['execution_duration_days'] = (self.df['completion_date'] - self.df['sanction_date']).dt.days
        self.df['utilization_pct'] = np.where(self.df['sanctioned_amount'] > 0, 
                                         (self.df['released_amount'] / self.df['sanctioned_amount']) * 100, 
                                         0)
        
        # Precompute Peer Groups (Category + State)
        self.peer_groups = self.df.groupby(['work_category', 'state'])
        
    def get_national_trend(self):
        df_trend = self.df.copy()
        df_trend['year_quarter'] = df_trend['sanction_date'].dt.to_period('Q').astype(str)
        grouped = df_trend.groupby('year_quarter').agg(
            total_sanctioned=('sanctioned_amount', 'sum'),
            total_released=('released_amount', 'sum'),
            completed_count=('status', lambda x: (x == 'Completed').sum()),
            total_count=('status', 'count')
        ).reset_index()
        grouped['completion_rate'] = (grouped['completed_count'] / grouped['total_count'] * 100).fillna(0)
        
        # Filter out NaT strings
        grouped = grouped[grouped['year_quarter'] != 'NaT'].sort_values('year_quarter')
        # fill nan with 0
        grouped = grouped.fillna(0)
        return grouped.to_dict(orient='records')
        
    def get_projects_requiring_attention(self):
        # High utilization, incomplete, no completion date
        mask = (self.df['utilization_pct'] >= 90) & (self.df['status'] != 'Completed') & (self.df['completion_date'].isna())
        # Documentation gap (high released amount, 0 photos)
        mask2 = (self.df['released_amount'] > 1000000) & (self.df['photo_count'] == 0)
        
        df_attn = self.df[mask | mask2].copy()
        
        results = []
        for _, row in df_attn.iterrows():
            reasons = []
            score_points = 0
            
            if row['utilization_pct'] >= 90 and row['status'] != 'Completed':
                reasons.append("High Fund Release (>=90%), Incomplete Project")
                score_points += 2
            if row['released_amount'] > 1000000 and row['photo_count'] == 0:
                reasons.append("Evidence Gap: High released amount with 0 photos")
                score_points += 2
                
            health_label = "Needs Monitoring"
            if score_points >= 3:
                health_label = "Critical Review"
            elif score_points == 2:
                health_label = "At Risk"
                
            results.append({
                "work_id": row['work_id'],
                "category": row['work_category'],
                "state": row['state'],
                "district": row['district'],
                "utilization": round(row['utilization_pct'], 1),
                "sanctioned_amount": row['sanctioned_amount'],
                "released_amount": row['released_amount'],
                "photo_count": row['photo_count'],
                "status": row['status'],
                "health_score": health_label,
                "reasons": reasons
            })
            
        risk_map = {"Critical Review": 0, "At Risk": 1, "Needs Monitoring": 2}
        results.sort(key=lambda x: risk_map.get(x['health_score'], 3))
        # replace any nan values with None for json serialization
        for r in results:
            for k, v in r.items():
                if not isinstance(v, list) and pd.isna(v):
                    r[k] = None
        return results[:30]
        
    def get_work_categories(self):
        grouped = self.df.groupby('work_category').agg(
            count=('work_id', 'count'),
            avg_funding=('sanctioned_amount', 'mean'),
            completed_count=('status', lambda x: (x == 'Completed').sum()),
            median_duration=('execution_duration_days', 'median'),
            avg_photos=('photo_count', 'mean'),
            zero_photo_count=('photo_count', lambda x: (x == 0).sum())
        ).reset_index()
        
        grouped['completion_rate'] = (grouped['completed_count'] / grouped['count'] * 100).fillna(0)
        grouped['zero_photo_pct'] = (grouped['zero_photo_count'] / grouped['count'] * 100).fillna(0)
        
        # replace any nan with None
        grouped = grouped.fillna(0)
        return grouped.to_dict(orient='records')
        
    def get_demographics(self):
        grouped = self.df.groupby('is_sc_st_area').agg(
            project_count=('work_id', 'count'),
            total_funding=('sanctioned_amount', 'sum'),
            completed_count=('status', lambda x: (x == 'Completed').sum()),
            median_duration=('execution_duration_days', 'median'),
            avg_photos=('photo_count', 'mean')
        ).reset_index()
        
        total_projects = self.df.shape[0]
        total_funding = self.df['sanctioned_amount'].sum()
        
        grouped['project_share'] = (grouped['project_count'] / total_projects * 100).fillna(0)
        grouped['funding_share'] = (grouped['total_funding'] / total_funding * 100).fillna(0)
        grouped['completion_rate'] = (grouped['completed_count'] / grouped['project_count'] * 100).fillna(0)
        
        grouped = grouped.fillna(0)
        return grouped.to_dict(orient='records')
        
    def get_delay_intelligence(self):
        results = []
        for name, group in self.peer_groups:
            if len(group) >= 10:
                results.append({
                    "work_category": name[0],
                    "state": name[1],
                    "sample_size": len(group),
                    "median_approval_delay": group['approval_delay_days'].median(),
                    "median_execution_time": group['execution_duration_days'].median()
                })
        df_res = pd.DataFrame(results).fillna(0)
        return df_res.sort_values('median_execution_time', ascending=False).head(20).to_dict(orient='records')
        
    def get_geographic_performance(self):
        grouped = self.df.groupby('state').agg(
            sample_size=('work_id', 'count'),
            total_sanctioned=('sanctioned_amount', 'sum'),
            total_released=('released_amount', 'sum'),
            avg_utilization=('utilization_pct', 'mean'),
            completed_count=('status', lambda x: (x == 'Completed').sum()),
            median_duration=('execution_duration_days', 'median'),
            avg_photos=('photo_count', 'mean'),
            zero_photo_count=('photo_count', lambda x: (x == 0).sum())
        ).reset_index()
        
        grouped['completion_rate'] = (grouped['completed_count'] / grouped['sample_size'] * 100).fillna(0)
        grouped['zero_photo_pct'] = (grouped['zero_photo_count'] / grouped['sample_size'] * 100).fillna(0)
        
        grouped = grouped[grouped['sample_size'] >= 10].fillna(0)
        return grouped.to_dict(orient='records')
        
    def get_mp_portfolios(self):
        grouped = self.df.groupby('mp_name').agg(
            project_count=('work_id', 'count'),
            total_sanctioned=('sanctioned_amount', 'sum'),
            total_released=('released_amount', 'sum'),
            completed_count=('status', lambda x: (x == 'Completed').sum()),
            median_approval_delay=('approval_delay_days', 'median'),
            median_duration=('execution_duration_days', 'median'),
            zero_photo_count=('photo_count', lambda x: (x == 0).sum())
        ).reset_index()
        
        grouped['completion_rate'] = (grouped['completed_count'] / grouped['project_count'] * 100).fillna(0)
        grouped['zero_photo_pct'] = (grouped['zero_photo_count'] / grouped['project_count'] * 100).fillna(0)
        
        grouped = grouped.fillna(0)
        return grouped.sort_values('project_count', ascending=False).head(50).to_dict(orient='records')
    def get_statistical_outliers(self):
        results = []
        for name, group in self.peer_groups:
            if len(group) >= 8:
                # Funding outliers
                Q1_f = group['sanctioned_amount'].quantile(0.25)
                Q3_f = group['sanctioned_amount'].quantile(0.75)
                IQR_f = Q3_f - Q1_f
                med_f = group['sanctioned_amount'].median()
                upper_f = Q3_f + 1.5 * IQR_f
                
                # Duration outliers
                Q1_d = group['execution_duration_days'].quantile(0.25)
                Q3_d = group['execution_duration_days'].quantile(0.75)
                IQR_d = Q3_d - Q1_d
                med_d = group['execution_duration_days'].median()
                upper_d = Q3_d + 1.5 * IQR_d
                
                for _, row in group.iterrows():
                    reasons = []
                    if row['sanctioned_amount'] > upper_f and upper_f > 0:
                        reasons.append(f"Sanctioned amount (₹{row['sanctioned_amount']}) is unusually high for similar projects in this category and state (Median: ₹{med_f})")
                    if row['execution_duration_days'] > upper_d and upper_d > 0:
                        reasons.append(f"Execution duration ({row['execution_duration_days']} days) is unusually high for similar projects in this category and state (Median: {med_d} days)")
                        
                    if reasons:
                        results.append({
                            "work_id": row['work_id'],
                            "category": name[0],
                            "state": name[1],
                            "reasons": reasons
                        })
                        
        return results[:30]
