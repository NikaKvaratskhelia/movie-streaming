import { Actor } from "@/generated/prisma/browser";

export async function fetchActors() {
  const res = await fetch("/api/actors");
  return await res.json();
}

export async function fetchActorById(id: number) {
  const res = await fetch(`/api/actors/${id}`);
  return await res.json();
}
