"use client";

import { useState } from "react";
import type { Actor } from "@/generated/prisma/browser";

import { Table } from "./Table";
import ActorsForm from "./ActorsForm";
import { useActors } from "@/src/hooks/useActor";
import Loader from "../ui/Loader";

export default function ActorsPage() {
  const {
    actors,
    removeActor,
    addActor,
    updateActor,
    isAddingActor,
    isRemovingActor,
    isUpdatingActor,
  } = useActors();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Actor | null>(null);

  if (isAddingActor || isRemovingActor || isUpdatingActor)
    return <Loader loadingProp={true} />;

  return (
    <>
      <Table
        title="Actors"
        data={actors}
        columns={[
          { header: "Full Name", accessor: "fullName" },
          { header: "Nationality", accessor: "nationality" },
          {
            header: "Date of Birth",
            accessor: (a) => {
              const d = a.dateOfBirth ? new Date(a.dateOfBirth) : null;
              return d && !Number.isNaN(d.getTime())
                ? d.toLocaleDateString()
                : "-";
            },
          },
          { header: "Debut Year", accessor: "debutYear" },
        ]}
        onAdd={() => {
          setFormData(null);
          setShowForm(true);
        }}
        onEdit={(a) => {
          setFormData(a);
          setShowForm(true);
        }}
        onDelete={(a) => removeActor(a.id)}
      />

      <ActorsForm
        open={showForm}
        onOpenChange={setShowForm}
        mode={formData ? "edit" : "add"}
        data={formData ?? undefined}
        onAdd={(d) => addActor(d)}
        onUpdate={(id, d) => updateActor({ data: d, id })}
      />
    </>
  );
}
