"use client";

import { useForm } from "react-hook-form";
import Input from "@/components/common/input";
import StableButton from "@/components/common/button";
import { useVerifyEmail } from "@/action/user";
import { useRouter } from "next/navigation";

type VerifyForm = {
  code: string;
};

export default function VerifyEmailForm({email}:{email:string}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyForm>();
  const { mutateAsync } = useVerifyEmail();
  const router=useRouter()
  const onSubmit = async (data: VerifyForm) => {
    
    try {
      await mutateAsync({code:data?.code,email:email});
      router.push("/login")
    } catch {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="Verification Code"
        placeholder="Enter 6-digit code"
        maxLength={6}
        error={errors.code?.message}
        {...register("code", {
          required: "Verification code is required",
          pattern: {
            value: /^\d{6}$/,
            message: "Code must be exactly 6 digits",
          },
        })}
      />

      <StableButton type="submit" disabled={isSubmitting}>
        Verify Email
      </StableButton>
    </form>
  );
}
