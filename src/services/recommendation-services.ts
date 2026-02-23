export async function getRecommendations(token: string | null) {
  const headers: HeadersInit | undefined = token
    ? { Authorization: `Bearer ${token}` }
    : undefined;

  const res = await fetch("/api/recommendations", { headers });

  if (!res.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  const { data } = await res.json();

  return data;
}
