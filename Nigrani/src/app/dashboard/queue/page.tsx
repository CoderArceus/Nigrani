import { API_BASE_URL } from "@/lib/api";
import QueueClient from "@/components/QueueClient";

export const dynamic = "force-dynamic";

export default async function ReviewQueuePage() {
  let initialData: any[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(`${API_BASE_URL}/dashboard/review-queue`);
    if (!res.ok) {
      throw new Error("Failed to fetch review queue");
    }
    const data = await res.json();
    initialData = data.projects || [];
  } catch (err) {
    console.error("Error fetching review queue data:", err);
    error = "Unable to load review queue";
  }

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  return <QueueClient initialData={initialData} />;
}
