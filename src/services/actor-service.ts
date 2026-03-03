import { Actor } from "@/generated/prisma/browser";

export async function fetchActors() {
  const res = await fetch("/api/actors");
  return await res.json();
}

export async function fetchActorById(id: number) {
  const res = await fetch(`/api/actors/${id}`);
  return await res.json();
}

export async function deleteActor(token: string | null, id: number) {
  if (!token) throw new Error("Token is required");
  if (!id) throw new Error("User ID is required!");

  const res = await fetch(`/api/actors/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
}

export async function addActor(token: string | null, body: Partial<Actor>) {
  if (!token) throw new Error("Token is required");

  const res = await fetch("/api/actors/", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
}

export async function updateActor(
  token: string | null,
  body: Partial<Actor>,
  id: number,
) {
  if (!token) throw new Error("Token is required");
  if (!id) throw new Error("User ID is required!");

  const res = await fetch(`/api/actors/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
}
