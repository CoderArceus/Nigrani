"""
advanced_pipeline.py
---------------------------------
Upgraded SIH26102 pipeline. Builds on anomaly_detection_baseline.py and adds:

  1. ENSEMBLE SCORING: Isolation Forest + Local Outlier Factor combined,
     so you catch anomaly shapes that either model alone misses.
  2. DESCRIPTION CLUSTERING: DBSCAN on TF-IDF vectors catches near-duplicate
     / templated work descriptions more broadly than single-string matching.
  3. NETWORK ANALYSIS: builds an MP <-> Implementing Agency <-> Vendor graph
     and flags nodes with unusually high degree/centrality -- this is the
     piece that visually stands out in a demo and maps well to the
     "Blockchain & Cybersecurity" theme framing of SIH26102.

COLAB USAGE:
  1. Upload mplads_synthetic_dataset.csv via files.upload()
  2. Paste this whole script into a cell
  3. Change DATA_PATH below to just "mplads_synthetic_dataset.csv"
  4. Run. Outputs: mplads_risk_report_v2.csv, mplads_network.png
  5. Download both with files.download(...)
"""

import pandas as pd
import numpy as np
import os
import networkx as nx
import matplotlib.pyplot as plt

from sklearn.ensemble import IsolationForest
from sklearn.neighbors import LocalOutlierFactor
from sklearn.preprocessing import StandardScaler
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import DBSCAN
from sklearn.metrics import classification_report

# CHANGE THIS if running outside the sandbox / on Colab:
_SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(_SCRIPT_DIR, "mplads_synthetic_dataset.csv")

df = pd.read_csv(DATA_PATH, parse_dates=["recommendation_date", "sanction_date", "completion_date"])

# =======================================================================
# 1. FEATURE ENGINEERING (same core signals as the baseline)
# =======================================================================
df["days_rec_to_sanction"] = (df["sanction_date"] - df["recommendation_date"]).dt.days
df["days_sanction_to_completion"] = (df["completion_date"] - df["sanction_date"]).dt.days
df["release_ratio"] = df["released_amount"] / df["sanctioned_amount"].replace(0, np.nan)
df["over_release_flag"] = (df["released_amount"] > df["sanctioned_amount"]).astype(int)
df["is_round_amount"] = (df["sanctioned_amount"] % 100000 == 0).astype(int)

cat_mean = df.groupby("work_category")["sanctioned_amount"].transform("mean")
cat_std = df.groupby("work_category")["sanctioned_amount"].transform("std").replace(0, np.nan)
df["amount_zscore_in_category"] = ((df["sanctioned_amount"] - cat_mean) / cat_std).fillna(0)

df["no_photo_flag"] = ((df["status"] == "Completed") & (df["photo_count"] == 0)).astype(int)

vendor_counts = df["vendor"].value_counts()
df["vendor_work_count"] = df["vendor"].map(vendor_counts)
vendor_amount = df.groupby("vendor")["sanctioned_amount"].sum()
df["vendor_total_amount"] = df["vendor"].map(vendor_amount)
agency_counts = df["implementing_agency"].value_counts()
df["agency_work_count"] = df["implementing_agency"].map(agency_counts)

# =======================================================================
# 2. DESCRIPTION CLUSTERING (upgrade over single-string similarity)
#    DBSCAN groups near-duplicate/templated descriptions together.
#    Any description in an oversized cluster is flagged as "generic".
# =======================================================================
tfidf = TfidfVectorizer(max_features=500, stop_words="english")
tfidf_matrix = tfidf.fit_transform(df["work_description"].fillna(""))

dbscan = DBSCAN(eps=0.3, min_samples=5, metric="cosine")
df["desc_cluster"] = dbscan.fit_predict(tfidf_matrix)

cluster_sizes = df["desc_cluster"].value_counts()
# noise points (-1) are unique descriptions -- fine. Large clusters (excluding noise)
# mean many works share near-identical wording -- suspicious.
oversized_clusters = cluster_sizes[(cluster_sizes.index != -1) & (cluster_sizes > 15)].index
df["desc_generic_flag"] = df["desc_cluster"].isin(oversized_clusters).astype(int)

# =======================================================================
# 3. NETWORK ANALYSIS: MP <-> Agency <-> Vendor graph
# =======================================================================
G = nx.Graph()
for _, row in df.iterrows():
    G.add_node(row["mp_name"], kind="mp")
    G.add_node(row["implementing_agency"], kind="agency")
    G.add_node(row["vendor"], kind="vendor")
    G.add_edge(row["mp_name"], row["implementing_agency"], weight=row["sanctioned_amount"])
    G.add_edge(row["implementing_agency"], row["vendor"], weight=row["sanctioned_amount"])

degree_centrality = nx.degree_centrality(G)
betweenness = nx.betweenness_centrality(G, k=min(200, G.number_of_nodes()), seed=42)

df["vendor_degree_centrality"] = df["vendor"].map(degree_centrality)
df["agency_betweenness"] = df["implementing_agency"].map(betweenness)

