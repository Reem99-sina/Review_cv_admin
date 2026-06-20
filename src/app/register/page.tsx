"use client";
import { useRegister } from "@/action/user";
import StableButton from "@/components/common/button";
import Input from "@/components/common/input";
import { userSignUpData } from "@/types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<userSignUpData>();
  const router = useRouter();
  const { mutateAsync } = useRegister();
  const onSubmit = async (data: userSignUpData) => {
    try {
      await mutateAsync(data).then((res)=>{
        if(res?.status=='PENDING_VERIFICATION'){
            router.push("/verify-email/"+data?.email);
        }
      }).catch(()=>{})
      router.push("/verify-email/"+data?.email);
    } catch {}
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 h-full">
      <div className="w-full max-w-md border border-black/20 rounded-2xl p-8 shadow-sm bg-white flex flex-col gap-5">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-custom">
            Create Your Account
          </h1>
          <p className="text-sm text-gray-500">
            Sign up to start reviewing and improving your CV
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Email */}
          <Input
            label="Name"
            placeholder="Enter your name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            error={errors?.name?.message}
          />
          <div>
            <Input
              label="Email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              error={errors?.email?.message}
            />
          </div>

          {/* Password */}
          <div>
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={errors?.password?.message}
            />
          </div>

          {/* Button */}
          <StableButton disabled={isSubmitting} type="submit">
            {isSubmitting ? "sign up..." : "Sign up"}
          </StableButton>
          <p className="mt-4 text-center text-sm text-slate-600">
            Are you already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-secondary hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
