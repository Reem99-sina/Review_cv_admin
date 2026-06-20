import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/token";

export async function GET(req: Request) {
  try {
    // 1. get token from headers
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return Response.json({ error: "No token provided" }, { status: 401 });
    }

    // format: Bearer token
    const token = authHeader.split(" ")[1];

    // 2. verify token
    const decoded = verifyToken(token) as { userId: string };
console.log(decoded,'decoded')
    if (!decoded?.userId) {
      return Response.json({ error: "Invalid token" }, { status: 401 });
    }

    // 3. get user from DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isVerified: true,
        createdAt: true,
        plan: true,
        isPayed: true,
      },
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({ user });
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}
