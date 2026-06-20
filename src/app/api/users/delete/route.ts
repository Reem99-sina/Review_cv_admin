// /api/admin/users/delete
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/token";

export async function POST(req: Request) {
  const auth = req.headers.get("authorization");
  const token = auth?.split(" ")[1];

  const decoded = verifyToken(token!) as { userId: string };

  const admin = await prisma.user.findUnique({
    where: { id: decoded.userId },
  });

  if (!admin || admin.role !== "ADMIN") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const { userId } = await req.json();

  await prisma.user.delete({
    where: { id: userId },
  });

  return Response.json({ message: "User deleted" });
}