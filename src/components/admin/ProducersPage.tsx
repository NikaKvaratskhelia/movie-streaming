"use client";

import { useState } from "react";
import { Table } from "./Table";
import type { Producer } from "@/generated/prisma/browser";
import { useProducers } from "@/src/hooks/useProducers";
import ProducerForm from "./ProducerForm";
import Loader from "../ui/Loader";

export default function ProducersPage() {
  const { producers, removeProducer, updateProducer, isUpdatingProducer } =
    useProducers();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Producer | null>(null);

  if (isUpdatingProducer) return <Loader loadingProp={true}/>;

  return (
    <>
      <Table
        title="Producers"
        data={producers}
        columns={[
          { header: "ID", accessor: "id" },
          { header: "Full name", accessor: "fullName" },
          { header: "Nationality", accessor: "nationality" },
          { header: "Date of Birth", accessor: "dateOfBirth" },
          { header: "Debut Year", accessor: "debutYear" },
        ]}
        onAdd={() => {
          setFormData(null);
          setShowForm(true);
        }}
        onEdit={(p) => {
          setFormData(p);
          setShowForm(true);
        }}
        onDelete={(p) => removeProducer(p.id)}
      />

      <ProducerForm
        open={showForm}
        onOpenChange={setShowForm}
        mode={formData ? "edit" : "add"}
        data={formData ?? undefined}
        onUpdate={(id: number, d: Partial<Producer>) =>
          updateProducer({ id, producer: d })
        }
        onAdd={()=>console.log("daemata")}
      />
    </>
  );
}
