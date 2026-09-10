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
        if self.df.empty:
            return []
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
        if self.df.empty:
            return []
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
        if self.df.empty:
            return []
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
        if self.df.empty:
            return []
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
        
    def get_mp_summary(self):
        if self.df.empty:
            return {'mps': []}
        mps = sorted([mp for mp in self.df['mp_name'].unique() if pd.notna(mp)])
        return {'mps': mps}
        
    def get_year_summary(self):
        if self.df.empty:
            return {'years': []}
        years = sorted([int(y) for y in self.df['sanction_date'].dt.year.unique() if pd.notna(y)], reverse=True)
        return {'years': years}
        
    def get_delay_intelligence(self):
        if self.df.empty:
            return []
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

    # ═══════════════════════════════════════════════════════════════════
    #  NEW ENDPOINTS for revamped Insights page (6 sections)
    # ═══════════════════════════════════════════════════════════════════

    def _load_anomaly_results(self):
        """Load anomaly_results table for ensemble_score / flag reason data."""
        try:
            all_data = []
            start = 0
            batch_size = 1000
            while True:
                resp = (
                    self.supabase.table("anomaly_results")
                    .select("work_id, ensemble_score, top_flag_reasons, risk_level, flagged_by_model")
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
            self.anomaly_df = pd.DataFrame(all_data)
        except Exception:
            self.anomaly_df = pd.DataFrame()

    def _ensure_anomaly_data(self):
        if not hasattr(self, 'anomaly_df') or self.anomaly_df.empty:
            self._load_anomaly_results()

    # ── Section 1: Fund Utilization & Pace ──────────────────────────

    def get_utilization_by_mp(self):
        """Utilization rate ranked by MP, worst-first."""
        if self.df.empty:
            return []
        grouped = self.df.groupby('mp_name').agg(
            constituency=('constituency', 'first'),
            total_sanctioned=('sanctioned_amount', 'sum'),
            total_released=('released_amount', 'sum')
        ).reset_index()
        grouped['utilization_pct'] = np.where(
            grouped['total_sanctioned'] > 0,
            (grouped['total_released'] / grouped['total_sanctioned'] * 100),
            0
        )
        grouped = grouped.sort_values('utilization_pct', ascending=True).head(10)
        grouped = grouped.fillna(0)
        return grouped[['mp_name', 'constituency', 'utilization_pct']].to_dict(orient='records')

    def get_time_to_release_histogram(self):
        """Median recommendation-to-sanction days by state (worst first)."""
        if self.df.empty:
            return []
        df_tmp = self.df.dropna(subset=['recommendation_date', 'sanction_date']).copy()
        df_tmp['time_to_release'] = (df_tmp['sanction_date'] - df_tmp['recommendation_date']).dt.days
        df_tmp = df_tmp[df_tmp['time_to_release'] >= 0]
        
        # Calculate median by state
        grouped = df_tmp.groupby('state').agg(
            median_days=('time_to_release', 'median'),
            count=('time_to_release', 'count')
        ).reset_index()
        
        # Filter out states with very few projects to avoid noise
        grouped = grouped[grouped['count'] > 10]
        
        # Sort by worst (longest median delay) first, take top 10
        grouped = grouped.sort_values('median_days', ascending=False).head(10)
        
        return grouped[['state', 'median_days']].to_dict(orient='records')

    def get_sanction_completion_bubble(self):
        """Bubble chart: sanction-to-completion lag vs sanctioned_amount, by status."""
        if self.df.empty:
            return []
        df_tmp = self.df.dropna(subset=['sanction_date', 'completion_date']).copy()
        df_tmp = df_tmp[df_tmp['status'] == 'Completed']
        df_tmp['days_lag'] = (df_tmp['completion_date'] - df_tmp['sanction_date']).dt.days
        df_tmp = df_tmp[df_tmp['days_lag'] >= 0]
        # Sample for performance (max 200 points)
        if len(df_tmp) > 200:
            df_tmp = df_tmp.sample(200, random_state=42)
        result = df_tmp[['days_lag', 'sanctioned_amount', 'work_category']].copy()
        result = result.fillna({'work_category': 'Unknown'})
        return result.to_dict(orient='records')

    # ── Section 2: Geographic Equity ────────────────────────────────

    def get_sanctioned_by_state(self):
        """Total sanctioned amount by state for choropleth."""
        if self.df.empty:
            return []
        grouped = self.df.groupby('state').agg(
            total_sanctioned=('sanctioned_amount', 'sum')
        ).reset_index()
        grouped = grouped.fillna(0)
        return grouped.to_dict(orient='records')

    def get_sc_st_comparison(self):
        """SC/ST vs Non-SC/ST: project_count, avg_sanctioned, completion_rate."""
        if self.df.empty:
            return []
        grouped = self.df.groupby('is_sc_st_area').agg(
            project_count=('work_id', 'count'),
            avg_sanctioned=('sanctioned_amount', 'mean'),
            completed_count=('status', lambda x: (x == 'Completed').sum())
        ).reset_index()
        grouped['completion_rate'] = (grouped['completed_count'] / grouped['project_count'] * 100).fillna(0)
        grouped['avg_sanctioned_lakh'] = (grouped['avg_sanctioned'] / 100000).round(1)
        grouped['label'] = grouped['is_sc_st_area'].map({True: 'SC/ST', False: 'Non-SC/ST'})
        grouped = grouped.fillna(0)
        return grouped[['label', 'project_count', 'avg_sanctioned_lakh', 'completion_rate']].to_dict(orient='records')

    def get_category_mix_by_state(self):
        """Heatmap: state x work_category counts for top states and categories."""
        if self.df.empty:
            return {'categories': [], 'data': []}
        # Top 8 states and top 6 categories
        top_states = self.df['state'].value_counts().head(8).index.tolist()
        top_cats = self.df['work_category'].value_counts().head(6).index.tolist()
        df_tmp = self.df[self.df['state'].isin(top_states) & self.df['work_category'].isin(top_cats)]
        grouped = df_tmp.groupby(['state', 'work_category']).size().reset_index(name='count')
        # Create a complete grid
        result = []
        for state in top_states:
            row = {'state': state}
            for cat in top_cats:
                val = grouped[(grouped['state'] == state) & (grouped['work_category'] == cat)]
                row[cat] = int(val['count'].values[0]) if len(val) > 0 else 0
            result.append(row)
        return {'categories': top_cats, 'data': result}

    # ── Section 3: MP-Level Accountability ──────────────────────────

    def get_mp_leaderboard(self):
        """Per-MP: utilization, completion, high ensemble_score count, house, constituency."""
        if self.df.empty:
            return []
        self._ensure_anomaly_data()

        grouped = self.df.groupby('mp_name').agg(
            constituency=('constituency', 'first'),
            house=('house', 'first'),
            total_sanctioned=('sanctioned_amount', 'sum'),
            total_released=('released_amount', 'sum'),
            project_count=('work_id', 'count'),
            completed_count=('status', lambda x: (x == 'Completed').sum())
        ).reset_index()

        grouped['utilization_pct'] = np.where(
            grouped['total_sanctioned'] > 0,
            (grouped['total_released'] / grouped['total_sanctioned'] * 100).round(1),
            0
        )
        grouped['completion_rate'] = (grouped['completed_count'] / grouped['project_count'] * 100).round(1).fillna(0)

        # Count high ensemble_score projects per MP
        if not self.anomaly_df.empty:
            high_score = self.anomaly_df[self.anomaly_df['ensemble_score'] > 0.7]
            # Join with projects to get mp_name
            merged = high_score.merge(self.df[['work_id', 'mp_name']], on='work_id', how='left')
            high_counts = merged.groupby('mp_name').size().reset_index(name='high_score_projects')
            grouped = grouped.merge(high_counts, on='mp_name', how='left')
        else:
            grouped['high_score_projects'] = 0

        grouped = grouped.fillna(0)
        grouped['high_score_projects'] = grouped['high_score_projects'].astype(int)
        grouped = grouped.sort_values('utilization_pct', ascending=True).head(20)
        return grouped[['mp_name', 'constituency', 'house', 'utilization_pct', 'completion_rate', 'high_score_projects']].to_dict(orient='records')

    def get_house_comparison(self):
        """Lok Sabha vs Rajya Sabha comparison."""
        if self.df.empty:
            return []
        grouped = self.df.groupby('house').agg(
            mp_count=('mp_name', 'nunique'),
            total_sanctioned=('sanctioned_amount', 'sum'),
            total_released=('released_amount', 'sum'),
            project_count=('work_id', 'count'),
            completed_count=('status', lambda x: (x == 'Completed').sum())
        ).reset_index()

        grouped['avg_utilization'] = np.where(
            grouped['total_sanctioned'] > 0,
            (grouped['total_released'] / grouped['total_sanctioned'] * 100).round(1),
            0
        )
        grouped['completion_rate'] = (grouped['completed_count'] / grouped['project_count'] * 100).round(1).fillna(0)
        grouped['avg_project_count'] = (grouped['project_count'] / grouped['mp_count']).round(0).astype(int)
        grouped = grouped.fillna(0)
        return grouped[['house', 'avg_utilization', 'completion_rate', 'avg_project_count']].to_dict(orient='records')

    # ── Section 4: Amount vs Documentation ──────────────────────────

    def get_amount_vs_photos(self):
        """Scatter: sanctioned_amount vs photo_count, colored by status."""
        if self.df.empty:
            return []
        df_tmp = self.df[['sanctioned_amount', 'photo_count', 'status']].copy()
        # Sample for performance
        if len(df_tmp) > 300:
            df_tmp = df_tmp.sample(300, random_state=42)
        df_tmp = df_tmp.fillna(0)
        return df_tmp.to_dict(orient='records')

    def get_repeated_descriptions(self):
        """Find near-duplicate/boilerplate work descriptions using simple text grouping."""
        if self.df.empty:
            return []
        df_tmp = self.df[['work_description']].dropna().copy()
        # Simple approach: normalize and count exact/near matches
        df_tmp['normalized'] = df_tmp['work_description'].str.strip().str.lower()
        # Group by first 60 chars (catches templated descriptions)
        df_tmp['template'] = df_tmp['normalized'].str[:60]
        counts = df_tmp.groupby('template').size().reset_index(name='count')
        counts = counts[counts['count'] >= 3].sort_values('count', ascending=False).head(10)
        # Get a readable version of each description
        result = []
        for _, row in counts.iterrows():
            sample = df_tmp[df_tmp['template'] == row['template']].iloc[0]['work_description']
            # Truncate for display
            display = sample[:60].strip()
            if len(sample) > 60:
                display += '...'
            result.append({
                'description': display,
                'count': int(row['count'])
            })
        return result

    # ── Section 5: Status Pipeline ──────────────────────────────────

    def get_project_pipeline(self):
        """Funnel: counts by status stage."""
        status_order = ['Recommended', 'Sanctioned', 'In Progress', 'Completed']
        # For a funnel: each stage includes all projects that reached that stage
        total = len(self.df)
        recommended = total  # All projects were recommended
        sanctioned = len(self.df[self.df['sanction_date'].notna()])
        released = len(self.df[self.df['released_amount'] > 0])
        in_progress = len(self.df[self.df['status'].isin(['In Progress', 'Completed'])])
        completed = len(self.df[self.df['status'] == 'Completed'])

        return [
            {'stage': 'Recommended', 'count': int(recommended)},
            {'stage': 'Sanctioned', 'count': int(sanctioned)},
            {'stage': 'Released', 'count': int(released)},
            {'stage': 'In Progress', 'count': int(in_progress)},
            {'stage': 'Completed', 'count': int(completed)}
        ]

    def get_stalled_projects(self):
        """In Progress sorted by days-since-sanction, flags projects gone quiet."""
        today = pd.Timestamp.now()
        df_tmp = self.df[
            (self.df['status'] == 'In Progress') & 
            (self.df['sanction_date'].notna())
        ].copy()
        df_tmp['days_since_sanction'] = (today - df_tmp['sanction_date']).dt.days
        df_tmp = df_tmp.sort_values('days_since_sanction', ascending=False).head(20)
        result = df_tmp[['work_id', 'state', 'days_since_sanction', 'sanctioned_amount']].copy()
        result = result.fillna(0)
        result['days_since_sanction'] = result['days_since_sanction'].astype(int)
        # Format sanctioned amount for display
        result['sanctioned_display'] = result['sanctioned_amount'].apply(
            lambda x: f"₹ {x:,.0f}" if x else "₹ 0"
        )
        return result.to_dict(orient='records')

    # ── Section 6: Understanding Ensemble Score ─────────────────────

    def get_flag_reasons_frequency(self):
        """Top flag reasons from anomaly_results."""
        self._ensure_anomaly_data()
        if self.anomaly_df.empty or 'top_flag_reasons' not in self.anomaly_df.columns:
            return []

        flagged_df = self.anomaly_df[self.anomaly_df['flagged_by_model'] == True]
        reasons_list = []
        for _, row in flagged_df.iterrows():
            raw = str(row.get('top_flag_reasons', ''))
            if raw and raw.lower() not in ('nan', 'none'):
                parts = [r.strip() for r in raw.replace('\n', ',').split(',') if r.strip()]
                reasons_list.extend(parts)

        reason_counts = pd.Series(reasons_list).value_counts().head(8)
        return [{'reason': r, 'count': int(c)} for r, c in reason_counts.items()]

    def get_flag_rate_cross_tab(self):
        """Cross-tab flag rate by work_category and by state."""
        self._ensure_anomaly_data()
        if self.anomaly_df.empty:
            return {'by_category': [], 'by_state': []}

        merged = self.df.merge(
            self.anomaly_df[['work_id', 'flagged_by_model']],
            on='work_id', how='left'
        )
        merged['flagged'] = merged['flagged_by_model'].fillna(False).astype(bool)

        # By category
        cat_group = merged.groupby('work_category').agg(
            total=('work_id', 'count'),
            flagged_count=('flagged', 'sum')
        ).reset_index()
        cat_group['flag_rate'] = (cat_group['flagged_count'] / cat_group['total'] * 100).round(1)
        cat_group = cat_group.sort_values('flag_rate', ascending=False).head(6)

        # By state (top 6)
        state_group = merged.groupby('state').agg(
            total=('work_id', 'count'),
            flagged_count=('flagged', 'sum')
        ).reset_index()
        state_group['flag_rate'] = (state_group['flagged_count'] / state_group['total'] * 100).round(1)
        state_group = state_group.sort_values('total', ascending=False).head(6)

        return {
            'by_category': cat_group[['work_category', 'flag_rate']].to_dict(orient='records'),
            'by_state': state_group[['state', 'flag_rate']].to_dict(orient='records')
        }
