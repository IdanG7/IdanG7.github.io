import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const comments = await prisma.comment.findMany({
      where: { slug },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ comments });
  } catch (e) {
    console.error("[comments GET]", e);
    return NextResponse.json({ comments: [] });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await auth();
    const user = session?.user as Record<string, unknown> | undefined;

    if (!user?.login) {
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
        authorName: (user.name as string) ?? (user.login as string),
        authorAvatar: (user.avatar as string) ?? null,
        authorGithub: user.login as string,
      },
    });

    return NextResponse.json({ comment }, { status: 201 });
  } catch (e) {
    console.error("[comments POST]", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
