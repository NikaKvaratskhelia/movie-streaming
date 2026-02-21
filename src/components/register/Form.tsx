"use client";

import { useRouter } from "next/navigation";
import Button from "../shared/Button";
import Input from "../shared/Input";
import { useState } from "react";
import { z } from "zod";
import Loader from "../ui/Loader";
import { register } from "@/src/services/auth-service";
import { toast } from "sonner";

const formSchema = z.object({
  firstName: z.string().min(2, "First Name is required"),
  lastName: z.string().min(2, "Last Name is required"),
  email: z.email("Invalid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Form() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

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

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = formSchema.safeParse(values);

    if (!result.success) {
      const newErrors: Partial<Record<keyof FormValues, string>> = {};

      result.error.issues.forEach((err) => {
        const path = err.path[0] as keyof FormValues;
        newErrors[path] = err.message;
      });

      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    const res = await register(values);

    if (!res.ok) {
      toast.error(res.message);
    }

    if (res.ok) {
      router.push("/login");
    }

    setIsLoading(false);
    setErrors({});
  };

  return (
    <>
      {isLoading && <Loader />}
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-between lg:flex-row gap-4">
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              text="First Name"
              id="firstName"
              placeholder="Enter First Name"
              value={values.firstName}
              onChange={handleChange}
            />

            {errors.firstName && (
              <p className="text-red-400 font-semibold text-sm">
                {errors.firstName}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 max-w-">
            <Input
              type="text"
              text="Last Name"
              id="lastName"
              placeholder="Enter Last Name"
              value={values.lastName}
              onChange={handleChange}
            />

            {errors.lastName && (
              <p className="text-red-400 font-semibold text-sm">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>
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
          text={isLoading ? "Registering..." : "Register"}
          disabled={isLoading}
        />
      </form>
    </>
  );
}
