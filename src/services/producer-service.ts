interface ApiResponse<T> {
  message: string;
  ok: boolean;
  data?: T;
}

export async function getProducers() {
  const res = await fetch("/api/producer");

  if (!res.ok) {
    throw new Error("Failed to fetch producers");
  }

  const data: ApiResponse<any[]> = await res.json();

  if (!data.ok) {
    throw new Error(data.message);
  }

  return data.data || [];
}
