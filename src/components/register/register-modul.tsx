import Link from "next/link";
import Hero from "../shared/Hero";
import Form from "./Form";

export default function RegisterModul() {
  return (
    <div className="flex flex-col gap-5 mx-auto backdrop-blur-[60px] bg-[linear-gradient(to_bottom_right,rgba(239,239,239,0.6)_0%,rgba(255,255,255,0.1)_100%)] border border-white rounded-[25px] p-5 max-w-160 w-[90%]">
      <div className="px-2 pt-3 w-full  flex flex-col gap-10 sm:px-10">
        <Hero text="Register" />
        <Form />
      </div>
      <p className="text-white">
        Already have an account?{" "}
        <Link href={"/login"} className="underline text-[#119BFF]">
          Create One
        </Link>
      </p>
    </div>
  );
}
