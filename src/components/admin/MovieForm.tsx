"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import z from "zod";

import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Select from "../ui/Select";

import type { Movie, Producer } from "@/generated/prisma/browser";
import { useProducers } from "@/src/hooks/useProducers";

type MovieFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (data: Partial<Movie>) => void;
  onUpdate: (id: number, data: Partial<Movie>) => void;
  mode: "edit" | "add";
  data?: Movie | null;
};

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  coverPhoto: z.string().min(1, "Cover photo is required"),

  yearPublished: z.coerce.number().int().min(1900, "Year must be >= 1900"),
  duration: z.coerce.number().int().min(1, "Duration must be >= 1"),
  rating: z.coerce.number().min(0).max(10, "Rating must be <= 10"),

  genres: z
    .string()
    .min(1, "At least one genre required")
    .transform((val) =>
      val
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean),
    ),

  producerId: z.coerce.number().int().min(1, "Producer is required"),
});

type FormState = {
  title: string;
  description: string;
  coverPhoto: string;
  yearPublished: string;
  duration: string;
  rating: string;
  genres: string;
  producerId: number | null;
};

const GRID_AUTO =
  "grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]";

export default function MovieForm({
  open,
  onOpenChange,
  onAdd,
  onUpdate,
  mode,
  data,
}: MovieFormProps) {
  const { producers } = useProducers();

  const producerOptions = useMemo(
    () =>
      (producers ?? []).map((p: Producer) => ({
        id: p.id,
        label: p.fullName,
      })),
    [producers],
  );

  const initialValues = useMemo<FormState>(() => {
    if (mode === "edit" && data) {
      return {
        title: data.title ?? "",
        description: data.description ?? "",
        coverPhoto: data.coverPhoto ?? "",
        yearPublished: String(data.yearPublished ?? ""),
        duration: String(Math.floor(data?.duration / 60) ?? ""),
        rating: String(data.rating ?? ""),
        genres: (data.genres ?? []).join(", "),
        producerId: data.producerId ?? null,
      };
    }

    return {
      title: "",
      description: "",
      coverPhoto: "",
      yearPublished: "",
      duration: "",
      rating: "",
      genres: "",
      producerId: null,
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

  const setField = (
    key: keyof Omit<FormState, "producerId">,
    value: string,
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleTextChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const key = e.currentTarget.id as keyof Omit<FormState, "producerId">;
    setField(key, e.currentTarget.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setError(null);

    const parsed = formSchema.safeParse({
      ...values,
      producerId: values.producerId ?? 0,
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid form");
      return;
    }

    const payload: Partial<Movie> = {
      title: parsed.data.title,
      description: parsed.data.description,
      coverPhoto: parsed.data.coverPhoto,
      yearPublished: parsed.data.yearPublished,
      duration: parsed.data.duration,
      rating: parsed.data.rating,
      genres: parsed.data.genres,
      producerId: parsed.data.producerId,
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
          <h3 className="text-2xl font-semibold">Movie</h3>
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
            id="title"
            type="text"
            label="Title"
            value={values?.title}
            placeholder="Interstellar..."
            onChange={handleTextChange}
          />

          <Textarea
            label="Description"
            id="description"
            value={values.description ?? ""}
            onChange={handleTextChange}
          />

          <div className={GRID_AUTO}>
            <Input
              id="yearPublished"
              type="text"
              label="Year (YYYY)"
              value={values?.yearPublished}
              placeholder="2014"
              onChange={handleTextChange}
            />
            <Input
              id="duration"
              type="text"
              label="Duration (min)"
              value={values?.duration}
              placeholder="169"
              onChange={handleTextChange}
            />
          </div>

          <div className={GRID_AUTO}>
            <Input
              id="rating"
              type="number"
              label="Rating (0-10)"
              value={values?.rating}
              min={0}
              max={10}
              placeholder="8.7"
              onChange={handleTextChange}
            />

            <Select
              label="Producers"
              valueId={values?.producerId}
              options={producerOptions}
              onChange={(id) => setValues((p) => ({ ...p, producerId: id }))}
            />
          </div>

          <Input
            id="genres"
            type="text"
            label="Genres (comma-separated)"
            value={values.genres}
            placeholder="Action, Drama..."
            onChange={handleTextChange}
          />

          <Input
            id="coverPhoto"
            type="text"
            label="Cover Photo"
            value={values.coverPhoto}
            placeholder="https://..."
            onChange={handleTextChange}
          />

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
