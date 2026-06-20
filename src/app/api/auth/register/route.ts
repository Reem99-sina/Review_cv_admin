import { sendVerificationEmail } from "@/lib/mailer";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  // 🚨 CASE 1: user exists AND verified
  if (existingUser?.isVerified) {
    return Response.json(
      { error: "User already exists" },
      { status: 400 }
    );
  }

  // 🚨 CASE 2: user exists BUT NOT verified → resend code
  if (existingUser && !existingUser.isVerified) {
    const code = generateCode();

    await prisma.user.update({
      where: { email },
      data: {
        verifyCode: code,
      },
    });

    await sendVerificationEmail(email, code);

    return Response.json({
      message: "Verification code resent",
      status: "PENDING_VERIFICATION",
    });
  }

  // 🚀 CASE 3: new user
  const hashedPassword = await bcrypt.hash(password, 10);
  const code = generateCode();

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      verifyCode: code,
      isVerified: false,
      role: "ADMIN",
    },
  });

  await sendVerificationEmail(user.email, code);

  return Response.json({
    message: "User created, verify email",
    status: "PENDING_VERIFICATION",
  });
}