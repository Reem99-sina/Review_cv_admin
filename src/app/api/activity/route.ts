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

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user || user.role !== "ADMIN") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    // 👤 latest users
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });

    // 📄 latest resumes
    const resumes = await prisma.resume.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        user: {
          select: { name: true },
        },
      },
    });

    // 🤖 latest reviews
    const reviews = await prisma.review.findMany({
      orderBy: { created_at: "desc" },
      take: 5,
      include: {
        resume: {
          include: {
            user: { select: { name: true } },
          },
        },
      },
    });

    return Response.json({
      users,
      resumes,
      reviews,
    });
  } catch  {
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}