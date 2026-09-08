"""
generate_mplads_dataset.py
---------------------------------
Generates a synthetic, realistic MPLADS (eSAKSHI) work-level dataset for
SIH26102 ("AI-powered system to detect anomalies, fraud, and inefficiencies
in MPLAD Scheme implementation").

Why synthetic: the public eSAKSHI dashboard doesn't expose a bulk CSV/API
(it's a stakeholder-login portal + JS dashboard), and real fraud labels
don't exist publicly. This generator mirrors the REAL schema and REAL
scheme rules (Rs 5 crore/MP/year, 15% SC / 7.5% ST mandate, sanction ->
execution -> completion lifecycle) and injects labeled anomalies of the
same *types* real fraud/inefficiency detection would look for.

Use this to build/test your pipeline now. Swap in real scraped/exported
eSAKSHI data later -- keep the same column names and everything downstream
(feature engineering, models) works unchanged.

`is_anomaly` and `anomaly_type` are ground-truth labels for YOU to validate
your unsupervised models against (precision/recall/F1). In a real
deployment you would NOT have these labels -- that's the point of using
unsupervised methods (Isolation Forest, LOF, autoencoder) rather than
supervised classification.
"""

import numpy as np
import pandas as pd
import os
from datetime import datetime, timedelta
import random

RNG_SEED = 42
random.seed(RNG_SEED)
np.random.seed(RNG_SEED)

N_WORKS = 6000
ANOMALY_RATE = 0.06  # ~6% of records get an injected anomaly

