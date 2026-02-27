"use client";

import { useAdminUsers } from "@/src/hooks/useAdminUsers";
import { DynamicTable } from "./Table";
import Loader from "../ui/Loader";

export default function UsersTable() {
  const { users, loading, handleDeleteUser } = useAdminUsers();

  if (loading) return <Loader />;

  return (
    <DynamicTable
      data={users ?? []}
      hiddenKeys={["password", "id"]}
      onDelete={(id) => handleDeleteUser(id as string)}
    />
  );
}
