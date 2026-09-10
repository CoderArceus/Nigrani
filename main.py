from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from supabase import create_client

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Connect to Supabase
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Initialize Insights Cache
from insights_stats import InsightsDataStore
insights_store = InsightsDataStore(supabase)

# Create FastAPI app
app = FastAPI(
    title="MPLADS Monitoring API",
    description="Backend API for MPLADS project monitoring and anomaly detection",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "MPLADS Monitoring API is running!"
    }


@app.get("/projects")
def get_projects():
    response = (
        supabase
        .table("projects")
        .select("*")
        .limit(20)
        .execute()
    )

    return {
        "count": len(response.data),
        "projects": response.data
    }
@app.get("/projects/search")
def search_projects(
    state: str = None,
    district: str = None,
    status: str = None,
    risk_level: str = None,
    work_category: str = None,
    page: int = 1,
    limit: int = 20,
    sort: str = None,
    order: str = "desc",
    mp_name: str = None,
    year: str = None
):
    # ---------------------------------
    # Validate pagination
    # ---------------------------------

    if page < 1:
        page = 1

    if limit < 1:
        limit = 20

    if limit > 100:
        limit = 100

    import math
    
    start = (page - 1) * limit
    end = start + limit - 1
    is_desc = (order.lower() == "desc")

    if sort == "anomaly":
        query = supabase.table("anomaly_results").select("*, projects!inner(*)", count="exact")
        
        if risk_level:
            query = query.eq("risk_level", risk_level)
        if state:
            query = query.eq("projects.state", state)
        if district:
            query = query.eq("projects.district", district)
        if status:
            query = query.eq("projects.status", status)
        if work_category:
            query = query.eq("projects.work_category", work_category)
        if mp_name:
            query = query.eq("projects.mp_name", mp_name)
        if year:
            query = query.gte("projects.sanction_date", f"{year}-01-01").lte("projects.sanction_date", f"{year}-12-31")
            
        query = query.order("ensemble_score", desc=is_desc)
        
        response = query.range(start, end).execute()
        
        results = []
        for item in response.data:
            p = item["projects"]
            results.append({
                "work_id": p.get("work_id"),
                "mp_name": p.get("mp_name"),
                "state": p.get("state"),
                "district": p.get("district"),
                "work_category": p.get("work_category"),
                "status": p.get("status"),
                "sanctioned_amount": p.get("sanctioned_amount"),
                "released_amount": p.get("released_amount"),
                "risk_level": item.get("risk_level"),
                "ensemble_score": item.get("ensemble_score"),
                "flagged_by_model": item.get("flagged_by_model"),
                "top_flag_reasons": item.get("top_flag_reasons")
            })
            
        total_count = response.count or 0
        total_pages = max(1, math.ceil(total_count / limit))
        return {
            "count": total_count,
            "page": page,
            "limit": limit,
            "total_pages": total_pages,
            "projects": results
        }

    # =================================
    # CASE 2: Sort is cost, date, delay, or None
    # =================================

    query = supabase.table("projects").select("*", count="exact")

    if risk_level:
        anomaly_query = supabase.table("anomaly_results").select("work_id").eq("risk_level", risk_level)
        anomaly_response = anomaly_query.execute()
        matching_work_ids = [item["work_id"] for item in anomaly_response.data]
        if not matching_work_ids:
            return {"count": 0, "page": page, "limit": limit, "total_pages": 0, "projects": []}
        query = query.in_("work_id", matching_work_ids)

    if state:
        query = query.eq("state", state)
    if district:
        query = query.eq("district", district)
    if status:
        query = query.eq("status", status)
    if work_category:
        query = query.eq("work_category", work_category)
    if mp_name:
        query = query.eq("mp_name", mp_name)
    if year:
        query = query.gte("sanction_date", f"{year}-01-01").lte("sanction_date", f"{year}-12-31")

    if sort == "cost":
        query = query.order("sanctioned_amount", desc=is_desc)
    elif sort == "date":
        query = query.order("sanction_date", desc=is_desc)
    elif sort == "delay":
        query = query.order("sanction_date", desc=False) # Oldest first for highest delay

    projects_response = query.range(start, end).execute()
    projects = projects_response.data
    total_count = projects_response.count or 0

    work_ids = [project["work_id"] for project in projects]
    anomaly_lookup = {}

    if work_ids:
        anomaly_response = supabase.table("anomaly_results").select("*").in_("work_id", work_ids).execute()
        anomaly_lookup = {item["work_id"]: item for item in anomaly_response.data}

    results = []
    for project in projects:
        work_id = project["work_id"]
        ml_data = anomaly_lookup.get(work_id)
        results.append({
            "work_id": work_id,
            "mp_name": project.get("mp_name"),
            "state": project.get("state"),
            "district": project.get("district"),
            "work_category": project.get("work_category"),
            "status": project.get("status"),
            "sanctioned_amount": project.get("sanctioned_amount"),
            "released_amount": project.get("released_amount"),
            "risk_level": ml_data["risk_level"] if ml_data else None,
            "ensemble_score": ml_data["ensemble_score"] if ml_data else None,
            "flagged_by_model": ml_data["flagged_by_model"] if ml_data else False,
            "top_flag_reasons": ml_data["top_flag_reasons"] if ml_data else None
        })

    total_pages = max(1, math.ceil(total_count / limit))

    return {
        "count": total_count,
        "page": page,
        "limit": limit,
        "total_pages": total_pages,
        "projects": results
    }
