export async function getCurrentUser(token: string) {
  const res = await fetch("/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}
