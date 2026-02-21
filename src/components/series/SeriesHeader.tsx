import { Series } from "@/generated/prisma/browser";
import ContentFilter from "@/src/components/shared/ContentFilter";

interface SeriesHeaderProps {
  series: Series[];
  onFilteredSeries: (filteredSeries: Series[]) => void;
}

export default function SeriesHeader({ series, onFilteredSeries }: SeriesHeaderProps) {
  return (
    <>
      <div className="w-full px-4 lg:px-[12%] py-6 lg:py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl lg:text-5xl font-bold text-white mb-3 lg:mb-4">
            All Series
          </h1>
   <p className="text-gray-400 text-base lg:text-lg">
            Discover our complete collection of series
          </p>
 <div className="mt-4 lg:mt-6 flex items-center gap-3 lg:gap-4">
            <div className="bg-red-600 text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg text-sm lg:text-base">
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
