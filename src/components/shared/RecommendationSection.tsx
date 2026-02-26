"use client";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import MovieCard from "./MovieCard";
import SeriesCard from "./SeriesCard";
import { Recommendation } from "@/src/types/Recommendation";
import { useRecommendations } from "@/src/hooks/useRecommendations";
import { useRef } from "react";
import Loader from "../ui/Loader";

export default function RecommendationSection() {
  const { data, isLoading } = useRecommendations();
  const swiperRef = useRef<SwiperRef>(null);

  if (isLoading) return <Loader />;
  if (!data || data.length === 0) return <p>No recommendations available.</p>;

  return (
    <div className="flex flex-col gap-10 mt-12 lg:mt-20 max-w-[82vw]">
      <h1 className="text-white text-[24px] font-bold px-10">
        Recommendations
      </h1>
      <div className="relative flex items-center justify-center px-10">
        <Swiper
          ref={swiperRef}
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {data.map((d: Recommendation) => (
            <SwiperSlide key={d.id}>
              {d.type === "movie" ? (
                <MovieCard movie={d} />
              ) : (
                <SeriesCard series={d} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          onClick={() => swiperRef.current?.swiper.slidePrev()}
          className="absolute -left-4 top-[45%] -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/25 hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <button
          onClick={() => swiperRef.current?.swiper.slideNext()}
          className="absolute -right-4 top-[45%] -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/25 hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
