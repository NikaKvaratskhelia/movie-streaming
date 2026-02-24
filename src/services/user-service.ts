export async function getCurrentUser(token: string | null) {
  if (!token) throw new Error("Token is required!");

  const res = await fetch("/api/users", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message ?? "Request failed");
  }

  const { user } = await res.json();

  return user;
}

export async function updateProfileSettings(
  token: string | null,
  data: Partial<{
    firstName: string;
    lastName: string;
    email: string;
  }>,
) {
  if (!token) throw new Error("Token is required!");

  const res = await fetch("/api/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message ?? "Request failed");
  }

  return res.json();
}

export async function updatePassword(
  token: string | null,
  oldPass: string,
  newPass: string,
) {
  if (!token) throw new Error("Token is required!");

  const res = await fetch("/api/users/password", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ oldPass, newPass }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message ?? "Request failed");
  }

  return res.json();
}

export async function deleteProfile(token: string | null, pass: string | null) {
  if (!token || !pass || pass.length === 0)
    throw new Error("Missing required fields!");

  if (!pass || pass === "") {
    throw new Error("Password is required!");
  }

  const res = await fetch("/api/users/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ pass }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? "Request failed");
  }

  return data.message;
}
