import bg from "@/src/assets/images/adminDashBg.jpg";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-48 overflow-hidden rounded-xl">
      <Image
        src={bg}
        alt="Dashboard banner"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 1200px"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-r from-[#0e1114] via-[#0e1114]/40 to-transparent" />

      <div className="absolute inset-0 flex items-center p-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome back,{" "}
            <span className="bg-linear-to-br from-red-400 via-red-700 to-red-400 bg-clip-text text-transparent">
              Admin
            </span>
          </h1>
          <p className="mt-1 text-white/70">
            Manage your streaming platform content
          </p>
        </div>
      </div>
    </section>
  );
}