@app.get("/projects/{work_id}/explanation")
def project_explanation(work_id: str):

    # ---------------------------------
    # Get project
    # ---------------------------------

    project_response = (
        supabase
        .table("projects")
        .select("*")
        .eq("work_id", work_id)
        .single()
        .execute()
    )

    project = project_response.data

    # ---------------------------------
    # Get ML result
    # ---------------------------------

    anomaly_response = (
        supabase
        .table("anomaly_results")
        .select("*")
        .eq("work_id", work_id)
        .single()
        .execute()
    )

    anomaly = anomaly_response.data

    # ---------------------------------
    # Convert reasons into list
    # ---------------------------------

    reasons = []

    if anomaly["top_flag_reasons"]:

        reasons = [
            reason.strip()
            for reason in anomaly["top_flag_reasons"].split(",")
        ]

    # ---------------------------------
    # Return explanation
    # ---------------------------------

    return {
        "work_id": work_id,
        "risk_level": anomaly["risk_level"],
        "risk_priority": anomaly["risk_priority"],
        "ensemble_score": anomaly["ensemble_score"],
        "flagged_by_model": anomaly["flagged_by_model"],
        "network_risk_flag": anomaly["network_risk_flag"],
        "reasons": reasons,
        "model_version": anomaly["model_version"],
        "project": {
            "mp_name": project["mp_name"],
            "state": project["state"],
            "district": project["district"],
            "work_category": project["work_category"],
            "work_description": project["work_description"],
            "status": project["status"],
            "sanctioned_amount": project["sanctioned_amount"],
            "released_amount": project["released_amount"],
            "recommendation_date": project["recommendation_date"],
            "sanction_date": project["sanction_date"],
            "completion_date": project["completion_date"]
        }
    }
@app.get("/projects/{work_id}")
def get_project_details(work_id: str):

    # Get project information
    project_response = (
        supabase
        .table("projects")
        .select("*")
        .eq("work_id", work_id)
        .single()
        .execute()
    )

    # Get ML/anomaly information
    anomaly_response = (
        supabase
        .table("anomaly_results")
        .select("*")
        .eq("work_id", work_id)
        .single()
        .execute()
    )

    return {
        "project": project_response.data,
        "ml_analysis": anomaly_response.data
    }
@app.get("/vendors")
def get_vendors():

    response = (
        supabase
        .table("vendors")
        .select("*")
        .execute()
    )

    return {
        "count": len(response.data),
        "vendors": response.data
    }
@app.get("/agencies")
def get_agencies():

    response = (
        supabase
        .table("implementing_agencies")
        .select("*")
        .execute()
    )

    return {
        "count": len(response.data),
        "agencies": response.data
    }
@app.get("/anomalies")
def get_anomalies():
    response = (
        supabase
        .table("anomaly_results")
        .select("*")
        .eq("flagged_by_model", True)
        .execute()
    )

    return {
        "count": len(response.data),
        "anomalies": response.data
    }
