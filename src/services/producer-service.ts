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
  const res = await fetch("/api/producer", {
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

  return data.message || [];
}

