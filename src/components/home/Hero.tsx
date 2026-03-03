"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Play } from "lucide-react";
import { useMovies } from "@/src/hooks/useMovie";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useWatchlist } from "@/src/hooks/useWatchlist";
import { useAuthStore } from "@/src/store/useLoginStore";
import { toast } from "sonner";

export default function Hero() {
  const { movies, isLoading } = useMovies();
  const swiperRef = useRef<SwiperRef>(null);
  const router = useRouter();
  const { addMovie, isAddingMovie } = useWatchlist();
  const { token } = useAuthStore();

  if (!isLoading && movies.length === 0) return null;

  const heroMovies = movies.slice(0, 5);

  const handleWatchNow = (movieId: number) => {
    router.push(`/details/movie/${movieId}`);
  };

  const handleWatchLater = async (movieId: number) => {
    if (!token) {
      toast.error("You need to log in first");
      return;
    }

    await addMovie(movieId);
  };

  return (
    <section className="relative h-screen w-full">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, EffectFade, Navigation]}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        effect="fade"
        loop
        className="h-full"
      >
        {heroMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              className="relative h-screen w-full bg-cover bg-center flex flex-col px-4 sm:px-10 lg:px-20"
              style={{ backgroundImage: `url(${movie.coverPhoto})` }}
            >
              <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="flex flex-wrap gap-4 lg:gap-6">
                  <button
                    onClick={() => handleWatchNow(movie.id)}
                    className="flex items-center justify-center w-full sm:w-55.75 h-14 lg:h-19 bg-[#FF0000] text-white text-[18px] lg:text-[24px] font-bold gap-2.5 cursor-pointer"
                  >
                    Watch Now <Play />
                  </button>

                  <button
                    onClick={() => handleWatchLater(movie.id)}
                    disabled={isAddingMovie}
                    className="flex items-center justify-center w-full sm:w-55.75 h-14 lg:h-19 border-[3px] border-[#FF0000] text-white text-[18px] lg:text-[24px] font-bold hover:bg-[#FF0000]  transition-colors duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Watch Later
                  </button>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 pb-30 pl-4 sm:pl-10 lg:pl-30">
                <div className="max-w-2xl text-white">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                    {movie.title}
                  </h1>

                  <div className="flex flex-wrap gap-3 mb-4 text-black font-bold">
                    <span className="bg-white rounded-full px-4 py-2">
                      {movie.yearPublished}
                    </span>

                    <span className="bg-white rounded-full px-4 py-2">
                      {Math.ceil(movie.duration / 60)} min
                    </span>

                    <span className="bg-white rounded-full px-4 py-2">
                      {Number(movie.rating).toFixed(1)}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base font-semibold line-clamp-4">
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
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          {" "}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />{" "}
        </svg>{" "}
      </button>{" "}
      <button
        onClick={() => swiperRef.current?.swiper.slideNext()}
        className="absolute right-4 top-[45%] -translate-y-1/2 z-10 flex items-center justify-center w-16 h-16 rounded-full bg-[#FF0000] backdrop-blur-sm border-2 border-white/30 text-white hover:bg-[#CC0000] hover:scale-110 hover:shadow-xl hover:shadow-red-500/25 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          {" "}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />{" "}
        </svg>{" "}
      </button>
    </section>
  );
}
