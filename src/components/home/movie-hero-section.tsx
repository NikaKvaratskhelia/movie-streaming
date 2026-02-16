export default function Hero() {
  return (
    <section
      className="relative h-186 w-full bg-cover bg-center flex items-center px-20"
      style={{ backgroundImage: "url('')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 w-full flex flex-col justify-center text-white ml-10">
        <div className="flex gap-11 mb-10 justify-center">
          <button className="bg-red-600 hover:bg-red-700 transition rounded-lg text-[24px] font-semibold flex justify-center items-center gap-2 w-55.75 h-19">
            Watch Now
          </button>

          <button className="border-2 border-red-600 rounded-lg text-[24px] font-semibold hover:bg-red-600/20 transition flex justify-center items-center gap-2 w-50 h-19">
            Watch Later
          </button>
        </div>

        <h1 className="text-[32px] font-bold mb-6">Avatar: The Way of Water</h1>
        <div className="flex gap-2 mb-6 text-center items-centertext-[16px] text-black">
          <span className="bg-white w-18.25 h-11 rounded-full flex items-center justify-center">
            Action
          </span>
          <span className="bg-white w-26.5 h-11 rounded-full flex items-center justify-center">
            Adventure
          </span>
          <span className="bg-white w-35.5 h-11 rounded-full flex items-center justify-center">
            Science Fiction
          </span>
          <span className=" w-18.25 h-11 text-white rounded-full flex items-center justify-center">
            2022
          </span>
          <span className=" w-18.25 h-11 text-white rounded-full flex items-center justify-center">
            3:12:00
          </span>
          <span className=" w-18.25 h-11 text-white rounded-full flex items-center justify-center">
            8.5
          </span>
        </div>

        <p className="max-w-xl text-[16px] leading-relaxed">
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
    </section>
  );
}
