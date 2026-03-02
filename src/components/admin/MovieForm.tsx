"use client";
import Input from "../ui/Input";
import type { Movie, Producer } from "@/generated/prisma/browser";
import Textarea from "../ui/Textarea";
import Select from "../ui/Select";
import { useProducers } from "@/src/hooks/useProducers";
import { X } from "lucide-react";

type MovieFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "edit" | "add";
  entityName: string;
  data?: Movie | null;
};

export default function MovieForm({
  open,
  onOpenChange,
  mode,
  entityName,
  data,
}: MovieFormProps) {
  const { producers } = useProducers();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="bg-[#15181f] p-6 rounded-lg max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-between items-center mb-3">
          <h3 className="text-2xl font-semibold">Movie</h3>
          <X onClick={() => onOpenChange(false)} className="cursor-pointer" />
        </div>

        <form className="flex flex-col gap-4">
          <Input
            id={"title"}
            type={"text"}
            label={"Title"}
            value={data?.title ?? ""}
            placeholder={"Interstellar..."}
          />
          <Textarea label={"Description"} id={"description"} />
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            }}
          >
            <Input
              id={"yearPublished"}
              type={"text"}
              label={"Year (YYYY)"}
              value={data?.yearPublished?.toString() ?? ""}
              placeholder={"Year Published: "}
            />
            <Input
              id={"duration"}
              type={"text"}
              label={"Duration (min)"}
              value={
                data?.duration != null
                  ? Math.floor(data.duration / 60).toString()
                  : ""
              }
              placeholder={"Duration"}
            />
          </div>{" "}
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            }}
          >
            <Input
              id={"rating"}
              type={"number"}
              label={"Rating (0-10)"}
              value={data?.rating?.toString() ?? ""}
              min={0}
              max={10}
              placeholder={"8.7"}
            />
            <Select
              label="Producers"
              valueId={data?.producerId ?? null}
              options={(producers ?? []).map((p: Producer) => ({
                id: p.id,
                label: p.fullName,
              }))}
            />
          </div>
          <Input
            id="genres"
            type={"text"}
            label={"Genres (comma-seperated)"}
            value={data?.genres.join(", ") ?? ""}
            placeholder={"Action, Drama..."}
          />
          <Input
            id="coverPhoto"
            type={"text"}
            label={"Cover Photo"}
            value={data?.coverPhoto ?? ""}
            placeholder={"https://..."}
          />
        </form>
      </div>
    </div>
  );
}
