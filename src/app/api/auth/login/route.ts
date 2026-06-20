import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/token";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email,role:"ADMIN" } });

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  if (!user.isVerified) {
    return Response.json({ error: "Email not verified" }, { status: 403 });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return Response.json({ error: "Invalid password" }, { status: 400 });
  }

  const token = generateToken({
    userId: user.id,
    role: user.role,
  });
  return Response.json({ token ,user});
}
