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

  console.log(data);
  return data;

  
}
