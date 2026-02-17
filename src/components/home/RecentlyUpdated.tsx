import Image from "next/image";

export default function RecentlyUpdated() {
  return (
    <section className="  bg-black text-white px-20 py-12">
      <h2 className="text-[24px] font-semibold mb-10">Recently Updated</h2>

      <div className="flex items-center justify-between">

        <div className="flex flex-wrap gap-16">

          <div className="flex items-start gap-5">
            <Image
              src="https://img.icons8.com/sf-regular-filled/1200/image.jpg"
              alt="The Flash"
              width={64}
              height={144}
              className="w-[64px] h-[103px] object-cover"
            />
            <div className="mt-[9px]">
              <h3 className="text-[16px] font-medium">The Flash</h3>
              <p className="text-[#FFFFFF]text-lg mt-[4px]">
                Series/S 2/EP 9
              </p>
              <p className="text-[#FFFFFF]text-lg mt-[4px]">
                11/05/23
              </p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <Image
            src="https://img.icons8.com/sf-regular-filled/1200/image.jpg"
              alt="Fubar"
              width={64}
              height={103}
              className="w-[64px] h-[103px] object-cover "
            />
            <div  className="mt-[9px]">
              <h3 className="text-[16px] font-medium">Fubar</h3>
  <p className="text-[#FFFFFF]text-lg mt-[4px]">
                Series/S 1/EP 8
              </p>
  <p className="text-[#FFFFFF]text-lg mt-[4px]">
                11/05/23
              </p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <Image
              src="https://img.icons8.com/sf-regular-filled/1200/image.jpg"
              alt="Fubar"
              width={64}
              height={103}
              className="w-[64px] h-[103px] object-cover "
            />
            <div className="mt-[9px]">
              <h3 className="text-[16px] font-medium">manifest</h3>
              <p className="text-[#FFFFFF]text-lg mt-[4px]">
                Series/S 1/EP 8
              </p>
              <p className="text-[#FFFFFF]text-lg mt-[4px]">
                11/05/23
              </p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <Image
              src="https://img.icons8.com/sf-regular-filled/1200/image.jpg"
              alt="Fubar"
              width={64}
              height={103}
              className="w-[64px] h-[103px] object-cover"
            />
            <div className="mt-[9px]">
              <h3 className="text-[16px] font-medium">silo</h3>
              <p className="text-[#FFFFFF]text-lg mt-[4px]">
                Series/S 1/EP 8
              </p>
              <p className="text-[#FFFFFF]text-lg mt-[4px]">
                11/05/23
              </p>
            </div>
          </div>

        </div>
        <button className="w-[88px] h-[88px] bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition mr-[10%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

      </div>
    </section>
  );
}