@app.get("/dashboard/review-queue")
def review_queue():
    # Get all ML-flagged projects
    anomaly_response = (
        supabase
        .table("anomaly_results")
        .select(
            "work_id, risk_level, risk_priority, ensemble_score, "
            "network_risk_flag, top_flag_reasons"
        )
        .eq("flagged_by_model", True)
        .order("risk_priority", desc=False)
        .order("ensemble_score", desc=True)
        .execute()
    )

    anomalies = anomaly_response.data

    if not anomalies:
        return {
            "count": 0,
            "projects": []
        }

    work_ids = [item["work_id"] for item in anomalies]

    # Get project information for those flagged projects
    project_response = (
        supabase
        .table("projects")
        .select(
            "work_id, mp_name, state, district, "
            "work_category, status, sanctioned_amount"
        )
        .in_("work_id", work_ids)
        .execute()
    )

    projects = {
        item["work_id"]: item
        for item in project_response.data
    }

    results = []

    for anomaly in anomalies:
        work_id = anomaly["work_id"]
        project = projects.get(work_id)

        if not project:
            continue

        # Convert ML risk level to queue priority
        if anomaly["risk_level"] == "Critical":
            priority = "Critical"
        elif anomaly["risk_level"] == "High Risk":
            priority = "High"
        else:
            priority = "Medium"

        # Convert anomaly reasons into readable signals
        signals = []

        if anomaly["top_flag_reasons"]:
            reasons = [
                reason.strip()
                for reason in anomaly["top_flag_reasons"].split(",")
            ]

            for reason in reasons:
                signals.append(reason.replace("_", " ").title())

        if anomaly["network_risk_flag"]:
            signals.append("Network Risk")

        results.append({
            "work_id": work_id,
            "mp_name": project["mp_name"],
            "state": project["state"],
            "district": project["district"],
            "work_category": project["work_category"],
            "status": project["status"],
            "priority": priority,
            "risk_level": anomaly["risk_level"],
            "risk_priority": anomaly["risk_priority"],
            "ensemble_score": anomaly["ensemble_score"],
            "network_risk_flag": anomaly["network_risk_flag"],
            "signals": signals
        })

    return {
        "count": len(results),
        "projects": results
    }
@app.get("/projects")
def get_projects():
    response = (
        supabase
        .table("projects")
        .select("*")
        .limit(20)
        .execute()
    )

    return {
        "count": len(response.data),
        "projects": response.data
    }


@app.get("/anomalies")
def get_anomalies():
    response = (
        supabase
        .table("anomaly_results")
        .select("*")
        .eq("flagged_by_model", True)
        .execute()
    )

    return {
        "count": len(response.data),
        "anomalies": response.data
    }
@app.get("/dashboard/overview")
def get_dashboard_overview():

    # Fetch all projects using pagination to compute global stats
    projects = []
    start = 0
    batch_size = 1000

    while True:
        response = (
            supabase
            .table("projects")
            .select("status, sanctioned_amount, released_amount")
            .range(start, start + batch_size - 1)
            .execute()
        )
        batch = response.data
        projects.extend(batch)
        if len(batch) < batch_size:
            break
        start += batch_size

    in_progress = 0
    completed = 0
    sanction_delays = 0
    total_sanctioned = 0.0
    total_released = 0.0

    for p in projects:
        status = p.get("status", "")
        if status == "In Progress":
            in_progress += 1
        elif status == "Completed":
            completed += 1
        
        # A simple proxy for sanction delay
        if status == "Sanctioned" and not p.get("released_amount"):
            sanction_delays += 1

        total_sanctioned += float(p.get("sanctioned_amount") or 0)
        total_released += float(p.get("released_amount") or 0)

    # Critical
    critical_response = (
        supabase
        .table("anomaly_results")
        .select("result_id", count="exact")
        .eq("risk_level", "Critical")
        .execute()
    )

    # High Risk
    high_response = (
        supabase
        .table("anomaly_results")
        .select("result_id", count="exact")
        .eq("risk_level", "High Risk")
        .execute()
    )

    # Medium Risk
    medium_response = (
        supabase
        .table("anomaly_results")
        .select("result_id", count="exact")
        .eq("risk_level", "Medium Risk")
        .execute()
    )

    # Normal
    normal_response = (
        supabase
        .table("anomaly_results")
        .select("result_id", count="exact")
        .eq("risk_level", "Normal")
        .execute()
    )

    return {
        "total_projects": len(projects),
        "flagged_projects": critical_response.count
            + high_response.count
            + medium_response.count,
        "risk_distribution": {
            "critical": critical_response.count,
            "high_risk": high_response.count,
            "medium_risk": medium_response.count,
            "normal": normal_response.count
        },
        "in_progress": in_progress,
        "completed": completed,
        "sanction_delays": sanction_delays,
        "total_sanctioned_amount": total_sanctioned,
        "total_released_amount": total_released
    }
@app.get("/dashboard/mp-summary")
def mp_summary():
    return insights_store.get_mp_summary()

@app.get("/dashboard/year-summary")
def year_summary():
    return insights_store.get_year_summary()

