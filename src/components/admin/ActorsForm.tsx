"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import z from "zod";

import Input from "../ui/Input";
import type { Actor } from "@/generated/prisma/browser";

type ActorFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (data: Partial<Actor>) => void;
  onUpdate: (id: number, data: Partial<Actor>) => void;
  mode: "edit" | "add";
  data?: Actor | null;
};

const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  nationality: z.string().min(1, "Nationality is required"),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((v) => !Number.isNaN(Date.parse(v)), "Invalid date format")
    .transform((v) => new Date(v)),
  debutYear: z.coerce.number().int().min(1800, "Debut year is too old"),
});

type FormState = {
  fullName: string;
  nationality: string;
  dateOfBirth: string;
  debutYear: string;
};

function toISODateInputValue(value: Date | string): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

export default function ActorForm({
  open,
  onOpenChange,
  onAdd,
  onUpdate,
  mode,
  data,
}: ActorFormProps) {
  const initialValues = useMemo<FormState>(() => {
    if (mode === "edit" && data) {
      return {
        fullName: data.fullName ?? "",
        nationality: data.nationality ?? "",
        dateOfBirth: data.dateOfBirth
          ? toISODateInputValue(data.dateOfBirth)
          : "",
        debutYear: String(data.debutYear ?? ""),
      };
    }

    return {
      fullName: "",
      nationality: "",
      dateOfBirth: "",
      debutYear: "",
    };
  }, [mode, data]);

  const [values, setValues] = useState<FormState>(initialValues);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValues(initialValues);
    setError(null);
  }, [open, initialValues]);

  const setField = (key: keyof FormState, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const key = e.currentTarget.id as keyof FormState;
    setField(key, e.currentTarget.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setError(null);

    const parsed = formSchema.safeParse(values);

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid form");
      return;
    }

    const payload: Partial<Actor> = {
      fullName: parsed.data.fullName,
      nationality: parsed.data.nationality,
      dateOfBirth: parsed.data.dateOfBirth,
      debutYear: parsed.data.debutYear,
    };

    if (mode === "add") {
      onAdd(payload);
      onOpenChange(false);
      return;
    }

    if (!data) {
      setError("Edit mode requires data");
      return;
    }

    onUpdate(data.id, payload);
    onOpenChange(false);
  };

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
          <h3 className="text-2xl font-semibold">Actor</h3>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Close"
          >
            <X className="cursor-pointer" />
          </button>
        </div>

        {error && (
          <div className="mb-3 rounded-md border border-red-700/60 bg-red-700/10 px-3 py-2 text-sm text-red-200">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            id="fullName"
            type="text"
            label="Full Name"
            value={values.fullName}
            placeholder="Leonardo DiCaprio"
            onChange={handleTextChange}
          />

          <Input
            id="nationality"
            type="text"
            label="Nationality"
            value={values.nationality}
            placeholder="American"
            onChange={handleTextChange}
          />

          <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
            <Input
              id="dateOfBirth"
              type="date"
              label="Date of Birth"
              value={values.dateOfBirth}
              placeholder=""
              onChange={handleTextChange}
            />

            <Input
              id="debutYear"
              type="number"
              label="Debut Year"
              value={values.debutYear}
              min={1800}
              placeholder="1991"
              onChange={handleTextChange}
            />
          </div>

          <div className="flex justify-end items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-3 py-2 rounded-md border border-red-600 hover:bg-red-600 transition-colors duration-150 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-3 py-2 rounded-md bg-red-600 hover:bg-red-800 transition-colors duration-150 cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
