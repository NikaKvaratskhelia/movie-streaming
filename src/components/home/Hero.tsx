"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper/modules";
import { useEffect } from "react";
import { useMovieStore } from "../../store/useMovieStore";
import LoadingSpinner from "../shared/LoadingSpinner";
import ErrorComponent from "../shared/ErrorComponent";

const Hero = () => {
  const { movies, loading, error, fetchMovies } = useMovieStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorComponent error={error} />;
  if (movies.length === 0) return null;

  const heroMovies = movies.slice(0, 5);

  return (
    <section className="h-screen w-full">
         <Swiper
           modules={[Pagination, Autoplay, EffectFade, Navigation]}
           slidesPerView={1}
           pagination={{ clickable: true }}
           navigation
           autoplay={{ delay: 3000, disableOnInteraction: false }}
           effect="fade"
           loop
           className="
             h-full
             [&_.swiper-pagination-bullet]:w-8
             [&_.swiper-pagination-bullet]:h-8
             [&_.swiper-pagination-bullet]:bg-white
             [&_.swiper-pagination-bullet]:opacity-70
             [&_.swiper-pagination-bullet-active]:w-6
             [&_.swiper-pagination-bullet-active]:bg-red-600
             [&_.swiper-pagination-bullet-active]:opacity-100
           "
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
                    Watch Now <span>▶</span>
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
