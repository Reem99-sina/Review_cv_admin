"use client";

import { useForm } from "react-hook-form";
import StableButton from "@/components/common/button";
import Input from "@/components/common/input";
import { useLogin } from "@/action/user";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();
  const {mutateAsync}=useLogin()
 const queryClient = useQueryClient();
  const onSubmit = async (data: LoginForm) => {
   try{
     await mutateAsync(data).then((res)=>{
     queryClient.setQueryData(["me"], { user: res?.user })
     })
   
   }catch{}
   
  };
  return (
   <div className="flex-1 flex items-center justify-center px-4 h-full">
      <div className="w-full max-w-md border border-black/20 rounded-2xl p-8 shadow-sm bg-white flex flex-col gap-5">

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-custom">Welcome Back</h1>
          <p className="text-sm text-gray-500">Login to your CV Reviewer</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          {/* Email */}
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
            {isSubmitting ? "Logging in..." : "Login"}
          </StableButton>
           <p className="mt-4 text-center text-sm text-slate-600">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-secondary hover:underline"
          >
            Create one
          </Link>
        </p>
        </form>
      </div>
    </div>
  );
}
