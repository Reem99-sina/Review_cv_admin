import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/token";

export async function GET(req: Request) {
  try {
    // 1. auth
    const auth = req.headers.get("authorization");
    if (!auth) {
      return Response.json({ error: "No token" }, { status: 401 });
    }

    const token = auth.split(" ")[1];
    const decoded = verifyToken(token) as { userId: string };

    // 2. get user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // 3. admin check
    if (user.role !== "ADMIN") {
      return Response.json(
        { error: "Forbidden: Admins only" },
        { status: 403 }
      );
    }

    // =========================
    // 📊 STATS (CARDS)
    // =========================
    const totalUsers = await prisma.user.count();
    const proUsers = await prisma.user.count({
      where: { plan: "PRO" },
    });
    const resumes = await prisma.resume.count();
    const reviews = await prisma.review.count();

    // =========================
    // 📈 CHARTS (DAILY GROUPED)
    // =========================

    const usersGrowth = await prisma.$queryRaw<
      { date: string; count: number }[]
    >`
      SELECT DATE("createdAt") as date, COUNT(*)::int as count
      FROM "User"
      GROUP BY DATE("createdAt")
      ORDER BY date ASC;
    `;

    const resumesGrowth = await prisma.$queryRaw<
      { date: string; count: number }[]
    >`
      SELECT DATE("createdAt") as date, COUNT(*)::int as count
      FROM "Resume"
      GROUP BY DATE("createdAt")
      ORDER BY date ASC;
    `;

    const reviewsGrowth = await prisma.$queryRaw<
      { date: string; count: number }[]
    >`
      SELECT DATE("created_at") as date, COUNT(*)::int as count
      FROM "Review"
      GROUP BY DATE("created_at")
      ORDER BY date ASC;
    `;

    // =========================
    // 📦 RESPONSE
    // =========================
    return Response.json({
      stats: {
        totalUsers,
        proUsers,
        resumes,
        reviews,
      },

      charts: {
        usersGrowth,
        resumesGrowth,
        reviewsGrowth,
      },
    });
  } catch  {
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}