@app.get("/dashboard/state-summary")
def state_summary():
    """Aggregates all project data by state, returning real financial numbers, completion rates, and delay status."""
    from datetime import datetime, timezone
    
    # 1. Fetch all projects using pagination
    projects = []
    start = 0
    batch_size = 1000

    while True:
        response = (
            supabase
            .table("projects")
            .select("*")
            .range(start, start + batch_size - 1)
            .execute()
        )
        batch = response.data
        projects.extend(batch)
        if len(batch) < batch_size:
            break
        start += batch_size

    # 2. Fetch all anomalies using pagination
    anomalies_list = []
    start = 0

    while True:
        response = (
            supabase
            .table("anomaly_results")
            .select("work_id, risk_level, flagged_by_model, ensemble_score")
            .range(start, start + batch_size - 1)
            .execute()
        )
        batch = response.data
        anomalies_list.extend(batch)
        if len(batch) < batch_size:
            break
        start += batch_size
        
    anomalies = {item["work_id"]: item for item in anomalies_list}

    state_data = {}
    current_date = datetime.now(timezone.utc)

    for p in projects:
        state = p.get("state")
        if not state:
            continue
        
        if state not in state_data:
            state_data[state] = {
                "state": state,
                "total_projects": 0,
                "completed_projects": 0,
                "delayed_projects": 0,
                "total_sanctioned_amount": 0,
                "total_released_amount": 0,
                "unique_mps": set(),
                "flagged_projects": 0,
                "critical": 0,
                "high_risk": 0,
                "medium_risk": 0,
                "normal": 0,
                "sum_anomaly_score": 0.0,
                "anomaly_count": 0
            }

        sd = state_data[state]
        sd["total_projects"] += 1
        
        if p.get("status") == "Completed":
            sd["completed_projects"] += 1
        
        # Calculate delay: status is In Progress and > 1 year old
        if p.get("status") == "In Progress" and p.get("sanction_date"):
            try:
                # Handle YYYY-MM-DD
                s_date = datetime.strptime(p["sanction_date"], "%Y-%m-%d").replace(tzinfo=timezone.utc)
                if (current_date - s_date).days > 365:
                    sd["delayed_projects"] += 1
            except Exception:
                pass

        sd["total_sanctioned_amount"] += p.get("sanctioned_amount", 0) or 0
        sd["total_released_amount"] += p.get("released_amount", 0) or 0
        
        if p.get("mp_name"):
            sd["unique_mps"].add(p["mp_name"])

        anomaly = anomalies.get(p["work_id"])
        if anomaly:
            if anomaly["flagged_by_model"]:
                sd["flagged_projects"] += 1
            
            risk = anomaly["risk_level"]
            if risk == "Critical":
                sd["critical"] += 1
            elif risk in ("High Risk", "High"):
                sd["high_risk"] += 1
            elif risk in ("Medium Risk", "Medium"):
                sd["medium_risk"] += 1
            elif risk == "Normal":
                sd["normal"] += 1

            # For avg_anomaly_score
            sd["sum_anomaly_score"] += float(anomaly.get("ensemble_score") or 0.0)
            sd["anomaly_count"] += 1

    # Convert sets to lengths and averages
    for state, data in state_data.items():
        data["unique_mps"] = len(data["unique_mps"])
        data["avg_anomaly_score"] = data["sum_anomaly_score"] / data["anomaly_count"] if data["anomaly_count"] > 0 else 0.0
        del data["sum_anomaly_score"]
        del data["anomaly_count"]

    return {
        "count": len(state_data),
        "states": list(state_data.values())
    }

@app.get("/dashboard/district-summary")
def district_summary(state: str):
    """Aggregates project data by district for a specific state, returning real financial numbers."""
    from datetime import datetime, timezone
    
    # 1. Fetch all projects for this state
    projects_resp = supabase.table("projects").select("*").ilike("state", state).execute()
    projects = projects_resp.data

    # 2. Fetch all anomalies
    anomalies_resp = supabase.table("anomaly_results").select("work_id, risk_level, flagged_by_model, ensemble_score").execute()
    anomalies = {item["work_id"]: item for item in anomalies_resp.data}

    district_data = {}
    current_date = datetime.now(timezone.utc)

    for p in projects:
        district = p.get("district")
        if not district:
            continue
        
        if district not in district_data:
            district_data[district] = {
                "district": district,
                "total_projects": 0,
                "completed_projects": 0,
                "delayed_projects": 0,
                "total_sanctioned_amount": 0,
                "total_released_amount": 0,
                "unique_mps": set(),
                "flagged_projects": 0,
                "critical": 0,
                "high_risk": 0,
                "medium_risk": 0,
                "normal": 0,
                "sum_anomaly_score": 0.0,
                "anomaly_count": 0
            }

        dd = district_data[district]
        dd["total_projects"] += 1
        
        if p.get("status") == "Completed":
            dd["completed_projects"] += 1
        
        # Calculate delay
        if p.get("status") == "In Progress" and p.get("sanction_date"):
            try:
                s_date = datetime.strptime(p["sanction_date"], "%Y-%m-%d").replace(tzinfo=timezone.utc)
                if (current_date - s_date).days > 365:
                    dd["delayed_projects"] += 1
            except Exception:
                pass

        dd["total_sanctioned_amount"] += p.get("sanctioned_amount", 0) or 0
        dd["total_released_amount"] += p.get("released_amount", 0) or 0
        
        if p.get("mp_name"):
            dd["unique_mps"].add(p["mp_name"])

        anomaly = anomalies.get(p["work_id"])
        if anomaly:
            if anomaly["flagged_by_model"]:
                dd["flagged_projects"] += 1
            
            risk = anomaly["risk_level"]
            if risk == "Critical":
                dd["critical"] += 1
            elif risk in ("High Risk", "High"):
                dd["high_risk"] += 1
            elif risk in ("Medium Risk", "Medium"):
                dd["medium_risk"] += 1
            elif risk == "Normal":
                dd["normal"] += 1

            dd["sum_anomaly_score"] += float(anomaly.get("ensemble_score") or 0.0)
            dd["anomaly_count"] += 1

    # Convert sets to lengths and averages
    for district, data in district_data.items():
        data["unique_mps"] = len(data["unique_mps"])
        data["avg_anomaly_score"] = data["sum_anomaly_score"] / data["anomaly_count"] if data["anomaly_count"] > 0 else 0.0
        del data["sum_anomaly_score"]
        del data["anomaly_count"]

    return {
        "count": len(district_data),
        "districts": list(district_data.values())
    }
