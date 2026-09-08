const API_BASE_URL = "http://127.0.0.1:8000";

export async function getDashboardOverview() {
  const response = await fetch(`${API_BASE_URL}/dashboard/overview`);

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard overview");
  }

  return response.json();
}
export async function getProjects(page: number = 1, limit: number = 10) {
  const response = await fetch(
    `${API_BASE_URL}/projects/search?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
}
export async function getAnomalies() {
  const response = await fetch(`${API_BASE_URL}/anomalies`);

  if (!response.ok) {
    throw new Error("Failed to fetch anomalies");
  }

  return response.json();
}
export async function getReviewQueue() {
  const response = await fetch(
    `${API_BASE_URL}/dashboard/review-queue`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch review queue");
  }

  return response.json();
}
export async function getProjectExplanation(workId: string) {
  const response = await fetch(
    `${API_BASE_URL}/projects/${encodeURIComponent(workId)}/explanation`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch project explanation");
  }

  return response.json();
}