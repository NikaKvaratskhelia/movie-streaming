import { create } from "zustand";
import { Series } from "@/generated/prisma/browser";
import { fetchSeries } from "@/src/services/seriesService";

interface SeriesStore {
  series: Series[];
  loading: boolean;
  error: string | null;
  fetchSeries: () => Promise<void>;
}

export const useSeriesStore = create<SeriesStore>((set) => ({
  series: [],
  loading: false,
  error: null,

  fetchSeries: async () => {
    set({ loading: true, error: null });
    try {             
      const seriesData = await fetchSeries();
      set({ series: seriesData, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : "Failed to fetch series",
        loading: false 
      });
    }
  },
}));