@app.get("/dashboard/category-summary")
def category_summary():

    # Get all projects using pagination
    projects = []

    start = 0
    batch_size = 1000

    while True:

        response = (
            supabase
            .table("projects")
            .select("work_id, work_category")
            .range(start, start + batch_size - 1)
            .execute()
        )

        batch = response.data
        projects.extend(batch)

        if len(batch) < batch_size:
            break

        start += batch_size

    # Get all anomaly results
    anomalies = []

    start = 0

    while True:

        response = (
            supabase
            .table("anomaly_results")
            .select(
                "work_id, risk_level, flagged_by_model"
            )
            .range(start, start + batch_size - 1)
            .execute()
        )

        batch = response.data
        anomalies.extend(batch)

        if len(batch) < batch_size:
            break

        start += batch_size

    # Create category structure
    category_data = {}

    for project in projects:

        category = project["work_category"]

        if category not in category_data:

            category_data[category] = {
                "work_category": category,
                "total_projects": 0,
                "flagged_projects": 0,
                "critical": 0,
                "high_risk": 0,
                "medium_risk": 0,
                "normal": 0
            }

        category_data[category]["total_projects"] += 1

    # Create anomaly lookup
    anomaly_lookup = {
        item["work_id"]: item
        for item in anomalies
    }

    # Match ML results
    for project in projects:

        category = project["work_category"]
        work_id = project["work_id"]

        anomaly = anomaly_lookup.get(work_id)

        if not anomaly:
            continue

        if anomaly["flagged_by_model"]:
            category_data[category]["flagged_projects"] += 1

        risk = anomaly["risk_level"]

        if risk == "Critical":
            category_data[category]["critical"] += 1

        elif risk == "High Risk":
            category_data[category]["high_risk"] += 1

        elif risk == "Medium Risk":
            category_data[category]["medium_risk"] += 1

        elif risk == "Normal":
            category_data[category]["normal"] += 1

    return {
        "count": len(category_data),
        "categories": list(category_data.values())
    }
@app.get("/dashboard/risk-summary")
def risk_summary():

    risk_counts = {
        "Critical": 0,
        "High Risk": 0,
        "Medium Risk": 0,
        "Normal": 0
    }

    flagged_projects = 0
    total_projects = 0

    start = 0
    batch_size = 1000

    while True:

        response = (
            supabase
            .table("anomaly_results")
            .select(
                "risk_level, flagged_by_model"
            )
            .range(start, start + batch_size - 1)
            .execute()
        )

        batch = response.data

        for item in batch:

            total_projects += 1

            risk = item["risk_level"]

            if risk in risk_counts:
                risk_counts[risk] += 1

            if item["flagged_by_model"]:
                flagged_projects += 1

        if len(batch) < batch_size:
            break

        start += batch_size

    return {
        "total_projects": total_projects,
        "flagged_projects": flagged_projects,
        "critical": risk_counts["Critical"],
        "high_risk": risk_counts["High Risk"],
        "medium_risk": risk_counts["Medium Risk"],
        "normal": risk_counts["Normal"]
    }
@app.get("/dashboard/anomaly-reasons")
def anomaly_reasons():

    reasons = {}

    start = 0
    batch_size = 1000

    while True:

        response = (
            supabase
            .table("anomaly_results")
            .select("top_flag_reasons")
            .eq("flagged_by_model", True)
            .range(start, start + batch_size - 1)
            .execute()
        )

        batch = response.data

        for item in batch:

            reason_text = item["top_flag_reasons"]

            if not reason_text:
                continue

            reason_list = [
                reason.strip()
                for reason in reason_text.split(",")
            ]

            for reason in reason_list:

                if reason not in reasons:
                    reasons[reason] = 0

                reasons[reason] += 1

        if len(batch) < batch_size:
            break

        start += batch_size

    return {
        "count": len(reasons),
        "reasons": [
            {
                "reason": reason,
                "count": count
            }
            for reason, count in sorted(
                reasons.items(),
                key=lambda x: x[1],
                reverse=True
            )
        ]
    }
