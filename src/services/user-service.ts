export async function getCurrentUser(token: string) {
  const res = await fetch(`${window.location.origin}/api/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store"
  });

  return res.json();
}

export async function updateProfileSettings(token: string, data: { firstName?: string; lastName?: string; email?: string }) {
  const res = await fetch(`${window.location.origin}/api/users`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    cache: "no-store"
  });

  return res.json();
}
