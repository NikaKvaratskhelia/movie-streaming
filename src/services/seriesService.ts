import { Series } from "@/generated/prisma/browser";

export async function fetchSeries() {
  const res = await fetch("/api/series");
  return await res.json();
}

export async function fetchSeriesById(id: number) {
  const res = await fetch(`/api/series/${id}`);
  return await res.json();
}

export async function deleteSeries(id: number) {
  const res = await fetch(`/api/series/${id}`, {
    method: "DELETE",
  });
  return await res.json();
}

export async function addSeries(series: Series) {
  const res = await fetch("/api/series", {
    method: "POST",
    body: JSON.stringify(series),
  });

  const data = await res.json();
  return await data;
}

export async function updateSeries(id: number, series: Partial<Series>) {
  const res = await fetch(`/api/series/${id}`, {
    method: "PUT",
    body: JSON.stringify(series),
  });
  return await res.json();
}

export const fetchSeasonsCount = async (seriesId: number): Promise<number> => {
  try {
    const response = await fetch(`/api/series/${seriesId}/seasons-count`);

    if (!response.ok) {
      throw new Error("Failed to fetch seasons count");
    }

    const result = await response.json();
    return result.data.seasonsCount || 0;
  } catch (error) {
    console.error("Error fetching seasons count:", error);
    return 0;
  }
};