@app.get("/dashboard/top-risk-projects")
def top_risk_projects(limit: int = 10):

    # ---------------------------------
    # Validate limit
    # ---------------------------------

    if limit < 1:
        limit = 10

    if limit > 50:
        limit = 50

    # ---------------------------------
    # Get highest-risk ML results
    # ---------------------------------

    anomaly_response = (
        supabase
        .table("anomaly_results")
        .select("*")
        .eq("flagged_by_model", True)
        .order("ensemble_score", desc=True)
        .limit(limit)
        .execute()
    )

    anomalies = anomaly_response.data

    # ---------------------------------
    # Get corresponding projects
    # ---------------------------------

    work_ids = [
        item["work_id"]
        for item in anomalies
    ]

    projects = {}

    if work_ids:

        project_response = (
            supabase
            .table("projects")
            .select(
                "work_id, mp_name, state, district, "
                "work_category, status, sanctioned_amount, "
                "released_amount"
            )
            .in_("work_id", work_ids)
            .execute()
        )

        projects = {
            item["work_id"]: item
            for item in project_response.data
        }

    # ---------------------------------
    # Combine project + ML information
    # ---------------------------------

    results = []

    for anomaly in anomalies:

        work_id = anomaly["work_id"]

        project = projects.get(work_id)

        if not project:
            continue

        results.append({
            "work_id": work_id,
            "mp_name": project["mp_name"],
            "state": project["state"],
            "district": project["district"],
            "work_category": project["work_category"],
            "status": project["status"],
            "sanctioned_amount": project["sanctioned_amount"],
            "released_amount": project["released_amount"],
            "risk_level": anomaly["risk_level"],
            "ensemble_score": anomaly["ensemble_score"],
            "top_flag_reasons": anomaly["top_flag_reasons"],
            "network_risk_flag": anomaly["network_risk_flag"]
        })

    return {
        "count": len(results),
        "projects": results
    }
@app.get("/dashboard/vendor-risk")
def vendor_risk():

    # ---------------------------------
    # Get all projects
    # ---------------------------------

    projects = []

    start = 0
    batch_size = 1000

    while True:

        response = (
            supabase
            .table("projects")
            .select(
                "work_id, vendor_id, sanctioned_amount"
            )
            .range(start, start + batch_size - 1)
            .execute()
        )

        batch = response.data
        projects.extend(batch)

        if len(batch) < batch_size:
            break

        start += batch_size

    # ---------------------------------
    # Get vendor information
    # ---------------------------------

    vendor_response = (
        supabase
        .table("vendors")
        .select("vendor_id, vendor_name")
        .execute()
    )

    vendors = {
        item["vendor_id"]: item["vendor_name"]
        for item in vendor_response.data
    }

    # ---------------------------------
    # Get anomaly results
    # ---------------------------------

    anomalies = []

    start = 0

    while True:

        response = (
            supabase
            .table("anomaly_results")
            .select(
                "work_id, flagged_by_model, "
                "risk_level"
            )
            .range(start, start + batch_size - 1)
            .execute()
        )

        batch = response.data
        anomalies.extend(batch)

        if len(batch) < batch_size:
            break

        start += batch_size

    anomaly_lookup = {
        item["work_id"]: item
        for item in anomalies
    }

    # ---------------------------------
    # Build vendor statistics
    # ---------------------------------

    vendor_data = {}

    for project in projects:

        vendor_id = project["vendor_id"]

        if vendor_id is None:
            continue

        if vendor_id not in vendor_data:

            vendor_data[vendor_id] = {
                "vendor_id": vendor_id,
                "vendor_name": vendors.get(
                    vendor_id,
                    "Unknown"
                ),
                "total_projects": 0,
                "total_sanctioned_amount": 0,
                "flagged_projects": 0,
                "critical": 0,
                "high_risk": 0,
                "medium_risk": 0
            }

        data = vendor_data[vendor_id]

        data["total_projects"] += 1

        data["total_sanctioned_amount"] += (
            project["sanctioned_amount"] or 0
        )

        anomaly = anomaly_lookup.get(
            project["work_id"]
        )

        if anomaly:

            if anomaly["flagged_by_model"]:
                data["flagged_projects"] += 1

            if anomaly["risk_level"] == "Critical":
                data["critical"] += 1

            elif anomaly["risk_level"] == "High Risk":
                data["high_risk"] += 1

            elif anomaly["risk_level"] == "Medium Risk":
                data["medium_risk"] += 1

    # ---------------------------------
    # Calculate risk percentage
    # ---------------------------------

    results = []

    for data in vendor_data.values():

        total = data["total_projects"]

        data["risk_percentage"] = round(
            (data["flagged_projects"] / total) * 100,
            2
        ) if total > 0 else 0

        results.append(data)

    # ---------------------------------
    # Sort by flagged projects
    # ---------------------------------

    results.sort(
        key=lambda x: (
            x["flagged_projects"],
            x["total_sanctioned_amount"]
        ),
        reverse=True
    )

    return {
        "count": len(results),
        "vendors": results
    }
