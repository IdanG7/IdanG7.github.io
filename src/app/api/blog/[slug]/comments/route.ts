import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const comments = await prisma.comment.findMany({
    where: { slug },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { name: true, image: true, email: true },
      },
    },
  });

  return NextResponse.json({ comments });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const { body } = await req.json();

  if (!body || typeof body !== "string" || body.trim().length === 0) {
    return NextResponse.json({ error: "Comment cannot be empty" }, { status: 400 });
  }

  if (body.length > 2000) {
    return NextResponse.json({ error: "Comment too long" }, { status: 400 });
  }

  const comment = await prisma.comment.create({
    data: {
      slug,
      body: body.trim(),
      userId: session.user.id,
    },
    include: {
      user: {
        select: { name: true, image: true, email: true },
      },
    },
  });

  return NextResponse.json({ comment }, { status: 201 });
}
