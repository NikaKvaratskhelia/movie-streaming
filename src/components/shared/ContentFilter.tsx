"use client";

import { useState, useMemo } from "react";
import { Movie, Series } from "@/generated/prisma/browser";

interface ContentFilterPropsBase {
  contentType: "movie" | "series";
}

interface MovieFilterProps extends ContentFilterPropsBase {
  contentType: "movie";
  content: Movie[];
  onFilteredContent: (filteredContent: Movie[]) => void;
}

interface SeriesFilterProps extends ContentFilterPropsBase {
  contentType: "series";
  content: Series[];
  onFilteredContent: (filteredContent: Series[]) => void;
}

type ContentFilterProps = MovieFilterProps | SeriesFilterProps;

export default function ContentFilter({ content, contentType, onFilteredContent }: ContentFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const availableYears = useMemo(() => {
    const years = [];
    for (let year = 2026; year >= 2015; year--) {
      years.push(year);
    }
    return years;
  }, []);
  const filteredContent = useMemo(() => {
    let filtered: any = content;
    if (searchTerm.trim()) {
      filtered = filtered.filter((item: any) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    }
    if (selectedRating !== "all") {
      const minRating = parseFloat(selectedRating);
      filtered = filtered.filter((item: any) => Number(item.rating) >= minRating);
    }
    if (selectedYear !== "all") {
      filtered = filtered.filter((item: any) => item.yearPublished === parseInt(selectedYear));
    }

    return filtered;
  }, [content, searchTerm, selectedRating, selectedYear]);
  useMemo(() => {
    onFilteredContent(filteredContent as any);
  }, [filteredContent, onFilteredContent]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const searchPlaceholder = contentType === "movie" ? "Search movies..." : "Search series...";

  return (
    <div className="w-full px-4 lg:px-[12%] py-6 bg-black/50 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-1">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="
                      w-full h-11 px-4 pr-10
                      rounded-full
                      bg-white/5
                      border border-white/10
                      text-white placeholder:text-white/40
                      backdrop-blur-md
                      focus:outline-none
                      focus:border-red-600
                      focus:ring-2 focus:ring-red-600/40
                      transition-all duration-200
                    "
              />

              <svg
                className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-white/60"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-white text-sm font-medium">Rating:</label>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-600"
            >
              <option value="all">All Ratings</option>
              <option value="9">9+ </option>
              <option value="8">8+ </option>
              <option value="7">7+ </option>
              <option value="6">6+ </option>
              <option value="5">5+ </option>
              <option value="4">4+ </option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-white text-sm font-medium">Year:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-600"
            >
              <option value="all">All Years</option>
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium">
            {filteredContent.length} Results
          </div>
        </div>
      </div>
    </div>
  );
}
