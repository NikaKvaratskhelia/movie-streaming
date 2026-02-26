"use client";

import { useAdminUsers } from "@/src/hooks/useAdminUsers";
import { DynamicTable } from "./Table";
import { Loader } from "lucide-react";

export default function UsersTable() {
  const { users, loading, handleDeleteUser, deleting } = useAdminUsers();

  if (loading || deleting) return <Loader />;

  return (
    <DynamicTable
      data={users ?? []}
      hiddenKeys={["password", "id"]}
      onDelete={(id) => handleDeleteUser(id as string)}
    />
  );
}