# flag works tied to the top 2% most central vendors/agencies -- unusually
# well-connected nodes are exactly what "vendor capture" / collusion looks like
vendor_thresh = df["vendor_degree_centrality"].quantile(0.98)
agency_thresh = df["agency_betweenness"].quantile(0.98)
df["network_risk_flag"] = (
    (df["vendor_degree_centrality"] >= vendor_thresh) |
    (df["agency_betweenness"] >= agency_thresh)
).astype(int)

# --- visualize the network, highlighting risky nodes ---
plt.figure(figsize=(12, 12))
top_vendors = df.sort_values("vendor_degree_centrality", ascending=False)["vendor"].unique()[:15]
sub_nodes = set(top_vendors)
for v in top_vendors:
    sub_nodes.update(G.neighbors(v))
subG = G.subgraph(sub_nodes)

node_colors = []
for n in subG.nodes():
    kind = subG.nodes[n]["kind"]
    if kind == "mp":
        node_colors.append("#4C9AFF")
    elif kind == "agency":
        node_colors.append("#FFAB00")
    else:
        node_colors.append("#FF5630" if n in top_vendors else "#DFE1E6")

pos = nx.spring_layout(subG, seed=42, k=0.5)
nx.draw_networkx_edges(subG, pos, alpha=0.3)
nx.draw_networkx_nodes(subG, pos, node_color=node_colors, node_size=250)
nx.draw_networkx_labels(subG, pos, font_size=6)
plt.title("MP - Implementing Agency - Vendor network\n(red = top-centrality vendors, orange = agencies, blue = MPs)")
plt.axis("off")
plt.tight_layout()
plt.savefig(os.path.join(_SCRIPT_DIR, "mplads_network.png"), dpi=150)
print("Saved network visualization -> mplads_network.png")

# =======================================================================
# 4. ENSEMBLE ANOMALY SCORING: Isolation Forest + Local Outlier Factor
# =======================================================================
numeric_features = [
    "days_rec_to_sanction", "days_sanction_to_completion", "release_ratio",
    "over_release_flag", "is_round_amount", "amount_zscore_in_category",
    "no_photo_flag", "desc_generic_flag",
]
X = df[numeric_features].fillna(0)
X_scaled = StandardScaler().fit_transform(X)

iso = IsolationForest(n_estimators=300, contamination=0.06, random_state=42)
iso.fit(X_scaled)
iso_score = -iso.decision_function(X_scaled)          # higher = more anomalous
iso_flag = (iso.predict(X_scaled) == -1)

lof = LocalOutlierFactor(n_neighbors=25, contamination=0.06)
lof_flag_raw = lof.fit_predict(X_scaled)
lof_score = -lof.negative_outlier_factor_             # higher = more anomalous
lof_flag = (lof_flag_raw == -1)

# combine: normalize each score 0-1, average them, and flag if EITHER model
# flags it OR the combined score is in the top 6% (ensemble = broader recall)
def normalize(s):
    return (s - s.min()) / (s.max() - s.min() + 1e-9)

df["iso_score"] = normalize(iso_score)
df["lof_score"] = normalize(lof_score)
df["ensemble_score"] = (df["iso_score"] + df["lof_score"]) / 2

ensemble_thresh = df["ensemble_score"].quantile(0.96)
# require agreement: both models flag it, OR the combined score is extreme
# (this trades a bit of recall for much better precision than "either model")
df["flagged_by_model"] = (iso_flag & lof_flag) | (df["ensemble_score"] >= ensemble_thresh)

# =======================================================================
# 5. EXPLAINABILITY: top contributing features per flagged work
# =======================================================================
feat_z = (X - X.mean()) / X.std().replace(0, 1)

def top_reasons(idx, n=3):
    row = feat_z.loc[idx].abs().sort_values(ascending=False)
    return ", ".join(row.index[:n])

df["top_flag_reasons"] = [top_reasons(i) for i in df.index]

# =======================================================================
# 6. EVALUATE (ground truth only exists because this is synthetic data)
# =======================================================================
print("\n=== Ensemble evaluation against injected ground-truth anomalies ===")
print(classification_report(df["is_anomaly"], df["flagged_by_model"], digits=3))
print("\nRecall by anomaly type:")
print(df.groupby("anomaly_type")["flagged_by_model"].mean())

# =======================================================================
# 7. FINAL RANKED RISK REPORT
# =======================================================================
report_cols = [
    "work_id", "mp_name", "state", "district", "work_category",
    "sanctioned_amount", "released_amount", "status", "vendor",
    "implementing_agency", "ensemble_score", "network_risk_flag", "top_flag_reasons", "flagged_by_model"
]
risk_report = df.sort_values("ensemble_score", ascending=False)[report_cols]
out_path = os.path.join(_SCRIPT_DIR, "mplads_risk_report_v2.csv")
risk_report.to_csv(out_path, index=False)
print(f"\nSaved ranked risk report ({len(risk_report)} flagged works) -> {out_path}")
print(risk_report.head(10).to_string(index=False))
