"""
anomaly_detection_baseline.py
---------------------------------
Baseline unsupervised anomaly-detection pipeline for SIH26102.

Loads mplads_synthetic_dataset.csv, engineers the domain-specific
signals discussed in the solution plan, scores every work with an
Isolation Forest (unsupervised -- no labels used for training), and
then checks the results against the ground-truth `is_anomaly` labels
ONLY for evaluation (this is a luxury you have with synthetic data;
on real data you won't have labels, which is exactly why an
unsupervised model is the right choice here).

Swap the CSV path for your real scraped/exported eSAKSHI data once you
have it -- as long as column names match, nothing else needs to change.
"""

import pandas as pd
import numpy as np
import os
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.metrics import classification_report

DATA_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "mplads_synthetic_dataset.csv")

df = pd.read_csv(DATA_PATH, parse_dates=["recommendation_date", "sanction_date", "completion_date"])

# ---------------------------------------------------------------------
# 1. Feature engineering (this is the core ML/data-handling work)
# ---------------------------------------------------------------------

# -- Timing features --
df["days_rec_to_sanction"] = (df["sanction_date"] - df["recommendation_date"]).dt.days
df["days_sanction_to_completion"] = (df["completion_date"] - df["sanction_date"]).dt.days
df["completed_flag"] = (df["status"] == "Completed").astype(int)

# -- Amount features --
df["release_ratio"] = df["released_amount"] / df["sanctioned_amount"].replace(0, np.nan)
df["over_release_flag"] = (df["released_amount"] > df["sanctioned_amount"]).astype(int)
df["is_round_amount"] = (df["sanctioned_amount"] % 100000 == 0).astype(int)

# category-relative amount z-score (is this work unusually expensive for its category?)
cat_mean = df.groupby("work_category")["sanctioned_amount"].transform("mean")
cat_std = df.groupby("work_category")["sanctioned_amount"].transform("std").replace(0, np.nan)
df["amount_zscore_in_category"] = ((df["sanctioned_amount"] - cat_mean) / cat_std).fillna(0)

# -- Evidence / documentation features --
df["no_photo_flag"] = ((df["status"] == "Completed") & (df["photo_count"] == 0)).astype(int)

# -- Vendor / agency concentration features --
vendor_counts = df["vendor"].value_counts()
df["vendor_work_count"] = df["vendor"].map(vendor_counts)
vendor_amount = df.groupby("vendor")["sanctioned_amount"].sum()
df["vendor_total_amount"] = df["vendor"].map(vendor_amount)

agency_counts = df["implementing_agency"].value_counts()
df["agency_work_count"] = df["implementing_agency"].map(agency_counts)

# -- Text similarity feature: how "generic/duplicated" is this description? --
tfidf = TfidfVectorizer(max_features=500, stop_words="english")
tfidf_matrix = tfidf.fit_transform(df["work_description"].fillna(""))
# similarity of each description to the single most common description pattern
desc_counts = df["work_description"].value_counts()
most_common_desc = desc_counts.index[0]
common_vec = tfidf.transform([most_common_desc])
df["desc_genericness_score"] = cosine_similarity(tfidf_matrix, common_vec).flatten()

# ---------------------------------------------------------------------
# 2. Assemble feature matrix for the model
# ---------------------------------------------------------------------
numeric_features = [
    "days_rec_to_sanction", "days_sanction_to_completion", "release_ratio",
    "over_release_flag", "is_round_amount", "amount_zscore_in_category",
    "no_photo_flag", "vendor_work_count", "vendor_total_amount",
    "agency_work_count", "desc_genericness_score",
]
X = df[numeric_features].fillna(0)
X_scaled = StandardScaler().fit_transform(X)

# ---------------------------------------------------------------------
# 3. Unsupervised model: Isolation Forest
# ---------------------------------------------------------------------
iso = IsolationForest(
    n_estimators=300,
    contamination=0.06,  # rough prior on anomaly rate; tune or leave as 'auto'
    random_state=42,
)
iso.fit(X_scaled)

df["risk_score"] = -iso.decision_function(X_scaled)  # higher = more anomalous
df["flagged_by_model"] = (iso.predict(X_scaled) == -1)

# ---------------------------------------------------------------------
# 4. Explainability: cheapest useful version -- top contributing features
#    (for each flagged row, which of its features are most extreme)
# ---------------------------------------------------------------------
feat_z = (X - X.mean()) / X.std().replace(0, 1)

def top_reasons(row_idx, n=3):
    row = feat_z.loc[row_idx].abs().sort_values(ascending=False)
    return ", ".join(row.index[:n])

df["top_flag_reasons"] = [top_reasons(i) for i in df.index]

# ---------------------------------------------------------------------
# 5. Evaluate against ground truth (only possible because data is synthetic)
# ---------------------------------------------------------------------
print("=== Evaluation against injected ground-truth anomalies ===")
print(classification_report(df["is_anomaly"], df["flagged_by_model"], digits=3))

# ---------------------------------------------------------------------
# 6. Output a ranked risk report -- this is what your demo / dashboard shows
# ---------------------------------------------------------------------
report_cols = [
    "work_id", "mp_name", "state", "district", "work_category",
    "sanctioned_amount", "released_amount", "status", "vendor",
    "risk_score", "top_flag_reasons",
]
risk_report = df[df["flagged_by_model"]].sort_values("risk_score", ascending=False)[report_cols]
out_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "mplads_risk_report.csv")
risk_report.to_csv(out_path, index=False)
print(f"\nSaved ranked risk report ({len(risk_report)} flagged works) -> {out_path}")
print(risk_report.head(10).to_string(index=False))
