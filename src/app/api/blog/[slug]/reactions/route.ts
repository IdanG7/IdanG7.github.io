import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ReactionType } from "@/generated/prisma/client";
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

function setCookieIfNeeded(
  response: NextResponse,
  cookieStore: Awaited<ReturnType<typeof cookies>>,
  voterId: string
) {
  if (!cookieStore.get(VOTER_COOKIE)) {
    response.cookies.set(VOTER_COOKIE, voterId, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365 * 2,
      path: "/",
    });
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const voterId = await getVoterId();

    const [likes, claps, userLike, userClap] = await Promise.all([
      prisma.reaction.count({ where: { slug, type: ReactionType.LIKE } }),
      prisma.reaction.count({ where: { slug, type: ReactionType.CLAP } }),
      prisma.reaction.findUnique({
        where: { slug_voterId_type: { slug, voterId, type: ReactionType.LIKE } },
      }),
      prisma.reaction.findUnique({
        where: { slug_voterId_type: { slug, voterId, type: ReactionType.CLAP } },
      }),
    ]);

    const response = NextResponse.json({
      likes,
      claps,
      userLiked: !!userLike,
      userClapped: !!userClap,
    });

    const cookieStore = await cookies();
    setCookieIfNeeded(response, cookieStore, voterId);

    return response;
  } catch (e) {
    console.error("[reactions GET]", e);
    return NextResponse.json({
      likes: 0,
      claps: 0,
      userLiked: false,
      userClapped: false,
    });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { type } = await req.json();

    if (type !== "LIKE" && type !== "CLAP") {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const reactionType = type as ReactionType;
    const voterId = await getVoterId();

    const existing = await prisma.reaction.findUnique({
      where: { slug_voterId_type: { slug, voterId, type: reactionType } },
    });

    if (existing) {
      // Toggle off — remove the reaction
      await prisma.reaction.delete({
        where: { slug_voterId_type: { slug, voterId, type: reactionType } },
      });
    } else {
      // Toggle on — create the reaction
      await prisma.reaction.create({
        data: { slug, voterId, type: reactionType },
      });
    }

    const [likes, claps, userLike, userClap] = await Promise.all([
      prisma.reaction.count({ where: { slug, type: ReactionType.LIKE } }),
      prisma.reaction.count({ where: { slug, type: ReactionType.CLAP } }),
      prisma.reaction.findUnique({
        where: { slug_voterId_type: { slug, voterId, type: ReactionType.LIKE } },
      }),
      prisma.reaction.findUnique({
        where: { slug_voterId_type: { slug, voterId, type: ReactionType.CLAP } },
      }),
    ]);

    const response = NextResponse.json({
      likes,
      claps,
      userLiked: !!userLike,
      userClapped: !!userClap,
    });

    const cookieStore = await cookies();
    setCookieIfNeeded(response, cookieStore, voterId);

    return response;
  } catch (e) {
    console.error("[reactions POST]", e);
    return NextResponse.json(
      { likes: 0, claps: 0, userLiked: false, userClapped: false },
      { status: 500 }
    );
  }
}
