export async function updatePassword(token: string, password: string) {
  const res = await fetch(`${window.location.origin}/api/users`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password }),
    cache: "no-store"
  });

  return res.json();
}
