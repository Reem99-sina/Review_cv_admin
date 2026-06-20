import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try{
  const { email, code } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.verifyCode !== code) {
    return Response.json({ error: "Invalid code" }, { status: 400 });
  }

  await prisma.user.update({
    where: { email },
    data: {
      isVerified: true,
      verifyCode: null,
    },
  });

  return Response.json({ message: "Email verified successfully" });
  } catch {
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}