"use client";

import { useState, useMemo, useEffect } from "react";
import { Movie, Series } from "@/generated/prisma/browser";
import { Dropdown } from "./Dropdown";

interface MovieFilterProps {
  contentType: "movie";
  content: Movie[];
  onFilteredContent: (filtered: Movie[]) => void;
}

interface SeriesFilterProps {
  contentType: "series";
  content: Series[];
  onFilteredContent: (filtered: Series[]) => void;
}

type Props = MovieFilterProps | SeriesFilterProps;

const ratingOptions = [
  { label: "All Ratings", value: "all" },
  { label: "9+", value: "9" },
  { label: "8+", value: "8" },
  { label: "7+", value: "7" },
  { label: "6+", value: "6" },
];

export default function ContentFilter({
  content,
  contentType,
  onFilteredContent,
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  const availableYears = useMemo(() => {
    const years: number[] = [];
    for (let y = 2026; y >= 2015; y--) years.push(y);
    return years;
  }, []);

  const filteredContent = useMemo(() => {
    const list = content;

    return list.filter((item) => {
      if (searchTerm.trim()) {
        if (!item.title.toLowerCase().includes(searchTerm.toLowerCase().trim()))
          return false;
      }

      if (selectedRating !== "all") {
        if (Number(item.rating) < Number(selectedRating)) return false;
      }

      if (selectedYear !== "all") {
        if (item.yearPublished !== Number(selectedYear)) return false;
      }

      return true;
    });
  }, [content, searchTerm, selectedRating, selectedYear]);

  useEffect(() => {
    if (contentType === "movie") {
      onFilteredContent(filteredContent as Movie[]);
    } else {
      onFilteredContent(filteredContent as Series[]);
    }
  }, [filteredContent, onFilteredContent, contentType]);

  const searchPlaceholder =
    contentType === "movie" ? "Search movies..." : "Search series...";

  return (
    <div className="w-full px-4 lg:px-[12%] py-6 bg-black/50 backdrop-blur-sm border-b border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-1">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-11 px-4 pr-10 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/40 backdrop-blur-md focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/40 transition-all duration-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-white text-sm font-medium">Rating:</label>
            <Dropdown
              value={selectedRating}
              options={ratingOptions}
              onChange={setSelectedRating}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-white text-sm font-medium">Year:</label>
            <Dropdown
              value={selectedYear}
              options={[
                { label: "All Years", value: "all" },
                ...availableYears.map((y) => ({
                  label: String(y),
                  value: String(y),
                })),
              ]}
              onChange={setSelectedYear}
            />
          </div>

          <div className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium">
            {filteredContent.length} Results
          </div>
        </div>
      </div>
    </div>
  );
}
