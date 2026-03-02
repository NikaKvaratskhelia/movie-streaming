"use client";

import { useMovies } from "@/src/hooks/useMovie";
import { Table } from "./Table";
import { Star } from "lucide-react";
import MovieForm from "./MovieForm";
import { useState } from "react";
import { Movie } from "@/generated/prisma/browser";
export default function MoviesPage() {
  const { movies, removeMovie, addMovie, updateMovie } = useMovies();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Movie | null>(null);

  return (
    <>
      <Table
        title="Movies"
        data={movies}
        columns={[
          { header: "Title", accessor: "title" },
          { header: "Year", accessor: "yearPublished" },
          {
            header: "Duration",
            accessor: (m) => `${Math.floor(m.duration / 60)} min`,
          },
          {
            header: "Rating",
            accessor: (m) => (
              <div className="flex items-center gap-1 text-red-600">
                <Star className="h-3.5 w-3.5 fill-red-600" />
                {String(m.rating)}
              </div>
            ),
          },
          {
            header: "Genres",
            accessor: (m) => (
              <div className="flex gap-1 flex-wrap">
                {m.genres.map((g) => (
                  <span
                    key={g}
                    className="px-2 py-1 rounded-full text-[10px] font-medium bg-red-600/10 text-red-600"
                  >
                    {g}
                  </span>
                ))}
              </div>
            ),
          },
          { header: "Producer Id", accessor: "producerId" },
        ]}
        onAdd={() => {
          setFormData(null);
          setShowForm(true);
        }}
        onEdit={(m) => {
          setFormData(m);
          setShowForm(true);
        }}
        onDelete={(m) => removeMovie(m.id)}
      />

      <MovieForm
        open={showForm}
        onOpenChange={setShowForm}
        mode={formData ? "edit" : "add"}
        data={formData ?? undefined}
        onAdd={(d) => addMovie(d)}
        onUpdate={(id, d) => updateMovie({ id, data: d })}
      />
    </>
  );
}
