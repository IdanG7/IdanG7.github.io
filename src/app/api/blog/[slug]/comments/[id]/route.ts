import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string; id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // Check if user is admin
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      accounts: {
        where: { provider: "github" },
        select: { providerAccountId: true },
      },
    },
  });

  const comment = await prisma.comment.findUnique({ where: { id } });
  if (!comment) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Allow deletion if user is admin or comment author
  const isAdmin = user?.name === process.env.ADMIN_GITHUB;
  const isAuthor = comment.userId === session.user.id;

  if (!isAdmin && !isAuthor) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.comment.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
