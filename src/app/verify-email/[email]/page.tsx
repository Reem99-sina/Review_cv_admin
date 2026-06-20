import VerifyEmailForm from "@/components/verifyEmail";

type Props = {
  params: Promise<{
    email: string;
  }>;
};

export default async function VerifyEmail({ params }: Props) {
  const { email } = await params;

  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-bold text-text-custom">
            Verify Your Email
          </h1>

          <p className="text-sm text-slate-500">
            We &apos; ve sent a verification code to
          </p>

          <p className="font-medium text-text-custom break-all">
            {decodeURIComponent(email)}
          </p>
        </div>

       <VerifyEmailForm email={decodeURIComponent(email)}/>
      </div>
    </div>
  );
}