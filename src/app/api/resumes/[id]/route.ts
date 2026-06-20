import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/token";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = req.headers.get("authorization");
    const { id } = await params;
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

    const resume = await prisma.resume.findUnique({
      where: { id },
      include: {
        user: true,
        reviews: true,
      },
    });
    if (!resume) {
      return Response.json({ error: "Resume not found" }, { status: 404 });
    }
    return Response.json({ resume });
  } catch  {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = req.headers.get("authorization");
    const { id } = await params;
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

    await prisma.resume.delete({
      where: { id },
    });

    return Response.json({ message: "Resume deleted successfully" });
  } catch  {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