STATES_DISTRICTS = {
    "Andaman & Nicobar Island": ["Port Blair", "Nicobar"],
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada"],
    "Arunanchal Pradesh": ["Itanagar", "Tawang"],
    "Assam": ["Guwahati", "Silchar"],
    "Bihar": ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur"],
    "Chandigarh": ["Chandigarh"],
    "Chhattisgarh": ["Raipur", "Bhilai"],
    "Dadara & Nagar Havelli": ["Silvassa"],
    "Daman & Diu": ["Daman", "Diu"],
    "Goa": ["North Goa", "South Goa"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
    "Haryana": ["Gurugram", "Faridabad"],
    "Himachal Pradesh": ["Shimla", "Manali"],
    "Jammu & Kashmir": ["Srinagar", "Jammu"],
    "Jharkhand": ["Ranchi", "Jamshedpur"],
    "Karnataka": ["Bengaluru", "Mysuru", "Belagavi", "Hubli"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
    "Lakshadweep": ["Kavaratti"],
    "Madhya Pradesh": ["Bhopal", "Indore"],
    "Maharashtra": ["Pune", "Nagpur", "Nashik", "Thane", "Aurangabad"],
    "Manipur": ["Imphal", "Thoubal"],
    "Meghalaya": ["Shillong", "Tura"],
    "Mizoram": ["Aizawl", "Lunglei"],
    "NCT of Delhi": ["New Delhi", "North Delhi", "South Delhi"],
    "Nagaland": ["Kohima", "Dimapur"],
    "Odisha": ["Bhubaneswar", "Cuttack"],
    "Puducherry": ["Puducherry", "Karaikal"],
    "Punjab": ["Ludhiana", "Amritsar"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
    "Sikkim": ["Gangtok", "Namchi"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
    "Telangana": ["Hyderabad", "Warangal"],
    "Tripura": ["Agartala", "Dharmanagar"],
    "Uttar Pradesh": ["Lucknow", "Varanasi", "Kanpur", "Agra", "Meerut"],
    "Uttarakhand": ["Dehradun", "Haridwar"],
    "West Bengal": ["Kolkata", "Howrah", "Darjeeling", "Malda"]
}

WORK_CATEGORIES = [
    "Drinking Water Supply", "Road Construction/Repair", "School Infrastructure",
    "Community Hall Construction", "Street Lighting", "Sanitation/Toilets",
    "Health Facility Upgrade", "Sports Infrastructure", "Irrigation Facility",
    "CCTV Installation", "Railway Halt Amenities", "Solar Power Installation",
    "Anganwadi Center Construction", "Library/Reading Room",
]

CATEGORY_COST_RANGE = {  # typical sanctioned amount range (INR) per category
    "Drinking Water Supply": (300000, 4500000),
    "Road Construction/Repair": (500000, 9500000),
    "School Infrastructure": (400000, 6000000),
    "Community Hall Construction": (800000, 8000000),
    "Street Lighting": (150000, 2000000),
    "Sanitation/Toilets": (100000, 1500000),
    "Health Facility Upgrade": (500000, 7000000),
    "Sports Infrastructure": (300000, 5000000),
    "Irrigation Facility": (600000, 9000000),
    "CCTV Installation": (200000, 2500000),
    "Railway Halt Amenities": (1000000, 9500000),
    "Solar Power Installation": (400000, 3500000),
    "Anganwadi Center Construction": (300000, 2000000),
    "Library/Reading Room": (250000, 2500000),
}

STATUS_FLOW = ["Recommended", "Sanctioned", "In Progress", "Completed"]

AGENCIES = [f"Implementing Agency {i}" for i in range(1, 61)]
VENDORS = [f"Vendor Pvt Ltd {i}" for i in range(1, 121)]

MPS = []
for state, districts in STATES_DISTRICTS.items():
    for i in range(1, random.randint(3, 6)):
        house = random.choice(["Lok Sabha", "Lok Sabha", "Rajya Sabha"])
        MPS.append({
            "mp_name": f"MP_{state[:3].upper()}_{i}",
            "house": house,
            "state": state,
            "constituency": f"{state} PC-{i}" if house == "Lok Sabha" else f"{state} (RS)",
            "districts": districts,
        })

WORK_DESC_TEMPLATES = [
    "Construction of {cat} at {loc}",
    "Upgradation of {cat} facility in {loc}",
    "Providing {cat} for public use at {loc}",
    "Repair and renovation of {cat} at {loc}",
    "Installation of {cat} in ward area {loc}",
]

DUPLICATE_DESC_POOL = [
    "General development work as per local requirement",
    "Infrastructure work for public welfare",
    "Community asset creation work",
]


def random_date(start, end):
    delta = end - start
    return start + timedelta(days=random.randint(0, delta.days))


def make_description(category, loc, force_generic=False):
    if force_generic:
        return random.choice(DUPLICATE_DESC_POOL)
    template = random.choice(WORK_DESC_TEMPLATES)
    return template.format(cat=category, loc=loc)


rows = []
fy_start = datetime(2023, 4, 1)
fy_end = datetime(2025, 3, 31)

for i in range(N_WORKS):
    mp = random.choice(MPS)
    district = random.choice(mp["districts"])
    category = random.choice(WORK_CATEGORIES)
    lo, hi = CATEGORY_COST_RANGE[category]
    sanctioned_amount = int(np.random.uniform(lo, hi) // 1000 * 1000)

    is_sc_st = random.random() < 0.22  # roughly matches 15%+7.5% mandate pool

    recommendation_date = random_date(fy_start, fy_end - timedelta(days=200))
    sanction_date = recommendation_date + timedelta(days=int(np.random.gamma(3, 12)))  # ~15-60 days typical
    status = random.choices(STATUS_FLOW, weights=[0.10, 0.15, 0.30, 0.45])[0]

    completion_date = None
    released_amount = 0
    if status in ("In Progress", "Completed"):
        progress_days = int(np.random.gamma(4, 30))  # ~4-8 months typical
        released_amount = int(sanctioned_amount * np.random.uniform(0.3, 0.95))
    if status == "Completed":
        completion_date = sanction_date + timedelta(days=int(np.random.gamma(5, 30)))  # ~6-10 months typical
        released_amount = int(sanctioned_amount * np.random.uniform(0.92, 1.0))

    agency = random.choice(AGENCIES)
    vendor = random.choice(VENDORS)
    photo_count = np.random.poisson(3) if status == "Completed" else np.random.poisson(1)

    row = {
        "work_id": f"MPLADS-{i+100000}",
        "mp_name": mp["mp_name"],
        "house": mp["house"],
        "state": mp["state"],
        "constituency": mp["constituency"],
        "district": district,
        "work_category": category,
        "work_description": make_description(category, district),
        "is_sc_st_area": is_sc_st,
        "sanctioned_amount": sanctioned_amount,
        "released_amount": released_amount,
        "recommendation_date": recommendation_date.date().isoformat(),
        "sanction_date": sanction_date.date().isoformat(),
        "completion_date": completion_date.date().isoformat() if completion_date else None,
        "status": status,
        "implementing_agency": agency,
        "vendor": vendor,
        "photo_count": int(photo_count),
        "is_anomaly": False,
        "anomaly_type": None,
    }
    rows.append(row)

df = pd.DataFrame(rows)

# ---------------------------------------------------------------------
# Inject labeled anomalies (ground truth, for YOUR evaluation only)
# ---------------------------------------------------------------------
n_anom = int(N_WORKS * ANOMALY_RATE)
anomaly_idx_pool = list(df.sample(n=n_anom, random_state=RNG_SEED).index)
anomaly_types = [
    "payment_before_sanction",       # released amount recorded before sanction realistically possible
    "impossible_speed_completion",   # completed absurdly fast for category/budget
    "round_number_bias",             # suspiciously round sanctioned amount at/near threshold
    "vendor_over_concentration",     # one vendor tied to unusually many high-value works
    "duplicate_generic_description", # vague/templated description reused verbatim
    "no_photo_evidence",             # marked completed with zero photos
    "over_release_vs_sanction",      # released amount exceeds sanctioned amount
    "sc_st_mandate_gap",             # will be handled at aggregate level, skip per-row
]
per_type_idx = np.array_split(anomaly_idx_pool, len(anomaly_types) - 1)  # exclude aggregate-level type

for t_idx, idxs in zip(anomaly_types[:-1], per_type_idx):
    for idx in idxs:
        df.at[idx, "is_anomaly"] = True
        df.at[idx, "anomaly_type"] = t_idx

        if t_idx == "payment_before_sanction":
            rec = datetime.fromisoformat(df.at[idx, "recommendation_date"])
            df.at[idx, "sanction_date"] = (rec + timedelta(days=random.randint(1, 5))).date().isoformat()
            df.at[idx, "released_amount"] = int(df.at[idx, "sanctioned_amount"] * 0.5)
            df.at[idx, "status"] = "In Progress"

        elif t_idx == "impossible_speed_completion":
            sanc = datetime.fromisoformat(df.at[idx, "sanction_date"])
            df.at[idx, "completion_date"] = (sanc + timedelta(days=random.randint(1, 4))).date().isoformat()
            df.at[idx, "status"] = "Completed"
            df.at[idx, "released_amount"] = df.at[idx, "sanctioned_amount"]

        elif t_idx == "round_number_bias":
            df.at[idx, "sanctioned_amount"] = int(round(df.at[idx, "sanctioned_amount"], -5))  # nearest lakh
            if df.at[idx, "sanctioned_amount"] % 5000000 < 50000:
                df.at[idx, "sanctioned_amount"] -= 25000  # just under a round threshold

        elif t_idx == "vendor_over_concentration":
            df.at[idx, "vendor"] = "Vendor Pvt Ltd 1"  # force concentration into one vendor
            df.at[idx, "sanctioned_amount"] = int(df.at[idx, "sanctioned_amount"] * np.random.uniform(1.3, 2.0))

        elif t_idx == "duplicate_generic_description":
            df.at[idx, "work_description"] = random.choice(DUPLICATE_DESC_POOL)

        elif t_idx == "no_photo_evidence":
            df.at[idx, "status"] = "Completed"
            df.at[idx, "photo_count"] = 0
            if df.at[idx, "completion_date"] is None:
                sanc = datetime.fromisoformat(df.at[idx, "sanction_date"])
                df.at[idx, "completion_date"] = (sanc + timedelta(days=180)).date().isoformat()

        elif t_idx == "over_release_vs_sanction":
            df.at[idx, "released_amount"] = int(df.at[idx, "sanctioned_amount"] * np.random.uniform(1.05, 1.25))

# Shuffle rows so anomalies aren't clustered at the top
df = df.sample(frac=1, random_state=RNG_SEED).reset_index(drop=True)

out_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "mplads_synthetic_dataset.csv")
df.to_csv(out_path, index=False)
print(f"Saved {len(df)} rows -> {out_path}")
print(f"Injected anomalies: {df['is_anomaly'].sum()} ({df['is_anomaly'].mean()*100:.1f}%)")
print(df["anomaly_type"].value_counts(dropna=True))
