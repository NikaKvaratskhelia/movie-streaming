"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Play } from "lucide-react";
import { useMovies } from "@/src/hooks/useMovie";
import { useRef } from "react";

export default function Hero() {
  const { movies, isLoading } = useMovies();
  const swiperRef = useRef<SwiperRef>(null);

  if (!isLoading && movies.length === 0) return null;

  const heroMovies = movies.slice(0, 5);

  return (
    <section className="h-screen w-full relative">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, EffectFade, Navigation]}
        slidesPerView={1}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        effect="fade"
        loop
        className="h-186"
      >
        {heroMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              className=" h-screen w-full  bg-cover bg-center flex flex-col justify-center lg:justify-start px-4 sm:px-10 lg:px-20 gap-6 lg:gap-20 mb-6 lg:mb-1 "
              style={{ backgroundImage: `url(${movie.coverPhoto})` }}
            >
              <div className="flex mt-10 lg:mt-50 justify-center px-4">
                <div className="flex flex-wrap gap-4 lg:gap-6">
                  <button
                    onClick={() => swiperRef.current?.swiper.slideNext()}
                    className="flex items-center justify-center w-full sm:w-55.75 h-14 lg:h-19 bg-[#FF0000] text-white text-[18px] lg:text-[24px] font-bold gap-2.5"
                  >
                    Watch Now{" "}
                    <span>
                      <Play />
                    </span>
                  </button>

                  <button
                    onClick={() => swiperRef.current?.swiper.slideNext()}
                    className="flex items-center justify-center w-full sm:w-55.75 h-14 lg:h-19 border-[3px] border-[#FF0000] text-white text-[18px] lg:text-[24px] font-bold"
                  >
                    Watch Later
                  </button>
                </div>
              </div>

              <div className="w-full p-10 flex justify-start">
                <div className="max-w-2xl text-white">
                  <h1 className="text-[22px] sm:text-[26px] lg:text-[32px] font-bold mb-4 leading-tight">
                    {movie.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 text-[14px] lg:text-[16px] text-black font-bold">
                    <span className="h-9 lg:h-11 bg-white rounded-full px-3 lg:px-4 flex items-center">
                      {movie.yearPublished}
                    </span>

                    <span className="h-9 lg:h-11 bg-white rounded-full px-3 lg:px-4 flex items-center">
                      {Math.ceil(movie.duration / 60)} min
                    </span>

                    <span className="h-9 lg:h-11 bg-white rounded-full px-3 lg:px-4 flex items-center">
                      {Number(movie.rating).toFixed(1)}
                    </span>
                  </div>

                  <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-bold leading-relaxed line-clamp-4 lg:line-clamp-none">
                    {movie.description}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={() => swiperRef.current?.swiper.slidePrev()}
        className="absolute left-4 top-[45%] -translate-y-1/2 z-10 flex items-center justify-center w-16 h-16 rounded-full bg-[#FF0000] backdrop-blur-sm border-2 border-white/30 text-white hover:bg-[#CC0000] hover:scale-110 hover:shadow-xl hover:shadow-red-500/25 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-8 h-8"
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
        className="absolute right-4 top-[45%] -translate-y-1/2 z-10 flex items-center justify-center w-16 h-16 rounded-full bg-[#FF0000] backdrop-blur-sm border-2 border-white/30 text-white hover:bg-[#CC0000] hover:scale-110 hover:shadow-xl hover:shadow-red-500/25 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </section>
  );
}
