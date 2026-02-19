import { Series } from "@/generated/prisma/browser";
import ContentFilter from "@/src/components/shared/ContentFilter";

interface SeriesHeaderProps {
  series: Series[];
  onFilteredSeries: (filteredSeries: Series[]) => void;
}

export default function SeriesHeader({ series, onFilteredSeries }: SeriesHeaderProps) {
  return (
    <>
      <div className="w-full px-4 lg:px-[12%] py-8 lg:py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            All Series
          </h1>
          <p className="text-gray-400 text-lg">
            Discover our complete collection of series
          </p>
          <div className="mt-6 flex items-center gap-4">
            <div className="bg-red-600 text-white px-4 py-2 rounded-lg">
              {series.length} Series Available
            </div>
          </div>
        </div>
      </div>
      
      <ContentFilter 
        content={series} 
        contentType="series" 
        onFilteredContent={onFilteredSeries} 
      />
    </>
  );
}