@app.get("/dashboard/agency-risk")
def agency_risk():

    # ---------------------------------
    # Get all projects
    # ---------------------------------

    projects = []

    start = 0
    batch_size = 1000

    while True:

        response = (
            supabase
            .table("projects")
            .select(
                "work_id, agency_id, sanctioned_amount"
            )
            .range(start, start + batch_size - 1)
            .execute()
        )

        batch = response.data
        projects.extend(batch)

        if len(batch) < batch_size:
            break

        start += batch_size

    # ---------------------------------
    # Get agency information
    # ---------------------------------

    agency_response = (
        supabase
        .table("implementing_agencies")
        .select("agency_id, agency_name")
        .execute()
    )

    agencies = {
        item["agency_id"]: item["agency_name"]
        for item in agency_response.data
    }

    # ---------------------------------
    # Get anomaly results
    # ---------------------------------

    anomalies = []

    start = 0

    while True:

        response = (
            supabase
            .table("anomaly_results")
            .select(
                "work_id, flagged_by_model, "
                "risk_level"
            )
            .range(start, start + batch_size - 1)
            .execute()
        )

        batch = response.data
        anomalies.extend(batch)

        if len(batch) < batch_size:
            break

        start += batch_size

    anomaly_lookup = {
        item["work_id"]: item
        for item in anomalies
    }

    # ---------------------------------
    # Build agency statistics
    # ---------------------------------

    agency_data = {}

    for project in projects:

        agency_id = project["agency_id"]

        if agency_id is None:
            continue

        if agency_id not in agency_data:

            agency_data[agency_id] = {
                "agency_id": agency_id,
                "agency_name": agencies.get(
                    agency_id,
                    "Unknown"
                ),
                "total_projects": 0,
                "total_sanctioned_amount": 0,
                "flagged_projects": 0,
                "critical": 0,
                "high_risk": 0,
                "medium_risk": 0
            }

        data = agency_data[agency_id]

        data["total_projects"] += 1

        data["total_sanctioned_amount"] += (
            project["sanctioned_amount"] or 0
        )

        anomaly = anomaly_lookup.get(
            project["work_id"]
        )

        if anomaly:

            if anomaly["flagged_by_model"]:
                data["flagged_projects"] += 1

            if anomaly["risk_level"] == "Critical":
                data["critical"] += 1

            elif anomaly["risk_level"] == "High Risk":
                data["high_risk"] += 1

            elif anomaly["risk_level"] == "Medium Risk":
                data["medium_risk"] += 1

    # ---------------------------------
    # Calculate risk percentage
    # ---------------------------------

    results = []

    for data in agency_data.values():

        total = data["total_projects"]

        data["risk_percentage"] = round(
            (data["flagged_projects"] / total) * 100,
            2
        ) if total > 0 else 0

        results.append(data)

    # ---------------------------------
    # Sort by flagged projects
    # ---------------------------------

    results.sort(
        key=lambda x: (
            x["flagged_projects"],
            x["total_sanctioned_amount"]
        ),
        reverse=True
    )

    return {
        "count": len(results),
        "agencies": results
    }


import asyncio

@app.on_event("startup")
async def startup_event():
    # Load data in the background so the API boots up instantly
    loop = asyncio.get_event_loop()
    loop.run_in_executor(None, insights_store.load_data)


@app.get("/dashboard/insights/national-trend")
def get_national_trend():
    return insights_store.get_national_trend()


@app.get("/dashboard/insights/projects-requiring-attention")
def get_projects_requiring_attention():
    return insights_store.get_projects_requiring_attention()


@app.get("/dashboard/insights/delay-intelligence")
def get_delay_intelligence():
    return insights_store.get_delay_intelligence()


@app.get("/dashboard/insights/geographic-performance")
def get_geographic_performance():
    return insights_store.get_geographic_performance()


@app.get("/dashboard/insights/work-categories")
def get_work_categories():
    return insights_store.get_work_categories()


@app.get("/dashboard/insights/mp-portfolios")
def get_mp_portfolios():
    return insights_store.get_mp_portfolios()


