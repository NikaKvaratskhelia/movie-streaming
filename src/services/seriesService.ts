import { Series } from "@/generated/prisma/browser";

export async function fetchSeries() {
  const res = await fetch("/api/series");
  return await res.json();
}

export async function fetchSeriesById(id: number | null) {
  if (!id) throw new Error("Id is required!");
  const res = await fetch(`/api/series/${id}`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
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
