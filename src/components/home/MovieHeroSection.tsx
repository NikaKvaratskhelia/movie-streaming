export default function Hero() {
  return (
    <main
      className="relative h-186 w-full bg-cover bg-center flex items-center px-20"
      style={{ backgroundImage: "url('/do-you-think-james-camerons-avatar-took-inspiration-from-v0-buq2mcyzoxvf1.webp')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 w-full flex flex-col justify-center text-white ml-10">

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-10 justify-center items-center">
          
          <button
            className="bg-red-600 hover:bg-red-700 transition rounded-lg text-lg sm:text-xl lg:text-2xl font-semibold flex justify-center items-center gap-2 w-full sm:w-56 h-14 sm:h-16 lg:h-19"
          >
            Watch Now
          </button>

          <button
            className=" border-2 border-red-600 rounded-lg text-lg sm:text-xl lg:text-2xl font-semibold hover:bg-red-600/20 transition flex justify-center items-center gap-2 w-full sm:w-52 h-14 sm:h-16 lg:h-19"
          >
            Watch Later
          </button>

        </div>
        <h1 className="text-[32px] font-bold mb-6">
          Avatar: The Way of Water
        </h1>
        <div className="flex flex-wrap gap-3 mb-6 justify-center sm:justify-start text-sm sm:text-base">
          
          <span className="bg-white text-black px-4 py-2 rounded-full flex items-center justify-center">
            Action
          </span>

          <span className="bg-white text-black px-4 py-2 rounded-full flex items-center justify-center">
            Adventure
          </span>

          <span className="bg-white text-black px-4 py-2 rounded-full flex items-center justify-center">
            Science Fiction
          </span>

          <span className="text-black px-4 py-2 rounded-full flex items-center justify-center">
            2022
          </span>

          <span className="text-black px-4 py-2 rounded-full flex items-center justify-center">
            3:12:00
          </span>

          <span className="text-black px-4 py-2 rounded-full flex items-center justify-center">
            8.5
          </span>

        </div>
 <p className=" max-w-full sm:max-w-xl lg:max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed sm:leading-loose text-gray-200 mb-6 ">
          Set more than a decade after the events of the first film, learn the
          story of the Sully family (Jake, Neytiri, and their kids), the trouble
          that follows them, the lengths they go to keep each other safe, the
          battles they fight to stay alive, and the tragedies they endure.
        </p>
      </div>

      <div className="absolute bottom-15 left-1/2 transform -translate-x-1/2 flex gap-2">
        <div className="w-5 h-5 bg-red-600 rounded-full"></div>
        <div className="w-5 h-5 bg-white rounded-full"></div>
        <div className="w-5 h-5 bg-white rounded-full"></div>
        <div className="w-5 h-5 bg-white rounded-full"></div>
      </div>
    </main>
  );
}
