"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "../shared/Button";
import Input from "../shared/Input";
import { useState } from "react";
import { useAuthStore } from "@/src/store/useLoginStore";
import { z } from "zod";
import Loader from "../ui/Loader";

const formSchema = z.object({
  email: z.email("Invalid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Form() {
  const router = useRouter();
  const { login, fetching } = useAuthStore();
  const [values, setValues] = useState<FormValues>({ email: "", password: "" });
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (errors[id as keyof FormValues]) {
      setErrors((prev) => ({
        ...prev,
        [id]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = formSchema.safeParse(values);

    if (!result.success) {
      const newErrors: Partial<Record<keyof FormValues, string>> = {};

      result.error.issues.forEach((err) => {
        const path = err.path[0] as keyof FormValues;
        newErrors[path] = err.message;
      });

      setErrors(newErrors);
      return;
    }

    setErrors({});
    const resp = await login(values);

    if (resp.success) {
      router.push("/");
    }
  };

  return (
    <>
      {fetching && <Loader />}
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Input
            type="email"
            text="Email"
            id="email"
            placeholder="Enter Email"
            value={values.email}
            onChange={handleChange}
          />

          {errors.email && (
            <p className="text-red-400 font-semibold text-sm">{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Input
            type="password"
            text="Password"
            id="password"
            placeholder="Enter Password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-400 font-semibold text-sm">
              {errors.password}
            </p>
          )}
        </div>

        <Button
          text={fetching ? "Logging in..." : "Log In"}
          disabled={fetching}
        />

        <Link
          href="/forgot-password"
          className="text-white self-center -mt-3 text-[14px] hover:underline"
        >
          Forgot Password?
        </Link>
      </form>
    </>
  );
}
