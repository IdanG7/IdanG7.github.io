import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

const VOTER_COOKIE = "blog_voter_id";

async function getVoterId() {
  const cookieStore = await cookies();
  let voterId = cookieStore.get(VOTER_COOKIE)?.value;
  if (!voterId) {
    voterId = randomUUID();
  }
  return voterId;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const voterId = await getVoterId();

    const [likeCount, userReaction] = await Promise.all([
      prisma.reaction.count({ where: { slug, type: "LIKE" } }),
      prisma.reaction.findUnique({
        where: { slug_voterId: { slug, voterId } },
      }),
    ]);

    const response = NextResponse.json({
      likes: likeCount,
      userVote: userReaction?.type ?? null,
    });

    const cookieStore = await cookies();
    if (!cookieStore.get(VOTER_COOKIE)) {
      response.cookies.set(VOTER_COOKIE, voterId, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365 * 2,
        path: "/",
      });
    }

    return response;
  } catch (e) {
    console.error("[reactions GET]", e);
    return NextResponse.json({ likes: 0, userVote: null });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { type } = await req.json();

    if (type !== "LIKE" && type !== "DISLIKE") {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const voterId = await getVoterId();

    const existing = await prisma.reaction.findUnique({
      where: { slug_voterId: { slug, voterId } },
    });

    if (existing) {
      if (existing.type === type) {
        await prisma.reaction.delete({
          where: { slug_voterId: { slug, voterId } },
        });
      } else {
        await prisma.reaction.update({
          where: { slug_voterId: { slug, voterId } },
          data: { type },
        });
      }
    } else {
      await prisma.reaction.create({
        data: { slug, voterId, type },
      });
    }

    const likeCount = await prisma.reaction.count({
      where: { slug, type: "LIKE" },
    });

    const updatedReaction = await prisma.reaction.findUnique({
      where: { slug_voterId: { slug, voterId } },
    });

    const response = NextResponse.json({
      likes: likeCount,
      userVote: updatedReaction?.type ?? null,
    });

    const cookieStore = await cookies();
    if (!cookieStore.get(VOTER_COOKIE)) {
      response.cookies.set(VOTER_COOKIE, voterId, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365 * 2,
        path: "/",
      });
    }

    return response;
  } catch (e) {
    console.error("[reactions POST]", e);
    return NextResponse.json({ likes: 0, userVote: null }, { status: 500 });
  }
}
