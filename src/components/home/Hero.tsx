"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Play } from "lucide-react";
import { useMovies } from "@/src/hooks/useMovie";

const Hero = () => {
  const { movies, isLoading, } = useMovies();

  if (!isLoading && movies.length === 0) return null;

  const heroMovies = movies.slice(0, 5);

  return (
    <section className="h-screen w-full">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        effect="fade"
        loop
        className="h-full"
      >
        {heroMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              className="h-screen w-full bg-cover bg-center flex flex-col justify-between"
              style={{ backgroundImage: `url(${movie.coverPhoto})` }}
            >
              <div className="flex mt-[40%] lg:mt-[20%] justify-center px-4">
                <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                  <button className="flex items-center justify-center w-full sm:w-55.75 h-14 lg:h-19 bg-[#FF0000] text-white text-[18px] lg:text-[24px] font-bold gap-2.5">
                    Watch Now <span><Play/></span>
                  </button>

                  <button className="flex items-center justify-center w-full sm:w-55.75 h-14 lg:h-19 border-[3px] border-[#FF0000] text-white text-[18px] lg:text-[24px] font-bold">
                    Watch Later
                  </button>
                </div>
              </div>

              <div className="w-full p-6 sm:p-10 lg:p-[10%] flex justify-start">
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
    </section>
  );
};

export default Hero;
