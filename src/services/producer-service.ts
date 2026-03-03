import { Producer } from "@/generated/prisma/browser";

export async function getProducers() {
  const res = await fetch("/api/producer");

  if (!res.ok) {
    throw new Error("Failed to fetch producers");
  }

  const data = await res.json();

  if (!data.ok) {
    throw new Error(data.message);
  }

  return data.data;
}

export async function deleteProducer(token: string | null, id: number) {
  const res = await fetch(`/api/producer/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch producers");
  }

  const data = await res.json();

  if (!data.ok) {
    throw new Error(data.message);
  }

  console.log(data);

  return data.message || [];
}

export async function updateProducer(
  token: string | null,
  id: number,
  producer: Partial<Producer>,
) {
  const res = await fetch(`/api/producer/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(producer),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data?.message ?? "Failed to update producer");
  if (!data.ok) throw new Error(data.message ?? "Failed to update producer");
  if (!data.data) throw new Error("No producer returned from API");

  return data.data as Producer;
}

export async function addProducer(
  token: string | null,
  producer: Partial<Producer>,
) {
  const res = await fetch("/api/producer/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(producer),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data?.message ?? "Failed to update producer");
  if (!data.ok) throw new Error(data.message ?? "Failed to update producer");
  if (!data.data) throw new Error("No producer returned from API");

  return data;
}