@app.get("/dashboard/insights/demographics")
def get_demographics():
    return insights_store.get_demographics()



@app.get("/dashboard/insights/statistical-outliers")
def get_statistical_outliers():
    return insights_store.get_statistical_outliers()


# ── New Insights Endpoints (Revamped Dashboard) ────────────────────

@app.get("/dashboard/insights/utilization-by-mp")
def get_utilization_by_mp(year: str = None, state: str = None, mp_name: str = None, work_category: str = None):
    filters = {"year": year, "state": state, "mp_name": mp_name, "work_category": work_category}
    return insights_store.get_utilization_by_mp(filters=filters)

@app.get("/dashboard/insights/time-to-release")
def get_time_to_release(year: str = None, state: str = None, mp_name: str = None, work_category: str = None):
    filters = {"year": year, "state": state, "mp_name": mp_name, "work_category": work_category}
    return insights_store.get_time_to_release_histogram(filters=filters)

@app.get("/dashboard/insights/sanction-completion-bubble")
def get_sanction_completion_bubble(year: str = None, state: str = None, mp_name: str = None, work_category: str = None):
    filters = {"year": year, "state": state, "mp_name": mp_name, "work_category": work_category}
    return insights_store.get_sanction_completion_bubble(filters=filters)

@app.get("/dashboard/insights/sanctioned-by-state")
def get_sanctioned_by_state(year: str = None, state: str = None, mp_name: str = None, work_category: str = None):
    filters = {"year": year, "state": state, "mp_name": mp_name, "work_category": work_category}
    return insights_store.get_sanctioned_by_state(filters=filters)

@app.get("/dashboard/insights/sc-st-comparison")
def get_sc_st_comparison(year: str = None, state: str = None, mp_name: str = None, work_category: str = None):
    filters = {"year": year, "state": state, "mp_name": mp_name, "work_category": work_category}
    return insights_store.get_sc_st_comparison(filters=filters)

@app.get("/dashboard/insights/category-mix-by-state")
def get_category_mix_by_state(year: str = None, state: str = None, mp_name: str = None, work_category: str = None):
    filters = {"year": year, "state": state, "mp_name": mp_name, "work_category": work_category}
    return insights_store.get_category_mix_by_state(filters=filters)

@app.get("/dashboard/insights/mp-leaderboard")
def get_mp_leaderboard(year: str = None, state: str = None, mp_name: str = None, work_category: str = None):
    filters = {"year": year, "state": state, "mp_name": mp_name, "work_category": work_category}
    return insights_store.get_mp_leaderboard(filters=filters)

@app.get("/dashboard/insights/house-comparison")
def get_house_comparison(year: str = None, state: str = None, mp_name: str = None, work_category: str = None):
    filters = {"year": year, "state": state, "mp_name": mp_name, "work_category": work_category}
    return insights_store.get_house_comparison(filters=filters)

@app.get("/dashboard/insights/amount-vs-photos")
def get_amount_vs_photos(year: str = None, state: str = None, mp_name: str = None, work_category: str = None):
    filters = {"year": year, "state": state, "mp_name": mp_name, "work_category": work_category}
    return insights_store.get_amount_vs_photos(filters=filters)

@app.get("/dashboard/insights/repeated-descriptions")
def get_repeated_descriptions(year: str = None, state: str = None, mp_name: str = None, work_category: str = None):
    filters = {"year": year, "state": state, "mp_name": mp_name, "work_category": work_category}
    return insights_store.get_repeated_descriptions(filters=filters)

@app.get("/dashboard/insights/project-pipeline")
def get_project_pipeline(year: str = None, state: str = None, mp_name: str = None, work_category: str = None):
    filters = {"year": year, "state": state, "mp_name": mp_name, "work_category": work_category}
    return insights_store.get_project_pipeline(filters=filters)

@app.get("/dashboard/insights/stalled-projects")
def get_stalled_projects(year: str = None, state: str = None, mp_name: str = None, work_category: str = None):
    filters = {"year": year, "state": state, "mp_name": mp_name, "work_category": work_category}
    return insights_store.get_stalled_projects(filters=filters)

@app.get("/dashboard/insights/flag-reasons")
def get_flag_reasons(year: str = None, state: str = None, mp_name: str = None, work_category: str = None):
    filters = {"year": year, "state": state, "mp_name": mp_name, "work_category": work_category}
    return insights_store.get_flag_reasons_frequency(filters=filters)

@app.get("/dashboard/insights/flag-rate-cross-tab")
def get_flag_rate_cross_tab(year: str = None, state: str = None, mp_name: str = None, work_category: str = None):
    filters = {"year": year, "state": state, "mp_name": mp_name, "work_category": work_category}
    return insights_store.get_flag_rate_cross_tab(filters=filters)


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
