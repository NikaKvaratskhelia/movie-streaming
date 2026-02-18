import { Series } from "@/generated/prisma/browser";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export interface SeriesResponse {
  message: string;
  data: Series[];
  ok: boolean;
}

export interface SeasonsCountResponse {
  message: string;
  data: { seasonsCount: number };
  ok: boolean;
}

export const fetchSeries = async (): Promise<Series[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/series`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch series');
    }
    
    const result: SeriesResponse = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching series:', error);
    return [];
  }
};

export const fetchSeasonsCount = async (seriesId: number): Promise<number> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/series/${seriesId}/seasons-count`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch seasons count');
    }
    
    const result: SeasonsCountResponse = await response.json();
    return result.data.seasonsCount || 0;
  } catch (error) {
    console.error('Error fetching seasons count:', error);
    return 0;
  }
};
