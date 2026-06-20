import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/token";

export async function GET(req: Request) {
  try {
    const auth = req.headers.get("authorization");

    if (!auth) {
      return Response.json({ error: "No token" }, { status: 401 });
    }

    const token = auth.split(" ")[1];
    const decoded = verifyToken(token) as { userId: string };

    const admin = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!admin || admin.role !== "ADMIN") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        plan: true,
        createdAt: true,
        isVerified:true,
      },
    });

    return Response.json({ users });
  } catch  {
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}